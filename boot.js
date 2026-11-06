/* boot.js: penyimpanan data, enkripsi PIN (AES-GCM), dan layar kunci. Dimuat setelah app.js. */
(function(){
const enc=new TextEncoder(),dec=new TextDecoder(),$=id=>document.getElementById(id);
const b64=a=>btoa(String.fromCharCode(...new Uint8Array(a))),ub64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const MK='kunci-v6',APPK=['jadwal-v3','jadwal-v4','selesai-v4','atur-v4','notif-v4','catatan-v4','acara-v5','tugas-v5','hasil-v5','batal-v5','refleksi-v5','templat-v5','timer-v5','uang-v5','cad-v6','mulai-v2','mig5'];
const MEM={},SEQ={};let DK=null,META=null,pinBuf='',pinCb=null,hiddenAt=0,started=false,fgArm=false;
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
async function enable(pin,delay,wipe){const salt=crypto.getRandomValues(new Uint8Array(16)),key=await kdf(pin,salt);META={v:2,salt:b64(salt),check:await encS(key,'ok'),fails:0,until:0,delay:delay==null?1:delay,wipe:wipe||0};DK=key;putMeta();Object.keys(MEM).forEach(persist)}
async function disable(){DK=null;META=null;putMeta();Object.keys(MEM).forEach(persist)}
function wipeAll(){try{APPK.concat(MK).forEach(k=>localStorage.removeItem(k))}catch(e){}try{location.reload()}catch(e){}}
async function tryPin(pin){const now=Date.now();
  if(META.until>now)return{err:'Terlalu banyak percobaan. Coba lagi dalam '+Math.ceil((META.until-now)/1000)+' detik.'};
  let key=null;
  if(META.v===2){const k=await kdf(pin,ub64(META.salt));try{if(await decS(k,META.check)==='ok')key=k}catch(e){}}
  else if(META.hash){const km=await crypto.subtle.importKey('raw',enc.encode(pin),'PBKDF2',false,['deriveBits']),h=b64(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:ub64(META.salt),iterations:150000},km,256));if(h===META.hash)key='legacy'}
  if(key){META.fails=0;META.until=0;putMeta();return{key}}
  META.fails=(META.fails||0)+1;if(META.fails>=5)META.until=now+Math.min(30*2**(META.fails-5),3600)*1000;putMeta();
  if(META.wipe&&META.fails>=META.wipe){wipeAll();return{err:'Data dihapus.'}}
  return{err:META.fails>=5?'PIN salah. Tunggu '+Math.round((META.until-now)/1000)+' detik.':'PIN salah ('+META.fails+' dari '+(META.wipe||5)+' percobaan).'}}
/* ---- layar kunci ---- */
const weak=p=>/^(\d)\1{7}$/.test(p)||'01234567890123456789'.includes(p)||'98765432109876543210'.includes(p);
const pinDraw=()=>{$('lkD').innerHTML=Array.from({length:8},(_,i)=>`<i class="${i<pinBuf.length?'on':''}"></i>`).join('')};
function askPin(t,s,cb,cancel){pinBuf='';pinCb=cb;$('lkT').textContent=t;$('lkS').textContent=s||'';$('lkE').textContent='';$('lkC').hidden=!cancel;$('lkF').hidden=!!cancel;$('lk').hidden=false;pinDraw()}
async function pinKey(k){if(!pinCb)return;if(k==='b')pinBuf=pinBuf.slice(0,-1);else if(pinBuf.length<8)pinBuf+=k;pinDraw();if(pinBuf.length===8){const p=pinBuf;pinBuf='';const r=await pinCb(p);setTimeout(pinDraw,80);$('lkE').textContent=r||''}}
function begin(){document.body.classList.remove('locked');$('lk').hidden=true;pinCb=null;if(!started){started=true;window.__startApp()}}
async function bootUnlock(p){if(!subtleOK())return 'Kunci PIN memerlukan koneksi aman (https).';const r=await tryPin(p);if(r.err)return r.err;
  if(r.key==='legacy'){await loadAll(null);await enable(p,META.delay,0)}else{DK=r.key;await loadAll(DK)}begin();return ''}
async function relock(p){const r=await tryPin(p);if(r.err)return r.err;$('lk').hidden=true;pinCb=null;document.body.classList.remove('locked');return ''}
function lock(){if(!META)return;document.body.classList.add('locked');askPin('Masukkan PIN','Aplikasi terkunci',relock,false)}
function setNew(cb){askPin('PIN baru','Masukkan 8 digit angka',async p1=>{if(weak(p1))return 'PIN terlalu mudah ditebak. Pilih kombinasi lain.';
  askPin('Ulangi PIN','Masukkan PIN yang sama',async p2=>{if(p1!==p2){setTimeout(()=>setNew(cb),900);return 'PIN tidak sama. Mengulang dari awal.'}
    await enable(p1,META?META.delay:1,META?META.wipe:0);$('lk').hidden=true;pinCb=null;cb();return ''},true);return ''},true)}
function verify(cb){askPin('PIN saat ini','Masukkan PIN untuk melanjutkan',async p=>{const r=await tryPin(p);if(r.err)return r.err;$('lk').hidden=true;pinCb=null;cb();return ''},true)}
$('lkP').innerHTML=[1,2,3,4,5,6,7,8,9].map(n=>`<button data-k="${n}">${n}</button>`).join('')+'<button class="nb" tabindex="-1" aria-hidden="true"></button><button data-k="0">0</button><button data-k="b" aria-label="Hapus"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6"/></svg></button>';
$('lkP').onclick=e=>{const b=e.target.closest('[data-k]');if(b)pinKey(b.dataset.k)};
document.addEventListener('keydown',e=>{if($('lk').hidden)return;if(/^\d$/.test(e.key))pinKey(e.key);else if(e.key==='Backspace')pinKey('b')});
document.addEventListener('visibilitychange',()=>{if(!META||!started)return;if(document.hidden)hiddenAt=Date.now();else if(hiddenAt&&Date.now()-hiddenAt>=META.delay*6e4&&$('lk').hidden)lock()});
$('lkC').onclick=()=>{$('lk').hidden=true;pinCb=null};
$('lkF').onclick=()=>{if(!fgArm){fgArm=true;$('lkF').textContent='Yakin? Semua data akan dihapus. Ketuk lagi.';setTimeout(()=>{fgArm=false;$('lkF').textContent='Lupa PIN?'},5000);return}fgArm=false;wipeAll()};
/* ---- cadangan berkata sandi ---- */
async function pwEnc(t,pw){const salt=crypto.getRandomValues(new Uint8Array(16)),o=await encS(await kdf(pw,salt),t);return 'JHBK1.'+b64(salt)+'.'+o.i+'.'+o.c}
async function pwDec(s,pw){const p=s.trim().split('.');if(p[0]!=='JHBK1'||p.length!==4)throw new Error('format');return decS(await kdf(pw,ub64(p[1])),{i:p[2],c:p[3]})}
window.BOOT={has:()=>!!META,ok:subtleOK,cfg:()=>META?{delay:META.delay,wipe:META.wipe||0}:{delay:1,wipe:0},cfgSet:o=>{if(META){Object.assign(META,o);putMeta()}},lock,verify,setNew,remove:disable,wipe:wipeAll,pwEnc,pwDec};

/* ---- mulai ---- */
META=readMeta();
if(META){document.body.classList.add('locked');askPin('Masukkan PIN','Aplikasi terkunci',bootUnlock,false)}
else{for(const k of APPK){try{const v=localStorage.getItem(k);if(v!==null)MEM[k]=v}catch(e){}}begin()}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
