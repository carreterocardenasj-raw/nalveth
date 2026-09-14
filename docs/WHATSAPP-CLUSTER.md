# NALVETH — Clúster de automatización práctica de WhatsApp (2026)

Tercer mini-cluster de NALVETH (tras firma electrónica/gestión documental y VERI*FACTU). Construido el 15/09/2026 a partir de investigación propia (fuentes primarias Meta/developers.facebook.com, AEPD/LSSI, y webs oficiales de cada herramienta) verificada en esta sesión.

## 1. Estrategia y posicionamiento

**Decisión explícita del usuario:** NO posicionar el territorio como "Agentes IA", "IA para empresas" ni "WhatsApp + IA" genérico. El eje es el problema y el resultado:

> Automatización práctica de WhatsApp para autónomos y pymes españolas: atención, leads, reservas y ventas, con costes reales, herramientas y cumplimiento.

"Agente IA" es una capa tecnológica secundaria, no el término principal. Ejemplo aplicado: los títulos de las 5 páginas usan "automatizar", "atención", "coste", "herramientas" — no "agentes IA de WhatsApp".

Secuencia de decisión que el clúster ayuda a resolver: tengo demasiados mensajes → ¿puedo automatizar? → ¿App o API? → ¿necesito BSP? → ¿qué puedo automatizar? → ¿qué herramienta? → ¿cuánto cuesta? → ¿cómo hacerlo bien?

## 2. Arquitectura técnica

Mismo patrón que el clúster VERI*FACTU (`docs/VERIFACTU-CLUSTER.md`), reutilizado deliberadamente por consistencia y porque ya está probado en producción:

- Content collection propia `whatsapp` en `src/content.config.ts` (no reutiliza `guides`/`reviews`/`comparisons` ni las 8 categorías generales).
- 5 páginas con archivo propio en `src/pages/` (URLs planas, sin rutas dinámicas).
- Layout compartido `src/layouts/WhatsappLayout.astro` y componente `src/components/WhatsappClusterNav.astro` (enlazado bidireccional fijo entre las 5 URLs, igual que en VERI*FACTU).
- El esquema de 8 categorías, la navegación general y los clústeres existentes (WhatsApp+IA en `ia-para-negocios/whatsapp-ia`, firma electrónica, VERI*FACTU) quedan intactos.

**Relación con el clúster WhatsApp+IA ya existente:** NALVETH ya tenía contenido en `ia-para-negocios/whatsapp-ia` (reviews de Landbot y Wati, comparativa Landbot vs. Wati, guía "qué es un agente de IA para WhatsApp"). Este nuevo clúster **no lo sustituye ni lo duplica** — es el nivel superior de decisión (App vs. API, coste real de Meta, panorama de 7 herramientas) que faltaba antes de llegar a reviews individuales. Las páginas nuevas enlazan a las reviews ya publicadas de Landbot y Wati en vez de repetir su contenido.

## 3. Las 5 páginas

| # | Página | URL | pageType | Intención |
|---|---|---|---|---|
| 1 | Pilar | `/whatsapp/` | `pilar` | Informacional amplia |
| 2 | App vs. API | `/whatsapp-business-vs-api/` | `decision` | Decisión por perfil |
| 3 | Automatizar WhatsApp | `/automatizar-whatsapp/` | `guia` | Informacional/práctica |
| 4 | Coste | `/precio-whatsapp-business-api/` | `coste` | Informacional/comercial, alto rigor |
| 5 | Herramientas | `/mejor-herramienta-whatsapp-automatizacion/` | `comercial` | Comercial/transaccional |

No se crean páginas por herramienta ni por sector, ni comparativas 1 a 1 (Manychat vs. Wati, etc.) — quedan documentadas como fase futura en la sección 8.

## 4. Fuentes normativas y técnicas (primarias, verificadas el 15/09/2026)

### Meta / WhatsApp Business Platform — precios
Fuente única y primaria: **[developers.facebook.com/documentation/business-messaging/whatsapp/pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)** (página oficial de Meta for Developers, en español, con fecha de actualización visible: **10 de septiembre de 2026** — 5 días antes de esta verificación).

Hechos confirmados textualmente en esa página:
- **Desde el 1 de julio de 2025**, Meta cobra **por mensaje** (no por conversación) — solo se cobran mensajes de plantilla (`"type":"template"`) entregados. La tarifa varía según categoría de plantilla y código de país del destinatario.
- **Desde el 1 de noviembre de 2024**, los mensajes que no son de plantilla son gratuitos, pero solo dentro de un intervalo de servicio al cliente (CSW) abierto de 24 horas.
- **Desde el 1 de julio de 2025**, las plantillas de utilidad enviadas en respuesta a un usuario dentro de un CSW abierto son gratuitas — **este beneficio termina el 1 de octubre de 2026** (ver más abajo).
- **Intervalo gratuito desde punto de acceso (FEP)**: todos los mensajes, incluidas plantillas, son gratuitos durante 72 horas si se envían dentro de ese intervalo.
- Categorías de plantilla: Marketing (siempre se cobra), Utilidad, Autenticación. "Servicio" (mensajes libres dentro del CSW) es gratis hasta el cambio de octubre de 2026.
- **Cambio confirmado y ya publicado para el 1 de octubre de 2026** (todavía no vigente en la fecha de esta redacción): los mensajes de servicio empiezan a cobrarse (misma tarifa que utilidad/autenticación por mercado), con un **nivel gratuito nuevo de 1.000 mensajes de servicio al mes por número de teléfono de empresa**; y los mensajes de utilidad enviados dentro del CSW dejan de ser gratuitos.
- Calendario de precios: Meta solo puede actualizar tarifas el primer día de cada trimestre (1 ene / 1 abr / 1 jul / 1 oct), con preaviso de 1 a 6 meses según el tipo de cambio.
- **Tarifas exactas en EUR por categoría para España: no extraídas de forma fiable** — están en hojas de tarifas CSV/PDF segmentadas por país, moneda y nivel de volumen, no en una tabla simple. Se marcan `[NO DISPONIBLE]` en el contenido en vez de aproximar o mezclar cifras de blogs de terceros, tal como exige el encargo.

### AEPD / RGPD / LSSI — cumplimiento
- **LSSI (Ley 34/2002 de Servicios de la Sociedad de la Información), artículo 21**: exige consentimiento previo para el envío de comunicaciones comerciales por medios electrónicos (incluye WhatsApp), con la excepción de una relación contractual previa + productos/servicios similares + haber ofrecido la posibilidad de oponerse.
- AEPD es la autoridad de control; RGPD es el marco general de protección de datos aplicable a cualquier tratamiento (números de teléfono, historial de conversación, datos en CRM).
- No se citan cifras de sanciones ni se afirma "cumple RGPD" de forma genérica — el propio encargo lo prohíbe explícitamente, y no se ha podido verificar directamente el PDF oficial de la AEPD sobre comunicaciones comerciales (`aepd.es/documento/2018-0164.pdf`, descarga bloqueada en esta sesión) — el contenido se apoya en la LSSI (ley pública, estable) en vez de en cifras de sanciones de fuentes secundarias.

## 5. Herramientas investigadas (precios y afiliación verificados directamente el 15/09/2026)

| Herramienta | Qué es realmente | Precio (verificado 15/09/2026) | Afiliación |
|---|---|---|---|
| **Manychat** | App/Plataforma de marketing conversacional multicanal (Instagram, WhatsApp, Messenger, TikTok, Telegram, SMS, email) — WhatsApp es uno más de varios canales, no su foco exclusivo | Free $0 (25 contactos activos), Essential $14/mes (250), Pro $29/mes (2.500, con IA), Business $69/mes (7.500), Advanced $139/mes (25.000) | ✅ Confirmado y apto: 30/40/50% recurrente 12 meses según tier (Gold/Sapphire/Diamond), atribución 90 días, sin tope, vía PartnerStack. Términos oficiales vigentes desde 1/06/2026 |
| **Wati** | API/Plataforma — especialista puro en WhatsApp Business API (ya revisado a fondo en `/ia-para-negocios/reviews/wati/`) | Growth 59-69€/mes, Pro 119-149€/mes, Business 279-349€/mes (dato ya publicado, verificado 14/09/2026) | ✅ Confirmado (ya documentado en la review publicada): 15-20% primeros 12 meses, cookie 90 días |
| **Respond.io** | Plataforma/Inbox multicanal para equipos (WhatsApp + otros canales + CRM conversacional) | Starter $79/mes, Growth $159/mes, Advanced $279/mes, Enterprise a medida | ✅ Programa de **Referral** (no el de Partner/reseller): $100 fijos por cliente de pago referido, abierto a cualquiera — distinto del "Partner Program" (agencias, 15-40% recurrente, requiere aprobación) |
| **Landbot** | App/Workflow — chatbot visual multicanal con capa de IA híbrida (ya revisado a fondo en `/ia-para-negocios/reviews/landbot/`) | Free 100 chats/mes, Starter 32-40€/mes, Professional 80-100€/mes, Professional WA 160€/mes, Business a medida (dato ya publicado, verificado 14/09/2026) | ✅ Confirmado (ya documentado en la review publicada): 20% recurrente hasta 2 años |
| **HubSpot** | CRM/Plataforma — no es WhatsApp-first; WhatsApp se conecta vía integraciones del marketplace, no es un canal nativo | Marketing Hub: Free $0, Starter desde $7/mes/asiento (promo; base $20), Professional desde $800/mes, Enterprise desde $3.600/mes | ✅ Confirmado y apto: 30% recurrente hasta 12 meses, cookie 180 días, gratis unirse, por tiers (Starter/Sprocket/Elite) — distinto del "Solutions Partner Program" (agencias/consultoras) |
| **n8n** | Workflow — automatización avanzada; WhatsApp se conecta mediante integraciones/webhooks, no es una bandeja de WhatsApp | Starter 20€/mes (2.500 ejecuciones), Pro 50€/mes (10.000), Business 667€/mes (40.000), Enterprise a medida. Existe edición Community autoalojada gratuita | ✅ Confirmado y apto: 30% durante 12 meses sobre referidos a n8n Cloud, programa abierto a cualquiera |
| **Tidio** | App/Plataforma de atención (chat web + WhatsApp + IA); requiere acceso a Facebook Business Manager para conectar WhatsApp (hasta 2-5 números), sin soporte de llamadas/estados/reacciones/grupos | Starter 24,17€/mes (100 conversaciones), Growth desde 49,17€/mes (250+), Plus desde 300€/mes + uso, Premium a medida. Add-on Lyro AI Agent desde 32,50€/mes | ✅ Confirmado: hasta 30% de comisión, programa abierto a cualquier creador de contenido. Cookie/umbral de pago exactos: `[NO CONFIRMADO]` en la página oficial consultada |

**Nota sobre "probado por NALVETH":** ninguna de las 7 herramientas se presenta como probada de primera mano en este clúster — todas usan la fórmula "revisado con información oficial" (o equivalente), salvo Landbot y Wati, que ya tienen su propia ficha con el estado real de prueba (`testedFirsthand: false` en ambas, documentado en Sprint 1/3).

## 6. Metodología de evaluación aplicada

Cada herramienta se describe con el mismo criterio: qué es realmente (App / API-Platform / BSP / Workflow / Chatbot / IA generativa / Agente — puede pertenecer a varias categorías), precio verificado y fechado, para quién sirve, qué no resuelve, y estado de afiliación real. No se usa la palabra "agente" para automatizaciones que no cumplen los criterios de autonomía explicados en `/automatizar-whatsapp/`.

## 7. Interlinking

`/whatsapp/` enlaza a las otras 4; `/whatsapp-business-vs-api/`, `/automatizar-whatsapp/`, `/precio-whatsapp-business-api/` y `/mejor-herramienta-whatsapp-automatizacion/` enlazan de vuelta al pilar y entre sí donde aporta valor real (no interlinking artificial). Enlaces cruzados hacia clústeres existentes: `/mejor-herramienta-whatsapp-automatizacion/` enlaza a las reviews ya publicadas de Landbot y Wati en vez de duplicarlas. Conexión editorial con firma electrónica y VERI*FACTU (WhatsApp → lead → presupuesto → firma/factura) **no se ha forzado** en esta primera versión — se deja para cuando haya contenido de "presupuestos"/"leads" que la sostenga con naturalidad.

## 8. Fase futura — NO construir todavía (por instrucción explícita)

Documentado solo como mapa, sin crear ninguna página:
- Verticales de contenido: automatizar leads por WhatsApp, reservas/citas, WhatsApp + CRM, WhatsApp + ecommerce.
- Comparativas 1 a 1: Manychat vs. Wati, Wati vs. Respond.io, Manychat vs. Respond.io, n8n vs. Make para WhatsApp, WhatsApp App vs. API (ya cubierto a nivel general en la página 2, pero no como comparativa de producto).
- Verticales sectoriales: servicios profesionales, ecommerce, inmobiliarias (en ese orden de prioridad futura).
- Páginas individuales por herramienta (reviews propias de Manychat, Respond.io, HubSpot, n8n, Tidio).

## 9. Fechas de revisión

Todos los precios y estados de afiliación: **verificados el 15 de septiembre de 2026**. Especialmente sensible a cambios: la actualización de precios de Meta del **1 de octubre de 2026** (mensajes de servicio dejan de ser gratis, con nivel gratuito de 1.000/mes; mensajes de utilidad dentro del CSW dejan de ser gratis) — revisar y actualizar `/precio-whatsapp-business-api/` en cuanto esa fecha se cumpla y Meta confirme el detalle final. Revisar también cada vez que alguna de las 7 herramientas cambie de plan o de programa de afiliados.

## 10. Pendientes explícitos

- Cifras exactas de tarifas Meta por categoría en EUR para España — requieren descargar y procesar las hojas de tarifas CSV/PDF oficiales, no disponibles como texto navegable.
- Confirmación directa del PDF de la AEPD sobre comunicaciones comerciales electrónicas (descarga bloqueada en esta sesión).
- Cookie y umbral de pago exactos del programa de afiliados de Tidio.
- Desglose exacto de precios en EUR de Manychat, Respond.io y HubSpot para clientes españoles (las webs consultadas mostraban USD por defecto).
