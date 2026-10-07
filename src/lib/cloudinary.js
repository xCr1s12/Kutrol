export async function getCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("Falta configurar CLOUDINARY_URL.");
  }

  let url;
  try {
    url = new URL(cloudinaryUrl);
  } catch {
    throw new Error("CLOUDINARY_URL no tiene un formato válido.");
  }

  if (
    url.protocol !== "cloudinary:" ||
    !url.username ||
    !url.password ||
    !url.hostname
  ) {
    throw new Error(
      "CLOUDINARY_URL debe incluir API key, API secret y cloud name.",
    );
  }

  const { v2: cloudinary } = await import("cloudinary");

  cloudinary.config({
    cloud_name: url.hostname,
    api_key: decodeURIComponent(url.username),
    api_secret: decodeURIComponent(url.password),
    secure: true,
  });

  return cloudinary; // devuelve el SDK, no el resultado de config()
}