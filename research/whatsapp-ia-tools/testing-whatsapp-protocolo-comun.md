# Protocolo común de testing — herramientas de WhatsApp + IA

Estado: **metodología compartida, lista para ejecutar. Ninguna prueba real se ha realizado todavía.** Este documento define UNA VEZ el negocio de prueba, los 16 pasos reproducibles y las plantillas comunes (scorecard, checklist de evidencias). Cada herramienta tiene su propia ficha (`testing-<herramienta>.md`) que reutiliza esta misma estructura para que los resultados sean comparables entre sí — no se repite aquí el texto completo en cada ficha, solo los resultados.

**No sustituye ni rompe `research/testing-protocol.md`** (protocolo del pilar archivado "website builders con IA", Hostinger vs. 10Web) — es un protocolo nuevo y paralelo, para el pilar activo WhatsApp + IA.

---

## Negocio de prueba (idéntico en las 7 fichas)

> **"Clínica Dental Sonrisa"** — clínica dental ficticia en España.

**Objetivos que el agente/chatbot debe intentar cumplir en la prueba** (los mismos en las 7 herramientas):
1. Recibir consultas por WhatsApp.
2. Responder preguntas frecuentes (horario, si atienden urgencias, si aceptan un seguro concreto, precio orientativo de una limpieza dental, ubicación).
3. Captar nombre y teléfono del contacto.
4. Identificar el motivo de consulta (revisión, urgencia, estética, ortodoncia...).
5. Cualificar al potencial paciente (¿paciente nuevo o ya registrado?, ¿tiene seguro?, ¿es urgente?).
6. Gestionar una solicitud de cita (proponer horario, confirmar).
7. Derivar a una persona cuando el caso lo requiera (urgencia real o pregunta fuera de guion).
8. Hacer seguimiento cuando corresponda (recordatorio de cita, aviso de no-show).

---

## Los 16 pasos (definición común — no se repite en cada ficha, se referencia por número)

| # | Paso | Acción | Tiempo objetivo | Qué observar | Qué registrar | Resultado esperado |
|---|---|---|---|---|---|---|
| 1 | Registro | Crear cuenta nueva con email dedicado a pruebas | &lt;5 min | Si pide tarjeta, si pide verificación, si hay onboarding guiado | Campos pedidos, si exige nº de teléfono real | Cuenta activa sin fricción bloqueante |
| 2 | Configuración inicial | Completar el wizard/onboarding inicial (nombre de negocio, sector, idioma) | 5-10 min | Si detecta que es una clínica dental o hay que indicarlo manualmente | Capturas del wizard | Espacio de trabajo listo para configurar el agente |
| 3 | Creación del negocio | Introducir los datos de "Clínica Dental Sonrisa" (horario, servicios, ubicación ficticia, precios orientativos) | 10-15 min | Si permite subir un documento/FAQ para entrenar la IA o hay que escribirlo a mano | Método de carga de información | La IA "conoce" los datos básicos del negocio |
| 4 | Conexión de WhatsApp | Conectar un número de WhatsApp Business (usar "Coexistence" si está disponible, evita SIM nueva) | 15-30 min (según verificación Meta) | Si exige Meta Business Manager, si pide tarjeta aquí, tiempo real de verificación | Proceso exacto, documentos pedidos | Número conectado y probado con un mensaje de ida y vuelta |
| 5 | Creación del agente/chatbot | Configurar el flujo o agente de IA principal de atención | 20-40 min | Si es árbol de reglas o IA generativa real que interpreta lenguaje libre | Capturas del editor, tipo de motor de IA si lo indica | El agente responde a un saludo inicial de forma coherente |
| 6 | Preguntas frecuentes | Cargar 5 FAQ típicas de clínica dental (horario, urgencias, seguro X, precio limpieza, ubicación) | 15-20 min | Si responde con precisión o inventa datos no cargados (alucinación) | Las 5 preguntas exactas y la respuesta literal obtenida | Respuestas correctas a las 5, sin inventar datos |
| 7 | Captación de lead | Simular conversación de paciente nuevo preguntando por un servicio; comprobar si pide/registra nombre y teléfono | 10 min | En qué punto de la conversación pide los datos, si quedan guardados y localizables | Captura del dato capturado en el panel/CRM | Nombre y teléfono quedan registrados y localizables |
| 8 | Cualificación | Simular 2 conversaciones (paciente nuevo sin urgencia vs. urgencia real) | 15 min | Si hay lógica de cualificación real (preguntas de descarte) o es plano | Respuestas del bot a cada escenario | Al menos una distinción básica urgencia vs. no urgencia |
| 9 | Flujo de cita | Simular una solicitud de cita hasta el final (proponer horario, confirmar) | 15-20 min | Si conecta con calendario real o solo "apunta" el interés | Si hubo integración de calendario disponible y probada | Cita simulada registrada de forma verificable |
| 10 | Derivación a humano | Forzar una pregunta fuera de guion o urgencia explícita | 10 min | Si existe opción "hablar con una persona" y cómo se activa | Mecanismo exacto de derivación | Existe una vía de escape a humano, documentada |
| 11 | Automatizaciones | Configurar un recordatorio de cita o mensaje de seguimiento post-conversación | 15-20 min | Si permite automatizaciones por tiempo/evento sin código | Qué disparadores (triggers) están disponibles | Al menos una automatización simple configurada y probada |
| 12 | Integraciones relevantes | Revisar (e intentar conectar si es viable sin coste) Google Calendar, Shopify, CRM externo | 15-20 min | Cuáles funcionan de verdad vs. solo aparecen en marketing | Lista de integraciones probadas vs. solo anunciadas | Claridad sobre qué integraciones son reales y usables en el plan probado |
| 13 | Analítica | Revisar el panel de métricas del plan probado | 10 min | Qué métricas ofrece (conversaciones, leads, tasa de respuesta) y si están en el plan gratuito/prueba | Capturas del panel | Al menos métricas básicas de conversaciones visibles |
| 14 | Costes | Repasar la pantalla de precios/planes real dentro del panel (no la web de marketing) | 15 min | Costes ocultos (mensajes de WhatsApp aparte, límite de contactos, coste por conversación de IA) | Captura de la pantalla de precios real vista dentro del producto | Coste mensual estimado realista para ~200 conversaciones/mes |
| 15 | Conversaciones completas | Ejecutar de principio a fin las 8-10 conversaciones simuladas en los pasos 7-10 | 20-30 min | Consistencia entre conversaciones, tiempo de respuesta real | Transcripción o captura de cada conversación completa | Al menos 8 conversaciones completas documentadas |
| 16 | Consolidación de problemas | Reunir todos los problemas/bloqueos de los pasos 1-15 | 15 min | Si los problemas fueron de configuración, de calidad de IA, o ambos | Lista final de limitaciones, separando "del plan gratuito/prueba" vs. "del producto en cualquier plan" | Lista cerrada y priorizada de limitaciones reales |

---

## Checklist de evidencias (plantilla común, vacía)
- [ ] Captura: pantalla de registro/onboarding
- [ ] Captura: conexión de WhatsApp (paso de verificación Meta)
- [ ] Captura: editor del agente/flujo
- [ ] Captura: las 5 respuestas a FAQ (texto literal)
- [ ] Captura: dato de lead capturado (nombre+teléfono) en el panel
- [ ] Captura: las 2 conversaciones de cualificación
- [ ] Captura: cita simulada registrada
- [ ] Captura: mecanismo de derivación a humano
- [ ] Captura: automatización configurada
- [ ] Captura: panel de integraciones (reales vs. anunciadas)
- [ ] Captura: panel de analítica
- [ ] Captura: pantalla de precios real dentro del producto (no la web de marketing)
- [ ] Precio verificado y fecha de comprobación
- [ ] Funciones confirmadas de primera mano vs. solo marketing del proveedor
- [ ] Limitaciones del plan gratuito/prueba, documentadas por separado de las del producto en general
- [ ] Costes adicionales identificados (mensajes, contactos, conversaciones IA de más)
- [ ] Notas cualitativas de experiencia de uso (perspectiva de usuario no técnico)

## Scorecard común (plantilla, sin puntuar todavía)
| Criterio | Peso | Puntuación (1-5) |
|---|---|---|
| Facilidad de uso | 10% | ___ |
| Configuración (rapidez/claridad del setup) | 8% | ___ |
| IA (comprensión real de lenguaje libre, no solo botones) | 20% | ___ |
| WhatsApp (estabilidad/calidad de la integración del canal) | 8% | ___ |
| Automatización (citas, recordatorios, triggers) | 12% | ___ |
| Captación y cualificación de leads | 15% | ___ |
| Integraciones (reales, no solo anunciadas) | 7% | ___ |
| Experiencia para una pyme sin conocimientos técnicos | 5% | ___ |
| Precio / relación calidad-precio | 10% | ___ |
| Limitaciones (invertido: menos limitaciones = más puntos) | 3% | ___ |
| Potencial real para "Clínica Dental Sonrisa" | 2% | ___ |
| **Total ponderado** | 100% | ___ /5 |

Instrucción: puntuar todas las herramientas el mismo día/sesión si es posible, y solo sobre lo observado en la prueba — nunca sobre lo que promete el marketing del proveedor.

## Distinguir marketing del proveedor vs. lo comprobado
Cada ficha de herramienta separa explícitamente:
- **Lo que dice el proveedor** (su web/marketing) — se cita con fuente y fecha, nunca se da por hecho.
- **Lo que comprobamos nosotros** — solo se rellena tras ejecutar los 16 pasos, nunca antes.

## Índice de fichas por herramienta
| Prioridad | Herramienta | Archivo | Estado |
|---|---|---|---|
| 🔥 Bloque 1 | Landbot | `testing-landbot.md` | Protocolo listo, prueba pendiente |
| 🔥 Bloque 1 | Wati | `testing-wati.md` | Protocolo listo, prueba pendiente |
| 🟢 Bloque 2 | Cliengo | `testing-cliengo.md` | Protocolo listo, prueba pendiente |
| 🟢 Bloque 2 | Ona.chat | `testing-ona-chat.md` | Protocolo listo, prueba pendiente |
| 🟡 Bloque 3 | ManyChat | `testing-manychat.md` | Protocolo listo, prueba pendiente |
| ⚪ Reserva | Tidio | `testing-tidio.md` | Protocolo listo, no priorizado |
| ⚪ Reserva | Trengo | `testing-trengo.md` | Protocolo listo, no priorizado |
