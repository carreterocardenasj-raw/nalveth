// Capa técnica de consentimiento (IAB TCF) — el punto único por el que DEBE
// pasar cualquier script futuro de AdSense, analítica o Tag Manager antes de
// cargar. No implementa ningún banner propio ("banner casero" prohibido por
// encargo) — se apoya en la API estándar `__tcfapi` que expone la CMP ya
// instalada en el sitio: InMobi Choice (Universal Tag, CMP ID 10, ver
// src/lib/inmobi-universal-tag.ts y ../.claude/docs/legal.md).
//
// IMPORTANTE: este archivo es solo una capa de LECTURA/CONSULTA de esa API.
// El propio Universal Tag de InMobi ya crea y gestiona los stubs
// `window.__tcfapi` / `window.__gpp` / `window.__uspapi` — este archivo nunca
// asigna ni sobrescribe ninguno de los tres, solo los consulta. No crear aquí
// una segunda implementación de esos stubs bajo ningún concepto.
//
// Mientras el Universal Tag no haya terminado de cargar (o si por algún
// motivo no llegara a cargar), `window.__tcfapi` no existe todavía y estas
// funciones no invocan nunca el callback — la posición segura por defecto es
// "sin consentimiento", nunca lo contrario.

type TCData = {
  eventStatus?: string;
  purpose?: { consents?: Record<string, boolean> };
};

type TCFCallback = (tcData: TCData, success: boolean) => void;

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: TCFCallback,
      parameter?: unknown,
    ) => void;
  }
}

/**
 * Suscribe `callback` a los cambios de consentimiento TCF. Purpose 1
 * ("Store and/or access information on a device") es el mínimo exigible
 * antes de activar cualquier cookie o script no esencial — es justo lo que
 * hoy NALVETH no necesita porque no tiene ninguna tecnología de este tipo.
 */
export function onConsentChange(callback: (hasConsent: boolean) => void): void {
  if (typeof window === 'undefined' || typeof window.__tcfapi !== 'function') return;
  window.__tcfapi('addEventListener', 2, (tcData, success) => {
    if (!success || !tcData || tcData.eventStatus === 'cmpuishown') return;
    callback(tcData.purpose?.consents?.['1'] === true);
  });
}

/**
 * Punto de enganche único para cargar un script que dependa de consentimiento
 * (AdSense, GA4, Tag Manager...) en cuanto exista. No hace nada mientras no
 * se llame explícitamente desde el código que active esa tecnología — hoy no
 * hay ninguna llamada a esta función en el proyecto, a propósito.
 */
export function loadWhenConsented(loadScript: () => void): void {
  onConsentChange((hasConsent) => {
    if (hasConsent) loadScript();
  });
}
