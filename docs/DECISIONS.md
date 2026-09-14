# Decisiones definitivas — NALVETH

Log cronológico de decisiones ya tomadas. No se reabren sin una instrucción explícita del usuario.

| Fecha | Decisión | Detalle |
|---|---|---|
| 2026-09-13 | Modelo de negocio | Sitio de contenido en español (España) monetizado con AdSense + afiliación SaaS + (futuro) leads y productos propios. |
| 2026-09-13 | Primer nicho investigado | 21 micro-nichos "IA + ecommerce/negocios" puntuados; ver `docs/RESEARCH-WHATSAPP-IA.md` para el resultado que sí se mantiene vigente. |
| 2026-09-13 | Pilar inicial (versión 1, superada) | "Website builders con IA" — investigación conservada en `/research/background/`, no descartada, candidata a la categoría Ecommerce más adelante. |
| 2026-09-13 | Pilar inicial (versión 2, vigente) | **WhatsApp + IA para negocios**, dentro de un proyecto más amplio "IA para vender, atender y automatizar negocios". |
| 2026-09-13/14 | Ronda de naming | 100 nombres generados y filtrados (LIVOR, RAVEL, MIREN investigados a fondo y descartados: conflictos reales de marca/dominio/SEO — ver histórico en `google Adsense/research/`). |
| **2026-09-14** | **Marca definitiva** | **NALVETH**. Decisión del usuario, fuera del proceso de naming anterior. No se reabre. |
| 2026-09-14 | Dominio | nalveth.com |
| 2026-09-14 | Posicionamiento | "IA, herramientas y estrategias para hacer crecer tu negocio." — plataforma editorial amplia, no limitada a IA. Ver `docs/PROJECT-CONTEXT.md`. |
| 2026-09-14 | Arquitectura de categorías | 8 categorías de nivel superior (ia-para-negocios, herramientas, automatizacion, marketing, ecommerce, seo-geo, comparativas, guias). Solo se muestran públicamente las que tienen contenido publicado. |
| 2026-09-14 | Primer clúster de contenido | WhatsApp + IA dentro de "IA para negocios", reutilizando la investigación de herramientas ya hecha. |
| 2026-09-14 | Stack técnico | **Astro** (contenido/SEO-first, rápido, content collections tipadas, buena base para Core Web Vitals). Alternativas no elegidas: Next.js (más pesado para un sitio mayormente estático), WordPress (menos control de componentes/arquitectura a medida que pedía el brief). |
| 2026-09-14 | Gestor de contenido | Astro Content Collections (`src/content.config.ts`), 3 colecciones: `guides`, `reviews`, `comparisons`. Sin CMS externo por ahora. |
| 2026-09-14 | Sistema de diseño | Editorial premium: tipografía Newsreader (display) + Public Sans (cuerpo) + IBM Plex Mono (datos/precios). Paleta verde bosque + oro envejecido sobre papel cálido, sin cyberpunk/gradientes/estética "SaaS genérica". |
| 2026-09-14 | Gestión de contexto del proyecto | A partir de esta fecha, `docs/PROJECT-CONTEXT.md` y `docs/RESEARCH-WHATSAPP-IA.md` son la memoria operativa principal — no se vuelve a cargar la investigación histórica completa salvo que se necesite un detalle no recogido ahí. |

## Decisiones pendientes (no resueltas, no bloquean el avance)
- Datos legales reales del titular (NIF, dirección, correo) — placeholders en `/privacidad`, `/aviso-legal`, `/contacto` hasta que se proporcionen.
- Proveedor de analítica y CMP de cookies concretos (mencionados como placeholder en `/cookies`).
- Cuándo activar cada categoría futura (automatización, marketing, ecommerce, SEO&GEO) — se decide con datos de rendimiento del clúster WhatsApp+IA, no antes.
- Si el pilar archivado "website builders con IA" se retoma dentro de Ecommerce o se descarta definitivamente.
