"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { validateCompanyRut } from "@/lib/validateCompanyRut";

export default function Register() {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const errs = {};
    const rut = validateCompanyRut(data.get("reg-rut"));
    if (rut) errs.rut = rut;
    if (String(data.get("reg-password") || "").length < 8)
      errs.password = "Mínimo 8 caracteres";
    setErrors(errs);
    if (!Object.keys(errs).length) router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-brand flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-brand border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <span className="text-lg font-bold text-text tracking-tight">
          Registro
        </span>
        <Link
          href="/login"
          className="text-sm text-subtext underline underline-offset-2 hover:text-text transition-colors"
          aria-label="Ir a la página de inicio de sesión"
        >
          Iniciar sesión
        </Link>
      </header>

      {/* Contenedor centrado */}
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-205 p-10">
          <h1 className="text-2xl font-bold text-text mb-8">Registro</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">
              {/* ——— Columna Izquierda: Formulario ——— */}
              <div className="space-y-5">
                {/* Fila 1: Nombre + Apellido */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Nombre"
                    id="reg-nombre"
                    type="text"
                    placeholder="Juan"
                  />
                  <FormField
                    label="Apellido"
                    id="reg-apellido"
                    type="text"
                    placeholder="Pérez"
                  />
                </div>

                {/* Fila 2: Rut + Fecha de nacimiento */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Rut"
                    id="reg-rut"
                    type="text"
                    placeholder="76.123.456-0"
                    maxLength={12}
                    error={errors.rut}
                  />
                  <FormField
                    label="Fecha de nacimiento"
                    id="reg-fecha-nac"
                    type="text"
                    placeholder="1/1/2000"
                  />
                </div>

                {/* Fila 3: Correo + Contraseña */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Correo"
                    id="reg-email"
                    type="email"
                    placeholder="juan.perez@correo.cl"
                  />
                  <FormField
                    label="Contraseña"
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    minLength={8}
                    maxLength={72}
                    error={errors.password}
                  />
                </div>

                {/* Fila 4: Descripción de la empresa (textarea) */}
                <FormField
                  label="Descripción de la empresa"
                  id="reg-info"
                  type="textarea"
                  placeholder="Escribe aquí"
                  rows={3}
                  maxLength={500}
                />

                {/* Fila 5: SSO */}
                <div className="space-y-3 pt-2">
                  <p
                    className="text-xs text-subtext text-center"
                    id="reg-sso-label"
                  >
                    Continuar con Google
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    aria-labelledby="reg-sso-label"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <GoogleIcon />
                    Google
                  </Button>
                </div>

                {/* Fila 6: Botón Registrarse */}
                <Button type="submit" variant="primary" className="w-full">
                  Registrarse
                </Button>
              </div>

              {/* ——— Columna Derecha: Avatar / Imagen ——— */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full aspect-square border border-border rounded-2xl flex items-center justify-center bg-brand">
                  <span className="text-icon text-sm" aria-hidden="true">
                    Sin imagen
                  </span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  aria-label="Agregar imagen de perfil"
                >
                  Agregar imagen
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
