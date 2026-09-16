export function validateCompanyRut(raw) {
  const m = String(raw || "")
    .replace(/\./g, "")
    .trim()
    .match(/^(\d+)-([0-9kK])$/);
  if (!m) return "Formato inválido (ej: 76.123.456-0)";
  const [, body, dv] = m;
  let sum = 0;
  for (let i = body.length - 1, f = 2; i >= 0; i--, f = f === 7 ? 2 : f + 1) {
    sum += Number(body[i]) * f;
  }
  const expected = 11 - (sum % 11); // 1..11
  const expectedChar =
    expected === 11 ? "0" : expected === 10 ? "K" : String(expected);
  if (expectedChar !== dv.toUpperCase()) return "RUT inválido";
  if (Number(body) < 50_000_000)
    return "El RUT debe ser de empresa, no de persona";
  return "";
}

// Self-check: node src/lib/validateCompanyRut.js
import { pathToFileURL } from "node:url";

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const assert = (await import("node:assert/strict")).default;
  assert.equal(validateCompanyRut("76.123.456-0"), ""); // placeholder del form: válido
  assert.equal(validateCompanyRut("76.123.456-7"), "RUT inválido");
  assert.equal(
    validateCompanyRut("12.345.678-5"),
    "El RUT debe ser de empresa, no de persona",
  );
  console.log("OK: validación de RUT pasa los 3 asserts");
}
