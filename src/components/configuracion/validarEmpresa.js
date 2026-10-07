const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// deja el rut como 76.123.456-0 mientras se escribe
export function formatearRut(valor) {
  const limpio = valor.replace(/[^0-9kK]/g, "").toUpperCase().slice(0, 9);
  if (limpio.length < 2) return limpio.replace("K", "");
  const cuerpo = limpio.slice(0, -1).replace(/K/g, "");
  const dv = limpio.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
}

// revisa el digito verificador con el modulo 11
function rutValido(rut) {
  const limpio = rut.replace(/[^0-9K]/g, "");
  if (limpio.length < 8) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === esperado;
}

// nombre y rut son obligatorios, el resto solo se revisa si tiene algo escrito
export function validarEmpresa(empresa) {
  const errores = {};
  if (!empresa.nombre.trim()) errores.nombre = "Escribe el nombre de la empresa";
  if (!empresa.rut) errores.rut = "Escribe el RUT de la empresa";
  else if (!rutValido(empresa.rut)) errores.rut = "El RUT no es válido";
  if (empresa.correo && !correoValido.test(empresa.correo))
    errores.correo = "Escribe un correo válido, como nombre@empresa.cl";
  if (empresa.telefono && empresa.telefono.length !== 9)
    errores.telefono = "El teléfono debe tener 9 dígitos";
  if (empresa.region && !empresa.comuna) errores.comuna = "Elige una comuna";
  return errores;
}
