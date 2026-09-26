// Medición (Fase 3A, D-027) — identificadores PÚBLICOS. Ninguno es un secreto: los dos acaban
// visibles en el HTML/JS del sitio. Mientras estén vacíos, NALVETH no emite NADA de medición
// (ni etiqueta de verificación, ni script de analítica): comportamiento actual, sin cambios.
//
// Cómo activar (lo hace quien tenga los identificadores, ver ../../.claude/docs/legal.md § Medición):
//  - GA4_MEASUREMENT_ID: Google Analytics → Administrar → Flujos de datos → ID de medición ("G-...").
//  - GSC_VERIFICATION_TOKEN: Search Console → Verificación por etiqueta HTML → solo el valor de
//    `content="..."` de la etiqueta google-site-verification. (No hace falta si se verifica el
//    dominio por DNS.)
// Alternativa sin editar código: variables de entorno de build PUBLIC_GA4_ID / PUBLIC_GSC_TOKEN.
export const GA4_MEASUREMENT_ID = 'G-BWYYRK13HS';
export const GSC_VERIFICATION_TOKEN = '';

const ga = String(import.meta.env.PUBLIC_GA4_ID || GA4_MEASUREMENT_ID).trim();
const gsc = String(import.meta.env.PUBLIC_GSC_TOKEN || GSC_VERIFICATION_TOKEN).trim();

// Se validan para que un valor mal pegado deje la medición inerte en vez de romper páginas.
export const GA4_ID = /^G-[A-Z0-9]{6,14}$/.test(ga) ? ga : '';
export const GSC_TOKEN = /^[A-Za-z0-9_-]{20,100}$/.test(gsc) ? gsc : '';
