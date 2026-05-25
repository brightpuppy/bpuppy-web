// site-publish.js — BPuppy centralized visibility manager
// Persists in localStorage. Any page can read/write via window.SitePublish.
// Events: window listens for 'bpuppy:publish' to react to changes in real time.

(function(w) {
  'use strict';
  var KEY = 'bpuppy_publish_v1';

  // ── Registry of all pages and their known sections ──────────────────────────
  var REGISTRY = {
    pages: [
      { id:'Home',         label:'Inicio',          url:'/',         category:'Principal' },
      { id:'Cachorros',              label:'Cachorros',              url:'/cachorros',            category:'Principal' },
      { id:'Cachorros-Entregados',   label:'Cachorros Entregados',   url:'/entregados', category:'Principal' },
      { id:'Gatos-Entregados',       label:'Gatos Entregados',       url:'/gatos-entregados',     category:'Servicios' },
      { id:'Adopciones',             label:'Adopciones',             url:'/adopciones',           category:'Principal' },
      { id:'Tienda',       label:'Tienda',           url:'/tienda',       category:'Principal' },
      { id:'Media',        label:'Media',            url:'/media',        category:'Contenido' },
      { id:'Blog',         label:'Blog',             url:'/blog',         category:'Contenido' },
      { id:'Social',       label:'Social',           url:'/social',       category:'Contenido' },
      { id:'Grooming',     label:'Grooming',         url:'/grooming',     category:'Servicios' },
      { id:'Gatos',        label:'Gatos',            url:'/gatos',        category:'Servicios' },
      { id:'Razas-Perros', label:'Razas de Perros',  url:'/razas', category:'Info'      },
      { id:'Razas-Gatos',  label:'Razas de Gatos',   url:'/razas-gatos',  category:'Info'      },
      { id:'Nosotros',     label:'Nosotros',         url:'/nosotros',     category:'Info'      },
      { id:'Historia',     label:'Historia',         url:'/historia',     category:'Info'      },
    ],
    sections: {
      Home:        [{ id:'hero',       label:'Hero principal'        },
                   { id:'razas',      label:'Razas destacadas'      },
                   { id:'proceso',    label:'Proceso de adopción'   },
                   { id:'cta',        label:'CTA final'             },
                   { id:'mapa',       label:'Mapa — Familias por el mundo' }],
      Cachorros:   [{ id:'hero',       label:'Hero'                  },
                   { id:'listado',    label:'Listado de cachorros'  }],
      Adopciones:  [{ id:'hero',       label:'Hero'                  },
                   { id:'listado',    label:'Animales en adopción'  }],
      Tienda:      [{ id:'hero',       label:'Hero'                  },
                   { id:'productos',  label:'Productos'             },
                   { id:'carrito',    label:'Carrito'               }],
      Media:       [{ id:'hero',       label:'Hero — B Media'        },
                   { id:'videos',     label:'Videos'                },
                   { id:'podcast',    label:'Podcast Bcast'         },
                   { id:'entrevistas',label:'Entrevistas'           },
                   { id:'cta',        label:'CTA final'             }],
      Blog:        [{ id:'hero',       label:'Hero'                  },
                   { id:'articulos',  label:'Artículos'             }],
      Social:      [{ id:'hero',       label:'Hero'                  },
                   { id:'feed',       label:'Feed social'           }],
      Grooming:    [{ id:'hero',       label:'Hero'                  },
                   { id:'servicios',  label:'Servicios'             },
                   { id:'reserva',    label:'Reserva online'        }],
      Gatos:       [{ id:'hero',       label:'Hero'                  },
                   { id:'listado',    label:'Listado'               }],
      Nosotros:    [{ id:'hero',                label:'Hero'                       },
                   { id:'equipo',             label:'Equipo'                     },
                   { id:'valores',            label:'Valores'                    },
                   { id:'impacto_educacion',  label:'Impacto — Educación'        }],
      Historia:    [{ id:'hero',       label:'Hero'                  },
                   { id:'timeline',   label:'Timeline'              }],
    }
  };

  // ── Default live/draft state for pages ──────────────────────────────────────
  var DEFAULTS = {
    Home: true, Cachorros: true, 'Cachorros-Entregados': false, 'Gatos-Entregados': true,
    Nosotros: true, 'Razas-Perros': true, Media: true,
    Adopciones: true, Tienda: false, Blog: true, Grooming: true,
    Gatos: true, 'Razas-Gatos': true, Historia: true, Social: false,
  };

  // ── Internal helpers ────────────────────────────────────────────────────────
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; }
  }

  function save(d) {
    localStorage.setItem(KEY, JSON.stringify(d));
    w.dispatchEvent(new CustomEvent('bpuppy:publish', { detail: d }));
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  w.SitePublish = {
    REGISTRY: REGISTRY,
    DEFAULTS:  DEFAULTS,

    /** Returns { pages:{}, sections:{} } from localStorage */
    getAll: function() {
      var d = load();
      return { pages: d.pages || {}, sections: d.sections || {} };
    },

    /** Is this page currently set to live? */
    isPageLive: function(id) {
      var d = load(); var pages = d.pages || {};
      return pages[id] !== undefined ? pages[id] : (DEFAULTS[id] !== false);
    },

    /** Is this section within a page currently set to live? */
    isSectionLive: function(pageId, secId) {
      var d = load();
      if (!d.sections || !d.sections[pageId]) return true;
      return d.sections[pageId][secId] !== false;
    },

    /** Set a page live/draft */
    setPageLive: function(id, live) {
      var d = load(); if (!d.pages) d.pages = {};
      d.pages[id] = live; save(d);
    },

    /** Set a section within a page live/draft */
    setSectionLive: function(pageId, secId, live) {
      var d = load(); if (!d.sections) d.sections = {};
      if (!d.sections[pageId]) d.sections[pageId] = {};
      d.sections[pageId][secId] = live; save(d);
    },

    /** Reset everything to defaults */
    reset: function() { localStorage.removeItem(KEY); save({}); }
  };

})(window);
