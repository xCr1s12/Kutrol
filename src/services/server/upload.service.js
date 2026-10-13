import { getCloudinary } from "@/lib/cloudinary";

const FORMATOS = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export class UploadValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "UploadValidationError";
  }
}

export async function subirImagen(file) {
  if (!file || typeof file === "string" || file.size === 0) {
    throw new UploadValidationError("Debes enviar una imagen.");
  }
  if (!FORMATOS.includes(file.type)) {
    throw new UploadValidationError("Formato no permitido (JPG, PNG o WEBP).");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadValidationError("La imagen supera los 5 MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const cloudinary = await getCloudinary();

  const r = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: process.env.CLOUDINARY_FOLDER || "kutrol", resource_type: "image" },
        (err, res) => (err ? reject(err) : resolve(res))
      )
      .end(buffer);
  });

  return { url: r.secure_url, public_id: r.public_id, width: r.width, height: r.height };
}

export async function eliminarImagen(publicId) {
  if (typeof publicId !== "string" || !publicId.trim()) {
    throw new UploadValidationError("Falta public_id.");
  }

  const cloudinary = await getCloudinary();
  const r = await cloudinary.uploader.destroy(publicId);
  return r.result === "ok";
}
