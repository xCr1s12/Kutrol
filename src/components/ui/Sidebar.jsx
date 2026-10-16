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
    { name: "Estadísticas", path: "/statistic", icon: PieChartIcon, aria: "ir a Estadísticas" },
    { name: "Rutas", path: "/route", icon: RouteIcon, aria: "ir a Rutas" },
    { name: "Alertas", path: "/alerts", icon: FlagIcon, aria: "ir a Alertas" },
    { name: "Gestión", path: "/gestion", icon: LocalShippingOutlinedIcon, aria: "ir a Gestión" },
    { name: "Ambiente", path: "/ambiente", icon: LanguageRoundedIcon, aria: "ir a Ambiente y sostenibilidad" },
  ];

  const PathName = usePathname();

  // Control de estado de la barra lateral
  const [isActive, setIsActive] = useState(false);
  const ToggleSideBar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside
      className={`h-screen flex flex-col bg-brand transition-all duration-300 ${isActive ? "w-64" : "w-16"
        }`}
    >
      {/* Botón de hamburguesa */}
      <div className="h-16 flex items-center pl-2.5">
        <div
          onClick={() => {
            ToggleSideBar();
          }}

          className="flex items-center gap-3 cursor-pointer p-2 rounded text-sage transition-colors"
        >
          {!isActive && (
            <MenuIcon aria-label="Abrir menú" aria-expanded={false} aria-hidden="false" />
          )}
          
          {isActive && (
            <span className="whitespace-nowrap overflow-hidden text-sm text-mist">
              Cerrar menú
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
              className={`flex items-center gap-4 p-3 rounded   transition-colors ${isCurrentPath
                  ? "border-l-4 border-gold bg-gold/20"
                  : "border-l-4 border-transparent"
                }`}
            >
              <div className="flex items-center justify-center min-w-6">
                <IconComponent
                  aria-hidden="false"
                  className={isCurrentPath ? "text-gold" : "text-mist"}
                  fontSize="medium"
                />
              </div>

              {isActive && (
                <span
                  className={`truncate text-sm font-bold ${isCurrentPath ? "text-cream" : "text-sage"}`}
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