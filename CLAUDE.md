# NALVETH

Plataforma editorial de recursos para negocios y profesionales (IA, herramientas, automatización, marketing, ecommerce, SEO/GEO). Astro + TypeScript, sin CMS externo.

## Memoria operativa — leer esto primero, no la investigación histórica completa
- **`docs/PROJECT-CONTEXT.md`** — objetivo, posicionamiento, arquitectura, estrategia SEO, reglas editoriales, estructura técnica, sistema de diseño. Punto de partida obligatorio de cualquier tarea nueva.
- **`docs/RESEARCH-WHATSAPP-IA.md`** — herramientas investigadas, clústeres SEO, sectores validados, riesgos, para el clúster prioritario activo (WhatsApp + IA).
- **`docs/DECISIONS.md`** — log fechado de decisiones ya tomadas (no se reabren sin instrucción explícita) y decisiones pendientes.
- Solo consultar `/research/` (este proyecto) o el proyecto histórico `google Adsense/` cuando se necesite un detalle que no esté en los tres documentos anteriores.

## Reglas de contenido (no negociables)
No inventar precios, características, estadísticas, comisiones de afiliado, testimonios ni resultados — marcar como no verificado en su lugar. Cada review/comparativa lleva `verifiedDate`; `testedFirsthand: false` hasta que se haya ejecutado el protocolo de prueba real. Detalle completo en `docs/PROJECT-CONTEXT.md` § Reglas editoriales y en `/src/pages/politica-editorial.astro`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
