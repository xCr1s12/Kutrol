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
    <header className="w-full bg-cream flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-linen border-b-2 flex-wrap gap-2">
      {/* Logo Kutrol y Nombre */}
      <span className="text-xl sm:text-2xl font-bold text-ink tracking-tighter">
        Kutrol
      </span>

      {/* Contenedor del Perfil y Menu Desplegable */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2.5 p-1.5 rounded-full hover:bg-linen/50 transition-colors cursor-pointer focus:outline-none"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center font-bold text-xs">
            JD
          </div>

          <span className="hidden sm:inline-block text-sm font-medium text-ink">
            Jhon doe
          </span>

          {/* Icono de flecha indicadora */}
          {isOpen ? (
            <KeyboardArrowUpIcon htmlColor="#4A4A4A " aria-hidden="false" aria-label="Cerrar Menu" />
          ) : (
            <KeyboardArrowDownIcon htmlColor="#4A4A4A" aria-hidden="false" aria-label="Abrir Menu" />
          )}
        </button>

        {/* Menú Desplegable */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-linen rounded-xl shadow-lg py-2 z-50 text-ink">
            {/* Información del usuario */}
            <div className="px-4 py-2 border-b border-linen">
              <p className="text-sm font-semibold text-ink">Jhon Doe</p>
              <p className="text-xs text-sage truncate">
                jhoncito@kutrol.cl
              </p>
            </div>

            {/* Opciones del menú */}
            <div className="py-1">
              <a
                href="/configPanel"
                className="block px-4 py-2 text-sm hover:bg-cream transition-colors"
              >
                Configuración
              </a>
            </div>

            {/* Opción de cerrar sesión */}
            <div className="border-t border-linen pt-1">
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
