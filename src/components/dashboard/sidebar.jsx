"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
  const NavRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: <HomeOutlinedIcon htmlColor="#FFFFFF" /> },
    { name: "Estadisticas", path: "/statistic", icon: <HomeOutlinedIcon htmlColor="#FFFFFF" /> },
    { name: "Rutas", path: "/route", icon: <HomeOutlinedIcon htmlColor="#FFFFFF" /> },
    { name: "Alertas", path: "/alerts", icon: <HomeOutlinedIcon htmlColor="#FFFFFF" /> },
  ];

  const [isActive, setIsActive] = useState(false);  

  const ToggleSideBar = () => {
    setIsActive(!isActive);
  };

  const PathName = usePathname();

  return (
    <aside
      className={`h-screen bg-[#1B2B24] flex flex-col transition-all duration-300 ${
        isActive ? "w-64" : "w-16"
      }`}
    >
      {/* Botón de hamburguesa  */}
      <div className={'h-16 flex ${ isActive ? null :items-center} justify-center border-b border-gray-700/50'}>

        <button
            onClick={() => {
                ToggleSideBar();          
            }}

          className="text-white p-2  rounded transition-colors">
          <MenuIcon />
        </button>

      </div>

      {/* Navegacion */}
      <nav className="flex flex-col gap-y-4 py-6 px-2 flex-1">
        {NavRoutes.map((item) => {
          const isCurrentPath = PathName === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 p-3 rounded text-white  transition-colors ${
                isCurrentPath ? "bg-[#283e34] border-l-4 border-yellow-500" : ""
              }`}
            >
              <div className="flex items-center justify-center min-w-[24px]">
                {item.icon}
              </div>

              {isActive && (
                <span className="truncate text-sm font-medium">
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