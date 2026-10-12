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
<<<<<<< HEAD

export async function iniciarSesion(usuario, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error?.message || result.mensaje || "No se pudo iniciar sesión.",
    );
  }

  return result.data;
}


export async function logout() {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) throw new Error("No se pudo cerrar sesión");
  return res.json();
}
=======
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
