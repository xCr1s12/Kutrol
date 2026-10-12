"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import FormEncargado from "@/components/register/formEncargado"; // Con mayúscula
import FormEmpresa from "@/components/register/formEmpresa";
import { registrarEmpresaYEncargado } from "@/services/client/auth.service";
<<<<<<< HEAD
import Logo from "@/components/ui/Logo";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
=======
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)

export default function Register() {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  const router = useRouter();
  const [formularioActivo, setFormularioActivo] = useState(true);
  const [paso] = useState([
<<<<<<< HEAD
    {numero :1 , titulo: "Datos del Encargado", subtext: "Registra tus datos como encargado primero"},
    {numero: 2, titulo: "Datos de la Empresa", subtext: "Registra los datos de la empresa"}
=======
    {numero :1 , titulo: "Datos del Encargado", subtext: "Registra tus datos como encargado Primero"},
    {numero: 2, titulo: "Datos de la Empresa", subtext: "Registra los datos de la Empresa"}
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
  ]);
  const [errors, setErrors] = useState({});
  const [index , setIndex] = useState(0);
  const [encargado, setEncargado] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEncargadoSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const errs = {};

    const password = String(data.get("password") || "");
    const repeatPassword = String(data.get("repeat-password") || "");
    if (password.length < 8) {
      errs.password = "Mínimo 8 caracteres";
    }
    if (password !== repeatPassword) {
      errs.repeatPassword = "Las contraseñas no coinciden";
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;
    setEncargado({
      primer_nombre: String(data.get("firstName") || "").trim(),
      apellidos: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      cargo: String(data.get("position") || "").trim(),
      password,
    });
    setFormularioActivo(false);
    setIndex(1);
  };

  const handleEmpresaSubmit = async (empresa) => {
    setSubmitting(true);
    setErrors({});

    try {
      await registrarEmpresaYEncargado({
        Encargado: encargado,
        Empresa: empresa,
      });
      router.push("/dashboard");
    } catch (error) {
      const details = error.details || {};
      const detailMessages = Object.values(details).filter(
        (message) => typeof message === "string",
      );
      setErrors({
        password: details["encargado.password"],
        rut: details["empresa.rut"],
        form: detailMessages.length
          ? `${error.message}: ${detailMessages.join(". ")}`
          : error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      {/* Navbar */}
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
            className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:text-text"
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

      {/* Contenedor centrado */}
<<<<<<< HEAD
      <main className="flex-1 flex items-center justify-center px-4 py-24">
=======
      <div className="flex-1 flex items-center justify-center px-4 py-24">
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
        <Card className="w-140 max-w-205 p-10">
          <div id="lineas-identificadoras" className="grid grid-cols-2 gap-0">
            <div
              id="linea-encargado"
              className={`w-full h-1 border-2 rounded-2xl ${
                formularioActivo
                  ? "bg-accent border-accent"
<<<<<<< HEAD
                  : "bg-border border-border"
=======
                  : "bg-brand border-accent/20"
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
              }`}
            ></div>
            <div
              id="linea-empresa"
              className={`w-full h-1  border-2 rounded-2xl ${
                formularioActivo
<<<<<<< HEAD
                  ? "bg-border border-border"
                  : "bg-accent border-accent"
              }`}
            ></div>
            <p className="text-accent light:text-accent-dark my-2"> Paso {paso[index].numero} de 2</p>
=======
                  ? "bg-brand border-accent/20"
                  : "bg-accent border-accent"
              }`}
            ></div>
            <p className="text-accent my-2"> Paso {paso[index].numero} de 2</p>
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
          </div>
          <div id="contenedor-formulario-encargado">
            <h1 className=" text-text text-3xl font-bold">{paso[index].titulo}</h1>
            <span className="text-sm text-subtext font-semibold" >{paso[index].subtext}</span>

            {formularioActivo ? (
              <FormEncargado
                Submit={handleEncargadoSubmit}
                errors={errors}
              />
            ) : (
              <FormEmpresa onBack={( ) => {
                setIndex(0)
                setFormularioActivo(true)
              }} onSubmit={handleEmpresaSubmit} errors={errors} submitting={submitting} />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}