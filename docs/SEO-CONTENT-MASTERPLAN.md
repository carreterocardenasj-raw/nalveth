# NALVETH — Masterplan de contenido y SEO

Compilado 2026-09-14 a partir de 5 investigaciones paralelas (automatización, herramientas SaaS, IA ecommerce, IA marketing, SEO/GEO) más la investigación ya existente de WhatsApp+IA (`docs/RESEARCH-WHATSAPP-IA.md`). Leído antes de escribir: `docs/PROJECT-CONTEXT.md`, `docs/RESEARCH-WHATSAPP-IA.md`, `docs/DECISIONS.md`.

**Método y honestidad de datos:** ninguna de las 5 investigaciones tuvo acceso a Ahrefs/Semrush/Google Keyword Planner — cero cifras de volumen o dificultad numérica están verificadas. Cada hallazgo de este documento hereda la clasificación de su investigación original: **(a)** dato real con fuente citada (sobre todo comisiones de afiliado, confirmadas en páginas oficiales) · **(b)** estimación razonada (volumen/dificultad, basada en densidad de contenido competidor observada) · **(c)** hipótesis sin confirmar. Donde una cifra de comisión tiene fuentes contradictorias, se marca explícitamente — no se promedia ni se inventa una cifra intermedia.

**Nota técnica para quien continúe el proyecto:** `src/data/categories.ts` incluye `comparativas` y `guias` como categorías de nivel superior, pero en la práctica el formato (review/comparativa/guía) ya se resuelve por sub-ruta (`/[categoria]/reviews/`, `/[categoria]/comparativas/`, `/[categoria]/guias/`) dentro de una categoría **temática**. Ninguna pieza de este masterplan usa `category: comparativas` ni `category: guias` — todas usan una de las 6 categorías temáticas. Limpiar ese solape queda pendiente, no bloquea nada.

---

## Los 10 clústeres prioritarios

| # | Clúster | Categoría | Estado | Prioridad |
|---|---|---|---|---|
| 1 | WhatsApp + IA para negocios | `ia-para-negocios` | **Activo** (4 piezas publicadas) | — (ya en producción) |
| 2 | Firma electrónica y gestión documental con IA | `herramientas` | Nuevo | 🔥 Alta |
| 3 | Fotos de producto con IA | `ecommerce` | Nuevo | 🔥 Alta |
| 4 | Facturación/contabilidad IA + Verifactu/Kit Digital | `herramientas` | Nuevo | 🔥 Alta |
| 5 | Descripciones de producto con IA | `ecommerce` | Nuevo | 🔥 Alta |
| 6 | Herramientas SEO con IA (+ GEO como valor añadido) | `seo-geo` | Nuevo | 🔥 Alta |
| 7 | Automatización no-code (Zapier/Make/n8n) | `automatizacion` | Nuevo | 🟢 Alta |
| 8 | Redes sociales con IA | `marketing` | Nuevo | 🟢 Alta |
| 9 | Anuncios y creatividades publicitarias con IA | `marketing` | Nuevo | 🟢 Alta |
| 10 | GEO/AEO práctico para autónomos y pymes | `seo-geo` | Nuevo | 🟡 Media-alta (ventana de tiempo) |

**Reserva, documentados pero no en el lanzamiento de 30 piezas** (detalle en cada informe de origen, no repetido aquí): chatbots/recomendadores IA en tienda (ecommerce, 🟢), email marketing IA (marketing, 🟡), CRM fuera de WhatsApp (automatización, 🟡 — mejor comisión del estudio pero dificultad más alta), vídeo/avatares UGC con IA (marketing, 🟡 — bajo volumen, baja competencia, vigilar crecimiento), gestión de proyectos/tareas (herramientas, 🟡), tareas administrativas/Kit Digital genérico (automatización, 🟠 — alto riesgo de canibalización con WhatsApp, ver clúster 1).

---

## Clúster 2 — Firma electrónica y gestión documental con IA
**Por qué está aquí:** mejor relación oportunidad/competencia de las 5 investigaciones — menos saturado en español que facturación, con la comisión más alta confirmada de todo el masterplan (Adobe 85% el primer mes).

- **Keywords principales:** mejor firma electrónica para pymes España · firmar PDF online gratis sin registro · DocuSign vs Signaturit · extraer datos de factura con IA a Excel · resumir PDF con IA gratis · firma electrónica avanzada vs cualificada.
- **Intención:** mixta — "firmar PDF gratis" y "resumir PDF con IA" son informacional/herramienta de altísimo volumen (AdSense puro); "mejor firma electrónica pymes" y "DocuSign vs Signaturit" son comparativa/comercial (afiliación).
- **Tipo de página:** hub comparativo + 1-2 reviews + 1 guía de utilidad gratuita.
- **Potencial AdSense:** Alto (b) — las keywords utilitarias tienen volumen muy alto aunque RPM algo menor por sesión corta.
- **Potencial afiliación:** Alto — ✓ Adobe 85% primer mes/8,33% anual (Partnerize), ✓ DocuSign 15% (cookie 45 días). Signaturit sin comisión pública, requiere contacto directo.
- **Cannibalización:** ninguna detectada con WhatsApp+IA.
- **Enlazado interno recomendado:** enlazar desde/hacia clúster 4 (facturación — ambos comparten el contexto Verifactu/digitalización) y desde la futura sección "extraer datos de factura con IA" hacia el clúster 4 completo.

## Clúster 3 — Fotos de producto con IA
**Por qué está aquí:** conecta directamente con el público de `ecommerce` y con la investigación archivada de "website builders con IA" (`research/background/`); comisiones de afiliado confirmadas de las más altas del estudio.

- **Keywords principales:** fotos de producto con IA · generador de imágenes de producto con IA gratis · eliminar fondo foto de producto IA · Photoroom vs Pebblely · prompts para fotos de producto con IA · fotografía de producto con IA para Shopify/Amazon.
- **Intención:** informacional (tutorial) + comercial (comparativa) + transaccional ("eliminar fondo... gratis").
- **Tipo de página:** hub comparativo + review Photoroom + tutorial paso a paso con prompts.
- **Potencial AdSense:** Medio-alto (b).
- **Potencial afiliación:** Alto — ✓ Photoroom 20% (Awin, cookie 30 días), ✓ Claid.ai hasta 30% (FirstPromoter, cookie 60 días). Pebblely: programa existe, comisión no confirmada.
- **Cannibalización:** ninguna con WhatsApp+IA; vigilar solape futuro si se reactiva el pilar archivado de website builders (mismo público, ángulo distinto — "hacer fotos" vs. "crear la tienda").
- **Enlazado interno recomendado:** con clúster 5 (descripciones de producto) — un artículo "cómo montar tu ficha de producto con IA" puede enlazar a ambos sin fusionarlos.

## Clúster 4 — Facturación/contabilidad IA + Verifactu/Kit Digital
**Por qué está aquí:** el catalizador de timing más fuerte de todo el masterplan — obligación normativa real (Verifactu, BOE) + dinero público real (Kit Digital 2026 amplía a categorías de IA/automatización).

- **Keywords principales:** mejor programa de facturación para autónomos 2026 · Verifactu qué es y cómo afecta a autónomos · software facturación compatible Verifactu · Holded vs Quipu vs Billin · Kit Digital facturación electrónica requisitos · cómo pagar tu software con el Kit Digital.
- **Intención:** informacional urgente (Verifactu) + comparativa (Holded vs Quipu vs Billin) + transaccional (Kit Digital).
- **Tipo de página:** guía normativa (actualizable, "página viva") + hub comparativo + guía Kit Digital.
- **Potencial AdSense:** Alto (b) — perfil de audiencia (autónomos/gestores) suele dar RPM por encima de la media.
- **Potencial afiliación:** Alto — ✓ Billin hasta 50% mensual / 30% anual (hasta 150€/cliente), ✓ Quipu 30% (hasta 12 meses), ✓ Holded 10% de por vida. FacturaDirecta/Declarando: pendiente de verificar.
- **Cannibalización:** ninguna con WhatsApp+IA. **Riesgo interno propio:** no crear una página de precio por herramienta aparte — igual que en WhatsApp, el precio va dentro de cada review.
- **Enlazado interno recomendado:** con clúster 2 (firma electrónica/gestión documental) por el contexto normativo compartido; la guía "Kit Digital" debe enlazarse desde cualquier pieza futura de automatización que también sea subvencionable.

## Clúster 5 — Descripciones de producto con IA
- **Keywords principales:** generador de descripciones de producto con IA · cómo escribir descripciones de producto con ChatGPT · prompts para descripciones de producto ecommerce · Copy.ai vs Jasper para ecommerce · descripciones de producto IA en español.
- **Intención:** transaccional (generador gratis — dominado por herramientas-página, no atacar el head term literal) + informacional (prompts, tutorial) + comparativa.
- **Tipo de página:** tutorial de prompts (long-tail, defendible) + comparativa de herramientas.
- **Potencial AdSense:** Medio-alto (b).
- **Potencial afiliación:** Alto, el más alto confirmado del masterplan — ✓ Jasper 25% (12m, hasta 30%), ✓ Writesonic 30% "de por vida" (fuente terciaria, reconfirmar), ✓ Copy.ai 45% (fuente con matiz de fiabilidad — Copy.ai no publica términos en su propio dominio, reconfirmar antes de citar la cifra en una pieza).
- **Cannibalización:** con clúster 3 (fotos de producto) — evitar duplicar "cómo optimizar tu ficha de producto"; cada uno cubre su propia keyword, se enlazan entre sí.
- **Enlazado interno recomendado:** clúster 3, y con clúster 8 (redes sociales) si se cubre copy para RRSS de producto.

## Clúster 6 — Herramientas SEO con IA (+ GEO como valor añadido)
**Por qué está aquí:** mejor combinación de intención comercial + afiliación confirmada de las 5 investigaciones; absorbe el ángulo GEO sin depender de que "GEO" tenga volumen propio.

- **Keywords principales:** herramientas SEO con IA · mejor herramienta SEO 2026 · Semrush vs Ahrefs · auditoría SEO gratis con IA · mejores herramientas SEO y GEO 2026 (patrón ya detectado en un competidor real).
- **Intención:** comercial fuerte ("vs", "opiniones") + informacional (auditoría gratis).
- **Tipo de página:** hub comparativo (SEO+GEO combinado) + 1-2 reviews.
- **Potencial AdSense:** Alto (b) — "SEO/marketing" ya confirmado como categoría de RPM alto en la investigación original del proyecto.
- **Potencial afiliación:** Alto — ✓ Semrush $200 + hasta 25% recurrente (cookie 120 días), ✓ Frase.io 30% (12m, fuente oficial), ✓ HubSpot 30%→15% (180 días). **Ahrefs confirmado SIN programa de afiliados** — no prometerlo en ninguna pieza.
- **Cannibalización:** con clúster 10 (GEO/AEO) — resuelto por diseño: este clúster cubre herramientas (comercial), el 10 cubre "qué es GEO y cómo aparecer en IA" (informacional/fundacional). No deben repetir el mismo "qué es".
- **Enlazado interno recomendado:** clúster 10 en ambas direcciones.

## Clúster 7 — Automatización no-code (Zapier, Make, n8n)
**Por qué está aquí:** continuidad natural del pilar activo (WhatsApp+IA ya toca automatización); dificultad más alta de lo esperado inicialmente (15+ competidores españoles activos), pero el hueco de "benchmark propio con capturas" sigue sin explotar por nadie.

- **Keywords principales:** n8n vs Make vs Zapier · qué es n8n · automatización de procesos con IA para pymes España · alternativas a Zapier gratis · Pabbly Connect opinión.
- **Intención:** comparativa (cabeza del clúster) + informacional (qué es n8n) + comercial (Pabbly, sin cobertura en español todavía).
- **Tipo de página:** comparativa con prueba real (mismo protocolo de testing que ya usa el proyecto: mismo flujo configurado en las 3-4 herramientas, cronometrado) + guía "qué es n8n".
- **Potencial AdSense:** Alto (b) — proxy: CPC B2B SaaS global $5,34 de media (dato de Google Ads, no AdSense — usar solo como proxy direccional).
- **Potencial afiliación:** Medio — ✓ Make 35% (12m), ✓ n8n 30% (12m, solo Cloud), ✓ Pabbly hasta 30%. **Zapier confirmado sin programa público** — la herramienta más buscada del trío es la peor monetizable, ya documentado desde la investigación original de WhatsApp.
- **Cannibalización — la más importante de detectar de todo el masterplan:** "automatizar WhatsApp con Zapier/Make" debe vivir **una sola vez**, aquí (no en el pilar WhatsApp), con enlace fuerte bidireccional. "Asistente virtual IA para autónomos" (agenda+email+WhatsApp) es, en la práctica, la misma categoría de producto que ya cubre WhatsApp+IA — si se escribe, diferenciar explícitamente por canal (voz, email, calendario web), nunca repetir "cómo automatizar WhatsApp".
- **Enlazado interno recomendado:** bidireccional fuerte con `/ia-para-negocios/integraciones/automatizar-citas-whatsapp/` (ya reservado en el pilar WhatsApp) y con clúster 4 (Kit Digital, si la automatización es subvencionable).

## Clúster 8 — Redes sociales con IA
- **Keywords principales:** IA para redes sociales · herramientas IA para redes sociales gratis · IA para crear contenido en redes sociales para autónomos (coincide con título real de un competidor) · Metricool vs Hootsuite · generador de publicaciones para Instagram con IA.
- **Intención:** informacional/comercial en cabeza, comercial fuerte en long-tail de marca.
- **Tipo de página:** hub comparativo + review Metricool.
- **Potencial AdSense:** Medio-alto (b).
- **Potencial afiliación:** Alto, el mejor del área marketing — ✓ Metricool hasta 50% recurrente de por vida (tier Partner), ✓ Predis.ai 30% "de por vida", ✓ Ocoya 30% (12m).
- **Cannibalización:** ninguna detectada.
- **Enlazado interno recomendado:** con clúster 9 (anuncios) y con clúster 5 (descripciones de producto, si se cubre copy para RRSS).

## Clúster 9 — Anuncios y creatividades publicitarias con IA
- **Keywords principales:** IA para anuncios · generador de anuncios con IA gratis · AdCreative.ai opiniones/precio · crear anuncios de Facebook con IA · qué es Meta Advantage+ / Google Performance Max (hueco real: casi todo el contenido de estas dos plataformas está en inglés).
- **Intención:** transaccional (generador gratis) + comercial (marca) + informacional (Advantage+/PMax, hueco detectado en español).
- **Tipo de página:** guía "IA de las propias plataformas explicada a pymes" (diferencial real) + review AdCreative.ai.
- **Potencial AdSense:** Medio-alto (b).
- **Potencial afiliación:** Alto — ✓ AdCreative.ai 30% recurrente, escalable a 40% (cookie 90 días), ✓ Jasper 25%.
- **Cannibalización:** ninguna detectada.
- **Enlazado interno recomendado:** clúster 8; posible clúster satélite futuro "vídeo/avatares UGC con IA" (HeyGen 20%, Synthesia 25% — reserva, no en el lanzamiento de 30) enlaza aquí cuando se active.

## Clúster 10 — GEO/AEO práctico para autónomos y pymes
**Por qué está aquí, con matiz de timing:** GEO/AEO ya tiene contenido español muy reciente (una pieza de referencia publicada el 10/09/2026, hace 4 días) de actores con mucha más autoridad que NALVETH (HubSpot, Human Level, Dean Romero) — **no hay hueco para "explicarlo primero"**. El hueco real y verificado es el ángulo práctico para autónomos con presupuesto bajo/cero, que ningún actor grande cubre (hablan a nivel de marca/agencia, no de guía gratuita accionable).

- **Keywords principales:** qué es GEO/AEO · cómo aparecer en ChatGPT · cómo hacer que ChatGPT recomiende mi negocio · cómo aparecer en las AI Overviews de Google · herramientas para medir visibilidad en IA.
- **Intención:** informacional (fundacional) + comercial (herramientas de medición).
- **Tipo de página:** guía fundacional con ángulo "para autónomos, sin presupuesto de agencia" + guía de herramientas de medición (Otterly/Peec).
- **Potencial AdSense:** Medio-alto (b) — sin benchmark propio todavía por ser categoría nueva; se asume similar o algo superior a SEO/marketing general.
- **Potencial afiliación:** Medio — ✓ Otterly.ai 20% (12m), ✓ Peec AI 20% revenue share (6 meses). Profound (enterprise) sin programa accesible.
- **Cannibalización:** con clúster 6 — ver resolución ahí (este cubre "qué es/cómo", el 6 cubre "qué herramienta usar").
- **Enlazado interno recomendado:** clúster 6 en ambas direcciones; esta es la pieza con mayor urgencia de publicación de las 10 por la ventana de tiempo (cuanto antes se publique, menos competencia habrá acumulado).

---

## Los primeros 30 contenidos a publicar (no se publican todavía — mapa para tu aprobación)

Orden de producción recomendado, mezclando continuidad del pilar activo con arranque de los clústeres nuevos de mayor prioridad. No es un calendario con fechas (eso está en `docs/CONTENT-ROADMAP-90-DAYS.md`).

**Continuación de WhatsApp + IA (6 piezas — ya planificadas en `docs/RESEARCH-WHATSAPP-IA.md`, se listan aquí solo para que el total de 30 sea completo):**
1. Hub "Mejores agentes de IA para WhatsApp España 2026"
2. Landbot vs. Wati (comparativa)
3. Guía del cambio de precios de Meta (oct-2026)
4. Caso de uso: WhatsApp + IA para clínicas dentales
5. Tutorial: cómo automatizar citas y recordatorios por WhatsApp
6. Review ManyChat

**Clúster 2 — Firma electrónica y gestión documental:**
7. ✅ Hub: "Firma electrónica y gestión documental: mejores herramientas para empresas y autónomos" — publicado 2026-09-14, `src/content/guides/firma-electronica-gestion-documental.md` (intención informacional/decisión — no repite tabla de precios, enlaza a la pieza de abajo para eso).
   - **Pieza complementaria ya publicada el 2026-09-14, no numerada originalmente en esta lista de 30:** "Mejor firma electrónica para pymes en España (2026)" (comparativa de precios de 4 herramientas), `src/content/comparisons/mejor-firma-electronica-pymes-espana.md`. Se escribió primero por error de secuencia (se interpretó como la pieza #7); el usuario la aceptó como contenido válido del clúster y pidió corregir el orden creando el hub informacional como pieza #7 real, enlazando hacia esta comparativa. Ambas quedan publicadas y enlazadas entre sí.
8. Cómo extraer datos de facturas con IA a Excel (herramienta gratuita)
9. DocuSign vs. Signaturit — comparativa cabeza a cabeza de solo estas dos herramientas; no se cannibaliza con la comparativa de 4 herramientas ya publicada porque esa cubre precios de las 4 a la vez y esta pieza futura profundizaría específicamente en DocuSign vs. Signaturit (features, no solo precio).

**Clúster 3 — Fotos de producto con IA:**
10. Hub: mejores herramientas de IA para fotos de producto 2026
11. Review Photoroom
12. Tutorial: cómo hacer fotos de producto con IA (con prompts)

**Clúster 4 — Facturación + Verifactu/Kit Digital:**
13. Qué es Verifactu y cómo afecta a tu negocio en 2026 (página viva)
14. Hub: mejor programa de facturación para autónomos compatible con Verifactu
15. Cómo pagar tu software de gestión con el Kit Digital

**Clúster 5 — Descripciones de producto con IA:**
16. Tutorial: cómo escribir descripciones de producto con IA (prompts)
17. Jasper vs. Copy.ai vs. Writesonic para ecommerce

**Clúster 6 — Herramientas SEO con IA:**
18. Hub: mejores herramientas SEO (y GEO) con IA para pymes 2026
19. Semrush vs. Surfer SEO
20. Las mejores herramientas de auditoría SEO gratis con IA

**Clúster 7 — Automatización no-code:**
21. n8n vs. Make vs. Zapier: comparativa con prueba real
22. Qué es n8n y cómo automatizar tu negocio sin programar
23. Alternativas a Zapier más baratas

**Clúster 8 — Redes sociales con IA:**
24. Hub: mejores herramientas de IA para gestionar redes sociales de tu negocio
25. Review Metricool

**Clúster 9 — Anuncios con IA:**
26. Guía: Meta Advantage+ y Google Performance Max explicados para pymes
27. Review AdCreative.ai

**Clúster 10 — GEO/AEO práctico:**
28. Guía fundacional: qué es GEO/AEO y cómo aparecer en ChatGPT (para autónomos sin presupuesto de agencia)
29. Herramientas para medir si apareces en ChatGPT/Perplexity (Otterly, Peec AI)
30. Checklist GEO: 10 pasos para pymes

**No se publica nada de esta lista todavía — es el mapa estratégico que pediste, pendiente de tu revisión.**

## Datos pendientes de verificar antes de publicar (heredados de las 5 investigaciones)
- Cualquier volumen de búsqueda o dificultad (KD) numérica — cero verificados en todo el masterplan, sin excepción.
- Comisión exacta de Copy.ai (fuente con matiz de fiabilidad, Copy.ai no la publica en su propio dominio), Writesonic ("de por vida" sin confirmar en fuente oficial), Pabbly Connect (duración de cookie contradictoria entre fuentes).
- Programas de afiliados de FacturaDirecta, Declarando, Signaturit (revenue-share B2B sin cifra pública), Pebblely, Zapier (confirmado que NO tiene programa público de afiliado tipo blogger).
- Si "lead a gestoría por Kit Digital" es un canal de monetización real — sigue siendo hipótesis, no verificado en ninguna de las 6 investigaciones del proyecto hasta ahora.
