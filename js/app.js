(()=>{
const C=window.APP_CONFIG,k=C.countdown,V=document.querySelector('#view'),$=s=>document.querySelector(s),I=C.images,x=C.sky;
const P={sparkle:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
heart:'M12 21s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.3 12C19 16.4 12 21 12 21z',
moon:'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
music:'M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
paw:'M6.5 9.5a1.7 1.7 0 1 0 0 .1M10 5.5a1.7 1.7 0 1 0 0 .1M14 5.5a1.7 1.7 0 1 0 0 .1M17.5 9.5a1.7 1.7 0 1 0 0 .1M12 11c-3 0-5 3-4 5s2 2.5 4 1.5 3 1 4-1-1-5.5-4-5.5z',
gem:'M6 3h12l4 6-10 12L2 9zM2 9h20M9 3L7 9l5 12 5-12-2-6',
star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
play:'M7 4l13 8-13 8z',pause:'M7 4v16M17 4v16',
expand:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',download:'M12 3v12M7 10l5 5 5-5M4 20h16',
print:'M6 9V3h12v6M6 18H4v-7h16v7h-2M6 14h12v7H6z',close:'M5 5l14 14M19 5L5 19',lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',vol:'M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',mail:'M3 6h18v12H3zM3 7l9 7 9-7'};
const ic=(n,f)=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"${f?' style="fill:currentColor"':''}><path d="${P[n]}"/></svg>`;
const img=(src,cls='doll')=>`<img class="${cls}" src="${src}" alt="" onerror="this.remove()">`;
const bubs=n=>Array.from({length:n},(_,i)=>{const s=14+Math.random()*38;return `<span class="bub" style="width:${s}px;height:${s}px;left:${Math.random()*95}%;top:${Math.random()*92}%;animation-delay:${i*-1.3}s"></span>`}).join('');
const wave=(c,f)=>`<svg class="wave" viewBox="0 0 400 54" preserveAspectRatio="none"${f?' style="transform:scaleY(-1)"':''}><path d="M0 28C70 0 130 54 220 28S350 6 400 26V54H0Z" fill="${c}"/></svg>`;
/* música */
const au=new Audio();au.preload='none';au.src=C.music.src;au.loop=true;const mbtn=$('#music-btn');
function sync(){const on=!au.paused;mbtn.classList.toggle('on',on);mbtn.innerHTML=on?ic('pause'):ic('music');
 const v=$('.vinyl');if(v){v.classList.toggle('on',on);v.querySelector('i').innerHTML=`<svg viewBox="0 0 24 24"><path d="${on?'M6 4h4v16H6zM14 4h4v16h-4z':P.play}"/></svg>`}
 const n=$('#np');if(n)n.textContent=on?C.music.messages.play:C.music.messages.intro}
function toggle(){au.paused?au.play().catch(()=>{const n=$('#np');if(n)n.textContent='Falta el archivo de audio'}):au.pause()}
const au2=new Audio();au2.preload='none';au2.src=C.letterSong.src;au2.loop=true;let was=false;
function songOn(){was=!au.paused;au.pause();au2.currentTime=0;au2.play().catch(()=>{})}
function songOff(){au2.pause();if(was)au.play().catch(()=>{});was=false}
mbtn.onclick=toggle;au.onplay=au.onpause=sync;
/* contador */
const T=new Date(k.target).getTime(),calc=()=>Math.max(0,Math.ceil((T-Date.now())/1000)),two=n=>String(n).padStart(2,'0');
function tick(){const e=$('#count');if(e){const l=calc();
 e.innerHTML=[[Math.floor(l/86400),'días'],[Math.floor(l%86400/3600),'horas'],[Math.floor(l%3600/60),'min'],[l%60,'seg']].map(([v,t])=>`<div><b>${two(v)}</b><span>${t}</span></div>`).join('');
 $('#count-msg').textContent=l?k.waiting:k.arrived}
 const d=$('#lived');if(d)d.textContent=Math.floor((Date.now()-new Date(2008,10,29).getTime())/864e5).toLocaleString('es')}
setInterval(tick,1000);
/* vistas */
const views={
'/':()=>`<div class="intro view">${bubs(9)}<h1>${k.title}</h1><p class="sub">${k.subtitle}</p>${img(I.stars,'doll float')}
 <div id="count" class="count"></div><p id="count-msg" class="sub" style="font-size:.95rem"></p><a class="btn" id="enter" href="#/onepage">${k.button}${ic('heart')}</a></div>`,
'/onepage':()=>`<div class="view">
 <section class="hero">${bubs(6)}<div class="in"><div class="c"><h1>EL DÍA MÁS ESPECIAL</h1><p class="sub">Recuerda que todo lo bonito está hecho para ti, mi princesa.</p></div>
  <div class="hero-row">${img(I.music,'doll float')}<div class="vinylwrap"><div class="slash"><b></b><b></b><b></b></div><button class="vinyl" aria-label="Reproducir o pausar música"><i></i></button><p class="np" id="np"></p></div></div>
  <p class="c lived"><b id="lived"></b>días de ti en el mundo, y cada uno lo hizo más bonito.</p></div></section>
 ${wave('#E59AB8')}
 <section class="stars" id="estrellas"><div class="in"><h2>Miremos las estrellas</h2><p class="sub c">${x.subtitle}</p>
  <div class="sgrid"><div class="mapcol"><button class="mapw" id="mapbtn" aria-label="Ver mapa estelar completo"><img src="${I.atlasPoster}" alt="Mapa estelar del 29 de noviembre de 2008"><span>${ic('expand')}Ver mapa completo</span></button>${img(I.stars,'doll tele float')}</div>
  <div class="side"><p class="quote" id="quote"></p>
  <div class="facts">${x.facts.map(f=>`<div class="fact"><b>${f.big}</b>${f.text}</div>`).join('')}</div>
  <div class="cons">${x.constellations.map(c=>`<details><summary>${ic('star')}${c.name}</summary><p>${c.description}</p></details>`).join('')}</div>
  <div class="row"><button class="btn ghost" id="openmap">${ic('expand')}Ver mapa</button><a class="btn ghost" href="${I.atlasPoster}" download="Mapa_Estelar_Zareth.svg">${ic('download')}Descargar</a><button class="btn ghost" id="print">${ic('print')}Imprimir</button></div></div></div>
  <p class="c sub" style="margin-top:36px"><i>${x.emotionalMessage}</i></p></div></section>
 ${wave('#fff',1)}
 <section class="bello" id="bello"><div class="in"><h2>Lo más bonito de ti</h2>
  <div class="grid"><div class="dollcell">${img(I.dog)}</div>${C.cards.map((c,i)=>`<button class="card${c.isSecret?' locked wide':''}" data-i="${i}">${c.isSecret?`<span class="pad">${ic('lock')}</span>`:ic(c.icon)}<h3>${c.title}</h3><p>${c.isSecret?c.lockedPreview:c.preview}</p></button>`).join('')}</div>
  <div class="duo"><div class="box"><h3>Mis deseos para ti</h3><ul>${C.wishes.map(w=>`<li>${w}</li>`).join('')}</ul></div>
  <div class="box wish c"><h3>Pídele un deseo a una estrella</h3><p id="wish">Toca la estrella y mira qué te dice el cielo.</p><button class="btn sm" id="wishbtn">${ic('star')}Pedir deseo</button></div></div></div></section>
 <section class="w18" id="deseos"><div class="in"><h2>18 deseos para tus 18</h2><p class="sub c">Uno por cada año que llevas iluminando el mundo.</p><ol class="w18g">${C.wishes18.map((w,i)=>`<li style="--n:${i}"><b>${i+1}</b><span>${w}</span></li>`).join('')}</ol></div></section>
 <div class="marq" aria-hidden="true"><div>${[1,2].map(()=>C.marquee.map(m=>`<span>${m}</span><i>✦</i>`).join('')).join('')}</div></div>
 <section class="carta" id="carta"><h2>Mi cartita para ti</h2><div class="cwrap">${img(I.letter,'doll float')}<button class="env" id="env" aria-label="Abrir carta"><b>${ic('mail')}Toca para abrir mi carta</b></button></div></section>
 <p class="foot">${C.recipientFullName}, feliz cumpleaños 18 ${ic('heart')}</p></div>`};
function modal(html,cls='',cb){const r=$('#modal-root'),cl=()=>{r.innerHTML='';cb&&cb()};r.innerHTML=`<div class="back"><div class="modal ${cls}" role="dialog">${html}<button class="btn ghost" id="x" style="margin-top:14px">Cerrar</button></div></div>`;
 $('#x').onclick=cl;r.querySelector('.back').onclick=e=>{if(e.target.className==='back')cl()}}
function lightbox(){const r=$('#modal-root');
 r.innerHTML=`<div class="lb"><div class="bar"><a class="btn" href="${I.atlasPoster}" download="Mapa_Estelar_Zareth.svg">${ic('download')}Descargar</a><button class="btn" id="lbp">${ic('print')}Imprimir</button><button class="btn" id="lbx">${ic('close')}Cerrar</button></div><div class="sc"><img src="${I.atlasPoster}" alt="Mapa estelar completo"></div></div>`;
 const im=r.querySelector('img');im.onclick=()=>im.classList.toggle('z');$('#lbx').onclick=()=>r.innerHTML='';$('#lbp').onclick=print}
function print(){const w=open(I.atlasPoster);w&&w.addEventListener('load',()=>w.print())}
function initMain(){
 $('.vinyl').onclick=toggle;$('#mapbtn').onclick=$('#openmap').onclick=lightbox;$('#print').onclick=print;
 const opened=new Set();
 document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{const c=C.cards[b.dataset.i];
  const need=C.cards.length-1-opened.size,S=C.secret;
  if(c.isSecret&&!b.classList.contains('ready')){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');
   modal(`<div class="bigpad">${ic('lock')}</div><h3>${S.lockedTitle}</h3><p>${S.lockedText}</p><p class="rem">${S.remaining.replace('{n}',need)}</p>`,'lk');return}
  if(c.isSecret){b.classList.remove('ready');b.classList.add('done');b.querySelector('p').textContent=c.preview;confetti(90);
   modal(`<h3>${ic('gem')} ${c.title}</h3>${c.modalContent}`,'sp');return}
  opened.add(c.id);b.classList.add('done');
  modal(`<h3>${ic(c.icon)} ${c.title}</h3>${c.modalContent}`,'',()=>{if(opened.size===C.cards.length-1)unlock()})});
 function unlock(){const sc=document.querySelector('.card.locked'),pd=sc.querySelector('.pad');sc.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>{sc.classList.add('unlocking');setTimeout(()=>{pd.innerHTML=ic('gem');pd.classList.add('gem');sc.classList.remove('locked','unlocking','shake');sc.classList.add('ready');sc.querySelector('h3').textContent=C.cards.at(-1).title;sc.querySelector('p').textContent=C.secret.unlockedPreview;confetti(60);pop(sc.getBoundingClientRect().left+sc.offsetWidth/2,sc.getBoundingClientRect().top+40,14)},1700)},600)}
 const q=$('#quote');let i=0;
 (function nx(){if(!document.body.contains(q))return;q.style.opacity=0;setTimeout(()=>{q.textContent=x.quotes[i++%x.quotes.length];q.style.opacity=1},700);setTimeout(nx,6500)})();
 let w=0;$('#wishbtn').onclick=()=>{const s=document.createElement('div');s.className='shoot';document.body.appendChild(s);setTimeout(()=>s.remove(),1200);confetti(30);
  setTimeout(()=>{$('#wish').textContent=x.loveNotes[w++%x.loveNotes.length]},700)};
 $('#env').onclick=e=>{songOn();e.currentTarget.classList.add('open');setTimeout(letter,550)};
}
function letter(){
 const L=C.letter,full=L.paragraphs.join('\n\n')+'\n\n'+L.dedication+'\n'+L.signature;
 const r=$('#modal-root');r.innerHTML=`<div class="lw"><div class="paper"><span class="sal">${L.salutation}</span><span id="tw"></span><span class="caret"></span></div><div class="row"><button class="btn ghost" id="skip">Mostrar completa</button><button class="btn" id="close">${ic('close')}Cerrar</button></div></div>`;
 const lw=r.querySelector('.lw'),tw=$('#tw');let n=0,t;
 const done=()=>{clearInterval(t);if(!tw.dataset.d){tw.dataset.d=1;confetti(80)}tw.textContent=full;const c=r.querySelector('.caret');c&&c.remove();$('#skip').hidden=true};
 $('#skip').onclick=done;$('#close').onclick=()=>{songOff();clearInterval(t);r.innerHTML='';const e=$('#env');e&&e.classList.remove('open')};
 setTimeout(()=>{t=setInterval(()=>{n++;tw.textContent=full.slice(0,n);lw.scrollTop=lw.scrollHeight;if(n>=full.length)done()},42)},700)}
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cols=['#F3C3D6','#E59AB8','#B9688A','#fff','#ffd9c4','#ffe28a'];
function pop(x,y,n=7,ch=['♥','✦','✧']){if(rm)return;for(let i=0;i<n;i++){const e=document.createElement('span');e.className='pp';e.textContent=ch[i%ch.length];
 const a=Math.random()*6.28,d=30+Math.random()*60;e.style.cssText=`left:${x}px;top:${y}px;color:${cols[i%3+0]};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d-30}px;font-size:${10+Math.random()*12}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}}
function confetti(n=70){if(rm)return;for(let i=0;i<n;i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${Math.random()*100}vw;background:${cols[i%cols.length]};--r:${Math.random()*720-360}deg;--x:${Math.random()*160-80}px;animation-duration:${2.4+Math.random()*2.4}s;animation-delay:${Math.random()*.6}s;width:${6+Math.random()*7}px;height:${9+Math.random()*9}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),6000)}}
let hl,io;
function fx(){clearInterval(hl);io&&io.disconnect();
 if(!rm){hl=setInterval(()=>{if(document.hidden)return;const e=document.createElement('span');e.className='fh';e.textContent=['♥','♡','✦'][Math.random()*3|0];
  e.style.cssText=`left:${Math.random()*100}vw;font-size:${12+Math.random()*18}px;animation-duration:${7+Math.random()*6}s;color:${cols[Math.random()*3|0]}`;document.body.appendChild(e);setTimeout(()=>e.remove(),13000)},1100)}
 const st=document.querySelector('.stars .in');if(st&&!rm)st.insertAdjacentHTML('beforebegin',Array.from({length:46},()=>`<span class="tw" style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;font-size:${6+Math.random()*10}px">✦</span>`).join(''));
 io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-v');io.unobserve(e.target)}}),{threshold:.15});
 document.querySelectorAll('h2,.fact,.cons details,.card,.box,.w18g li,.mapcol,.cwrap,.quote,.lived').forEach(e=>{e.classList.add('rv');io.observe(e)})}
addEventListener('pointerdown',e=>pop(e.clientX,e.clientY,6));
let lt=0;addEventListener('pointermove',e=>{if(e.pointerType==='mouse'&&Date.now()-lt>90){lt=Date.now();pop(e.clientX,e.clientY,1,['✦'])}});
function route(){const h=(location.hash||'#/').slice(1),p=views[h]?h:'/';
 V.innerHTML=views[p]();scrollTo(0,0);tick();fx();mbtn.hidden=p==='/';if(p==='/'&&!calc())setTimeout(()=>confetti(90),600);
 if(p==='/')$('#enter').onclick=()=>{au.play().catch(()=>{});confetti(60)};else initMain();sync()}
addEventListener('hashchange',route);route();
if(!location.hash||location.hash==='#/'){const v=C.volume,d=document.createElement('div');d.id='vol';
 d.innerHTML=`<div class="vbox"><div class="spk">${ic('vol')}<i></i><i></i><i></i></div><h2>${v.title}</h2><p>${v.text}</p><div class="vbar"><b></b></div><button class="btn" id="vok">${v.button}</button></div>`;
 document.body.appendChild(d);const bye=()=>{d.classList.add('out');setTimeout(()=>d.remove(),600)};$('#vok').onclick=bye;setTimeout(bye,9000)}
})();
