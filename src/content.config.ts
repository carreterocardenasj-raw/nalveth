import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const categorySlug = z.enum([
  'ia-para-negocios',
  'herramientas',
  'automatizacion',
  'marketing',
  'ecommerce',
  'seo-geo',
  'comparativas',
  'guias',
  'gestionar-clientes',
]);

// heroImage usa el helper image() de Astro: valida que el archivo exista localmente
// (en src/content/<coleccion>/) y devuelve metadata optimizable con <Image> — WebP/AVIF
// y lazy loading automáticos. Ninguna pieza tiene todavía heroImage porque no hay capturas
// reales que usar (nada de imágenes de relleno) — el campo queda listo para cuando las haya.
const baseFields = (image: SchemaContext['image']) => ({
  title: z.string(),
  description: z.string().max(160),
  category: categorySlug,
  subArea: z.string().optional(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Equipo NALVETH'),
  draft: z.boolean().default(true),
  heroImage: image().optional(),
  heroImageAlt: z.string().optional(),
});

// Guías: informacionales, tutoriales y casos de uso.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: ({ image }) => z.object({
    ...baseFields(image),
    intent: z.enum(['informacional', 'tutorial', 'caso-de-uso']),
    steps: z.number().optional(), // nº de pasos, solo para tutoriales
    // Marca esta guía como el pilar/hub de su categoría: en vez de generar su propia
    // página en /{categoria}/guias/{slug}/, su contenido se renderiza directamente en
    // /{categoria}/ (la página de categoría), por encima del listado de piezas — y esa
    // pieza queda excluida del listado. Como mucho una guía con isHub:true por categoría.
    isHub: z.boolean().default(false),
  }),
});

// Reviews: una herramienta, probada, con precios fechados.
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: ({ image }) => z.object({
    ...baseFields(image),
    toolName: z.string(),
    toolUrl: z.string().url(),
    verifiedDate: z.coerce.date(), // fecha de comprobación de precios/funciones
    testedFirsthand: z.boolean().default(false), // ¿prueba real propia o solo fuentes verificadas?
    pricing: z
      .array(
        z.object({
          plan: z.string(),
          price: z.string(), // texto libre: "69€/mes", "Desde 40$/mes", etc.
          note: z.string().optional(),
        }),
      )
      .default([]),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    bestFor: z.string().optional(),
    alternatives: z.array(z.string()).default([]),
    affiliateUrl: z.string().url().optional(),
    affiliateVerified: z.boolean().default(false),
    sourceNote: z.string().optional(), // de dónde viene el dato si no es prueba propia
  }),
});

// Comparativas: dos o más herramientas, mismos criterios.
const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: ({ image }) => z.object({
    ...baseFields(image),
    toolsCompared: z.array(z.string()).min(2),
    verifiedDate: z.coerce.date(),
    winnerByContext: z
      .array(
        z.object({
          context: z.string(),
          winner: z.string(),
        }),
      )
      .default([]),
  }),
});

// Clúster VERI*FACTU: mini-cluster de 5 páginas con URLs planas fuera del esquema de
// categorías (/verifactu/, /verifactu-autonomos/...), por diseño explícito (estrategia de
// páginas pilar). No usa las rutas dinámicas [category]/... — cada página tiene su propio
// archivo en src/pages/. Ver docs/VERIFACTU-CLUSTER.md.
const verifactu = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/verifactu' }),
  schema: () => z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    updatedLabel: z.string(), // texto visible tipo "Actualizado: septiembre de 2026"
    author: z.string().default('Equipo NALVETH'),
    draft: z.boolean().default(true),
    pageType: z.enum(['pilar', 'decision', 'comercial', 'gratis', 'comparativa-normativa']),
    keyword: z.string(), // keyword principal SEO de la página
  }),
});

// Clúster de automatización práctica de WhatsApp: mismo patrón que `verifactu` (mini-cluster
// de 5 páginas con URLs planas, fuera del esquema de categorías). Ver docs/WHATSAPP-CLUSTER.md.
const whatsapp = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/whatsapp' }),
  schema: () => z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    updatedLabel: z.string(),
    author: z.string().default('Equipo NALVETH'),
    draft: z.boolean().default(true),
    pageType: z.enum(['pilar', 'decision', 'guia', 'coste', 'comercial']),
    keyword: z.string(),
  }),
});

export const collections = { guides, reviews, comparisons, verifactu, whatsapp };
