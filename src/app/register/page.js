"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import FormEncargado from "@/components/register/formEncargado";
import FormEmpresa from "@/components/register/formEmpresa";
import { registrarEmpresaYEncargado } from "@/services/client/auth.service";
import { mensajePassword } from "@/lib/passwordPolicy";
import { validarEmpresa } from "@/lib/validarEmpresa";
import Logo from "@/components/ui/Logo";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
import { useToast } from "@/components/ui/Toasts";

const CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Register() {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  const { mostrar } = useToast();
  const router = useRouter();

  const [paso] = useState([
    { numero: 1, titulo: "Datos del Encargado", subtext: "Registra tus datos como encargado primero" },
    { numero: 2, titulo: "Datos de la Empresa", subtext: "Registra los datos de la empresa" },
  ]);

  const [datos, setDatos] = useState({ encargado: {}, empresa: {} });
  const [formularioActivo, setFormularioActivo] = useState(true);
  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function actualizarEncargado(valores) {
    setDatos((previo) => ({
      ...previo,
      encargado: { ...previo.encargado, ...valores },
    }));
    setErrors((previos) => (Object.keys(previos).length ? {} : previos));
  }

  function actualizarEmpresa(valores) {
    setDatos((previo) => ({
      ...previo,
      empresa: { ...previo.empresa, ...valores },
    }));
    setErrors((previos) => (Object.keys(previos).length ? {} : previos));
  }

  function handleEncargadoSubmit(valores) {
    const errs = {};
    if ((valores.primer_nombre ?? "").trim().length < 2) {
      errs.primer_nombre = "Escribe tu primer nombre";
    }
    if ((valores.apellidos ?? "").trim().length < 2) {
      errs.apellidos = "Escribe tus apellidos";
    }
    if (!CORREO.test((valores.email ?? "").trim())) {
      errs.email = "Escribe un email válido";
    }

    const cargo = (valores.cargo ?? "").trim();
    if (cargo.length < 2) {
      errs.cargo = "Selecciona un cargo";
    }

    const passwordError = mensajePassword(valores.password);
    if (passwordError) errs.password = passwordError;
    if (valores.password !== valores.repeatPassword) {
      errs.repeatPassword = "Las contraseñas no coinciden";
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setFormularioActivo(false);
    setIndex(1);
  }

  async function handleEmpresaSubmit(empresa) {
    const errs = validarEmpresa(empresa);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const encargado = { ...datos.encargado };
      delete encargado.repeatPassword;

      await registrarEmpresaYEncargado({ Encargado: encargado, Empresa: empresa });
      mostrar("Registro completado. Te llevamos al panel.", "exito");
      router.push("/dashboard");
    } catch (error) {
      const campos = {
        "empresa.rut": "rut",
        "encargado.password": "password",
        "encargado.repeatPassword": "repeatPassword",
      };
      const erroresCampo = {};
      const sueltos = [];
      for (const [clave, mensaje] of Object.entries(error.details || {})) {
        if (typeof mensaje !== "string") continue;
        const campo = campos[clave];
        if (campo) erroresCampo[campo] = mensaje;
        else sueltos.push(mensaje);
      }
      const general = sueltos.length ? sueltos.join(". ") : error.message;
      setErrors({
        ...erroresCampo,
        form: Object.keys(erroresCampo).length ? "" : general,
      });
      mostrar(Object.values(erroresCampo)[0] ?? general, "error");
    } finally {
      setSubmitting(false);
    }
  }

  function volverAlPaso1(valores) {
    actualizarEmpresa(valores);
    setErrors({});
    setIndex(0);
    setFormularioActivo(true);
  }

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-header border-b border-border flex items-center justify-between px-8 py-4 z-50">
        <div className="flex items-center gap-4">
          <Logo fondo={darkMode ? "oscuro" : "claro"} />
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <span className="text-lg font-bold text-text tracking-tight">Registro</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:bg-border/50 hover:text-text"
            aria-label="Alternar modo oscuro"
            aria-pressed={darkMode}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <ModeNightOutlinedIcon />}
          </button>
          <Link
            href="/login"
            className="text-sm text-subtext underline underline-offset-2 hover:text-text transition-colors"
            aria-label="Ir a la página de inicio de sesión"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="w-full sm:w-140 sm:max-w-205 p-6 sm:p-10">
          <div id="lineas-identificadoras" className="grid grid-cols-2 gap-0">
            <div
              id="linea-encargado"
              className={`w-full h-1 border-2 rounded-2xl ${
                formularioActivo ? "bg-accent border-accent" : "bg-border border-border"
              }`}
            ></div>
            <div
              id="linea-empresa"
              className={`w-full h-1  border-2 rounded-2xl ${
                formularioActivo ? "bg-border border-border" : "bg-accent border-accent"
              }`}
            ></div>
            <p className="text-accent light:text-accent-dark my-2">
              Paso {paso[index].numero} de 2
            </p>
          </div>
          <div id="contenedor-formulario-encargado">
            <h1 className=" text-text text-3xl font-bold">{paso[index].titulo}</h1>
            <span className="text-sm text-subtext font-semibold">{paso[index].subtext}</span>

            {formularioActivo ? (
              <FormEncargado
                defaults={datos.encargado}
                onCambio={actualizarEncargado}
                Submit={handleEncargadoSubmit}
                errors={errors}
              />
            ) : (
              <FormEmpresa
                defaults={datos.empresa}
                onCambio={actualizarEmpresa}
                onBack={volverAlPaso1}
                onSubmit={handleEmpresaSubmit}
                errors={errors}
                submitting={submitting}
              />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
