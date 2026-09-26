// Fragmento de Google Analytics 4 en "modo básico" de consentimiento (Fase 3A, D-027).
// Se renderiza en línea, y SOLO si hay un ID de medición válido (ver src/data/analytics.ts).
//
// Reglas de diseño (no cambiar sin decisión):
//  1. gtag.js NO va en el HTML: se inserta desde JavaScript únicamente cuando la CMP (InMobi,
//     vía la API estándar `__tcfapi`, que este fragmento solo CONSULTA) confirma consentimiento.
//     Sin consentimiento no sale ninguna petición a Google — ni siquiera pings sin cookies.
//  2. Consentimiento exigido: propósitos TCF 1 (almacenar/acceder) y 8 (medir rendimiento del
//     contenido) + proveedor Google (ID 755), salvo que la CMP indique que el RGPD no aplica.
//     Si la CMP no lista a Google como proveedor, no se mide (falla del lado seguro).
//  3. Publicidad siempre denegada (ad_storage, ad_user_data, ad_personalization) y sin Google
//     Signals: esto es solo medición de audiencia. AdSense (Fase 3C) gestionará lo suyo aparte.
//  4. Si el usuario retira el consentimiento después, se desactiva la medición y no se envían
//     más eventos.
//  5. Eventos: solo clics en elementos con `data-track="nombre"`; los parámetros salen de
//     `data-track-*` (p. ej. data-track-tool="Landbot" → parámetro `tool`). No se envían
//     datos personales ni el contenido de ningún formulario.
// Verificado con .claude/scripts/test-analytics-snippet.mjs (simulación de la CMP).
export function analyticsSnippet(measurementId: string): string {
  return `(function(){
var ID=${JSON.stringify(measurementId)},VENDOR=755,PURPOSES=[1,8];
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
var loaded=false,allowed=false;
function ok(tc){
  if(tc.gdprApplies===false)return true;
  var p=(tc.purpose&&tc.purpose.consents)||{},v=(tc.vendor&&tc.vendor.consents)||{};
  for(var i=0;i<PURPOSES.length;i++){if(p[PURPOSES[i]]!==true)return false;}
  return v[VENDOR]===true;
}
function apply(good){
  allowed=good;
  window['ga-disable-'+ID]=!good;
  if(!good){if(loaded)gtag('consent','update',{analytics_storage:'denied'});return;}
  gtag('consent','update',{analytics_storage:'granted'});
  if(loaded)return;
  loaded=true;
  gtag('js',new Date());
  gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ID);
  document.head.appendChild(s);
}
function listen(tries){
  if(typeof window.__tcfapi!=='function'){if(tries<50)setTimeout(function(){listen(tries+1);},200);return;}
  window.__tcfapi('addEventListener',2,function(tc,success){
    if(!success||!tc)return;
    if(tc.eventStatus==='tcloaded'||tc.eventStatus==='useractioncomplete')apply(ok(tc));
  });
}
listen(0);
document.addEventListener('click',function(e){
  if(!allowed||!loaded)return;
  var el=e.target&&e.target.closest?e.target.closest('[data-track]'):null;
  if(!el)return;
  var params={},a=el.attributes;
  for(var i=0;i<a.length;i++){
    var n=a[i].name;
    if(n.indexOf('data-track-')===0)params[n.slice(11).replace(/-/g,'_')]=a[i].value;
  }
  gtag('event',el.getAttribute('data-track'),params);
});
})();`;
}
