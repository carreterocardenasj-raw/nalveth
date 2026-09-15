# NALVETH — 4.º gran territorio: Gestión comercial práctica (2026)

Cuarto gran territorio de NALVETH (tras firma electrónica/gestión documental, VERI\*FACTU y el clúster de automatización práctica de WhatsApp). Construido el 15/09/2026 a partir de investigación propia (webs oficiales de cada CRM) verificada en esta sesión.

## 1. Estrategia y posicionamiento

**Decisión explícita del usuario, cerrada, no se reabre:**

> Gestión comercial práctica para autónomos y pequeñas empresas. Captar clientes, organizar leads, hacer seguimiento comercial y vender mejor sin complicarse con herramientas enterprise. CRM aparece como una solución/herramienta dentro del territorio, no como la identidad principal del clúster.

Público objetivo, en este orden de prioridad: autónomos → microempresas → equipos pequeños (1-5 usuarios) → pequeñas empresas de servicios. Explícitamente **sin** abrir verticales (inmobiliarias, clínicas, etc.) en esta fase.

Ángulo editorial: hablar primero del problema (gestionar clientes, organizar leads, seguimiento, no perder oportunidades, centralizar conversaciones, evitar depender de Excel + WhatsApp + notas dispersas) — el CRM aparece como una solución posible, no como el punto de partida. Se evita deliberadamente el tono de blog corporativo tipo HubSpot/Pipedrive/Zoho.

## 2. Arquitectura técnica — decisión distinta a los 3 territorios anteriores

A diferencia de Firma electrónica/VERI\*FACTU/WhatsApp (clústeres de URL plana con content collection propia), este territorio **reutiliza el sistema de 8 categorías ya existente**, ahora ampliado a 9:

- `gestionar-clientes` añadida como categoría real en `src/data/categories.ts` (subáreas: `seguimiento`, `crm`, `leads`).
- Las piezas usan las colecciones ya existentes `guides` y `comparisons` (`src/content.config.ts`), con `category: gestionar-clientes` — sin colección nueva.
- Rutas servidas por las páginas dinámicas ya existentes `src/pages/[category]/guias/[slug].astro` y `.../comparativas/[slug].astro` — sin páginas nuevas en `src/pages/`.

**Por qué esta vez sí y antes no:** las rutas que pidió el usuario (`/gestionar-clientes/guias/...`, `/gestionar-clientes/comparativas/...`) encajan exactamente en el patrón `/{categoria}/{tipo}/{slug}/` ya existente. Repetir el patrón de clúster aislado (4.ª content collection independiente) habría reproducido el mismo problema de navegación que la auditoría global del 15/09/2026 ya identificó y corrigió para los 3 territorios anteriores (invisibilidad en nav hasta añadirlos manualmente a `src/data/territories.ts`). Al ser una categoría real, este territorio aparece automáticamente en Header/Footer/Home vía `getVisibleCategories()`, sin ese paso manual — y por eso **no se añade a `territories.ts`** (añadirlo ahí también duplicaría el enlace).

### Mecanismo nuevo: `isHub`

Problema a resolver: el usuario pidió una página pilar con prosa propia en la URL de categoría (`/gestionar-clientes/`), pero `[category]/index.astro` solo generaba una rejilla de tarjetas, no contenido editorial. Solución, genérica y reutilizable por cualquier categoría futura:

- Campo nuevo `isHub: z.boolean().default(false)` en el schema de `guides` (`src/content.config.ts`).
- Una guía con `isHub: true` se excluye de `[category]/guias/[slug].astro` (no genera página propia) y de la rejilla de `[category]/index.astro`.
- `[category]/index.astro` busca la guía `isHub: true` de su categoría (como mucho una) y, si existe, renderiza su contenido inline por encima de la rejilla, con su propio title/description/JSON-LD (`Article`, mismo patrón que `GuideLayout.astro`).
- `entryHref()` (`src/lib/content.ts`) redirige cualquier referencia a una guía `isHub` hacia la URL de su categoría, para no generar enlaces rotos en "contenido relacionado".

Las 6 piezas previas de `guides`/`comparisons` no se ven afectadas (`isHub` por defecto `false`, cambio aditivo).

## 3. Las 5 piezas

| # | Pieza | Tipo | URL | Prioridad |
|---|---|---|---|---|
| 1 | Pilar — Cómo gestionar clientes y hacer seguimiento comercial | `guides`, `isHub: true` | `/gestionar-clientes/` | — |
| 2 | HubSpot gratis: qué puedes hacer realmente | `guides` | `/gestionar-clientes/guias/hubspot-gratis/` | P0 |
| 3 | Cómo hacer seguimiento de clientes sin un CRM caro | `guides` | `/gestionar-clientes/guias/seguimiento-clientes-sin-crm-caro/` | — |
| 4 | Cuánto cuesta realmente un CRM para 1, 2 y 5 usuarios | `comparisons` | `/gestionar-clientes/comparativas/coste-crm-1-2-5-usuarios/` | — |
| 5 | CRM + WhatsApp: cómo organizar leads y seguimientos | `guides` | `/gestionar-clientes/guias/crm-whatsapp/` | — |

No se crean reviews individuales, verticales, subclusters CRM+firma/CRM+facturación, ni contenido "mejores CRM" — quedan documentados como fase futura (sección 7).

## 4. Herramientas investigadas (precios y afiliación verificados directamente el 15/09/2026)

| Herramienta | Pricing (base, sin IVA salvo que se indique) | Afiliación |
|---|---|---|
| **HubSpot** (Sales Hub) | Free $0 (≤2 usuarios) · Starter $7/asiento/mes (promo; base $20) · Professional $90/asiento/mes (promo; base $100) · Enterprise $150/asiento/mes | ✅ Confirmado y apto: 30% recurrente 12 meses, cookie 180 días, hubspot.com/partners/affiliates |
| **Pipedrive** | Lite 14€ · Growth 39€ · Premium 59€ · Ultimate 79€ (todos /mes/asiento, facturación anual, sin IVA) | ✅ Confirmado y apto: Rising 20% (sin mínimo) / Growth 30% (2-5 ventas/mes×6 meses) revenue share, atribución 12 meses, cookie 90 días, gratis unirse, vía PartnerStack |
| **Holded** | Plus 15€/mes (1 usuario) · Básico 29€/mes (2 usuarios) · Estándar 59€/mes (4 usuarios) · Avanzado 99€/mes (7 usuarios); usuario extra +10€/mes | ⚠️ No apto para editorial: solo programa de "Solution Partners" (reventa/agencia), mismo hallazgo que en VERI\*FACTU |
| **Clientify** | Plan único escalable desde 39€/mes (1 usuario incluido, 468€/año en anual); coste exacto de usuarios 2+ no publicado como tabla fija (calculadora interactiva en su web) — marcado `[NO DISPONIBLE]` en la comparativa en vez de inventar una cifra | ✅ Confirmado y apto: 20% recurrente, sin requisito de ser cliente, comisión real (PayPal/transferencia), clientify.com/afiliados — **esto actualiza en sentido positivo** la cautela inicial de "no asumir afiliación" con la que arrancó la investigación |
| **Zoho CRM** | Free (≤3 usuarios, permanente) · Standard 14€ · Professional 23€ · Enterprise 40€ · Ultimate 52€ (todos /mes/usuario, EUR sin impuestos) | ✅ Confirmado y apto: Tier 1 "Standard Affiliate" 15%, cookie 90 días, zoho.com/affiliate/, abierto explícitamente a bloggers/creadores, aplica a 60+ productos Zoho |
| **Bigin by Zoho** | Free ($0, 1 usuario) · Express $7/usuario/mes · Premier $12/usuario/mes · Bigin 360 $18/usuario/mes (USD, facturación anual) | Mismo programa de afiliados de Zoho (cubre 60+ productos del grupo, se asume que incluye Bigin) |

## 5. Interlinking

El pilar (`/gestionar-clientes/`) enlaza a las otras 4 piezas según el perfil del lector; las 4 piezas enlazan de vuelta al pilar y entre sí donde aporta valor real (p. ej. la guía de HubSpot gratis enlaza a la comparativa de coste; la comparativa enlaza a las 2 guías y a CRM+WhatsApp). **Conexión con el clúster WhatsApp ya existente:** `crm-whatsapp.md` enlaza a `/whatsapp-business-vs-api/`, `/automatizar-whatsapp/`, `/precio-whatsapp-business-api/` y `/mejor-herramienta-whatsapp-automatizacion/` en vez de repetir su contenido técnico — mantiene el foco en el problema comercial (organizar leads/seguimiento), no en la mecánica de automatización de WhatsApp. No se fuerza conexión con Firma electrónica ni VERI\*FACTU en esta primera versión — ninguna de las 5 piezas trata de cerrar contratos/documentación o de facturación de forma que la conexión sea natural; se deja para cuando exista contenido que la sostenga sin ser artificial.

## 6. Afiliación — estado real, no activado todavía

Ninguna de las 5 piezas es de tipo `reviews`, así que la lógica de CTA afiliado de `ReviewLayout.astro` (`toolUrl` por defecto, `affiliateUrl` + `rel="sponsored"` + disclosure solo si `affiliateVerified: true`) no se activa en ninguna página nueva de este territorio — verificado en el HTML de build que no aparece `rel="sponsored"` en ninguna de las 5. La tabla de afiliación de la sección 4 queda lista para cuando se creen reviews individuales.

## 7. Fase futura — NO construir todavía (por instrucción explícita)

Documentado solo como mapa, sin crear ninguna página:
- Reviews individuales de cada herramienta (HubSpot, Pipedrive, Holded, Clientify, Zoho CRM, Bigin).
- Verticales sectoriales (inmobiliarias, clínicas, etc.).
- Subclusters CRM + firma electrónica, CRM + facturación/VERI\*FACTU.
- Contenido "mejores CRM 2026" o ranking sin matices.
- Páginas dedicadas por marca fuera de las ya cubiertas en la comparativa de coste.

## 8. Pendientes explícitos

- Coste exacto de Clientify para 2 y 5 usuarios — su web calcula el precio con una herramienta interactiva, no publica una tabla fija; marcado `[NO DISPONIBLE]` en `coste-crm-1-2-5-usuarios.md`.
- Límite exacto vigente de envíos de email marketing en el plan gratuito de HubSpot — solo confirmado vía comunidad de soporte oficial, no en una tabla de límites navegable; marcado `[POR VERIFICAR]` en `hubspot-gratis.md`.
- Confirmación de si el programa de afiliados general de Zoho cubre explícitamente a Bigin (se asume por pertenecer al mismo grupo de 60+ productos, no confirmado línea por línea para Bigin específicamente).

## 9. Fechas de revisión

Todos los precios y estados de afiliación: **verificados el 15 de septiembre de 2026**. Revisar cuando cambie el pricing público de cualquiera de las 6 herramientas, o cuando se resuelva el pendiente de Clientify (sección 8).

## 10. Build y verificación

Build de producción verificado: 31 páginas, 0 errores. Comprobado sobre el HTML generado: rutas de las 5 piezas, sitemap (`sitemap-0.xml` incluye las 5 URLs), canonical correcto en cada página, JSON-LD (`Article` + `BreadcrumbList` + `Organization`) presente y coherente con el resto del sitio, navegación desktop y menú móvil muestran "Gestión comercial" con el mismo patrón de apariciones que categorías reales comparables (uno menos que los territorios de `territories.ts`, confirmando que no hay entrada duplicada), 0 enlaces internos rotos en barrido completo de las 5 páginas nuevas, sin `rel="sponsored"` en ninguna de ellas.
