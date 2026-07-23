/* ═══════ Baño EXTRA del mes para miembros ═══════
   El cliente ya usó lo que incluye su plan y quiere otro baño: elige fecha, hora y
   servicios, ve el desglose con el descuento de SU plan y paga. Los precios los
   calcula el servidor (grooming_extra), nunca el navegador. Todo en su idioma. */
(function () {
  var SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var EN = function () { return (((document.documentElement.lang || "es") + "").toLowerCase().indexOf("en") === 0); };
  function T(es, en) { return EN() ? en : es; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function money(n) { return "$" + Number(n || 0).toFixed(2); }
  function pad(n) { return String(n).padStart(2, "0"); }

  var SERVICES = ["Baño completo", "Baño + Corte", "Corte solo", "Spa VIP", "Uñas", "Limpieza de oídos", "Deslanado / Desenredo", "Cepillado de dientes", "Productos piel sensible"];
  var SERVICES_EN = { "Baño completo": "Full bath", "Baño + Corte": "Bath + Haircut", "Corte solo": "Haircut only", "Spa VIP": "VIP Spa", "Uñas": "Nails", "Limpieza de oídos": "Ear cleaning", "Deslanado / Desenredo": "De-shedding / De-matting", "Cepillado de dientes": "Teeth brushing", "Productos piel sensible": "Sensitive-skin products" };
  var BASE = ["Baño completo", "Baño + Corte", "Corte solo", "Spa VIP"]; // excluyentes entre sí

  if (!document.getElementById("xb-css")) {
    var st = document.createElement("style"); st.id = "xb-css";
    st.textContent =
      "@keyframes xbIn{from{opacity:0;transform:scale(.88) translateY(20px)}to{opacity:1;transform:none}}" +
      "@keyframes xbOut{from{opacity:1;transform:none}to{opacity:0;transform:scale(.92) translateY(12px)}}" +
      "@keyframes xbFade{from{opacity:0}to{opacity:1}}" +
      ".xb-ov{position:fixed;inset:0;z-index:100080;background:rgba(30,20,12,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding:24px 14px;overflow:auto;animation:xbFade .16s ease both;font-family:'Plus Jakarta Sans',system-ui,sans-serif}" +
      ".xb-ov.out{animation:xbFade .14s ease reverse both}" +
      ".xb-card{background:#fff;border-radius:22px;max-width:520px;width:100%;padding:22px;box-shadow:0 30px 70px -18px rgba(45,36,33,.5);animation:xbIn .26s cubic-bezier(.34,1.56,.64,1) both;color:#2D2421}" +
      ".xb-ov.out .xb-card{animation:xbOut .14s ease both}" +
      ".xb-h{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px}" +
      ".xb-h b{font-family:'Bricolage Grotesque',sans-serif;font-size:20px}" +
      ".xb-x{border:none;background:#F7F1E6;width:34px;height:34px;border-radius:50%;font-size:17px;cursor:pointer;color:#6f6055;transition:transform .12s}" +
      ".xb-x:hover{transform:rotate(90deg);background:#fde2e2;color:#b91c1c}" +
      ".xb-lb{display:block;font-size:11px;font-weight:800;color:#9a8c7e;text-transform:uppercase;letter-spacing:.4px;margin:12px 0 5px}" +
      ".xb-in{width:100%;padding:11px 13px;border:1.5px solid #e4d7bf;border-radius:12px;font-size:15px;font-family:inherit;box-sizing:border-box;background:#fff;color:#2D2421}" +
      ".xb-in:focus{outline:none;border-color:#F58220}" +
      ".xb-g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      ".xb-sv{display:inline-block;padding:9px 13px;border-radius:12px;border:1.5px solid #e4d7bf;font-size:13px;font-weight:700;cursor:pointer;user-select:none;transition:transform .1s,background .1s;margin:0 6px 6px 0}" +
      ".xb-sv:hover{transform:translateY(-1px)}" +
      ".xb-sv.on{background:#F58220;color:#fff;border-color:#F58220}" +
      ".xb-cta{width:100%;padding:15px;border:none;border-radius:15px;background:linear-gradient(135deg,#F55820,#E83860);color:#fff;font-family:inherit;font-size:15.5px;font-weight:800;cursor:pointer;box-shadow:0 10px 24px -10px rgba(245,88,32,.75);transition:transform .12s}" +
      ".xb-cta:hover{transform:translateY(-2px)}.xb-cta:disabled{opacity:.5;cursor:not-allowed;transform:none}" +
      ".xb-row{display:flex;justify-content:space-between;font-size:13.5px;padding:4px 0}" +
      "@media(max-width:560px){.xb-g2{grid-template-columns:1fr}.xb-card{padding:17px;border-radius:18px}}";
    document.head.appendChild(st);
  }

  function openOv(html) {
    var ov = document.createElement("div"); ov.className = "xb-ov";
    ov.innerHTML = '<div class="xb-card">' + html + "</div>";
    document.body.appendChild(ov);
    ov.close = function () { ov.classList.add("out"); setTimeout(function () { try { ov.remove(); } catch (e) {} }, 150); };
    ov.addEventListener("click", function (e) { if (e.target === ov || (e.target.getAttribute && e.target.getAttribute("data-x"))) ov.close(); });
    return ov;
  }

  var S = null; // estado del pop-up

  window.bpExtraBath = function (membership, me) {
    membership = membership || {};
    S = {
      plan: membership.plan || "",
      size: membership.pet_size || "m",
      pet: membership.pet_name || (me && me.pets && me.pets[0] && me.pets[0].name) || "",
      email: (me && me.email) || membership.client_email || "",
      name: (me && me.name) || membership.client_name || "",
      phone: (me && me.phone) || "",
      svcs: [],
      times: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
      lead: 24, taken: [], quote: null
    };
    var min = new Date(Date.now() + 24 * 3600 * 1000);
    var minStr = min.getFullYear() + "-" + pad(min.getMonth() + 1) + "-" + pad(min.getDate());
    var ov = openOv(
      '<div class="xb-h"><b>' + T("Otro baño este mes", "Another bath this month") + '</b><button class="xb-x" data-x="1">✕</button></div>' +
      '<div style="font-size:13.5px;color:#6f6055;line-height:1.6;margin-bottom:6px">' +
        T("Tu plan ya trae lo suyo — este es un servicio extra. Te aplicamos el descuento de tu plan automáticamente.",
          "Your plan already covers its own — this is an extra service. Your plan discount is applied automatically.") + "</div>" +
      '<span class="xb-lb">' + T("Mascota", "Pet") + "</span>" +
      '<input class="xb-in" id="xb-pet" value="' + esc(S.pet) + '" placeholder="' + T("Nombre de tu mascota", "Your pet's name") + '">' +
      '<div class="xb-g2">' +
        '<div><span class="xb-lb">' + T("Fecha", "Date") + '</span><input class="xb-in" id="xb-date" type="date" min="' + minStr + '"></div>' +
        '<div><span class="xb-lb">' + T("Hora", "Time") + '</span><select class="xb-in" id="xb-time"></select></div>' +
      "</div>" +
      '<div id="xb-daymsg" style="font-size:12px;color:#C2521E;margin-top:6px"></div>' +
      '<span class="xb-lb">' + T("Servicios", "Services") + "</span>" +
      '<div id="xb-svcs">' + SERVICES.map(function (s) {
        return '<span class="xb-sv" data-n="' + esc(s) + '">' + esc(EN() ? (SERVICES_EN[s] || s) : s) + "</span>";
      }).join("") + "</div>" +
      '<div id="xb-quote" style="background:#F7F1E6;border-radius:14px;padding:13px 15px;margin-top:14px;font-size:13.5px;color:#6f6055">' +
        T("Elige los servicios para ver tu total.", "Pick your services to see the total.") + "</div>" +
      '<button class="xb-cta" id="xb-go" style="margin-top:14px" disabled>' + T("Pagar y agendar", "Pay and book") + "</button>" +
      '<div style="font-size:11.5px;color:#9a8c7e;text-align:center;margin-top:9px">' +
        T("Pago seguro con Stripe. Debe reservarse con al menos 24 horas de antelación.",
          "Secure payment with Stripe. Must be booked at least 24 hours in advance.") + "</div>"
    );
    S.ov = ov;

    var dEl = ov.querySelector("#xb-date");
    dEl.value = minStr;
    dEl.addEventListener("change", loadDay);
    ov.querySelector("#xb-svcs").addEventListener("click", function (e) {
      var el = e.target.closest(".xb-sv"); if (!el) return;
      var n = el.getAttribute("data-n");
      if (BASE.indexOf(n) >= 0) {
        // los servicios base son excluyentes entre sí
        ov.querySelectorAll(".xb-sv").forEach(function (x) { if (BASE.indexOf(x.getAttribute("data-n")) >= 0 && x !== el) x.classList.remove("on"); });
      }
      el.classList.toggle("on");
      S.svcs = []; ov.querySelectorAll(".xb-sv.on").forEach(function (x) { S.svcs.push(x.getAttribute("data-n")); });
      quote();
    });
    ov.querySelector("#xb-go").addEventListener("click", checkout);
    loadDay();
  };

  function loadDay() {
    var ov = S.ov, d = ov.querySelector("#xb-date").value;
    var sel = ov.querySelector("#xb-time"), msg = ov.querySelector("#xb-daymsg");
    sel.innerHTML = '<option>' + T("Cargando…", "Loading…") + "</option>";
    fetch(SUPA + "/functions/v1/grooming_slots", { method: "POST", headers: { "Content-Type": "application/json", apikey: ANON }, body: JSON.stringify({ date: d }) })
      .then(function (r) { return r.json(); })
      .then(function (x) {
        S.times = (x && x.times) || S.times;
        S.taken = (x && x.taken) || [];
        var free = S.times.filter(function (t2) { return S.taken.indexOf(t2) < 0; });
        if (x && x.closed) { msg.textContent = T("Ese día está cerrado. Elige otro.", "We're closed that day. Pick another one."); sel.innerHTML = ""; return; }
        if (!free.length) { msg.textContent = T("Ese día ya está lleno. Elige otro.", "That day is full. Pick another one."); sel.innerHTML = ""; return; }
        msg.textContent = "";
        sel.innerHTML = free.map(function (t2) { return "<option>" + t2 + "</option>"; }).join("");
      })
      .catch(function () { sel.innerHTML = S.times.map(function (t2) { return "<option>" + t2 + "</option>"; }).join(""); });
  }

  function quote() {
    var box = S.ov.querySelector("#xb-quote"), go = S.ov.querySelector("#xb-go");
    if (!S.svcs.length) {
      box.innerHTML = T("Elige los servicios para ver tu total.", "Pick your services to see the total.");
      go.disabled = true; S.quote = null; return;
    }
    box.innerHTML = T("Calculando…", "Calculating…");
    fetch(SUPA + "/functions/v1/grooming_extra", { method: "POST", headers: { "Content-Type": "application/json", apikey: ANON }, body: JSON.stringify({ action: "quote", plan: S.plan, size: S.size, services: S.svcs }) })
      .then(function (r) { return r.json(); })
      .then(function (x) {
        if (!x || !x.quote) { box.innerHTML = T("No pudimos calcular el precio.", "We could not calculate the price."); return; }
        var q = x.quote; S.quote = q;
        var rows = q.items.map(function (it) {
          return '<div class="xb-row"><span>' + esc(EN() ? (SERVICES_EN[it.name] || it.name) : it.name) + "</span><span>" + money(it.price) + "</span></div>";
        }).join("");
        box.innerHTML = rows +
          '<div class="xb-row" style="border-top:1px solid #e4d7bf;margin-top:6px;padding-top:8px"><span>' + T("Subtotal", "Subtotal") + "</span><span>" + money(q.subtotal) + "</span></div>" +
          (q.discount > 0 ? '<div class="xb-row" style="color:#16a34a;font-weight:700"><span>' + T("Descuento de tu plan", "Your plan discount") + " (" + Math.round(q.pct * 100) + "%)</span><span>−" + money(q.discount) + "</span></div>" : "") +
          (q.tax > 0 ? '<div class="xb-row"><span>' + T("Impuesto FL", "FL sales tax") + " (" + q.tax_pct + "%)</span><span>" + money(q.tax) + "</span></div>" : "") +
          '<div class="xb-row" style="border-top:2px solid #2D2421;margin-top:7px;padding-top:9px;font-size:17px;font-weight:800;color:#2D2421"><span>' + T("Total hoy", "Total today") + "</span><span style=\"color:#C2521E\">" + money(q.total) + "</span></div>";
        go.disabled = false;
        go.textContent = T("Pagar ", "Pay ") + money(q.total) + T(" y agendar", " and book");
      })
      .catch(function () { box.innerHTML = T("No pudimos calcular el precio.", "We could not calculate the price."); });
  }

  function checkout() {
    var ov = S.ov, go = ov.querySelector("#xb-go");
    var pet = (ov.querySelector("#xb-pet").value || "").trim();
    var date = ov.querySelector("#xb-date").value;
    var time = (ov.querySelector("#xb-time").value || "").trim();
    if (!pet) { alert(T("Escribe el nombre de tu mascota.", "Enter your pet's name.")); return; }
    if (!date || !time) { alert(T("Elige la fecha y la hora.", "Pick the date and time.")); return; }
    if (!S.email) { alert(T("No encontramos tu correo. Entra a tu cuenta e inténtalo de nuevo.", "We couldn't find your email. Sign in and try again.")); return; }
    go.disabled = true; go.textContent = T("Abriendo el pago…", "Opening payment…");
    fetch(SUPA + "/functions/v1/grooming_extra", {
      method: "POST", headers: { "Content-Type": "application/json", apikey: ANON },
      body: JSON.stringify({
        action: "checkout", plan: S.plan, size: S.size, services: S.svcs,
        client_email: S.email, client_name: S.name, phone: S.phone,
        pet_name: pet, date: date, time: time, lang: EN() ? "en" : "es"
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (x) {
        if (x && x.url) { window.location.href = x.url; return; }
        go.disabled = false; go.textContent = T("Pagar y agendar", "Pay and book");
        alert((x && x.error) || T("No se pudo iniciar el pago.", "We could not start the payment."));
      })
      .catch(function () { go.disabled = false; go.textContent = T("Pagar y agendar", "Pay and book"); alert(T("Error de red.", "Network error.")); });
  }

  /* Al volver de Stripe: ?extra=<session_id> -> confirmar y celebrar */
  (function () {
    var sid = new URLSearchParams(location.search).get("extra");
    if (!sid) return;
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {}
    var ov = openOv('<div style="text-align:center;padding:14px 6px"><div style="font-size:44px">🛁</div><div style="font-family:\'Bricolage Grotesque\',sans-serif;font-size:19px;font-weight:800;margin-top:8px">' + T("Confirmando tu pago…", "Confirming your payment…") + "</div></div>");
    fetch(SUPA + "/functions/v1/grooming_extra", { method: "POST", headers: { "Content-Type": "application/json", apikey: ANON }, body: JSON.stringify({ action: "confirm", session_id: sid }) })
      .then(function (r) { return r.json(); })
      .then(function (x) {
        var card = ov.querySelector(".xb-card");
        if (x && x.ok) {
          card.innerHTML =
            '<div style="text-align:center;padding:10px 6px"><div style="font-size:52px">🎉</div>' +
            '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-size:22px;font-weight:800;margin:10px 0 6px">' + T("¡Listo! Baño extra agendado", "All set! Extra bath booked") + "</div>" +
            '<div style="font-size:14px;color:#6f6055;line-height:1.6">' + T("Te enviamos el recibo detallado por correo. Nos vemos pronto 🐾", "We emailed you the detailed receipt. See you soon 🐾") + "</div>" +
            '<a href="/portal" style="display:inline-block;margin-top:16px;padding:13px 24px;border-radius:14px;background:linear-gradient(135deg,#F55820,#E83860);color:#fff;text-decoration:none;font-weight:800;font-size:14.5px">' + T("Ver mi perfil", "See my profile") + "</a>" +
            '<div><button class="xb-x" data-x="1" style="width:auto;border-radius:12px;padding:8px 16px;margin-top:12px;font-size:13px">' + T("Cerrar", "Close") + "</button></div></div>";
        } else {
          card.innerHTML = '<div style="text-align:center;padding:12px 6px"><div style="font-size:40px">⏳</div><div style="font-size:15px;margin-top:10px;line-height:1.6">' +
            T("Tu pago sigue procesándose. En cuanto entre te llega el recibo por correo.", "Your payment is still processing. You'll get the receipt by email as soon as it clears.") +
            '</div><button class="xb-x" data-x="1" style="width:auto;border-radius:12px;padding:8px 16px;margin-top:14px;font-size:13px">' + T("Cerrar", "Close") + "</button></div>";
        }
      })
      .catch(function () { ov.close(); });
  })();
})();
