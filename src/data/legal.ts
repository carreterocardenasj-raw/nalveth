// Datos del titular y de la actividad de NALVETH — única fuente de verdad para
// las páginas legales (aviso legal, privacidad, cookies, contacto). Editar SOLO
// aquí cuando se disponga del dato real; mientras tanto se muestra el marcador
// PENDING en vez de un dato inventado (no rellenar con datos ficticios).
//
// Ver docs/LEGAL-COMPLIANCE.md para el detalle de qué falta y por qué.

export const PENDING = '[DATO DEL TITULAR PENDIENTE]';

export const TITULAR = {
  // Nombre y apellidos, o razón social si se opera como sociedad.
  nombre: PENDING,
  // NIF o CIF.
  nif: PENDING,
  // Domicilio (calle y número).
  domicilio: PENDING,
  localidad: PENDING,
  provincia: PENDING,
  codigoPostal: PENDING,
  pais: PENDING,
  // Correo de contacto ya definido para el proyecto — mismo usado como identidad
  // de commits de git (docs/DECISIONS.md, entrada 2026-09-14: "Identidad de
  // commits del proyecto"). No se ha creado ni comprado un correo @nalveth.com.
  email: 'carreterocardenasj@gmail.com',
};

// Formulación prudente de la actividad económica — sin CNAE, epígrafe fiscal
// ni otro código administrativo inventado.
export const ACTIVIDAD =
  'Publicación y explotación de un sitio web de contenidos y recursos sobre inteligencia artificial, software, herramientas digitales y estrategias para negocios.';

// true en cuanto TITULAR tenga todos los campos de identidad reales (todos salvo
// email, que ya está disponible) — controla si las páginas legales muestran el
// aviso de "borrador pendiente de revisión".
export const TITULAR_COMPLETO = Object.entries(TITULAR).every(
  ([key, value]) => key === 'email' || value !== PENDING,
);
