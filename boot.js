/* boot.js: penyimpanan data, enkripsi PIN (AES-GCM), sidik jari (WebAuthn), dan layar kunci. Dimuat setelah app.js. */
(function(){
{const sp=document.getElementById('splash');if(sp)sp.remove()}
const enc=new TextEncoder(),dec=new TextDecoder(),$=id=>document.getElementById(id);
const b64=a=>btoa(String.fromCharCode(...new Uint8Array(a))),ub64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const MK='kunci-v6',APPK=['jadwal-v3','jadwal-v4','selesai-v4','atur-v4','notif-v4','catatan-v4','acara-v5','tugas-v5','hasil-v5','batal-v5','refleksi-v5','templat-v5','timer-v5','uang-v5','cad-v6','mulai-v2','mig5'];
const MEM={},SEQ={};let DK=null,RAW=null,META=null,pinBuf='',pinCb=null,bioCb=null,hiddenAt=0,started=false,bioBusy=false;
const subtleOK=()=>!!(window.crypto&&crypto.subtle);
async function kdf(secret,salt){const km=await crypto.subtle.importKey('raw',enc.encode(secret),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:200000},km,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function encS(key,s){const iv=crypto.getRandomValues(new Uint8Array(12));return{e:1,i:b64(iv),c:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(s)))}}
async function decS(key,o){return dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:ub64(o.i)},key,ub64(o.c)))}
/* ---- penyimpanan: MEM adalah salinan di memori; localStorage berisi teks biasa atau terenkripsi ---- */
window.load=(k,f)=>{try{const v=MEM[k];return v!==undefined?JSON.parse(v):f}catch(e){return f}};
window.save=(k,v)=>{MEM[k]=JSON.stringify(v);persist(k)};
function persist(k){if(!APPK.includes(k))return;const n=SEQ[k]=(SEQ[k]||0)+1;try{if(DK)encS(DK,MEM[k]).then(o=>{if(SEQ[k]===n)try{localStorage.setItem(k,JSON.stringify(o))}catch(e){}}).catch(()=>{});else localStorage.setItem(k,MEM[k])}catch(e){}}
const readMeta=()=>{try{const m=JSON.parse(localStorage.getItem(MK)||'null');return m&&typeof m==='object'?m:null}catch(e){return null}};
const putMeta=()=>{try{if(META)localStorage.setItem(MK,JSON.stringify(META));else localStorage.removeItem(MK)}catch(e){}};
async function loadAll(key){for(const k of APPK){let raw=null;try{raw=localStorage.getItem(k)}catch(e){}if(raw===null)continue;let o=null;try{o=JSON.parse(raw)}catch(e){}
  if(o&&o.e===1&&o.i&&o.c){if(key){try{MEM[k]=await decS(key,o)}catch(e){}}}else MEM[k]=raw}}
/* ---- kunci utama acak, dibungkus oleh PIN (dan oleh sidik jari bila diaktifkan) ---- */
const importDK=raw=>crypto.subtle.importKey('raw',raw,'AES-GCM',false,['encrypt','decrypt']);
const wrap=(kek,raw)=>encS(kek,b64(raw)),unwrap=async(kek,o)=>ub64(await decS(kek,o));
async function enable(pin,delay,wipe){RAW=crypto.getRandomValues(new Uint8Array(32));DK=await importDK(RAW);const salt=crypto.getRandomValues(new Uint8Array(16));
  META={v:3,salt:b64(salt),wk:await wrap(await kdf(pin,salt),RAW),fails:0,until:0,delay:delay==null?1:delay,wipe:wipe||0};putMeta();Object.keys(MEM).forEach(persist)}
async function repin(pin){const salt=crypto.getRandomValues(new Uint8Array(16));META.salt=b64(salt);META.wk=await wrap(await kdf(pin,salt),RAW);META.fails=0;META.until=0;putMeta()}
async function disable(){DK=null;RAW=null;META=null;putMeta();Object.keys(MEM).forEach(persist)}
function wipeAll(){try{APPK.concat(MK).forEach(k=>localStorage.removeItem(k))}catch(e){}try{location.reload()}catch(e){}}
async function tryPin(pin){const now=Date.now();
  if(META.until>now)return{err:'Terlalu banyak percobaan. Coba lagi dalam '+Math.ceil((META.until-now)/1000)+' detik.'};
  let ok=null;
  try{
    if(META.v===3)ok={raw:await unwrap(await kdf(pin,ub64(META.salt)),META.wk)};
    else if(META.v===2){const k=await kdf(pin,ub64(META.salt));if(await decS(k,META.check)==='ok')ok={key:k}}
    else if(META.hash){const km=await crypto.subtle.importKey('raw',enc.encode(pin),'PBKDF2',false,['deriveBits']),h=b64(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:ub64(META.salt),iterations:150000},km,256));if(h===META.hash)ok={legacy:true}}
  }catch(e){ok=null}
  if(ok){META.fails=0;META.until=0;putMeta();return ok}
  META.fails=(META.fails||0)+1;if(META.fails>=5)META.until=now+Math.min(30*2**(META.fails-5),3600)*1000;putMeta();
  if(META.wipe&&META.fails>=META.wipe){wipeAll();return{err:'Data dihapus.'}}
  return{err:META.fails>=5?'PIN salah. Tunggu '+Math.round((META.until-now)/1000)+' detik.':'PIN salah ('+META.fails+' dari '+(META.wipe||5)+' percobaan).'}}
async function adopt(pin,r){
  if(r.raw){RAW=r.raw;DK=await importDK(RAW);await loadAll(DK)}
  else if(r.key){await loadAll(r.key);await enable(pin,META.delay,META.wipe)}      /* migrasi dari format 2 */
  else{await loadAll(null);await enable(pin,META.delay,0)}}                          /* migrasi dari format 1 */
/* ---- sidik jari / kunci layar lewat WebAuthn (PRF). Yang diverifikasi adalah biometrik yang terdaftar di Android. ---- */
const bioOn=()=>!!(META&&META.bio);
const bioSupported=async()=>{try{return !!(window.PublicKeyCredential&&navigator.credentials&&crypto.subtle&&await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())}catch(e){return false}};
async function bioKey(buf){const k=await crypto.subtle.importKey('raw',buf,'HKDF',false,['deriveKey']);return crypto.subtle.deriveKey({name:'HKDF',hash:'SHA-256',salt:new Uint8Array(32),info:enc.encode('jadwal-harianku-bio-v1')},k,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
const chal=()=>crypto.getRandomValues(new Uint8Array(32));
async function bioAssert(id,salt){const r=await navigator.credentials.get({publicKey:{challenge:chal(),allowCredentials:[{type:'public-key',id,transports:['internal']}],userVerification:'required',timeout:60000,extensions:{prf:{eval:{first:salt}}}}});
  const p=r&&r.getClientExtensionResults().prf;if(!p||!p.results||!p.results.first)throw new Error('prf');return p.results.first}
async function bioEnroll(){if(!META||!RAW)throw new Error('terkunci');const salt=crypto.getRandomValues(new Uint8Array(32));
  const cred=await navigator.credentials.create({publicKey:{challenge:chal(),rp:{name:'Jadwal Harianku'},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:'pemilik',displayName:'Pemilik aplikasi'},pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],authenticatorSelection:{authenticatorAttachment:'platform',userVerification:'required',residentKey:'preferred'},timeout:60000,extensions:{prf:{}}}});
  const id=new Uint8Array(cred.rawId),first=await bioAssert(id,salt);
  META.bio={id:b64(id),salt:b64(salt),wk:await wrap(await bioKey(first),RAW)};putMeta()}
const bioRaw=async()=>unwrap(await bioKey(await bioAssert(ub64(META.bio.id),ub64(META.bio.salt))),META.bio.wk);
async function bioStep(auto){if(bioBusy||!bioCb||!bioOn())return;bioBusy=true;try{const raw=await bioRaw();await bioCb(raw)}catch(e){if(!auto)$('lkE').textContent='Sidik jari tidak dikenali atau dibatalkan. Gunakan PIN.'}finally{bioBusy=false}}
/* ---- layar kunci ---- */
const weak=p=>/^(\d)\1{7}$/.test(p)||'01234567890123456789'.includes(p)||'98765432109876543210'.includes(p);
const pinDraw=()=>{$('lkD').innerHTML=Array.from({length:8},(_,i)=>`<i class="${i<pinBuf.length?'on':''}"></i>`).join('')};
function askPin(t,s,cb,cancel,onBio){pinBuf='';pinCb=cb;bioCb=onBio||null;$('lkT').textContent=t;$('lkS').textContent=s||'';$('lkE').textContent='';$('lkC').hidden=!cancel;$('lkF').hidden=!!cancel;$('lkB').hidden=!(bioCb&&bioOn());$('lk').hidden=false;pinDraw()}
async function pinKey(k){if(!pinCb)return;if(k==='b')pinBuf=pinBuf.slice(0,-1);else if(pinBuf.length<8)pinBuf+=k;pinDraw();if(pinBuf.length===8){const p=pinBuf;pinBuf='';const r=await pinCb(p);setTimeout(pinDraw,80);$('lkE').textContent=r||''}}
function begin(){document.body.classList.remove('locked');$('lk').hidden=true;pinCb=null;bioCb=null;if(!started){started=true;window.__startApp()}}
async function bootUnlock(p){if(!subtleOK())return 'Kunci PIN memerlukan koneksi aman (https).';const r=await tryPin(p);if(r.err)return r.err;await adopt(p,r);begin();return ''}
async function bootBio(raw){RAW=raw;DK=await importDK(raw);await loadAll(DK);META.fails=0;META.until=0;putMeta();begin()}
const hideLock=()=>{$('lk').hidden=true;pinCb=null;bioCb=null};
async function relock(p){const r=await tryPin(p);if(r.err)return r.err;hideLock();document.body.classList.remove('locked');return ''}
function lock(){if(!META)return;document.body.classList.add('locked');askPin('Masukkan PIN','Aplikasi terkunci',relock,false,()=>{hideLock();document.body.classList.remove('locked')});if(bioOn())setTimeout(()=>bioStep(true),300)}
function setNew(cb){askPin('PIN baru','Masukkan 8 digit angka',async p1=>{if(weak(p1))return 'PIN terlalu mudah ditebak. Pilih kombinasi lain.';
  askPin('Ulangi PIN','Masukkan PIN yang sama',async p2=>{if(p1!==p2){setTimeout(()=>setNew(cb),900);return 'PIN tidak sama. Mengulang dari awal.'}
    if(META&&RAW)await repin(p1);else await enable(p1,1,0);hideLock();cb();return ''},true);return ''},true)}
function verify(cb){askPin('Verifikasi','Masukkan PIN'+(bioOn()?' atau gunakan sidik jari':''),async p=>{const r=await tryPin(p);if(r.err)return r.err;hideLock();cb();return ''},true,()=>{hideLock();cb()})}
$('lkP').innerHTML=[1,2,3,4,5,6,7,8,9].map(n=>`<button data-k="${n}">${n}</button>`).join('')+'<button class="nb" tabindex="-1" aria-hidden="true"></button><button data-k="0">0</button><button data-k="b" aria-label="Hapus"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6"/></svg></button>';
$('lkP').onclick=e=>{const b=e.target.closest('[data-k]');if(b)pinKey(b.dataset.k)};
document.addEventListener('keydown',e=>{if($('lk').hidden)return;if(/^\d$/.test(e.key))pinKey(e.key);else if(e.key==='Backspace')pinKey('b')});
document.addEventListener('visibilitychange',()=>{if(!META||!started)return;if(document.hidden)hiddenAt=Date.now();else if(hiddenAt&&Date.now()-hiddenAt>=META.delay*6e4&&$('lk').hidden)lock()});
$('lkC').onclick=hideLock;
$('lkB').onclick=()=>bioStep(false);
/* Lupa PIN tidak lagi menghapus data. Tombol ini hanya menjelaskan jalan keluarnya. */
$('lkF').onclick=()=>{$('lkE').textContent=bioOn()?'Lupa PIN? Pakai tombol sidik jari, lalu ubah PIN di Pengaturan, menu Keamanan.':'Tanpa sidik jari terdaftar, PIN yang lupa tidak bisa dipulihkan. Data hanya bisa dihapus lewat pengaturan situs di Chrome.'};
/* ---- cadangan berkata sandi ---- */
async function pwEnc(t,pw){const salt=crypto.getRandomValues(new Uint8Array(16)),o=await encS(await kdf(pw,salt),t);return 'JHBK1.'+b64(salt)+'.'+o.i+'.'+o.c}
async function pwDec(s,pw){const p=s.trim().split('.');if(p[0]!=='JHBK1'||p.length!==4)throw new Error('format');return decS(await kdf(pw,ub64(p[1])),{i:p[2],c:p[3]})}
window.BOOT={has:()=>!!META,ok:subtleOK,cfg:()=>META?{delay:META.delay,wipe:META.wipe||0}:{delay:1,wipe:0},cfgSet:o=>{if(META){Object.assign(META,o);putMeta()}},lock,verify,setNew,remove:disable,wipe:wipeAll,pwEnc,pwDec,
  bioHas:bioOn,bioSupported,bioEnroll,bioRemove:()=>{if(META){delete META.bio;putMeta()}}};
/*TEST*/
/* ---- mulai ---- */
META=readMeta();
if(META){document.body.classList.add('locked');askPin('Masukkan PIN','Aplikasi terkunci',bootUnlock,false,bootBio);if(bioOn())setTimeout(()=>bioStep(true),300)}
else{for(const k of APPK){try{const v=localStorage.getItem(k);if(v!==null)MEM[k]=v}catch(e){}}begin()}
/*SW*/
})();
