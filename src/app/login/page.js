"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function Login() {
  return (
    <div className="min-h-screen bg-brand flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-brand border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <span className="text-lg font-bold text-text tracking-tight">
          inicio de sesion
        </span>
        <Link
          href="/register"
          className="text-sm text-subtext underline underline-offset-2 hover:text-text transition-colors"
          aria-label="Ir a la página de registro"
        >
          Registrarse
        </Link>
      </header>

      {/* Contenedor centrado */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-110 p-10 space-y-7">
          <h1 className="text-2xl font-bold text-text text-center">
            Inicio de sesion
          </h1>

          <form onSubmit={(e) => e.preventDefault()} noValidate>
            {/* Campos */}
            <div className="space-y-5">
              <FormField
                label="Correo"
                id="login-email"
                type="email"
                placeholder="correo@ejemplo.cl"
              />
              <FormField
                label="Contraseña"
                id="login-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* SSO */}
            <div className="space-y-3 mt-7">
              <p
                className="text-xs text-subtext text-center"
                id="login-sso-label"
              >
                Continuar con Google
              </p>
              <Button
                type="button"
                variant="ghost"
                aria-labelledby="login-sso-label"
                className="w-full"
              >
                Google
              </Button>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-5">
              <Button  href="/dashboard" type="submit" variant="primary" className="flex-1">
                Ingresar
              </Button>
              <Button variant="secondary" href="/" className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
