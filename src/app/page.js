"use client";

import Link from "next/link";
import { useHookNavigation } from "@/hooks/useAuthRedirect";
import Image from "next/image";
import HomeCards from "@/components/home/HomeCards";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TreeSVG from "@/components/home/TreeSvg";
import Logo from "@/components/ui/Logo";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { useContext } from "react";
import { darkModeContext } from "@/components/ui/DarkModeProvider";


const cardData = [
  {
    title: "Control de Combustible",
    description:
      "Registra cada carga y detecta gastos fuera de lo normal en tiempo real.",
    icon: <LocalGasStationOutlinedIcon sx={{ fontSize: 52 }} />,
  },
  {
    title: "Gestión de Flota",
    description:
      "Administra todos tus vehículos desde un solo panel, con su historial completo.",
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 52 }} />,
  },
  {
    title: "Reportes y Métricas",
    description:
      "Visualiza estadísticas claras de rendimiento y costos por vehículo.",
    icon: <ShowChartOutlinedIcon sx={{ fontSize: 52 }} />,
  },
  {
    title: "Alertas Inteligentes",
    description:
      "Recibe notificaciones cuando un vehículo necesita mantención o revisión.",
    icon: <NotificationsActiveOutlinedIcon sx={{ fontSize: 52 }} />,
  },
];

export default function Home() {
  /* hook personalizado de navegacion y auth */
  const { handleRedirect } = useHookNavigation();
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);

  return (
    <div
      className="w-full min-h-screen overflow-hidden bg-background text-text"
      lang="es"
    >
      {/* encabezado de la pagina principal */}
      <header className="w-full bg-header flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-border border-b-2 flex-wrap gap-2">
        {/* Logo Kutrol y Nombre */}
        <Logo fondo={darkMode ? "oscuro" : "claro"} />
        {/* barra de navegacion */}
        <nav className="items-center px-4 py-2">
          <ul className="flex flex-row justify-between gap-3 items-center">
            <li>
              <Link
                className="text-subtext hover:text-text"
                href={"#Que-hace-kutrol"}
              >
                ¿Qué hace?
              </Link>
            </li>
            <li>
              <Link className="text-subtext hover:text-text" href={"#Pasos"}>
                Pasos
              </Link>
            </li>
            <li>
              <Link
                className="text-subtext hover:text-text"
                href={"#Registrate"}
              >
                Regístrate
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenedor Botones de registro y inicio de sesion */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:text-text"
            aria-label="Alternar modo oscuro"
            aria-pressed={darkMode}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <ModeNightOutlinedIcon />}
          </button>
          <button
            onClick={() => {
              handleRedirect("/login");
            }}
            className="text-xs sm:text-sm font-medium text-subtext transition-colors hover:text-text px-2 sm:px-4 py-1 sm:py-2"
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => {
              handleRedirect("/register");
            }}
            className="rounded-md bg-gold light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-ink light:text-white transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
          >
            Registrarse
          </button>
        </div>
      </header>

      <main id="contenido-principal">
      {/* Seccion principal Texto e imagenes   */}
      <section className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 w-full min-h-fit lg:min-h-screen items-center px-6 sm:px-8 lg:px-18 gap-8 lg:gap-12 py-12 lg:py-0">
        {/* Imagen trasera SVG */}
        <div className="absolute left-0 bottom-0 z-0 w-full sm:w-[65%] lg:w-[57%] max-h-[90%] flex items-end opacity-10 pointer-events-none -translate-x-2 lg:-translate-x-6 translate-y-2 lg:translate-y-4">
          <TreeSVG className="w-full h-auto object-contain object-bottom-left" />
        </div>

        {/* Columna izquierda Textos */}
        <div className="relative z-10 flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
          <p className="text-xs sm:text-sm text-subtext">
            Herramienta en Gestión de Flota y Combustible
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-tight text-text">
            Rentabilidad <br />
            Para ti, <br />
            Respiro para el <br />
            planeta
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-subtext mx-auto lg:mx-0">
            Kutrol te permite monitorear el gasto de combustible de tu flota en
            tiempo real, identificar patrones de consumo y tomar decisiones que
            reducen costos operativos sin complicaciones.
          </p>
        </div>

        {/* Columna derecha Imagenes Superpuestas */}
        <div className="relative z-10 w-full max-w-full sm:max-w-125 lg:max-w-162.5 h-65 sm:h-95 lg:h-120 flex items-center justify-center mx-auto mt-8 lg:mt-0">
          <div className="absolute top-0 left-0 w-[82%] rounded-lg overflow-hidden shadow-xl -translate-x-2 -translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980331/imagen_2026-08-29_011211191.png"
              alt="imagen panel de estadistica de la aplicacion"
              width={400}
              height={400}
              className="w-full h-auto object-cover opacity-80"
            />
          </div>

          <div className="absolute bottom-0 right-0 z-10 w-[85%] rounded-lg overflow-hidden shadow-2xl border border-white/10 light:border-border translate-x-2 translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980138/imagen_2026-08-29_010859066.png"
              alt="Imagen del panel de Dashboard de la aplicacion"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Seccion  "Que hace Kutrol" */}
      <section
        id="Que-hace-kutrol"
        className="relative w-full px-6 md:px-16 py-12 md:py-16 md:pl-32"
      >
        {/* Linea vertical y circulo con Numero 1 */}
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="text-xl lg:text-2xl flex h-10 w-10 lg:h-12 lg:w-12 bg-border light:bg-card justify-center rounded-full text-subtext light:text-icon font-semibold shrink-0 items-center">
            1
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

        {/* Encabezado */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-bold text-2xl md:text-4xl text-text">
            ¿Qué puedes hacer con Kutrol?
          </h2>
        </div>

        {/* Grilla de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl gap-4 md:gap-8 mx-auto md:mx-0">
          {cardData.map((card, index) => {
            return (
              <HomeCards
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            );
          })}
        </div>
      </section>

      {/* Seccion Pasos Para iniciar */}
      <section className="relative w-full mt-8 md:mt-15 px-6 md:px-16 py-12 md:py-16 md:pr-32 bg-header text-text">
        {/* Linea vertical derecha y circulo con numero 2 */}
        <div className="hidden md:flex absolute right-8 lg:right-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border light:bg-card text-subtext light:text-icon font-semibold text-xl lg:text-2xl shrink-0">
            2
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

        {/* Contenedor de Pasos */}
        <div
          id="Pasos"
          className="max-w-4xl mx-auto md:mr-0 md:ml-auto flex flex-col gap-y-8 md:gap-y-12"
        >
          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
                1
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold text-text">
                  Registra tus Vehículos
                </h3>
                <p className="text-sm text-subtext">
                  Suma cada unidad de tu flota con sus datos básicos y
                  documentos.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
                2
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold text-text">
                  Registra Tus Datos
                </h3>
                <p className="text-sm text-subtext">
                  Cada carga de combustible y cada viaje queda guardado
                  automáticamente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
                3
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold text-text">
                  Visualiza y Optimiza
                </h3>
                <p className="text-sm text-subtext">
                  El panel te muestra dónde estás gastando de más y qué
                  vehículos necesitan atención.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion  Registro */}
      <section
        id="Registrate"
        className="relative w-full flex items-center justify-center px-6 md:px-16 py-12 md:py-16 md:pl-32 bg-header text-text"
      >
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border light:bg-card text-subtext light:text-icon font-semibold text-xl lg:text-2xl shrink-0">
            3
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

        <div className="max-w-6xl w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-border light:bg-card p-6 sm:p-10 gap-y-4 sm:gap-y-0">
            <div className="flex flex-col gap-y-2 pb-0 sm:pb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-text">
                Regístrate
              </h2>
              <p className="text-sm text-subtext light:text-icon">
                Crea una cuenta y registra tu primer vehículo en minutos.
              </p>
            </div>
            <button
              onClick={() => {
                handleRedirect("/register");
              }}
              className="rounded-md bg-gold light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-ink light:text-white lg:px-6 lg:py-3 lg:text-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>
      </main>

      {/* Acerca de Equipo Kutrol (footer) */}
      <footer className="w-full flex flex-col mt-10 gap-1 pb-4">
        <div className="w-full h-0.5 bg-linear-to-r from-gold light:from-accent via-border to-transparent"></div>

        <div className="w-full bg-footer rounded-t-2xl">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 px-6 sm:px-16 py-10">
            {/* Logo y descripción corta */}
            <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left max-w-xs">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-gold light:bg-accent flex items-center justify-center text-ink light:text-white font-bold text-sm">
                  K
                </span>
                <span className="text-xl font-bold text-text tracking-tighter">
                  Kutrol
                </span>
              </div>
              <p className="text-xs text-subtext light:text-icon leading-relaxed">
                Gestión inteligente de flota y combustible para tu empresa.
              </p>
              <div className="flex gap-3 mt-1">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
                  aria-label="Facebook"
                >
                  <FacebookIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
                  aria-label="Instagram"
                >
                  <InstagramIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon sx={{ fontSize: 16 }} />
                </a>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-text">
                Navegación
              </span>
              <Link
                className="text-xs text-subtext light:text-icon hover:text-text"
                href={"#Que-hace-kutrol"}
              >
                ¿Qué hace?
              </Link>
              <Link
                className="text-xs text-subtext light:text-icon hover:text-text"
                href={"#Pasos"}
              >
                Pasos
              </Link>
              <Link
                className="text-xs text-subtext light:text-icon hover:text-text"
                href={"#Registrate"}
              >
                Regístrate
              </Link>
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-text">Contacto</span>
              <span className="text-xs text-subtext light:text-icon flex items-center gap-1">
                <MailOutlineIcon className="text-icon" sx={{ fontSize: 14 }} />
                contacto@kutrol.cl
              </span>
              <span className="text-xs text-subtext light:text-icon flex items-center gap-1">
                <LocationOnOutlinedIcon
                  className="text-icon"
                  sx={{ fontSize: 14 }}
                />
                Castro, Chile
              </span>
              <Link
                href="/acerca_de"
                className="text-xs text-gold light:text-text light:decoration-accent hover:text-text mt-1 underline underline-offset-2"
              >
                Quiénes somos
              </Link>
            </div>
          </div>
        </div>

        {/*sub Footer   */}
        <div className="w-full bg-border h-1"></div>
        <p className="text-xs sm:text-sm text-subtext px-5 text-center sm:text-left pt-2">
          Proyecto de Ingenieria Civil en Informatica | Ulagos 2026
        </p>
      </footer>
    </div>
  );
}