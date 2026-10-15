import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/session-core";
import pool from "@/lib/db";

const API_PUBLICAS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/auth/session",
  "/api/regiones",
  "/api/comunas",
];

export async function proxy(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifyToken(token);
  const { pathname } = request.nextUrl;

  // Copia de los headers de la petición. Borramos siempre el header
  // para que el cliente no pueda inventarse un id_encargado.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-id-encargado");

  if (session?.id_encargado != null) {
    requestHeaders.set("x-id-encargado", String(session.id_encargado));
  }

  const next = () => NextResponse.next({ request: { headers: requestHeaders } });

  // ---- API ----
  if (pathname.startsWith("/api/")) {
    const esSubidaPublica = pathname === "/api/upload" && request.method === "POST";
    const esPublica =
      esSubidaPublica ||
      API_PUBLICAS.some(
        (ruta) => pathname === ruta || pathname.startsWith(ruta + "/")
      );

    if (!session && !esPublica) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (session && pathname === "/api/flota" && request.method === "GET") {
      const empresaId = Number(session.id_empresa);
      const empresaSolicitada = Number(
        request.nextUrl.searchParams.get("id_empresa"),
      );

      if (
        !Number.isInteger(empresaId) ||
        empresaId <= 0 ||
        empresaSolicitada !== empresaId
      ) {
        return NextResponse.json(
          { error: "No tienes permiso para consultar las flotas de esta empresa" },
          { status: 403 },
        );
      }
    }

    if (
      session &&
      pathname === "/api/data/vehiculos" &&
      ["GET", "POST"].includes(request.method)
    ) {
      let flotaId;

      if (request.method === "GET") {
        flotaId = Number(request.nextUrl.searchParams.get("flota_id"));
      } else {
        try {
          const body = await request.clone().json();
          flotaId = Number(body.id_flota);
        } catch {
          // Deja que el controlador responda con su error habitual de JSON.
        }
      }

      if (Number.isInteger(flotaId) && flotaId > 0) {
        const empresaId = Number(session.id_empresa);
        if (!Number.isInteger(empresaId) || empresaId <= 0) {
          return NextResponse.json(
            { error: "La sesión no tiene una empresa válida" },
            { status: 403 },
          );
        }

        try {
          const { rows } = await pool.query(
            `SELECT 1
             FROM flota
             WHERE id_flota = $1
               AND id_empresa = $2
               AND deleted_at IS NULL
             LIMIT 1`,
            [flotaId, empresaId],
          );

          if (rows.length === 0) {
            return NextResponse.json(
              { error: "No tienes permiso para acceder a esta flota" },
              { status: 403 },
            );
          }
        } catch (error) {
          console.error("Error al validar el acceso a la flota:", error);
          return NextResponse.json(
            { error: "No se pudo validar el acceso a la flota" },
            { status: 500 },
          );
        }
      }
    }

    return next();
  }

  // ---- Páginas ----
  const esAuth = pathname === "/login" || pathname === "/register";

  if (!session && !esAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session && esAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/login",
    "/register",
    "/alerts/:path*",
    "/configPanel/:path*",
    "/dashboard/:path*",
    "/gestion/:path*",
    "/route/:path*",
    "/statistic/:path*",
  ],
};