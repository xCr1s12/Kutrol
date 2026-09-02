"use client";
import Sidebar from "@/components/dashboard/sidebar";

export default function Dashboard() {
  return (
    <div className="flex w-full min-h-screen bg-[#FDFBF7] overflow-hidden" lang="es">
      {/* 1. Sidebar completo a la izquierda (ocupa todo el alto h-screen) */}
      <Sidebar />

      {/* 2. Contenedor derecho: Header arriba y Sección de contenido abajo */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="w-full bg-[#FDFBF7] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#EAE5DA] border-b-2 flex-wrap gap-2">
          {/* Logo Kutrol y Nombre */}
          <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tighter">
            Kutrol
          </span>

          {/* Contenedor Botón de Perfil */}
          <div>ICONO</div>
        </header>

        {/* Sección principal justo debajo del header */}
        <section className="bg-[#ffffff] w-full flex-1 p-4 sm:p-8">
          {/* Contenido principal */}
        </section>
      </div>
    </div>
  );
}