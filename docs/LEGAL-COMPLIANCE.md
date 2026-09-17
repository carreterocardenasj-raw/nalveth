# NALVETH — Cumplimiento legal, privacidad, cookies y CMP (Fase 1 + 1B + 1C + 1D)

Ejecutado el 16/09/2026, por encargo directo del usuario ("FASE 1: CIERRE LEGAL + PRIVACIDAD + COOKIES + CMP"), con prioridad sobre cualquier expansión de contenido y sin tocar los 4 territorios editoriales existentes. Este documento recoge primero la auditoría de qué existía, y después las decisiones y cambios aplicados.

**Actualización, mismo día (16/09/2026):** el usuario facilitó los datos reales de identidad del titular, pendientes en la primera versión de este documento — ver sección 2, ahora marcada como completa.

**Actualización — Fase 1B, mismo día (16/09/2026):** encargo específico de resolver la capa de CMP/consentimiento ("FASE 1B: CMP Y CONSENTIMIENTO"). Se verificó en vivo el registro oficial de CMPs de IAB Europe (no solo fuentes secundarias), se eligió una CMP principal y una alternativa, y se implementó todo lo que no requiere crear una cuenta de terceros. Ver secciones 5 a 7B.

**Actualización — Fase 1C, mismo día (16/09/2026):** el titular creó la propiedad de NALVETH en InMobi Choice y facilitó el Universal Tag oficial (Consent Manager Tag v3.0, TCF 2.3, CMP ID 10). **El tag ya está instalado en el sitio**, sin modificar su código, en `src/lib/inmobi-universal-tag.ts` + `BaseLayout.astro`. Ver la nueva sección 7D para el detalle completo de la instalación y las pruebas realizadas. Esto no cambia ninguna de las secciones 5/6/12 en cuanto a la decisión de CMP (siguen siendo la investigación y el criterio de aceptación válidos) — solo su estado, ahora "instalado" en vez de "pendiente de cuenta".

**Actualización — Fase 1D, 17/09/2026:** primera prueba real en producción — banner y "Reject All" funcionan, pero el enlace del footer "Tus opciones de privacidad" no abría el popup porque era un `<a href="#">` con contenido propio en vez de un contenedor vacío que InMobi pudiera gestionar. Corregido a `<div id="nalveth-privacy"></div>`. Ver sección 7E.

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

### Estado de la activación (actualizado en Fase 1C)

Activar cualquiera de las dos opciones requiere **crear una cuenta en un servicio de terceros** (choice.inmobi.com, o la cuenta de AdSense para la opción de Google) para obtener el identificador de sitio y el "Web Tag"/snippet real. Tengo una restricción permanente de este proyecto: no creo cuentas en servicios de terceros, ni siquiera con autorización explícita — ya aplicada anteriormente a Landbot, Wati y a los programas de afiliados (ver `docs/DECISIONS.md`). **El titular creó la cuenta de InMobi por su cuenta y facilitó el Universal Tag ya generado** (Fase 1C, sección 7D) — ese tag está instalado en el código, sin que yo haya creado ninguna cuenta. Lo que queda pendiente ya no es de CMP, es de despliegue: sección 12.

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

## 7D. Universal Tag de InMobi Choice — instalación (Fase 1C)

**Estado: instalado el 16/09/2026, sin modificar el código entregado por InMobi.**

- **Archivo nuevo `src/lib/inmobi-universal-tag.ts`**: exporta `INMOBI_UNIVERSAL_TAG`, una constante de texto con el snippet completo tal como lo generó el portal de InMobi (comentario de apertura, `<script type="text/javascript" async=true>` — sí, con el `async=true` no estándar tal cual lo entregó InMobi, sin "corregirlo" —, el cuerpo completo con los stubs `__tcfapi`/`__gpp`/`__uspapi`, y el comentario de cierre que menciona "TCF 2.2" aunque la cabecera diga v3.0/TCF 2.3 — discrepancia real del snippet oficial, no tocada). El identificador de propiedad `LCjqGQVVZaVj2` y `tag_version=V3` están intactos.
- **Por qué un archivo aparte en vez de pegarlo directamente en `BaseLayout.astro`**: el snippet de InMobi usa llaves `{}` constantemente como sintaxis normal de JavaScript (objetos, bloques de función). El compilador de Astro interpreta `{}` como expresiones de plantilla fuera de las etiquetas `<script>`/`<style>` — pegarlo directamente como HTML literal en la plantilla `.astro` sería frágil. En su lugar, el snippet completo vive como una única cadena de texto en un `.ts`, y se inyecta en el `<head>` con `<Fragment set:html={INMOBI_UNIVERSAL_TAG} />`, que escribe ese HTML tal cual, sin que el compilador de Astro lo interprete ni lo toque. Verificado en el HTML generado: cero escapado de comillas o `&amp;`/`&quot;` — el JavaScript llega intacto al navegador.
- **Ubicación**: dentro de `<head>`, inmediatamente después de `<Seo {...seoProps} />` y de un comentario explicativo, en `BaseLayout.astro` — el único layout raíz del sitio, así que se carga en las 31 páginas sin excepción y sin duplicarse (verificado: exactamente 1 aparición de `cmp.inmobi.com` por página en el HTML generado). Es el primer script de terceros del documento; no hay ningún AdSense/analítica que pudiera ir antes.
- **Elemento del footer `id="nalveth-privacy"`**: añadido en `src/components/Footer.astro`, dentro de la columna "Legal". **Corregido en Fase 1D (17/09/2026, ver sección 7E) de `<a href="#">` a `<div>` vacío** — la primera versión no funcionaba en producción. Es InMobi quien inserta y gestiona el enlace ahí dentro; no se ha implementado ningún comportamiento propio de apertura de la CMP.
- **Relación con `src/lib/consent.ts`**: sin cambios funcionales — ese archivo nunca ha asignado ni sobrescrito `window.__tcfapi`/`__gpp`/`__uspapi`, solo los consulta cuando alguien lo invoque (hoy nadie lo hace todavía). Se ha actualizado su comentario de cabecera para dejar explícito que el Universal Tag de InMobi es ahora quien crea esos tres stubs, y que `consent.ts` es una capa de lectura, nunca una segunda implementación. Verificado en el navegador (ver más abajo): un único stub de cada API, ambos provenientes del tag de InMobi.
- **CSP / cabeceras de seguridad**: no existe ninguna Content-Security-Policy, archivo `_headers`, `vercel.json`, `netlify.toml` ni configuración de cabeceras en todo el proyecto (barrido completo de `astro.config.mjs`, `public/` y la raíz del repo) — no hay nada que pudiera bloquear `cmp.inmobi.com`, y por tanto nada que adaptar. Confirmado también en la prueba de navegador: la petición a `cmp.inmobi.com` se realiza sin ningún error de CSP en consola.
- **Google Fonts**: sin cambios (fuera de alcance de esta fase). Verificado visualmente que la tipografía y el diseño siguen intactos tras añadir el Universal Tag — ninguna interferencia entre ambos.

### Pruebas realizadas en navegador (entorno de desarrollo, `localhost:4321`)

- **Consola**: sin errores de JavaScript. Un único aviso, `USP is not accessible` — procede del propio código de InMobi (`console.warn` dentro de `checkIfUspIsReady`, parte del snippet que no se ha tocado), no de una integración defectuosa.
- **Carga del script real**: confirmado con `document.scripts` y `performance.getEntriesByType('resource')` que el tag insertó dinámicamente `https://cmp.inmobi.com/choice/LCjqGQVVZaVj2/localhost/choice.js?tag_version=V3` — identificador correcto, sustitución dinámica del host funcionando (en local, `host` = `localhost`; en producción sería `nalveth.com`). La petición se completó (353 ms) pero sin contenido descargado (`transferSize: 0`) — **esperable**, porque la propiedad está registrada en InMobi para `nalveth.com`, no para `localhost`.
- **Stubs TCF/GPP/USP**: confirmado `typeof window.__tcfapi === 'function'`, `typeof window.__gpp === 'function'`, `typeof window.__uspapi === 'function'` — los tres expuestos correctamente, uno solo cada uno.
- **Respuesta real de la API**: `window.__tcfapi('ping', 2, cb)` devolvió `{"cmpLoaded":false,"cmpStatus":"stub"}` — coherente con que el script remoto no cargó contenido real en local (mismo motivo que el punto anterior).
- **Elemento del footer**: `document.getElementById('nalveth-privacy')` existe y es único.
- **Visual**: capturas en desktop y en viewport móvil (375×812) — home y `/aviso-legal/` — sin ninguna regresión visual; el enlace "Tus opciones de privacidad" se ve correctamente integrado en la columna Legal del footer, en ambos tamaños.

### Lo que esto NO prueba todavía

**El banner real de consentimiento no se ha visto ni probado** — ni en desarrollo ni en ningún otro sitio. La propiedad de InMobi está configurada para el dominio `nalveth.com`; en `localhost` el script remoto no sirve contenido real (`transferSize: 0`, `cmpStatus: 'stub'`), así que es técnicamente imposible ver el banner, probar Aceptar/Rechazar/Configurar, o comprobar la reapertura de preferencias, hasta que el sitio esté publicado en `nalveth.com` (o el dominio real que corresponda). Esto no es una limitación de la integración — es cómo funciona cualquier CMP de terceros atada a un dominio concreto. **No afirmamos que el consentimiento real esté probado** — solo que la instalación técnica (script, stubs, orden de carga, elemento del footer) está verificada y funciona.

## 7E. Corrección del elemento del footer (Fase 1D, 17/09/2026)

**Contexto**: primera prueba real de la CMP en producción (`nalveth.com`). Resultado: banner inicial ✅, "Reject All" ✅, el consentimiento se registra ✅ — pero el enlace del footer "Tus opciones de privacidad" ❌ no abría el popup, porque era un `<a href="#">` con texto manual escrito por mí. Según la documentación de InMobi, cuando la propiedad usa "Display privacy consent as a link at the footer", el `Link Element ID` debe apuntar a un **contenedor vacío** en el que InMobi inserta y gestiona su propio enlace — no a un `<a>` ya construido con `href`/texto propios, que InMobi no llega a sustituir de la forma esperada.

**Corrección aplicada**: en `src/components/Footer.astro`, el `<a href="#" id="nalveth-privacy">Tus opciones de privacidad</a>` se sustituyó por `<div id="nalveth-privacy"></div>` — sin `href`, sin `onclick`, sin texto, sin ningún comportamiento propio. Se añadieron únicamente estilos mínimos (`#nalveth-privacy { min-height: 1em; }` y reglas `:global()` para que el `<a>` que InMobi inserte dentro herede el mismo color/tamaño/hover que sus vecinos de la columna Legal) — nada de esto simula un botón propio, solo evita que el hueco vacío rompa el layout antes de que InMobi lo rellene, e integra visualmente lo que InMobi inserte.

**Por qué el `id` no cambió**: el `Link Element ID` ya está configurado en el portal de InMobi como `nalveth-privacy` — cambiarlo habría exigido volver a ese portal y reconfigurarlo, y el encargo pedía explícitamente mantenerlo exacto.

**Verificado en el build**: `id="nalveth-privacy"` sigue presente exactamente una vez por página (barrido recursivo de las 30 páginas de `dist/`), ahora sobre un `<div>` y no un `<a>`; ningún `href="#"` asociado a ese ID en ninguna página; el Universal Tag sigue apareciendo exactamente una vez por página, sin tocar; sin AdSense ni Analytics. `npm run build` → 31 páginas, 0 errores, mismas rutas.

**Lo que sigue sin poder probarse en local**: si el enlace que InMobi inserte dentro de `#nalveth-privacy` abre correctamente el popup — eso solo se puede confirmar en `nalveth.com`, igual que el resto del banner (sección 7D). Es la prueba pendiente que el titular hará tras publicar este cambio (primera visita en incógnito → banner → Reject All → footer → "Tus opciones de privacidad" → comprobar que abre el popup).

## 8. SEO de páginas legales

`aviso-legal.astro`, `privacidad.astro` y `cookies.astro` llevan ahora `noindex` (prop ya existente en `Seo.astro`, sin necesidad de tocar su código) y se excluyen del sitemap mediante un filtro añadido en `astro.config.mjs` (`NOINDEX_PATHS`) — así no compiten por indexación con el contenido editorial. `contacto.astro` y `sobre-nalveth.astro` se mantienen indexables: tienen valor informativo real y son señales de confianza (E-E-A-T) que Google y los revisores de AdSense esperan encontrar accesibles. Canonical y metadatos siguen generándose igual que en el resto del sitio, vía `Seo.astro` — sin cambios de arquitectura.

## 9. Test técnico realizado

- **Build de producción**: `npm run build` → **31 páginas, 0 errores** (verificado tras instalar el Universal Tag: `src/lib/inmobi-universal-tag.ts`, `BaseLayout.astro`, `Footer.astro`).
- **Rutas**: mismas URLs que antes de esta fase — ninguna ha cambiado.
- **Enlaces legales**: 0 enlaces internos rotos en barrido completo de `dist/`.
- **`noindex`/sitemap**: sin cambios — `aviso-legal`, `privacidad`, `cookies` siguen `noindex` y fuera del sitemap; `contacto`/`sobre-nalveth` siguen indexables.
- **Universal Tag**: exactamente 1 aparición de `cmp.inmobi.com` por página, con el identificador `LCjqGQVVZaVj2` y `tag_version=V3` intactos, dentro de `<head>` y antes de cualquier otro script — verificado en el HTML de `dist/`.
- **`id="nalveth-privacy"`**: exactamente 1 por página, presente en todas.
- **Sin stubs duplicados**: exactamente 1 asignación de `window.__tcfapi` y 1 de `window.__gpp` por página, ambas del propio tag de InMobi; `consent.ts` no aparece en ningún bundle de `dist/` porque nada lo importa todavía (no crea ningún stub).
- **Scripts/cookies antes del consentimiento**: sigue sin haber AdSense, Analytics, Tag Manager ni ningún píxel — único recurso externo, `fonts.googleapis.com` (Google Fonts) más ahora `cmp.inmobi.com` (el propio Universal Tag, que es la CMP, no una tecnología que dependa de consentimiento).
- **Prueba en navegador (desarrollo)**: ver el detalle completo en la sección 7D — consola sin errores, stubs TCF/GPP/USP únicos y funcionando, elemento del footer presente, sin regresión visual en desktop ni móvil.
- **Comportamiento del banner real (primera visita, rechazo, aceptación, configuración, reapertura de preferencias)**: **no probado — no puede probarse en `localhost`**, porque la propiedad de InMobi está registrada para `nalveth.com` (sección 7D explica por qué). Pendiente de publicar el sitio en el dominio real para completar esta prueba.

## 10. Acciones pendientes del titular

1. ~~Rellenar `src/data/legal.ts` con los datos reales de identidad~~ — **hecho el 16/09/2026** (sección 2).
2. ~~Confirmar el correo de contacto público~~ — **confirmado**: `carreterocardenasj@gmail.com`.
3. ~~Crear la cuenta de InMobi CMP y facilitar el Universal Tag~~ — **hecho el 16/09/2026** (Fase 1C, sección 7D). El tag ya está instalado en el código.
4. ~~Publicar y probar en `nalveth.com`~~ — **hecho parcialmente**: banner y "Reject All" verificados ✅ el 17/09/2026. El enlace "Tus opciones de privacidad" fallaba (abría `#` en vez del popup) — **corregido en Fase 1D** (sección 7E). Falta volver a publicar este cambio y repetir la prueba de ese enlace concreto.
5. **Publicar el cambio de Fase 1D** (`Footer.astro`) en `nalveth.com` y, en incógnito: primera visita → banner → "Reject All" → volver al footer → "Tus opciones de privacidad" → confirmar que ahora abre el popup de InMobi.
6. Revisar en el portal de InMobi que el tema del banner configurado cumple el criterio de la sección 6 (mismo peso visual para Aceptar y Rechazar) — verificable solo dentro del portal o una vez publicado.
7. Confirmar proveedor de alojamiento/hosting de producción definitivo, para completar la sección "Destinatarios y proveedores" de `/privacidad/` (hoy marcada `[POR VERIFICAR]`).
8. Decidir si autoalojar Google Fonts (sección 7C) — mejora opcional, no bloqueante.

## 11. Riesgo/decisión que requiere tu confirmación explícita (me detengo aquí, no lo ejecuto)

**Ninguna de las dos opciones de CMP recomendadas (InMobi CMP, o Google integrado en AdSense) tiene coste.** No hay ninguna decisión de gasto pendiente. La única alternativa con coste identificada (CookieYes Pro, 25$/mes/dominio) **no la he contratado ni la recomiendo** — aparece solo porque surgió en la comparación, y su versión gratuita no sirve para este caso (sin TCF v2.3). Si prefirieras CookieYes de todos modos por algún motivo (interfaz, idioma, soporte), avísamelo antes de que nadie cree esa cuenta, porque esa sí sería una decisión de coste real que no he tomado por ti.

## 12. El único paso pendiente — qué tenéis que hacer vosotros, exactamente

**Actualizado tras la Fase 1D (17/09/2026).** Primera prueba real: banner ✅, "Reject All" ✅, consentimiento registrado ✅, enlace "Tus opciones de privacidad" ❌ (corregido en código, sección 7E). Lo único que falta:

1. **Publicar el cambio de `Footer.astro`** (Fase 1D) en `nalveth.com` — o decirme cómo hacerlo si queréis que lo ejecute yo con vuestra autorización explícita.
2. En incógnito, en `nalveth.com`:
   - Primera visita → banner.
   - "Reject All" (ya verificado, repetir solo si algo más cambió).
   - Volver al footer → clic en "Tus opciones de privacidad" → **confirmar que ahora abre el popup de InMobi** (esta es la comprobación que motivó esta corrección).
   - Repetir en móvil real o emulado.
3. Revisar en el portal de InMobi que "Aceptar" y "Rechazar" tienen el mismo peso visual (sección 6) — si el tema no lo cumple, ajustarlo ahí, no en el código.
4. Cuando todo lo anterior esté verificado, esta fase queda completamente cerrada y NALVETH está preparado para el siguiente paso natural: solicitar AdSense (fuera de alcance de este encargo).

Nada de esto requiere pagar nada ni crear ninguna cuenta nueva.
