# Protocolo de testing — Hostinger AI Website Builder vs. 10Web

Estado: **plantilla lista para ejecutar. Ninguna prueba real se ha realizado todavía.** Nada de lo que aparece en las secciones "Resultados de nuestra prueba" es un dato — son casillas vacías a rellenar cuando alguien haga la prueba de verdad. No se ha escrito ninguna review ni publicado nada.

**Regla de este documento (y de todo lo que salga de él):** cada dato lleva una etiqueta.
- 🔵 **OFICIAL** = viene de la web/documentación del fabricante o de prensa especializada que lo cita con fecha. Se puede rellenar ya, con fuente y fecha de consulta.
- 🟡 **PRUEBA PROPIA (pendiente)** = solo se rellena tras usar la herramienta de verdad. Vacío hasta entonces.

---

## 1. Caso de prueba estándar (idéntico en ambas herramientas)

Para que la comparación sea justa, ambas herramientas se prueban con **el mismo negocio ficticio** y el mismo prompt/descripción inicial:

> **Negocio de prueba:** "Vela de Ánimo" — tienda online de velas aromáticas artesanales hechas a mano en España. Catálogo de 8-10 productos, envío a toda España, tono cercano/artesanal. (Ejemplo neutro, no ligado a ningún nicho ya descartado en la investigación.)

- Mismo texto de descripción del negocio al pedirle a la IA que genere el sitio (copiar y pegar literalmente el mismo prompt en las dos herramientas).
- Mismo dispositivo, mismo navegador, misma conexión — para que los tiempos sean comparables.
- Cuenta nueva en ambas (sin historial previo que pueda sesgar sugerencias de la IA).
- Cronómetro en marcha desde el clic en "crear con IA" hasta tener una web publicable (con las páginas mínimas: inicio, catálogo/tienda, contacto).

## 2. Protocolo paso a paso (idéntico en ambas herramientas)

1. Registro de cuenta nueva → cronómetro **START**.
2. Generación inicial con IA usando el prompt del negocio de prueba → captura de pantalla del resultado **sin editar nada**.
3. Revisión de qué páginas/secciones crea automáticamente.
4. Edición mínima viable: cambiar un texto, una imagen y un color/fuente → cronometrar cuánto se tarda en cada acción.
5. Intentar añadir 3 productos al catálogo (si aplica) → cronometrar.
6. Revisar el resultado en móvil (emulador o dispositivo real) → captura.
7. Comprobar qué aparece bloqueado por el plan gratuito/de prueba (marca de agua, límite de productos, dominio propio, etc.).
8. Intentar conectar un dominio (aunque sea de prueba) → anotar el proceso y si exige pago.
9. Revisar ajustes de SEO básico que ofrece la herramienta (title, meta description, sitemap) → captura.
10. Publicar la web de prueba → cronómetro **STOP**.
11. Pasar la URL resultante por PageSpeed Insights (Core Web Vitals) → captura del resultado.
12. Rellenar el scorecard (sección 4) inmediatamente después, mientras la experiencia está fresca.

## 3. Ficha por herramienta

### 🅰️ Hostinger AI Website Builder

**🔵 Información oficial (verificada, sep-2026)**
| Campo | Dato |
|---|---|
| Precio y planes | Premium desde 2,99 $/mes (contrato de 4 años) o 11,99 $/mes mes a mes; renovación tras 48 meses a 10,99 $/mes. "Hostinger Horizons" (herramienta de código con IA, producto distinto) desde 6,99 $/mes (1 año) o 9,99 $/mes mes a mes. ([tech.co](https://tech.co/website-builders/hostinger-website-builder-pricing), [tooltester.com](https://www.tooltester.com/en/reviews/hostinger-website-builder-review/)) |
| Qué incluye el precio | Web generada con IA + hosting + dominio gratis el primer año + certificado SSL. Dominio gratis solo el primer año; si se agotan los créditos de IA, hay que pagar más. ([tech.co](https://tech.co/website-builders/hostinger-website-builder-pricing)) |
| Prueba gratuita | 7 días, sin necesidad de tarjeta. ([bestaito.com](https://bestaito.com/tool/hostinger-ai-website-builder/)) |
| Funciones de IA | Generación de sitio completo (contenido, imágenes, tipografías, colores) en ~30s; AI Logo Maker; AI Writer (copy con enfoque SEO); AI Heatmap (análisis de comportamiento del visitante); editor visual drag-and-drop. ([nocodehackers.es](https://www.nocodehackers.es/herramientas-no-code/hostinger)) |
| Ecommerce | Catálogo de hasta 500 productos, inventario, pedidos, pasarelas de pago integradas. ([nocodehackers.es](https://www.nocodehackers.es/herramientas-no-code/hostinger)) |
| Afiliación | ✓ Verificado en investigación previa (`research/ranking-monetizacion.md`): 40-60% de comisión en el producto de IA, cookie 30 días. |

**🟡 Resultados de nuestra prueba (pendiente — rellenar tras ejecutar el protocolo)**
- [ ] Tiempo real hasta web publicable: _____
- [ ] Calidad del resultado inicial sin editar (1-5): _____
- [ ] Facilidad de uso real (1-5): _____
- [ ] Nivel de personalización real conseguido: _____
- [ ] SEO on-page real (qué se pudo/no se pudo editar): _____
- [ ] Resultado responsive/móvil real: _____
- [ ] Integraciones que realmente funcionaron: _____
- [ ] Qué quedó bloqueado por pago, en concreto: _____
- [ ] Problemas/errores encontrados: _____
- [ ] Qué es realmente usable sin conocimientos técnicos (honesto): _____
- [ ] Resultado de Core Web Vitals / PageSpeed: _____

**Capturas a tomar:** resultado inicial sin editar · panel de edición · vista móvil · pantalla de precios/planes en el momento de la prueba · aviso de límite del plan gratuito · resultado de PageSpeed.

---

### 🅱️ 10Web

**🔵 Información oficial (verificada, sep-2026)**
| Campo | Dato |
|---|---|
| Precio y planes | AI Starter ~10 $/mes (anual, 1 web, ~10.000 visitas/mes); AI Premium ~24 $/mes (3 webs, ~50.000 visitas/mes); AI Ultimate ~60 $/mes (10 webs, ~150.000 visitas/mes). Pago mensual disponible; anual ahorra hasta 50%. ([kleap.co](https://kleap.co/blog/10web-ai-pricing), [capterra.com](https://www.capterra.com/p/186678/10Web/pricing/)) |
| Qué incluye el precio | SSL gratis, migración de sitio, optimización de PageSpeed 90+, soporte 24/7, hosting WordPress gestionado sobre infraestructura de Google Cloud, CDN, staging, backups. Garantía de devolución de 30 días en planes de pago. ([scribehow.com](https://scribehow.com/page/10Web_Pricing_Plans_2026_Full_Breakdown_of_Every_Plan_and_Which_One_Is_Actually_Worth_It__pPHAETFcRT-iVYlt5uYFFQ)) |
| Prueba gratuita | 7 días en todos los planes; la generación inicial del sitio con IA es gratis y no pide datos de pago para ver el resultado antes de decidir. ([kleap.co](https://kleap.co/blog/10web-ai-pricing)) |
| Funciones de IA | IA propia que combina modelos de OpenAI, Gemini y Anthropic para generar un sitio WordPress completo (varias páginas, imágenes, textos) a partir de una descripción del negocio; optimización SEO automática; sitio entregado como WordPress real (editable con plugins estándar). ([rovela.ai](https://rovela.ai/blog/10web-ai-website-builder-review), [aitools.aiting.com](https://aitools.aiting.com/ai/10web)) |
| Afiliación | ✓ Verificado en investigación previa: 30% de comisión recurrente durante 12 meses. |

**🟡 Resultados de nuestra prueba (pendiente — rellenar tras ejecutar el protocolo)**
- [ ] Tiempo real hasta web publicable: _____
- [ ] Calidad del resultado inicial sin editar (1-5): _____
- [ ] Facilidad de uso real (1-5): _____
- [ ] Nivel de personalización real conseguido: _____
- [ ] SEO on-page real (qué se pudo/no se pudo editar): _____
- [ ] Resultado responsive/móvil real: _____
- [ ] Integraciones que realmente funcionaron (al ser WordPress real, en teoría cualquier plugin — verificar en la práctica): _____
- [ ] Qué quedó bloqueado por pago, en concreto: _____
- [ ] Problemas/errores encontrados: _____
- [ ] Qué es realmente usable sin conocimientos técnicos (honesto): _____
- [ ] Resultado de Core Web Vitals / PageSpeed: _____

**Capturas a tomar:** mismas que Hostinger, + pantalla del panel de WordPress de fondo (diferenciador clave frente a Hostinger, que no es WordPress).

---

## 4. Scorecard común (rellenar igual para las dos, mismo día, mismo evaluador)

| Criterio | Peso | Hostinger AI Builder | 10Web |
|---|---|---|---|
| Velocidad hasta web publicable | 15% | ___ /5 | ___ /5 |
| Calidad del resultado inicial sin editar | 20% | ___ /5 | ___ /5 |
| Facilidad de uso | 15% | ___ /5 | ___ /5 |
| Personalización real | 15% | ___ /5 | ___ /5 |
| SEO out-of-the-box | 10% | ___ /5 | ___ /5 |
| Responsive/móvil | 10% | ___ /5 | ___ /5 |
| Integraciones reales | 5% | ___ /5 | ___ /5 |
| Relación calidad-precio | 10% | ___ /5 | ___ /5 |
| **Total ponderado** | 100% | ___ /5 | ___ /5 |

Instrucciones para que el scorecard sea comparable de verdad:
- Puntuar las dos herramientas el mismo día, en la misma sesión, para evitar que el criterio del evaluador "se mueva" entre una y otra.
- No puntuar por lo que dice el marketing de la herramienta — solo por lo observado en el paso 2 (protocolo).
- Si un criterio no se pudo probar (p. ej. el plan gratuito no permite conectar dominio), anotar "no probado en plan gratuito" en vez de inventar una puntuación.

## 5. Qué alimenta esto una vez completado
Los resultados de este protocolo son el input directo de las piezas 1, 2 y 4 del mapa editorial (`content/pilar-crear-tienda-web-ia.md`): review de Hostinger, review de 10Web, y la comparativa "Hostinger AI Builder vs. 10Web". Ninguna de esas piezas se escribe hasta que las casillas 🟡 de este documento estén rellenas con datos reales.

## 6. Próximas herramientas (misma plantilla, más adelante)
Wix ADI, Durable AI y Shopify seguirán esta misma estructura de ficha cuando les toque en el orden del mapa editorial — no se preparan todavía para no adelantar trabajo que aún no toca.
