"use client";

import Link from "next/link";
<<<<<<< HEAD
<<<<<<< HEAD
import { useHookNavigation } from "@/hooks/useAuthRedirect";
=======
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
import Image from "next/image";
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import TreeSVG from "@/components/home/TreeSvg";
=======
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
import Logo from "@/components/ui/Logo";
<<<<<<< HEAD
=======
import TreeSVG from "@/components/home/TreeSvg";
import Logo from "@/components/ui/Logo";
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { useContext } from "react";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
<<<<<<< HEAD
=======
>>>>>>> 58dd317 (Agregando logo a registro, inicio sesion y pagina inicial)


<<<<<<< HEAD
=======
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

=======
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
/*
  Card Data: datos necesarios para el componente HomeCards
    title: título superior de la card
    description: texto inferior
    icon: svg, componente o texto que servirá de icono en las esquinas de la card
*/
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======


>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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

<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
      <header className="w-full bg-header flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-border border-b-2 flex-wrap gap-2">
        {/* Logo Kutrol y Nombre */}
        <Logo fondo={darkMode ? "oscuro" : "claro"} />
=======
      <header className=" w-full bg-[#1B2B24] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-border border-b-2 flex-wrap gap-2">
        {/* Logo Kutrol y Nombre */}
          <Logo />

>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
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
<<<<<<< HEAD
              <Link className="text-subtext hover:text-text" href={"#Pasos"}>
                Pasos
=======
              {" "}
              <Link
                className="text-subtext hover:text-text"
                href={"#Pasos"}
              >
                Pasos{" "}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
              </Link>
            </li>
            <li>
              <Link
                className="text-subtext hover:text-text"
<<<<<<< HEAD
                href={"/acerca_de"}
=======
                href={"#Registrate"}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
              >
                Quienes Somos
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
=======
/* Enlaces de navegación: se reutilizan en el header (desktop y móvil) y en el footer */
const navLinks = [
  { label: "¿Qué hace?", href: "#Que-hace-kutrol" },
  { label: "Pasos", href: "#Pasos" },
  { label: "Regístrate", href: "#Registrate" },
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

=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
export default function Home() {
  /* hook personalizado de navegacion y auth */
  const { handleRedirect } = useHookNavigation();
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full overflow-hidden" lang="es">
      {/* ───────────── Encabezado ───────────── */}
      <header className="relative w-full border-b-2 border-border bg-[#1B2B24]">
<<<<<<< HEAD
        <div className="flex items-center justify-between px-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 md:py-4">
          {/* Logo Kutrol (izquierda) */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-text md:text-2xl"
          >
            Kutrol
          </Link>

          {/* Navegación desktop (oculta en móvil) */}
          <nav
            className="hidden md:block"
            aria-label="Navegación principal"
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
          >
=======
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* Logo Kutrol (izquierda) */}
          <Logo/>

          {/* Navegación desktop (oculta en móvil) */}
          <nav className="hidden md:block" aria-label="Navegación principal">
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
            <ul className="flex flex-row items-center justify-between gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-subtext hover:text-text"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botones desktop (ocultos en móvil) */}
<<<<<<< HEAD
          <div className="hidden items-center gap-4 md:flex md:justify-self-end">
=======
          <div className="hidden items-center gap-4 md:flex">
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
            <button
              onClick={() => handleRedirect("/login")}
              className={ghostButton}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => handleRedirect("/register")}
              className={primaryButton}
            >
              Registrarse
            </button>
          </div>

          {/* Botón hamburguesa (derecha, solo móvil) */}
=======
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
                Registrate
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenedor Botones de registro y inicio de sesion */}
        <div className="flex items-center gap-2 sm:gap-4">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
            Iniciar Sesion
          </button>

          <button
            onClick={() => {
              handleRedirect("/register");
            }}
            className="rounded-md bg-[#D4AF37] light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] light:text-white transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
          >
            Registrarse
          </button>
        </div>
      </header>

<<<<<<< HEAD
<<<<<<< HEAD
      <main id="contenido-principal">
      {/* Seccion principal Texto e imagenes   */}
      <section className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 w-full min-h-fit lg:min-h-screen items-center px-6 sm:px-8 lg:px-18 gap-8 lg:gap-12 py-12 lg:py-0">
=======
      {/* ───────────── Sección principal: texto e imágenes ───────────── */}
      <section className="relative grid min-h-fit w-full grid-cols-1 items-center gap-8 overflow-hidden px-6 py-12 sm:px-8 lg:min-h-screen lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-0">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
      {/* Seccion principal Texto e imagenes   */}
      <section className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 w-full min-h-fit lg:min-h-screen items-center px-6 sm:px-8 lg:px-18 gap-8 lg:gap-12 py-12 lg:py-0">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
<<<<<<< HEAD
<<<<<<< HEAD
          <p className="max-w-md text-sm leading-relaxed text-subtext mx-auto lg:mx-0">
<<<<<<< HEAD
            Kutrol te permite monitorear el gasto de combustible de tu flota en
            tiempo real, identificar patrones de consumo y tomar decisiones que
            reducen costos operativos sin complicaciones.
=======
            Kutrol te permite monitorear el gasto de combustible de tu flota
            en tiempo real, identificar patrones de consumo y tomar
            decisiones que reducen costos operativos sin complicaciones.
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
          <p className="mx-auto max-w-md text-sm leading-relaxed text-subtext lg:mx-0">
=======
          <p className="max-w-md text-sm leading-relaxed text-subtext mx-auto lg:mx-0">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            Kutrol te permite monitorear el gasto de combustible de tu flota en
            tiempo real, identificar patrones de consumo y tomar decisiones que
            reducen costos operativos sin complicaciones.
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
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

<<<<<<< HEAD
<<<<<<< HEAD
          <div className="absolute bottom-0 right-0 z-10 w-[85%] rounded-lg overflow-hidden shadow-2xl border border-white/10 light:border-border translate-x-2 translate-y-2">
=======
          <div className="absolute bottom-0 right-0 z-10 w-5/6 translate-x-2 translate-y-2 overflow-hidden rounded-lg border border-white/10 shadow-2xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
          <div className="absolute bottom-0 right-0 z-10 w-[85%] rounded-lg overflow-hidden shadow-2xl border border-white/10 light:border-border translate-x-2 translate-y-2">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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

<<<<<<< HEAD
<<<<<<< HEAD
      {/* Seccion  "Que hace Kutrol" */}
=======
      {/* ───────────── Sección "Qué hace Kutrol" ───────────── */}
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
      {/* Seccion  "Que hace Kutrol" */}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
      <section
        id="Que-hace-kutrol"
        className="relative w-full px-6 md:px-16 py-12 md:py-16 md:pl-32"
      >
<<<<<<< HEAD
<<<<<<< HEAD
        {/* Linea vertical y circulo con Numero 1 */}
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
<<<<<<< HEAD
          <div className="text-xl lg:text-2xl flex h-10 w-10 lg:h-12 lg:w-12 bg-border light:bg-card justify-center rounded-full text-subtext light:text-icon font-semibold shrink-0 items-center">
=======
          <div className="text-xl lg:text-2xl flex h-10 w-10 lg:h-12 lg:w-12 bg-border justify-center rounded-full text-subtext font-semibold shrink-0 items-center">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
        {/* Línea vertical y círculo con número 1 (solo desde md) */}
        <div className="absolute bottom-16 left-8 top-16 hidden flex-col items-center md:flex lg:left-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-12 lg:w-12 lg:text-2xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
        {/* Linea vertical y circulo con Numero 1 */}
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="text-xl lg:text-2xl flex h-10 w-10 lg:h-12 lg:w-12 bg-border light:bg-card justify-center rounded-full text-subtext light:text-icon font-semibold shrink-0 items-center">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            1
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

        {/* Encabezado */}
        <div className="mb-10 text-center md:text-left">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <h2 className="font-bold text-2xl md:text-4xl text-text">
=======

          <h2 className="font-bold text-2xl md:text-4xl text-text">
            {" "}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
          <h2 className="text-2xl font-bold text-text md:text-4xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
          <h2 className="font-bold text-2xl md:text-4xl text-text">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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

<<<<<<< HEAD
<<<<<<< HEAD
      {/* Seccion Pasos Para iniciar */}
<<<<<<< HEAD
=======
      {/* Seccion Pasos Para iniciar */}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
      <section className="relative w-full mt-8 md:mt-15 px-6 md:px-16 py-12 md:py-16 md:pr-32 bg-header text-text">
        {/* Linea vertical derecha y circulo con numero 2 */}
        <div className="hidden md:flex absolute right-8 lg:right-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border light:bg-card text-subtext light:text-icon font-semibold text-xl lg:text-2xl shrink-0">
<<<<<<< HEAD
=======
      <section className="relative w-full mt-8 md:mt-15 px-6 md:px-16 py-12 md:py-16 md:pr-32 bg-[#1B2B24] text-text">
        {/* Linea vertical derecha y circulo con numero 2 */}
        <div className="hidden md:flex absolute right-8 lg:right-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border text-subtext font-semibold text-xl lg:text-2xl shrink-0">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
      {/* ───────────── Sección pasos para iniciar ───────────── */}
      <section
        id="Pasos"
        className="relative mt-8 w-full bg-[#1B2B24] px-6 py-12 text-text md:mt-16 md:px-16 md:py-16 md:pr-32"
      >
        {/* Línea vertical derecha y círculo con número 2 (solo desde md) */}
        <div className="absolute bottom-16 right-8 top-16 hidden flex-col items-center md:flex lg:right-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-14 lg:w-14 lg:text-2xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            2
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        {/* Contenedor de Pasos */}
<<<<<<< HEAD
=======
        {/* Contenedor de Pasos */}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        <div
          id="Pasos"
          className="max-w-4xl mx-auto md:mr-0 md:ml-auto flex flex-col gap-y-8 md:gap-y-12"
        >
          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
<<<<<<< HEAD
=======
        <div 
        id="Pasos"
        className="max-w-4xl mx-auto md:mr-0 md:ml-auto flex flex-col gap-y-8 md:gap-y-12">
          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border text-xl sm:text-3xl font-bold text-text">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
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
<<<<<<< HEAD
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
=======
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border text-xl sm:text-3xl font-bold text-text">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
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
<<<<<<< HEAD
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border light:bg-card text-xl sm:text-3xl font-bold text-text">
=======
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-border text-xl sm:text-3xl font-bold text-text">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
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
<<<<<<< HEAD
      <section
        id="Registrate"
        className="relative w-full flex items-center justify-center px-6 md:px-16 py-12 md:py-16 md:pl-32 bg-header text-text"
      >
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border light:bg-card text-subtext light:text-icon font-semibold text-xl lg:text-2xl shrink-0">
=======
      <section 
      id="Registrate"
      className="relative w-full flex items-center justify-center px-6 md:px-16 py-12 md:py-16 md:pl-32 bg-[#1B2B24] text-text">
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border text-subtext font-semibold text-xl lg:text-2xl shrink-0">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
        {/* Contenedor de pasos: siempre en columna */}
        <div className="mx-auto flex max-w-4xl flex-col gap-y-8 md:ml-auto md:mr-0 md:gap-y-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-start gap-3 border-b-2 border-border pb-8 sm:flex-row sm:items-center sm:gap-x-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-border text-xl font-bold text-text sm:h-16 sm:w-16 sm:text-3xl">
                {index + 1}
=======
                1
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
                  Vizualiza y Optimiza
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
<<<<<<< HEAD
        {/* Línea vertical y círculo con número 3 (solo desde md) */}
        <div className="absolute bottom-16 left-8 top-16 hidden flex-col items-center md:flex lg:left-16">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xl font-semibold text-subtext lg:h-14 lg:w-14 lg:text-2xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-border light:bg-card text-subtext light:text-icon font-semibold text-xl lg:text-2xl shrink-0">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            3
          </div>
          <div className="w-0.75 flex-1 bg-border mt-2"></div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        <div className="max-w-6xl w-full">
<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-border light:bg-card p-6 sm:p-10 gap-y-4 sm:gap-y-0">
=======
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-border p-6 sm:p-10 gap-y-4 sm:gap-y-0">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
            <div className="flex flex-col gap-y-2 pb-0 sm:pb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-text">
=======
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-border p-6 sm:flex-row sm:items-center sm:p-10">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-2xl font-bold text-text sm:text-4xl">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
                Regístrate
              </h2>
<<<<<<< HEAD
              <p className="text-sm text-subtext light:text-icon">
=======
              <p className="text-sm text-subtext">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
        <div className="max-w-6xl w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-border light:bg-card p-6 sm:p-10 gap-y-4 sm:gap-y-0">
            <div className="flex flex-col gap-y-2 pb-0 sm:pb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-text">
                Regístrate
              </h2>
              <p className="text-sm text-subtext light:text-icon">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                Crea una cuenta y registra tu primer vehículo en minutos.
              </p>
            </div>
            <button
<<<<<<< HEAD
<<<<<<< HEAD
              onClick={() => {
                handleRedirect("/register");
              }}
              className="rounded-md bg-gold light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-ink light:text-white lg:px-6 lg:py-3 lg:text-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
=======
              onClick={() => handleRedirect("/register")}
              className={`${primaryButton} w-full sm:w-auto lg:px-6 lg:py-3 lg:text-xl`}
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
              onClick={() => {
                handleRedirect("/register");
              }}
              className="rounded-md bg-[#D4AF37] light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] light:text-white lg:px-6 lg:py-3 lg:text-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>
      </main>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* Acerca de Equipo Kutrol (footer) */}
      <footer className="w-full flex flex-col mt-10 gap-1 pb-4">
<<<<<<< HEAD
        <div className="w-full h-0.5 bg-linear-to-r from-gold light:from-accent via-border to-transparent"></div>
=======
        <div className="w-full h-0.5 bg-linear-to-r from-[#D4AF37] via-border to-transparent"></div>
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)

        <div className="w-full bg-footer rounded-t-2xl">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 px-6 sm:px-16 py-10">
=======
      {/* ───────────── Footer ───────────── */}
      <footer className="mt-10 flex w-full flex-col gap-1 pb-4">
        <div className="h-0.5 w-full bg-linear-to-r from-[#D4AF37] via-border to-transparent"></div>

        <div className="w-full rounded-t-2xl bg-[#20332B]">
          {/* Columna alineada a la izquierda en móvil, fila desde md */}
          <div className="flex w-full flex-col items-start gap-10 px-6 py-10 sm:px-16 md:flex-row md:justify-between">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
            {/* Logo y descripción corta */}
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="flex max-w-xs flex-col items-start gap-3 text-left">
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <span className="w-9 h-9 rounded-full bg-gold light:bg-accent flex items-center justify-center text-ink light:text-white font-bold text-sm">
=======
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#1A1A1A]">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
            <div className="flex max-w-xs flex-col items-start gap-3 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#1A1A1A]">
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
=======
      {/* Acerca de Equipo Kutrol (footer) */}
      <footer className="w-full flex flex-col mt-10 gap-1 pb-4">
        <div className="w-full h-0.5 bg-linear-to-r from-[#D4AF37] light:from-accent via-border to-transparent"></div>

        <div className="w-full bg-footer rounded-t-2xl">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 px-6 sm:px-16 py-10">
            {/* Logo y descripción corta */}
            <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left max-w-xs">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-[#D4AF37] light:bg-accent flex items-center justify-center text-[#1A1A1A] light:text-white font-bold text-sm">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                  K
                </span>
                <span className="text-xl font-bold text-text tracking-tighter">
                  Kutrol
                </span>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <p className="text-xs text-subtext light:text-icon leading-relaxed">
=======
=======
            <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left max-w-xs">
                            <Logo className="h-14" />
>>>>>>> 58dd317 (Agregando logo a registro, inicio sesion y pagina inicial)
              <p className="text-xs text-subtext leading-relaxed">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
                Gestión inteligente de flota y combustible para tu empresa.
              </p>
              <div className="flex gap-3 mt-1">
                <a
                  href="#"
<<<<<<< HEAD
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
=======
                  className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
                  aria-label="Facebook"
                >
                  <FacebookIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#"
<<<<<<< HEAD
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
=======
                  className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
                  aria-label="Instagram"
                >
                  <InstagramIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#"
<<<<<<< HEAD
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-gold light:text-accent transition-opacity hover:opacity-80"
=======
                  className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
                  aria-label="LinkedIn"
                >
=======
=======
>>>>>>> 4dac250 (fix(home): update navigation links and simplify header layout)
              <p className="text-xs leading-relaxed text-subtext">
=======
              <p className="text-xs text-subtext light:text-icon leading-relaxed">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                Gestión inteligente de flota y combustible para tu empresa.
              </p>
              <div className="flex gap-3 mt-1">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-[#D4AF37] light:text-accent transition-opacity hover:opacity-80"
                  aria-label="Facebook"
                >
                  <FacebookIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-[#D4AF37] light:text-accent transition-opacity hover:opacity-80"
                  aria-label="Instagram"
                >
                  <InstagramIcon sx={{ fontSize: 16 }} />
                </a>
<<<<<<< HEAD
                <a href="#" className={socialLink} aria-label="LinkedIn">
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-border light:bg-background flex items-center justify-center text-[#D4AF37] light:text-accent transition-opacity hover:opacity-80"
                  aria-label="LinkedIn"
                >
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                  <LinkedInIcon sx={{ fontSize: 16 }} />
                </a>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-text">
                Navegación
              </span>
<<<<<<< HEAD
<<<<<<< HEAD
              <Link
<<<<<<< HEAD
                className="text-xs text-subtext light:text-icon hover:text-text"
                href={"#Que-hace-kutrol"}
=======
                className="text-xs text-subtext hover:text-text"
                href={"#Que-Hace-kutrol"}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
              <Link
                className="text-xs text-subtext light:text-icon hover:text-text"
                href={"#Que-hace-kutrol"}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
              >
                ¿Qué hace?
              </Link>
              <Link
<<<<<<< HEAD
<<<<<<< HEAD
                className="text-xs text-subtext light:text-icon hover:text-text"
=======
                className="text-xs text-subtext hover:text-text"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
                className="text-xs text-subtext light:text-icon hover:text-text"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                href={"#Pasos"}
              >
                Pasos
              </Link>
              <Link
<<<<<<< HEAD
<<<<<<< HEAD
                className="text-xs text-subtext light:text-icon hover:text-text"
=======
                className="text-xs text-subtext hover:text-text"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
                className="text-xs text-subtext light:text-icon hover:text-text"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                href={"#Registrate"}
              >
                Regístrate
              </Link>
<<<<<<< HEAD
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
<<<<<<< HEAD
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
=======
              <span className="text-sm font-semibold text-text">
                Contacto
              </span>
              <span className="text-xs text-subtext flex items-center gap-1">
                <MailOutlineIcon sx={{fontSize: 14}} />
                contacto@kutrol.cl
              </span>
              <span className="text-xs text-subtext flex items-center gap-1">
                <LocationOnOutlinedIcon sx={{fontSize: 14}} />
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="text-xs text-subtext hover:text-text"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-text">Contacto</span>
              <span className="text-xs text-subtext light:text-icon flex items-center gap-1">
                <MailOutlineIcon className="text-icon" sx={{ fontSize: 14 }} />
                contacto@kutrol.cl
              </span>
<<<<<<< HEAD
              <span className="flex items-center gap-1 text-xs text-subtext">
                <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
              <span className="text-xs text-subtext light:text-icon flex items-center gap-1">
                <LocationOnOutlinedIcon
                  className="text-icon"
                  sx={{ fontSize: 14 }}
                />
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                Castro, Chile
              </span>
              <Link
                href="/acerca_de"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                className="text-xs text-gold light:text-text light:decoration-accent hover:text-text mt-1 underline underline-offset-2"
=======
                className="text-xs text-[#D4AF37] hover:text-text mt-1 underline underline-offset-2"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
                className="mt-1 text-xs text-[#D4AF37] underline underline-offset-2 hover:text-text"
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
                className="text-xs text-[#D4AF37] light:text-text light:decoration-accent hover:text-text mt-1 underline underline-offset-2"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
              >
                Quiénes somos
              </Link>
            </div>
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        {/*sub Footer   */}
        <div className="w-full bg-border h-1"></div>
        <p className="text-xs sm:text-sm text-subtext px-5 text-center sm:text-left pt-2">
<<<<<<< HEAD
          Proyecto de Ingenieria Civil en Informatica | Ulagos 2026
=======
          {" "}
          Proyecto de Ingenieria Civil en Informatica | Ulagos 2026{" "}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
        {/* Sub footer */}
        <div className="h-1 w-full bg-border"></div>
        <p className="px-5 pt-2 text-left text-xs text-subtext sm:text-sm">
          Proyecto de Ingeniería Civil en Informática | Ulagos 2026
>>>>>>> 7f07cba (feat: add route management and refactor home page layout)
=======
        {/*sub Footer   */}
        <div className="w-full bg-border h-1"></div>
        <p className="text-xs sm:text-sm text-subtext px-5 text-center sm:text-left pt-2">
          Proyecto de Ingenieria Civil en Informatica | Ulagos 2026
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        </p>
      </footer>
    </div>
  );
}