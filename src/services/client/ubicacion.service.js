async function getJson(response, fallbackMessage) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || fallbackMessage);
  }
  return result.data;
}

export async function obtenerRegiones(signal) {
  const response = await fetch("/api/regiones", { signal });
  return getJson(response, "No se pudieron cargar las regiones.");
}

export async function obtenerComunas(regionId, signal) {
  const response = await fetch(
    `/api/comunas?regionId=${encodeURIComponent(regionId)}`,
    { signal },
  );
  return getJson(response, "No se pudieron cargar las comunas.");
}

export async function obtenerComunasIntermedias(origenId, destinoId, signal) {
  const parametros = new URLSearchParams({
    origenId: String(origenId),
    destinoId: String(destinoId),
  });
  const response = await fetch(`/api/comunas?${parametros}`, { signal });
  return getJson(response, "No se pudieron cargar las ciudades intermedias.");
}
