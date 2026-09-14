import { defineCollection, z } from 'astro:content';
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
]);

const base = {
  title: z.string(),
  description: z.string().max(160),
  category: categorySlug,
  subArea: z.string().optional(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Equipo NALVETH'),
  draft: z.boolean().default(true),
  heroImage: z.string().optional(),
};

// Guías: informacionales, tutoriales y casos de uso.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    ...base,
    intent: z.enum(['informacional', 'tutorial', 'caso-de-uso']),
    steps: z.number().optional(), // nº de pasos, solo para tutoriales
  }),
});

// Reviews: una herramienta, probada, con precios fechados.
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    ...base,
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
  schema: z.object({
    ...base,
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

export const collections = { guides, reviews, comparisons };
