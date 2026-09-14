# Resultados de testing — Wati

**Estado: prueba real NO ejecutada.** No he creado una cuenta en Wati — crear cuentas (aunque sean gratuitas) es una acción que tengo prohibida por una regla de seguridad que no puedo saltarme, ni siquiera con autorización explícita del usuario. Lo que contiene este documento es una **verificación directa de la página pública de precios de Wati** (wati.io/pricing, navegada hoy, incluyendo el toggle anual/mensual — no solo texto de búsqueda) más el protocolo ya preparado en `research/whatsapp-ia-tools/testing-wati.md`. Esto resuelve el mayor hueco que tenía la investigación anterior (precios de Wati no confirmados), pero no sustituye la prueba real.

**Fuente de lo verificado:** wati.io/pricing, navegado directamente el 14/09/2026, incluyendo captura de los dos modos de facturación. **Todo lo que exige cuenta real está marcado `[POR VERIFICAR]` — nada de eso se ha inventado.**

---

## 1. Proceso de registro
`[POR VERIFICAR]` — requiere cuenta real. Dato oficial confirmado en la web: "7 días de prueba gratis, sin costos de configuración."

## 2. Onboarding
`[POR VERIFICAR]` — requiere cuenta real. Existe un servicio de pago aparte llamado "Dedicated Onboarding" (coste a medida, pago único) que incluye ayuda con conexión de número, verificación de Meta Business, migración de BSP y 1 hora de walkthrough — **esto sugiere que el onboarding por defecto (sin este add-on) puede tener fricción real**, dato a confirmar en la prueba.

## 3. Facilidad de uso
`[POR VERIFICAR]` — requiere cuenta real.

## 4. Creación/configuración del agente (negocio de prueba "Clínica Dental Sonrisa")
`[POR VERIFICAR]` — no se ha configurado nada, no se ha creado cuenta.

## 5. Funciones principales — verificadas hoy por plan
| Plan | Funciones clave (verificado hoy) |
|---|---|
| **Growth** | Setup de WhatsApp API + verificación de sello azul sin coste, bandeja omnicanal (WhatsApp, Instagram, FB Messenger, QR, widget, wa.me), campañas multimedia con tasas de apertura/lectura, captura de leads (CTWA), bandeja de equipo con asignación/automatización de seguimientos/etiquetas, catálogo de WhatsApp + carrito abandonado + pedidos Shopify, soporte email 24x5 (inglés/portugués). Uso: 15k plantillas/mes, 1.000 activadores de automatización gratis/mes, 2 integraciones de Comercio/CRM, 10.000 llamadas API/mes sin webhooks, **250 créditos de "Copiloto de IA" gratis/mes** |
| **Pro** ("mejor valor") | Todo Growth + auto-cualificación de leads (chatbot avanzado, formularios, automatización en IG), retargeting inteligente, plantillas en carrusel, pago en catálogo, **automatización con IA** (responder consultas, recopilar info, recordatorios), bandeja avanzada con enrutamiento automático, checkout Shopify (Gokwik/Shopflo), soporte email+chat 24x7. Uso: plantillas ilimitadas, 2.000 activadores/mes, 5 integraciones (incl. HubSpot), 200.000 llamadas API/mes, webhooks limitados, 500 créditos IA/mes |
| **Business** | Todo Pro + hasta 4.000 mensajes/min, "Partner Oficial de Google" (proveedor exclusivo en Américas de anuncios Google-to-WhatsApp), API de WhatsApp Pay, múltiples números de WhatsApp, Customer Success Manager dedicado, enmascaramiento de números, soporte prioritario 24x7. Uso: integraciones ilimitadas (incl. Salesforce), 20.000.000 llamadas API/mes, 1.500 créditos IA/mes |

Nota importante para la review: Wati llama a su capa de IA **"Copiloto de IA"** con créditos limitados por plan (250/500/1.500 según plan) — esto es un límite de uso real no mencionado en la investigación previa, a explicar claramente en la review.

## 6. WhatsApp
Es el canal central del producto en todos los planes — a diferencia de Landbot, aquí WhatsApp no es una función añadida por plan, viene incluido desde Growth. Calidad real de la conexión/verificación del sello azul: `[POR VERIFICAR]`.

## 7. Automatizaciones
Growth incluye 1.000 "activadores de automatización" gratis/mes; Pro 2.000; Business 5.000. Qué cuenta exactamente como "activador" y qué tan lejos llega la automatización con IA real: `[POR VERIFICAR]`.

## 8. Integraciones
Growth: 2 integraciones de Comercio/CRM a elegir. Pro: 5, incluyendo HubSpot. Business: ilimitadas, incluyendo Salesforce. Cuáles de verdad funcionan sin fricción: `[POR VERIFICAR]`.

## 9. Limitaciones — la más importante detectada hoy
**Growth NO permite añadir usuarios adicionales** ("Sin usuarios adicionales") — está limitado en firme a 3 usuarios, a diferencia de Pro y Business que sí permiten ampliar pagando por usuario. Para un negocio que crezca de equipo estando en Growth, la única vía es subir de plan entero, no añadir un usuario suelto. Además: "se aplican cargos adicionales por plantillas" en los tres planes, con tarifas que dependen del tipo de mensaje (marketing/utilidad/autenticación) — el coste real mensual depende del volumen de mensajes, no solo de la cuota fija.

## 10. Precios realmente observados (hoy, 14/09/2026, navegado con el toggle anual y mensual)
| Plan | Anual (facturado anualmente) | Mensual | Usuarios incluidos | Usuario adicional |
|---|---|---|---|---|
| **Growth** | 59€/mes | 69€/mes | 3 | No permitido |
| **Pro** | 119€/mes | 149€/mes | 5 | 39€/usuario/mes |
| **Business** | 279€/mes | 349€/mes | 5 | 89€/usuario/mes |

Ahorro real de la facturación anual: ~14% en Growth, ~20% en Pro y Business — coherente con el "hasta ~25% de descuento" que anuncia la propia web. **Esto resuelve por completo el hueco de precios que dejó pendiente la investigación anterior del proyecto — usar estas cifras, fechadas hoy, en la review.**

Coste no incluido en la cuota fija (confirmado): mensajes de plantilla (tarifa variable por tipo, hoja de tarifas aparte), y en Business hay un complemento "Blitz" de pago para subir a 12.000 mensajes/minuto. También existe un add-on de integración con Shopify por 4,99€/mes adicionales.

## 11. Experiencia de usuario
`[POR VERIFICAR]` — requiere cuenta real.

## 12. Puntos fuertes (de lo verificable sin cuenta)
- Precios ahora totalmente transparentes y confirmados en euros, con desglose anual/mensual claro.
- Es "Partner Oficial de Google" para anuncios de Google-to-WhatsApp en América (plan Business) — una integración diferenciadora que ningún otro competidor investigado en el proyecto (Landbot, ManyChat, Tidio...) ha mencionado.
- Modelo de facturación por Contacto Mensual Activo (MAC), no por contacto almacenado — solo se paga por quien interactúa de verdad, lo cual puede ser más barato que modelos de "por contacto total" si la base de contactos es grande pero poco activa.

## 13. Puntos débiles (de lo verificable sin cuenta)
- El plan de entrada (Growth, 59-69€/mes) **no permite añadir usuarios** — un negocio pequeño que crezca de 3 a 4 personas debe saltar directamente a Pro (119-149€/mes), un salto de precio grande.
- Coste real final depende de variables no incluidas en la cuota fija (plantillas, mensajes por tipo, usuarios extra en planes superiores) — más complejo de estimar "cuánto cuesta de verdad al mes" que en Landbot, que publica sus reglas de coste extra de forma más simple.
- Créditos de "Copiloto de IA" limitados por plan (250 en Growth) — para un negocio con volumen medio de conversaciones asistidas por IA, puede agotarse antes de fin de mes; sin confirmar el coste de créditos extra.

## 14. Casos de uso
`[POR VERIFICAR]` con prueba real. La web menciona casos de uso de ecommerce (Shopify, carrito abandonado, catálogo) de forma más explícita que Landbot — sugiere mejor encaje declarado para tiendas online, a confirmar con prueba real.

## 15. Capturas
Se tomaron capturas de las páginas públicas de precios (anual y mensual) — no del producto en uso. Disponibles para referencia si se necesitan al escribir la review, no sustituyen las capturas del producto real que pide el protocolo de testing.

## 16. Conclusión
No hay conclusión de uso real todavía. Lo único que se puede concluir con lo verificado hoy: Wati es más caro en su plan de entrada que Landbot en euros/mes (59-69€ vs. 0€ del plan Free de Landbot, o 32-40€ del Starter), pero a cambio incluye WhatsApp real con número propio **desde el primer plan de pago** — a diferencia de Landbot, donde WhatsApp con número propio exige Professional (80-100€/mes). Para quien quiere WhatsApp real cuanto antes sin subir de plan más adelante, Wati Growth (59-69€/mes) puede salir más barato que Landbot Professional (80-100€/mes) — cálculo a confirmar con prueba real y con el coste variable de plantillas que Wati no incluye en la cuota fija.

## 17. Tipo de negocio para el que la recomendarías
`[POR VERIFICAR]` con prueba real — razonado provisionalmente: negocios que ya saben que quieren WhatsApp como canal principal desde el primer día y no necesitan más de 3 usuarios en el equipo (el límite duro de Growth).

## 18. Tipo de negocio para el que NO la recomendarías
`[POR VERIFICAR]` con prueba real — razonado provisionalmente: equipos de 4+ personas que empiecen ajustados de presupuesto (el salto de Growth a Pro es grande, +60-80€/mes), o negocios que necesiten estimar un coste mensual fijo y predecible sin sorpresas de plantillas/mensajes variables.

---

**Próximo paso real:** para completar este documento hace falta que tú (u otra persona autorizada) cree la cuenta de prueba de 7 días de Wati y ejecute el protocolo de `research/whatsapp-ia-tools/testing-wati.md` — yo puedo guiar el proceso paso a paso en el momento, o trabajar con las capturas/notas que traigas.
