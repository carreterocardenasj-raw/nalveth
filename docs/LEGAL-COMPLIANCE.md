# NALVETH — Cumplimiento legal, privacidad, cookies y CMP (Fase 1 + 1B)

Ejecutado el 16/09/2026, por encargo directo del usuario ("FASE 1: CIERRE LEGAL + PRIVACIDAD + COOKIES + CMP"), con prioridad sobre cualquier expansión de contenido y sin tocar los 4 territorios editoriales existentes. Este documento recoge primero la auditoría de qué existía, y después las decisiones y cambios aplicados.

**Actualización, mismo día (16/09/2026):** el usuario facilitó los datos reales de identidad del titular, pendientes en la primera versión de este documento — ver sección 2, ahora marcada como completa.

**Actualización — Fase 1B, mismo día (16/09/2026):** encargo específico de resolver la capa de CMP/consentimiento ("FASE 1B: CMP Y CONSENTIMIENTO"). Se verificó en vivo el registro oficial de CMPs de IAB Europe (no solo fuentes secundarias), se eligió una CMP principal y una alternativa, y se implementó todo lo que no requiere crear una cuenta de terceros. Ver secciones 5 a 7B (reescritas) y la nueva sección 12.

## 1. Auditoría inicial (estado antes de esta fase)

Verificado directamente sobre el código fuente el 16/09/2026, no sobre suposiciones:

- **Páginas legales existentes**: `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/contacto/`, `/sobre-nalveth/` — las 5 ya existían como páginas reales, pero `aviso-legal.astro`, `privacidad.astro` y `cookies.astro` eran esqueletos con texto `[PLACEHOLDER — ...]` en cada sección, explícitamente marcados como "no un documento legal válido". `contacto.astro` tenía el correo y la dirección postal como `[PLACEHOLDER]`. `sobre-nalveth.astro` tenía contenido real salvo la sección "Quiénes somos" (`[PLACEHOLDER]`).
- **Scripts, analítica, AdSense, CMP**: barrido completo de `src/` (`grep` de `gtag|google-analytics|googletagmanager|adsbygoogle|analytics|consent|cookiebot|onetrust|didomi|quantcast|iubenda|usercentrics|tcf|gdpr`) — el único archivo con coincidencias era el propio `cookies.astro`, en su texto placeholder. `package.json` solo tiene `astro` y `@astrojs/sitemap` como dependencias — ninguna librería de analítica, consentimiento o publicidad instalada. `astro.config.mjs` no cargaba ninguna integración de este tipo. `BaseLayout.astro` no insertaba ningún `<script>` de terceros.
- **Único recurso externo real**: la hoja de estilos de Google Fonts (`fonts.googleapis.com`, que a su vez sirve los archivos de fuente desde `fonts.gstatic.com`), cargada vía `@import` en `src/styles/global.css`. Verificado también en el build de producción: es la única URL externa que aparece en el CSS compilado (`dist/_astro/*.css`) y no hay ningún `<script src="https://...">` ni `<link>` externo en el HTML generado. Este recurso no instala ninguna cookie, pero sí implica una petición técnica a servidores de Google (transferencia de IP) — documentado en la política de privacidad y de cookies.
- **CMP real**: no existía ninguna, ni siquiera parcial — solo el texto placeholder mencionado.
- **Integración de AdSense**: no existe ninguna, ni preparada ni activa. `sobre-nalveth.astro` y `politica-editorial.astro` mencionaban "Google AdSense" únicamente como parte del modelo de negocio futuro, en prosa, sin ningún script.
- **Footer**: ya incluía enlaces a las 5 páginas legales/institucionales (`Sobre NALVETH`, `Política editorial`, `Contacto`, `Privacidad`, `Cookies`, `Aviso legal`) en todas las páginas del sitio, vía `Footer.astro` importado desde `BaseLayout.astro` — accesible desde cualquier página, ya antes de esta fase.
- **Claims transversales de riesgo**: `sobre-nalveth.astro` afirmaba "Probamos herramientas... siempre que es posible" con una redacción que, combinada con `politica-editorial.astro`, podía leerse como que todo el contenido pasa por prueba real — cuando en la práctica casi todas las piezas publicadas tienen `testedFirsthand: false` (ver `docs/DECISIONS.md`). `ReviewLayout.astro` ya mostraba el badge "Probado de primera mano" de forma condicional a `testedFirsthand`, sin falsos positivos — no requería cambio.

## 2. Datos del titular

**Estado: completo desde el 16/09/2026.** El usuario facilitó los 7 datos de identidad personal que faltaban, y se han incorporado a la única fuente de verdad para estos datos: [`src/data/legal.ts`](../src/data/legal.ts), constante `TITULAR`:

- **Nombre:** Jonathan Carretero Cardenas
- **NIF:** 77181910M
- **Domicilio:** Santa Magdalena, Alhaurín de la Torre, Málaga, 29130, España
- **Correo de contacto:** `carreterocardenasj@gmail.com` (mismo ya documentado como identidad del proyecto en `docs/DECISIONS.md`, entrada 2026-09-14 — no se ha creado ni comprado ningún correo `@nalveth.com`)
- **Teléfono público:** no se publica, por instrucción explícita del titular

`TITULAR.nombre`, `.nif`, `.domicilio`, `.localidad`, `.provincia`, `.codigoPostal`, `.pais` y `.email` se usan en `aviso-legal.astro`, `privacidad.astro`, `contacto.astro` y `sobre-nalveth.astro` — todas leen del mismo objeto, así que los datos son consistentes por construcción entre las 4 páginas. La constante `TITULAR_COMPLETO` es ahora `true`, por lo que los avisos de "borrador pendiente de datos" que existían en `/aviso-legal/` y `/privacidad/` ya no se renderizan (el código que los muestra se ha dejado en su sitio, inerte, como salvaguarda si `legal.ts` volviera a quedar incompleto en el futuro).

La sección 7 del aviso legal ("Legislación aplicable") se actualizó para indicar el fuero concreto (Juzgados y Tribunales de Málaga, correspondiente al domicilio del titular) ahora que el domicilio es un dato real, en vez de dejarlo pendiente. La sección "Quiénes somos" de `/sobre-nalveth/` ahora nombra al titular, sin inventar biografía ni foto (esos dos datos no se pidieron ni se han facilitado, y no se han inventado).

**No se ha añadido ningún dato no facilitado explícitamente**: sin CNAE, sin epígrafe IAE, sin forma societaria, sin actividad de VTC del titular, sin teléfono.

## 3. Actividad económica declarada

Se usa la formulación prudente pedida por el encargo, sin CNAE ni epígrafe fiscal inventado:

> Publicación y explotación de un sitio web de contenidos y recursos sobre inteligencia artificial, software, herramientas digitales y estrategias para negocios.

No se menciona ninguna otra actividad del titular. Vive en `ACTIVIDAD` dentro de `src/data/legal.ts`.

## 4. Páginas legales — qué cambió

- **`/aviso-legal/`**: reescrita con contenido real y profesional (no placeholder de sección): datos identificativos (desde `legal.ts`), condiciones de uso, propiedad intelectual, limitación de responsabilidad, enlaces externos, modificación de contenidos, legislación aplicable. La jurisdicción/fuero concretos quedan pendientes del domicilio del titular (no se inventa); se afirma que la LSSI-CE y el RGPD/LOPDGDD aplican porque el sitio y su actividad están dirigidos a España — esto es una descripción del propio sitio, no un dato personal del titular. `noindex` aplicado (ver sección 8).
- **`/privacidad/`**: reescrita para describir **solo lo que el sitio hace realmente hoy** (datos técnicos de navegación + correos que el visitante envía voluntariamente) — no se afirma recogida de datos vía formularios, cuentas, newsletter o comentarios, porque no existen. Incluye una sección explícita de que AdSense y la analítica todavía no están activos, y que esta política se actualizará antes de activarlos. `noindex` aplicado.
- **`/cookies/`**: reescrita a partir de un inventario real (sección 1 de este documento) — la tabla muestra explícitamente "No activa" para preferencias, analítica y publicidad, y solo declara activo el recurso técnico de Google Fonts (que no es una cookie). Explica qué categorías se activarán cuando AdSense/analítica entren en producción, y que ningún dato se dará por consentido por el mero hecho de navegar. `noindex` aplicado.
- **`/contacto/`**: ya no tiene placeholders — muestra el correo real (`legal.ts`) y, si el domicilio postal sigue pendiente, lo indica sin inventarlo. No se ha creado ningún formulario (no hacía falta, y el encargo pedía explícitamente no inventarlo).
- **`/sobre-nalveth/`**: corregido el claim de "probamos siempre que es posible" de forma indiscriminada — ahora distingue explícitamente análisis de fuentes oficiales vs. prueba real, y aclara que Google AdSense todavía no está activo en el sitio (antes se mencionaba como si ya lo estuviera formando parte del modelo de financiación actual). La sección "Quiénes somos" mantiene el marcador de dato pendiente, sin inventar biografía.

## 5. CMP — investigación (Fase 1B, verificada en vivo el 16/09/2026)

### Verificación directa en el registro oficial de IAB Europe

En vez de fiarme de blogs de terceros sobre "quién está certificado", se navegó directamente el registro público de CMPs de IAB Europe ([iabeurope.eu/cmp-list/](https://iabeurope.eu/cmp-list/), 193 entradas en la fecha de consulta) y se confirmaron con ID exacto las entradas relevantes:

| CMP ID (IAB Europe) | Nombre registrado | Website |
|---|---|---|
| **300** | Google LLC | fundingchoices.google.com |
| **10** | InMobi PTE Ltd | www.inmobi.com |
| 401 | CookieYes Limited | www.cookieyes.com |

(Nota técnica sobre el proceso: el cuadro de búsqueda en vivo de esa página dio falsos negativos intermitentes — p. ej. no encontró "Clickio" con la búsqueda aunque esa entrada es visible en el listado sin filtrar — así que las tres filas de arriba se confirmaron paginando el listado completo sin filtrar, no solo con la búsqueda, para no dar por buena una ausencia que en realidad era un fallo del buscador de esa web.)

### Opción principal: InMobi CMP

| Campo | Detalle |
|---|---|
| Nombre | InMobi CMP (antes Quantcast Choice — InMobi adquirió Quantcast Choice y mantiene su disponibilidad gratuita) |
| Certificación Google | Sí — CMP certificada por Google |
| CMP ID (IAB Europe) | **10** — verificado directamente en iabeurope.eu/cmp-list/ el 16/09/2026 |
| TCF | IAB TCF v2.3 |
| Precio | **Gratis** — alta confirmada como gratuita en la propia documentación de InMobi ("To sign up to InMobi CMP for free..."), sin tarjeta de pago en el registro |
| Límites del plan gratuito | TCF y el soporte de regulaciones (GDPR, CCPA, etc.) aparecen como funciones base, no bajo "InMobi CMP Premium" (el nivel de pago, orientado a volumen/funciones avanzadas) — pero el límite exacto de páginas vistas o propiedades del plan gratuito no se ha podido confirmar en texto navegable sin iniciar sesión; `[POR VERIFICAR]` en el momento del alta. |
| Compatibilidad con Astro (sitio estático) | Sí — se integra con un único `<script>` asíncrono en el `<head>`, sin necesidad de servidor ni backend. Confirmado en la documentación oficial ("Implementing Web SDK": "copy and paste the complete tag into your site's header"). |
| Dificultad de integración | Baja — un solo script, sin modificar, generado desde el portal tras añadir el dominio. |
| Requisitos | Crear cuenta gratuita en choice.inmobi.com (email + contraseña), añadir el sitio (nalveth.com) como "property", configurar el banner (textos, categorías, vendors) y copiar el "Web Tag" generado. |
| ¿Sirve para AdSense? | Sí — está pensada específicamente para publishers con monetización publicitaria y soporta el requisito de consentimiento de Google para EEE/Reino Unido/Suiza. |
| Inconvenientes | Empresa menos conocida por el público general que Google; el límite exacto del plan gratuito no es públicamente transparente sin crear la cuenta; existe un nivel "Premium" de pago cuyas condiciones tampoco son públicas sin darse de alta (irrelevante mientras el plan gratuito baste). |

### Alternativa: Google LLC — "Privacidad y mensajes" (antes Funding Choices)

| Campo | Detalle |
|---|---|
| Nombre | Google LLC — CMP propia integrada en AdSense/Ad Manager, con el nombre visible "Privacidad y mensajes" |
| Certificación Google | Es la propia CMP de Google — no aplica "certificación de terceros", es la referencia |
| CMP ID (IAB Europe) | **300** — verificado directamente en iabeurope.eu/cmp-list/ el 16/09/2026 |
| TCF | IAB TCF, con soporte confirmado de Consent Mode |
| Precio | Gratis |
| Límites | Ninguno relevante para un sitio del tamaño de NALVETH |
| Compatibilidad con Astro | Sí, igual mecánica (script en `<head>`) — sin necesidad de servidor |
| Dificultad de integración | Baja, y menor aún que InMobi porque no añade un proveedor externo — un vendor menos que gestionar |
| Requisitos | **Tener una cuenta de AdSense con el sitio añadido y la revisión del sitio solicitada** — es decir, depende de iniciar el alta de AdSense, que el encargo pide explícitamente no hacer todavía |
| ¿Sirve para AdSense? | Es la propia CMP de AdSense — encaje perfecto por definición |
| Inconvenientes | **No accionable en esta fase**: no se puede generar el mensaje de consentimiento sin antes iniciar el proceso de alta de AdSense. Queda como la opción natural para cuando se solicite AdSense, no como algo a implementar ahora. |

Fuentes: [registro CMP de IAB Europe](https://iabeurope.eu/cmp-list/) (verificación directa en navegador), [documentación de alta de InMobi CMP](https://support.inmobi.com/choice) (Getting Started → Sign Up, y CMP Integration → Web → Implementing Web SDK), [Google AdSense Help — requisitos de gestión del consentimiento](https://support.google.com/adsense/answer/13554116), [cómo funciona la CMP de Google](https://support.google.com/adsense/answer/16918505).

**CookieYes (CMP ID 401) descartada como alternativa gratuita**: es una CMP certificada real (confirmada en el registro), pero su plan gratuito no incluye IAB TCF — el soporte de TCF v2.3 exige su plan Pro (25$/mes/dominio), y el encargo pide explícitamente no contratar nada de pago.

### Por qué no se ha activado ninguna CMP todavía

Activar cualquiera de las dos opciones anteriores requiere **crear una cuenta en un servicio de terceros** (choice.inmobi.com, o la cuenta de AdSense para la opción de Google) para obtener el identificador de sitio y el "Web Tag"/snippet real. Tengo una restricción permanente de este proyecto: no creo cuentas en servicios de terceros, ni siquiera con autorización explícita — ya aplicada anteriormente a Landbot, Wati y a los programas de afiliados (ver `docs/DECISIONS.md`). Me detengo justo antes de ese paso — sección 12 explica exactamente qué falta y cómo hacerlo.

## 6. Comportamiento del consentimiento (especificación para configurar el banner real en InMobi)

Documentado aquí como criterio de aceptación que se debe verificar al configurar el banner dentro del portal de InMobi CMP (o de Google, si se opta por esa ruta más adelante) — ninguna de estas reglas depende de código de NALVETH, dependen de cómo se configure el banner en el portal de la CMP elegida:

- Tres opciones con visibilidad equivalente en la primera capa: **aceptar**, **rechazar**, **configurar preferencias** — ninguna preseleccionada visualmente por encima de las demás. InMobi permite configurar botones de Aceptar/Rechazar con el mismo estilo; **al configurar el banner, hay que revisar explícitamente que el tema elegido no dé más peso visual a "Aceptar" que a "Rechazar"** (algunos temas por defecto de CMPs sí lo hacen, y eso sería un patrón oscuro).
- Ningún cookie/tecnología no necesaria se carga antes de una acción explícita de consentimiento — hoy esto ya se cumple porque no hay ninguna cookie no necesaria en el sitio (ver sección 7A). El Web Tag de InMobi debe cargarse el primero de todos, antes que cualquier script de AdSense/analítica (ver comentario en `BaseLayout.astro`).
- Seguir navegando no equivale a consentimiento — comportamiento estándar de una CMP TCF, no requiere configuración especial.
- Debe existir una forma posterior de modificar o revocar el consentimiento: un enlace "Configurar cookies" visible en el footer y en `/cookies/`, que reabra el panel de preferencias de la CMP — pendiente de activar cuando el Web Tag esté instalado (la API estándar para reabrirlo es parte del propio SDK de InMobi).

## 7. Google AdSense — estado

No se ha integrado ningún script de AdSense ni se ha solicitado la cuenta, tal como pedía el encargo. `sobre-nalveth.astro` y `politica-editorial.astro` mencionan AdSense únicamente como parte futura del modelo de financiación, sin implicar que ya esté activo. El punto de integración en `BaseLayout.astro` queda preparado para cuando corresponda (sección 5).

## 7A. Qué se ha implementado en el código (Fase 1B)

Sin cuenta de CMP, esto es lo máximo implementable sin crear una cuenta de terceros:

- **`src/lib/consent.ts`** (nuevo): utilidad técnica que expone `onConsentChange()` y `loadWhenConsented()`, apoyadas en la API estándar `__tcfapi` que cualquier CMP certificada por Google e integrada con TCF (incluida InMobi) expone una vez instalada. **No es un banner** — no renderiza nada, no decide nada por sí sola. Es el punto único por el que cualquier script futuro de AdSense/analítica deberá pasar antes de cargar. Hoy, como no hay ninguna CMP instalada, `window.__tcfapi` no existe y estas funciones no hacen nada — la posición segura por defecto, y la correcta mientras no haya nada que activar.
- **`src/layouts/BaseLayout.astro`**: comentario ampliado en `<head>` con los pasos exactos de InMobi (crear cuenta → añadir sitio → copiar "Web Tag" desde el portal → pegar aquí, el primero de todos) y la referencia a `consent.ts` para cualquier script que dependa de consentimiento.
- **`src/pages/cookies.astro`**: sección 3 actualizada para nombrar la CMP elegida (InMobi CMP) en vez de hablar en abstracto de "una CMP certificada", sin implicar que ya esté activa.
- **Ningún banner "casero"** se ha construido como sustituto — el encargo lo prohíbe expresamente, y hoy no hay nada que ese banner necesitara bloquear (sección 7B confirma el barrido).

## 7B. Bloqueo de tecnologías no necesarias — reverificado

Repetido el barrido completo de la Fase 1, con el mismo resultado (nada ha cambiado desde entonces, salvo la incorporación de `consent.ts`, que no introduce cookies ni almacenamiento):

- **Cookies**: `grep` de `document.cookie` en todo `src/` → 0 resultados.
- **`localStorage` / `sessionStorage`**: `grep` en todo `src/` → 0 usos reales (la única aparición es la mención descriptiva dentro del propio texto de `/cookies/`).
- **Scripts externos**: barrido del HTML y CSS de `dist/` tras el build → la única URL externa en todo el sitio sigue siendo `fonts.googleapis.com` (Google Fonts); 0 `<script src="https://...">` de terceros.
- **AdSense / Analytics / Tag Manager / píxeles**: confirmado que ninguno está instalado ni referenciado como activo en ningún archivo de `src/`.

## 7C. Google Fonts — recomendación de autoalojar (no ejecutada)

El sitio carga `Newsreader`, `Public Sans` e `IBM Plex Mono` vía `@import url('https://fonts.googleapis.com/...')` en `src/styles/global.css`. Esto no instala ninguna cookie, pero sí genera una petición directa del navegador del visitante a servidores de Google (transferencia de IP), documentada en `/privacidad/` y `/cookies/`.

**Recomendación (solo documentada, no aplicada):** autoalojar los 3 archivos de fuente (`.woff2`) dentro de `public/fonts/` y sustituir el `@import` por `@font-face` locales eliminaría por completo esa dependencia de terceros — cero peticiones externas en toda la web salvo cuando se active AdSense/analítica en el futuro. Es una mejora real de privacidad y, además, de rendimiento (una conexión externa menos).

**Por qué no se ha hecho en esta fase:** descargar y servir los archivos de fuente correctos exige verificar los pesos y estilos exactos usados (`Newsreader:ital,wght@0,500;0,600;0,700;1,500`, etc.) para no romper el sistema de diseño, y es un cambio con superficie visual (tipografía en todo el sitio) que el encargo de esta fase pide explícitamente no ejecutar sin más ("NO hacer el cambio automáticamente si puede afectar al diseño. Solo documentar la recomendación"). Queda como mejora independiente, de bajo riesgo técnico pero con verificación visual propia, para un sprint futuro si se decide ejecutarla.

## 8. SEO de páginas legales

`aviso-legal.astro`, `privacidad.astro` y `cookies.astro` llevan ahora `noindex` (prop ya existente en `Seo.astro`, sin necesidad de tocar su código) y se excluyen del sitemap mediante un filtro añadido en `astro.config.mjs` (`NOINDEX_PATHS`) — así no compiten por indexación con el contenido editorial. `contacto.astro` y `sobre-nalveth.astro` se mantienen indexables: tienen valor informativo real y son señales de confianza (E-E-A-T) que Google y los revisores de AdSense esperan encontrar accesibles. Canonical y metadatos siguen generándose igual que en el resto del sitio, vía `Seo.astro` — sin cambios de arquitectura.

## 9. Test técnico realizado

- **Build de producción**: `npm run build` → **31 páginas, 0 errores** (verificado de nuevo tras los cambios de Fase 1B: `src/lib/consent.ts`, comentario de `BaseLayout.astro`, texto de `cookies.astro`).
- **Rutas**: mismas URLs que antes de esta fase — ninguna ha cambiado.
- **Enlaces legales**: 0 enlaces internos rotos en barrido completo de `dist/` (todas las rutas `href="/…/"` resuelven a un `index.html` real).
- **`noindex`/sitemap**: sin cambios respecto a la Fase 1 — `aviso-legal`, `privacidad`, `cookies` siguen `noindex` y fuera del sitemap; `contacto`/`sobre-nalveth` siguen indexables.
- **Scripts/cookies antes del consentimiento**: reverificado (sección 7B) — sigue sin haber ningún script publicitario o de analítica activo, ninguna cookie, ningún uso de `localStorage`/`sessionStorage`; único recurso externo, Google Fonts.
- **Comprobación visual**: no repetida en este pase (Fase 1B no toca ningún componente visual — `consent.ts` no renderiza nada, el único cambio de texto visible es una frase en `/cookies/` nombrando a InMobi CMP). La comprobación visual desktop/móvil de la Fase 1 sigue vigente porque el layout no ha cambiado.
- **Comportamiento del banner (primera visita, rechazo, aceptación, configuración, reapertura de preferencias)**: **no probado — sigue sin existir ningún banner que probar**, porque activarlo depende de la cuenta de CMP pendiente del titular (sección 12). Esto no es una omisión: es el estado correcto mientras esa cuenta no exista.

## 10. Acciones pendientes del titular

1. ~~Rellenar `src/data/legal.ts` con los datos reales de identidad~~ — **hecho el 16/09/2026** (sección 2).
2. ~~Confirmar el correo de contacto público~~ — **confirmado**: `carreterocardenasj@gmail.com`.
3. **Crear la cuenta de InMobi CMP y configurar el banner** — ver el paso a paso exacto en la sección 12. Es el único bloqueador real para tener consentimiento funcionando.
4. **Una vez exista la cuenta**, pegar el "Web Tag" de InMobi en el punto marcado en `src/layouts/BaseLayout.astro` (o pedírmelo, y yo lo pego una vez me facilites el snippet ya generado) y activar el enlace "Configurar cookies" en el footer y en `/cookies/`.
5. Confirmar proveedor de alojamiento/hosting de producción definitivo, para completar la sección "Destinatarios y proveedores" de `/privacidad/` (hoy marcada `[POR VERIFICAR]`).
6. Decidir si autoalojar Google Fonts (sección 7C) — mejora opcional, no bloqueante.

## 11. Riesgo/decisión que requiere tu confirmación explícita (me detengo aquí, no lo ejecuto)

**Ninguna de las dos opciones de CMP recomendadas (InMobi CMP, o Google integrado en AdSense) tiene coste.** No hay ninguna decisión de gasto pendiente. La única alternativa con coste identificada (CookieYes Pro, 25$/mes/dominio) **no la he contratado ni la recomiendo** — aparece solo porque surgió en la comparación, y su versión gratuita no sirve para este caso (sin TCF v2.3). Si prefirieras CookieYes de todos modos por algún motivo (interfaz, idioma, soporte), avísamelo antes de que nadie cree esa cuenta, porque esa sí sería una decisión de coste real que no he tomado por ti.

## 12. El único paso pendiente — qué tenéis que hacer vosotros, exactamente

No he creado ninguna cuenta externa, tal como exige la regla permanente del proyecto. Esto es literalmente todo lo que falta para tener InMobi CMP funcionando:

1. Ir a **choice.inmobi.com** y pulsar "Sign Up" — solo pide email y contraseña, sin tarjeta de pago.
2. Confirmar el email (llega un enlace de verificación) y establecer la contraseña.
3. Dentro del portal, añadir **nalveth.com** como sitio ("Protect A Site").
4. Configurar el banner: textos, categorías de cookies, y **revisar que "Aceptar" y "Rechazar" tengan el mismo peso visual** en el tema elegido (ver sección 6 — esto hay que comprobarlo a mano en el editor del tema, InMobi no lo garantiza por defecto).
5. Pulsar el botón **"Web Tag"** en la esquina superior derecha del portal — se abre un modal con el script completo, específico de vuestra cuenta y dominio.
6. Copiar ese script y pegarlo (o pasármelo para que lo pegue) en el punto ya marcado en `src/layouts/BaseLayout.astro` — el primero de todos los scripts del `<head>`, sin modificarlo.
7. Una vez pegado, ejecutar el build, verificar visualmente que el banner aparece en la primera visita y probar aceptar/rechazar/configurar en desktop y móvil, antes de considerar esta fase completamente cerrada.

Nada de esto requiere pagar nada. El paso 1 es el que yo no puedo dar por vosotros.
