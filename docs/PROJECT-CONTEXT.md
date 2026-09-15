# NALVETH — Contexto operativo del proyecto

Este documento es la **memoria operativa principal** del proyecto. Contiene todo lo necesario para seguir trabajando sin releer la investigación histórica completa. El detalle factual de herramientas/keywords vive en `docs/RESEARCH-WHATSAPP-IA.md`; el log de decisiones fechadas vive en `docs/DECISIONS.md`. La investigación original más extensa sigue disponible en `/research/` (este proyecto) y en el proyecto histórico `google Adsense/` — solo consultar si se necesita un detalle que no esté aquí.

## Objetivo de negocio
Plataforma editorial de recursos para negocios y profesionales. Conseguir tráfico orgánico cualificado con contenido útil (no una web cuyo objetivo visible sea mostrar anuncios) y monetizar ese tráfico después.

## Modelo de monetización
1. Google AdSense (no implementado todavía — arquitectura preparada para añadirlo).
2. Afiliación de software/SaaS (activo desde el primer contenido, con enlaces claramente marcados como afiliados).
3. Futuro: herramientas, recursos y productos propios.

## Posicionamiento
- **Marca:** NALVETH · **Dominio:** nalveth.com
- **Propuesta:** "IA, herramientas y estrategias para hacer crecer tu negocio."
- **Hero de home:** "Descubre herramientas e ideas para hacer crecer tu negocio." / "IA, automatización, software y estrategias explicadas de forma clara."
- **Cierre de home:** "No necesitas usar más herramientas. Necesitas usar las correctas."
- La marca **no se limita a IA** — IA es el primer territorio, no el único. Debe poder crecer hacia software, automatización, ecommerce, marketing, SEO, GEO, herramientas, productividad, formación y productos propios sin cambiar de dominio/marca/arquitectura.

## Público
Principalmente autónomos, freelancers, pequeñas empresas, ecommerce y profesionales digitales. **No** se escribe principalmente para desarrolladores expertos — el tono asume usuario de negocio, no técnico.

## Arquitectura (8 categorías de nivel superior)
Definidas en `src/data/categories.ts`. **Regla dura: no se muestra públicamente ninguna categoría sin contenido publicado** — la visibilidad la calcula `src/lib/content.ts` (`getVisibleCategories()`) en tiempo de build, no es una lista manual.

| Slug | Nombre | Subáreas definidas |
|---|---|---|
| `ia-para-negocios` | IA para negocios | agentes-ia, whatsapp-ia, atencion-cliente, ventas-leads, automatizacion-ia |
| `herramientas` | Herramientas | ia, marketing, seo, ecommerce, productividad |
| `automatizacion` | Automatización | — |
| `marketing` | Marketing | — |
| `ecommerce` | Ecommerce | — |
| `seo-geo` | SEO & GEO | — |
| `comparativas` | Comparativas | — |
| `guias` | Guías | — |

**URLs:** `/{categoria}/`, `/{categoria}/guias/{slug}/`, `/{categoria}/reviews/{slug}/`, `/{categoria}/comparativas/{slug}/`. Un solo nivel de categoría, sin sub-rutas por subárea (las subáreas son metadato, no ruta, para no fragmentar la arquitectura).

## Estrategia SEO
Tres intenciones de búsqueda, cada URL con **una** intención principal:
- **Informacional** (`guides`, `intent: informacional`): qué es X, cómo funciona X.
- **Comercial** (`reviews`, y `guides` con `intent: tutorial`/`caso-de-uso`): mejores herramientas de X, review de una herramienta.
- **Comparativa/transaccional** (`comparisons`): X vs Y, alternativas a X.

Regla de canibalización: antes de crear una pieza nueva, comprobar que ninguna URL existente ya cubre esa intención — fusionar en vez de duplicar (ver ejemplos aplicados en `docs/RESEARCH-WHATSAPP-IA.md` § Clústeres).

## Clúster prioritario activo: WhatsApp + IA
Dentro de `ia-para-negocios` / subárea `whatsapp-ia`. Detalle completo (herramientas, keywords, sectores, riesgos) en `docs/RESEARCH-WHATSAPP-IA.md`.

**Próximos clústeres (en este orden, no simultáneos):** 1) IA para ecommerce · 2) IA para marketing/publicidad · 3) SEO + GEO · 4) Automatización para pymes.

## Reglas editoriales (obligatorias, ver también `/src/pages/politica-editorial.astro`)
1. Priorizar la prueba real sobre la recopilación de información ya existente.
2. No inventar precios, características, estadísticas, comisiones de afiliado, testimonios ni resultados — marcar como pendiente/no verificado en su lugar.
3. Fechar todo dato que pueda cambiar (`verifiedDate` en reviews/comparativas).
4. Separar siempre: prueba propia vs. fuente oficial del fabricante vs. fuente externa de terceros.
5. Divulgar los enlaces de afiliado de forma visible (badge "Enlace de afiliado" + disclosure en footer).
6. Nada de contenido de relleno, noticias reempaquetadas sin valor, ni comparativas sin investigación real.
7. Actualizar el contenido comercial cuando cambien precios/funciones/condiciones.

## Estructura técnica
- **Stack:** Astro 7 (TypeScript strict), sin framework de UI adicional (no React/Vue) — interactividad mínima en JS vanilla donde hace falta (nav móvil).
- **Contenido:** `src/content.config.ts` — 3 content collections con loader `glob()`: `guides`, `reviews`, `comparisons` (ver schema completo ahí; campos clave: `category`, `draft`, `publishDate`/`updatedDate`, y en reviews/comparisons `verifiedDate` + `testedFirsthand`).
- **Helper central:** `src/lib/content.ts` — `getPublishedContent()`, `getVisibleCategories()`, `getContentByCategory()`, `entryHref()`. Toda la lógica de "no mostrar categorías vacías" vive aquí, no se duplica en las páginas.
- **Taxonomía:** `src/data/categories.ts` — única fuente de verdad de las 8 categorías y sus subáreas.
- **Territorios editoriales:** `src/data/territories.ts` — fuente de verdad de los clústeres de URL plana (Firma electrónica, VERI\*FACTU, WhatsApp) que quedan fuera del sistema de 8 categorías. Header, Footer y la home los muestran junto a las categorías visibles. **Regla fija: un clúster de este tipo es un territorio editorial, no un sistema de navegación independiente — se añade aquí en el mismo sprint en que se publica**, para no repetir el aislamiento de navegación que sufrieron VERI\*FACTU y WhatsApp hasta la auditoría global del 15/09/2026.
- **Layouts:** `src/layouts/BaseLayout.astro` (shell + SEO + Header/Footer), `GuideLayout.astro`, `ReviewLayout.astro` (con sidebar de precios/pros-contras/afiliado), `ComparisonLayout.astro` (con caja "ganador según contexto").
- **Componentes:** `Header.astro` (nav dinámica por categorías visibles), `Footer.astro`, `Seo.astro` (title/meta/OG/Twitter/JSON-LD), `Breadcrumbs.astro` (con schema BreadcrumbList), `ArticleCard.astro`.
- **Páginas dinámicas:** `src/pages/[category]/index.astro`, `.../guias/[slug].astro`, `.../reviews/[slug].astro`, `.../comparativas/[slug].astro` — todas usan `getStaticPaths` filtrando `draft: false`.
- **SEO técnico:** `astro.config.mjs` con `site: 'https://nalveth.com'`, integración `@astrojs/sitemap`, `trailingSlash: 'always'`. `public/robots.txt` ya apunta al sitemap. Falta por añadir cuando haya contenido real: imágenes optimizadas (usar `astro:assets`), OG image por defecto (`/og-default.png`, todavía no creada).
- **Páginas institucionales:** `/sobre-nalveth`, `/contacto`, `/privacidad`, `/cookies`, `/aviso-legal` (con placeholders `[PLACEHOLDER — ...]` para datos legales reales, no inventados), `/politica-editorial` (contenido real, no placeholder), `/404`.
- **Dev server:** `npm run dev` (Astro 7 lo daemoniza en segundo plano automáticamente — ver `astro dev status` / `astro dev stop`). Config de preview en `.claude/launch.json`.

## Instrucciones de diseño (aplicadas en `src/styles/tokens.css` + `global.css`)
- **Look:** editorial premium + plataforma de herramientas. Explícitamente prohibido: cyberpunk, robots/cerebros, degradados excesivos, estética "SaaS genérico"/"AI everywhere".
- **Tipografía:** `Newsreader` (display/titulares, serif editorial) + `Public Sans` (cuerpo/UI) + `IBM Plex Mono` (precios, datos, fechas).
- **Color:** fondo papel cálido (`--bg #F5F4EF`), tinta casi negra (`--ink`), acento primario verde bosque (`--accent #1F5C4A`), acento secundario oro envejecido (`--gold #B8863A`) para precios/CTAs destacados. Modo oscuro vía `prefers-color-scheme`, tokens ya definidos.
- **Mobile-first**, nav con menú hamburguesa bajo 780px, grids con `auto-fill/minmax` para tarjetas.

## Estado de la construcción (sprint 1: completo — 2026-09-14)
Hecho: proyecto Astro escalado e instalado · sistema de diseño · taxonomía de categorías · content collections (con `heroImage` optimizable vía `image()`, sin usar todavía por falta de capturas reales) · helper de visibilidad + enlazado interno (`getRelatedContent`, `findReviewByToolName`) · Header/Footer/Seo (OG/Twitter gracioso sin imagen inventada)/Breadcrumbs/ArticleCard/RelatedContent · 3 layouts de contenido (Guide/Review/Comparison) con soporte de imagen de cabecera · páginas dinámicas de categoría y detalle · home completa · 6 páginas institucionales + 404 · sitemap/robots.txt verificados en build de producción (13 páginas, 0 errores) · 4 piezas de contenido reales de ejemplo basadas en investigación ya verificada, sin datos inventados · README.md técnico · git inicializado y primer commit hecho · verificado en navegador (home, review, enlazado interno funcionando).

Pendiente (no bloqueante, para cuando haya material real): imagen OG por defecto, integración de analítica real, capturas/heroImage de las piezas ya publicadas.

**Sprint 3 (2026-09-14) — bloqueo de seguridad real, no menor:** no puedo crear cuentas en servicios de terceros (Landbot, Wati) ni siquiera con autorización explícita del usuario — es una regla dura, no una preferencia. El testing real (registro, onboarding, uso del producto) sigue pendiente de que una persona autorizada lo ejecute. Lo que sí hice: navegar directamente las páginas públicas de precios de ambas (no resúmenes de terceros) y actualizar con eso las reviews ya publicadas y `docs/testing/landbot-test-results.md` / `wati-test-results.md`. Aprendizajes importantes:
- **La estructura de precios de Landbot cambió entre el 13/09 y el 14/09** (el plan "WhatsApp Pro de 200€/mes" ya no existe con ese nombre) — confirma que hay que re-verificar en cada actualización de contenido, no dar por buena una cifra antigua sin más.
- **Wati: WhatsApp con número propio empieza en 59-69€/mes (Growth)**, más barato que el punto de entrada real de Landbot para lo mismo (80-100€/mes, plan Professional) — esto invierte la intuición inicial del proyecto de que Landbot sería la opción más económica para empezar.
- Wati Growth tiene un límite duro de 3 usuarios sin opción de ampliar — hay que subir a Pro (+60-80€/mes) para el cuarto usuario.
- Ninguna review pasa a `testedFirsthand: true` todavía — solo se ha verificado información pública, no uso real del producto.

**Sprint 2 (completo — 2026-09-14):** 5 investigaciones paralelas nuevas (automatización, herramientas SaaS, IA ecommerce, IA marketing, SEO/GEO) compiladas en `docs/SEO-CONTENT-MASTERPLAN.md` — 10 clústeres prioritarios (WhatsApp+IA activo + 9 nuevos) con keywords, intención, potencial AdSense/afiliación, cannibalización y enlazado interno recomendado, más lista de los primeros 30 contenidos. Calendario de publicación de 90 días en `docs/CONTENT-ROADMAP-90-DAYS.md` (24 de las 30 piezas caben en el trimestre a ritmo sostenible; 6 quedan en cola). Ninguna pieza nueva se ha escrito ni publicado todavía — son mapas de planificación pendientes de ejecución.

**Sprint 5 (2026-09-14) — primera pieza del plan de priorización publicada, luego corregida de orden:** se ejecutó primero una comparativa de precios de 4 herramientas ("Mejor firma electrónica para pymes en España (2026)", `src/content/comparisons/mejor-firma-electronica-pymes-espana.md`), interpretándola como la pieza #7 de la matriz. El usuario revisó el resultado y aclaró que esa pieza es contenido válido del clúster pero **no** el hub principal previsto como pieza #7/#1 del top 5 — pidió mantenerla publicada tal cual (sin tocar URL ni contenido) y crear además el hub real. Hub publicado en `src/content/guides/firma-electronica-gestion-documental.md` ("Firma electrónica y gestión documental: mejores herramientas para empresas y autónomos", `guides`/`informacional`, categoría `herramientas`): explica diferencia firma electrónica vs. gestión documental, niveles de firma eIDAS (simple/avanzada/cualificada) y cuándo hace falta certificado, qué necesita un autónomo/pyme/empresa con CRM, qué tipo de herramienta elegir, rango de precios fechado sin repetir la tabla completa, checklist de seguridad/eIDAS, e IA documental (solo el dato verificado de Adobe, resto marcado `[POR VERIFICAR]`) — deliberadamente **no** es otra comparativa de herramientas. Enlaza 3 veces en el cuerpo + 1 vez automática en "Sigue leyendo" hacia la comparativa ya publicada. Detalle completo de ambas piezas (incluidos los hallazgos de rebrandings Signaturit→Namirial y YouSign→Youtrust, contradicción de datos en la web de Youtrust, convergencia de precios DocuSign/Youtrust, ausencia de programa de afiliados público en Signaturit/Youtrust) en `docs/DECISIONS.md`, entradas del 2026-09-14. Build de producción verificado (16 páginas, 0 errores) y ambas páginas comprobadas visualmente en navegador. **No se han escrito más piezas del clúster ni las piezas #2-5 del top 5** — el usuario pidió explícitamente detenerse tras el hub y esperar nueva instrucción.

**Sprint 7 (2026-09-15) — tercer clúster: automatización práctica de WhatsApp (5 páginas):** por encargo directo del usuario, con el veredicto explícito de posicionar el territorio como "automatización práctica de WhatsApp" y NO como "agentes IA" ni "WhatsApp + IA" genérico (un documento de investigación externo sobre "agentes IA" para NALVETH, recibido primero, quedó descartado por el propio usuario y solo se conserva como referencia en `docs/RESEARCH-AGENTES-IA.md`, sin ninguna decisión tomada a partir de él). Construidas 5 páginas con URLs planas (`/whatsapp/`, `/whatsapp-business-vs-api/`, `/automatizar-whatsapp/`, `/precio-whatsapp-business-api/`, `/mejor-herramienta-whatsapp-automatizacion/`), mismo patrón de excepción de arquitectura ya usado en VERI*FACTU (content collection `whatsapp` propia + páginas y layout dedicados, sin tocar las 8 categorías). Investigación en fuente primaria: mecánica de precios de WhatsApp Business Platform verificada directamente en la documentación oficial de Meta for Developers (actualizada 10/09/2026, incluye el cambio confirmado para el 1/10/2026 en el que los mensajes de servicio empiezan a cobrarse); LSSI art. 21 para la sección de cumplimiento. 7 herramientas investigadas con precio y afiliación verificados el mismo día (Manychat, Wati, Respond.io, Landbot, HubSpot, n8n, Tidio) — Wati y Landbot reutilizan los datos ya publicados en sus reviews de `ia-para-negocios`, sin duplicar contenido, solo enlazando. Ningún enlace de afiliado activo todavía (mismo límite de "no crear cuentas de terceros" aplicado a los programas de afiliados). Detalle completo en `docs/WHATSAPP-CLUSTER.md`. Build de producción verificado (26 páginas, 0 errores), comprobación visual desktop y mobile. Por instrucción explícita del usuario, no se crean páginas adicionales (comparativas 1 a 1, verticales sectoriales, reviews individuales) — quedan documentadas como fase futura, sin construir. **Auditado el mismo día y corregido**: se añadió Meta Business Agent (producto propio de Meta, cobro por token ya vigente desde 1/08/2026, distinto del cambio de 1/10/2026) a `/precio-whatsapp-business-api/`; se resolvió la canibalización conceptual con la guía ya existente `/ia-para-negocios/guias/que-es-agente-ia-whatsapp/` mediante interlinking (sin tocarla); se corrigió HubSpot de Marketing Hub a Sales Hub en la comparativa de herramientas. Ver `docs/DECISIONS.md` y `docs/WHATSAPP-CLUSTER.md` para el detalle completo.

**Sprint 8 (2026-09-15) — auditoría global + integración de territorios en navegación:** auditoría completa de todo el sitio (arquitectura, interlinking, canibalización, SEO técnico, monetización, legal, rendimiento). Encontró dos errores reales en producción (enlaces rotos `/guias/`/`/comparativas/` en la home; afiliación de Landbot/Wati mal representada — CTA con `rel="sponsored"` apuntando a la página de alta del programa, no a un enlace de referido real) y la falta de integración de VERI\*FACTU/WhatsApp en navegación. Los tres se corrigieron el mismo día: ver la entrada correspondiente en `docs/DECISIONS.md` para el detalle completo (nueva sección "Grandes temas de NALVETH" en home, `src/data/territories.ts`, regla estructural corregida en `ReviewLayout.astro`, interlinking añadido en el contenido legacy de WhatsApp+IA y en firma electrónica). No se tocaron titles, OG, rendimiento, CMP, `updatedDate` ni páginas legales — quedan para una fase posterior.

**Sprint 6 (2026-09-14) — clúster VERI*FACTU (5 páginas), primer contenido fuera del esquema de 8 categorías:** por encargo directo del usuario (brief extenso "EJECUCIÓN CLUSTER VERI*FACTU 2026-2027"), se construyó un mini-cluster de 5 páginas con URLs planas (`/verifactu/`, `/verifactu-autonomos/`, `/software-verifactu/`, `/verifactu-gratis/`, `/verifactu-vs-factura-electronica/`), investigado con fuentes primarias reales (AEAT, BOE) navegadas directamente el 14/09/2026 — no reutilización de blogs/comparadores como autoridad normativa. **Excepción de arquitectura justificada y acotada:** nueva content collection `verifactu` + 5 archivos de página independientes + layout y componente de enlazado propios, sin tocar el sistema de 8 categorías ni el resto de colecciones — detalle completo de por qué y cómo en `docs/VERIFACTU-CLUSTER.md`. Software investigado y verificado con precios reales fechados: aplicación gratuita AEAT, Holded, Billin (rebrandeado a TS Facturas, grupo TeamSystem), Quipu (también TeamSystem), FacturaDirecta (con plan gratuito permanente real) y Declarando. Afiliación verificada una a una: Billin/TS Facturas y Quipu tienen programa activo y apto, pero **no se han añadido enlaces `rel="sponsored"` porque inscribirse exige crear una cuenta** — mismo límite ya documentado para pruebas reales de herramientas (ver entrada Sprint 3 más abajo), aplicado aquí por primera vez a afiliación. Build de producción verificado (21 páginas, 0 errores), comprobación visual desktop+mobile, JSON-LD Article+FAQPage+BreadcrumbList verificado en el pilar. Detalle completo (fuentes citadas, precios, estado de afiliación por herramienta, decisiones de arquitectura, pendientes) en `docs/VERIFACTU-CLUSTER.md`. Por instrucción del usuario, no se ha creado contenido adicional del clúster (`/verifactu-excel/`, comparativas individuales, etc.) — queda explícitamente pendiente de que Search Console u otra señal real demuestre demanda.
