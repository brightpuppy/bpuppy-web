// site-animations.js — Sporadic paw trails + peek-a-boo creature
// Auto-detects dog vs cat pages. Include on any page to activate.

(function () {
  const path = window.location.pathname.toLowerCase();
  const isCat = /gatos/i.test(path);

  /* ── SVGs ─────────────────────────────────────────────── */
  const DOG_PAW = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="17" rx="5" ry="4"/>
    <ellipse cx="6"  cy="11" rx="2"  ry="3"/>
    <ellipse cx="18" cy="11" rx="2"  ry="3"/>
    <ellipse cx="9"  cy="7"  rx="1.8" ry="2.5"/>
    <ellipse cx="15" cy="7"  rx="1.8" ry="2.5"/>
  </svg>`;

  const CAT_PAW = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="17.5" rx="5.5" ry="4.5"/>
    <ellipse cx="5"  cy="12"   rx="2.5" ry="2"/>
    <ellipse cx="19" cy="12"   rx="2.5" ry="2"/>
    <ellipse cx="8.5" cy="7"   rx="2"   ry="2.5"/>
    <ellipse cx="15.5" cy="7"  rx="2"   ry="2.5"/>
  </svg>`;

  const DOG_PEEK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 70" fill="currentColor">
    <ellipse cx="35" cy="55" rx="28" ry="16"/>
    <circle  cx="62" cy="30" r="18"/>
    <ellipse cx="52" cy="14" rx="7" ry="12" transform="rotate(-20 52 14)"/>
    <ellipse cx="73" cy="16" rx="6" ry="11" transform="rotate(20 73 16)"/>
    <circle  cx="68" cy="28" r="3.5" fill="white"/>
    <circle  cx="68" cy="28" r="2"/>
    <ellipse cx="56" cy="28" r="1.5" rx="1.5" ry="1.5"/>
    <ellipse cx="72" cy="36" rx="3" ry="2.5"/>
    <path d="M10 42 Q2 24 14 16" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  </svg>`;

  const CAT_PEEK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 70" fill="currentColor">
    <ellipse cx="38" cy="57" rx="26" ry="14"/>
    <circle  cx="62" cy="30" r="17"/>
    <polygon points="49,14 55,2 63,14"/>
    <polygon points="64,14 71,2 78,14"/>
    <ellipse cx="56" cy="28" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="56" cy="28" rx="1.5" ry="3.5"/>
    <ellipse cx="68" cy="28" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="68" cy="28" rx="1.5" ry="3.5"/>
    <polygon points="62,33 64,36 60,36"/>
    <line x1="49" y1="33" x2="38" y2="31" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="49" y1="36" x2="38" y2="37" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 42 Q4 22 16 10 Q20 4 18 18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  </svg>`;

  const PAW_SVG  = isCat ? CAT_PAW  : DOG_PAW;
  const PEEK_SVG = isCat ? CAT_PEEK : DOG_PEEK;
  const COLOR    = isCat ? '#7C5CBF' : '#F58220';

  /* ── Inject CSS ────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pawAppear {
      0%   { opacity:0; transform: var(--r) scale(.6); }
      20%  { opacity:.55; transform: var(--r) scale(1); }
      70%  { opacity:.45; }
      100% { opacity:0; transform: var(--r) scale(.9); }
    }
    .site-paw {
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      color: ${COLOR};
      opacity: 0;
      animation: pawAppear 2.2s ease forwards;
    }
    #site-peeker {
      position: fixed;
      bottom: 0;
      right: 40px;
      width: 90px;
      color: ${COLOR};
      opacity: .65;
      pointer-events: none;
      z-index: 9997;
      transform: translateY(110%);
      transition: transform .6s cubic-bezier(.34,1.56,.64,1);
      filter: drop-shadow(0 4px 12px rgba(0,0,0,.18));
    }
    #site-peeker.visible {
      transform: translateY(0);
    }
    #site-peeker.hiding {
      transform: translateY(110%);
      transition: transform .5s cubic-bezier(.55,.06,.68,.19);
    }
  `;
  document.head.appendChild(style);

  /* ── Paw trail ─────────────────────────────────────────── */
  function spawnPawTrail() {
    const count   = 5 + Math.floor(Math.random() * 4);
    const startX  = 80 + Math.random() * (window.innerWidth  - 200);
    const startY  = 120 + Math.random() * (window.innerHeight - 280);
    const dir     = Math.random() < .5 ? 1 : -1;
    const angle   = (30 + Math.random() * 40) * dir; // degrees
    const rad     = angle * Math.PI / 180;
    const stepX   = Math.cos(rad) * 44;
    const stepY   = Math.sin(rad) * 44;
    const baseRot = angle + 90;

    for (let i = 0; i < count; i++) {
      const sideOffset = (i % 2 === 0 ? -1 : 1) * 10;
      const perpX = -Math.sin(rad) * sideOffset;
      const perpY =  Math.cos(rad) * sideOffset;

      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'site-paw';
        el.style.cssText = `
          left:${startX + i * stepX + perpX - 11}px;
          top:${startY  + i * stepY + perpY - 11}px;
          --r: rotate(${baseRot}deg);
          animation-delay:0s;
        `;
        el.innerHTML = PAW_SVG;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2400);
      }, i * 260);
    }
  }

  function schedulePaws() {
    spawnPawTrail();
    setTimeout(schedulePaws, 9000 + Math.random() * 7000);
  }

  /* ── Peek creature ─────────────────────────────────────── */
  function setupPeeker() {
    const el = document.createElement('div');
    el.id = 'site-peeker';
    el.innerHTML = PEEK_SVG;
    document.body.appendChild(el);

    function doPeek() {
      // Show
      el.classList.remove('hiding');
      el.classList.add('visible');
      // Hide after 2.5s
      setTimeout(() => {
        el.classList.remove('visible');
        el.classList.add('hiding');
        // Schedule next peek
        setTimeout(doPeek, 10000 + Math.random() * 8000);
      }, 2500);
    }

    // First peek after 6s
    setTimeout(doPeek, 6000);
  }

  /* ── Init after DOM ready ──────────────────────────────── */
  function init() {
    setTimeout(schedulePaws, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
