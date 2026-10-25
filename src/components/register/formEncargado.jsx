"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import {
  PASSWORD_MIN_LENGTH,
  evaluarPassword,
  fuerzaPassword,
} from "@/lib/passwordPolicy";
import { CARGOS } from "@/lib/cargos";

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const INPUT =
  "w-full bg-background border border-icon text-text placeholder-subtext rounded-md px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";

const TONOS_FUERZA = ["bg-danger", "bg-danger", "bg-gold", "bg-accent", "bg-brand"];

const VACIO = {
  primer_nombre: "",
  apellidos: "",
  email: "",
  cargo: "",
  password: "",
  repeatPassword: "",
};

function CampoPassword({ valor, onChange, error }) {
  const [visible, setVisible] = useState(false);
  const evaluacion = evaluarPassword(valor);
  const fuerza = fuerzaPassword(valor);

  return (
    <div className="flex flex-col gap-2">
      <FormField label="Contraseña" id="password" required error={error}>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            value={valor}
            onChange={(event) => onChange(event.target.value)}
            required
            minLength={PASSWORD_MIN_LENGTH}
            autoComplete="new-password"
            placeholder="Crea una contraseña"
            aria-invalid={!!error || undefined}
            aria-describedby="password-reglas password-fuerza"
            className={`${INPUT} pr-11`}
          />
          <button
            type="button"
            onClick={() => setVisible((actual) => !actual)}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={visible}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-icon transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
          >
            {visible ? (
              <VisibilityOffRoundedIcon fontSize="small" aria-hidden="true" />
            ) : (
              <VisibilityRoundedIcon fontSize="small" aria-hidden="true" />
            )}
          </button>
        </div>
      </FormField>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((nivel) => (
              <span
                key={nivel}
                className={`h-1 flex-1 rounded-full ${
                  valor && fuerza.puntaje >= nivel
                    ? TONOS_FUERZA[fuerza.puntaje]
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-subtext">
            {valor ? `Fuerza: ${fuerza.etiqueta}` : "Fuerza"}
          </span>
        </div>

        <ul
          id="password-reglas"
          aria-live="polite"
          className="flex flex-col gap-1 text-xs"
        >
          {evaluacion.reglas.filter((regla) => regla.visible !== false).map((regla) => (
            <li
              key={regla.id}
              className={regla.ok ? "text-accent" : "text-subtext"}
            >
              <span aria-hidden="true">{regla.ok ? "✓" : "•"}</span>{" "}
              {regla.etiqueta}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CAMPOS = {
  primer_nombre: "firstName",
  apellidos: "lastName",
  email: "email",
  cargo: "position",
  password: "password",
  repeatPassword: "repeat-password",
};

const FormEncargado = ({ Submit, errors = {}, defaults = {}, onCambio }) => {
  const [valores, setValores] = useState(() => ({
    ...VACIO,
    ...defaults,
    repeatPassword: defaults.repeatPassword ?? defaults.password ?? "",
  }));

  const nombreOk = (valores.primer_nombre ?? "").trim().length >= 2;
  const apellidosOk = (valores.apellidos ?? "").trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((valores.email ?? "").trim());
  const cargoOk = Boolean(valores.cargo);

  useEffect(() => {
    const primero = Object.keys(errors).find((campo) => CAMPOS[campo]);
    if (primero) document.getElementById(CAMPOS[primero])?.focus();
  }, [errors]);

  function cambiar(campo) {
    return (event) => {
      const nuevo = { ...valores, [campo]: event.target.value };
      setValores(nuevo);
      onCambio?.(nuevo);
    };
  }

  return (
    <div className="flex flex-col gap-6 m-4">
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          Submit?.(valores);
        }}
        className="flex flex-col gap-[18px]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Primer nombre"
            id="firstName"
            required
            placeholder="Juan"
            value={valores.primer_nombre}
            onChange={cambiar("primer_nombre")}
            hint={nombreOk ? "✓ Nombre válido" : undefined}
            error={errors.primer_nombre}
            autoComplete="given-name"
          />
          <FormField
            label="Apellidos"
            id="lastName"
            required
            placeholder="Pérez González"
            value={valores.apellidos}
            onChange={cambiar("apellidos")}
            hint={apellidosOk ? "✓ Apellidos válidos" : undefined}
            error={errors.apellidos}
            autoComplete="family-name"
          />
        </div>

        <FormField
          label="Email"
          id="email"
          type="email"
          required
          placeholder="juan.perez@correo.cl"
          value={valores.email}
          onChange={cambiar("email")}
          hint={emailOk ? "✓ Email válido" : undefined}
          error={errors.email}
          autoComplete="email"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cargo" id="position" required error={errors.cargo} hint={cargoOk ? "✓ Cargo listo" : undefined}>
            <div className="relative">
              <select
                id="position"
                name="position"
                required
                value={valores.cargo}
                onChange={cambiar("cargo")}
                className={`${INPUT} appearance-none pr-10 ${
                  valores.cargo ? "" : "text-subtext/60"
                }`}
              >
                <option value="" disabled>
                  Selecciona un cargo
                </option>
                {CARGOS.map((cargo) => (
                  <option key={cargo} value={cargo} className="text-text bg-background">
                    {cargo}
                  </option>
                ))}
              </select>
              <KeyboardArrowDownRoundedIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtext/70"
                sx={{ fontSize: 20 }}
              />
            </div>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CampoPassword
            valor={valores.password}
            onChange={(valor) => {
              const nuevo = { ...valores, password: valor };
              setValores(nuevo);
              onCambio?.(nuevo);
            }}
            error={errors.password}
          />
          <FormField
            label="Repetir contraseña"
            id="repeat-password"
            required
            error={errors.repeatPassword}
            hint={
              valores.repeatPassword && valores.repeatPassword !== valores.password
                ? "Las contraseñas no coinciden"
                : undefined
            }
          >
            <input
              id="repeat-password"
              name="repeat-password"
              type="password"
              value={valores.repeatPassword}
              onChange={cambiar("repeatPassword")}
              required
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              aria-invalid={
                (!!errors.repeatPassword ||
                  (!!valores.repeatPassword &&
                    valores.repeatPassword !== valores.password)) ||
                undefined
              }
              aria-describedby="repeat-password-hint"
              className={INPUT}
            />
          </FormField>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <Button type="submit" className="flex  flex-1 justify-center items-center  gap-2">
            <span className="text-lg"> Continuar </span>
            <ArrowRight />
          </Button>
          <Link
            href="/login"
            className="rounded-[10px] border border-border px-6 py-3 text-[15px] text-text transition-colors hover:bg-border light:hover:bg-background focus-visible:outline-2 focus-visible:outline-accent"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormEncargado;
