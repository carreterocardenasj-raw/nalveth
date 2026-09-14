// Taxonomía completa de NALVETH. Todas las categorías existen aquí desde el día 1
// (arquitectura escalable), pero solo se generan rutas/nav para las que tienen
// contenido publicado — ver getVisibleCategories() en src/lib/content.ts.

export interface SubArea {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  short: string; // para nav / tarjetas
  description: string; // para la cabecera de la página de categoría
  subAreas?: SubArea[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'ia-para-negocios',
    name: 'IA para negocios',
    short: 'IA para negocios',
    description:
      'Herramientas y estrategias de inteligencia artificial aplicadas a vender, atender y automatizar tu negocio — probadas de primera mano, no recopiladas.',
    subAreas: [
      { slug: 'agentes-ia', name: 'Agentes IA' },
      { slug: 'whatsapp-ia', name: 'WhatsApp + IA' },
      { slug: 'atencion-cliente', name: 'Atención al cliente' },
      { slug: 'ventas-leads', name: 'Ventas y leads' },
      { slug: 'automatizacion-ia', name: 'Automatización' },
    ],
  },
  {
    slug: 'herramientas',
    name: 'Herramientas',
    short: 'Herramientas',
    description:
      'El catálogo de software que probamos y comparamos: IA, marketing, SEO, ecommerce y productividad para autónomos, freelancers y pequeñas empresas.',
    subAreas: [
      { slug: 'ia', name: 'IA' },
      { slug: 'marketing', name: 'Marketing' },
      { slug: 'seo', name: 'SEO' },
      { slug: 'ecommerce', name: 'Ecommerce' },
      { slug: 'productividad', name: 'Productividad' },
    ],
  },
  {
    slug: 'automatizacion',
    name: 'Automatización',
    short: 'Automatización',
    description: 'Cómo automatizar procesos de negocio sin perder el control ni contratar un equipo técnico.',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    short: 'Marketing',
    description: 'Marketing y publicidad con apoyo de IA para pequeños negocios y ecommerce.',
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    short: 'Ecommerce',
    description: 'Crear, gestionar y hacer crecer una tienda online con las herramientas correctas.',
  },
  {
    slug: 'seo-geo',
    name: 'SEO & GEO',
    short: 'SEO & GEO',
    description: 'Visibilidad en buscadores tradicionales y en asistentes de IA (GEO): qué cambia y cómo adaptarse.',
  },
  {
    slug: 'comparativas',
    name: 'Comparativas',
    short: 'Comparativas',
    description: 'Herramienta contra herramienta, con la misma prueba y los mismos criterios para las dos.',
  },
  {
    slug: 'guias',
    name: 'Guías',
    short: 'Guías',
    description: 'Guías prácticas paso a paso, con capturas y resultados reales.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
