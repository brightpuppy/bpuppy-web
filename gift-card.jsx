// gift-card.jsx — Tarjetas de regalo BrightPuppy (Stripe Checkout). Diseño + compra + canje.
const { useState, useEffect } = React;
const GC_URL = 'https://oqqwmcplljirbreowrll.supabase.co';
const GC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';

const GC_DESIGNS = {
  sunset: { grad: 'linear-gradient(135deg,#F58220,#E85D75)', label: ['Atardecer', 'Sunset'] },
  sky:    { grad: 'linear-gradient(135deg,#2F6BFF,#22C3E6)', label: ['Cielo', 'Sky'] },
  forest: { grad: 'linear-gradient(135deg,#1EB87A,#2D6A4F)', label: ['Bosque', 'Forest'] },
  royal:  { grad: 'linear-gradient(135deg,#7C3AED,#E85D75)', label: ['Real', 'Royal'] },
  gold:   { grad: 'linear-gradient(135deg,#F5C53A,#E0902A)', label: ['Oro', 'Gold'] },
};
const gcApi = async (action, extra) => {
  const r = await fetch(GC_URL + '/functions/v1/gift_card', { method: 'POST', headers: { 'Content-Type': 'application/json', 'apikey': GC_KEY, 'Authorization': 'Bearer ' + GC_KEY }, body: JSON.stringify({ action, origin: location.origin, ...(extra || {}) }) });
  return r.json();
};

function PawCorner() {
  return <svg width="80" height="80" viewBox="0 0 64 64" fill="rgba(255,255,255,0.18)" style={{ position: 'absolute', bottom: -6, right: -6 }}>
    <ellipse cx="32" cy="42" rx="13" ry="10"/><ellipse cx="13" cy="27" rx="5.5" ry="7.5"/><ellipse cx="51" cy="27" rx="5.5" ry="7.5"/><ellipse cx="23" cy="14" rx="5" ry="6.5"/><ellipse cx="41" cy="14" rx="5" ry="6.5"/>
  </svg>;
}

// Tarjeta visual
function GiftCardVisual({ design, amount, recipient, message, code }) {
  const g = GC_DESIGNS[design] || GC_DESIGNS.sunset;
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: g.grad, borderRadius: 22, padding: '24px 24px 22px', color: '#fff', boxShadow: '0 16px 50px -16px rgba(0,0,0,0.35)', minHeight: 200 }}>
      <PawCorner/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.92 }}>Tarjeta de Regalo</div>
        <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 16 }}>BrightPuppy</div>
      </div>
      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', margin: '14px 0 4px' }}>${amount || 0}</div>
      {recipient ? <div style={{ fontSize: 14, opacity: 0.95 }}>Para: <b>{recipient}</b></div> : null}
      {message ? <div style={{ fontSize: 13, opacity: 0.9, marginTop: 6, fontStyle: 'italic', maxWidth: '85%' }}>“{message}”</div> : null}
      {code ? <div style={{ marginTop: 16, display: 'inline-block', background: 'rgba(255,255,255,0.22)', borderRadius: 10, padding: '8px 14px', fontFamily: 'monospace', fontSize: 18, fontWeight: 800, letterSpacing: '0.08em' }}>{code}</div> : null}
      <div style={{ fontSize: 11, opacity: 0.85, marginTop: code ? 10 : 16 }}>Válida para cachorro · grooming{/* tienda próximamente */}</div>
    </div>
  );
}

function GiftCardApp() {
  const t = (typeof useT === 'function') ? useT() : ((a) => Array.isArray(a) ? a[0] : a);
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session');
  const cancelled = params.get('cancel');

  const [phase, setPhase] = useState(sessionId ? 'finalizing' : (cancelled ? 'cancelled' : 'form'));
  const [card, setCard] = useState(null);
  const [finalErr, setFinalErr] = useState('');

  // Form state
  const [amount, setAmount] = useState(100);
  const [customAmt, setCustomAmt] = useState('');
  const [purpose, setPurpose] = useState('any');
  const [design, setDesign] = useState('sunset');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  // Saldo
  const [lookCode, setLookCode] = useState('');
  const [lookRes, setLookRes] = useState(null);
  const [shareMsg, setShareMsg] = useState('');

  useEffect(() => {
    if (phase !== 'finalizing' || !sessionId) return;
    let tries = 0;
    const run = () => {
      gcApi('finalize', { session: sessionId }).then(d => {
        if (d && d.ok && d.card) { setCard(d.card); setPhase('done'); }
        else if (tries < 4) { tries++; setTimeout(run, 1800); }
        else { setFinalErr((d && d.error) || 'No pudimos confirmar el pago.'); setPhase('error'); }
      }).catch(() => { if (tries < 4) { tries++; setTimeout(run, 1800); } else { setFinalErr('Error de red.'); setPhase('error'); } });
    };
    run();
  }, [phase, sessionId]);

  const realAmount = customAmt ? Math.round(Number(customAmt) || 0) : amount;
  const buy = async () => {
    if (!(realAmount >= 10 && realAmount <= 1000)) { setErr('Elige un monto entre $10 y $1000.'); return; }
    setBusy(true); setErr('');
    const d = await gcApi('create_checkout', { amount: realAmount, purpose, design, recipient_name: recipientName, recipient_email: recipientEmail, purchaser_name: purchaserName, purchaser_email: purchaserEmail, message });
    if (d && d.ok && d.url) { location.href = d.url; return; }
    setBusy(false);
    setErr(d && d.error === 'no_stripe_key' ? 'Pagos aún no configurados. Intenta más tarde.' : 'No se pudo iniciar el pago. Intenta de nuevo.');
  };

  const lookup = async () => {
    const d = await gcApi('lookup', { code: lookCode });
    setLookRes(d && d.ok ? d.card : { invalid: true });
  };

  const wrap = { maxWidth: 720, margin: '0 auto', padding: '40px 20px 80px' };
  const fld = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--paper)', fontSize: 14, fontFamily: 'inherit', color: 'var(--ink)', outline: 'none' };
  const lbl = { fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', margin: '0 0 6px' };

  if (phase === 'finalizing') {
    return <div style={{ ...wrap, textAlign: 'center', paddingTop: 120 }}><div className="bp-spinner" style={{ margin: '0 auto 16px' }}/><p style={{ color: 'var(--ink-2)' }}>Confirmando tu pago…</p></div>;
  }
  if (phase === 'done' && card) {
    const shareText = `Te regalé una tarjeta BrightPuppy de $${card.amount}. Código: ${card.code} — canjéala en bpuppy.us`;
    return (
      <div style={wrap}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>¡Tarjeta lista!</div>
          <p style={{ color: 'var(--ink-2)', margin: '6px 0 0' }}>Comparte el código con quien la recibirá. Es válida para cachorro y grooming.</p>
        </div>
        <div style={{ maxWidth: 420, margin: '0 auto 20px' }}>
          <GiftCardVisual design={card.design} amount={card.amount} recipient={card.recipient_name} message={card.message} code={card.code}/>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href={'https://wa.me/?text=' + encodeURIComponent(shareText)} target="_blank" rel="noopener">Enviar por WhatsApp</a>
          <button className="btn btn-outline" onClick={async () => { try { await navigator.clipboard.writeText(card.code); setShareMsg('Código copiado.'); setTimeout(() => setShareMsg(''), 2500); } catch (e) {} }}>Copiar código</button>
          <a className="btn btn-outline" href="/tarjeta-regalo">Crear otra</a>
        </div>
        {shareMsg ? <div style={{ textAlign: 'center', color: 'var(--ink-2)', fontSize: 13, marginTop: 10 }}>{shareMsg}</div> : null}
      </div>
    );
  }
  if (phase === 'error') {
    return <div style={{ ...wrap, textAlign: 'center', paddingTop: 90 }}>
      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--ink)' }}>No pudimos confirmar el pago</div>
      <p style={{ color: 'var(--ink-2)', margin: '8px 0 18px' }}>{finalErr} Si el cargo se hizo, escríbenos y lo resolvemos al instante.</p>
      <a className="btn btn-primary" href="/tarjeta-regalo">Volver</a>
    </div>;
  }

  return (
    <div style={wrap}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div className="eyebrow" style={{ color: 'var(--orange)' }}>BrightPuppy</div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(30px,5vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', margin: '8px 0 8px' }}>Tarjetas de regalo</h1>
        <p style={{ color: 'var(--ink-2)', maxWidth: '46ch', margin: '0 auto' }}>Regala la alegría de un cachorro o un día de spa. Monto prepago, diseño hermoso, y un código para que la persona lo canjee.</p>
      </div>

      {cancelled ? <div style={{ background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.3)', borderRadius: 12, padding: '10px 14px', fontSize: 13.5, color: 'var(--ink-2)', marginBottom: 18 }}>Pago cancelado. Puedes intentarlo de nuevo cuando quieras.</div> : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
        {/* Vista previa */}
        <GiftCardVisual design={design} amount={realAmount} recipient={recipientName} message={message}/>

        {/* Monto */}
        <div>
          <div style={lbl}>Monto</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[25, 50, 100, 150, 250, 500].map(a => (
              <button key={a} onClick={() => { setAmount(a); setCustomAmt(''); }}
                style={{ padding: '10px 16px', borderRadius: 12, border: `1.5px solid ${(!customAmt && amount === a) ? 'var(--orange)' : 'var(--line)'}`, background: (!customAmt && amount === a) ? 'rgba(245,130,32,0.08)' : 'var(--paper)', color: (!customAmt && amount === a) ? 'var(--orange)' : 'var(--ink-2)', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>${a}</button>
            ))}
            <input type="number" min="10" max="1000" value={customAmt} onChange={e => setCustomAmt(e.target.value)} placeholder="Otro $"
              style={{ width: 100, padding: '10px 12px', borderRadius: 12, border: `1.5px solid ${customAmt ? 'var(--orange)' : 'var(--line)'}`, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}/>
          </div>
        </div>

        {/* Para qué */}
        <div>
          <div style={lbl}>¿Para qué?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['any', 'Cualquiera'], ['puppy', 'Cachorro'], ['grooming', 'Grooming']].map(([v, l]) => (
              <button key={v} onClick={() => setPurpose(v)}
                style={{ padding: '9px 16px', borderRadius: 999, border: `1.5px solid ${purpose === v ? 'var(--orange)' : 'var(--line)'}`, background: purpose === v ? 'rgba(245,130,32,0.08)' : 'var(--paper)', color: purpose === v ? 'var(--orange)' : 'var(--ink-2)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
            ))}
            <button disabled title="Disponible cuando la tienda tenga artículos"
              style={{ padding: '9px 16px', borderRadius: 999, border: '1.5px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-soft)', fontWeight: 700, fontSize: 13, cursor: 'not-allowed', fontFamily: 'inherit', opacity: 0.6 }}>Tienda (próximamente)</button>
          </div>
        </div>

        {/* Diseño */}
        <div>
          <div style={lbl}>Diseño</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.keys(GC_DESIGNS).map(k => (
              <button key={k} onClick={() => setDesign(k)} title={GC_DESIGNS[k].label[0]}
                style={{ width: 46, height: 32, borderRadius: 8, background: GC_DESIGNS[k].grad, border: `3px solid ${design === k ? 'var(--ink)' : 'transparent'}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}/>
            ))}
          </div>
        </div>

        {/* Datos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><div style={lbl}>Nombre de quien recibe</div><input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="María" style={fld}/></div>
          <div><div style={lbl}>Email de quien recibe (opcional)</div><input value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} placeholder="maria@email.com" style={fld}/></div>
          <div><div style={lbl}>Tu nombre</div><input value={purchaserName} onChange={e => setPurchaserName(e.target.value)} placeholder="Luis" style={fld}/></div>
          <div><div style={lbl}>Tu email (recibo)</div><input value={purchaserEmail} onChange={e => setPurchaserEmail(e.target.value)} placeholder="tu@email.com" style={fld}/></div>
        </div>
        <div><div style={lbl}>Mensaje (opcional)</div><input value={message} onChange={e => setMessage(e.target.value)} maxLength={120} placeholder="¡Feliz cumpleaños! Elige tu compañero." style={fld}/></div>

        {err ? <div style={{ color: '#c0392b', fontSize: 13.5 }}>{err}</div> : null}
        <button onClick={buy} disabled={busy} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.7 : 1, fontSize: 15, padding: '14px' }}>
          {busy ? 'Redirigiendo a pago seguro…' : `Comprar tarjeta de $${realAmount} →`}
        </button>
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-soft)' }}>Pago seguro con Stripe · recibirás el código al confirmar.</div>
      </div>

      {/* Consultar saldo */}
      <div style={{ marginTop: 40, padding: '20px', borderRadius: 16, background: 'var(--paper)', border: '1px solid var(--line)' }}>
        <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>¿Tienes una tarjeta? Consulta su saldo</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={lookCode} onChange={e => setLookCode(e.target.value.toUpperCase())} placeholder="BP-XXXX-XXXX" style={{ ...fld, flex: 1 }}/>
          <button onClick={lookup} className="btn btn-outline" style={{ cursor: 'pointer' }}>Consultar</button>
        </div>
        {lookRes ? (lookRes.invalid
          ? <div style={{ marginTop: 10, fontSize: 13.5, color: '#c0392b' }}>Código no válido.</div>
          : <div style={{ marginTop: 10, fontSize: 14, color: 'var(--ink)' }}>Saldo: <b style={{ color: 'var(--orange)' }}>${lookRes.balance}</b> de ${lookRes.amount} · {lookRes.status === 'redeemed' ? 'usada' : 'activa'}</div>) : null}
      </div>
    </div>
  );
}

function GiftCardRoot() {
  const [lang, setLang] = useState(() => (window.bpGetLang && window.bpGetLang()) || 'es');
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => (window.bpOnLang ? window.bpOnLang(setLang) : undefined), []);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Header overDark={false}/>
      <main style={{ paddingTop: 80, background: 'var(--bg,#fff)', minHeight: '100vh' }}><GiftCardApp/></main>
      <Footer/>
    </LangContext.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<GiftCardRoot/>);
