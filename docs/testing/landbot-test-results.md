# Resultados de testing — Landbot

**Estado: prueba real NO ejecutada.** No he creado una cuenta en Landbot — crear cuentas (aunque sean gratuitas) es una acción que tengo prohibida por una regla de seguridad que no puedo saltarme, ni siquiera con autorización explícita del usuario. Lo que contiene este documento es una **verificación directa de las páginas públicas de Landbot** (no búsqueda de terceros, la página real, navegada hoy) más el protocolo ya preparado en `research/whatsapp-ia-tools/testing-landbot.md` — es un paso intermedio útil, no el testing completo que pediste.

**Fuente de lo verificado:** landbot.io (home/pricing) navegado directamente el 14/09/2026. **Todo lo que exige cuenta real está marcado `[POR VERIFICAR]` — nada de eso se ha inventado.**

---

## 1. Proceso de registro
`[POR VERIFICAR]` — requiere cuenta real. Dato oficial adyacente confirmado: la web anuncia "No card, never expires" para el plan gratuito y "14-day trial with everything included" sin tarjeta para probar los planes de pago.

## 2. Onboarding
`[POR VERIFICAR]` — requiere cuenta real.

## 3. Facilidad de uso
`[POR VERIFICAR]` — requiere cuenta real. Landbot se anuncia como "Visual builder, templates & A/B" ya desde el plan Free.

## 4. Creación/configuración del agente (negocio de prueba "Clínica Dental Sonrisa")
`[POR VERIFICAR]` — no se ha configurado nada, no se ha creado cuenta.

## 5. Funciones principales — **actualizado hoy, cambios importantes frente a la investigación previa**
Verificado directamente en landbot.io (14/09/2026) — **la estructura de planes ha cambiado desde la última investigación (13/09/2026)**, que citaba "WhatsApp Pro desde 200€/mes"; ese nombre de plan ya no existe tal cual. Estructura actual:

| Plan | Qué incluye (verificado hoy) |
|---|---|
| **Free** (€0, para siempre) | 1 puesto, builder completo, plantillas, **WhatsApp solo con el número de prueba de Landbot** (no número propio), 100 chats/mes, 0 chats de IA incluidos |
| **Starter** | 2 puestos, integraciones básicas (Mailchimp, Segment...), 500 chats/mes + 0,05€/chat extra, 100 chats de IA incluidos. **Sin WhatsApp con número propio** (eso empieza en Professional) |
| **Professional** ("más popular") | 3 puestos, sin marca de Landbot, integraciones esenciales (HubSpot, Airtable, Webhooks), soporte por chat en vivo, 2.500 chats/mes + 0,05€/extra, 300 chats de IA incluidos. Opción "Add WhatsApp" |
| **Professional WA** | Como Professional + WhatsApp con número propio incluido, 500 chats de IA incluidos |
| **Business** | Precio a medida, 1 número de WhatsApp incluido, 5+ puestos, soporte dedicado, SLA de uptime |

Confirmado también: no entrenan modelos de IA con las conversaciones del cliente, plataforma con base en la UE, cumplimiento GDPR declarado, y si el cliente se va se lleva su historial.

## 6. WhatsApp
Verificado: el número propio de WhatsApp **no está incluido hasta el plan Professional (con el add-on) o Professional WA** — el plan Free y Starter solo permiten probar con el número de pruebas compartido de Landbot, no un número real del negocio. Esto es un dato más preciso y más restrictivo que lo que sugería la investigación anterior. El resto (calidad real de la integración, estabilidad, facilidad de conexión) sigue `[POR VERIFICAR]`.

## 7. Automatizaciones
Confirmado que existen "AI Agents" desde el plan Starter en adelante (no en Free). Detalle de qué automatizaciones concretas se pueden construir: `[POR VERIFICAR]`.

## 8. Integraciones
Confirmado por nivel de plan: Starter = básicas (Mailchimp, Segment); Professional = esenciales (HubSpot, Airtable, Webhooks). Cuáles funcionan de verdad y con qué fricción: `[POR VERIFICAR]`.

## 9. Limitaciones
Confirmadas por la propia web: chats extra a 0,05€ cada uno pasado el límite del plan; chats de IA extra a 0,10€ cada uno; el plan Free no incluye chats de IA; WhatsApp con número propio no está en los planes de entrada. El resto de limitaciones reales de uso: `[POR VERIFICAR]`.

## 10. Precios realmente observados (hoy, 14/09/2026, facturación anual mostrada por defecto)
| Plan | Precio mostrado | Nota |
|---|---|---|
| Free | 0€ | Para siempre, sin tarjeta |
| Starter | 32€/mes (anual) · 40€/mes (mensual, precio de referencia tachado) | |
| Professional | 80€/mes (anual) · 100€/mes (mensual, precio de referencia tachado) | |
| Professional WA | 160€/mes | No se confirmó si este precio es anual o mensual con certeza total — revisar en el toggle antes de publicarlo en una review |
| Business | A medida | "Habla con ventas" |

**Esto sustituye la cifra "WhatsApp Pro desde 200€/mes" de la investigación del 13/09/2026 — aquella cifra queda desactualizada, no se debe usar.**

## 11. Experiencia de usuario
`[POR VERIFICAR]` — requiere cuenta real.

## 12. Puntos fuertes (de lo verificable sin cuenta)
- Modelo de precios "predecible por diseño": 3 reglas publicadas sin letra pequeña (precio de chat de IA publicado, precio de chat extra publicado, no entrenan modelos con tus datos).
- Plan gratuito permanente real y sin tarjeta, aunque limitado (sin WhatsApp propio, sin chats de IA).
- Cifras de confianza publicadas: +12.000 equipos, +1.000M de chats, 4,7/5 en +680 reseñas verificadas, +10 años de actividad — no verificadas de forma independiente, son cifras del propio proveedor.

## 13. Puntos débiles (de lo verificable sin cuenta)
- WhatsApp con número propio del negocio exige plan Professional (80-100€/mes) o superior — más caro de lo que sugería la información previa del proyecto para tener WhatsApp real, no el número de pruebas.
- Estructura de precios ha cambiado una vez ya en el tiempo que lleva este proyecto (13/09 → 14/09) — señal de que hay que re-verificar la fecha de comprobación en cada actualización de contenido, no solo al publicar.

## 14. Casos de uso
`[POR VERIFICAR]` con prueba real. La propia web cita casos de uso de clientes (reducción de mensajes gestionados manualmente -70%, coste por lead -30%, aumento de conversión +35%) — son testimonios del proveedor, no verificados de forma independiente, no usar como dato propio.

## 15. Capturas
Ninguna tomada — no se ha usado el producto, solo su web pública.

## 16. Conclusión
No hay conclusión de uso real todavía. Lo único que se puede concluir con lo verificado hoy: el plan de entrada realista para tener WhatsApp con número propio en Landbot es **Professional (desde 80€/mes en anual)**, no el plan gratuito ni Starter — esto es más caro/restrictivo que lo asumido en la planificación de contenido anterior del proyecto y debería reflejarse en la review antes de recomendar el plan Free como punto de partida para WhatsApp específicamente.

## 17. Tipo de negocio para el que la recomendarías
`[POR VERIFICAR]` con prueba real — razonado provisionalmente a partir de los precios: negocios que ya facturan lo suficiente para justificar 80-100€/mes si el canal principal es WhatsApp con número propio; el plan gratuito es más apto para probar el concepto en web/Messenger que en WhatsApp real.

## 18. Tipo de negocio para el que NO la recomendarías
`[POR VERIFICAR]` con prueba real — razonado provisionalmente: un autónomo que solo quiere probar WhatsApp con IA gratis con su propio número no puede hacerlo en Landbot (ni Free ni Starter lo permiten) — para ese caso muy concreto, otra herramienta puede encajar mejor; confirmarlo en la comparativa con Wati una vez ambas tengan prueba real.

---

**Próximo paso real:** para completar este documento hace falta que tú (u otra persona autorizada) cree la cuenta gratuita de Landbot y ejecute el protocolo de `research/whatsapp-ia-tools/testing-landbot.md` — yo puedo guiar el proceso paso a paso en el momento, o trabajar con las capturas/notas que traigas.
