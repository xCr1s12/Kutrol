
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_BYTES = 72;

const COMUNES = new Set([
  "123456", "1234567", "12345678", "123456789", "1234567890", "12345678901",
  "123456789012", "qwerty", "qwerty123", "qwertyuiop", "password", "password1",
  "password123", "password1234", "contrasena", "contrasena1", "contrasena123",
  "contraseña", "contraseña1", "contraseña123", "admin", "admin123", "administrador",
  "iloveyou", "welcome", "welcome1", "abc123", "abc12345", "letmein", "monkey",
  "dragon", "football", "baseball", "superman", "batman", "trustno1", "sunshine",
  "master", "hello123", "freedom", "whatever", "princesa", "holamundo", "hola1234",
  "chile123", "chile2026", "kutrol", "kutrol123", "kutrol2026", "camion123",
  "flota123", "transporte", "empresa123", "usuario123", "clave1234", "miempresa",
]);

function normalizar(valor) {
  return valor.toLowerCase().replace(/[\s_-]+/g, "");
}

export function esPasswordComun(valor) {
  const normalizado = normalizar(valor);
  if (COMUNES.has(normalizado)) return true;
  return [...COMUNES].some((comun) => {
    if (normalizado === comun) return true;
    const sinSimbolos = normalizado.replace(/[^a-z0-9]/g, "");
    return sinSimbolos === comun || sinSimbolos === `${comun}123` || sinSimbolos === `${comun}1234`;
  });
}

function bytesDe(texto) {
  return new TextEncoder().encode(texto).length;
}

export function evaluarPassword(valor) {
  const texto = typeof valor === "string" ? valor : "";
  const caracteres = Array.from(texto).length;
  const bytes = bytesDe(texto);

  const reglas = [
    {
      id: "largo",
      etiqueta: `Al menos ${PASSWORD_MIN_LENGTH} caracteres`,
      ok: caracteres >= PASSWORD_MIN_LENGTH,
    },
    {
      id: "comun",
      etiqueta: "No es una contraseña común",
      ok: texto.length > 0 && !esPasswordComun(texto),
    },
    {
      id: "limite",
      etiqueta: "Longitud máxima",
      visible: false,
      ok: texto.length > 0 && bytes <= PASSWORD_MAX_BYTES,
    },
  ];

  return {
    reglas,
    caracteres,
    valida: reglas.every((regla) => regla.ok),
  };
}

export function mensajePassword(valor) {
  const { reglas } = evaluarPassword(valor);
  const primera = reglas.find((regla) => !regla.ok);
  if (!primera) return "";

  if (primera.id === "largo") {
    return `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`;
  }
  if (primera.id === "comun") {
    return "Elige una contraseña que no sea común ni incluya el nombre del producto";
  }
  return "La contraseña es demasiado larga";
}

export function fuerzaPassword(valor) {
  const texto = typeof valor === "string" ? valor : "";
  const caracteres = Array.from(texto).length;

  if (caracteres === 0) return { puntaje: 0, etiqueta: "Sin contraseña" };
  if (esPasswordComun(texto)) return { puntaje: 0, etiqueta: "Muy débil" };

  let puntaje = 0;
  if (caracteres >= PASSWORD_MIN_LENGTH) puntaje += 1;
  if (caracteres >= 16) puntaje += 1;
  if (/[a-z]/.test(texto) && /[A-Z]/.test(texto)) puntaje += 1;
  if (/\d/.test(texto)) puntaje += 1;
  if (/[^A-Za-z0-9]/.test(texto)) puntaje += 1;

  const limitado = Math.min(puntaje, 4);
  const etiquetas = ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"];
  return { puntaje: limitado, etiqueta: etiquetas[limitado] };
}
