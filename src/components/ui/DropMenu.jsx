"use client";

import { useDropdown } from "@/hooks/clickOutside"; 
import { ElderlyOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Options = [
  {title: "Ir A la Alerta"},
  {title: "Eliminar"}
]
export default function DropMenu({icon: Icon= MoreVertIcon}) {
 
  const { isOpen, toggle, dropdownRef } = useDropdown(); 

  return (

    <div ref={dropdownRef} className="relative inline-block">
      
      {/* Botón que dispara el evento onClick para abrir/cerrar */}
      <button
        aria-label="Opciones del menu" 
        aria-hidden="true"
        onClick={toggle} 
        className="flex items-center gap-2 px-4 py-2 bg-[#EAE5DA] rounded hover:bg-[#EAE5DA]/90 transition-colors"
      >
        <Icon fontSize="small" aria-hidden="false" />
        
      </button>

      {/* Contenedor del menu desplegable */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-[#FDFBF7] border border-[#EAE5DA] rounded shadow-lg py-1 z-10">
          {Options.map((item) => (
            <span
              key={item.id || item.title}
              className="block px-4 py-2 text-[#6E6E6E] hover:text-[#FDFBF7] hover:bg-[#6E6E6E]/70 cursor-pointer"
            >
              {item.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}