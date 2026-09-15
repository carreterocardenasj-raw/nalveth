// Territorios editoriales de NALVETH: los grandes clústeres de contenido (firma electrónica,
// VERI*FACTU, WhatsApp...) que viven fuera del sistema de 8 categorías (ver src/data/categories.ts)
// porque usan URLs planas por diseño (ver docs/VERIFACTU-CLUSTER.md y docs/WHATSAPP-CLUSTER.md).
//
// Esta lista es la única fuente de verdad para que Header, Footer y la home puedan mostrar
// estos territorios sin depender de getVisibleCategories() (que solo conoce las colecciones
// guides/reviews/comparisons). Un territorio nuevo se añade aquí, no creando una categoría nueva.
export interface Territory {
  name: string;
  short: string;
  description: string;
  href: string;
}

export const TERRITORIES: Territory[] = [
  {
    name: 'Firma electrónica y gestión documental',
    short: 'Firma electrónica',
    description: 'Qué necesitas para firmar y gestionar documentos, y qué herramienta elegir.',
    href: '/herramientas/guias/firma-electronica-gestion-documental/',
  },
  {
    name: 'VERI*FACTU y facturación',
    short: 'VERI*FACTU',
    description: 'Qué es, a quién afecta, y qué software de facturación necesitas.',
    href: '/verifactu/',
  },
  {
    name: 'WhatsApp y automatización',
    short: 'WhatsApp',
    description: 'Cómo automatizar atención, ventas y leads por WhatsApp.',
    href: '/whatsapp/',
  },
  // "Gestión comercial" (el 4º territorio) NO se añade aquí: a diferencia de los anteriores,
  // es una categoría real de pleno derecho (src/data/categories.ts, slug `gestionar-clientes`)
  // con su propio pilar servido por el mecanismo `isHub` de [category]/index.astro — por eso
  // ya aparece automáticamente en Header/Footer/Home vía getVisibleCategories(), sin necesitar
  // esta lista. Añadirlo aquí también duplicaría el enlace. Ver docs/DECISIONS.md, 2026-09-15.
];
