(function(){
const { useState, useEffect, useRef, useCallback } = React;
try{ if(!document.getElementById('bp-nav-glow-css')){ var _bpNGst=document.createElement('style'); _bpNGst.id='bp-nav-glow-css'; _bpNGst.textContent="@keyframes bpRainbowShift{to{background-position:200% center}}@keyframes bpRainbowGlow{from{filter:drop-shadow(0 0 2px rgba(168,85,247,.45))}to{filter:drop-shadow(0 0 9px rgba(59,130,246,.78))}}.nav-bsocial-glow{background:linear-gradient(90deg,#ff3b3b,#ff8a00,#ffd500,#22c55e,#3b82f6,#a855f7,#ff3b3b);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:bpRainbowShift 3s linear infinite,bpRainbowGlow 1.8s ease-in-out infinite alternate}.nav-dropdown a.nav-bsocial-glow:hover,.hdr .nav-dropdown a.nav-bsocial-glow:hover{background:linear-gradient(90deg,#ff3b3b,#ff8a00,#ffd500,#22c55e,#3b82f6,#a855f7,#ff3b3b) !important;background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent !important;text-decoration:underline;text-decoration-color:rgba(245,130,32,.85);text-decoration-thickness:2px;text-underline-offset:4px}"; document.head.appendChild(_bpNGst); } }catch(e){}
const LANG_OPTIONS = [
  ["fr", "Fran\xE7ais"],
  ["pt", "Portugu\xEAs"],
  ["de", "Deutsch"],
  ["it", "Italiano"],
  ["zh-CN", "\u4E2D\u6587"],
  ["ja", "\u65E5\u672C\u8A9E"],
  ["ko", "\uD55C\uAD6D\uC5B4"],
  ["ar", "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"],
  ["ru", "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"],
  ["hi", "\u0939\u093F\u0928\u094D\u0926\u0940"],
  ["tr", "T\xFCrk\xE7e"],
  ["th", "\u0E44\u0E17\u0E22"],
  ["vi", "Ti\u1EBFng Vi\u1EC7t"]
];
const GT_SHORT = {
  "fr": "FR",
  "pt": "PT",
  "de": "DE",
  "it": "IT",
  "zh-CN": "ZH",
  "ja": "JA",
  "ko": "KO",
  "ar": "AR",
  "ru": "RU",
  "hi": "HI",
  "tr": "TR",
  "th": "TH",
  "vi": "VI"
};
const GT_BROWSER = {
  "fr": "fr",
  "pt": "pt",
  "de": "de",
  "it": "it",
  "zh": "zh-CN",
  "ja": "ja",
  "ko": "ko",
  "ar": "ar",
  "ru": "ru",
  "hi": "hi",
  "tr": "tr",
  "th": "th",
  "vi": "vi"
};
const SB_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const SB_SKEY = "sb-oqqwmcplljirbreowrll-auth-token";
function readBpSession() {
  try {
    const raw = localStorage.getItem(SB_SKEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    const s = o && (o.currentSession || o.session || o);
    const user = s && s.user;
    if (!user || !user.email) return null;
    return { token: s.access_token || "", email: user.email, meta: user.user_metadata || {} };
  } catch (e) {
    return null;
  }
}
function firstNameFrom(sess) {
  if (!sess) return "";
  const cached = (() => {
    try {
      return localStorage.getItem("bpuppy-name") || "";
    } catch (e) {
      return "";
    }
  })();
  const fromMeta = sess.meta && (sess.meta.first_name || (sess.meta.full_name || sess.meta.name || "").split(" ")[0]);
  const raw = cached || fromMeta || sess.email.split("@")[0];
  return (raw || "").split(" ")[0];
}
function initialsFrom(name, email) {
  const base = (name || (email || "").split("@")[0] || "").trim();
  const parts = base.split(/[\s._-]+/).filter(Boolean);
  const s = (parts[0] ? parts[0][0] : "") + (parts[1] ? parts[1][0] : "");
  return (s || base.slice(0, 2) || "?").toUpperCase();
}
function AuthControl({ isOverDark }) {
  const t = useT();
  const [sess, setSess] = useState(readBpSession);
  const [name, setName] = useState(() => firstNameFrom(readBpSession()));
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef();
  useEffect(() => {
    const sync = () => {
      const s = readBpSession();
      setSess(s);
      setName(firstNameFrom(s));
    };
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    if (!sess || !sess.token) return;
    let cancel = false;
    fetch(SB_URL + "/functions/v1/portal_data", { method: "POST", headers: { "Authorization": "Bearer " + sess.token, "apikey": SB_ANON, "Content-Type": "application/json" }, body: "{}" }).then((r) => r.json()).then((d) => {
      if (cancel || !d || !d.client) return;
      const fn = (d.client.first_name || "").trim();
      if (fn) {
        try {
          localStorage.setItem("bpuppy-name", fn);
        } catch (e) {
        }
        setName(fn.split(" ")[0]);
      }
    }).catch(() => {
    });
    return () => {
      cancel = true;
    };
  }, [sess && sess.token]);
  const logout = () => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.indexOf("sb-oqqwmcplljirbreowrll-") === 0) localStorage.removeItem(k);
      });
      localStorage.removeItem("bpuppy-name");
    } catch (e) {
    }
    setSess(null);
    setName("");
    setOpen(false);
    if (/\/portal/.test(location.pathname)) location.href = "/";
    else location.reload();
  };
  const sendLink = (e) => {
    e && e.preventDefault();
    const em = (email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return;
    setSending(true);
    fetch(SB_URL + "/functions/v1/portal_magiclink", { method: "POST", headers: { "Content-Type": "application/json", "apikey": SB_ANON }, body: JSON.stringify({ email: em, redirectTo: location.origin + "/portal" }) }).then((r) => r.json()).then(() => {
      setSending(false);
      setSent(true);
    }).catch(() => {
      setSending(false);
      setSent(true);
    });
  };
  const persistSession = (d) => {
    try {
      const now = Math.floor(Date.now() / 1e3);
      localStorage.setItem(SB_SKEY, JSON.stringify({
        access_token: d.access_token,
        token_type: d.token_type || "bearer",
        expires_in: d.expires_in,
        expires_at: d.expires_at || now + (d.expires_in || 3600),
        refresh_token: d.refresh_token,
        user: d.user
      }));
    } catch (e) {
    }
  };
  const loginPassword = (e) => {
    e && e.preventDefault();
    const em = (email || "").trim().toLowerCase();
    const pw = password || "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
      setErr(t(["Escribe un correo v\xE1lido.", "Enter a valid email."]));
      return;
    }
    if (pw.length < 6) {
      setErr(t(["Escribe tu contrase\xF1a.", "Enter your password."]));
      return;
    }
    setSending(true);
    setErr("");
    fetch(SB_URL + "/auth/v1/token?grant_type=password", { method: "POST", headers: { "Content-Type": "application/json", "apikey": SB_ANON }, body: JSON.stringify({ email: em, password: pw }) }).then((r) => r.json()).then((d) => {
      setSending(false);
      if (d && d.access_token) {
        persistSession(d);
        location.href = /\/portal/.test(location.pathname) ? location.href : "/portal";
      } else {
        setErr(t(["Correo o contrase\xF1a incorrectos.", "Wrong email or password."]));
      }
    }).catch(() => {
      setSending(false);
      setErr(t(["Error de red. Intenta de nuevo.", "Network error. Try again."]));
    });
  };
  const loginGoogle = () => {
    try {
      location.href = SB_URL + "/auth/v1/authorize?provider=google&redirect_to=" + encodeURIComponent(location.origin + "/portal");
    } catch (e) {
    }
  };
  const iconColor = isOverDark ? "rgba(255,255,255,0.92)" : "var(--ink-2)";
  const hoverBg = isOverDark ? "rgba(255,255,255,0.15)" : "rgba(45,36,33,0.07)";
  const panel = { position: "absolute", top: "calc(100% + 10px)", right: 0, background: "var(--paper,#fff)", border: "1px solid var(--line,#ebe7e3)", borderRadius: 16, boxShadow: "0 16px 40px -10px rgba(0,0,0,0.22)", padding: 14, minWidth: 240, zIndex: 400 };
  if (sess) {
    const display = name || firstNameFrom(sess);
    return /* @__PURE__ */ React.createElement("div", { ref, className: "hdr-auth", style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        title: t(["Men\xFA de cuenta", "Account menu"]),
        style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 6px", borderRadius: 999, background: open ? hoverBg : "none", border: "none", cursor: "pointer", color: iconColor, fontFamily: "inherit", transition: "background .15s, color .3s" },
        onMouseEnter: (e) => {
          if (!open) e.currentTarget.style.background = hoverBg;
        },
        onMouseLeave: (e) => {
          if (!open) e.currentTarget.style.background = "none";
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#F55820 0%,#E83860 100%)", color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "0.02em" }, className: "notranslate" }, initialsFrom(display, sess.email)),
      /* @__PURE__ */ React.createElement("span", { className: "notranslate", style: { fontWeight: 700, fontSize: 13.5, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, display),
      /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))
    ), open && /* @__PURE__ */ React.createElement("div", { style: panel }, /* @__PURE__ */ React.createElement("div", { style: { padding: "2px 8px 10px" } }, /* @__PURE__ */ React.createElement("div", { className: "notranslate", style: { fontWeight: 800, fontSize: 14, color: "var(--ink)" } }, display), /* @__PURE__ */ React.createElement("div", { className: "notranslate", style: { fontSize: 12, color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, sess.email)), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "var(--line,#ebe7e3)", margin: "0 0 8px" } }), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/social?view=profile",
        style: { display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, textDecoration: "none", color: "var(--ink)", fontWeight: 700, fontSize: 13.5 },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg,#f8f5f2)",
        onMouseLeave: (e) => e.currentTarget.style.background = "none"
      },
      /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M4 21c0-4 4-6 8-6s8 2 8 6" })),
      t(["Mi perfil (B Social)", "My profile (B Social)"])
    ), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/portal",
        style: { display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, textDecoration: "none", color: "var(--ink)", fontWeight: 700, fontSize: 13.5 },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg,#f8f5f2)",
        onMouseLeave: (e) => e.currentTarget.style.background = "none"
      },
      /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 10h18M8 4v4" })),
      t(["Mi cuenta \xB7 Reservas", "My account \xB7 Bookings"])
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: logout,
        style: { display: "flex", width: "100%", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, border: "none", background: "none", cursor: "pointer", color: "var(--ink)", fontFamily: "inherit", fontWeight: 700, fontSize: 13.5, textAlign: "left" },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg,#f8f5f2)",
        onMouseLeave: (e) => e.currentTarget.style.background = "none"
      },
      /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12H9" })),
      t(["Cerrar sesi\xF3n", "Sign out"])
    )));
  }
  return /* @__PURE__ */ React.createElement("div", { ref, className: "hdr-auth", style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setOpen((o) => !o);
        setSent(false);
      },
      title: t(["Entrar", "Sign in"]),
      "aria-label": t(["Entrar", "Sign in"]),
      style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: open ? hoverBg : "none", border: "none", cursor: "pointer", color: iconColor, transition: "background .15s, color .3s" },
      onMouseEnter: (e) => {
        if (!open) e.currentTarget.style.background = hoverBg;
      },
      onMouseLeave: (e) => {
        if (!open) e.currentTarget.style.background = "none";
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M4 21c0-4 4-6 8-6s8 2 8 6" }))
  ), open && /* @__PURE__ */ React.createElement("div", { style: panel }, sent ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 6, color: "var(--orange)", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M4 7l8 6 8-6" }))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, color: "var(--ink)", marginBottom: 4 } }, t(["Revisa tu correo", "Check your email"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 } }, t(["Te enviamos un enlace para entrar sin contrase\xF1a.", "We sent you a passwordless sign-in link."]))) : /* @__PURE__ */ React.createElement("form", { onSubmit: loginPassword }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, color: "var(--ink)", marginBottom: 10 } }, t(["Entra a tu cuenta", "Sign in to your account"])), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: loginGoogle, style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line,#ddd)", background: "#fff", color: "#3c4043", fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 48 48" }, /* @__PURE__ */ React.createElement("path", { fill: "#EA4335", d: "M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.2 17.7 9.5 24 9.5z" }), /* @__PURE__ */ React.createElement("path", { fill: "#4285F4", d: "M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-3.9 6.8-9.7 6.8-17.4z" }), /* @__PURE__ */ React.createElement("path", { fill: "#FBBC05", d: "M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.2C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.2z" }), /* @__PURE__ */ React.createElement("path", { fill: "#34A853", d: "M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.3 0-11.6-3.7-13.5-9.1l-7.9 6.2C6.5 42.6 14.6 48 24 48z" })), t(["Continuar con Google", "Continue with Google"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, margin: "2px 0 10px", color: "var(--ink-2)", fontSize: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: "var(--line,#ebe7e3)" } }), t(["o con tu correo", "or with your email"]), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: "var(--line,#ebe7e3)" } })), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: t(["tu@correo.com", "you@email.com"]), autoComplete: "email", style: { width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line,#ebe7e3)", fontSize: 13.5, fontFamily: "inherit", marginBottom: 8, outline: "none" } }), /* @__PURE__ */ React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: t(["Contrase\xF1a", "Password"]), autoComplete: "current-password", style: { width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line,#ebe7e3)", fontSize: 13.5, fontFamily: "inherit", marginBottom: 8, outline: "none" } }), err ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#C0341E", marginBottom: 8, lineHeight: 1.4 } }, err) : null, /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: sending, style: { width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", cursor: sending ? "default" : "pointer", background: "linear-gradient(135deg,#F55820 0%,#E83860 100%)", color: "#fff", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", opacity: sending ? 0.7 : 1 } }, sending ? t(["Entrando\u2026", "Signing in\u2026"]) : t(["Entrar", "Sign in"])), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: sendLink, disabled: sending, style: { width: "100%", marginTop: 8, padding: "6px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "var(--ink-2)", fontFamily: "inherit", fontSize: 12, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "2px" } }, t(["Env\xEDame un enlace por correo", "Email me a sign-in link"])))));
}
function GlobeDropdown({ isOverDark, onLangSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const iconColor = isOverDark ? "rgba(255,255,255,0.92)" : "var(--ink-2)";
  const hoverBg = isOverDark ? "rgba(255,255,255,0.15)" : "rgba(45,36,33,0.07)";
  const activeBg = isOverDark ? "rgba(255,255,255,0.22)" : "rgba(45,36,33,0.1)";
  const select = (code) => {
    onLangSelect && onLangSelect(code);
    setOpen(false);
  };
  return /* @__PURE__ */ React.createElement("div", { ref, className: "hdr-globe", style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setOpen((o) => !o),
      title: "M\xE1s idiomas",
      style: { display: "flex", alignItems: "center", gap: 4, padding: "6px 9px", borderRadius: 999, background: open ? activeBg : "none", border: "none", cursor: "pointer", color: iconColor, fontFamily: "inherit", fontWeight: 700, fontSize: 11, letterSpacing: "0.04em", transition: "background .15s, color .3s" },
      onMouseEnter: (e) => {
        if (!open) e.currentTarget.style.background = hoverBg;
      },
      onMouseLeave: (e) => {
        if (!open) e.currentTarget.style.background = "none";
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }))
  ), open && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: "auto", right: 80, marginTop: 8, background: "var(--paper,#fff)", border: "1px solid var(--line,#ebe7e3)", borderRadius: 14, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.18)", padding: 8, minWidth: 180, zIndex: 300 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 12px 6px", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)" } }, "Volver a"), [["es", "\u{1F1EA}\u{1F1F8}  Espa\xF1ol (original)"], ["en", "\u{1F1EC}\u{1F1E7}  English"]].map(([code, label]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: code,
      onClick: () => select(code),
      style: { display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none", background: "none", borderRadius: 8, fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "var(--ink)", cursor: "pointer" },
      onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg,#f8f5f2)",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    label
  )), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "var(--line,#ebe7e3)", margin: "6px 8px" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 12px 6px", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft,#aaa)" } }, "Otros idiomas"), LANG_OPTIONS.map(([code, label]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: code,
      onClick: () => select(code),
      style: { display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none", background: "none", borderRadius: 8, fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: "var(--ink)", cursor: "pointer" },
      onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg,#f8f5f2)",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    label
  ))));
}
function NavItem({ label, href, items, navClass }) {
  return /* @__PURE__ */ React.createElement("div", { className: `nav-item ${navClass || ""}` }, /* @__PURE__ */ React.createElement("a", { href }, label, items && /* @__PURE__ */ React.createElement("svg", { className: "nav-caret", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), items && /* @__PURE__ */ React.createElement("div", { className: "nav-dropdown" }, items.map(
    (item, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: item.href, className: item.className || "", style: item.style }, item.label)
  )));
}
function MobileGroup({ label, items, open, onToggle, onNav }) {
  return /* @__PURE__ */ React.createElement("div", { className: `mnav-group${open ? " open" : ""}` }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "mnav-head", "aria-expanded": open, onClick: onToggle }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("svg", { className: "mnav-caret", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), open && /* @__PURE__ */ React.createElement("div", { className: "mnav-sub" }, items.map((it, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: it.href, className: it.className || "", style: it.style, onClick: onNav }, it.label))));
}
function Header({ overDark }) {
  const t = useT();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobG, setMobG] = useState(null);
  const [gtLang, setGtLang] = useState(() => localStorage.getItem("bpuppy-gt-lang") || null);
  const [gtLabel, setGtLabel] = useState(() => localStorage.getItem("bpuppy-gt-label") || null);
  const getVis = () => {
    const SP = window.SitePublish;
    if (!SP) return {};
    const r = {};
    SP.REGISTRY.pages.forEach((p) => {
      r[p.id] = SP.isPageLive(p.id);
    });
    return r;
  };
  const [pv, setPv] = useState(getVis);
  useEffect(() => {
    const h = () => setPv(getVis());
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      const mn = document.querySelector(".mobile-nav");
      const bg = document.querySelector(".hdr-burger");
      if (mn && mn.contains(e.target)) return;
      if (bg && bg.contains(e.target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);
  useEffect(() => {
    if (localStorage.getItem("bpuppy-lang") || localStorage.getItem("bpuppy-gt-lang")) return;
    const navLang = (navigator.language || "").split("-")[0].toLowerCase();
    if (navLang === "es") {
      setLang("es");
      try {
        localStorage.setItem("bpuppy-lang", "es");
      } catch (e) {
      }
      return;
    }
    if (navLang === "en") {
      setLang("en");
      try {
        localStorage.setItem("bpuppy-lang", "en");
      } catch (e) {
      }
      return;
    }
    const gtCode = GT_BROWSER[navLang];
    if (!gtCode) return;
    const label = GT_SHORT[gtCode] || navLang.toUpperCase();
    setGtLang(gtCode);
    setGtLabel(label);
    localStorage.setItem("bpuppy-gt-lang", gtCode);
    localStorage.setItem("bpuppy-gt-label", label);
    setTimeout(() => {
      if (window.bpTriggerTranslate) window.bpTriggerTranslate(gtCode);
    }, 1800);
  }, []);
  const applyGtCode = (code) => {
    const label = GT_SHORT[code] || code.toUpperCase();
    setGtLang(code);
    setGtLabel(label);
    localStorage.setItem("bpuppy-gt-lang", code);
    localStorage.setItem("bpuppy-gt-label", label);
    if (window.bpTriggerTranslate) window.bpTriggerTranslate(code);
  };
  const clearGtCode = () => {
    setGtLang(null);
    setGtLabel(null);
    localStorage.removeItem("bpuppy-gt-lang");
    localStorage.removeItem("bpuppy-gt-label");
    const sel = document.querySelector(".goog-te-combo");
    if (sel) {
      sel.value = "es";
      sel.dispatchEvent(new Event("change"));
    }
  };
  const applyNativeLang = (code) => {
    setLang(code);
    try {
      localStorage.setItem("bpuppy-lang", code);
    } catch (e) {
    }
    try {
      window.dispatchEvent(new CustomEvent("bpuppy:lang", { detail: code }));
      window.dispatchEvent(new CustomEvent("bpuppy-lang-change", { detail: code }));
    } catch (e) {
    }
  };
  const handleGtSelect = (code) => {
    if (code === "es") {
      clearGtCode();
      applyNativeLang("es");
      return;
    }
    if (code === "en") {
      clearGtCode();
      applyNativeLang("en");
      return;
    }
    applyGtCode(code);
  };
  const handleLeftClick = () => {
    if (gtLang) {
      if (window.bpTriggerTranslate) window.bpTriggerTranslate(gtLang);
    } else {
      clearGtCode();
      applyNativeLang("es");
    }
  };
  const handleRightClick = () => {
    clearGtCode();
    applyNativeLang("en");
  };
  const leftLabel = gtLabel || "ES";
  const leftActive = !!gtLang || !gtLang && lang === "es";
  const rightActive = lang === "en" && !gtLang;
  const klass = `hdr ${scrolled ? "scrolled" : ""} ${overDark && !scrolled ? "over-dark" : ""}`;
  const cachItems = [
    { label: t(["Cachorros disponibles", "Available puppies"]), href: "/cachorros" },
    { label: t(["Conoce las razas", "Meet the breeds"]), href: "/razas" },
    { label: t(["Encuentra tu Match", "Find Your Match"]), href: "/quiz", className: "bp-shine" },
    { label: t(["Solicita tu cachorro ideal", "Request your ideal puppy"]), href: "/solicitud" },
    { label: t(["Garant\xEDa de salud", "Health guarantee"]), href: "/garantia" },
    ...pv["Cachorros-Entregados"] !== false ? [{ label: t(["Cachorros Entregados", "Delivered Puppies"]), href: "/entregados" }] : [],
    ...pv["Adopciones"] ? [{ label: t(["Adopciones", "Adoptions"]), href: "/adopciones" }] : []
  ];
  const gatosItems = [
    { label: t(["Gatos disponibles", "Available cats"]), href: "/gatos" },
    { label: t(["Conoce las razas", "Meet the breeds"]), href: "/razas-gatos" },
    ...pv["Gatos-Entregados"] !== false ? [{ label: t(["Gatos Entregados", "Delivered Cats"]), href: "/gatos-entregados" }] : [],
    ...pv["Adopciones"] ? [{ label: t(["Adopciones", "Adoptions"]), href: "/adopciones-gatos" }] : []
  ];
  const mediaItems = [
    { label: t(["B Media", "B Media"]), href: "/media" },
    { label: t(["Noticias", "News"]), href: "/media#noticias" },
    ...pv["Blog"] ? [{ label: t(["Blog", "Blog"]), href: "/blog" }] : []
  ];
  const finItems = [
    { label: t(["Financiamiento", "Financing"]), href: "/financiamiento" },
    { label: t(["Planea sin prisa", "Plan at your pace"]), href: "/planea-sin-prisa" }
  ];
  return /* @__PURE__ */ React.createElement("header", { className: klass }, /* @__PURE__ */ React.createElement("div", { className: "container hdr-row" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "hdr-logo", "aria-label": "BPuppy" }, /* @__PURE__ */ React.createElement("img", { src: overDark && !scrolled ? "assets/logo-clean-light.webp" : "assets/logo-clean.webp", alt: "BPuppy logo" }), /* @__PURE__ */ React.createElement("span", { className: "wm notranslate" }, "Bright Puppy")), /* @__PURE__ */ React.createElement("nav", { className: "nav" }, pv["Cachorros"] !== false && /* @__PURE__ */ React.createElement(NavItem, { label: t(STRINGS.nav.puppies), href: "/cachorros", items: cachItems, navClass: "bp-nav-glow" }), pv["Gatos"] !== false && /* @__PURE__ */ React.createElement(NavItem, { label: t(["Gatos", "Cats"]), href: "/gatos", items: gatosItems }), /* @__PURE__ */ React.createElement(NavItem, { label: t(["Planes", "Plans"]), href: "/financiamiento", items: finItems }), pv["Tienda"] !== false && /* @__PURE__ */ React.createElement("a", { href: "/tienda" }, t(["Tienda", "Shop"])), pv["Grooming"] !== false && /* @__PURE__ */ React.createElement(NavItem, { label: /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "Grooming"), href: "/grooming" }), /* @__PURE__ */ React.createElement(NavItem, { label: /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "Media"), href: "/media", items: mediaItems.length > 1 ? mediaItems : void 0 }), /* @__PURE__ */ React.createElement("div", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/social", className: "nav-social", onClick: (e) => { e.preventDefault(); } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", width: 7, height: 7, borderRadius: "50%", background: "#0EA5E9" } }), t(["Social", "Social"]), /* @__PURE__ */ React.createElement("svg", { className: "nav-caret", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), /* @__PURE__ */ React.createElement("div", { className: "nav-dropdown" }, /* @__PURE__ */ React.createElement("a", { href: "/social", className: "notranslate nav-bsocial-glow", style: { fontWeight: 800 } }, "B Social"), /* Luis: enlace a Noticias arriba tambien desde B Social */ /* @__PURE__ */ React.createElement("a", { href: "/media#noticias" }, t(["Noticias", "News"])), /* @__PURE__ */ React.createElement("a", { href: "/nosotros?tab=impacto" }, t(["Impacto Social", "Social Impact"])), /* @__PURE__ */ React.createElement("a", { href: "/nosotros?tab=historia" }, t(["Nuestra Historia", "Our Story"])), /* @__PURE__ */ React.createElement("a", { href: "/nosotros?tab=equipo" }, t(["Nuestro Equipo", "Our Team"]))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("a", { href: "tel:+19294287300", className: "hdr-phone", "aria-label": "Llamar" }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" }))), /* @__PURE__ */ React.createElement("div", { className: "lang", role: "group", "aria-label": "Language" }, /* @__PURE__ */ React.createElement("button", { "data-active": leftActive, onClick: handleLeftClick }, /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, leftLabel)), /* @__PURE__ */ React.createElement("button", { "data-active": rightActive, onClick: handleRightClick }, /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "EN"))), /* @__PURE__ */ React.createElement(GlobeDropdown, { isOverDark: overDark && !scrolled, onLangSelect: handleGtSelect }), /* @__PURE__ */ React.createElement(AuthControl, { isOverDark: overDark && !scrolled }), /* @__PURE__ */ React.createElement("a", { href: "/cachorros", className: "hdr-cta" }, t(STRINGS.hdr.cta)), /* @__PURE__ */ React.createElement("button", { className: "hdr-burger", "aria-label": "Menu", "aria-expanded": menuOpen, onClick: () => setMenuOpen((o) => !o) }, /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18" }), /* @__PURE__ */ React.createElement("path", { d: "M3 12h18" }), /* @__PURE__ */ React.createElement("path", { d: "M3 18h18" }))))), menuOpen && /* @__PURE__ */ React.createElement("nav", { className: "mobile-nav" }, /* @__PURE__ */ React.createElement("a", { href: "/social", className: "mnav-social", onClick: () => setMenuOpen(false) }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", width: 8, height: 8, borderRadius: "50%", background: "#0EA5E9", marginRight: 8 } }), t(["Social \xB7 Comunidad", "Social \xB7 Community"])), pv["Cachorros"] !== false && /* @__PURE__ */ React.createElement(MobileGroup, { label: t(STRINGS.nav.puppies), items: cachItems, open: mobG === "cach", onToggle: () => setMobG((g) => g === "cach" ? null : "cach"), onNav: () => setMenuOpen(false) }), pv["Gatos"] !== false && /* @__PURE__ */ React.createElement(MobileGroup, { label: t(["Gatos", "Cats"]), items: gatosItems, open: mobG === "gatos", onToggle: () => setMobG((g) => g === "gatos" ? null : "gatos"), onNav: () => setMenuOpen(false) }), /* @__PURE__ */ React.createElement(MobileGroup, { label: t(["Planes", "Plans"]), items: finItems, open: mobG === "fin", onToggle: () => setMobG((g) => g === "fin" ? null : "fin"), onNav: () => setMenuOpen(false) }), pv["Grooming"] !== false && /* @__PURE__ */ React.createElement("a", { href: "/grooming", onClick: () => setMenuOpen(false) }, /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "Grooming")), mediaItems.length > 1 ? /* @__PURE__ */ React.createElement(MobileGroup, { label: /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "Media"), items: mediaItems, open: mobG === "media", onToggle: () => setMobG((g) => g === "media" ? null : "media"), onNav: () => setMenuOpen(false) }) : /* @__PURE__ */ React.createElement("a", { href: "/media", onClick: () => setMenuOpen(false) }, /* @__PURE__ */ React.createElement("span", { className: "notranslate" }, "Media")), /* @__PURE__ */ React.createElement(MobileGroup, { label: t(["Nosotros", "About"]), items: [{ label: t(["Impacto Social", "Social Impact"]), href: "/nosotros?tab=impacto" }, { label: t(["Nuestra Historia", "Our Story"]), href: "/nosotros?tab=historia" }, { label: t(["Nuestro Equipo", "Our Team"]), href: "/nosotros?tab=equipo" }], open: mobG === "nos", onToggle: () => setMobG((g) => g === "nos" ? null : "nos"), onNav: () => setMenuOpen(false) }), /* @__PURE__ */ React.createElement("div", { className: "mobile-nav-footer" }, /* @__PURE__ */ React.createElement(GlobeDropdown, { isOverDark: false, onLangSelect: handleGtSelect }), /* @__PURE__ */ React.createElement("a", { href: "tel:+19294287300", className: "hdr-phone", "aria-label": "Llamar" }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" }))))));
}
function Footer() {
  const t = useT();
  const { lang } = useLang();
  const EN = lang === "en";
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("footer", { className: "foot notranslate", translate: "no" }, /* @__PURE__ */ React.createElement("div", { className: "container foot-row" }, /* @__PURE__ */ React.createElement("div", { className: "foot-logo" }, /* @__PURE__ */ React.createElement("img", { src: "assets/logo-clean.webp", alt: "" }), /* @__PURE__ */ React.createElement("span", null, "BPuppy")), /* @__PURE__ */ React.createElement("p", null, t(STRINGS.foot.rights)), /* @__PURE__ */ React.createElement("div", { className: "foot-links" }, /* @__PURE__ */ React.createElement("a", { href: "/tarjeta-regalo" }, t(["Tarjetas de regalo", "Gift cards"])), /* @__PURE__ */ React.createElement("a", { href: "/garantia" }, t(["Garant\xEDa de salud", "Health guarantee"])), /* @__PURE__ */ React.createElement("a", { href: EN ? "/refunds" : "/reembolsos" }, t(["Pol\xEDtica de devoluci\xF3n", "Refund policy"])), /* @__PURE__ */ React.createElement("a", { href: EN ? "/privacy" : "/privacidad" }, t(STRINGS.foot.privacy)), /* @__PURE__ */ React.createElement("a", { href: EN ? "/terms" : "/terminos" }, t(STRINGS.foot.terms)))), /* @__PURE__ */ React.createElement("div", { className: "container", style: { marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(45,36,33,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("a", { href: "https://maps.google.com/?q=Central+Florida", target: "_blank", rel: "noreferrer", style: { fontSize: 13, color: "var(--ink-2)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "2.5" })), " Central Florida y New Jersey"), /* @__PURE__ */ React.createElement("a", { href: "https://maps.google.com/?q=Central+Florida", target: "_blank", rel: "noreferrer", className: "btn btn-ghost", style: { fontSize: 13, gap: 6, display: "inline-flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M12 3l2.5 5.2 5.5.8-4 3.9.9 5.6L12 21l-5.4 2.5L7.5 18l-4-3.9 5.5-.8z" })), " ", t(["Dejar rese\xF1a en Google", "Leave a Google review"])))), show && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "aria-label": "Volver arriba",
      style: {
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 998,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--orange)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(245,130,32,0.4)",
        transition: "opacity .2s, transform .2s"
      },
      onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)",
      onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
    },
    "\u2191"
  ));
}
function PawCursor({ enabled }) {
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const containerRef = useRef(null);
  const stepRef = useRef(0);
  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.removeProperty("--app-cursor");
      return;
    }
    document.documentElement.style.setProperty("--app-cursor", "auto");
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e) => {
      const now = performance.now();
      const last = lastRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (now - last.t < 80 || dist < 40) return;
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
      const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      stepRef.current = 1 - stepRef.current;
      const offsetPerp = stepRef.current ? 6 : -6;
      const rad = angle * Math.PI / 180;
      const ox = Math.cos(rad - Math.PI / 2) * offsetPerp;
      const oy = Math.sin(rad - Math.PI / 2) * offsetPerp;
      const paw = document.createElement("div");
      paw.className = "paw fading";
      paw.style.left = e.clientX + ox + "px";
      paw.style.top = e.clientY + oy + "px";
      paw.style.setProperty("--r", angle + "deg");
      paw.innerHTML = '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="20" rx="7" ry="6"/><ellipse cx="7" cy="12" rx="3" ry="4"/><ellipse cx="25" cy="12" rx="3" ry="4"/><ellipse cx="11" cy="6" rx="2.5" ry="3.5"/><ellipse cx="21" cy="6" rx="2.5" ry="3.5"/></svg>';
      container.appendChild(paw);
      setTimeout(() => paw.remove(), 1300);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);
  return /* @__PURE__ */ React.createElement("div", { ref: containerRef, "aria-hidden": "true" });
}
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
function ComingSoon({ pageName }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg,#FAFAF8)",
    padding: "40px 24px",
    textAlign: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 480 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: "var(--display,Bricolage Grotesque,sans-serif)",
    fontSize: "clamp(72px,14vw,140px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "transparent",
    WebkitTextStroke: "2px rgba(45,36,33,0.07)",
    marginBottom: 28,
    userSelect: "none"
  } }, "Pronto"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--orange,#FF5520)", marginBottom: 14 } }, "En preparaci\xF3n"), /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: "var(--display)",
    fontSize: "clamp(22px,3.5vw,38px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    margin: "0 0 14px",
    color: "var(--ink,#2D2421)"
  } }, pageName ? `${pageName} llega pronto` : "Esta p\xE1gina est\xE1 en preparaci\xF3n"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2,#6B5A4E)", lineHeight: 1.65, marginBottom: 32, fontSize: 15 } }, "Estamos trabajando para traerte la mejor experiencia. Gracias por tu paciencia."), /* @__PURE__ */ React.createElement("a", { href: "/", style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "var(--orange,#FF5520)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    padding: "13px 26px",
    borderRadius: 999,
    textDecoration: "none",
    boxShadow: "0 8px 24px -8px rgba(255,85,32,0.38)"
  } }, "\u2190 Volver al inicio")));
}
function useSitePublish(pageId) {
  const [isLive, setIsLive] = React.useState(
    () => window.SitePublish ? window.SitePublish.isPageLive(pageId) : true
  );
  React.useEffect(() => {
    const h = () => setIsLive(window.SitePublish ? window.SitePublish.isPageLive(pageId) : true);
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, [pageId]);
  return isLive;
}
Object.assign(window, { Header, Footer, PawCursor, useReveal, ComingSoon, useSitePublish });

})();

// Teclados fáciles en formularios (móvil): carga input-easy.js una sola vez en todas las páginas con chrome.
(function(){ if(window.__bpInputEasy) return; try{ var s=document.createElement('script'); s.src='input-easy.js'; s.async=true; document.head.appendChild(s); }catch(e){} })();
