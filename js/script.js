const root=document.documentElement;
const themeBtn=document.querySelector('#theme-toggle');
const stored=localStorage.getItem('detail-lab-theme');
if(stored==='light'||stored==='dark') root.dataset.theme=stored;
function themeNow(){return root.dataset.theme||((window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark')}
themeBtn.setAttribute('aria-label',`Текущая тема: ${themeNow()}. Переключить`);
themeBtn.addEventListener('click',()=>{const next=themeNow()==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('detail-lab-theme',next);themeBtn.setAttribute('aria-label',`Текущая тема: ${next}. Переключить`)});
const burger=document.querySelector('#burger'),menu=document.querySelector('#mobile-menu'),close=document.querySelector('#close-menu');
function setMenu(open){menu.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');if(open)close.focus();else burger.focus()}
burger.addEventListener('click',()=>setMenu(true));close.addEventListener('click',()=>setMenu(false));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('is-open'))setMenu(false)});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const progress=document.querySelector('#progress'),art=document.querySelector('.hero-art');let ticking=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';if(!reduced&&art&&window.innerWidth>=1024)art.style.transform=`translateY(${Math.min(scrollY,750)*.11}px)`;ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
