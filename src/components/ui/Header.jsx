"use client";

import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierre de menu
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
    <header className="w-full bg-[#FDFBF7] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#EAE5DA] border-b-2 flex-wrap gap-2">
      {/* Logo Kutrol y Nombre */}
      <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tighter">
        Kutrol
      </span>

      {/* Contenedor del Perfil y Menu Desplegable */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2.5 p-1.5 rounded-full hover:bg-[#EAE5DA]/50 transition-colors cursor-pointer focus:outline-none"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#FDFBF7] flex items-center justify-center font-bold text-xs">
            JD
          </div>

          <span className="hidden sm:inline-block text-sm font-medium text-[#1A1A1A]">
            Jhon doe
          </span>

          {/* Icono de flecha indicadora */}
          {isOpen ? (
            <KeyboardArrowUpIcon htmlColor="#4A4A4A" />
          ) : (
            <KeyboardArrowDownIcon htmlColor="#4A4A4A" />
          )}
        </button>

        {/* Menú Desplegable */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EAE5DA] rounded-xl shadow-lg py-2 z-50 text-[#1A1A1A]">
            {/* Información del usuario */}
            <div className="px-4 py-2 border-b border-[#EAE5DA]">
              <p className="text-sm font-semibold text-[#1A1A1A]">Jhon Doe</p>
              <p className="text-xs text-[#A8B0AB] truncate">
                jhoncito@kutrol.cl
              </p>
            </div>

            {/* Opciones del menú */}
            <div className="py-1">
              <a
                href="/configPanel"
                className="block px-4 py-2 text-sm hover:bg-[#FDFBF7] transition-colors"
              >
                Configuración
              </a>
            </div>

            {/* Opción de cerrar sesión */}
            <div className="border-t border-[#EAE5DA] pt-1">
              <button
                onClick={() => {
                  // Lógica de cierre de sesión

                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
