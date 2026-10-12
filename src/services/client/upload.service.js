export async function subirImagenAPI(file) {
  const fd = new FormData();
  fd.append("image", file);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Error al subir la imagen");
  return json.data;
}

export async function eliminarImagenAPI(public_id) {
  const res = await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id }),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Error al eliminar la imagen");
  }
  return true;
}