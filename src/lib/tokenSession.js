import "server-only";
<<<<<<< HEAD
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { COOKIE_NAME, MAX_AGE, secret, verifyToken } from "./session-core";
=======
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "kutrol_session";
const MAX_AGE = 60 * 60 * 24 * 7;
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)

export async function createSession(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
<<<<<<< HEAD
  return verifyToken(cookieStore.get(COOKIE_NAME)?.value);
=======
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null; 
  }
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}