// ============ I18N — bascule FR/EN sans rechargement ============
function applyLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val === null) return;
    if (el.dataset.attr) { el.setAttribute(el.dataset.attr, val); }
    else { el.innerHTML = val; }
  });
  // état actif des boutons de langue
  document.querySelectorAll('.lang-switch [data-lang]').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
  try { localStorage.setItem('pf-lang', lang); } catch(e){}
}

function initLang(){
  let saved = null;
  try { saved = localStorage.getItem('pf-lang'); } catch(e){}
  const lang = saved || ((navigator.language||'fr').toLowerCase().startsWith('en') ? 'en' : 'fr');
  applyLang(lang);
}
initLang();

document.querySelectorAll('.lang-switch [data-lang]').forEach(btn =>
  btn.addEventListener('click', () => applyLang(btn.dataset.lang)));

// ============ Nav scroll state ============
const nav = document.querySelector('.nav');
const onScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 20); };
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ Mobile burger ============
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ============ Reveal on scroll ============
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ============ Menu tabs ============
const tabs = document.querySelectorAll('.menu-tab');
const sections = document.querySelectorAll('.menu-section');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target)?.classList.add('active');
  });
});
