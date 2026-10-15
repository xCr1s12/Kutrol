"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import GoogleIcon from "@/components/ui/GoogleIcon";
<<<<<<< HEAD
<<<<<<< HEAD
import Logo from "@/components/ui/Logo";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
<<<<<<< HEAD
=======
import Logo from "@/components/ui/Logo";
>>>>>>> 58dd317 (Agregando logo a registro, inicio sesion y pagina inicial)
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
=======
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
import { iniciarSesion } from "@/services/client/auth.service";

export default function Login() {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);

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
    <div className="min-h-screen bg-background text-text flex flex-col">
      {/* Navbar */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
      <header className="fixed top-0 left-0 w-full bg-header border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <Logo fondo={darkMode ? "oscuro" : "claro"} />

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:text-text"
            aria-label="Alternar modo oscuro"
            aria-pressed={darkMode}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <ModeNightOutlinedIcon />}
          </button>

          <Link
            href="/register"
            className="text-sm text-subtext underline underline-offset-2 hover:text-text transition-colors"
            aria-label="Ir a la página de registro"
          >
            Registrarse
          </Link>
        </div>
<<<<<<< HEAD
=======
      <header className="fixed top-0 left-0 w-full bg-brand border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <Logo />
        <Link
          href="/register"
          className="text-sm text-subtext underline underline-offset-2 hover:text-text transition-colors"
          aria-label="Ir a la página de registro"
        >
          Registrarse
        </Link>
>>>>>>> 58dd317 (Agregando logo a registro, inicio sesion y pagina inicial)
      </header>

      {/* Contenedor centrado */}
      <main className="flex-1 flex items-center justify-center px-4 pt-20">
=======
      </header>

      {/* Contenedor centrado */}
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
                className="text-xs text-subtext light:text-icon text-center"
                id="login-sso-label"
              >
                Continuar con Google
              </p>
              <Button
                type="button"
                variant="ghost"
                aria-labelledby="login-sso-label"
<<<<<<< HEAD
                className="w-full flex items-center justify-center light:bg-accent light:text-white gap-2"
=======
                className="w-full flex items-center justify-center light:bg-accent gap-2"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
      </main>
    </div>
  );
}