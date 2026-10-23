export function formatearRut(valor) {
  const limpio = String(valor ?? "")
    .replace(/[^0-9kK]/g, "")
    .toUpperCase()
    .slice(0, 9);

  if (limpio.length < 2) return limpio.replace("K", "");

  const cuerpo = limpio.slice(0, -1).replace(/K/g, "");
  const dv = limpio.slice(-1);
  return `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
}

export function validateRut(raw) {
  const limpio = String(raw ?? "")
    .replace(/\./g, "")
    .trim()
    .toUpperCase();

  const m = limpio.match(/^(\d{1,8})-([0-9K])$/);
  if (!m) return "Formato inválido (ej: 12.345.678-9)";

  const [, cuerpo, dv] = m;
  let suma = 0;
  for (let i = cuerpo.length - 1, f = 2; i >= 0; i--, f = f === 7 ? 2 : f + 1) {
    suma += Number(cuerpo[i]) * f;
  }

  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  if (esperado !== dv) return "RUT inválido: revisa el dígito verificador";

  return "";
}
