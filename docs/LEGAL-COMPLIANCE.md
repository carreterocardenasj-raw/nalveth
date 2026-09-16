# NALVETH — Cumplimiento legal, privacidad, cookies y CMP (Fase 1)

Ejecutado el 16/09/2026, por encargo directo del usuario ("FASE 1: CIERRE LEGAL + PRIVACIDAD + COOKIES + CMP"), con prioridad sobre cualquier expansión de contenido y sin tocar los 4 territorios editoriales existentes. Este documento recoge primero la auditoría de qué existía, y después las decisiones y cambios aplicados.

**Actualización, mismo día (16/09/2026):** el usuario facilitó los datos reales de identidad del titular, pendientes en la primera versión de este documento — ver sección 2, ahora marcada como completa.

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

## 5. CMP — investigación y decisión

### Lo que se comprobó primero (opción oficial de Google)

Google ofrece su propia CMP gratuita y certificada, integrada en AdSense bajo **"Privacidad y mensajes"** (antes "Funding Choices"). Es la opción más simple porque no añade un proveedor externo. **Pero requiere tener una cuenta de AdSense con el sitio añadido y la revisión del sitio solicitada** para poder generar el mensaje de consentimiento y el fragmento de código — es decir, depende de empezar el proceso de alta en AdSense, que el encargo pide explícitamente no iniciar todavía (punto 17). **Conclusión: la opción oficial de Google queda como la preferida, pero no es accionable en esta fase — se retoma de forma natural cuando se solicite AdSense.**

Fuente: [Google AdSense Help — requisitos de gestión del consentimiento](https://support.google.com/adsense/answer/13554116), [cómo funciona la CMP de Google](https://support.google.com/adsense/answer/16918505).

### Alternativa si se quisiera una CMP activa antes de solicitar AdSense

| CMP | Certificación Google | TCF | Plan gratuito | Notas |
|---|---|---|---|---|
| **InMobi CMP** (antes Quantcast Choice) | Sí, certificada por Google | IAB TCF v2.3 | Sí, sin coste | Pensada específicamente para publishers de contenido con monetización publicitaria — encaja con el perfil de NALVETH. No depende de tener AdSense ya aprobado. |
| **CookieYes** | Sí, certificada por Google | TCF v2.3 **solo en el plan Pro (25$/mes/dominio)** — el plan gratuito (hasta 5.000 páginas vistas/mes) no incluye TCF v2.3 | Parcial (sin TCF v2.3) | Descartada como opción gratuita para este caso: sin el plan de pago no cumpliría el requisito de TCF que exige Google para anuncios personalizados en EEE/Reino Unido/Suiza. |

**Recomendación (no ejecutada todavía): InMobi CMP** es, de las opciones investigadas, la única gratuita que cumple TCF v2.3 y certificación Google sin coste, y está orientada al mismo caso de uso que NALVETH (sitio de contenido con publicidad).

Fuentes: [Enzuzo — Google-certified CMPs 2026](https://www.enzuzo.com/blog/choose-google-certified-cmp), [CookieYes — certificación Google TCF](https://www.cookieyes.com/blog/google-certified-cmp-for-tcf/), [Enzuzo — CookieYes pricing 2026](https://www.enzuzo.com/blog/cookieyes-pricing).

### Por qué no se ha activado ninguna CMP todavía

Activar cualquiera de las dos rutas anteriores requiere **crear una cuenta en un servicio de terceros** (Google AdSense, o InMobi/Quantcast) para obtener el identificador de sitio y el fragmento de código real. Tengo una restricción permanente de este proyecto: no creo cuentas en servicios de terceros, ni siquiera con autorización explícita — ya aplicada anteriormente a Landbot, Wati y a los programas de afiliados (ver `docs/DECISIONS.md`). Por eso esta fase deja la investigación, la recomendación y el punto de integración listos, pero la cuenta y el fragmento de código son una **acción pendiente del titular** (sección 7).

### Qué se ha preparado en el código

- `src/layouts/BaseLayout.astro`: comentario explícito en `<head>` marcando el punto exacto donde debe insertarse el snippet de la CMP elegida — antes que cualquier script de AdSense o analítica, nunca al revés.
- Ningún script de consentimiento "casero" se ha implementado como solución definitiva (el encargo lo prohíbe expresamente) — no existía nada que bloquear hoy (sección 1), así que no había justificación para simular un banner sin una CMP real detrás.
- Las páginas `/cookies/` y `/privacidad/` documentan por adelantado el comportamiento que tendrá el banner cuando exista (aceptar/rechazar/configurar al mismo nivel, sin dark patterns, revocable después — ver sección 6), para que el compromiso quede registrado y verificable cuando se implemente.

## 6. Comportamiento del consentimiento (especificación para cuando exista CMP real)

Documentado aquí como criterio de aceptación, a cumplir por la CMP que se active (Google o InMobi):

- Tres opciones con visibilidad equivalente en la primera capa: **aceptar**, **rechazar**, **configurar preferencias** — ninguna preseleccionada visualmente por encima de las demás.
- Ningún cookie/tecnología no necesaria se carga antes de una acción explícita de consentimiento — hoy esto ya se cumple porque no hay ninguna cookie no necesaria en el sitio.
- Seguir navegando no equivale a consentimiento.
- Debe existir una forma posterior de modificar o revocar el consentimiento (enlace "Configurar cookies" visible, anunciado ya en `/cookies/` como algo que se añadirá al pie de página cuando la CMP esté activa).

## 7. Google AdSense — estado

No se ha integrado ningún script de AdSense ni se ha solicitado la cuenta, tal como pedía el encargo. `sobre-nalveth.astro` y `politica-editorial.astro` mencionan AdSense únicamente como parte futura del modelo de financiación, sin implicar que ya esté activo. El punto de integración en `BaseLayout.astro` queda preparado para cuando corresponda (sección 5).

## 8. SEO de páginas legales

`aviso-legal.astro`, `privacidad.astro` y `cookies.astro` llevan ahora `noindex` (prop ya existente en `Seo.astro`, sin necesidad de tocar su código) y se excluyen del sitemap mediante un filtro añadido en `astro.config.mjs` (`NOINDEX_PATHS`) — así no compiten por indexación con el contenido editorial. `contacto.astro` y `sobre-nalveth.astro` se mantienen indexables: tienen valor informativo real y son señales de confianza (E-E-A-T) que Google y los revisores de AdSense esperan encontrar accesibles. Canonical y metadatos siguen generándose igual que en el resto del sitio, vía `Seo.astro` — sin cambios de arquitectura.

## 9. Test técnico realizado

- **Build de producción**: `npm run build` → **31 páginas, 0 errores**.
- **Rutas**: las 5 páginas legales/institucionales generan su HTML correctamente; ninguna URL ha cambiado.
- **Enlaces legales**: verificado que el footer enlaza a las 5 páginas desde la home y desde una página de territorio (`/gestionar-clientes/`), y que el `<head>` de cada una resuelve.
- **`noindex`**: verificado en el HTML generado — presente en `aviso-legal`, `privacidad`, `cookies`; ausente en `contacto` y `sobre-nalveth`.
- **Sitemap**: verificado que `dist/sitemap-0.xml` excluye las 3 páginas `noindex` y conserva `contacto`/`sobre-nalveth`.
- **Scripts/cookies antes del consentimiento**: verificado por barrido de `dist/_astro/*.css` y del HTML — la única URL externa en todo el sitio es `fonts.googleapis.com`; no hay ningún `<script src="https://...">` de terceros.
- **Comprobación visual**: `/privacidad/` y `/aviso-legal/` verificadas en navegador en desktop y en viewport móvil (375×812) — contenido, aviso de datos pendientes, y footer con los 5 enlaces legales se ven correctamente en ambos. Menú móvil probado (abre/cierra, incluye las 4 categorías/territorios).
- **Comportamiento del banner de consentimiento (rechazo, configuración, revocación)**: **no probado — no existe banner que probar todavía**, porque activarlo requiere la cuenta de CMP pendiente del titular (sección 5). Documentado como pendiente explícito, no como "hecho".

## 10. Acciones pendientes del titular

1. ~~Rellenar `src/data/legal.ts` con los datos reales de identidad~~ — **hecho el 16/09/2026** (sección 2).
2. ~~Confirmar el correo de contacto público~~ — **confirmado**: `carreterocardenasj@gmail.com`.
3. **Decidir y crear la cuenta de CMP** cuando corresponda — dos rutas posibles, ninguna ejecutada por mí (creación de cuentas de terceros fuera de mi alcance):
   - Esperar a solicitar AdSense y usar su CMP gratuita integrada ("Privacidad y mensajes") — más simple, un proveedor menos.
   - O crear ya una cuenta gratuita en **InMobi CMP** (antes Quantcast Choice) para tener el banner activo antes de solicitar AdSense.
4. **Una vez exista la cuenta de CMP**, pegar su snippet en el punto marcado en `src/layouts/BaseLayout.astro` y activar el enlace "Configurar cookies" en el footer y en `/cookies/`.
5. Confirmar proveedor de alojamiento/hosting de producción definitivo, para completar la sección "Destinatarios y proveedores" de `/privacidad/` (hoy marcada `[POR VERIFICAR]`).

## 11. Riesgo/decisión que requiere tu confirmación explícita (me detengo aquí, no lo ejecuto)

**Ninguna de las dos rutas de CMP gratuitas y certificadas (Google integrado en AdSense, o InMobi/Quantcast) tiene coste** por sí sola, así que no hay una decisión de gasto que tomar todavía. La única alternativa con coste identificada en la investigación (CookieYes Pro, 25$/mes/dominio, necesaria solo si se quisiera usar CookieYes en vez de InMobi) **no la he contratado ni la recomiendo** — se documenta solo porque apareció en la comparación. Si prefieres CookieYes por algún motivo (interfaz, idioma, soporte) sobre InMobi, avísamelo antes de que cualquiera cree la cuenta, porque esa sí sería una decisión de coste real.
