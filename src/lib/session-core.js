import { jwtVerify } from "jose";

export const COOKIE_NAME = "kutrol_session";
export const MAX_AGE = 60 * 60 * 24 * 7;

if (!process.env.AUTH_SECRET) {
  throw new Error("Falta la variable de entorno AUTH_SECRET");
}
export const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}