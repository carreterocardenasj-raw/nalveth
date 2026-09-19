# NALVETH

Plataforma editorial de recursos para negocios y profesionales: IA, herramientas, automatización, marketing, ecommerce y SEO/GEO. Contenido probado de primera mano cuando es posible, monetizado con AdSense y afiliación.

**Este repo es solo el código de la web.** La memoria operativa del proyecto (contexto, decisiones, investigación) vive fuera de él, en `../.claude/docs/` — empieza por `../.claude/CLAUDE.md` y `../.claude/docs/INDEX.md`.

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
web/                         # (la memoria operativa vive fuera: ../.claude/docs/)
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
4. En reviews/comparativas, `verifiedDate` y las reglas de "no inventar datos" son obligatorias — ver `../.claude/docs/product.md` § Reglas editoriales.

Una categoría solo se vuelve pública (nav + ruta `/[categoria]/`) cuando tiene al menos una pieza publicada — no hace falta gestionarlo a mano, lo calcula `getVisibleCategories()` en cada build.
