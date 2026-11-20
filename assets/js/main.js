(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const links = [...document.querySelectorAll('.masthead nav a[href^="#"]')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!('IntersectionObserver' in window) || !sections.length) return;

  const nav = document.querySelector('.masthead nav');
  const setCurrent = (id) => {
    links.forEach((a) => a.removeAttribute('aria-current'));
    const a = byId.get(id);
    if (!a) return;
    a.setAttribute('aria-current', 'true');
    // Scroll only the nav strip; scrollIntoView would also move the page and fight the user's scroll.
    if (nav && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = a.offsetLeft - 16;
  };

  // A section counts as current while it crosses a band just below the sticky bar.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach((s) => io.observe(s));
})();
