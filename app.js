/* app.js: logika aplikasi. Dimulai oleh boot.js setelah data siap (dan PIN benar bila diaktifkan). */
window.__startApp=function(){

const DAYS=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const ORDER=[1,2,3,4,5,6,0];
const CAT={kuliah:['Kuliah','k'],belajar:['Belajar','b'],olahraga:['Olahraga','o'],kerja:['Kerja','w'],ibadah:['Ibadah','i'],ping:['Pengingat','p'],lain:['Lainnya','l']};
const t=(s,e,c,n,d,k)=>({s,e,c,n,d:d||'',k:k||''});
const lunch=(s,e)=>t(s,e,'lain','Makan siang & istirahat');
const dinner=()=>t('18:30','19:30','lain','Makan malam & waktu santai');
const free=(s,e,n)=>t(s,e,'lain',n||'Waktu fleksibel','Tugas kampus, istirahat');
const W=(s,e)=>t(s,e,'olahraga','Pemanasan','','warm');
const J=(s,e)=>t(s,e,'olahraga','Lari ringan','','light');
const KJ=(s,e)=>t(s,e,'kerja','Kurir GoFood','Masih rencana');
const trip=(s,e,n)=>t(s,e,'lain',n,'±11 km · ±45 menit');
const NM={man:'Bahasa Mandarin',ing:'Bahasa Inggris',html:'Coding: HTML',py:'Coding: Python',rev:'Review & tugas',mix:'Review bahasa'};
const sb=(s,e,k)=>t(s,e,'belajar',NM[k],'',k);
const arr=()=>t('06:45','07:00','lain','Tiba di kampus','Menunggu dosen');
const pre1=()=>[t('05:20','06:45','lain','Mandi & sarapan'),trip('06:50','07:35','Perjalanan ke kampus'),t('07:35','07:50','lain','Tiba di kampus','Menunggu dosen')];
const pre6=()=>[t('05:20','05:58','lain','Mandi & sarapan'),trip('06:00','06:45','Perjalanan ke kampus'),arr()];
const eve=k=>[sb('20:00','21:00',k),sb('21:00','22:00','rev')];
const heavy=(a,b,extra)=>[W('05:15','05:25'),t('05:25','06:15','olahraga','Lari','','run'),t('06:20','06:45','olahraga','Latihan kekuatan','','str'),t('06:45','06:55','olahraga','Pendinginan & peregangan','','cool'),t('06:55','08:30','lain','Mandi & sarapan'),KJ('09:00','12:00'),lunch('12:00','13:00'),KJ('13:00','17:00'),sb('17:30','18:30',a),dinner(),...extra,...eve(b)];
const DEF={
1:[...pre1(),
 t('07:50','09:30','kuliah','Ketazkiaan','MKUT.101 · 2 SKS · AY-001 · Dr. Andang Heryahya, M.Pd.I., M.Pd.'),
 t('09:30','11:10','kuliah','Bahasa Indonesia','MKWK.101 · 2 SKS · AY-002 · Nabella Dananier, M.Pd.'),
 trip('11:15','12:00','Perjalanan pulang'),lunch('12:00','13:00'),free('13:00','15:00'),sb('15:00','16:00','man'),free('16:00','18:30'),dinner(),...eve('html')],
2:heavy('ing','html',[]),
3:[...pre6(),
 t('07:00','09:30','kuliah','Dasar-dasar Pemrograman','MITI.101 · 3 SKS · LAB-001 · Ricky Setiadi, S.Kom., M.Kom.'),
 free('09:30','10:30'),sb('10:30','11:30','man'),lunch('12:00','13:00'),
 t('13:00','15:30','kuliah','Kewirausahaan','MKUT.102 · 3 SKS · AY-001 · Ir. Rahmatiyaningsih, M.E.Sy. +1 lainnya'),
 trip('15:35','16:20','Perjalanan pulang'),free('16:30','18:30','Istirahat & urusan pribadi'),dinner(),...eve('py')],
4:[...pre6(),
 t('07:00','09:30','kuliah','Matematika Diskrit','MKST.102 · 3 SKS · AY-001 · Hairul Umam, S.Si., M.Si.'),
 free('09:30','12:00'),lunch('12:00','13:00'),free('13:00','14:00'),sb('14:00','15:00','ing'),free('15:00','16:30'),
 t('16:30','17:10','kuliah','Matematika Dasar Teknik','MKST.101 · 2 SKS · AY-001 · Hairul Umam, S.Si., M.Si.'),
 trip('17:15','18:00','Perjalanan pulang'),dinner(),...eve('html')],
5:heavy('man','html',[]),
6:[...pre6(),
 t('07:00','08:40','kuliah','Pengantar Teknologi Informasi','MITI.102 · 2 SKS · AY-001 · Agus Sulaiman, S.Kom., MT.'),
 free('09:00','10:00'),sb('10:00','11:00','ing'),lunch('12:00','13:00'),
 t('14:00','16:00','kuliah','Arsitektur & Organisasi Komputer','MITI.103 · 3 SKS · AY-002 · Q Fadlan, M.Kom.'),
 trip('16:05','16:50','Perjalanan pulang'),dinner(),...eve('py')],
0:heavy('mix','html',[t('19:30','20:00','lain','Evaluasi pekan','Tinjau tab Review dan susun rencana pekan depan')])
};
const CITY={bogor:['Bogor',-6.595,106.817,7],jakarta:['Jakarta',-6.209,106.846,7],depok:['Depok',-6.402,106.794,7],bekasi:['Bekasi',-6.238,106.976,7],tangerang:['Tangerang',-6.178,106.632,7],bandung:['Bandung',-6.918,107.619,7],yogyakarta:['Yogyakarta',-7.796,110.370,7],semarang:['Semarang',-6.967,110.417,7],surabaya:['Surabaya',-7.258,112.752,7],medan:['Medan',3.595,98.672,7],palembang:['Palembang',-2.976,104.775,7],makassar:['Makassar',-5.148,119.433,8],denpasar:['Denpasar',-8.670,115.213,8],jayapura:['Jayapura',-2.534,140.718,9]};

function prayer(date,c){
 const r=Math.PI/180,jd=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),12)/864e5+2440587.5,d=jd-2451545;
 const g=(357.529+.98560028*d)%360,q=(280.459+.98564736*d)%360;
 const L=q+1.915*Math.sin(g*r)+.02*Math.sin(2*g*r),e=23.439-4e-7*d;
 const ra=(Math.atan2(Math.cos(e*r)*Math.sin(L*r),Math.cos(L*r))/r/15+24)%24;
 const dec=Math.asin(Math.sin(e*r)*Math.sin(L*r));
 const eq=(((q/15-ra)+12)%24+24)%24-12,noon=12+c.tz-c.lng/15-eq,lat=c.lat*r;
 const H=a=>Math.acos(Math.max(-1,Math.min(1,(Math.sin(a)-Math.sin(lat)*Math.sin(dec))/(Math.cos(lat)*Math.cos(dec)))))/r/15;
 const asr=Math.atan(1/(1+Math.tan(Math.abs(lat-dec))));
 const up=h=>Math.ceil(h*60)+2;
 return{subuh:up(noon-H(-20*r)),syuruq:Math.floor((noon-H(-.833*r))*60)-2,dzuhur:up(noon),ashar:up(noon+H(asr)),maghrib:up(noon+H(-.833*r)),isya:up(noon+H(-18*r))};
}

const SAFE=/^[\w-]{1,32}$/,TIME=/^([01]\d|2[0-3]):[0-5]\d$/;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mins=x=>{const[a,b]=x.split(':');return +a*60+ +b};
const hm=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
function fresh(){let n=0;const o={};for(const d in DEF)o[d]=DEF[d].map(x=>({...x,id:'t'+(n++)}));return o}
function clean(o){const r={};for(let d=0;d<7;d++){const a=o&&Array.isArray(o[d])?o[d]:[];r[d]=a.filter(x=>x&&typeof x==='object'&&SAFE.test(String(x.id))&&TIME.test(x.s)&&TIME.test(x.e)&&mins(x.e)>mins(x.s)&&Object.prototype.hasOwnProperty.call(CAT,x.c)).slice(0,60).map(x=>({id:String(x.id),s:x.s,e:x.e,c:x.c,n:String(x.n||'').slice(0,60),d:String(x.d||'').slice(0,120),k:/^[a-z]{0,6}$/.test(x.k)?x.k:''}))}return r}
function cleanST(o){const s=Object.assign({on:true,lead:10,city:'bogor',pd:10,ng:'maghrib',wake:'05:00',sleep:'22:00',jm:45,theme:'auto',fs:16,nb:'auto',hj:true,hjo:0,lat:0,lng:0,tz:7},o&&typeof o==='object'?o:{});
  s.on=!!s.on;s.lead=[5,10,15,30].includes(+s.lead)?+s.lead:10;s.pd=[5,10,15,20].includes(+s.pd)?+s.pd:10;
  if(!['maghrib','isya','off'].includes(s.ng))s.ng='maghrib';
  if(!TIME.test(s.wake))s.wake='05:00';if(!TIME.test(s.sleep))s.sleep='22:00';s.jm=[30,45,60].includes(+s.jm)?+s.jm:45;if(!['auto','light','dark'].includes(s.theme))s.theme='auto';s.fs=[15,16,17].includes(+s.fs)?+s.fs:16;s.nb=['auto','0','24','48'].includes(String(s.nb))?String(s.nb):'auto';s.hj=s.hj!==false;s.hjo=[-1,0,1].includes(+s.hjo)?+s.hjo:0;
  if(s.city!=='gps'&&!Object.prototype.hasOwnProperty.call(CITY,s.city))s.city='bogor';
  s.lat=Math.max(-90,Math.min(90,+s.lat||0));s.lng=Math.max(-180,Math.min(180,+s.lng||0));s.tz=Math.max(-12,Math.min(14,+s.tz||7));return s}
let ST=cleanST(load('atur-v4',null)),NOTE=load('catatan-v4',{}),NT=load('notif-v4',{});
let S=load('jadwal-v4',null);
if(S)S=clean(S);else{S=fresh();const old=load('jadwal-v3',null);if(old){const oc=clean(old);for(let d=0;d<7;d++)oc[d].filter(x=>x.id.length>5).forEach(x=>S[d].push(x))}save('jadwal-v4',S)}
let D=load('selesai-v4',{});if(!D||typeof D!=='object'||Array.isArray(D))D={};
if(!NOTE||typeof NOTE!=='object'||Array.isArray(NOTE))NOTE={};
if(!Array.isArray(NT.i))NT={i:[]};
if(!load('mig5',0)){for(const d of[1,3,4,6])S[d]=S[d].filter(x=>x.k!=='light'&&x.k!=='warm');save('jadwal-v4',S);save('mig5',1)}
function cleanEV(a){return(Array.isArray(a)?a:[]).filter(x=>x&&SAFE.test(String(x.id))&&/^\d{4}-\d\d-\d\d$/.test(x.dt)).slice(0,500).map(x=>({id:String(x.id),dt:x.dt,t:TIME.test(x.t)?x.t:'',n:String(x.n||'').slice(0,80),note:String(x.note||'').slice(0,300),rep:['none','week','month','year'].includes(x.rep)?x.rep:'none',lead:[-1,0,10,30,60,1440].includes(+x.lead)?+x.lead:10}))}
let EV=cleanEV(load('acara-v5',[]));
const num=s=>Math.min(1e11,parseInt(String(s).replace(/\D/g,''),10)||0);
const rp=n=>'Rp '+new Intl.NumberFormat('id-ID').format(Math.round(n));
const fmtN=n=>new Intl.NumberFormat('id-ID').format(n);
const FC={out:{makan:'Makan & minum',transport:'Bensin & transport',kuliah:'Kuliah & buku',pulsa:'Pulsa & internet',belanja:'Belanja',hiburan:'Hiburan',sehat:'Kesehatan',sedekah:'Infak & sedekah',tabung:'Tabungan',lain:'Lainnya'},in:{kurir:'Penghasilan kurir',saku:'Uang saku',lainin:'Pemasukan lain'},tf:{tf:'Transfer antar dompet'}};
const WL={tunai:'Tunai',bank:'Rekening bank',ewallet:'E-wallet'};
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const DT=/^\d{4}-\d\d-\d\d$/;
const objOf=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
function cleanTK(a){return(Array.isArray(a)?a:[]).filter(x=>x&&SAFE.test(String(x.id))&&DT.test(x.due)).slice(0,300).map(x=>({id:String(x.id),n:String(x.n||'').slice(0,80),course:String(x.course||'').slice(0,60),due:x.due,prio:[1,2,3].includes(+x.prio)?+x.prio:2,note:String(x.note||'').slice(0,300),done:!!x.done}))}
function cleanFIN(o){const f={tx:[],bud:{},wal:{tunai:0,bank:0,ewallet:0},goal:{n:'',t:0},rec:[]};if(!o||typeof o!=='object')return f;
  f.tx=(Array.isArray(o.tx)?o.tx:[]).filter(x=>x&&SAFE.test(String(x.id))&&DT.test(x.dt)&&['in','out','tf'].includes(x.type)&&own(FC[x.type],x.cat)&&own(WL,x.wal)&&(x.type!=='tf'||(own(WL,x.wal2)&&x.wal2!==x.wal))&&x.amt>0).slice(0,5000).map(x=>({id:String(x.id),dt:x.dt,type:x.type,cat:x.cat,wal:x.wal,wal2:x.type==='tf'?x.wal2:'',amt:Math.min(1e11,Math.round(+x.amt)),note:String(x.note||'').slice(0,80)}));
  if(o.bud&&typeof o.bud==='object')for(const k in FC.out)f.bud[k]=num(o.bud[k]);
  if(o.wal&&typeof o.wal==='object')for(const k in WL)f.wal[k]=Math.round(+o.wal[k])||0;
  if(o.goal&&typeof o.goal==='object'){f.goal.n=String(o.goal.n||'').slice(0,40);f.goal.t=num(o.goal.t)}
  f.rec=(Array.isArray(o.rec)?o.rec:[]).filter(x=>x&&SAFE.test(String(x.id))&&x.dom>=1&&x.dom<=31&&['in','out'].includes(x.type)&&own(FC[x.type],x.cat)&&own(WL,x.wal)&&x.amt>0).slice(0,50).map(x=>({id:String(x.id),dom:Math.round(x.dom),type:x.type,cat:x.cat,wal:x.wal,amt:Math.min(1e11,Math.round(+x.amt)),note:String(x.note||'').slice(0,80),last:/^\d{4}-\d\d$/.test(x.last)?x.last:''}));
  return f}
let TK=cleanTK(load('tugas-v5',[])),FIN=cleanFIN(load('uang-v5',null)),LOG=objOf(load('hasil-v5',{})),CANC=objOf(load('batal-v5',{})),REF=objOf(load('refleksi-v5',{}));
let TPL=load('templat-v5',[]);TPL=(Array.isArray(TPL)?TPL:[]).filter(x=>x&&SAFE.test(String(x.id))).slice(0,20).map(x=>({id:String(x.id),n:String(x.n||'').slice(0,40),S:clean(x.S)}));
let TM=load('timer-v5',null);if(!TM||typeof TM.end!=='number')TM=null;
function applyLook(){const r=document.documentElement;if(ST.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',ST.theme);r.style.fontSize=ST.fs/16*100+'%'}
applyLook();

function cityObj(){if(ST.city==='gps')return{lat:ST.lat,lng:ST.lng,tz:ST.tz};const c=CITY[ST.city];return{lat:c[1],lng:c[2],tz:c[3]}}
function dateOf(d,o){const x=new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7)+ORDER.indexOf(d)+7*(o||0));return x}
function iso(x){return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')}
let P=load('mulai-v2',null);if(!P||!/^\d{4}-\d\d-\d\d$/.test(P)){P=iso(dateOf(1));save('mulai-v2',P)}
const week=()=>Math.max(0,Math.round((dateOf(1)-new Date(P+'T00:00:00'))/6048e5));
let today=new Date().getDay(),lastD=iso(new Date());let sel=today,view='plan',rofs=0,editId=null,resetArm=false,tt=null;
const f=n=>String(Math.round(n*100)/100).replace('.',',');
function tg(k,w){const c=(b,i,m)=>Math.min(b+i*w,m);
 if(k==='run')return 'Target pekan ini: '+f(c(5,.25,8))+' km, pace santai';
 if(k==='light')return '±'+f(c(2,.1,3))+' km total, santai';
 if(k==='str')return `Push-up ${c(10,1,30)} · Squat ${c(10,1,30)} · Plank ${c(10,5,60)} dtk · Sit-up ${c(15,2,40)} · Lunges ${c(10,1,30)}/kaki`;
 if(k==='warm')return 'Gerak dinamis 5–10 menit';
 if(k==='cool')return 'Peregangan 10 menit';
 if(k==='man')return `Target: ${c(5,1,10)} kosakata + pinyin · ${3+Math.min(Math.floor(w/2),3)} hanzi (tulis tangan) · 1 pola grammar · ulang kosakata kemarin 10 menit`;
 if(k==='ing')return `Target: ${c(10,1,15)} kosakata + kalimat contoh · 1 topik grammar · 10 menit listening/speaking`;
 if(k==='html')return 'Target: 1 materi (tag/elemen) + 1 latihan mini; akhir pekan jadikan 1 halaman web kecil';
 if(k==='py')return 'Target: ulang materi kampus + 5 soal latihan';
 if(k==='rev')return 'Rangkum 5 poin penting hari ini, lalu kerjakan tugas yang tenggatnya paling dekat';
 if(k==='mix')return '30 menit kosakata Inggris + 30 menit kosakata/hanzi Mandarin pekan ini';
 return ''}




const hr=m=>{const h=m/60;return(Number.isInteger(h)?h:h.toFixed(1)).toString().replace('.',',')};
const dur=m=>m>=60?Math.floor(m/60)+' jam'+(m%60?' '+m%60+' menit':''):m+' menit';
const IE='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>';
const ID='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
function occurs(ev,dt){const[y,m,d]=ev.dt.split('-').map(Number),s=new Date(y,m-1,d);if(dt<s)return false;
  if(ev.rep==='none')return iso(dt)===ev.dt;
  if(ev.rep==='week')return Math.round((dt-s)/864e5)%7===0;
  const dim=new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate();
  if(ev.rep==='month')return dt.getDate()===Math.min(d,dim);
  return dt.getMonth()===m-1&&dt.getDate()===Math.min(d,dim)}
function dayList(d,ofs){
  const dt=dateOf(d,ofs),key=iso(dt),T=prayer(dt,cityObj()),du=ST.pd,out=[],wk=mins(ST.wake),sl=mins(ST.sleep);
  let base=(S[d]||[]).map(x=>CANC[key+'|'+x.id]?{...x,canc:1}:x);
  if(base.some(x=>x.canc&&x.c==='kuliah')&&!base.some(x=>x.c==='kuliah'&&!x.canc))base=base.map(x=>/^(Perjalanan|Tiba di kampus)/.test(x.n)?{...x,canc:1}:x);
  const blk=x=>!x.canc&&(['kuliah','belajar','olahraga'].includes(x.c)||(x.c==='lain'&&/^(Berangkat|Perjalanan)/.test(x.n)));
  const hit=(s,e)=>base.find(x=>blk(x)&&mins(x.s)<e&&s<mins(x.e))||out.find(x=>mins(x.s)<e&&s<mins(x.e));
  const put=(id,n,from,to,len,pre,k)=>{let s=from,b;while(s+len<=to&&(b=hit(s,s+len)))s=mins(b.e);const ok=s+len<=to;if(!ok)s=from;
    const x={id,n,c:'ibadah',s:hm(s),e:hm(s+len),k,auto:1,bad:!ok,d:pre+(!ok?'jadwal padat, atur ulang kegiatan lain':s>from?'dijadwalkan setelah kegiatan':'sesuai jadwal')};out.push(x);return x};
  out.push({id:'p-bangun',n:'Bangun tidur',c:'lain',s:ST.wake,e:hm(wk+5),d:'Minum air putih, mulai hari dengan tenang',k:'',auto:1});
  const A=(id,n,a,from,to,len)=>put(id,n,from,to,len||du,'Azan '+hm(a)+' · ','');
  A('p-subuh','Shalat Subuh',T.subuh,Math.max(T.subuh,wk+5),T.syuruq);
  A('p-dzuhur',d===5?'Shalat Jumat':'Shalat Dzuhur',T.dzuhur,T.dzuhur,T.ashar,d===5?ST.jm:du);
  A('p-ashar','Shalat Ashar',T.ashar,T.ashar,T.maghrib);
  const mg=A('p-maghrib','Shalat Maghrib',T.maghrib,T.maghrib,T.isya);
  const ng=(from,to)=>put('p-ngaji','Mengaji Al-Qur’an',from,to,15,'3 lembar · ','quran');
  if(ST.ng==='maghrib')ng(mins(mg.e),T.isya+30);
  const is=A('p-isya','Shalat Isya',T.isya,T.isya,sl);
  if(ST.ng==='isya')ng(mins(is.e),sl);
  out.push({id:'p-tidur',n:'Tidur',c:'lain',s:ST.sleep,e:'23:59',end:ST.wake,d:'Istirahat penuh untuk esok hari',k:'',auto:1});
  EV.forEach(ev=>{if(ev.t&&occurs(ev,dt))out.push({id:'e-'+ev.id,n:ev.n,c:'ping',s:ev.t,e:hm(Math.min(mins(ev.t)+15,1439)),d:ev.note,k:'',ev:1})});
  return base.concat(out);
}
function stats(d,o){const key=iso(dateOf(d,o)),l=dayList(d,o).filter(x=>!x.canc);let done=0,sm=0,sp=0;l.forEach(x=>{const m=mins(x.e)-mins(x.s);if(x.c==='belajar')sp+=m;if(D[key+'|'+x.id]){done++;if(x.c==='belajar')sm+=m}});return{n:l.length,done,sm,sp}}
const pc=s=>s.n?Math.round(s.done/s.n*100):0;
function toast(msg,label,fn,ms){const el=$('toast');el.innerHTML='<span>'+esc(msg)+'</span>'+(label?'<button class="ta">'+esc(label)+'</button>':'')+'<button class="tx" aria-label="Tutup"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>';el.hidden=false;if(label)el.querySelector('.ta').onclick=()=>{fn();el.hidden=true};el.querySelector('.tx').onclick=()=>{el.hidden=true};clearTimeout(tt);tt=setTimeout(()=>{el.hidden=true},ms||5000)}
function reviewHTML(){
  const w=week()+rofs,nowD=new Date();nowD.setHours(0,0,0,0);
  const mon=dateOf(1,rofs),sun=dateOf(0,rofs),fm=x=>x.toLocaleDateString('id-ID',{day:'numeric',month:'short'});
  const PR=[['p-subuh','Subuh'],['p-dzuhur','Dzuhur / Jumat'],['p-ashar','Ashar'],['p-maghrib','Maghrib'],['p-isya','Isya'],['p-ngaji','Mengaji']];
  let tn=0,td=0,sm=0,sp=0,perfect=0,counted=0;const cat={},grid={},days=[];PR.forEach(p=>grid[p[0]]=[]);
  ORDER.forEach(d=>{const dt=dateOf(d,rofs),key=iso(dt),past=dt<=nowD,l=dayList(d,rofs).filter(x=>!x.canc);let n=0,dn=0,sh=0;
    if(past){counted++;l.forEach(x=>{const ok=!!D[key+'|'+x.id];n++;if(ok)dn++;const c=cat[x.c]=cat[x.c]||{n:0,d:0};c.n++;if(ok)c.d++;if(x.c==='belajar'){const m=mins(x.e)-mins(x.s);sp+=m;if(ok)sm+=m}if(ok&&/^p-(subuh|dzuhur|ashar|maghrib|isya)$/.test(x.id))sh++})}
    PR.forEach(p=>grid[p[0]].push(past&&l.some(x=>x.id===p[0])?!!D[key+'|'+p[0]]:null));
    if(past&&sh===5)perfect++;tn+=n;td+=dn;days.push({d,n,past,p:n?Math.round(dn/n*100):0})});
  const all=tn?Math.round(td/tn*100):0,cats=['kuliah','belajar','olahraga','kerja','ibadah','ping','lain'].filter(c=>cat[c]);
  const cd=days.filter(x=>x.past&&x.n),ins=[];
  if(cd.length){const b=cd.reduce((a,x)=>x.p>a.p?x:a),z=cd.reduce((a,x)=>x.p<a.p?x:a);ins.push(`Hari paling produktif: <b>${DAYS[b.d]}</b> (${b.p}%).`);if(z.d!==b.d)ins.push(`Perlu perhatian: <b>${DAYS[z.d]}</b> (${z.p}%).`)}
  const lc=cats.filter(c=>cat[c].n>=3).sort((a,b)=>cat[a].d/cat[a].n-cat[b].d/cat[b].n)[0];
  if(lc)ins.push(`Kategori terendah: <b>${CAT[lc][0]}</b> (${Math.round(cat[lc].d/cat[lc].n*100)}%).`);
  ins.push(`Shalat lima waktu lengkap pada <b>${perfect}</b> dari ${counted} hari.`);
  const key=iso(mon);
  return `<div class="nav"><button class="round" data-rn="-1" aria-label="Pekan sebelumnya" ${w<=0?'disabled':''}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><b>Pekan ke-${w+1}<small>${fm(mon)} – ${fm(sun)}${rofs===0?' · dihitung sampai hari ini':''}</small></b><button class="round" data-rn="1" aria-label="Pekan berikutnya" ${rofs>=0?'disabled':''}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button></div>
  <div class="rg"><div class="tile"><small>Penyelesaian</small><div class="ring" style="--p:${all}"><b>${all}%</b></div><small>${td} dari ${tn} kegiatan</small></div><div class="tile"><small>Jam belajar</small><b>${hr(sm)} <span class="u">/ ${hr(sp)} jam</span></b><div class="meter"><i style="--p:${sp?Math.min(sm/sp*100,100):0}%"></i></div></div></div>
  ${consistHTML()}<div class="card2"><h3>Progres harian</h3><div class="col">${days.map(x=>`<div class="${x.past?'':'f'}"><span>${x.past?x.p+'%':''}</span><i style="--h:${x.past?Math.max(x.p,3):3}%"></i><span>${DAYS[x.d].slice(0,3)}</span></div>`).join('')}</div></div>
  <div class="card2"><h3>Per jenis kegiatan</h3>${cats.map(c=>`<div class="mr ${CAT[c][1]}"><span>${CAT[c][0]}</span><div class="meter"><i style="--p:${Math.round(cat[c].d/cat[c].n*100)}%"></i></div><b>${cat[c].d}/${cat[c].n}</b></div>`).join('')||'<p class="ins">Belum ada data.</p>'}</div>
  <div class="card2"><h3>Ibadah harian</h3><div class="pg h"><span></span><div>${ORDER.map(d=>`<span>${DAYS[d][0]}</span>`).join('')}</div><b></b></div>${PR.map(p=>{const g=grid[p[0]];return`<div class="pg"><span>${p[1]}</span><div>${g.map(v=>`<i class="${v===null?'n':v?'on':''}"></i>`).join('')}</div><b>${g.filter(Boolean).length}/${g.filter(v=>v!==null).length}</b></div>`}).join('')}</div>
  ${trendHTML()}${refHTML()}<div class="card2"><h3>Sorotan</h3><p class="ins">${ins.join(' ')}</p></div>
  <div class="card2"><h3>Catatan evaluasi</h3><textarea class="nt" id="note" data-k="${key}" maxlength="1000" placeholder="Apa yang berjalan baik, apa yang perlu diperbaiki, dan rencana pekan depan">${esc(NOTE[key]||'')}</textarea></div>`;
}
function render(){
  const nd=iso(new Date());if(nd!==lastD){lastD=nd;today=new Date().getDay();sel=today}
  [['plan','vPlan'],['cal','vCal'],['task','vTask'],['fin','vFin'],['rev','vRev']].forEach(([k,id])=>{$(id).hidden=view!==k});$('fab').hidden=view==='rev';$('fabT').textContent={plan:'Kegiatan',cal:'Pengingat',task:'Tugas',fin:'Catat'}[view]||'';
  document.querySelectorAll('.bnav button').forEach(b=>{const on=b.dataset.v===view;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
  if(view==='cal'){$('vCal').innerHTML=calHTML();return}
  if(view==='task'){$('vTask').innerHTML=taskHTML();return}
  if(view==='fin'){$('vFin').innerHTML=finHTML();return}
  if(view==='rev'){if(document.activeElement&&document.activeElement.id==='note')return;$('vRev').innerHTML=reviewHTML();return}
  const w=week(),now=new Date(),nm=now.getHours()*60+now.getMinutes(),LV=levels();
  const tl=dayList(today,0).filter(x=>!x.canc).sort((a,b)=>a.s.localeCompare(b.s)),ts=stats(today,0);
  const cur=tl.find(x=>mins(x.s)<=nm&&nm<mins(x.e)),nxt=tl.find(x=>mins(x.s)>nm);
  const g=nm<660?'Selamat pagi':nm<900?'Selamat siang':nm<1080?'Selamat sore':'Selamat malam';
  let lab='Hari ini',ttl='Seluruh kegiatan hari ini telah berlalu',sub='Istirahat yang cukup.';
  if(cur){lab='Sedang berlangsung';ttl=cur.n;sub=cur.id==='p-tidur'?'Tidur hingga '+ST.wake:cur.s+'–'+cur.e+' · sisa '+dur(mins(cur.e)-nm)}
  else if(nxt){lab='Kegiatan berikutnya';ttl=nxt.n;sub='Pukul '+nxt.s+' · '+dur(mins(nxt.s)-nm)+' lagi'}
  $('hero').innerHTML=`<div><p class="hl">${g} · ${now.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'})}${ST.hj?' · '+hjStr(now):''}</p><p class="hk">${lab}</p><h2>${esc(ttl)}</h2><p class="hs">${esc(sub)}</p></div><div class="ring" style="--p:${pc(ts)}" role="img" aria-label="${pc(ts)} persen kegiatan hari ini selesai"><b>${pc(ts)}%</b></div>`;
  let tn=0,td=0,sm=0,sp=0;const all=ORDER.map(d=>{const s=stats(d,0);tn+=s.n;td+=s.done;sm+=s.sm;sp+=s.sp;return[d,s]});
  const wp=tn?Math.round(td/tn*100):0;
  $('tiles').innerHTML=`<div class="tile"><small>Pekan ke-${w+1}</small><div class="bars" role="img" aria-label="Progres tiap hari">${all.map(([d,s])=>`<i class="${s.done?'has':''}${d===today?' t':''}" style="--h:${Math.max(pc(s),12)}%"></i>`).join('')}</div><small>${td} dari ${tn} kegiatan</small></div><div class="tile"><small>Progres pekan</small><div class="ring" style="--p:${wp}"><b>${wp}%</b></div></div><div class="tile"><small>Jam belajar</small><b>${hr(sm)} <span class="u">/ ${hr(sp)} jam</span></b><div class="meter"><i style="--p:${sp?Math.min(sm/sp*100,100):0}%"></i></div></div>`;
  $('tabs').innerHTML=all.map(([d,s])=>`<button class="tab${d===sel?' on':''}${d===today?' today':''}" data-d="${d}" role="tab" aria-selected="${d===sel}">${DAYS[d].slice(0,3)}<strong>${dateOf(d,0).getDate()}</strong><em><i style="--p:${pc(s)}%"></i></em></button>`).join('');
  const key=iso(dateOf(sel,0)),list=dayList(sel,0).sort((a,b)=>a.s.localeCompare(b.s)),ss=stats(sel,0);
  $('title').textContent=DAYS[sel]+(sel===today?' · hari ini':'');
  $('stat').textContent=ss.done+' dari '+ss.n+' selesai';
  const dts=dateOf(sel,0),noT=EV.filter(e=>!e.t&&occurs(e,dts)),pend=sel===today?TK.filter(t=>!t.done).sort((a,b)=>a.due.localeCompare(b.due)||b.prio-a.prio).slice(0,3):[];
  $('evBox').innerHTML=(noT.length?`<div class="card2"><h3>Catatan hari ini</h3>${noT.map(e=>`<div class="evr"><div><b>${esc(e.n)}</b>${e.note?`<span>${esc(e.note)}</span>`:''}</div><button class="ic" data-ee="${esc(e.id)}" aria-label="Ubah ${esc(e.n)}">${IE}</button></div>`).join('')}</div>`:'')+(pend.length?`<div class="card2"><h3>Tugas terdekat</h3>${pend.map(taskRow).join('')}</div>`:'');
  if(!(document.activeElement&&document.activeElement.id==='rf'))$('refBox').innerHTML=dts<=midn()?refCard(key):'';
  $('list').innerHTML=list.length?list.map(x=>{
    const ck=!!D[key+'|'+x.id],isNow=sel===today&&!x.canc&&mins(x.s)<=nm&&nm<mins(x.e);
    const clash=!x.canc&&(x.bad||(!x.auto&&!x.ev&&list.some(y=>y!==x&&!y.canc&&!y.auto&&!y.ev&&mins(x.s)<mins(y.e)&&mins(y.s)<mins(x.e)))),late=!x.auto&&!x.ev&&mins(x.e)>mins(ST.sleep);
    const lg=LOG[key+'|'+x.id],lgt=lg&&MET[x.k]?'Tercatat: '+MET[x.k].filter(m=>lg[m[0]]!=null).map(m=>f(+lg[m[0]])+' '+m[2]).join(', '):'';
    const desc=[tg(x.k,LV[x.k]||0),x.d,lgt].filter(Boolean).join(' · ');
    const ac=x.canc?`<button class="mini" data-rc="${esc(x.id)}">Aktifkan kembali</button>`:(MET[x.k]?`<button class="mini" data-lg="${esc(x.id)}">Catat hasil</button>`:'')+(FOC.includes(x.k)?`<button class="mini" data-fo="${esc(x.id)}">Mulai fokus</button>`:'')+(x.c==='kuliah'&&!x.auto&&!x.ev?`<button class="mini" data-kc="${esc(x.id)}">Batal / pindah</button>`:'');
    return `<li class="${CAT[x.c][1]}${isNow?' nw':''}"><div class="tm"><b>${x.s}</b>${x.end||x.e}</div><div class="dot"></div><div class="cd${ck?' done':''}${isNow?' now':''}${x.canc?' canc':''}"><input type="checkbox" class="chk" data-id="${esc(x.id)}" ${ck?'checked':''} ${x.canc?'disabled':''} aria-label="Selesai: ${esc(x.n)}"><div class="bd"><div class="t">${esc(x.n)}</div><div class="mt"><span class="chip">${CAT[x.c][0]}</span>${x.canc?'<span class="chip r">Dibatalkan</span>':''}${clash?'<span class="chip r">Bentrok</span>':''}${late?'<span class="chip r">Lewat jam tidur</span>':''}${esc(desc)}</div>${ac?`<div class="ac">${ac}</div>`:''}</div>${x.auto||x.canc?'':x.ev?`<button class="ic" data-ee="${esc(x.id.slice(2))}" aria-label="Ubah ${esc(x.n)}">${IE}</button>`:`<button class="ic" data-ed="${esc(x.id)}" aria-label="Ubah ${esc(x.n)}">${IE}</button><button class="ic" data-del="${esc(x.id)}" aria-label="Hapus ${esc(x.n)}">${ID}</button>`}</div></li>`}).join('')
  :'<li style="display:block"><div class="empty">Belum ada kegiatan pada hari ini.</div></li>';
}
const MS=864e5,dOf=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const midn=()=>{const n=new Date();n.setHours(0,0,0,0);return n};
const PRIO={1:'Rendah',2:'Sedang',3:'Tinggi'};
const MET={run:[['km','Jarak lari (km)','km']],str:[['pu','Push-up','push-up'],['sq','Squat','squat'],['pl','Plank (detik)','detik plank'],['su','Sit-up','sit-up'],['lu','Lunges per kaki','lunges']],man:[['kv','Kosakata baru','kosakata'],['hz','Hanzi tertulis','hanzi']],ing:[['kv','Kosakata baru','kosakata']],html:[['lt','Latihan selesai','latihan']],py:[['sl','Soal selesai','soal']]};
const FOC=['man','ing','html','py'];
const NAV=[['plan','Jadwal','M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM9 16l2 2 4-4'],['cal','Kalender','M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z'],['task','Tugas','M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9'],['fin','Keuangan','M3 7h16a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 7l12-4v4M17 14h2'],['rev','Review','M4 20V10M10 20V4M16 20v-7M22 20H2']];
$('bnav').innerHTML=NAV.map(n=>`<button data-v="${n[0]}" role="tab"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${n[2]}"/></svg>${n[1]}</button>`).join('');
function dinfo(dt){const m=dateOf(1,0),mon=new Date(dt);mon.setDate(dt.getDate()-((dt.getDay()+6)%7));return{d:dt.getDay(),o:Math.round((mon-m)/6048e5)}}
function levels(){const w=week(),L={run:0,str:0,man:0,ing:0};for(let o=-w;o<0;o++)Object.keys(L).forEach(k=>{let n=0,dn=0;ORDER.forEach(d=>{const key=iso(dateOf(d,o));(S[d]||[]).forEach(x=>{if(x.k===k){n++;if(D[key+'|'+x.id])dn++}})});if(n&&dn>=Math.ceil(n*2/3))L[k]++});return L}
/* ---- tugas ---- */
function dueLbl(s){const df=Math.round((dOf(s)-midn())/MS);return df<0?'Terlambat '+(-df)+' hari':df===0?'Hari ini':df===1?'Besok':df+' hari lagi'}
function taskRow(t){return `<div class="evr tk${t.done?' done':''}"><input type="checkbox" class="chk" data-tid="${esc(t.id)}" ${t.done?'checked':''} aria-label="Selesai: ${esc(t.n)}"><div><b>${esc(t.n)}</b><span>${esc([t.course,(t.done?'':dueLbl(t.due)+' · ')+dOf(t.due).toLocaleDateString('id-ID',{day:'numeric',month:'short'}),t.done?'':'Prioritas '+PRIO[t.prio].toLowerCase()].filter(Boolean).join(' · '))}</span></div><button class="ic" data-te="${esc(t.id)}" aria-label="Ubah ${esc(t.n)}">${IE}</button></div>`}
function taskHTML(){
  const open=TK.filter(t=>!t.done).sort((a,b)=>a.due.localeCompare(b.due)||b.prio-a.prio),done=TK.filter(t=>t.done).sort((a,b)=>b.due.localeCompare(a.due)).slice(0,10),td=iso(new Date()),wk=iso(new Date(Date.now()+7*MS));
  const g=(h,l)=>l.length?`<h3 class="gh">${h} <span>${l.length}</span></h3>${l.map(taskRow).join('')}`:'';
  return `<div class="sec"><h2>Tugas kuliah</h2><span>${open.length} belum selesai</span></div>`+(TK.length?g('Terlambat',open.filter(t=>t.due<td))+g('Minggu ini',open.filter(t=>t.due>=td&&t.due<=wk))+g('Selanjutnya',open.filter(t=>t.due>wk))+g('Selesai',done):'<div class="empty">Belum ada tugas. Ketuk tombol Tugas untuk menambahkan tenggat kuliahmu. Pengingat muncul otomatis 3 hari, 1 hari, dan pada hari tenggat.</div>');
}
let tkId=null;
function openT(t){tkId=t?t.id:null;const cs=[...new Set(Object.values(S).flat().filter(x=>x.c==='kuliah').map(x=>x.n))].concat('Umum');$('tC').innerHTML=cs.map(c=>`<option>${esc(c)}</option>`).join('');$('tT').value=t?t.n:'';if(t&&!cs.includes(t.course))$('tC').insertAdjacentHTML('beforeend','<option>'+esc(t.course)+'</option>');$('tC').value=t?t.course:cs[0];$('tD').value=t?t.due:iso(new Date(Date.now()+3*MS));$('tP').value=t?t.prio:2;$('tN').value=t?t.note:'';$('tDel').hidden=!t;$('tErr').textContent='';$('ftT').textContent=t?'Ubah tugas':'Tambah tugas';$('dT').showModal()}
/* ---- keuangan ---- */
let fy=new Date().getFullYear(),fmo=new Date().getMonth(),ff='',xt='out',xid=null;
function finHTML(){
  const mk=fy+'-'+String(fmo+1).padStart(2,'0'),dim=new Date(fy,fmo+1,0).getDate(),now=new Date(),cur=fy===now.getFullYear()&&fmo===now.getMonth(),dn=cur?now.getDate():dim;
  let inn=0,out=0;const bc={},bd=Array(dim).fill(0),tx=FIN.tx.filter(x=>x.dt.startsWith(mk));
  tx.forEach(x=>{if(x.type==='tf')return;if(x.type==='in')inn+=x.amt;else{out+=x.amt;bc[x.cat]=(bc[x.cat]||0)+x.amt;bd[+x.dt.slice(8)-1]+=x.amt}});
  const bal={...FIN.wal};FIN.tx.forEach(x=>{if(x.type==='tf'){bal[x.wal]-=x.amt;bal[x.wal2]+=x.amt}else bal[x.wal]+=x.type==='in'?x.amt:-x.amt});
  const tot=Object.values(bal).reduce((a,b)=>a+b,0),bt=Object.values(FIN.bud).reduce((a,b)=>a+b,0),avg=out/Math.max(dn,1),proj=cur?avg*dim:out,mx=Math.max(...bd,1),left=dim-dn;
  const cats=Object.keys(bc).sort((a,b)=>bc[b]-bc[a]),saved=FIN.tx.filter(x=>x.type==='out'&&x.cat==='tabung').reduce((a,x)=>a+x.amt,0),ins=[];
  if(cats.length){const c=cats[0];ins.push(`Pengeluaran terbesar: <b>${FC.out[c]}</b> (${Math.round(bc[c]/out*100)}%).`);ins.push(`Hari paling boros: <b>${bd.indexOf(mx)+1} ${MON[fmo]}</b> (${rp(mx)}).`)}
  const kur=tx.filter(x=>x.cat==='kurir').reduce((a,x)=>a+x.amt,0);if(kur)ins.push(`Penghasilan kurir ${rp(kur)}, bensin dan transport ${rp(bc.transport||0)}, bersih ${rp(kur-(bc.transport||0))}.`);
  const over=cats.filter(c=>FIN.bud[c]&&bc[c]>FIN.bud[c]);if(over.length)ins.push(`Melebihi anggaran: <b>${over.map(c=>FC.out[c]).join(', ')}</b>.`);
  if(bt&&cur&&left>0&&bt>out)ins.push(`Batas aman belanja: <b>${rp((bt-out)/left)}</b> per hari hingga akhir bulan.`);
  const list=tx.filter(x=>!ff||x.cat===ff).sort((a,b)=>b.dt.localeCompare(a.dt)||b.id.localeCompare(a.id)).slice(0,120);let last='',rows='';
  list.forEach(x=>{if(x.dt!==last){last=x.dt;const dd=dOf(x.dt),tt=list.filter(y=>y.dt===x.dt&&y.type==='out').reduce((a,y)=>a+y.amt,0);rows+=`<div class="trh"><span>${DAYS[dd.getDay()]}, ${dd.getDate()} ${MON[dd.getMonth()].slice(0,3)}</span><span>${tt?'− '+rp(tt):''}</span></div>`}
    const cn=FC[x.type][x.cat];rows+=`<div class="trx"><div><b>${esc(x.note||cn)}</b><span>${cn} · ${x.type==='tf'?WL[x.wal]+' ke '+WL[x.wal2]:WL[x.wal]}</span></div><strong class="${x.type}">${x.type==='in'?'+ ':x.type==='tf'?'':'− '}${rp(x.amt)}</strong><button class="ic" data-xe="${esc(x.id)}" aria-label="Ubah transaksi">${IE}</button></div>`});
  const opts=Object.entries(FC.out).concat(Object.entries(FC.in)).map(([k,v])=>`<option value="${k}"${ff===k?' selected':''}>${v}</option>`).join('');
  const mo6=[];for(let i=5;i>=0;i--){const dd=new Date(fy,fmo-i,1),k=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0');let a=0,b=0;FIN.tx.forEach(x=>{if(x.dt.startsWith(k)){if(x.type==='in')a+=x.amt;else if(x.type==='out')b+=x.amt}});mo6.push({l:MON[dd.getMonth()].slice(0,3),a,b})}
  const m6=Math.max(...mo6.map(x=>Math.max(x.a,x.b)),1);
  return `<div class="nav"><button class="round" data-fm="-1" aria-label="Bulan sebelumnya"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><b>${MON[fmo]} ${fy}<small>${tx.length} transaksi</small></b><button class="round" data-fm="1" aria-label="Bulan berikutnya"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button></div>
  <div class="fh"><small>Pengeluaran ${MON[fmo]}</small><h2>${rp(out)}</h2><small>Rata-rata ${rp(avg)} per hari${cur?' · proyeksi akhir bulan '+rp(proj):''}</small>${bt?`<div class="meter"><i style="--p:${Math.min(out/bt*100,100)}%"></i></div><small>Anggaran ${rp(bt)} · ${bt>=out?'sisa '+rp(bt-out):'melebihi '+rp(out-bt)}</small>`:''}</div>
  <div class="ft"><div class="tile"><small>Pemasukan</small><b>${rp(inn)}</b></div><div class="tile"><small>Selisih</small><b>${inn-out<0?'− ':''}${rp(Math.abs(inn-out))}</b></div><div class="tile"><small>Total saldo</small><b>${tot<0?'− ':''}${rp(Math.abs(tot))}</b></div></div>
  <div class="card2"><h3>Pengeluaran per hari</h3><div class="dbars">${bd.map((v,i)=>`<i class="${cur&&i+1===now.getDate()?'t':v?'v':''}" style="--h:${v?Math.max(v/mx*100,8):3}%"></i>`).join('')}</div><div class="ax"><span>1</span><span>${dim}</span></div></div>
  <div class="card2"><h3>Tren 6 bulan</h3><div class="tr6">${mo6.map(x=>`<div><div class="pr"><i class="in" style="--h:${x.a/m6*100}%"></i><i style="--h:${x.b/m6*100}%"></i></div><small>${x.l}</small></div>`).join('')}</div><p class="note">Batang biru = pemasukan, batang gelap = pengeluaran.</p></div>
  <div class="card2"><h3>Ke mana uangmu pergi</h3>${cats.map(c=>{const p=Math.round(bc[c]/out*100),b=FIN.bud[c];return `<div class="cr${b&&bc[c]>b?' o':''}"><div><b>${FC.out[c]}</b><span>${rp(bc[c])} · ${p}%</span></div><div class="meter"><i style="--p:${b?Math.min(bc[c]/b*100,100):p}%"></i></div>${b?`<span class="sm">Anggaran ${rp(b)}</span>`:''}</div>`}).join('')||'<p class="ins">Belum ada pengeluaran bulan ini.</p>'}${bt?'<p class="note">Bila ada anggaran, batang menunjukkan pemakaian anggaran.</p>':''}</div>
  <div class="card2"><h3>Dompet</h3>${Object.entries(WL).map(([k,v])=>`<div class="sw"><span>${v}</span><b>${bal[k]<0?'− ':''}${rp(Math.abs(bal[k]))}</b></div>`).join('')}</div>
  ${FIN.rec.length?`<div class="card2"><h3>Transaksi berulang</h3>${FIN.rec.map(r=>`<div class="sr" style="padding:6px 0;min-height:0;border:0"><span class="tx2"><b>${esc(r.note||FC[r.type][r.cat])}</b><small>${rp(r.amt)} · tiap tanggal ${r.dom} · ${WL[r.wal]}</small></span><button class="ic" data-rd="${esc(r.id)}" aria-label="Hapus transaksi berulang">${ID}</button></div>`).join('')}</div>`:''}
  ${FIN.goal.t?`<div class="card2"><h3>Target: ${esc(FIN.goal.n||'Tabungan')}</h3><div class="meter"><i style="--p:${Math.min(saved/FIN.goal.t*100,100)}%"></i></div><p class="ins">${rp(saved)} dari ${rp(FIN.goal.t)} (${Math.round(Math.min(saved/FIN.goal.t,1)*100)}%). Catat setoran dengan kategori Tabungan.</p></div>`:''}
  <div class="card2"><h3>Sorotan</h3><p class="ins">${ins.join(' ')||'Catat transaksi pertamamu untuk melihat analisis di sini.'}</p></div>
  <div class="sec"><h2>Transaksi</h2><select id="ff" class="sel"><option value="">Semua kategori</option>${opts}</select></div>${rows||'<div class="empty">Belum ada transaksi pada bulan ini.</div>'}
  <button class="btn g" data-xb style="margin-top:12px">Atur anggaran, saldo awal, dan target</button>`;
}
function fillX(){$('xT2').hidden=xt!=='tf';$('xRw').hidden=xt==='tf'||!!xid;document.querySelectorAll('[data-xt]').forEach(b=>b.classList.toggle('on',b.dataset.xt===xt));const c=$('xC').value;$('xC').innerHTML=Object.entries(FC[xt]).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');if(own(FC[xt],c))$('xC').value=c}
function openX(x){xid=x?x.id:null;xt=x?x.type:'out';const wo=Object.entries(WL).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');$('xW').innerHTML=wo;$('xW2').innerHTML=wo;fillX();$('xA').value=x?fmtN(x.amt):'';if(x){$('xC').value=x.cat;$('xW').value=x.wal;if(x.wal2)$('xW2').value=x.wal2}else $('xW2').value='bank';$('xD').value=x?x.dt:iso(new Date());$('xN').value=x?x.note:'';$('xR').checked=false;$('xDel').hidden=!x;$('xErr').textContent='';$('ftX').textContent=x?'Ubah transaksi':'Catat transaksi';$('dX').showModal()}
function openB(){const row=(id,l,v)=>`<div class="sw"><span>${l}</span><input id="${id}" class="sel" inputmode="numeric" style="width:130px;text-align:right" value="${v?fmtN(v):''}"></div>`;$('bF').innerHTML=Object.entries(FC.out).map(([k,v])=>row('b-'+k,v,FIN.bud[k])).join('');$('wF').innerHTML=Object.entries(WL).map(([k,v])=>row('w-'+k,v,FIN.wal[k])).join('');$('gN').value=FIN.goal.n;$('gT').value=FIN.goal.t?fmtN(FIN.goal.t):'';$('dB').showModal()}
/* ---- hasil, batal, timer ---- */
let lgId=null,kcId=null;
function openLG(id){const x=S[sel].find(y=>y.id===id);if(!x||!MET[x.k])return;lgId=id;const cur=LOG[iso(dateOf(sel,0))+'|'+id]||{};$('lgT').textContent='Catat hasil: '+x.n;$('lgF').innerHTML=MET[x.k].map(m=>`<div class="sw"><span>${m[1]}</span><input class="sel" id="lg-${m[0]}" inputmode="decimal" style="width:100px;text-align:right" value="${cur[m[0]]!=null?f(cur[m[0]]):''}"></div>`).join('');$('dL').showModal()}
function openKC(id){const x=S[sel].find(y=>y.id===id);if(!x)return;kcId=id;$('cN').textContent=x.n+' · '+x.s+'–'+x.e;$('cD').value=iso(dateOf(sel,0));$('cTm').value=x.s;$('cErr').textContent='';$('dC').showModal()}
function tmrShow(){const el=$('tmr');if(!TM){el.hidden=true;return}el.hidden=false;el.innerHTML=`<div><small>${TM.ph==='fokus'?'Sesi fokus':'Istirahat'}</small><b>${esc(TM.name)}</b></div><strong id="tmT"></strong><button data-ts>Berhenti</button>`;tmrTick()}
function tmrTick(){if(!TM)return;const r=Math.ceil((TM.end-Date.now())/1000);if(r<=0){if(TM.ph==='fokus'){ring('Sesi fokus selesai. Istirahat 10 menit.');TM={name:TM.name,end:Date.now()+6e5,ph:'istirahat'}}else{ring('Istirahat selesai. Siap lanjut?');TM=null}save('timer-v5',TM);tmrShow();return}const t=$('tmT');if(t)t.textContent=String(Math.floor(r/60)).padStart(2,'0')+':'+String(r%60).padStart(2,'0')}
function startTimer(name){TM={name,end:Date.now()+50*6e4,ph:'fokus'};save('timer-v5',TM);tmrShow()}
function tplDraw(){$('tplL').innerHTML=TPL.length?'':'<div class="sr"><span class="tx2"><small>Belum ada template tersimpan.</small></span></div>';if(TPL.length)$('tplL').innerHTML=TPL.map(t=>`<div class="sr"><span class="tx2"><b>${esc(t.n)}</b></span><span><button class="mini" data-tl="${esc(t.id)}">Muat</button><button class="mini" data-tdl="${esc(t.id)}">Hapus</button></span></div>`).join('')}
/* ---- review: konsistensi, hasil, refleksi ---- */
function consistHTML(){
  const st=dOf(P),t0=midn(),wk=dateOf(1,0),pct=dt=>{const{d,o}=dinfo(dt),s=stats(d,o);return s.n?s.done/s.n:0};
  let run=0,best=0;for(const dt=new Date(st);dt<t0;dt.setDate(dt.getDate()+1)){if(pct(dt)>=.7){run++;best=Math.max(best,run)}else run=0}
  const cur=run+(pct(t0)>=.7?1:0);best=Math.max(best,cur);let cells='';
  for(let w=-11;w<=0;w++)for(let i=0;i<7;i++){const dt=new Date(wk);dt.setDate(wk.getDate()+w*7+i);const ok=dt>=st&&dt<=t0;cells+=`<i class="${ok?'':'f'}" style="--v:${ok?pct(dt):0}" title="${iso(dt)}"></i>`}
  return `<div class="card2"><h3>Konsistensi</h3><div class="rg2"><div><b>${cur}</b><small>hari beruntun</small></div><div><b>${best}</b><small>rekor terbaik</small></div></div><div class="heat" role="img" aria-label="Peta konsistensi 12 pekan">${cells}</div><p class="note">Hari konsisten berarti minimal 70% kegiatan selesai. Tiap kolom satu pekan, baris dari Senin sampai Minggu.</p></div>`;
}
function trendHTML(){
  const kOf={};Object.values(S).flat().forEach(x=>{kOf[x.id]=x.k});
  const ser=(ks,m)=>Object.keys(LOG).map(k=>{const[dt,id]=k.split('|');return{dt,v:ks.includes(kOf[id])?Number(LOG[k][m]):NaN}}).filter(x=>isFinite(x.v)).sort((a,b)=>a.dt.localeCompare(b.dt)).slice(-8).map(x=>x.v);
  const defs=[['Lari (km)',['run'],'km'],['Push-up',['str'],'pu'],['Kosakata baru',['man','ing'],'kv']];
  const rows=defs.map(([l,ks,m])=>{const v=ser(ks,m);if(!v.length)return'';const mx=Math.max(...v,1);return `<div style="margin-bottom:12px"><div class="mr" style="grid-template-columns:1fr auto;margin-bottom:4px"><span>${l}</span><b>terakhir ${f(v[v.length-1])} · rekor ${f(mx)}</b></div><div class="sp">${v.map(x=>`<i style="--h:${x/mx*100}%"></i>`).join('')}</div></div>`}).join('');
  return rows?`<div class="card2"><h3>Perkembangan hasil</h3>${rows}<p class="note">Target olahraga dan bahasa hanya naik bila minimal dua pertiga sesinya selesai pada pekan sebelumnya.</p></div>`:'';
}
function refCard(key){const r=REF[key]||{};return `<div class="card2"><h3>Refleksi singkat</h3><div class="mood" role="group" aria-label="Suasana hari ini, 1 kurang baik sampai 5 sangat baik">${[1,2,3,4,5].map(n=>`<button data-mood="${n}" class="${r.m===n?'on':''}">${n}</button>`).join('')}</div><input id="rf" class="rfi" data-k="${key}" type="text" maxlength="140" placeholder="Satu kalimat tentang hari ini" value="${esc(r.t||'')}"></div>`}
function refHTML(){const rows=ORDER.map(d=>{const k=iso(dateOf(d,rofs)),r=REF[k];return r&&(r.t||r.m)?`<p class="ins"><b>${DAYS[d].slice(0,3)}</b> ${r.m?'· '+r.m+'/5 ':''}${r.t?'· '+esc(r.t):''}</p>`:''}).join('');return rows?`<div class="card2"><h3>Refleksi pekan ini</h3>${rows}</div>`:''}
/* ---- ekspor .ics ---- */
function icsBuild(){
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Jadwal Harianku//ID','CALSCALE:GREGORIAN'],now=new Date(),z=n=>String(n).padStart(2,'0'),stamp=now.getFullYear()+z(now.getMonth()+1)+z(now.getDate())+'T'+z(now.getHours())+z(now.getMinutes())+'00';
  const e2=s=>String(s).replace(/[\\;,]/g,m=>'\\'+m).replace(/\n/g,'\\n'),fd=(dt,t)=>iso(dt).replace(/-/g,'')+'T'+t.replace(':','')+'00';
  const al=(tr,txt)=>['BEGIN:VALARM','TRIGGER:-'+tr,'ACTION:DISPLAY','DESCRIPTION:'+e2(txt),'END:VALARM'];
  const ev=(uid,s,e,sum,desc,more)=>{L.push('BEGIN:VEVENT','UID:'+uid+'@jadwal-harianku','DTSTAMP:'+stamp,'DTSTART:'+s,'DTEND:'+e,'SUMMARY:'+e2(sum));if(desc)L.push('DESCRIPTION:'+e2(desc));(more||[]).forEach(x=>L.push(x));L.push('END:VEVENT')};
  const BY=['SU','MO','TU','WE','TH','FR','SA'];
  for(let d=0;d<7;d++)(S[d]||[]).forEach(x=>{const dt=dateOf(d,0);ev('a-'+x.id,fd(dt,x.s),fd(dt,x.e),x.n,x.d,['RRULE:FREQ=WEEKLY;BYDAY='+BY[d],...al('PT10M',x.n+' dimulai')])});
  for(let i=0;i<30;i++){const dt=midn();dt.setDate(dt.getDate()+i);const{d,o}=dinfo(dt);dayList(d,o).filter(x=>x.auto&&/^p-(subuh|dzuhur|ashar|maghrib|isya|ngaji)$/.test(x.id)).forEach(x=>ev('s-'+iso(dt)+x.id,fd(dt,x.s),fd(dt,x.e),x.n,x.d,al('PT5M',x.n)))}
  EV.forEach(x=>{const dt=dOf(x.dt),t=x.t||'08:00',R={week:'WEEKLY',month:'MONTHLY',year:'YEARLY'}[x.rep];ev('e-'+x.id,fd(dt,t),fd(dt,hm(Math.min(mins(t)+30,1439))),x.n,x.note,(R?['RRULE:FREQ='+R]:[]).concat(x.lead<0?[]:al(x.lead===1440?'P1D':'PT'+x.lead+'M',x.n)))});
  TK.filter(t=>!t.done).forEach(t=>{const dt=dOf(t.due);ev('t-'+t.id,fd(dt,'08:00'),fd(dt,'08:30'),'Tenggat: '+t.n,t.course,[...al('P3D','Tenggat: '+t.n),...al('P1D','Tenggat: '+t.n)])});
  L.push('END:VCALENDAR');return L.join('\r\n');
}
/* ===== Hijriah: hisab astronomis dengan kriteria MABIMS (tinggi hilal >= 3 derajat, elongasi >= 6,4 derajat) ===== */
const HM=['Muharram','Safar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir','Rajab','Syaban','Ramadhan','Syawal','Dzulkaidah','Dzulhijjah'];
const HB={'0-1':'Tahun Baru Islam','2-12':'Maulid Nabi Muhammad SAW','6-27':'Isra Mikraj','8-1':'Awal Ramadhan','8-17':'Nuzulul Quran','9-1':'Idul Fitri','11-9':'Hari Arafah','11-10':'Idul Adha'};
const RAD=Math.PI/180,sinD=x=>Math.sin(x*RAD),cosD=x=>Math.cos(x*RAD),mod360=x=>((x%360)+360)%360;
function newMoonJD(k){
  const T=k/1236.85,E=1-.002516*T-.0000074*T*T,M=mod360(2.5534+29.1053567*k-.0000014*T*T),Mp=mod360(201.5643+385.81693528*k+.0107582*T*T+.00001238*T**3),F=mod360(160.7108+390.67050284*k-.0016118*T*T-.00000227*T**3),O=mod360(124.7746-1.56375588*k+.0020672*T*T);
  let j=2451550.09766+29.530588861*k+.00015437*T*T-.00000015*T**3+.00000000073*T**4;
  j+=-.4072*sinD(Mp)+.17241*E*sinD(M)+.01608*sinD(2*Mp)+.01039*sinD(2*F)+.00739*E*sinD(Mp-M)-.00514*E*sinD(Mp+M)+.00208*E*E*sinD(2*M)-.00111*sinD(Mp-2*F)-.00057*sinD(Mp+2*F)+.00056*E*sinD(2*Mp+M)-.00042*sinD(3*Mp)+.00042*E*sinD(M+2*F)+.00038*E*sinD(M-2*F)-.00024*E*sinD(2*Mp-M)-.00017*sinD(O);
  return j-69/86400;
}
const MT=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665]];
const BT=[[0,0,0,1,5128122],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],[2,0,1,1,4200]];
function moonEq(jd){
  const T=(jd-2451545)/36525,Lp=mod360(218.3164477+481267.88123421*T),D=mod360(297.8501921+445267.1114034*T),M=mod360(357.5291092+35999.0502909*T),Mp=mod360(134.9633964+477198.8675055*T),F=mod360(93.272095+483202.0175233*T),E=1-.002516*T-.0000074*T*T;
  let sl=0,sb=0;for(const[d,m,mp,f,c]of MT)sl+=c*(Math.abs(m)===1?E:1)*sinD(d*D+m*M+mp*Mp+f*F);for(const[d,m,mp,f,c]of BT)sb+=c*(Math.abs(m)===1?E:1)*sinD(d*D+m*M+mp*Mp+f*F);
  const lon=Lp+sl/1e6,lat=sb/1e6,eps=23.439291-.0130042*T;
  return{ra:mod360(Math.atan2(sinD(lon)*cosD(eps)-Math.tan(lat*RAD)*sinD(eps),cosD(lon))/RAD),dec:Math.asin(sinD(lat)*cosD(eps)+cosD(lat)*sinD(eps)*sinD(lon))/RAD}}
function sunEq(jd){const n=jd-2451545,g=mod360(357.529+.98560028*n),q=mod360(280.459+.98564736*n),L=q+1.915*sinD(g)+.02*sinD(2*g),eps=23.439-4e-7*n;return{ra:mod360(Math.atan2(cosD(eps)*sinD(L),cosD(L))/RAD),dec:Math.asin(sinD(eps)*sinD(L))/RAD}}
const SAB={lat:5.89,lng:95.32,tz:7};
function hilal(y,m,d){
  const sun=(prayer(new Date(y,m,d),SAB).maghrib-2)/60,jd=Date.UTC(y,m,d)/864e5+2440587.5+(sun-SAB.tz)/24,S=sunEq(jd),Mo=moonEq(jd),H=mod360(280.46061837+360.98564736629*(jd-2451545)+SAB.lng-Mo.ra);
  return{alt:Math.asin(sinD(SAB.lat)*sinD(Mo.dec)+cosD(SAB.lat)*cosD(Mo.dec)*cosD(H))/RAD,el:Math.acos(Math.max(-1,Math.min(1,sinD(S.dec)*sinD(Mo.dec)+cosD(S.dec)*cosD(Mo.dec)*cosD(S.ra-Mo.ra))))/RAD}}
const MSC={};
function monthStart(k){if(MSC[k]!==undefined)return MSC[k];const c=new Date((newMoonJD(k)+7/24-2440587.5)*864e5),y=c.getUTCFullYear(),m=c.getUTCMonth(),d=c.getUTCDate(),h=hilal(y,m,d),g=Date.UTC(y,m,d)/864e5;return MSC[k]=g+(h.alt>=3&&h.el>=6.4?1:2)}
function toHijri(dt,off){const dn=Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate())/864e5+(off||0),k=Math.floor((dn+2440587.5-2451550.1)/29.530588861);
  for(let i=k+2;i>=k-3;i--){const s=monthStart(i);if(s<=dn){const idx=i-315;return{y:1447+Math.floor(idx/12),m:((idx%12)+12)%12,d:dn-s+1}}}return null}
const hjStr=dt=>{const h=toHijri(dt,ST.hjo);return h?h.d+' '+HM[h.m]+' '+h.y+' H':''};
const hjBesar=dt=>{const h=toHijri(dt,ST.hjo);return h&&HB[h.m+'-'+h.d]||''};
const MON=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const leap=y=>(y%4===0&&y%100!==0)||y%400===0;
let cy=new Date().getFullYear(),cmo=new Date().getMonth(),csel=iso(new Date()),evId=null;
function calHTML(){
  if(cmode==='agenda')return cmodeBar()+agendaHTML();
  const first=new Date(cy,cmo,1),dim=new Date(cy,cmo+1,0).getDate(),lead=(first.getDay()+6)%7,tdy=iso(new Date()),h1=toHijri(first,ST.hjo),h2=toHijri(new Date(cy,cmo,dim),ST.hjo);
  let cells='';for(let i=0;i<lead;i++)cells+='<i></i>';
  for(let n=1;n<=dim;n++){const dt=new Date(cy,cmo,n),k=iso(dt),evs=EV.filter(e=>occurs(e,dt)).concat(TK.filter(t=>!t.done&&t.due===k)),hh=ST.hj?toHijri(dt,ST.hjo):null,hb=hh&&HB[hh.m+'-'+hh.d];
    cells+=`<button class="cl${k===tdy?' td':''}${k===csel?' sl':''}" data-cd="${k}" aria-label="${n} ${MON[cmo]}${evs.length?', '+evs.length+' pengingat':''}"><b>${n}</b>${hh?`<em>${hh.d===1?HM[hh.m].slice(0,3):hh.d}</em>`:''}<span>${hb?'<u class="hb"></u>':''}${evs.slice(0,3).map(()=>'<u></u>').join('')}</span></button>`}
  const[y,m,d]=csel.split('-').map(Number),sd=new Date(y,m-1,d),sev=EV.filter(e=>occurs(e,sd)).sort((a,b)=>(a.t||'').localeCompare(b.t||''));
  const REP={none:'',week:'Setiap pekan',month:'Setiap bulan',year:'Setiap tahun'};
  return cmodeBar()+`<div class="nav"><button class="round" data-cm="-1" aria-label="Bulan sebelumnya"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><b>${MON[cmo]} ${cy}<small>${dim} hari${leap(cy)?' · tahun kabisat':''}${ST.hj&&h1&&h2?' · '+(h1.m===h2.m?HM[h1.m]:HM[h1.m]+'–'+HM[h2.m])+' '+h2.y+' H':''}</small></b><button class="round" data-cm="1" aria-label="Bulan berikutnya"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button></div>
  <div class="cal"><div class="cw">${['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(x=>`<span>${x}</span>`).join('')}</div><div class="cg">${cells}</div></div>
  <div class="sec"><h2>${DAYS[sd.getDay()]}, ${d} ${MON[m-1]} ${y}</h2><button class="lnk" data-cnow>Hari ini</button></div><p class="hj">${hijri(sd)}</p>
  ${sev.length?sev.map(e=>`<div class="evr"><div><b>${e.t?e.t+' · ':''}${esc(e.n)}</b><span>${[e.note,REP[e.rep],e.lead<0?'':e.lead===0?'Diingatkan tepat waktu':e.lead===1440?'Diingatkan 1 hari sebelumnya':'Diingatkan '+e.lead+' menit sebelumnya'].filter(Boolean).map(esc).join(' · ')}</span></div><button class="ic" data-ee="${esc(e.id)}" aria-label="Ubah ${esc(e.n)}">${IE}</button></div>`).join(''):'<div class="empty">Belum ada pengingat atau catatan pada tanggal ini.</div>'}
  ${TK.filter(t=>t.due===csel).map(taskRow).join('')}<button class="btn g" data-ea style="margin-top:10px">Tambah pengingat di tanggal ini</button>`;
}
function openEv(ev,dt){evId=ev?ev.id:null;$('eT').value=ev?ev.n:'';$('eD').value=ev?ev.dt:dt;$('eTm').value=ev?ev.t:'';$('eN').value=ev?ev.note:'';$('eR').value=ev?ev.rep:'none';$('eL').value=ev?ev.lead:10;$('eDel').hidden=!ev;$('eErr').textContent='';$('ftE').textContent=ev?'Ubah pengingat':'Tambah pengingat';$('dE').showModal()}
function openForm(x){
  editId=x?x.id:null;fDays.clear();$('fM').value='w';$('fDw').hidden=true;$('fMr').hidden=!!x;$('fDd').hidden=!!x;$('d').parentElement.hidden=false;$('fDt').value=iso(new Date());drawChips();
  $('d').value=x?x.day:sel;$('s').value=x?x.s:'13:00';$('e').value=x?x.e:'14:00';
  $('n').value=x?x.n:'';$('m').value=x?x.d:'';$('c').value=x?x.c:'belajar';
  $('ftitle').textContent=x?'Ubah kegiatan':'Tambah kegiatan';$('err').textContent='';
  $('dF').showModal();
}
function permText(){return !('Notification' in window)?'Notifikasi browser tidak didukung':Notification.permission==='granted'?'Notifikasi browser aktif':Notification.permission==='denied'?'Notifikasi diblokir di browser':'Izinkan notifikasi browser'}
function permUI(){const n='Notification' in window,p=n?Notification.permission:'';$('rPerm').textContent=!n?'Tidak didukung':p==='granted'?'Aktif':p==='denied'?'Diblokir':'Izinkan';$('rHint').textContent=!n?'Browser ini tidak mendukung notifikasi':p==='granted'?'Notifikasi muncul di layar HP-mu':p==='denied'?'Diblokir. Ubah lewat pengaturan situs di browser, atau pasang aplikasi ke layar utama':'Ketuk Izinkan untuk menerima notifikasi'}
function openSet(){$('rOn').checked=ST.on;$('rLead').value=ST.lead;$('cty').value=ST.city;$('pd').value=ST.pd;$('ng').value=ST.ng;$('wk').value=ST.wake;$('sl').value=ST.sleep;$('jm').value=ST.jm;$('th').value=ST.theme;$('fs').value=ST.fs;$('nb').value=ST.nb;$('hjT').checked=ST.hj;$('hjo').value=String(ST.hjo);permUI();tplDraw();showPage('hub');$('dS').showModal()}
$('d').innerHTML=ORDER.map(d=>`<option value="${d}">${DAYS[d]}</option>`).join('');
$('cty').innerHTML=Object.keys(CITY).map(k=>`<option value="${k}">${CITY[k][0]}</option>`).join('')+'<option value="gps">Lokasi saya (GPS)</option>';
document.addEventListener('click',e=>{
  const T=s=>e.target.closest(s);let q;
  if(q=T('[data-sp]')){showPage(q.dataset.sp);return}
  if(q=T('[data-go]')){goTo(q.dataset.go);return}
  if(q=T('[data-v]')){view=q.dataset.v;render();return}
  if(q=T('[data-fm]')){fmo+=+q.dataset.fm;if(fmo<0){fmo=11;fy--}if(fmo>11){fmo=0;fy++}render();return}
  if(q=T('[data-xe]')){const x=FIN.tx.find(y=>y.id===q.dataset.xe);if(x)openX(x);return}
  if(T('[data-xb]')){openB();return}
  if(q=T('[data-rd]')){FIN=cleanFIN({...FIN,rec:FIN.rec.filter(x=>x.id!==q.dataset.rd)});save('uang-v5',FIN);render();toast('Transaksi berulang dihapus');return}
  if(q=T('[data-cmd]')){cmode=q.dataset.cmd;render();return}
  if(q=T('[data-dc]')){const d=+q.dataset.dc;fDays.has(d)?fDays.delete(d):fDays.add(d);drawChips();return}
  if(q=T('[data-xt]')){xt=q.dataset.xt;fillX();return}
  if(q=T('[data-te]')){const x=TK.find(y=>y.id===q.dataset.te);if(x)openT(x);return}
  if(q=T('[data-lg]')){openLG(q.dataset.lg);return}
  if(q=T('[data-kc]')){openKC(q.dataset.kc);return}
  if(q=T('[data-rc]')){delete CANC[iso(dateOf(sel,0))+'|'+q.dataset.rc];save('batal-v5',CANC);render();return}
  if(q=T('[data-fo]')){const x=S[sel].find(y=>y.id===q.dataset.fo);if(x)startTimer(x.n);return}
  if(T('[data-ts]')){TM=null;save('timer-v5',TM);tmrShow();return}
  if(q=T('[data-mood]')){const k=iso(dateOf(sel,0));REF[k]={...(REF[k]||{}),m:+q.dataset.mood};save('refleksi-v5',REF);render();return}
  if(q=T('[data-tl]')){const t=TPL.find(y=>y.id===q.dataset.tl);if(t){const prev=S;S=clean(t.S);save('jadwal-v4',S);$('dS').close();render();toast('Template dimuat','Urungkan',()=>{S=prev;save('jadwal-v4',S);render()},8000)}return}
  if(q=T('[data-tdl]')){TPL=TPL.filter(y=>y.id!==q.dataset.tdl);save('templat-v5',TPL);tplDraw();return}
  const cm=e.target.closest('[data-cm]');if(cm){cmo+=+cm.dataset.cm;if(cmo<0){cmo=11;cy--}if(cmo>11){cmo=0;cy++}render();return}
  const cd=e.target.closest('[data-cd]');if(cd){csel=cd.dataset.cd;render();return}
  if(e.target.closest('[data-cnow]')){const n=new Date();cy=n.getFullYear();cmo=n.getMonth();csel=iso(n);render();return}
  if(e.target.closest('[data-ea]')){openEv(null,csel);return}
  const ee=e.target.closest('[data-ee]');if(ee){const x=EV.find(y=>y.id===ee.dataset.ee);if(x)openEv(x);return}
  const v=e.target.closest('[data-v]');if(v){view=v.dataset.v;render();return}
  const rn=e.target.closest('[data-rn]');if(rn&&!rn.disabled){rofs=Math.min(0,Math.max(-week(),rofs+ +rn.dataset.rn));render();return}
  const tb=e.target.closest('[data-d]');if(tb){sel=+tb.dataset.d;render();return}
  const dl=e.target.closest('[data-del]');
  if(dl){const i=S[sel].findIndex(x=>x.id===dl.dataset.del);if(i>-1){const it=S[sel].splice(i,1)[0],dy=sel;save('jadwal-v4',S);render();toast('Kegiatan dihapus','Urungkan',()=>{S[dy].push(it);save('jadwal-v4',S);render()},6000)}return}
  const ed=e.target.closest('[data-ed]');if(ed){const x=S[sel].find(y=>y.id===ed.dataset.ed);if(x)openForm({...x,day:sel})}
});
document.addEventListener('change',e=>{
  if(e.target.id==='ff'){ff=e.target.value;render();return}
  const tid=e.target.dataset&&e.target.dataset.tid;if(tid){const t=TK.find(x=>x.id===tid);if(t){t.done=e.target.checked;save('tugas-v5',TK);render()}return}
  const id=e.target.dataset&&e.target.dataset.id;if(!id)return;
  const k=iso(dateOf(sel,0))+'|'+id;if(e.target.checked)D[k]=1;else delete D[k];
  save('selesai-v4',D);render();
});
document.addEventListener('input',e=>{const a=e.target.getAttribute&&e.target.getAttribute('inputmode');if(a==='numeric'){const v=num(e.target.value);e.target.value=v?fmtN(v):''}if(e.target.id==='rf'){const k=e.target.dataset.k;REF[k]={...(REF[k]||{}),t:e.target.value.slice(0,140)};save('refleksi-v5',REF)}if(e.target.id==='note'){NOTE[e.target.dataset.k]=e.target.value.slice(0,1000);save('catatan-v4',NOTE)}});
$('fab').onclick=()=>({cal:()=>openEv(null,csel),task:()=>openT(null),fin:()=>openX(null)}[view]||(()=>openForm(null)))();$('gear').onclick=openSet;$('cancel').onclick=()=>$('dF').close();$('closeS').onclick=()=>$('dS').close();
for(const id of['dF','dE','dT','dX','dB','dL','dC'])$(id).addEventListener('click',e=>{if(e.target.id===id)$(id).close()});
$('save').onclick=()=>{
  const day=+$('d').value,s=$('s').value,e=$('e').value,n=$('n').value.trim(),c=$('c').value,m=$('m').value.trim();
  if(!n){$('err').textContent='Isi nama kegiatan terlebih dahulu.';return}
  if(!TIME.test(s)||!TIME.test(e)||mins(e)<=mins(s)){$('err').textContent='Jam selesai harus setelah jam mulai.';return}
  if(!editId&&$('fM').value==='o'){const dt=$('fDt').value;if(!DT.test(dt)){$('err').textContent='Pilih tanggal kegiatan.';return}
    EV=cleanEV(EV.concat({id:'e'+Date.now().toString(36),dt,t:s,n,note:(m?m+' · ':'')+s+'–'+e,rep:'none',lead:10}));save('acara-v5',EV);const pp=dt.split('-').map(Number);cy=pp[0];cmo=pp[1]-1;csel=dt;$('dF').close();render();toast('Kegiatan sekali saja masuk ke kalender dan timeline');return}
  let old=null;
  if(editId)for(const k in S){const i=S[k].findIndex(x=>x.id===editId);if(i>-1)old=S[k].splice(i,1)[0]}
  S[day].push({id:old?old.id:'t'+Date.now().toString(36),s,e,c,n,d:m,k:old?old.k:''});if(!old)fDays.forEach(d2=>{if(d2!==day)S[d2].push({id:'t'+Date.now().toString(36)+d2,s,e,c,n,d:m,k:''})});
  save('jadwal-v4',S);sel=day;$('dF').close();render();
};
const setST=()=>{save('atur-v4',ST);render();prayPrev()};
$('rOn').onchange=e=>{ST.on=e.target.checked;save('atur-v4',ST)};
$('rLead').onchange=e=>{ST.lead=+e.target.value;save('atur-v4',ST)};
$('cty').onchange=e=>{ST.city=e.target.value;setST()};
$('pd').onchange=e=>{ST.pd=+e.target.value;setST()};
$('ng').onchange=e=>{ST.ng=e.target.value;setST()};
$('wk').onchange=e=>{if(TIME.test(e.target.value)){ST.wake=e.target.value;setST()}};
const closeOn=(id,b)=>{$(b).onclick=()=>$(id).close()};
closeOn('dT','tCan');closeOn('dX','xCan');closeOn('dB','bC');closeOn('dL','lgC');closeOn('dC','cBack');
$('tS').onclick=()=>{const n=$('tT').value.trim(),due=$('tD').value;if(!n){$('tErr').textContent='Isi judul tugas terlebih dahulu.';return}if(!DT.test(due)){$('tErr').textContent='Pilih tanggal tenggat.';return}
  const old=TK.find(x=>x.id===tkId),o={id:tkId||'k'+Date.now().toString(36),n,course:$('tC').value,due,prio:+$('tP').value,note:$('tN').value.trim(),done:old?old.done:false};
  TK=cleanTK(TK.filter(x=>x.id!==o.id).concat(o));save('tugas-v5',TK);$('dT').close();render();toast('Tugas disimpan')};
$('tDel').onclick=()=>{const old=TK.find(x=>x.id===tkId);TK=TK.filter(x=>x.id!==tkId);save('tugas-v5',TK);$('dT').close();render();if(old)toast('Tugas dihapus','Urungkan',()=>{TK.push(old);save('tugas-v5',TK);render()},6000)};
$('xS').onclick=()=>{const amt=num($('xA').value),dt=$('xD').value;if(!amt){$('xErr').textContent='Isi jumlah uang terlebih dahulu.';return}if(!DT.test(dt)){$('xErr').textContent='Pilih tanggal yang valid.';return}
  if(xt==='tf'&&$('xW').value===$('xW2').value){$('xErr').textContent='Pilih dua dompet yang berbeda.';return}
  const o={id:xid||'x'+Date.now().toString(36),dt,type:xt,cat:$('xC').value,wal:$('xW').value,wal2:xt==='tf'?$('xW2').value:'',amt,note:$('xN').value.trim()};
  const rec=!xid&&xt!=='tf'&&$('xR').checked?[{id:'c'+Date.now().toString(36),dom:+dt.slice(8),type:xt,cat:o.cat,wal:o.wal,amt,note:o.note,last:dt.slice(0,7)}]:[];
  FIN=cleanFIN({...FIN,tx:FIN.tx.filter(y=>y.id!==o.id).concat(o),rec:FIN.rec.concat(rec)});save('uang-v5',FIN);const p=dt.split('-').map(Number);fy=p[0];fmo=p[1]-1;$('dX').close();render();
  toast(budWarn(o)||'Transaksi disimpan')};
$('xDel').onclick=()=>{const old=FIN.tx.find(x=>x.id===xid);FIN=cleanFIN({...FIN,tx:FIN.tx.filter(x=>x.id!==xid)});save('uang-v5',FIN);$('dX').close();render();if(old)toast('Transaksi dihapus','Urungkan',()=>{FIN=cleanFIN({...FIN,tx:FIN.tx.concat(old)});save('uang-v5',FIN);render()},6000)};
$('bS').onclick=()=>{const b={},w={};for(const k in FC.out)b[k]=num($('b-'+k).value);for(const k in WL)w[k]=num($('w-'+k).value);FIN=cleanFIN({...FIN,bud:b,wal:w,goal:{n:$('gN').value.trim(),t:num($('gT').value)}});save('uang-v5',FIN);$('dB').close();render();toast('Pengaturan keuangan disimpan')};
$('lgS').onclick=()=>{const x=S[sel].find(y=>y.id===lgId);if(!x)return;const key=iso(dateOf(sel,0)),o={};MET[x.k].forEach(m=>{const v=parseFloat($('lg-'+m[0]).value.replace(',','.'));if(isFinite(v)&&v>=0)o[m[0]]=Math.min(v,99999)});
  if(Object.keys(o).length){LOG[key+'|'+lgId]=o;D[key+'|'+lgId]=1;save('hasil-v5',LOG);save('selesai-v4',D)}$('dL').close();render()};
function doCancel(move){const key=iso(dateOf(sel,0)),x=S[sel].find(y=>y.id===kcId);if(!x)return;
  if(move){const dt=$('cD').value,tm=$('cTm').value;if(!DT.test(dt)||!TIME.test(tm)){$('cErr').textContent='Isi tanggal dan jam pengganti.';return}EV=cleanEV(EV.concat({id:'e'+Date.now().toString(36),dt,t:tm,n:'Kuliah pengganti: '+x.n,note:x.d,rep:'none',lead:30}));save('acara-v5',EV)}
  CANC[key+'|'+kcId]=1;save('batal-v5',CANC);$('dC').close();render();
  toast(move?'Kuliah dipindahkan ke jadwal pengganti':'Kuliah dibatalkan untuk hari ini','Urungkan',()=>{delete CANC[key+'|'+x.id];save('batal-v5',CANC);render()},7000)}
$('cOnly').onclick=()=>doCancel(false);$('cMove').onclick=()=>doCancel(true);
$('th').onchange=e=>{ST.theme=e.target.value;applyLook();save('atur-v4',ST)};
$('fs').onchange=e=>{ST.fs=+e.target.value;applyLook();save('atur-v4',ST)};
$('nb').onchange=e=>{ST.nb=e.target.value;save('atur-v4',ST);setBO()};
$('hjT').onchange=e=>{ST.hj=e.target.checked;save('atur-v4',ST);render()};
$('hjo').onchange=e=>{ST.hjo=+e.target.value;save('atur-v4',ST);render()};
$('tsv').onclick=()=>{const n=$('tn').value.trim().slice(0,40);if(!n){toast('Beri nama template terlebih dahulu');return}TPL.push({id:'p'+Date.now().toString(36),n,S:JSON.parse(JSON.stringify(S))});save('templat-v5',TPL);$('tn').value='';tplDraw();toast('Template disimpan')};
$('ics').onclick=()=>{const t=icsBuild();$('bx').value=t;try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));a.download='jadwal-harianku.ics';a.click()}catch(e){}try{navigator.clipboard.writeText(t).then(()=>toast('File .ics dibuat dan teksnya disalin. Simpan sebagai jadwal.ics bila tidak terunduh.'))}catch(e){toast('File .ics dibuat. Salin teks di kotak cadangan lalu simpan sebagai jadwal.ics.')}};
setInterval(tmrTick,1000);tmrShow();
$('sl').onchange=e=>{if(TIME.test(e.target.value)){ST.sleep=e.target.value;setST()}};
$('jm').onchange=e=>{ST.jm=+e.target.value;setST()};
$('eCancel').onclick=()=>$('dE').close();
$('eSave').onclick=()=>{const n=$('eT').value.trim(),dt=$('eD').value;
  if(!n){$('eErr').textContent='Isi judul pengingat terlebih dahulu.';return}
  if(!/^\d{4}-\d\d-\d\d$/.test(dt)){$('eErr').textContent='Pilih tanggal yang valid.';return}
  const o={id:evId||'e'+Date.now().toString(36),dt,t:TIME.test($('eTm').value)?$('eTm').value:'',n,note:$('eN').value.trim(),rep:$('eR').value,lead:+$('eL').value};
  EV=cleanEV(EV.filter(x=>x.id!==o.id).concat(o));save('acara-v5',EV);const p=dt.split('-').map(Number);cy=p[0];cmo=p[1]-1;csel=dt;$('dE').close();render();toast('Pengingat disimpan')};
$('eDel').onclick=()=>{const old=EV.find(x=>x.id===evId);EV=EV.filter(x=>x.id!==evId);save('acara-v5',EV);$('dE').close();render();if(old)toast('Pengingat dihapus','Urungkan',()=>{EV.push(old);save('acara-v5',EV);render()},6000)};
$('gps').onclick=()=>{try{navigator.geolocation.getCurrentPosition(p=>{ST.city='gps';ST.lat=p.coords.latitude;ST.lng=p.coords.longitude;ST.tz=-new Date().getTimezoneOffset()/60;ST=cleanST(ST);$('cty').value='gps';setST();toast('Lokasi diperbarui, waktu shalat disesuaikan')},()=>toast('Lokasi tidak dapat diakses. Pilih kota secara manual.'),{timeout:10000})}catch(e){toast('Lokasi tidak didukung di browser ini.')}};
$('rPerm').onclick=()=>{try{Notification.requestPermission().then(permUI)}catch(e){permUI()}};
$('bk').onclick=async()=>{LB=Date.now();save('cad-v6',LB);let j=JSON.stringify({S,D,ST,NOTE,EV,TK,LOG,CANC,REF,FIN});const pw=$('bkPw').value;
  if(pw){if(pw.length<6){toast('Kata sandi minimal 6 karakter');return}try{j=await BOOT.pwEnc(j,pw)}catch(e){toast('Enkripsi tidak tersedia (perlu https)');return}}
  $('bx').value=j;$('bx').select();try{navigator.clipboard.writeText(j).then(()=>toast(pw?'Cadangan terenkripsi disalin':'Cadangan disalin'))}catch(e){}};
$('rs').onclick=async()=>{try{let t=$('bx').value.trim();if(t.startsWith('JHBK1.')){const pw=$('bkPw').value;if(!pw){toast('Isi kata sandi cadangan');return}try{t=await BOOT.pwDec(t,pw)}catch(e){toast('Kata sandi salah atau cadangan rusak');return}}
  const o=JSON.parse(t);S=clean(o.S);D=cleanD(o.D);ST=cleanST(o.ST);NOTE=cleanNote(o.NOTE);EV=cleanEV(o.EV);save('acara-v5',EV);TK=cleanTK(o.TK);LOG=cleanLog(o.LOG);CANC=cleanD(o.CANC);REF=cleanRef(o.REF);FIN=cleanFIN(o.FIN);save('tugas-v5',TK);save('hasil-v5',LOG);save('batal-v5',CANC);save('refleksi-v5',REF);save('uang-v5',FIN);applyLook();save('jadwal-v4',S);save('selesai-v4',D);save('atur-v4',ST);save('catatan-v4',NOTE);$('dS').close();render();toast('Data berhasil dipulihkan')}catch(e){toast('Format cadangan tidak valid')}};
$('reset').onclick=()=>{
  if(!resetArm){resetArm=true;$('reset').textContent='Yakin? Klik sekali lagi untuk mengembalikan';setTimeout(()=>{resetArm=false;$('reset').textContent='Kembalikan jadwal awal'},4000);return}
  S=fresh();D={};save('jadwal-v4',S);save('selesai-v4',D);resetArm=false;$('reset').textContent='Kembalikan jadwal awal';$('dS').close();render();
};
function notify(msg){try{if(!('Notification' in window)||Notification.permission!=='granted')return;const go=()=>{try{new Notification('Pengingat jadwal',{body:msg})}catch(e){}};if(navigator.serviceWorker&&navigator.serviceWorker.getRegistration)navigator.serviceWorker.getRegistration().then(r=>r?r.showNotification('Pengingat jadwal',{body:msg,icon:'icon-192.png'}):go()).catch(go);else go()}catch(e){}}
function ring(msg){toast(msg,'',null,15000);notify(msg);try{if(navigator.vibrate)navigator.vibrate(200)}catch(e){}}
function tick(){
  postRec();
  const now=new Date(),nm=now.getHours()*60+now.getMinutes(),td=iso(now),cut=iso(new Date(now.getFullYear(),now.getMonth(),now.getDate()-3));
  NT.i=(NT.i||[]).filter(k=>(k.split('|')[1]||'')>=cut);
  if(ST.on)dayList(now.getDay(),0).forEach(x=>{if(x.ev||x.canc)return;const df=mins(x.s)-nm,k='a|'+td+'|'+x.id;if(df>0&&df<=ST.lead&&!NT.i.includes(k)){NT.i.push(k);ring(x.n+' dimulai '+df+' menit lagi (pukul '+x.s+')')}});
  [0,1].forEach(o=>{const dt=new Date(now.getFullYear(),now.getMonth(),now.getDate()+o);EV.forEach(ev=>{if(ev.lead<0||!occurs(ev,dt))return;const at=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),0,ev.t?mins(ev.t):480).getTime(),k='e|'+iso(dt)+'|'+ev.id;
    if(now.getTime()>=at-ev.lead*6e4&&now.getTime()<at+36e5&&!NT.i.includes(k)){NT.i.push(k);ring('Pengingat: '+ev.n+(ev.t?' pukul '+ev.t:o?' besok':' hari ini'))}})});
  TK.forEach(t=>{if(t.done)return;const due=dOf(t.due);[[3,'3 hari lagi'],[1,'besok'],[0,'hari ini']].forEach(([n,w])=>{const at=new Date(due.getFullYear(),due.getMonth(),due.getDate()-n,8).getTime(),k='t|'+iso(new Date(at))+'|'+t.id+'|'+n;if(now.getTime()>=at&&now.getTime()<at+216e5&&!NT.i.includes(k)){NT.i.push(k);ring('Tugas '+w+': '+t.n+(t.course?' ('+t.course+')':''))}})});
  save('notif-v4',NT);
}
const SP={hub:'Pengaturan',rem:'Pengingat',ibd:'Ibadah',day:'Jadwal harian',look:'Tampilan',tpl:'Template jadwal',exp:'Ekspor ke kalender',bak:'Cadangan dan data',abt:'Tentang',sec:'Keamanan'};
let spg='hub';
function setSub(){const C=ST.city==='gps'?'Lokasi saya':CITY[ST.city][0];$('sub-sec').textContent=BOOT.has()?'PIN aktif, data terenkripsi':'PIN belum diatur';
  $('sub-rem').textContent=ST.on?'Aktif · '+ST.lead+' menit sebelumnya':'Nonaktif';
  $('sub-ibd').textContent=C+' · shalat '+ST.pd+' menit'+(ST.ng==='off'?'':' · mengaji aktif');
  $('sub-day').textContent='Bangun '+ST.wake+' · tidur '+ST.sleep;
  $('sub-look').textContent={auto:'Otomatis',light:'Terang',dark:'Gelap'}[ST.theme]+' · huruf '+{15:'kecil',16:'normal',17:'besar'}[ST.fs];
  $('sub-tpl').textContent=TPL.length+' template tersimpan';
  $('sub-exp').textContent='File .ics dengan alarm';$('sub-bak').textContent=LB?(Date.now()-LB<864e5?'Cadangan terakhir hari ini':'Cadangan terakhir '+Math.floor((Date.now()-LB)/864e5)+' hari lalu'):'Belum pernah membuat cadangan'}
function prayPrev(){const T=prayer(new Date(),cityObj());$('pPrev').innerHTML=[['Subuh',T.subuh],['Terbit',T.syuruq],['Dzuhur',T.dzuhur],['Ashar',T.ashar],['Maghrib',T.maghrib],['Isya',T.isya]].map(([n,v])=>`<div class="pv"><small>${n}</small><b>${hm(v)}</b></div>`).join('')}
function showPage(p){spg=p;document.querySelectorAll('[data-p]').forEach(s=>{s.hidden=s.dataset.p!==p});$('sTitle').textContent=SP[p];$('sBack').hidden=p==='hub';if(p==='hub')setSub();if(p==='ibd')prayPrev();if(p==='sec')pinUI();const d=$('dS');if(d.scrollTo)d.scrollTo(0,0)}
{const d=$('dS');d.showModal=()=>{d.hidden=false;document.body.style.overflow='hidden'};d.close=()=>{d.hidden=true;document.body.style.overflow=''}}
$('sBack').onclick=()=>showPage('hub');
$('rTest').onclick=()=>ring('Ini contoh pengingat dari Jadwal Harianku.');
let wipeArm=false;
$('wipe').onclick=()=>{if(!wipeArm){wipeArm=true;$('wipe').textContent='Yakin? Ketuk sekali lagi untuk menghapus semuanya';setTimeout(()=>{wipeArm=false;$('wipe').textContent='Hapus semua data'},4000);return}
  wipeArm=false;$('wipe').textContent='Hapus semua data';S=fresh();D={};EV=[];TK=[];LOG={};CANC={};REF={};TPL=[];NOTE={};FIN=cleanFIN(null);ST=cleanST(null);TM=null;NT={i:[]};
  save('jadwal-v4',S);save('selesai-v4',D);save('acara-v5',EV);save('tugas-v5',TK);save('hasil-v5',LOG);save('batal-v5',CANC);save('refleksi-v5',REF);save('templat-v5',TPL);save('catatan-v4',NOTE);save('uang-v5',FIN);save('atur-v4',ST);save('timer-v5',TM);save('notif-v4',NT);
  applyLook();tmrShow();$('dS').close();render();toast('Semua data telah dihapus')};
/* pencarian */
function runSearch(q){const s=q.trim().toLowerCase(),out=[];if(s.length<2)return out;const m=t=>String(t||'').toLowerCase().includes(s),fd=x=>dOf(x).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
  ORDER.forEach(d=>(S[d]||[]).forEach(x=>{if(m(x.n)||m(x.d))out.push({t:'Kegiatan',n:x.n,s:DAYS[d]+' · '+x.s+'–'+x.e,go:'a|'+d})}));
  EV.forEach(e=>{if(m(e.n)||m(e.note))out.push({t:'Pengingat',n:e.n,s:fd(e.dt)+(e.t?' · '+e.t:''),go:'e|'+e.dt})});
  TK.forEach(t=>{if(m(t.n)||m(t.course)||m(t.note))out.push({t:'Tugas',n:t.n,s:t.course+' · tenggat '+fd(t.due),go:'t|'})});
  FIN.tx.forEach(x=>{const c=FC[x.type][x.cat];if(m(x.note)||m(c))out.push({t:'Keuangan',n:x.note||c,s:rp(x.amt)+' · '+fd(x.dt),go:'f|'+x.dt})});
  Object.keys(REF).forEach(k=>{if(m(REF[k].t))out.push({t:'Refleksi',n:REF[k].t,s:fd(k),go:'r|'+k})});
  return out.slice(0,50)}
function drawSearch(){const q=$('schQ').value,r=runSearch(q);$('schR').innerHTML=q.trim().length<2?'<p class="note">Ketik minimal 2 huruf untuk mencari di kegiatan, pengingat, tugas, transaksi, dan refleksi.</p>':r.length?'<div class="sl">'+r.map(x=>`<button class="sr" data-go="${esc(x.go)}"><span class="tx2"><b>${esc(x.n)}</b><small>${esc(x.s)}</small></span><span class="chip" style="--c:var(--acc);margin:0">${x.t}</span></button>`).join('')+'</div>':'<div class="empty">Tidak ada hasil untuk “'+esc(q.trim())+'”.</div>'}
function closeSch(){$('sch').hidden=true;document.body.style.overflow=''}
function goTo(g){const[k,v]=g.split('|');closeSch();
  if(k==='a'||k==='r'){view='plan';sel=k==='a'?+v:dOf(v).getDay()}
  else if(k==='e'){view='cal';const p=v.split('-').map(Number);cy=p[0];cmo=p[1]-1;csel=v}
  else if(k==='t')view='task';
  else if(k==='f'){view='fin';const p=v.split('-').map(Number);fy=p[0];fmo=p[1]-1}
  render();window.scrollTo&&window.scrollTo(0,0)}
$('srch').onclick=()=>{$('sch').hidden=false;document.body.style.overflow='hidden';$('schQ').value='';drawSearch();$('schQ').focus()};
$('schQ').oninput=drawSearch;$('schBack').onclick=closeSch;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('sch').hidden)closeSch();else if(!$('dS').hidden)$('dS').close()}});
/* ===== keamanan (PIN dan enkripsi dikelola boot.js) ===== */
function pinUI(){const h=BOOT.has(),c=BOOT.cfg();$('pinSt').textContent=h?'Aktif, data terenkripsi':'Belum diatur';$('pinB').textContent=h?'Ubah':'Atur';$('pinR').hidden=!h;$('pinX').hidden=!h;$('lkDl').disabled=!h;$('lkW').disabled=!h;if(h){$('lkDl').value=String(c.delay);$('lkW').value=String(c.wipe)}}
const pinDone=()=>{pinUI();setSub();toast('PIN 8 digit aktif, data terenkripsi')};
$('pinB').onclick=()=>{if(!BOOT.ok()){toast('PIN memerlukan koneksi aman (https).');return}BOOT.has()?BOOT.verify(()=>BOOT.setNew(pinDone)):BOOT.setNew(pinDone)};
$('pinR').onclick=()=>BOOT.verify(async()=>{await BOOT.remove();pinUI();setSub();toast('PIN dihapus, data tidak lagi dienkripsi')});
$('pinX').onclick=()=>{$('dS').close();BOOT.lock()};
$('lkDl').onchange=e=>BOOT.cfgSet({delay:+e.target.value});
$('lkW').onchange=e=>BOOT.cfgSet({wipe:+e.target.value});
/* ===== keuangan lanjutan ===== */
function postRec(){let ch=false;const now=midn();FIN.rec.forEach(r=>{let[y,m]=(r.last||iso(now).slice(0,7)).split('-').map(Number);for(let i=0;i<24;i++){m++;if(m>12){m=1;y++}const dt=new Date(y,m-1,Math.min(r.dom,new Date(y,m,0).getDate()));if(dt>now)break;FIN.tx.push({id:'r'+Date.now().toString(36)+i+r.id.slice(0,10),dt:iso(dt),type:r.type,cat:r.cat,wal:r.wal,wal2:'',amt:r.amt,note:r.note||FC[r.type][r.cat]});r.last=y+'-'+String(m).padStart(2,'0');ch=true}});if(ch){FIN=cleanFIN(FIN);save('uang-v5',FIN)}}
function budWarn(o){if(o.type!=='out'||!FIN.bud[o.cat])return '';const mk=o.dt.slice(0,7),s=FIN.tx.filter(x=>x.type==='out'&&x.cat===o.cat&&x.dt.startsWith(mk)).reduce((a,x)=>a+x.amt,0),p=Math.round(s/FIN.bud[o.cat]*100);return p>=100?`Anggaran ${FC.out[o.cat]} terlampaui (${p}%)`:p>=80?`Anggaran ${FC.out[o.cat]} sudah ${p}% terpakai`:''}
function csvBuild(){const q=s=>{s=String(s);if(/^[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'},rows=[['Tanggal','Jenis','Kategori','Dompet','Ke dompet','Jumlah','Catatan']];FIN.tx.slice().sort((a,b)=>a.dt.localeCompare(b.dt)).forEach(x=>rows.push([x.dt,{in:'Pemasukan',out:'Pengeluaran',tf:'Transfer'}[x.type],FC[x.type][x.cat],WL[x.wal],x.wal2?WL[x.wal2]:'',x.amt,x.note]));return rows.map(r=>r.map(q).join(',')).join('\r\n')}
$('csv').onclick=()=>{const t=csvBuild();$('bx').value=t;try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='keuangan-harianku.csv';a.click()}catch(e){}try{navigator.clipboard.writeText(t).then(()=>toast('File CSV dibuat dan teksnya disalin'))}catch(e){toast('File CSV dibuat. Salin teks di kotak cadangan.')}};
$('xN').addEventListener('input',()=>{if(xid)return;const v=$('xN').value.trim().toLowerCase();if(v.length<3)return;const m=FIN.tx.slice().reverse().find(x=>x.type===xt&&x.note.toLowerCase()===v);if(m){$('xC').value=m.cat;$('xW').value=m.wal;if(!num($('xA').value))$('xA').value=fmtN(m.amt)}});
/* ===== kalender lanjutan ===== */
let cmode='bulan';
const cmodeBar=()=>`<div class="tg2" style="grid-template-columns:1fr 1fr"><button data-cmd="bulan" class="${cmode==='bulan'?'on':''}">Bulan</button><button data-cmd="agenda" class="${cmode==='agenda'?'on':''}">Agenda</button></div>`;
function hijri(dt){const h=toHijri(dt,ST.hjo);if(!h)return '';const b=HB[h.m+'-'+h.d];return 'Hijriah: '+h.d+' '+HM[h.m]+' '+h.y+' H'+(b?' · '+b:'')}
const evRow=e=>`<div class="evr"><div><b>${e.t?e.t+' · ':''}${esc(e.n)}</b><span>${esc([e.note,{none:'',week:'Setiap pekan',month:'Setiap bulan',year:'Setiap tahun'}[e.rep]].filter(Boolean).join(' · '))}</span></div><button class="ic" data-ee="${esc(e.id)}" aria-label="Ubah ${esc(e.n)}">${IE}</button></div>`;
function agendaHTML(){const out=[],td=iso(midn()),late=TK.filter(t=>!t.done&&t.due<td).sort((a,b)=>a.due.localeCompare(b.due));
  if(late.length)out.push('<div class="trh"><span>Terlambat</span><span></span></div>'+late.map(taskRow).join(''));
  for(let i=0;i<45;i++){const dt=midn();dt.setDate(dt.getDate()+i);const k=iso(dt),evs=EV.filter(e=>occurs(e,dt)).sort((a,b)=>(a.t||'').localeCompare(b.t||'')),tks=TK.filter(t=>!t.done&&t.due===k);
    const hbn=hjBesar(dt);if(evs.length||tks.length||hbn)out.push(`<div class="trh"><span>${DAYS[dt.getDay()]}, ${dt.getDate()} ${MON[dt.getMonth()].slice(0,3)}</span><span>${i===0?'Hari ini':i===1?'Besok':''}</span></div>`+(hbn?`<div class="evr"><div><b>${hbn}</b><span>${hjStr(dt)}</span></div></div>`:'')+evs.map(evRow).join('')+tks.map(taskRow).join(''))}
  return `<div class="sec"><h2>Agenda 45 hari</h2><span>pengingat dan tenggat</span></div>`+(out.join('')||'<div class="empty">Tidak ada pengingat atau tenggat dalam 45 hari ke depan.</div>')+'<button class="btn g" data-ea style="margin-top:10px">Tambah pengingat</button>'}
/* ===== kegiatan lanjutan ===== */
const fDays=new Set();
function drawChips(){$('fDc').innerHTML=ORDER.map(d=>`<button type="button" class="mini${fDays.has(d)?' on':''}" data-dc="${d}" style="margin:0">${DAYS[d].slice(0,3)}</button>`).join('')}
$('fM').onchange=()=>{const o=$('fM').value==='o';$('fDw').hidden=!o;$('fDd').hidden=o||!!editId;$('d').parentElement.hidden=o};
/* ===== pengingat cadangan ===== */
let LB=load('cad-v6',0);

/* ===== validasi data tersimpan dan hasil impor ===== */
const KEYP=/^\d{4}-\d\d-\d\d\|[\w-]{1,32}$/,isObj=o=>o&&typeof o==='object'&&!Array.isArray(o);
function cleanD(o){const r={};if(isObj(o))for(const k of Object.keys(o).slice(0,20000))if(KEYP.test(k)&&o[k])r[k]=1;return r}
function cleanLog(o){const r={};if(isObj(o))for(const k of Object.keys(o).slice(0,5000)){if(!KEYP.test(k)||!isObj(o[k]))continue;const v={};for(const m of Object.keys(o[k]).slice(0,8)){const n=Number(o[k][m]);if(/^[a-z]{1,3}$/.test(m)&&isFinite(n)&&n>=0&&n<=99999)v[m]=n}if(Object.keys(v).length)r[k]=v}return r}
function cleanRef(o){const r={};if(isObj(o))for(const k of Object.keys(o).slice(0,5000)){const x=o[k];if(!DT.test(k)||!isObj(x))continue;const m=Math.round(Number(x.m));r[k]={m:m>=1&&m<=5?m:0,t:String(x.t||'').slice(0,140)}}return r}
function cleanNote(o){const r={};if(isObj(o))for(const k of Object.keys(o).slice(0,2000))if(DT.test(k))r[k]=String(o[k]||'').slice(0,1000);return r}
D=cleanD(D);LOG=cleanLog(LOG);CANC=cleanD(CANC);REF=cleanRef(REF);NOTE=cleanNote(NOTE);
function setBO(){let b=0;if(ST.nb==='auto'){try{if(window.top!==window)b=44}catch(e){b=44}const vv=window.visualViewport;if(vv&&vv.scale<=1.01)b+=Math.max(0,Math.round(window.innerHeight-vv.height-vv.offsetTop))}else b=+ST.nb;document.documentElement.style.setProperty('--bo',b+'px')}
setBO();addEventListener('resize',setBO);if(window.visualViewport)visualViewport.addEventListener('resize',setBO);
render();tick();setInterval(()=>{render();tick()},30000);

};
