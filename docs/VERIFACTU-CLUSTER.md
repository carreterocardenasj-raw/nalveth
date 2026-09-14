# NALVETH — Clúster VERI*FACTU (2026-2027)

Mini-cluster de 5 páginas sobre VERI*FACTU y software de facturación para autónomos/pymes en España. Construido el 14/09/2026 a partir de investigación propia (fuentes primarias AEAT/BOE) verificada en esta sesión — no se reutiliza contenido de terceros como fuente de autoridad normativa.

## 1. Estrategia

Objetivo: tráfico orgánico + autoridad temática + captura de intención informacional y comercial + monetización (afiliación software de facturación + AdSense), preparando NALVETH para el pico de demanda de 2026-2027 sin competir con AEAT en explicar la norma — AEAT es la fuente, NALVETH aporta la traducción práctica y la decisión de compra.

Principio editorial: cada página lleva al lector de "qué es" → "qué tengo que hacer yo" → "qué solución me conviene". Ninguna página es una reformulación de la web de la AEAT.

## 2. Arquitectura técnica (excepción justificada)

El sitio usa un esquema de 8 categorías fijas con URLs `/{categoria}/{tipo}/{slug}/` (ver `docs/PROJECT-CONTEXT.md`). Ese esquema no admite URLs planas tipo `/verifactu/`. Por instrucción explícita del usuario (estrategia de páginas pilar SEO), este clúster se implementa como una **excepción aislada y acotada**, no como una reforma de la arquitectura:

- Nueva content collection `verifactu` en `src/content.config.ts` (schema propio: `title`, `description`, `publishDate`, `updatedDate`, `updatedLabel`, `author`, `draft`, `pageType`, `keyword`). No usa `category`/`subArea` del resto del proyecto.
- 5 archivos de página independientes en `src/pages/` (`verifactu/index.astro`, `verifactu-autonomos.astro`, `software-verifactu.astro`, `verifactu-gratis.astro`, `verifactu-vs-factura-electronica.astro`), cada uno con su propia ruta explícita — no rutas dinámicas `[slug]`.
- Layout compartido `src/layouts/VerifactuLayout.astro` (basado en el patrón de `GuideLayout`/`ComparisonLayout`: Breadcrumbs, Seo, JSON-LD `Article` + `FAQPage` en el pilar).
- Componente `src/components/VerifactuClusterNav.astro`: enlazado bidireccional fijo entre las 5 páginas (hardcodeado a propósito — el clúster está acotado a estas 5 URLs, no se genera dinámicamente).
- El sistema de 8 categorías, `getVisibleCategories()`, la navegación principal y el resto de colecciones (`guides`, `reviews`, `comparisons`) quedan **sin tocar**. Esta es una sección adicional, no una sustitución.

## 3. Arquitectura de páginas

| Página | URL | Tipo | Intención |
|---|---|---|---|
| Pilar | `/verifactu/` | `pilar` | Informacional amplia |
| Decisión autónomos | `/verifactu-autonomos/` | `decision` | Informacional → decisión |
| Comercial | `/software-verifactu/` | `comercial` | Comercial/transaccional |
| Gratis | `/verifactu-gratis/` | `gratis` | Decisión (gratis vs. pago) |
| Comparativa normativa | `/verifactu-vs-factura-electronica/` | `comparativa-normativa` | Informacional/aclaración |

Explícitamente NO creadas en esta fase (por instrucción del usuario): `/verifactu-2027/` (integrado en el pilar), `/verifactu-excel/` (solo si Search Console demuestra demanda), `/programa-verifactu-gratis/` (solapa con `/verifactu-gratis/`), `/mejor-software-verifactu/` (solapa con `/software-verifactu/`), comparativas individuales herramienta-contra-herramienta.

**Comprobación de canibalización:** ningún contenido existente de NALVETH (WhatsApp+IA, firma electrónica/gestión documental) toca facturación, contabilidad o VERI*FACTU — clúster limpio, sin solape. Verificado con grep sobre `src/content/` el 14/09/2026.

## 4. Fuentes normativas usadas (todas primarias, navegadas directamente el 14/09/2026)

- **RD 1007/2023, de 5 de diciembre** (Reglamento RRSIF/VERI*FACTU) — [BOE-A-2023-24840](https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840).
- **Real Decreto-ley 15/2025, de 2 de diciembre** — aplaza las fechas de aplicación a 1 enero 2027 (Impuesto sobre Sociedades) y 1 julio 2027 (resto de obligados). Fuente: nota informativa oficial de la AEAT — [sede.agenciatributaria.gob.es, nota informativa ampliación de plazo](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/nota-informativa-ampliacion-plazo-adaptacion-facturacion.html).
- **Cuestiones generales AEAT** (ámbito, obligados, exclusiones, modalidades, glosario, certificación/declaración responsable) — [sede.agenciatributaria.gob.es/.../cuestiones-generales.html](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/cuestiones-generales.html) y subpáginas (ámbito de aplicación, quiénes están obligados, certificación, glosario). Actualizadas por la propia AEAT a 21/07/2026.
- **Aplicación gratuita AEAT**: límites confirmados textualmente en la página de "Cuestiones generales" — "por exigir la completa identificación del cliente, solo admite facturas completas, no siendo utilizable para facturas simplificadas" y "no admite facturas con múltiples destinatarios".
- **Artículo 201 bis LGT** (Ley 58/2003, texto consolidado) — sanciones: 150.000€/ejercicio y por tipo de sistema para el fabricante que comercialice sistemas no conformes (1.000€ por sistema si el único defecto es la falta de certificado), 50.000€/ejercicio para quien tenga en uso un sistema no certificado debiendo estarlo. Añadido por la Ley 11/2021, de 9 de julio, en vigor desde el 11/10/2021. Texto verificado directamente en [boe.es/buscar/act.php?id=BOE-A-2003-23186](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186).
- **RD 238/2026, de 25 de marzo** (factura electrónica B2B obligatoria, Ley Crea y Crece) — BOE 31/03/2026, en vigor 20/04/2026. Aplicación efectiva diferida: 12 meses tras la entrada en vigor de la orden ministerial de desarrollo (facturación >8M€/año) y 24 meses (resto). **La orden ministerial de desarrollo no estaba confirmada como ya en vigor en la fecha de esta redacción (14/09/2026)** — se marca así en el contenido, sin asumir una fecha de aplicación efectiva. Fuente: [sede.agenciatributaria.gob.es, nota "Facturación electrónica obligatoria"](https://sede.agenciatributaria.gob.es/Sede/todas-noticias/2026/marzo/31/facturacion-electronica-obligatoria.html) y [BOE-A-2026-7295](https://www.boe.es/buscar/act.php?id=BOE-A-2026-7295).
- **TicketBAI** (territorios forales) y **FACe** (B2G): mencionados solo como aclaración conceptual breve (no mezclar), con datos de contexto general de bajo riesgo (existencia, ámbito territorial/funcional), no como afirmaciones normativas sensibles con fecha.

## 5. Software investigado (precios verificados directamente en cada web oficial, 14/09/2026)

| Herramienta | Planes y precio (verificado 14/09/2026) | VERI*FACTU |
|---|---|---|
| **Aplicación gratuita AEAT** | Gratis. Modalidad VERI*FACTU únicamente. No admite facturas simplificadas ni múltiples destinatarios. | Nativo (es la propia AEAT) |
| **Holded** | Plus 15€/mes (promo 7,50€), Básico 29€/mes (promo 14,50€), Estándar 59€/mes (promo 29,50€), Avanzado 99€/mes (promo 49,50€), Premium 199€/mes (promo 99,50€). Precios sin IVA. Promoción -50% 3 meses activa en fecha de verificación. | "Adaptado a Verifactu" (badge propio en home) |
| **Billin (ahora TS Facturas, grupo TeamSystem)** | Básico 6,6€/mes (80€+IVA/año), Pro 14€/mes (168€+IVA/año), Ilimitado 23€/mes (276€+IVA/año). | Verifactu, Facturae y TicketBAI ilimitados en todos los planes (texto propio de la web) |
| **Quipu (grupo TeamSystem)** | Starter 8,5€/mes (promo, base 17€), Solution 15€/mes (promo, base 30€), Premium 29,5€/mes (promo, base 59€). Promo -50% 3 meses activa en fecha de verificación. | "Adaptado a Verifactu" en los 3 planes |
| **FacturaDirecta** | **Gratis: 0€ para siempre** (hasta 10 clientes), Bronce 12€/mes, Plata 24€/mes, Oro 48€/mes, Diamante 96€/mes (+IVA, facturación anual). | VeriFactu incluido en todos los planes, incluido el gratuito (texto propio de la web) |
| **Declarando** | Verifactu Plus (solo facturación) 9,90€/mes+IVA. Planes con asesoría fiscal incluida: Básico 29,90€/mes, Pro 39,90€/mes, Premium 49,90€/mes (+IVA). | "Cumple Verifactu" (texto propio de la web) |

Nota: Billin y Quipu pertenecen ambos al grupo italiano **TeamSystem** — hallazgo relevante para no presentarlos como opciones completamente independientes en el análisis competitivo.

Ningún dato de esta tabla es de terceros: todos se navegaron directamente en `holded.com`, `billin.net`, `getquipu.com`, `facturadirecta.com` y `declarando.es` el 14/09/2026. Los precios promocionales están señalados como tales (no son el precio base permanente).

## 6. Estado de afiliación (verificado directamente, no asumido de artículos antiguos)

| Herramienta | Estado | Detalle |
|---|---|---|
| Aplicación gratuita AEAT | No aplica | Es la Administración Pública, no hay afiliación. |
| **Billin / TS Facturas** | ✅ Programa activo y apto | `billin.net/afiliacion/`, verificado 14/09/2026: "hasta 82,80€ por negocio referido". Estructura de comisión (según fuente secundaria, no confirmada línea a línea en la página vista): ~30% en planes anuales / ~50% en mensuales. **El titular de comisión está verificado en fuente oficial; el desglose exacto por plan queda `[POR VERIFICAR]`** hasta confirmar el documento de condiciones completo. |
| **Quipu** | ✅ Programa activo y apto | `getquipu.com/es/referral`, verificado 14/09/2026: 30% de comisión sobre el importe pagado, recurrente hasta 12 meses en planes mensuales, pago único en anuales, umbral mínimo de cobro 50€, gestionado vía Rewardful. |
| **Holded** | ⚠️ No apto para NALVETH tal cual | Solo existe un programa de "Solution Partners" para agencias/consultoras que implementan el software (no un programa de afiliación de contenidos con enlace y comisión por referido). `AFILIACIÓN PENDIENTE DE VERIFICAR` si en el futuro aparece un programa de publisher. |
| **FacturaDirecta** | ⚠️ No apto para NALVETH tal cual | El "Partner Program" (`facturadirecta.com/en/partner/`) es un descuento por volumen para gestorías que gestionan cuentas de clientes, no una comisión en efectivo por afiliación de contenidos. `AFILIACIÓN PENDIENTE DE VERIFICAR`. |
| **Declarando** | `AFILIACIÓN PENDIENTE DE VERIFICAR` | No se ha encontrado un programa de afiliados público en la investigación de esta sesión. |

**Decisión de implementación — por qué no hay enlaces `rel="sponsored"` todavía:** confirmar que un programa de afiliados existe y es apto (Billin/TS Facturas, Quipu) no es lo mismo que estar inscrito en él. Inscribirse exige crear una cuenta de afiliado — y, igual que con el bloqueo de creación de cuentas de terceros ya documentado en `docs/DECISIONS.md` (entrada 2026-09-14, Sprint 3), esa es una acción que requiere que una persona autorizada la ejecute, no algo que se pueda hacer de forma autónoma en esta sesión. Por tanto: todos los enlaces a fabricantes en este clúster son **enlaces normales, sin `rel="sponsored"`**, apuntando a la web oficial de cada herramienta. En `/software-verifactu/` se indica explícitamente qué herramientas tienen programa de afiliados verificado y apto (Billin/TS Facturas, Quipu) a la espera de que se complete el alta — en cuanto exista un enlace de afiliado real con ID de seguimiento, se sustituye el enlace normal por uno con `rel="sponsored"` y badge "Enlace de afiliado".

## 7. Recomendación por perfil (usada en `/software-verifactu/` y `/verifactu-autonomos/`)

- **Autónomo sencillo, pocas facturas al año, sin facturas simplificadas ni varios destinatarios:** aplicación gratuita de la AEAT.
- **Autónomo con más volumen o que necesita facturas simplificadas (tickets):** FacturaDirecta gratis (hasta 10 clientes) o Billin Básico (6,6€/mes) como entrada de pago más barata verificada.
- **Microempresa / varios usuarios:** Quipu Solution o Holded Básico — precio y funciones de gestión de equipo similares, verificar según si se necesita contabilidad completa (Holded) o simplicidad (Quipu).
- **Pyme con contabilidad más compleja:** Holded Estándar (contabilidad completa, SII, bancos ilimitados) o Declarando si se quiere asesoría fiscal incluida en el mismo precio.
- **Ecommerce:** Holded (integraciones/inventario como módulos de pago) o Billin (integración Shopify en su plan superior) — ninguna de las herramientas investigadas está especializada en ecommerce como diferencial único; se señala como limitación real, no se inventa una ventaja.

## 8. Fechas de revisión

- Todos los datos normativos y de precios: **verificados el 14 de septiembre de 2026**.
- Sensible a cambios: fechas 2027 (RD-ley 15/2025), estado de la orden ministerial de factura electrónica B2B (RD 238/2026), precios de software (varios con promociones temporales activas), programas de afiliación.
- Revisión recomendada: cada 4-6 semanas mientras no se confirme la entrada en vigor efectiva de la orden ministerial de facturación B2B, y en cuanto se acerque el 1 de enero de 2027 / 1 de julio de 2027.

## 9. Pendientes explícitos (no bloquean la publicación, quedan marcados en el contenido)

- Desglose exacto por plan de la comisión de afiliado de Billin/TS Facturas (solo el titular "hasta 82,80€" está confirmado en la página vista).
- Programa de afiliados de Declarando (no localizado).
- Fecha exacta de entrada en vigor de la orden ministerial de factura electrónica B2B (pendiente en la AEAT a 14/09/2026).
- `/verifactu-excel/` — solo si Search Console demuestra demanda real (no se investiga ni se crea ahora).
- Sage, Cegid, a3innuva, DELSOL — no investigados en esta fase (el usuario no pidió priorizarlos y añadirlos sin razón clara iría contra el principio de concentración/calidad del clúster).
