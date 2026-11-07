const V='jadwal-v13',F=['./','./index.html','./app.js','./boot.js','./style.css','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith((async()=>{const hit=()=>caches.match(r,{ignoreSearch:true});
    try{const res=await Promise.race([fetch(r,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,4000))]);
      if(res.ok){const c=await caches.open(V);c.put(r,res.clone());return res}
      return (await hit())||res}
    catch(err){return (await hit())||caches.match('./index.html')}})())});
