"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHookNavigation } from "@/hooks/useAuthRedirect";
import HomeCards from "@/components/home/HomeCards";
import TreeSVG from "@/components/home/TreeSvg";
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

 

{
  /*  Para fase de desarrollo 
  Card Data: datos necesarios para el componente home card
      titulo: titulo superior de la card 
      descripcion : texto inferior
      icon: svg, componente o texto que servira de icono en las esquinas de la card
*/
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

/* Enlaces de navegación: se reutilizan en el header (desktop y móvil) y en el footer */
const navLinks = [
  { label: "¿Qué hace?", href: "#Que-hace-kutrol" },
  { label: "Pasos", href: "#Pasos" },
  { label: "Quienes Somos", href: "/acerca_de" },
];

/* Pasos para iniciar */
const steps = [
  {
    title: "Registra tus Vehículos",
    description:
      "Suma cada unidad de tu flota con sus datos básicos y documentos.",
  },
  {
    title: "Registra tus Datos",
    description:
      "Cada carga de combustible y cada viaje queda guardado automáticamente.",
  },
  {
    title: "Visualiza y Optimiza",
    description:
      "El panel te muestra dónde estás gastando de más y qué vehículos necesitan atención.",
  },
];

/* Clases reutilizables */
const primaryButton =
  "rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/60";
const ghostButton =
  "px-4 py-2 text-sm font-medium text-subtext transition-colors hover:text-text";
const socialLink =
  "flex h-8 w-8 items-center justify-center rounded-full bg-border text-[#D4AF37] transition-colors hover:bg-[#3d4f45]";

export default function Home() {
  /* hook personalizado de navegación y auth */
  const { handleRedirect } = useHookNavigation();

  /* estado del menú hamburguesa (solo pantallas pequeñas) */
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className={` w-full min-h-screen overflow-hidden `}
      lang="es"
    >
      {/* encabezado de la pagina principal */}
      <header className=" w-full bg-[#1B2B24] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-border border-b-2 flex-wrap gap-2">
        {/* Logo Kutrol y Nombre */}
          <Logo />

        {/* barra de navegacion */}
        <nav className="items-center px-4 py-2">
          <ul className="flex flex-row ustify-between gap-3 items-center   ">
            <li>
              {" "}
              <Link
                className="text-subtext hover:text-text"
                href={"#Que-hace-kutrol"}
              >
                ¿Qué hace?{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                className="text-subtext hover:text-text"
                href={"#Pasos"}
              >
                Pasos{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="text-subtext hover:text-text"
                href={"#Registrate"}
              >
                Registrate{" "}
              </Link>
            </li>
          </ul>
        </nav>

            <div className="flex flex-col gap-2 border-t-2 border-border pt-4">
              <button
                onClick={() => {
                  closeMenu();
                  handleRedirect("/login");
                }}
                className={`${ghostButton} w-full text-left`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  closeMenu();
                  handleRedirect("/register");
                }}
                className={`${primaryButton} w-full`}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ───────────── Sección principal: texto e imágenes ───────────── */}
      <section className="relative grid min-h-fit w-full grid-cols-1 items-center gap-8 overflow-hidden px-6 py-12 sm:px-8 lg:min-h-screen lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-0">
        {/* Imagen trasera SVG */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 flex max-h-full w-full translate-y-2 items-end opacity-10 sm:w-2/3 lg:w-3/5 lg:translate-y-4">
          <TreeSVG className="h-auto w-full object-contain object-bottom-left" />
        </div>

        {/* Columna de textos (arriba en móvil) */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <p className="text-xs text-subtext sm:text-sm">
            Herramienta en Gestión de Flota y Combustible
          </p>
          <h1 className="text-3xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-7xl">
            Rentabilidad <br />
            Para ti, <br />
            Respiro para el <br />
            planeta
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-subtext lg:mx-0">
            Kutrol te permite monitorear el gasto de combustible de tu flota en
            tiempo real, identificar patrones de consumo y tomar decisiones que
            reducen costos operativos sin complicaciones.
          </p>
        </div>

        {/* Columna de imágenes superpuestas (abajo en móvil) */}
        <div className="relative z-10 mx-auto mt-8 flex h-64 w-full max-w-full items-center justify-center sm:h-96 sm:max-w-lg lg:mt-0 lg:h-120 lg:max-w-2xl">
          <div className="absolute left-0 top-0 w-4/5 -translate-x-2 -translate-y-2 overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980331/imagen_2026-08-29_011211191.png"
              alt="Imagen panel de estadística de la aplicación"
              width={400}
              height={400}
              className="h-auto w-full object-cover opacity-80"
            />
          </div>

          <div className="absolute bottom-0 right-0 z-10 w-5/6 translate-x-2 translate-y-2 overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980138/imagen_2026-08-29_010859066.png"
              alt="Imagen del panel de Dashboard de la aplicación"
              width={400}
              height={400}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ───────────── Sección "Qué hace Kutrol" ───────────── */}
      <section
        id="Que-hace-kutrol"
        className="relative w-full px-6 py-12 md:px-16 md:py-16 md:pl-32"
      >
        {/* Línea vertical y círculo con número 1 (solo desde md) */}
        <div className="absolute bottom-16 left-8 top-16 hidden flex-col items-center md:flex lg:left-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-12 lg:w-12 lg:text-2xl">
            1
          </div>
          <div className="mt-2 w-0.75 flex-1 bg-border"></div>
        </div>

        {/* Encabezado */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-bold text-text md:text-4xl">
            ¿Qué puedes hacer con Kutrol?
          </h2>
        </div>

        {/* Grilla de cards: 1 columna en móvil, 2 desde sm */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:mx-0 md:gap-8">
          {cardData.map((card) => (
            <HomeCards
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </section>

      {/* ───────────── Sección pasos para iniciar ───────────── */}
      <section
        id="Pasos"
        className="relative mt-8 w-full bg-[#1B2B24] px-6 py-12 text-text md:mt-16 md:px-16 md:py-16 md:pr-32"
      >
        {/* Línea vertical derecha y círculo con número 2 (solo desde md) */}
        <div className="absolute bottom-16 right-8 top-16 hidden flex-col items-center md:flex lg:right-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-14 lg:w-14 lg:text-2xl">
            2
          </div>
          <div className="mt-2 w-0.75 flex-1 bg-border"></div>
        </div>

        {/* Contenedor de pasos: siempre en columna */}
        <div className="mx-auto flex max-w-4xl flex-col gap-y-8 md:ml-auto md:mr-0 md:gap-y-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-start gap-3 border-b-2 border-border pb-8 sm:flex-row sm:items-center sm:gap-x-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-border text-xl font-bold text-text sm:h-16 sm:w-16 sm:text-3xl">
                {index + 1}
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg font-bold sm:text-2xl">{step.title}</h3>
                <p className="text-sm text-subtext">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Sección registro ───────────── */}
      <section
        id="Registrate"
        className="relative flex w-full items-center justify-center bg-[#1B2B24] px-6 py-12 text-text md:px-16 md:py-16 md:pl-32"
      >
        {/* Línea vertical y círculo con número 3 (solo desde md) */}
        <div className="absolute bottom-16 left-8 top-16 hidden flex-col items-center md:flex lg:left-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-14 lg:w-14 lg:text-2xl">
            3
          </div>
          <div className="mt-2 w-0.75 flex-1 bg-border"></div>
        </div>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-border p-6 sm:flex-row sm:items-center sm:p-10">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-2xl font-bold text-text sm:text-4xl">
                Regístrate
              </h2>
              <p className="text-sm text-subtext">
                Crea una cuenta y registra tu primer vehículo en minutos.
              </p>
            </div>
            <button
              onClick={() => handleRedirect("/register")}
              className={`${primaryButton} w-full sm:w-auto lg:px-6 lg:py-3 lg:text-xl`}
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── Footer ───────────── */}
      <footer className="mt-10 flex w-full flex-col gap-1 pb-4">
        <div className="h-0.5 w-full bg-linear-to-r from-[#D4AF37] via-border to-transparent"></div>

        <div className="w-full rounded-t-2xl bg-[#20332B]">
          {/* Columna alineada a la izquierda en móvil, fila desde md */}
          <div className="flex w-full flex-col items-start gap-10 px-6 py-10 sm:px-16 md:flex-row md:justify-between">
            {/* Logo y descripción corta */}
            <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left max-w-xs">
                            <Logo className="h-14" />
              <p className="text-xs text-subtext leading-relaxed">
                Gestión inteligente de flota y combustible para tu empresa.
              </p>
              <div className="mt-1 flex gap-3">
                <a href="#" className={socialLink} aria-label="Facebook">
                  <FacebookIcon sx={{ fontSize: 16 }} />
                </a>
                <a href="#" className={socialLink} aria-label="Instagram">
                  <InstagramIcon sx={{ fontSize: 16 }} />
                </a>
                <a href="#" className={socialLink} aria-label="LinkedIn">
                  <LinkedInIcon sx={{ fontSize: 16 }} />
                </a>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-semibold text-text">
                Navegación
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="text-xs text-subtext hover:text-text"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Contacto */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-semibold text-text">Contacto</span>
              <span className="flex items-center gap-1 text-xs text-subtext">
                <MailOutlineIcon sx={{ fontSize: 14 }} />
                contacto@kutrol.cl
              </span>
              <span className="flex items-center gap-1 text-xs text-subtext">
                <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                Castro, Chile
              </span>
              <Link
                href="/acerca_de"
                className="mt-1 text-xs text-[#D4AF37] underline underline-offset-2 hover:text-text"
              >
                Quiénes somos
              </Link>
            </div>
          </div>
        </div>

        {/* Sub footer */}
        <div className="h-1 w-full bg-border"></div>
        <p className="px-5 pt-2 text-left text-xs text-subtext sm:text-sm">
          Proyecto de Ingeniería Civil en Informática | Ulagos 2026
        </p>
      </footer>
    </div>
  );
}