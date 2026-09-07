"use client";

import Link from "next/link";
import {useHookNavigation} from "@/hooks/useAuthRedirect";
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

{
  /*  Para fase de desarrollo 
  Card Data: datos necesarios para el componente home card
      titulo: titulo superior de la card 
      descripcion : texto inferior
      icon: svg, componente o texto que servira de icono en las esquinas de la card
*/
}
const cardData = [
  {
    title: "Control de Combustible",
    description:
      "Registra cada carga y detecta gastos fuera de lo normal en tiempo real.",
    icon: <LocalGasStationOutlinedIcon sx={{fontSize: 40}} />,
  },
  {
    title: "Gestión de Flota",
    description:
      "Administra todos tus vehículos desde un solo panel, con su historial completo.",
    icon: <LocalShippingOutlinedIcon sx={{fontSize: 40}} />,
  },
  {
    title: "Reportes y Métricas",
    description:
      "Visualiza estadísticas claras de rendimiento y costos por vehículo.",
    icon: <ShowChartOutlinedIcon sx={{fontSize: 40}} />,
  },
  {
    title: "Alertas Inteligentes",
    description:
      "Recibe notificaciones cuando un vehículo necesita mantención o revisión.",
    icon: <NotificationsActiveOutlinedIcon sx={{fontSize: 40}}/>,
  },
];

export default function Home() {
  {
    /* hook personalizado de navegacion y auth */
  }
  const {handleRedirect} = useHookNavigation();

  return (
    <div
      className={` font-big w-full min-h-screen bg-[#1B2B24] overflow-hidden `}
      lang="es"
    >
      {/* encabezado de la pagina principal */}
      <header className=" w-full bg-[#1B2B24] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#314139] border-b-2 flex-wrap gap-2">
        {/* Logo Kutrol y Nombre */}
        <span className=" text-xl sm:text-2xl font-bold text-[#FDFBF7] tracking-tighter">
          Kutrol
        </span>

        {/* barra de navegacion */}
        <nav className="items-center px-4 py-2">
          <ul className="flex flex-row ustify-between gap-3 items-center   ">
            <li>
              {" "}
              <Link
                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Que-Hace-kutrol"}
              >
                ¿Qué hace?{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Pasos"}
              >
                Pasos{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Registrate"}
              >
                Registrate{" "}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenedor Botones de registro y inicio de sesion */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              handleRedirect("/login");
            }}
            className="text-xs sm:text-sm font-medium text-[#A8B0AB] transition-colors hover:text-[#FDFBF7] px-2 sm:px-4 py-1 sm:py-2"
          >
            Iniciar Sesion
          </button>

          <button
            onClick={() => {
              handleRedirect("/register");
            }}
            className="rounded-md bg-[#D4AF37] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]"
          >
            Registrarse
          </button>
        </div>
      </header>

      {/* Seccion principal Texto e imagenes   */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-fit lg:min-h-screen items-center px-6 sm:px-8 lg:px-18 gap-8 lg:gap-12 py-12 lg:py-0">
        {/* Columna izquierda Textos */}
        <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
          <p className="text-xs sm:text-sm text-[#A8B0AB]">
            Herramienta de Gestion de Flota y Combustible
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-tight text-[#FDFBF7]">
            Rentabilidad <br />
            Para ti <br />
            Respiro para el <br />
            planeta
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-[#A8B0AB] mx-auto lg:mx-0">
            Kutrol te permite monitorear el gasto de combustible de tu flota
            en tiempo real, identificar patrones de consumo y tomar
            decisiones que reducen costos operativos sin complicaciones.
          </p>
        </div>
        {/* Columna derecha Imagenes Superpuestas */}
        <div className="relative w-full max-w-full sm:max-w-[500px] lg:max-w-[650px] h-[260px] sm:h-[380px] lg:h-[480px] flex items-center justify-center mx-auto mt-8 lg:mt-0">
          <div className="absolute top-0 left-0 w-[82%] rounded-lg overflow-hidden shadow-xl -translate-x-2 -translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980331/imagen_2026-08-29_011211191.png"
              alt="imagen panel de estadistica de la aplicacion"
              width={400}
              height={400}
              className="w-full h-auto object-cover opacity-80"
            />
          </div>

          <div className="absolute bottom-0 right-0 z-10 w-[85%] rounded-lg overflow-hidden shadow-2xl border border-white/10 translate-x-2 translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980138/imagen_2026-08-29_010859066.png"
              alt="Imagen del panel de Dashboard de la aplicacion"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
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
          <div className="text-xl lg:text-2xl flex h-10 w-10 lg:h-12 lg:w-12 bg-[#314139] justify-center rounded-full text-[#A8B0AB] font-semibold shrink-0 items-center">
            1
          </div>
          <div className="w-[3px] flex-1 bg-[#314139] mt-2"></div>
        </div>

        {/* Encabezado */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-sm text-[#A8B0AB] font-semibold"> Qué Hace</p>
          <h2 className="font-bold text-2xl md:text-4xl text-[#FDFBF7]">
            {" "}
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
      <section className="relative w-full mt-8 md:mt-15 px-6 md:px-16 py-12 md:py-16 md:pr-32 bg-[#1B2B24] text-[#FDFBF7]">
        {/* Linea vertical derecha y circulo con numero 2 */}
        <div className="hidden md:flex absolute right-8 lg:right-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-[#314139] text-[#A8B0AB] font-semibold text-xl lg:text-2xl shrink-0">
            2
          </div>
          <div className="w-[3px] flex-1 bg-[#314139] mt-2"></div>
        </div>

        {/* Contenedor de Pasos */}
        <div className="max-w-4xl mx-auto md:mr-0 md:ml-auto flex flex-col gap-y-8 md:gap-y-12">
          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-[#314139]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#314139] text-xl sm:text-3xl font-bold text-[#FDFBF7]">
                1
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold">
                  Registra tus Vehículos
                </h3>
                <p className="text-sm text-[#A8B0AB]">
                  Suma cada unidad de tu flota con sus datos básicos y
                  documentos.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-[#314139]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#314139] text-xl sm:text-3xl font-bold text-[#FDFBF7]">
                2
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold">
                  Registra Tus Datos
                </h3>
                <p className="text-sm text-[#A8B0AB]">
                  Cada carga de combustible y cada viaje queda guardado
                  automáticamente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 pb-8 border-b-2 border-[#314139]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-8">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#314139] text-xl sm:text-3xl font-bold text-[#FDFBF7]">
                3
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-lg sm:text-2xl font-bold">
                  Vizualiza y Optimiza
                </h3>
                <p className="text-sm text-[#A8B0AB]">
                  El panel te muestra dónde estás gastando de más y qué
                  vehículos necesitan atención.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion  Registro */}
      <section className="relative w-full flex items-center justify-center px-6 md:px-16 py-12 md:py-16 md:pl-32 bg-[#1B2B24] text-[#FDFBF7]">
        <div className="hidden md:flex absolute left-8 lg:left-16 top-16 bottom-16 flex-col items-center">
          <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-[#314139] text-[#A8B0AB] font-semibold text-xl lg:text-2xl shrink-0">
            3
          </div>
          <div className="w-[3px] flex-1 bg-[#314139] mt-2"></div>
        </div>

        <div className="max-w-6xl w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-[#314139] p-6 sm:p-10 gap-y-4 sm:gap-y-0">
            <div className="flex flex-col gap-y-2 pb-0 sm:pb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#FDFBF7]">
                Regístrate
              </h2>
              <p className="text-sm text-[#A8B0AB]">
                Crea una cuenta y registra tu primer vehículo en minutos.
              </p>
            </div>
            <button
              onClick={() => {
                handleRedirect("/register");
              }}
              className="rounded-md bg-[#D4AF37] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] lg:px-6 lg:py-3 lg:text-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>

      {/* Acerca de Equipo Kutrol (footer) */}
      <footer className="w-full flex flex-col mt-10 gap-1 pb-4">
        <div className="w-full h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#314139] to-transparent"></div>

        <div className="w-full bg-[#20332B] rounded-t-2xl">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 px-6 sm:px-16 py-10">
            {/* Logo y descripción corta */}
            <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left max-w-xs">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                  K
                </span>
                <span className="text-xl font-bold text-[#FDFBF7] tracking-tighter">
                  Kutrol
                </span>
              </div>
              <p className="text-xs text-[#A8B0AB] leading-relaxed">
                Gestión inteligente de flota y combustible para tu empresa.
              </p>
              <div className="flex gap-3 mt-1">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon sx={{fontSize: 16}} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon sx={{fontSize: 16}} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon sx={{fontSize: 16}} />
                </a>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-[#FDFBF7]">
                Navegación
              </span>
              <Link
                className="text-xs text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Que-Hace-kutrol"}
              >
                ¿Qué hace?
              </Link>
              <Link
                className="text-xs text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Pasos"}
              >
                Pasos
              </Link>
              <Link
                className="text-xs text-[#A8B0AB] hover:text-[#FDFBF7]"
                href={"#Registrate"}
              >
                Regístrate
              </Link>
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <span className="text-sm font-semibold text-[#FDFBF7]">
                Contacto
              </span>
              <span className="text-xs text-[#A8B0AB] flex items-center gap-1">
                <MailOutlineIcon sx={{fontSize: 14}} />
                contacto@kutrol.cl
              </span>
              <span className="text-xs text-[#A8B0AB] flex items-center gap-1">
                <LocationOnOutlinedIcon sx={{fontSize: 14}} />
                Castro, Chile
              </span>
              <Link
                href="/acerca_de"
                className="text-xs text-[#D4AF37] hover:text-[#FDFBF7] mt-1 underline underline-offset-2"
              >
                Quiénes somos
              </Link>
            </div>
          </div>
        </div>

        {/*sub Footer   */}
        <div className="w-full bg-[#314139] h-[4px]"></div>
        <p className="text-xs sm:text-sm text-[#A8B0AB] px-5 text-center sm:text-left pt-2">
          {" "}
          Proyecto de Ingenieria Civil en Informatica | Ulagos 2026{" "}
        </p>
      </footer>
    </div>
  );
}