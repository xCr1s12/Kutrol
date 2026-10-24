import { NextResponse } from "next/server";
import {
  eliminarImagen,
  subirImagen,
  UploadValidationError,
} from "@/services/server/upload.service";
import { getSession } from "@/lib/tokenSession";

export async function postUpload(request) {
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json(
      { ok: false, error: "Envía la imagen como multipart/form-data." },
      { status: 400 },
    );
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo leer el archivo enviado." },
      { status: 400 },
    );
  }

  try {
    const data = await subirImagen(form.get("image"));
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (error) {
    const status = error instanceof UploadValidationError ? 400 : 500;
    if (status === 500) {
      console.error("Error al subir imagen a Cloudinary:", error);
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          status === 400 || process.env.NODE_ENV !== "production"
            ? error.message
            : "No se pudo subir la imagen. Inténtalo de nuevo.",
      },
      { status },
    );
  }
}

export async function deleteUpload(request) {
  const session = await getSession();
  if (!session?.id_empresa) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "El cuerpo debe ser JSON válido." },
      { status: 400 },
    );
  }

  try {
    const ok = await eliminarImagen(body?.public_id, session.id_empresa);
    if (!ok) return NextResponse.json({ ok: false, error: "No encontrada." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof UploadValidationError ? 400 : 500;
    if (status === 500) {
      console.error("Error al eliminar imagen de Cloudinary:", error);
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          status === 400
            ? error.message
            : "No se pudo eliminar la imagen. Inténtalo de nuevo.",
      },
      { status },
    );
  }
}