"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
  // array con con rutas de navegacion
  const NavRoutes = [
    {name: "Dashboard", path: "/dashboard", icon: HomeIcon},
    {name: "Estadisticas", path: "/statistic", icon: HomeIcon},
    {name: "Rutas", path: "/route", icon: HomeIcon},
    {name: "Alertas", path: "/alerts", icon: HomeIcon},
  ];
  const PathName = usePathname();

  // Control de estados entre si la barra lateral
  // esta desplegada o no

  const [isActive, setIsActive] = useState(false);
  const ToggleSideBar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside
      className={`h-screen bg-[#1B2B24] flex flex-col transition-all duration-300 ${
        isActive ? "w-64" : "w-16"
      }`}
    >
      {/* Botón de hamburguesa  */}
      <div
        className={`h-16 flex   ${
          isActive ? "justify-center" : "justify-center"
        }`}
      >
        <button
          onClick={() => {
            ToggleSideBar();
          }}
          className="text-[#A8B0AB] cursor-pointer p-2 rounded transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Navegacion */}
      <nav className="flex flex-col gap-y-4 pt-20  flex-1">
        {NavRoutes.map((item) => {
          const isCurrentPath = PathName === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 p-3 rounded   transition-colors ${
                isCurrentPath
                  ? " border-l-4 border-[#D4AF37] bg-[#D4AF37]/50"
                  : "border-l-4 border-[#1B2B24] "
              }`}
            >
              <div className="flex items-center justify-center min-w-[24px]">
                <item.icon
                  htmlColor={isCurrentPath ? "#D4AF37" : "#C2C9C4"}
                  fontSize="medium"
                />
              </div>

              {isActive && (
                <span
                  className={`truncate text-sm font-bold ${isCurrentPath ? " text-[#1A1A1A]" : "text-[#6E6E6E]"}`}
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
