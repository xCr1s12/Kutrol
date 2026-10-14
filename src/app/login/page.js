"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import GoogleIcon from "@/components/ui/GoogleIcon";
import Logo from "@/components/ui/Logo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { iniciarSesion } from "@/services/client/auth.service";

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const errs = {};
    const usuario = String(data.get("login-usuario") || "").trim();
    const password = String(data.get("login-password") || "");

    if (!usuario) errs.usuario = "Ingresa tu usuario";
    if (!password) errs.password = "La contraseña es obligatoria";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      await iniciarSesion(usuario, password);
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "No se pudo iniciar sesión.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-brand border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <Logo />
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
            Inicio de sesión
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Campos */}
            <div className="space-y-5">
              <FormField
                label="Usuario"
                id="login-usuario"
                placeholder="nombre_apellido_empresa"
                error={errors.usuario}
              />
              <FormField
                label="Contraseña"
                id="login-password"
                type="password"
                placeholder="••••••••"
                error={errors.password}
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
                className="w-full flex items-center justify-center gap-2"
              >
                <GoogleIcon />
                Google
              </Button>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-5">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? "Ingresando..." : "Ingresar"}
              </Button>
              <Button variant="secondary" href="/" className="flex-1">
                Cancelar
              </Button>
            </div>
            {errors.form && (
              <p role="alert" className="mt-3 text-sm text-accent-dark">
                {errors.form}
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
