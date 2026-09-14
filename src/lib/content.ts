import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type Category } from '../data/categories';

export type AnyEntry =
  | ({ kind: 'guide' } & CollectionEntry<'guides'>)
  | ({ kind: 'review' } & CollectionEntry<'reviews'>)
  | ({ kind: 'comparison' } & CollectionEntry<'comparisons'>);

/** Todo el contenido publicado (sin borradores), de las 3 colecciones, unificado. */
export async function getPublishedContent(): Promise<AnyEntry[]> {
  const [guides, reviews, comparisons] = await Promise.all([
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('reviews', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
  ]);

  const all: AnyEntry[] = [
    ...guides.map((e) => ({ kind: 'guide' as const, ...e })),
    ...reviews.map((e) => ({ kind: 'review' as const, ...e })),
    ...comparisons.map((e) => ({ kind: 'comparison' as const, ...e })),
  ];

  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/**
 * Solo las categorías que tienen al menos una pieza publicada.
 * Esto es lo que decide qué aparece en la navegación y qué rutas de
 * categoría se generan — una categoría vacía nunca es pública.
 */
export async function getVisibleCategories(): Promise<Category[]> {
  const all = await getPublishedContent();
  const populated = new Set(all.map((e) => e.data.category));
  return CATEGORIES.filter((c) => populated.has(c.slug as any));
}

export async function getContentByCategory(categorySlug: string): Promise<AnyEntry[]> {
  const all = await getPublishedContent();
  return all.filter((e) => e.data.category === categorySlug);
}

export function entryHref(entry: AnyEntry): string {
  const plural = entry.kind === 'guide' ? 'guias' : entry.kind === 'review' ? 'reviews' : 'comparativas';
  return `/${entry.data.category}/${plural}/${entry.id}/`;
}

export function kindLabel(kind: AnyEntry['kind']): string {
  return { guide: 'Guía', review: 'Review', comparison: 'Comparativa' }[kind];
}

/**
 * Sistema de enlazado interno: piezas relacionadas de la misma subárea
 * (preferente) o, si no hay suficientes, de la misma categoría — nunca la
 * propia pieza. Usado al final de cada review/comparativa/guía.
 */
export async function getRelatedContent(
  current: { id: string; kind: AnyEntry['kind']; data: { category: string; subArea?: string } },
  limit = 3,
): Promise<AnyEntry[]> {
  const all = await getPublishedContent();
  const others = all.filter((e) => !(e.kind === current.kind && e.id === current.id));

  const sameSubArea = current.data.subArea
    ? others.filter((e) => e.data.subArea === current.data.subArea)
    : [];
  const sameCategory = others.filter((e) => e.data.category === current.data.category);

  const merged = [...sameSubArea, ...sameCategory.filter((e) => !sameSubArea.includes(e))];
  return merged.slice(0, limit);
}

/** Busca una review publicada por nombre de herramienta (para enlazar "alternativas" de verdad). */
export async function findReviewByToolName(toolName: string): Promise<AnyEntry | undefined> {
  const all = await getPublishedContent();
  return all.find((e) => e.kind === 'review' && e.data.toolName.toLowerCase() === toolName.toLowerCase());
}
