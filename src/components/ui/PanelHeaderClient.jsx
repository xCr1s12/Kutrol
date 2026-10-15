"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Logo from "@/components/ui/Logo";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
import { logout } from "@/services/client/auth.service";

export default function PanelHeaderClient({ Encargado, Empresa }) {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imagenRota, setImagenRota] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const dropdownRef = useRef(null);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      setIsOpen(false);
      router.replace("/login");
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "No se pudo cerrar sesión.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-2 flex-wrap gap-2 light:bg-header light:border-border dark:bg-header dark:border-border">
      <Logo fondo={darkMode ? "oscuro" : "claro"} href="/dashboard" className="h-12" />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:text-text"
          aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          aria-pressed={darkMode}
        >
          {darkMode ? <LightModeOutlinedIcon /> : <ModeNightOutlinedIcon />}
        </button>

        <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2.5 p-1.5 rounded-full hover:bg-border/50 transition-colors cursor-pointer focus:outline-none"
        >
          <img
            src={Empresa.url_imagen && !imagenRota ? Empresa.url_imagen : "/images/empresa-defecto.svg"}
            alt="Logo de la empresa"
            className="w-8 h-8 rounded-full object-cover"
            onError={() => setImagenRota(true)}
          />

          <span className="hidden sm:inline-block text-sm font-medium text-text">
            {Encargado.primer_nombre} {Encargado.apellidos}
          </span>

          {isOpen ? (
            <KeyboardArrowUpIcon
              className="text-icon"
              aria-hidden="false"
              aria-label="Cerrar Menu"
            />
          ) : (
            <KeyboardArrowDownIcon
              className="text-icon"
              aria-hidden="false"
              aria-label="Abrir Menu"
            />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl border shadow-lg py-2 z-50 bg-card border-border text-text">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-semibold text-text">
                {Encargado.primer_nombre} {Encargado.apellidos}
              </p>
              <p className="text-xs text-subtext truncate">{Encargado.email}</p>
            </div>

            <div className="py-1">
              <Link
                href="/configPanel"
                className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-border transition-colors"
              >
                <SettingsOutlinedIcon fontSize="small" className="text-icon" aria-hidden="true" />
                Configuración
              </Link>
            </div>

            <div className="border-t border-border pt-1">
              {logoutError && (
                <p role="alert" className="px-4 py-2 text-sm text-red-600">
                  {logoutError}
                </p>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer flex items-center gap-2.5"
              >
                <LogoutRoundedIcon fontSize="small" aria-hidden="true" />
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
