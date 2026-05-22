// shared-header.js — Single source of truth for the site header.
// Includes multilingual selector (15 languages) with invisible Google Translate.

// ── Google Translate (hidden) ──────────────────────────────────────────────
(function initGT() {
  if (document.getElementById('bpuppy-gt-init')) return;
  const marker = document.createElement('meta');
  marker.id = 'bpuppy-gt-init';
  document.head.appendChild(marker);

  function setup() {
    // Hidden GT container
    const gtDiv = document.createElement('div');
    gtDiv.id = 'bpuppy-gt-el';
    gtDiv.style.cssText = 'display:none;position:absolute;';
    document.body.appendChild(gtDiv);

    // Suppress GT UI
    const css = document.createElement('style');
    css.textContent = `
    .goog-te-banner-frame,.goog-te-gadget,#goog-gt-tt,
    .goog-tooltip,.goog-tooltip-content { display:none!important; }
    body { top:0!important; }
    .skiptranslate { display:none!important; }
  `;
    document.head.appendChild(css);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'ar,zh-CN,fr,de,hi,it,ja,ko,pt,ru,th,tr,vi,en,es',
        autoDisplay: false,
      }, 'bpuppy-gt-el');
    };

    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }

  if (document.body) { setup(); }
  else { document.addEventListener('DOMContentLoaded', setup); }
})();

function triggerGoogleTranslate(langCode) {
  const trySet = (attempts) => {
    const sel = document.querySelector('.goog-te-combo');
    if (sel) {
      sel.value = langCode;
      sel.dispatchEvent(new Event('change'));
    } else if (attempts > 0) {
      setTimeout(() => trySet(attempts - 1), 400);
    }
  };
  trySet(8);
}

// Usage on any HTML page:
//   <script src="shared-header.js"></script>
//   <site-header></site-header>
//
// Optional attributes:
//   base-path="../"   — if page lives in a subdirectory

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this._lang = localStorage.getItem('bpuppy-lang') || 'es';
    this._scrolled = false;
    this._onScroll = this._handleScroll.bind(this);
  }

  connectedCallback() {
    this._render();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._handleScroll();
    // React pages may change lang via custom event
    window.addEventListener('bpuppy-lang-change', (e) => {
      this._lang = e.detail;
      this._render();
      this._handleScroll();
    });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._onScroll);
  }

  get _base() {
    return this.getAttribute('base-path') || '';
  }

  _t(es, en) {
    return this._lang === 'en' ? en : es;
  }

  _render() {
    const b = this._base;
    const t = (es, en) => this._t(es, en);
    const caretSvg = `<svg class="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
    const phoneSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 18z"/></svg>`;

    this.innerHTML = `
<header class="hdr${this._scrolled ? ' scrolled' : ''}" id="site-hdr" style="position:sticky;top:0;">
  <div class="container hdr-row">
    <a href="${b}Home.html#top" class="hdr-logo">
      <img src="${b}assets/logo-clean.png" alt="Bright Puppy">
      <span class="wm">Bright Puppy</span>
    </a>
    <nav class="nav">
      <a href="${b}Home.html">${t('Inicio','Home')}</a>

      <div class="nav-item">
        <a href="${b}Cachorros.html">${t('Cachorros','Puppies')}${caretSvg}</a>
        <div class="nav-dropdown">
          <a href="${b}Cachorros.html">${t('Ver disponibles','See available')}</a>
          <a href="${b}Razas-Perros.html">${t('Conoce las razas','Meet the breeds')}</a>
          <a href="${b}Adopciones.html">${t('Adopciones','Adoptions')}</a>
        </div>
      </div>

      <div class="nav-item">
        <a href="${b}Gatos.html">${t('Gatos','Cats')}${caretSvg}</a>
        <div class="nav-dropdown">
          <a href="${b}Gatos.html">${t('Ver disponibles','See available')}</a>
          <a href="${b}Razas-Gatos.html">${t('Conoce las razas','Meet the breeds')}</a>
          <a href="${b}Adopciones.html">${t('Adopciones','Adoptions')}</a>
        </div>
      </div>

      <a href="${b}Tienda.html">${t('Tienda','Shop')}</a>
      <a href="${b}Grooming.html">${t('Grooming','Grooming')}</a>
      <a href="${b}Blog.html">${t('Blog','Blog')}</a>

      <div class="nav-item">
        <a href="${b}Nosotros.html">${t('Nosotros','About')}${caretSvg}</a>
        <div class="nav-dropdown">
          <a href="${b}Nosotros.html">${t('Nuestra Historia','Our Story')}</a>
          <a href="${b}Nosotros.html">${t('Impacto Social','Social Impact')}</a>
          <a href="${b}Nosotros.html">${t('Nuestro Equipo','Our Team')}</a>
          <a href="${b}Social.html">${t('Social','Social')}</a>
        </div>
      </div>
    </nav>

    <div style="display:flex;align-items:center;gap:10px">
      <a href="tel:+18084928294" class="hdr-phone" aria-label="${t('Llamar','Call')}">${phoneSvg}</a>
      <div class="lang" role="group" aria-label="Language">
        <button data-active="${this._lang === 'es'}" data-lang="es">ES</button>
        <button data-active="${this._lang === 'en'}" data-lang="en">EN</button>
        <div class="lang-more" style="position:relative;">
          <button class="lang-globe" title="${t('Más idiomas','More languages')}" style="padding:5px 8px;border-radius:999px;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:3px;color:var(--ink-2);font-size:11px;font-weight:700;font-family:inherit;letter-spacing:0.04em;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </button>
          <div class="lang-dropdown" style="display:none;position:fixed;background:var(--paper,#fff);border:1px solid var(--line,#ebe7e3);border-radius:14px;box-shadow:0 12px 32px -8px rgba(0,0,0,0.15);padding:8px;min-width:160px;z-index:9999;">
            ${[
              ['fr','Français'],['pt','Português'],['de','Deutsch'],['it','Italiano'],
              ['zh-CN','中文'],['ja','日本語'],['ko','한국어'],['ar','العربية'],
              ['ru','Русский'],['hi','हिन्दी'],['tr','Türkçe'],['th','ไทย'],['vi','Tiếng Việt'],
            ].map(([code, label]) =>
              `<button data-gt="${code}" style="display:block;width:100%;text-align:left;padding:8px 12px;border:none;background:none;border-radius:8px;font-family:inherit;font-size:13px;font-weight:500;color:var(--ink);cursor:pointer;" onmouseover="this.style.background='var(--bg,#f8f5f2)'" onmouseout="this.style.background='none'">${label}</button>`
            ).join('')}
          </div>
        </div>
      </div>
      <a href="${b}Cachorros.html" class="hdr-cta">${t('Ver disponibles','See available')}</a>
    </div>
  </div>
</header>`;

    this._bindLang();
    this._markActive();
  }

  _handleScroll() {
    const scrolled = window.scrollY > 40;
    if (scrolled !== this._scrolled) {
      this._scrolled = scrolled;
      const hdr = this.querySelector('.hdr');
      if (hdr) {
        hdr.classList.toggle('scrolled', scrolled);
        hdr.classList.toggle('over-dark', !scrolled && this._isHeroPage());
      }
    }
  }

  _isHeroPage() {
    // Pages that have a dark hero at the top (Home.html handles this via React)
    return false;
  }

  _bindLang() {
    // ES / EN native toggle
    this.querySelectorAll('.lang button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this._lang = lang;
        localStorage.setItem('bpuppy-lang', lang);
        this._render();
        this._handleScroll();
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
          el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
        });
        document.documentElement.lang = lang;
        window.dispatchEvent(new CustomEvent('bpuppy-lang-change', { detail: lang }));
      });
    });

    // Globe toggle — fixed positioning to escape header overflow
    const globeBtn = this.querySelector('.lang-globe');
    const dropdown = this.querySelector('.lang-dropdown');
    if (globeBtn && dropdown) {
      globeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display !== 'none';
        if (isOpen) { dropdown.style.display = 'none'; return; }
        const rect = globeBtn.getBoundingClientRect();
        dropdown.style.top   = (rect.bottom + 6) + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        dropdown.style.display = 'block';
      });
      document.addEventListener('click', (e) => {
        if (!globeBtn.contains(e.target)) dropdown.style.display = 'none';
      });
    }

    // Google Translate language buttons
    this.querySelectorAll('button[data-gt]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-gt');
        if (dropdown) dropdown.style.display = 'none';
        // Use chat-widget's function if available, else fallback
        if (window.bpTriggerTranslate) window.bpTriggerTranslate(code);
        else triggerGoogleTranslate(code);
      });
    });
  }

  _markActive() {
    const file = window.location.pathname.split('/').pop() || 'Home.html';
    this.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href').split('/').pop();
      if (href && href === file) {
        a.style.color = 'var(--orange)';
      }
    });
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
