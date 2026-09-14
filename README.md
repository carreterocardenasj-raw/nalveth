# NALVETH

Plataforma editorial de recursos para negocios y profesionales: IA, herramientas, automatización, marketing, ecommerce y SEO/GEO. Contenido probado de primera mano cuando es posible, monetizado con AdSense y afiliación.

**Antes de tocar nada, lee `docs/PROJECT-CONTEXT.md`, `docs/RESEARCH-WHATSAPP-IA.md` y `docs/DECISIONS.md`.** Es la memoria operativa del proyecto — evita releer la investigación histórica completa.

## Stack
Astro 7 + TypeScript, sin framework de UI adicional. Content collections tipadas (`src/content.config.ts`) para guías, reviews y comparativas. Sin CMS externo.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` (Astro 7 lo deja corriendo en segundo plano — `astro dev status` / `astro dev stop`) |
| `npm run build` | Build de producción a `./dist/` |
| `npm run preview` | Sirve el build de producción localmente |

## Estructura
```
NALVETH/
├── docs/                    # memoria operativa — leer primero
├── research/                # investigación detallada (consulta puntual, no de entrada)
├── src/
│   ├── content.config.ts    # schema de las 3 colecciones de contenido
│   ├── content/
│   │   ├── guides/          # informacional, tutoriales, casos de uso
│   │   ├── reviews/         # una herramienta, con precios fechados
│   │   └── comparisons/     # dos o más herramientas, mismos criterios
│   ├── data/categories.ts   # las 8 categorías — única fuente de verdad de la taxonomía
│   ├── lib/content.ts       # helpers: visibilidad por categoría, enlazado interno
│   ├── layouts/             # BaseLayout, GuideLayout, ReviewLayout, ComparisonLayout
│   ├── components/          # Header, Footer, Seo, Breadcrumbs, ArticleCard, RelatedContent
│   ├── pages/                # rutas: home, [category]/, [category]/{guias,reviews,comparativas}/[slug], legales, 404
│   └── styles/               # tokens.css (diseño) + global.css (base)
└── public/                  # robots.txt, favicons
```

## Cómo añadir contenido
1. Crea un `.md`/`.mdx` en `src/content/{guides,reviews,comparisons}/`.
2. Rellena el frontmatter según el schema de `src/content.config.ts` (Astro valida en build — si falta un campo obligatorio, el build falla con el error exacto).
3. `draft: true` hasta que esté listo para publicar — una categoría o pieza en borrador nunca aparece en nav, sitemap ni páginas de listado.
4. En reviews/comparativas, `verifiedDate` y las reglas de "no inventar datos" son obligatorias — ver `docs/PROJECT-CONTEXT.md` § Reglas editoriales.

Una categoría solo se vuelve pública (nav + ruta `/[categoria]/`) cuando tiene al menos una pieza publicada — no hace falta gestionarlo a mano, lo calcula `getVisibleCategories()` en cada build.
