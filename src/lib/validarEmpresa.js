import { formatearRut, validateRut } from "@/lib/validateRut";
import { detectarPais, soloDigitos, telefonoValido } from "@/lib/paises";

export { formatearRut };

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarEmpresa(empresa) {
  const errores = {};

  if ((empresa.nombre ?? "").trim().length < 2) {
    errores.nombre = "Escribe el nombre de la empresa";
  }
  const rutError = validateRut(empresa.rut ?? "");
  if (rutError) errores.rut = rutError;
  if ((empresa.direccion ?? "").trim().length < 5) {
    errores.direccion = "Escribe la dirección";
  }
  if (!empresa.region) errores.region = "Selecciona una región";
  if (!empresa.comuna) errores.comuna = "Selecciona una comuna";

  const emails = (empresa.emails ?? []).map((valor) => String(valor ?? "").trim());
  if (!emails.length || emails.some((valor) => !valor)) {
    errores.emails = "Completa o quita los correos vacíos";
  } else if (emails.some((valor) => !CORREO.test(valor))) {
    errores.emails = "Revisa los correos: alguno no es válido";
  }

  const telefonos = (empresa.telefonos ?? []).map((valor) => String(valor ?? "").trim());
  const telefonoMalo = telefonos.some((valor) => {
    const pais = detectarPais(valor);
    return !telefonoValido(pais.codigo, soloDigitos(valor.slice(pais.codigo.length)));
  });
  if (!telefonos.length || telefonos.some((valor) => !valor)) {
    errores.telefonos = "Completa o quita los teléfonos vacíos";
  } else if (telefonoMalo) {
    errores.telefonos = "Revisa los teléfonos: alguno no tiene el largo de su país";
  }

  return errores;
}
