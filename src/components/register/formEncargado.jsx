import Link from "next/link";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import GoogleIcon from "../ui/GoogleIcon";

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

const FormEncargado = ({ Submit, errors = {}, onGoogle }) => {
  return (
    <div className="flex flex-col gap-6 m-4">
      {/* Google */}
      <button
        type="button"
        onClick={onGoogle}
        className="flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-border light:bg-background px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-border light:hover:bg-card focus-visible:outline-2 focus-visible:outline-accent"
      >
        <GoogleIcon />
        Continuar con Google
      </button>

      {/* Divisor */}
      <div className="flex items-center gap-3" role="separator">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-subtext light:text-icon">o con tu correo</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={Submit} className="flex flex-col gap-[18px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Primer nombre"
            id="firstName"
            required
            placeholder="Juan"
          />
          <FormField
            label="Apellidos"
            id="lastName"
            required
            placeholder="Pérez González"
          />
        </div>

        <FormField
          label="Email"
          id="email"
          type="email"
          required
          placeholder="juan.perez@correo.cl"
        />

        <FormField
          label="Cargo"
          id="position"
          required
          placeholder="Ej: Gerente de operaciones"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Contraseña"
            id="password"
            type="password"
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
            error={errors.password}
          />
          <FormField
            label="Repetir contraseña"
            id="repeat-password"
            type="password"
            required
            placeholder="Repite tu contraseña"
            error={errors.repeatPassword}
          />
        </div>

        {/* Acciones */}
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