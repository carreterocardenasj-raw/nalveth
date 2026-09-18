# NALVETH — Auditoría SEO técnica e indexación (Fase 2)

**Fecha de auditoría:** 18/09/2026.
**Encargo:** "NALVETH — FASE 2: AUDITORÍA SEO TÉCNICA, INDEXACIÓN Y CALIDAD DE CRAWLING". Objetivo: dejar el sitio técnicamente preparado para rastreo/indexación. Explícitamente NO incluye Search Console, Analytics, AdSense, GTM, píxeles, ni rediseño visual — eso queda para fases posteriores (Fase 3 en adelante), que no empiezan hasta que se indique.

## 0. Estado respetado (sin tocar)

- Dominio canónico: `https://nalveth.com` — confirmado correcto en `astro.config.mjs` desde antes de esta fase.
- Hosting: Netlify. Framework: Astro (output estático, 31 páginas).
- CMP: InMobi Choice (Universal Tag, TCF 2.3, CMP ID 10) ya instalada y probada en producción — **no tocada en ningún momento de esta fase**.

## 1. Estado inicial (auditoría, antes de tocar nada)

- `git status` limpio, rama `master`, último commit `c920275` ("Fase 1D: corregir enlace de privacidad InMobi").
- `site: 'https://nalveth.com'` ya correcto en `astro.config.mjs`; `trailingSlash: 'always'`; `build.format: 'directory'`.
- `src/components/Seo.astro` es el único punto de generación de `<title>`, `<meta description>`, canonical, Open Graph, Twitter card y JSON-LD — usado por `BaseLayout.astro`, que envuelve todas las páginas.
- `src/components/Breadcrumbs.astro` genera el `BreadcrumbList` de cada página con breadcrumbs.
- `public/robots.txt` ya permitía rastreo completo y apuntaba al sitemap correcto.
- Barrido inicial de `dist/` (build limpio antes de cambios): 31 páginas, 0 errores.

**Problemas encontrados** (los únicos reales, tras auditar canonical, titles, descriptions, robots, JSON-LD, OG, Twitter, enlaces internos/externos, imágenes y dominio — ver detalle por sección más abajo):

1. El `BreadcrumbList` (JSON-LD) de todas las páginas con breadcrumbs omitía "Inicio" como posición 1, aunque el `<ol>` visible sí lo mostraba — el schema no coincidía con el rastro visible.
2. Salto de nivel de encabezados (H2 → H4) en las 31 páginas, causado por las etiquetas de columna del footer (`<h4>Explorar</h4>`, etc.), que aparecen después del contenido principal de cada página en el DOM.
3. El mismo tipo de salto en las 2 reviews existentes (Landbot, Wati): 4 títulos de widgets del sidebar (`Precios`, `A favor / en contra`, `Para quién sirve`, `Alternativas`) eran `<h4>` apareciendo justo después del cuerpo del artículo (que termina en H2).
4. El mismo tipo de salto en la comparativa de coste de CRM: la caja "Ganador según el contexto" era un `<h4>` justo después del `<h1>`.
5. Las 2 páginas de categoría sin pilar (`/herramientas/`, `/ia-para-negocios/`) saltaban de H1 directamente a H3 (los títulos de las tarjetas `ArticleCard`), sin ningún H2 de por medio.
6. La home (`/`) no tenía ningún dato estructurado `Organization`/`WebSite` — hueco real, no un error, pero una oportunidad técnica razonable de cerrar.
7. Las fuentes de Google Fonts se cargan vía `@import` en CSS sin `preconnect` — el navegador no puede adelantar esa conexión hasta que descarga y parsea el CSS.

**Lo que la auditoría confirmó que ya estaba correcto** (sin necesidad de tocar nada): dominio canónico, robots.txt, sitemap, todos los canonical (31/31 coinciden exactamente con la URL real de su página), todos los `<title>` (únicos, no vacíos, uno por página), todas las `<meta description>` (presentes, no vacías, no duplicadas), meta robots (solo `noindex` en las 3 páginas legales de trámite, intencionado desde la Fase 1), Open Graph y Twitter cards (presentes y coherentes en las 31 páginas), JSON-LD válido en las 31 páginas, 0 enlaces internos rotos, 0 páginas huérfanas, 0 referencias a `localhost`/`127.0.0.1`/dominios temporales de Netlify/`http://nalveth.com`/`www.nalveth.com` en ningún archivo de `src/` ni en el HTML generado, trailing slash 100% consistente en todos los enlaces internos, 0 imágenes en el sitio (nada que auditar en esa sección), `rel="sponsored"` no aparece en ningún enlace real (solo se cumple en las 2 piezas del clúster de WhatsApp/VERI\*FACTU donde corresponde, ninguno activo indebidamente).

## 2. Correcciones realizadas

| Archivo | Cambio |
|---|---|
| `src/components/Breadcrumbs.astro` | El JSON-LD `BreadcrumbList` ahora antepone `{ name: 'Inicio', href: '/' }` antes de renumerar posiciones, igual que el `<ol>` visible. |
| `src/components/Footer.astro` | Las 3 etiquetas de columna (`Explorar`, `NALVETH`, `Legal`) pasan de `<h4>` a `<p class="col-heading">` — mismo aspecto visual exacto (estilos replicados explícitamente por clase), pero ya no participan en la jerarquía de encabezados de cada página (son navegación auxiliar, no contenido). |
| `src/layouts/ReviewLayout.astro` | Los 4 títulos de widgets del sidebar (`Precios`, `A favor / en contra`, `Para quién sirve`, `Alternativas`) pasan de `<h4>` a `<p class="card-heading">`, mismo motivo y mismo aspecto visual. |
| `src/layouts/ComparisonLayout.astro` | `Ganador según el contexto` pasa de `<h4>` a `<h2 class="winner-label">` — aquí sí correspondía un heading real (es la primera subsección tras el H1), con estilo visual replicado explícitamente para que no cambie nada en pantalla. |
| `src/components/ArticleCard.astro` | Nuevo prop opcional `headingLevel` (`'h2' \| 'h3'`, por defecto `'h3'`); el título de la tarjeta usa una etiqueta dinámica (`<Heading class="title">`) en vez de `<h3>` fijo, con el tamaño fijado por clase, no por tag. |
| `src/pages/[category]/index.astro` | Pasa `headingLevel={hub ? 'h3' : 'h2'}` a `ArticleCard` — en categorías sin pilar (sin H2 antes de la rejilla), las tarjetas ahora son H2 (nivel correcto tras el H1); en categorías con pilar, siguen siendo H3 (ya anidan correctamente bajo los H2 del propio pilar). |
| `src/pages/index.astro` | Añadido JSON-LD `Organization` + `WebSite` en la home, solo con datos reales (`name: 'NALVETH'`, `url: 'https://nalveth.com/'`) — sin logo ni `sameAs` (no existen todavía) ni `potentialAction`/`SearchAction` (el sitio no tiene buscador interno). |
| `src/layouts/BaseLayout.astro` | Añadidos `<link rel="preconnect">` para `fonts.googleapis.com` y `fonts.gstatic.com` — adelanta la conexión sin cambiar ni sustituir las fuentes. |

Ningún cambio anterior modifica: URLs públicas, contenido editorial (texto visible), el Universal Tag de InMobi, `consent.ts`, `nalveth-privacy`, DNS, Netlify, AdSense, Analytics, ni el diseño/colores/tipografía/layout del sitio — verificado visualmente en navegador (ver sección 8).

## 3. SEO técnico — estado tras las correcciones

- **Canonical**: 31/31 páginas con exactamente un `<link rel="canonical">`, todas coincidiendo con `https://nalveth.com` + la ruta real de esa página. Sin `www`, sin `http://`, sin dominios temporales.
- **Title**: 31/31 páginas con exactamente un `<title>`, no vacío, sin duplicados entre páginas.
- **Description**: 31/31 páginas con `<meta name="description">` no vacía, sin duplicados entre páginas.
- **Robots**: `noindex` solo en `/aviso-legal/`, `/privacidad/`, `/cookies/` y `/404` — las 4 intencionadas (decisión de la Fase 1, respetada, no reabierta). Las 27 páginas restantes, indexables sin restricciones.
- **Sitemap**: `sitemap-index.xml` → `sitemap-0.xml`, 27 URLs (30 páginas reales menos las 3 `noindex`, que se excluyen a propósito vía el filtro de `astro.config.mjs` desde la Fase 1), todas con dominio correcto, sin duplicados.
- **Structured data**: 54 bloques JSON-LD en el sitio, 0 inválidos. Tipos presentes: `Organization`, `WebSite` (home, nuevo), `BreadcrumbList` (todas las páginas con breadcrumbs, corregido), `Article`/`Review`/`FAQPage` según el tipo de contenido — ninguno inventado: los `Review` no incluyen `reviewRating`/`aggregateRating` (no hay valoraciones reales que declarar), los `FAQPage` corresponden a preguntas y respuestas realmente visibles en el texto de esas páginas (verificado en `/whatsapp/` y `/verifactu/`).
- **Open Graph / Twitter**: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name` y `twitter:card`/`twitter:title`/`twitter:description` presentes y coherentes en las 31 páginas. Sin `og:image`/`twitter:image` en ninguna — decisión ya documentada (no hay imagen de marca todavía), no se ha inventado una ruta a un archivo inexistente.
- **Internal linking**: 0 enlaces internos rotos, 0 páginas huérfanas (barrido recursivo completo de las 30 páginas). Trailing slash 100% consistente.
- **404**: `dist/404.html` se genera correctamente, `noindex` intencionado, navegación útil (enlace a inicio y a herramientas), mismo branding que el resto del sitio — sin cambios de diseño.
- **Imágenes**: el sitio no tiene ninguna imagen todavía (`0` etiquetas `<img>` en todo `dist/`) — nada que auditar ni que corregir en esta sección; queda anotado como pendiente estructural, no como error.
- **Estructura semántica**: exactamente un H1 por página (31/31) y cero saltos de nivel de encabezado en todo el sitio (31/31), tras las correcciones de la sección 2.

## 4. Indexabilidad

**31 páginas auditadas** (30 rutas de contenido + `/404`). Excepciones intencionadas y ya existentes antes de esta fase, respetadas sin reabrir la decisión: `/aviso-legal/`, `/privacidad/`, `/cookies/` con `noindex` + excluidas del sitemap (páginas de trámite legal, decisión de la Fase 1); `/404` con `noindex` (estándar). Las 27 páginas restantes son indexables y aparecen en el sitemap.

## 5. Producción (comprobado sin modificar nada)

| Comprobación | Resultado |
|---|---|
| `https://nalveth.com/` | `200 OK` |
| `https://www.nalveth.com/` | `301` → `https://nalveth.com/` |
| `http://nalveth.com/` | `301` → `https://nalveth.com/` |
| `https://nalveth.com/robots.txt` | `200 OK`, contenido idéntico al generado localmente |
| `https://nalveth.com/sitemap-index.xml` | `200 OK`, apunta a `sitemap-0.xml` con 27 URLs, dominio correcto |
| Canonical de la home en producción | `https://nalveth.com/` — correcto |
| Dominio temporal de Netlify (`merry-donut-bfa0ef.netlify.app`) | Sigue respondiendo `200`, pero **su propio HTML ya declara `canonical: https://nalveth.com/`** en cada página (el canonical se genera desde `Astro.site`, fijo en build, no desde el dominio de la petición) — mitigación real ya existente, no requiere cambio de Netlify. Anotado como observación para una futura fase, no corregido aquí porque tocar la configuración de Netlify está fuera de alcance de esta fase. |

**Nota importante**: las correcciones de la sección 2 están en el código local (`dist/` regenerado y verificado), pero **no se han desplegado a producción** — el encargo pide explícitamente no desplegar automáticamente. Las comprobaciones de producción de esta tabla reflejan el estado ya publicado (previo a esta fase), que ya era correcto en dominio/robots/sitemap/redirects.

## 6. Build

```
npm run build
31 page(s) built
0 errores
```
Ejecutado y verificado varias veces durante la fase (antes y después de cada corrección) — siempre 31 páginas, 0 errores, mismas URLs.

## 7. Rendimiento técnico básico

- Solo 2 `<script>` por página: el Universal Tag de InMobi (no tocado) y el módulo del menú móvil (`Header.astro`, ya diferido por ser `type="module"`). Sin scripts innecesarios.
- 1 sola hoja de estilos generada (~12 KB) — sin CSS excesivo.
- 0 imágenes — nada que hacer lazy ni que dimensionar.
- Fuentes: `preconnect` añadido a `fonts.googleapis.com`/`fonts.gstatic.com` (sección 2) — Google Fonts en sí no se ha tocado, autoalojarlas sigue pendiente de una decisión aparte (ya documentada en `docs/LEGAL-COMPLIANCE.md`, Fase 1).
- No se ha detectado ningún recurso enlazado que no exista, ni JavaScript muerto para eliminar.

## 8. Comprobación visual (sin rediseño)

Verificado en navegador tras las correcciones, en `localhost` (build de desarrollo): review de Landbot (sidebar "Precios"/"A favor y en contra" idénticos visualmente), categoría `/herramientas/` (tarjetas con el mismo tamaño de título que antes), comparativa de coste de CRM (caja "Ganador según el contexto" idéntica), footer en cualquier página (columnas "Explorar"/"NALVETH"/"Legal" idénticas). Cero diferencias visuales respecto al estado anterior — confirmado que los cambios de la sección 2 son puramente estructurales/semánticos.

## 9. Elementos dejados deliberadamente para Fase 3 (o posteriores) — solo recomendaciones, no ejecutadas

- Crear y conectar Google Search Console (explícitamente fuera de esta fase).
- Decidir si autoalojar Google Fonts (ya documentado como pendiente en `docs/LEGAL-COMPLIANCE.md` desde la Fase 1; esta fase solo añadió `preconnect`, sin tocar el resto).
- Diseñar y añadir una imagen Open Graph por defecto (y por pieza, si se decide) — hoy no existe ninguna imagen en el sitio; esto es una decisión de diseño/contenido, no puramente técnica.
- Añadir breadcrumbs a piezas que todavía no los tienen, si las hubiera (hoy todas las páginas con jerarquía real ya los tienen).
- Revisar si conviene bloquear o redirigir el dominio temporal de Netlify a nivel de Netlify (hoy ya está mitigado vía canonical, pero un bloqueo directo sería más limpio) — fuera de alcance porque implica tocar Netlify.
- Cuando se publique la primera guía con `intent: tutorial`, revisar que el schema `HowTo` que generaría `GuideLayout.astro` incluya los `step` que Google recomienda para ese tipo — hoy esa rama de código existe pero no se usa en ninguna pieza publicada, así que no es un error activo.

**Ninguna de estas recomendaciones se ha ejecutado.**

## 10. Confirmación de lo que NO se ha tocado

InMobi (Universal Tag, `consent.ts`, `nalveth-privacy`, configuración del portal, idioma de la CMP) — DNS — Netlify — Google AdSense — Google Analytics — Google Tag Manager — Search Console — diseño visual (colores, tipografía, layout, animaciones, hero) — contenido editorial (texto visible de artículos, títulos editoriales, descripciones editoriales) — URLs públicas — arquitectura de categorías/territorios — estrategia de afiliación.
