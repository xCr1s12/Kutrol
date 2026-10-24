export const PAISES = [
  { iso: "CL", nombre: "Chile", codigo: "+56", digitos: 9, ejemplo: "9 1234 5678" },
  { iso: "PE", nombre: "Perú", codigo: "+51", digitos: 9, ejemplo: "912 345 678" },
  { iso: "BO", nombre: "Bolivia", codigo: "+591", digitos: 8, ejemplo: "7123 4567" },
  { iso: "AR", nombre: "Argentina", codigo: "+54", digitos: 11, ejemplo: "9 11 2345 6789" },
  { iso: "BR", nombre: "Brasil", codigo: "+55", digitos: 11, ejemplo: "11 91234 5678" },
  { iso: "CO", nombre: "Colombia", codigo: "+57", digitos: 10, ejemplo: "300 123 4567" },
  { iso: "EC", nombre: "Ecuador", codigo: "+593", digitos: 9, ejemplo: "99 123 4567" },
  { iso: "MX", nombre: "México", codigo: "+52", digitos: 10, ejemplo: "55 1234 5678" },
  { iso: "ES", nombre: "España", codigo: "+34", digitos: 9, ejemplo: "612 345 678" },
  { iso: "US", nombre: "Estados Unidos", codigo: "+1", digitos: 10, ejemplo: "415 555 2671" },
];

export const PAIS_POR_DEFECTO = PAISES[0];

export function buscarPais(codigo) {
  return PAISES.find((pais) => pais.codigo === codigo) ?? PAIS_POR_DEFECTO;
}

export function soloDigitos(valor) {
  return String(valor ?? "").replace(/\D/g, "");
}

export function construirTelefono(codigoPais, digitos) {
  const pais = buscarPais(codigoPais);
  const limpio = soloDigitos(digitos).slice(0, pais.digitos);
  return limpio ? `${pais.codigo}${limpio}` : "";
}

export function detectarPais(valor) {
  const texto = String(valor ?? "").trim();
  const coincide = PAISES.filter((pais) => texto.startsWith(pais.codigo)).sort(
    (a, b) => b.codigo.length - a.codigo.length,
  )[0];
  return coincide ?? PAIS_POR_DEFECTO;
}

export function telefonoValido(codigoPais, digitos) {
  const pais = buscarPais(codigoPais);
  return soloDigitos(digitos).length === pais.digitos;
}
