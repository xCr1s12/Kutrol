"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from '@mui/icons-material/PieChart';
import RouteIcon from '@mui/icons-material/Route';
import FlagIcon from '@mui/icons-material/Flag';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

export default function Sidebar() {
  // array con rutas de navegación
  const NavRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon, aria: "Ir al Dashboard" },
<<<<<<< HEAD
<<<<<<< HEAD
    { name: "Estadísticas", path: "/statistic", icon: PieChartIcon, aria: "ir a Estadísticas" },
    { name: "Rutas", path: "/route", icon: RouteIcon, aria: "ir a Rutas" },
    { name: "Alertas", path: "/alerts", icon: FlagIcon, aria: "ir a Alertas" },
    { name: "Gestión", path: "/gestion", icon: LocalShippingOutlinedIcon, aria: "ir a Gestión" },
    { name: "Ambiente", path: "/ambiente", icon: LanguageRoundedIcon, aria: "ir a Ambiente y sostenibilidad" },
  ];

=======
    { name: "Estadisticas", path: "/statistic", icon: PieChartIcon, aria: "ir a Estadisticas" },
=======
    { name: "Estadísticas", path: "/statistic", icon: PieChartIcon, aria: "ir a Estadísticas" },
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
    { name: "Rutas", path: "/route", icon: RouteIcon, aria: "ir a Rutas" },
    { name: "Alertas", path: "/alerts", icon: FlagIcon, aria: "ir a Alertas" },
    { name: "Gestión", path: "/gestion", icon: LocalShippingOutlinedIcon, aria: "ir a Gestión" },
    { name: "Ambiente", path: "/ambiente", icon: LanguageRoundedIcon, aria: "ir a Ambiente y sostenibilidad" },
  ];
  
>>>>>>> f1e9fbd (pestaña de ambiente)
  const PathName = usePathname();

  // Control de estado de la barra lateral
  const [isActive, setIsActive] = useState(false);
  const ToggleSideBar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside
<<<<<<< HEAD
      className={`h-screen flex flex-col bg-brand transition-all duration-300 ${isActive ? "w-64" : "w-16"
        }`}
=======
      className={`h-screen bg-[#1B2B24] flex flex-col transition-all duration-300 ${
        isActive ? "w-64" : "w-16"
      }`}
>>>>>>> f1e9fbd (pestaña de ambiente)
    >
      {/* Botón de hamburguesa */}
      <div className="h-16 flex items-center pl-2.5">
        <div
<<<<<<< HEAD
          onClick={() => {
            ToggleSideBar();
          }}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          className="flex items-center gap-3 cursor-pointer p-2 rounded text-sage transition-colors"
=======
=======
          onClick={ToggleSideBar}
>>>>>>> f1e9fbd (pestaña de ambiente)
          className="flex items-center gap-3 text-subtext cursor-pointer p-2 rounded transition-colors"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
          className="flex items-center gap-3 cursor-pointer p-2 rounded text-[#A8B0AB] transition-colors"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        >
          {!isActive && (
<<<<<<< HEAD
            <MenuIcon aria-label="Abrir menú" aria-expanded={false} aria-hidden="false" />
          )}
          
          {isActive && (
            <span className="whitespace-nowrap overflow-hidden text-sm text-mist">
              Cerrar menú
=======
            <MenuIcon aria-label="Abrir menu" aria-expanded={false} aria-hidden="false" />
          )}
          
          {isActive && (
            <span className="whitespace-nowrap overflow-hidden text-sm text-[#C2C9C4]">
              Cerrar Menu
>>>>>>> f1e9fbd (pestaña de ambiente)
=======
          className="flex items-center gap-3 cursor-pointer p-2 rounded text-sage transition-colors"
        >
          {!isActive && (
            <MenuIcon aria-label="Abrir menú" aria-expanded={false} aria-hidden="false" />
          )}
          
          {isActive && (
            <span className="whitespace-nowrap overflow-hidden text-sm text-mist">
              Cerrar menú
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
            </span>
          )}  
        </div>
      </div>

      {/* Navegacion */}
      <nav className="flex flex-col gap-y-4 pt-20 flex-1">
        {NavRoutes.map((item) => {
          const isCurrentPath = PathName === item.path;
          const IconComponent = item.icon;

          return (
            <Link
              aria-label={item.aria}
              key={item.path}
              href={item.path}
<<<<<<< HEAD
              className={`flex items-center gap-4 p-3 rounded   transition-colors ${isCurrentPath
<<<<<<< HEAD
<<<<<<< HEAD
                  ? "border-l-4 border-gold bg-gold/20"
=======
                  ? "border-l-4 border-[#D4AF37] bg-[#D4AF37]/20"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
                  ? "border-l-4 border-gold bg-gold/20"
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
                  : "border-l-4 border-transparent"
                }`}
            >
              <div className="flex items-center justify-center min-w-6">
<<<<<<< HEAD
                <IconComponent
=======
                <item.icon
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
              className={`flex items-center gap-4 p-3 rounded transition-colors ${
                isCurrentPath
                  ? "border-l-4 border-[#D4AF37] bg-[#D4AF37]/50"
                  : "border-l-4 border-[#1B2B24]"
              }`}
            >
              <div className="flex items-center justify-center min-w-6">
                <IconComponent
>>>>>>> f1e9fbd (pestaña de ambiente)
                  aria-hidden="false"
<<<<<<< HEAD
<<<<<<< HEAD
                  className={isCurrentPath ? "text-gold" : "text-mist"}
=======
                  className={isCurrentPath ? "text-[#D4AF37]" : "text-[#C2C9C4]"}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
                  className={isCurrentPath ? "text-gold" : "text-mist"}
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
                  fontSize="medium"
                />
              </div>

              {isActive && (
                <span
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  className={`truncate text-sm font-bold ${isCurrentPath ? "text-cream" : "text-sage"}`}
=======
                  className={`truncate text-sm font-bold ${isCurrentPath ? " text-[#1A1A1A]" : "text-subtext"}`}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
=======
                  className={`truncate text-sm font-bold ${isCurrentPath ? "text-[#FDFBF7]" : "text-[#A8B0AB]"}`}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
                  className={`truncate text-sm font-bold ${
                    isCurrentPath ? "text-[#1A1A1A]" : "text-[#C2C9C4]"
                  }`}
>>>>>>> f1e9fbd (pestaña de ambiente)
=======
                  className={`truncate text-sm font-bold ${isCurrentPath ? "text-cream" : "text-sage"}`}
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
                >
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}