(function(){
(function() {
  const { useState, useEffect, useRef, useCallback } = React;
  const SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
  const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  const GREETINGS = [
    "Hola",
    "Hello",
    "Bonjour",
    "Ol\xE1",
    "Hallo",
    "Ciao",
    "\u041F\u0440\u0438\u0432\u0435\u0442",
    "\u4F60\u597D",
    "\u0645\u0631\u062D\u0628\u0627",
    "\u3053\u3093\u306B\u3061\u306F",
    "\uC548\uB155\uD558\uC138\uC694",
    "Merhaba",
    "\u0928\u092E\u0938\u094D\u0924\u0947",
    "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35",
    "Xin ch\xE0o"
  ];
  const TOPICS = [
    { id: "breeds", es: "Razas disponibles", en: "Available breeds" },
    { id: "health", es: "Salud y garant\xEDa", en: "Health & guarantee" },
    { id: "adopt", es: "Adopciones", en: "Adoptions" },
    { id: "process", es: "\xBFC\xF3mo funciona?", en: "How it works" },
    { id: "travel", es: "Viajes internacionales", en: "International travel" },
    { id: "feed", es: "Alimentaci\xF3n", en: "Feeding" },
    { id: "finance", es: "Financiamiento", en: "Financing" },
    { id: "quiz", es: "Quiz de razas", en: "Breed quiz" }
  ];
  const TOPIC_MSG = {
    breeds: { es: "\xBFQu\xE9 razas tienen disponibles ahora mismo?", en: "What breeds do you have available right now?" },
    health: { es: "\xBFC\xF3mo funciona la garant\xEDa de salud?", en: "How does the health guarantee work?" },
    adopt: { es: "Me interesa adoptar. \xBFC\xF3mo funciona?", en: "I'm interested in adopting. How does it work?" },
    process: { es: "\xBFC\xF3mo es el proceso para conseguir un cachorro?", en: "What is the process to get a puppy?" },
    travel: { es: "Necesito llevar mi cachorro fuera del pa\xEDs. \xBFQu\xE9 necesito?", en: "I need to take my puppy abroad. What do I need?" },
    feed: { es: "\xBFQu\xE9 alimentaci\xF3n recomiendan para los cachorros?", en: "What feeding do you recommend?" },
    finance: { es: "\xBFTienen opciones de financiamiento disponibles?", en: "Do you have financing options?" },
    quiz: { es: "Quiero hacer el quiz para encontrar mi raza ideal.", en: "I'd like to take the quiz to find my ideal breed." }
  };
  const SYSTEM = `You are a warm, genuine chat advisor for BPuppy \u2014 a US-based family puppy breeder, also connecting families with local shelters for adoption.

PERSONALITY:
- Warm and real, not saccharine or robotic
- Chat like a real person texting \u2014 casual, natural
- Use ! at END of sentences only, NEVER \xA1 at the start (like native speakers text)
- Choosing a puppy is a major family decision \u2014 always give the client space, never pressure
- Occasionally check in casually ("how's the search going?") but never pry into personal life
- Always detect the language the client writes in and respond in THAT language throughout
- Keep replies to 2\u20134 sentences max. Avoid bullet lists in casual chat

NAME & CONTACT:
- After 2\u20133 exchanges without knowing their name, ask naturally: "Por cierto, \xBFc\xF3mo te llamas?" (or equivalent in their language)
- Use their name warmly but sparingly \u2014 once every few exchanges, not every message
- After getting their name, ask naturally for a contact number: "Si quieres te puedo avisar cuando llegue algo que se ajuste a lo que buscas \u2014 \xBFme dejas un n\xFAmero de contacto?" (or equivalent)
- Keep it natural and conversational, not like a form

BPUPPY KNOWLEDGE:
- Breeds: Golden Retrievers, French Bulldogs, Pomeranians, Dachshunds, Shih Tzus, Maltipoos, Yorkies, Labradors, Cavapoos and more
- Every puppy: vet-checked, current vaccinations, microchipped, 1-year genetic health guarantee
- Process: browse \u2192 chat/WhatsApp \u2192 deposit \u2192 delivery or pickup
- Financing: Klarna, Afterpay, Affirm, PayPal
- International travel: USDA health certificate required; requirements vary by airline and country
- Contact: +1 (808) 492-8294

LINKS \u2014 use markdown exactly:
- [Ver cachorros disponibles](Cachorros.html)
- [Secci\xF3n de adopciones](Adopciones.html)
- [Quiz completo de razas](Quiz-Completo.html)

Never say you are an AI unless directly asked. Stay in character as a helpful human advisor.`;
  let supa = null;
  try {
    if (window.supabase) supa = window.supabase.createClient(SUPA_URL, SUPA_KEY);
  } catch (e) {
  }
  async function saveSession(key, data) {
    if (!supa) return;
    try {
      await supa.from("chat_sessions").upsert({
        session_key: key,
        client_name: data.clientName || null,
        client_phone: data.clientPhone || null,
        messages: data.messages,
        lang: data.lang || "es",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, { onConflict: "session_key" });
      if (data.clientPhone && !localStorage.getItem("bp_lead_" + key)) {
        const convo = (data.messages || []).map((m) => (m.role === "user" ? "Cliente: " : "Asesor: ") + (m.content || "")).join("\n").slice(0, 2e3);
        const { error } = await supa.from("website_leads").insert({
          full_name: data.clientName || null,
          phone: data.clientPhone,
          message: "Lead del chat de la web:\n\n" + convo,
          source: "chat_web"
        });
        if (!error) localStorage.setItem("bp_lead_" + key, "1");
      }
    } catch (e) {
    }
  }
  const genKey = () => "bp_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
  const LS_CURR = "bpuppy_current_sess";
  const LS_HIST = "bpuppy_chat_history";
  function loadSession(key) {
    try {
      return JSON.parse(localStorage.getItem("bpuppy_sess_" + key) || "null");
    } catch {
      return null;
    }
  }
  function persistSession(key, data) {
    localStorage.setItem("bpuppy_sess_" + key, JSON.stringify(data));
    const hist = loadHistory();
    const idx = hist.findIndex((h) => h.key === key);
    const entry = {
      key,
      clientName: data.clientName || null,
      clientPhone: data.clientPhone || null,
      startedAt: data.startedAt || (/* @__PURE__ */ new Date()).toISOString(),
      preview: (data.messages || []).filter((m) => m.role === "user").slice(-1)[0]?.content?.slice(0, 60) || "",
      msgCount: (data.messages || []).length
    };
    if (idx >= 0) hist[idx] = entry;
    else hist.unshift(entry);
    localStorage.setItem(LS_HIST, JSON.stringify(hist.slice(0, 20)));
  }
  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(LS_HIST) || "[]");
    } catch {
      return [];
    }
  }
  function getCurrKey() {
    return localStorage.getItem(LS_CURR) || null;
  }
  function setCurrKey(k) {
    localStorage.setItem(LS_CURR, k);
  }
  function RenderMD({ text }) {
    const rx = /\[([^\]]+)\]\(([^)]+)\)/g;
    const out = [];
    let last = 0, m;
    while ((m = rx.exec(text)) !== null) {
      if (m.index > last) out.push(/* @__PURE__ */ React.createElement("span", { key: last }, text.slice(last, m.index)));
      out.push(/* @__PURE__ */ React.createElement("a", { key: m.index, href: m[2], style: { color: "#E85D75", fontWeight: 600 } }, m[1]));
      last = rx.lastIndex;
    }
    if (last < text.length) out.push(/* @__PURE__ */ React.createElement("span", { key: last }, text.slice(last)));
    return /* @__PURE__ */ React.createElement(React.Fragment, null, out);
  }
  function TypingDots() {
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "11px 14px", background: "#f2f2f2", borderRadius: "14px 14px 14px 4px", width: "fit-content" } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 7, height: 7, borderRadius: "50%", background: "#c0c0c0", animation: `bpChatDot 1.1s ease-in-out ${i * 0.18}s infinite` } })));
  }
  function GreetingOverlay({ active }) {
    const [idx, setIdx] = useState(0);
    const [show, setShow] = useState(true);
    useEffect(() => {
      if (!active) return;
      const id = setInterval(() => {
        setShow(false);
        setTimeout(() => {
          setIdx((i) => (i + 1) % GREETINGS.length);
          setShow(true);
        }, 700);
      }, 3e3);
      return () => clearInterval(id);
    }, [active]);
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: "48%",
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      pointerEvents: "none",
      userSelect: "none",
      opacity: active ? 1 : 0,
      transition: "opacity 0.5s ease"
    } }, /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 62,
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 1,
      fontFamily: 'var(--display,"Bricolage Grotesque",sans-serif)',
      color: "rgba(232,93,117,0.07)",
      opacity: show ? 1 : 0,
      transition: "opacity 0.7s ease"
    } }, GREETINGS[idx]));
  }
  function HistoryPanel({ onSelect, onClose, currentKey }) {
    const isEn = (localStorage.getItem("bpuppy-lang") || "es") === "en";
    const hist = loadHistory();
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "#fff", zIndex: 30, borderRadius: 22, display: "flex", flexDirection: "column", animation: "bpChatPop 0.25s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 16, lineHeight: 1, padding: 4 } }, "\u2190"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--display,sans-serif)", fontWeight: 700, fontSize: 13.5 } }, isEn ? "Conversation history" : "Historial de conversaciones")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "8px" } }, hist.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { padding: 32, textAlign: "center", color: "#ccc", fontSize: 13 } }, isEn ? "No previous conversations" : "Sin conversaciones anteriores") : hist.map((h) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: h.key,
        onClick: () => onSelect(h.key),
        style: { width: "100%", textAlign: "left", padding: "12px 14px", border: "none", borderRadius: 12, cursor: "pointer", marginBottom: 2, background: h.key === currentKey ? "#fff0f2" : "transparent", display: "block" },
        onMouseEnter: (e) => {
          if (h.key !== currentKey) e.currentTarget.style.background = "#fafafa";
        },
        onMouseLeave: (e) => {
          if (h.key !== currentKey) e.currentTarget.style.background = "transparent";
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13, color: "#1a1a1a", marginBottom: 1 } }, h.clientName || (isEn ? "Anonymous" : "Cliente an\xF3nimo"), h.clientPhone && /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 400, color: "#bbb", marginLeft: 6, fontSize: 11 } }, h.clientPhone)),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, h.preview || "\u2014"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#ccc", marginTop: 2 } }, h.startedAt ? new Date(h.startedAt).toLocaleDateString() : "", " \xB7 ", h.msgCount, " ", isEn ? "msgs" : "msgs")
    ))));
  }
  function ChatWindow({ onClose }) {
    const lang = localStorage.getItem("bpuppy-lang") || "es";
    const isEn = lang === "en";
    const tl = (es, en) => isEn ? en : es;
    const [sessionKey, setSessionKey] = useState(() => getCurrKey() || (() => {
      const k = genKey();
      setCurrKey(k);
      return k;
    })());
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showHist, setShowHist] = useState(false);
    const [topicsOn, setTopicsOn] = useState(true);
    const [topicsExp, setTopicsExp] = useState(false);
    const endRef = useRef();
    const inputRef = useRef();
    useEffect(() => {
      const key = getCurrKey();
      const saved = key ? loadSession(key) : null;
      if (saved) {
        setMsgs(saved.messages || []);
        setClientName(saved.clientName || "");
        setClientPhone(saved.clientPhone || "");
        setSessionKey(key);
        if ((saved.messages || []).some((m) => m.role === "user")) setTopicsOn(false);
      }
    }, []);
    useEffect(() => {
      if (!msgs.length && !clientName) return;
      const data = {
        messages: msgs,
        clientName,
        clientPhone,
        lang,
        startedAt: localStorage.getItem("bpuppy_sess_start_" + sessionKey) || (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem("bpuppy_sess_start_" + sessionKey, data.startedAt);
      persistSession(sessionKey, data);
      saveSession(sessionKey, data);
    }, [msgs, clientName, clientPhone]);
    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs, loading]);
    const detectInfo = useCallback((allMsgs) => {
      if (!clientName) {
        const lastA = [...allMsgs].reverse().find((m) => m.role === "assistant");
        const lastU = [...allMsgs].reverse().find((m) => m.role === "user");
        if (lastA && lastU) {
          const a = lastA.content.toLowerCase();
          if (["llamas", "nombre", "your name", "call you", "wie hei\xDFt", "comment tu", "\u6765\u4EC0\u4E48\u540D\u5B57"].some((p) => a.includes(p))) {
            const n = lastU.content.trim();
            if (n.length < 40 && n.split(" ").length <= 4 && !/[@?!.]/g.test(n)) {
              setClientName(n);
            }
          }
        }
      }
      if (!clientPhone) {
        const last = [...allMsgs].reverse().find((m) => m.role === "user");
        if (last) {
          const match = last.content.match(/[\+]?[\d\s\-\(\)]{7,15}/);
          if (match) setClientPhone(match[0].trim());
        }
      }
    }, [clientName, clientPhone]);
    const randDelay = () => [3e3, 3400, 4e3, 4800, 5500, 6200, 7e3][Math.floor(Math.random() * 7)];
    const send = useCallback(async (text) => {
      if (!text.trim() || loading) return;
      setTopicsOn(false);
      const userMsg = { role: "user", content: text };
      const newMsgs = [...msgs, userMsg];
      setMsgs(newMsgs);
      setInput("");
      setLoading(true);
      await new Promise((r) => setTimeout(r, randDelay()));
      try {
        const reply = await window.claude.complete({ messages: newMsgs, system: SYSTEM });
        const final = [...newMsgs, { role: "assistant", content: reply }];
        setMsgs(final);
        detectInfo(final);
      } catch {
        setMsgs((prev) => [...prev, { role: "assistant", content: tl("Disculpa, algo sali\xF3 mal. Intenta de nuevo!", "Sorry, something went wrong. Try again!") }]);
      }
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, [msgs, loading, detectInfo]);
    const startNew = () => {
      const k = genKey();
      setCurrKey(k);
      setSessionKey(k);
      setMsgs([]);
      setClientName("");
      setClientPhone("");
      setTopicsOn(true);
      setTopicsExp(false);
      setShowHist(false);
    };
    const loadHist = (key) => {
      const saved = loadSession(key);
      if (!saved) return;
      setCurrKey(key);
      setSessionKey(key);
      setMsgs(saved.messages || []);
      setClientName(saved.clientName || "");
      setClientPhone(saved.clientPhone || "");
      setTopicsOn(!(saved.messages || []).some((m) => m.role === "user"));
      setShowHist(false);
    };
    const hasUser = msgs.some((m) => m.role === "user");
    const visTopics = topicsExp ? TOPICS : TOPICS.slice(0, 4);
    const sendDisabled = !input.trim() || loading;
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      bottom: 88,
      right: 20,
      width: "min(350px, calc(100vw - 24px))",
      borderRadius: 22,
      overflow: "visible",
      boxShadow: "0 20px 64px -8px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.08)",
      zIndex: 1e3,
      animation: "bpChatPop 0.38s cubic-bezier(0.34,1.56,0.64,1)"
    } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 22, overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#E85D75 0%,#C44A61 100%)", padding: "12px 14px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center", fontSize: 15, flexShrink: 0 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13, color: "#fff", fontFamily: "var(--display,sans-serif)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, "BPuppy", clientName ? ` \xB7 ${clientName}` : ""), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "rgba(255,255,255,0.8)" } }, tl("Tu asesora \xB7 En l\xEDnea", "Puppy advisor \xB7 Online"))), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "tel:+18084928294",
        title: tl("Llamar", "Call"),
        style: { width: 27, height: 27, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center", textDecoration: "none", color: "#fff", flexShrink: 0 }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" }))
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: startNew,
        title: tl("Nueva conversaci\xF3n", "New conversation"),
        style: { width: 27, height: 27, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" }))
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowHist(true),
        title: tl("Historial", "History"),
        style: { width: 27, height: 27, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("polyline", { points: "12 6 12 12 16 14" }))
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        style: { width: 27, height: 27, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0, fontSize: 12 }
      },
      "\u2715"
    ))), /* @__PURE__ */ React.createElement("div", { style: { height: 380, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: 9, position: "relative" } }, /* @__PURE__ */ React.createElement(GreetingOverlay, { active: !hasUser }), msgs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#f3f3f3", borderRadius: "14px 14px 14px 4px", padding: "11px 14px", fontSize: 13.5, lineHeight: 1.6, maxWidth: "92%", color: "#1a1a1a" } }, tl(
      "Hola! \xBFc\xF3mo puedo ayudarte? H\xE1blame en el idioma que prefieras.",
      "Hi! How can I help you? Feel free to write in any language you prefer."
    )), topicsOn && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#c0c0c0", marginBottom: 7 } }, tl("\xBFEn qu\xE9 te puedo ayudar?", "What can I help with?")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, visTopics.map((tp) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tp.id,
        onClick: () => send(TOPIC_MSG[tp.id][isEn ? "en" : "es"]),
        onMouseEnter: (e) => Object.assign(e.currentTarget.style, { background: "#E85D75", color: "#fff", borderColor: "#E85D75" }),
        onMouseLeave: (e) => Object.assign(e.currentTarget.style, { background: "#fff8f9", color: "#E85D75", borderColor: "#f2c0ca" }),
        style: { padding: "5px 12px", borderRadius: 999, border: "1.5px solid #f2c0ca", background: "#fff8f9", color: "#E85D75", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }
      },
      isEn ? tp.en : tp.es
    )), !topicsExp && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTopicsExp(true),
        style: { padding: "5px 12px", borderRadius: 999, border: "1.5px solid #e5e5e5", background: "#f8f8f8", color: "#bbb", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }
      },
      tl("M\xE1s \u2192", "More \u2192")
    )))), msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", position: "relative", zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { style: {
      background: m.role === "user" ? "linear-gradient(135deg,#E85D75,#C44A61)" : "#f3f3f3",
      color: m.role === "user" ? "#fff" : "#1a1a1a",
      borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      padding: "10px 13px",
      fontSize: 13.5,
      lineHeight: 1.6,
      maxWidth: "85%",
      wordBreak: "break-word"
    } }, m.role === "assistant" ? /* @__PURE__ */ React.createElement(RenderMD, { text: m.content }) : m.content))), loading && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-start", zIndex: 2, position: "relative" } }, /* @__PURE__ */ React.createElement(TypingDots, null)), /* @__PURE__ */ React.createElement("div", { ref: endRef })), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 8, flexShrink: 0, background: "#fff" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: inputRef,
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send(input);
          }
        },
        placeholder: tl("Escribe un mensaje...", "Type a message..."),
        style: { flex: 1, border: "1.5px solid #e8e8e8", borderRadius: 12, padding: "9px 13px", fontSize: 13.5, fontFamily: "inherit", outline: "none", background: "#fafafa", color: "#1a1a1a", transition: "border-color .2s" },
        onFocus: (e) => e.target.style.borderColor = "#E85D75",
        onBlur: (e) => e.target.style.borderColor = "#e8e8e8"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => send(input),
        disabled: sendDisabled,
        style: { width: 38, height: 38, borderRadius: 11, border: "none", background: sendDisabled ? "#ebebeb" : "linear-gradient(135deg,#E85D75,#C44A61)", cursor: sendDisabled ? "default" : "pointer", display: "grid", placeItems: "center", flexShrink: 0, transition: "background .2s" }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: sendDisabled ? "#bbb" : "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" }))
    )), showHist && /* @__PURE__ */ React.createElement(HistoryPanel, { onSelect: loadHist, onClose: () => setShowHist(false), currentKey: sessionKey })));
  }
  function ChatBtn({ open, onClick }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick,
        "aria-label": "Chat con BPuppy",
        style: { position: "fixed", bottom: 20, right: 20, width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#E85D75,#C44A61)", boxShadow: "0 6px 24px -4px rgba(232,93,117,0.55)", display: "grid", placeItems: "center", zIndex: 1001, transition: "transform .22s cubic-bezier(0.34,1.56,0.64,1)" },
        onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)",
        onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
      },
      open ? /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6L6 18M6 6l12 12" })) : /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 40 40", width: "26", height: "26", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M7 8Q7 4 11 4L29 4Q33 4 33 8L33 24Q33 28 29 28L23 28L20 33L17 28L11 28Q7 28 7 24Z", fill: "white" }), /* @__PURE__ */ React.createElement("circle", { cx: "13.5", cy: "13.5", r: "2.8", fill: "#E85D75" }), /* @__PURE__ */ React.createElement("circle", { cx: "20", cy: "11.2", r: "2.8", fill: "#E85D75" }), /* @__PURE__ */ React.createElement("circle", { cx: "26.5", cy: "13.5", r: "2.8", fill: "#E85D75" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "20", cy: "20", rx: "5.2", ry: "4.2", fill: "#E85D75" }))
    );
  }
  if (!document.getElementById("bpuppy-gt-rdy")) {
    document.head.insertAdjacentHTML("beforeend", '<meta id="bpuppy-gt-rdy">');
    const gtEl = document.createElement("div");
    gtEl.id = "google_translate_element";
    gtEl.style.cssText = "position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;top:-99px;";
    document.body.appendChild(gtEl);
    const gtCSS = document.createElement("style");
    gtCSS.textContent = `.goog-te-banner-frame,.goog-te-gadget,#goog-gt-tt,.goog-tooltip,.skiptranslate{display:none!important;}body{top:0!important;}`;
    document.head.appendChild(gtCSS);
    window.googleTranslateElementInit = function() {
      try {
        new window.google.translate.TranslateElement({ pageLanguage: "es", autoDisplay: false }, "google_translate_element");
      } catch (e) {
      }
    };
    const sc = document.createElement("script");
    sc.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    sc.async = true;
    document.body.appendChild(sc);
  }
  window.bpTriggerTranslate = function(code) {
    const try_ = (n) => {
      const sel = document.querySelector(".goog-te-combo");
      if (sel) {
        sel.value = code;
        sel.dispatchEvent(new Event("change"));
      } else if (n > 0) setTimeout(() => try_(n - 1), 400);
    };
    try_(12);
  };
  if (!document.getElementById("bpuppy-chat-css")) {
    const s = document.createElement("style");
    s.id = "bpuppy-chat-css";
    s.textContent = `
      @keyframes bpChatPop {
        from { opacity:0; transform:scale(0.87) translateY(16px); transform-origin:bottom right; }
        to   { opacity:1; transform:scale(1)    translateY(0);   }
      }
      @keyframes bpChatDot {
        0%,60%,100% { transform:translateY(0);   }
        30%          { transform:translateY(-6px); }
      }
      @media (max-width:480px) {
        #bpuppy-chat-root > div > div:first-child { right:10px !important; bottom:80px !important; }
      }
    `;
    document.head.appendChild(s);
  }
  function BPuppyChat() {
    const [open, setOpen] = useState(false);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ChatBtn, { open, onClick: () => setOpen((o) => !o) }), open && /* @__PURE__ */ React.createElement(ChatWindow, { onClose: () => setOpen(false) }));
  }
  if (!document.getElementById("bpuppy-chat-root")) {
    const el = document.createElement("div");
    el.id = "bpuppy-chat-root";
    document.body.appendChild(el);
    ReactDOM.createRoot(el).render(/* @__PURE__ */ React.createElement(BPuppyChat, null));
  }
})();

})();
