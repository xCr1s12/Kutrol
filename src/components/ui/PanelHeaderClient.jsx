"use client";

<<<<<<< HEAD
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

=======
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function PanelHeaderClient({ Encargado, Empresa }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagenRota, setImagenRota] = useState(false);
  const dropdownRef = useRef(null);

>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
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
<<<<<<< HEAD
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
          className="flex items-center gap-x-2.5 p-1.5 rounded-full hover:bg-border/50 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <img
            src={Empresa.url_imagen && !imagenRota ? Empresa.url_imagen : "/images/empresa-defecto.svg"}
            alt="Logo de la empresa"
            className="w-8 h-8 rounded-full object-cover"
            onError={() => setImagenRota(true)}
          />

          <span className="hidden sm:inline-block text-sm font-medium text-text">
=======
    <header className="w-full bg-text flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#EAE5DA] border-b-2 flex-wrap gap-2">
      <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tighter">
        Kutrol
      </span>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2.5 p-1.5 rounded-full hover:bg-[#EAE5DA]/50 transition-colors cursor-pointer focus:outline-none"
        >
          <img
            src={Empresa.url_imagen && !imagenRota ? Empresa.url_imagen : "/images/empresa-defecto.svg"}
            alt="Logo de la empresa"
            className="w-8 h-8 rounded-full object-cover"
            onError={() => setImagenRota(true)}
          />

          <span className="hidden sm:inline-block text-sm font-medium text-[#1A1A1A]">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
            {Encargado.primer_nombre} {Encargado.apellidos}
          </span>

          {isOpen ? (
            <KeyboardArrowUpIcon
<<<<<<< HEAD
              className="text-icon"
=======
              htmlColor="#4A4A4A"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
              aria-hidden="false"
              aria-label="Cerrar Menu"
            />
          ) : (
            <KeyboardArrowDownIcon
<<<<<<< HEAD
              className="text-icon"
=======
              htmlColor="#4A4A4A"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
              aria-hidden="false"
              aria-label="Abrir Menu"
            />
          )}
        </button>

        {isOpen && (
<<<<<<< HEAD
          <div className="absolute right-0 mt-2 w-56 rounded-xl border shadow-lg py-2 z-50 bg-card border-border text-text">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-semibold text-text">
=======
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EAE5DA] rounded-xl shadow-lg py-2 z-50 text-[#1A1A1A]">
            <div className="px-4 py-2 border-b border-[#EAE5DA]">
              <p className="text-sm font-semibold text-[#1A1A1A]">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
                {Encargado.primer_nombre} {Encargado.apellidos}
              </p>
              <p className="text-xs text-subtext truncate">{Encargado.email}</p>
            </div>

            <div className="py-1">
<<<<<<< HEAD
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
=======
              <a
                href="/configPanel"
                className="block px-4 py-2 text-sm hover:bg-text transition-colors"
              >
                Configuración
              </a>
            </div>

            <div className="border-t border-[#EAE5DA] pt-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
              >
                Cerrar sesión
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
              </button>
            </div>
          </div>
        )}
<<<<<<< HEAD
        </div>
=======
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
      </div>
    </header>
  );
}
