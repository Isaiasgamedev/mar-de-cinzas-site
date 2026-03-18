/* =====================================================
   MAR DE CINZAS — main.js
   Interações globais: menu hambúrguer, nav ativa
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Menu hambúrguer ── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
    });

    // Fecha ao clicar num link (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      }
    });
  }

  /* ── Marca o link ativo conforme a URL ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    // Normaliza: remove .html e trailing slash para comparação
    const normalized = href.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    const normPath    = currentPath.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    if (normalized && normPath.endsWith(normalized)) {
      a.classList.add('active');
    }
  });

});
