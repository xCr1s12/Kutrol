"use client";

import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Logo from "@/components/ui/Logo";

export default function PanelHeaderClient({ Encargado, Empresa }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagenRota, setImagenRota] = useState(false);
  const dropdownRef = useRef(null);

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
      <header className="w-full bg-text flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#EAE5DA] border-b-2 flex-wrap gap-2">
      <Logo fondo="claro" href="/dashboard" className="h-12" />

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
            {Encargado.primer_nombre} {Encargado.apellidos}
          </span>

          {isOpen ? (
            <KeyboardArrowUpIcon
              htmlColor="#4A4A4A"
              aria-hidden="false"
              aria-label="Cerrar Menu"
            />
          ) : (
            <KeyboardArrowDownIcon
              htmlColor="#4A4A4A"
              aria-hidden="false"
              aria-label="Abrir Menu"
            />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EAE5DA] rounded-xl shadow-lg py-2 z-50 text-[#1A1A1A]">
            <div className="px-4 py-2 border-b border-[#EAE5DA]">
              <p className="text-sm font-semibold text-[#1A1A1A]">
                {Encargado.primer_nombre} {Encargado.apellidos}
              </p>
              <p className="text-xs text-subtext truncate">{Encargado.email}</p>
            </div>

            <div className="py-1">
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
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
