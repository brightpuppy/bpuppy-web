/* input-easy.js — Teclados fáciles en los formularios del sitio (móvil):
   teléfono→marcador, correo→@ + sugerencias de dominio (@gmail.com…), montos→numérico, código postal→numérico, nombres→capitalizar.
   Idempotente + MutationObserver (cubre formularios que se cargan/renderizan después). */
(function(){
  if(window.__bpInputEasy) return; window.__bpInputEasy=1;
  var DOMAINS=['gmail.com','hotmail.com','outlook.com','yahoo.com','icloud.com','live.com','aol.com','me.com'];
  var SKIP={checkbox:1,radio:1,file:1,range:1,date:1,'datetime-local':1,time:1,month:1,week:1,color:1,hidden:1,submit:1,button:1,image:1,password:1};
  function labelText(el){
    var t=(el.id||'')+' '+(el.name||'')+' '+(el.placeholder||'')+' '+(el.getAttribute('aria-label')||'');
    try{ if(el.id){ var l=document.querySelector('label[for="'+el.id+'"]'); if(l) t+=' '+l.textContent; } }catch(e){}
    return t.toLowerCase();
  }
  function emailSuggest(input){
    if(input._bpEmail) return; input._bpEmail=true;
    var box=null;
    function close(){ if(box){ box.remove(); box=null; } }
    input.addEventListener('input', function(){
      var v=input.value||''; var at=v.indexOf('@');
      if(at<1 || v.indexOf('@',at+1)>=0){ close(); return; }
      var local=v.slice(0,at); var dom=v.slice(at+1).toLowerCase();
      if(DOMAINS.indexOf(dom)>=0){ close(); return; }
      var matches=DOMAINS.filter(function(d){ return d.indexOf(dom)===0; }).slice(0,5);
      if(!matches.length){ close(); return; }
      if(!box){ box=document.createElement('div'); box.style.cssText='position:absolute;z-index:100050;background:#fff;border:1px solid #d1d5db;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,.14);overflow:hidden;font-size:14px;font-family:inherit'; document.body.appendChild(box); }
      var r=input.getBoundingClientRect();
      box.style.left=(r.left+window.scrollX)+'px'; box.style.top=(r.bottom+window.scrollY+2)+'px'; box.style.minWidth=Math.max(160,r.width)+'px';
      box.innerHTML=matches.map(function(d){ return '<div class="bpem-it" data-d="'+d+'" style="padding:9px 12px;cursor:pointer;white-space:nowrap">'+local.replace(/</g,'&lt;')+'@<b>'+d+'</b></div>'; }).join('');
      Array.prototype.forEach.call(box.querySelectorAll('.bpem-it'), function(it){
        it.onmousedown=function(e){ e.preventDefault(); input.value=local+'@'+it.getAttribute('data-d'); close(); try{ input.dispatchEvent(new Event('input',{bubbles:true})); input.dispatchEvent(new Event('change',{bubbles:true})); }catch(_){} try{ input.focus(); }catch(_){} };
        it.onmouseenter=function(){ it.style.background='#f1f5f9'; }; it.onmouseleave=function(){ it.style.background='#fff'; };
      });
    });
    input.addEventListener('blur', function(){ setTimeout(close,160); });
  }
  function enhance(root){
    var nodes;
    try{ nodes=(root||document).querySelectorAll('input:not([data-bpenh]),textarea:not([data-bpenh])'); }catch(e){ return; }
    Array.prototype.forEach.call(nodes, function(el){
      var ty=(el.getAttribute('type')||'text').toLowerCase();
      if(SKIP[ty]){ el.setAttribute('data-bpenh','1'); return; }
      var t=labelText(el);
      var isEmail=ty==='email'||/e-?mail|correo/.test(t);
      var isPhone=ty==='tel'||/phone|\btel\b|tel[eé]fono|celular|whatsapp|m[oó]vil|\bcel\b/.test(t);
      var isMoney=/precio|\bmonto\b|\bamount\b|\bcost\b|costo|\bbalance\b|dep[oó]sito|deposit|\bfee\b|fees|\btotal\b|\bprice\b|\$/.test(t);
      var isZip=/\bzip\b|c[oó]digo postal|postal code/.test(t);
      var isName=/nombre|apellido|first name|last name|full name/.test(t);
      if(isEmail){ el.setAttribute('inputmode','email'); el.setAttribute('autocapitalize','none'); el.setAttribute('autocorrect','off'); el.setAttribute('spellcheck','false'); if(!el.getAttribute('autocomplete')) el.setAttribute('autocomplete','email'); emailSuggest(el); }
      else if(isPhone){ el.setAttribute('inputmode','tel'); if(!el.getAttribute('autocomplete')) el.setAttribute('autocomplete','tel'); }
      else if(ty==='number'||isMoney){ if(!el.getAttribute('inputmode')) el.setAttribute('inputmode','decimal'); }
      else if(isZip){ if(!el.getAttribute('inputmode')) el.setAttribute('inputmode','numeric'); }
      else if(isName){ if(!el.getAttribute('autocapitalize')) el.setAttribute('autocapitalize','words'); }
      el.setAttribute('data-bpenh','1');
    });
  }
  var pend=null;
  function boot(){
    enhance(document);
    try{
      var mo=new MutationObserver(function(muts){ var need=false; for(var i=0;i<muts.length;i++){ if(muts[i].addedNodes&&muts[i].addedNodes.length){ need=true; break; } } if(need){ if(pend) cancelAnimationFrame(pend); pend=requestAnimationFrame(function(){ enhance(document); }); } });
      mo.observe(document.body,{childList:true,subtree:true});
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.bpEnhanceInputs=enhance;
})();
