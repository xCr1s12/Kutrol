import { ForbiddenError } from "@/utils/errors";

export const NIVEL_DUENIO = 1;
const NIVEL_ADMINISTRADOR = 2;

function nivelDe(session) {
  return Number(session?.nivel);
}

export function puedeAdministrar(session) {
  return nivelDe(session) <= NIVEL_ADMINISTRADOR;
}

export function exigirAdministracion(session, mensaje) {
  if (!puedeAdministrar(session)) {
    throw new ForbiddenError(mensaje);
  }
}

export function exigirGestionDeUsuarios(session, { nivelObjetivo, objetivoEsDuenio } = {}) {
  exigirAdministracion(session, "No tienes permiso para gestionar usuarios");

  const tocaDuenio = objetivoEsDuenio === true || Number(nivelObjetivo) === NIVEL_DUENIO;
  if (tocaDuenio && nivelDe(session) !== NIVEL_DUENIO) {
    throw new ForbiddenError("Solo el dueño puede administrar al dueño de la empresa");
  }
}
