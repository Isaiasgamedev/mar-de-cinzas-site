/* =====================================================
   MAR DE CINZAS — main.js
   Interações globais: menu hambúrguer, nav ativa
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Seletor de idioma ── */
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !navLinks.querySelector('.lang-picker')) {
    const languagePicker = document.createElement('div');
    languagePicker.className = 'lang-picker';

    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    const hostedOnGithubPages = window.location.hostname.endsWith('github.io');
    const siteBase = hostedOnGithubPages && pathSegments.length > 0 ? `/${pathSegments[0]}` : '';

    const currentLang = (document.documentElement.lang || 'pt-BR').toLowerCase();
    let selectedLang = 'pt';
    if (currentLang.startsWith('en')) selectedLang = 'en';
    if (currentLang.startsWith('es')) selectedLang = 'es';

    const labelByLang = {
      pt: 'Idioma',
      es: 'Idioma',
      en: 'Language',
    };

    const languageTargets = {
      pt: `${siteBase}/index.html`,
      es: `${siteBase}/es/index.html`,
      en: `${siteBase}/en/index.html`,
    };

    languagePicker.innerHTML = `
      <label class="lang-picker-label" for="site-language">${labelByLang[selectedLang] || 'Idioma'}</label>
      <select id="site-language" class="lang-picker-select" aria-label="Language selector">
        <option value="pt">Português</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    `;

    const select = languagePicker.querySelector('.lang-picker-select');
    if (select) {
      select.value = selectedLang;
      let languageChangeByUser = false;

      select.addEventListener('pointerdown', () => {
        languageChangeByUser = true;
      });

      select.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
          languageChangeByUser = true;
        }
      });

      select.addEventListener('change', () => {
        if (!languageChangeByUser) {
          return;
        }

        const target = languageTargets[select.value];
        languageChangeByUser = false;

        if (target) {
          window.location.href = target;
        }
      });
    }

    navLinks.appendChild(languagePicker);
  }

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
