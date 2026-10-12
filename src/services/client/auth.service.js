export async function registrarEmpresaYEncargado(registration) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registration),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      result.error?.message || "No se pudo completar el registro.",
    );
    error.details = result.error?.details || {};
    throw error;
  }

  return result.data;
}
