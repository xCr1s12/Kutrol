"use client";

import { useDropdown } from "@/hooks/clickOutside"; 
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Options = [
  {title: "Ir A la Alerta"},
  {title: "Eliminar"}
]
export default function DropMenu({icon: Icon= MoreVertIcon}) {
 
  const { isOpen, toggle, dropdownRef } = useDropdown(); 

  return (

    <div ref={dropdownRef} className="relative inline-block">
      
      <button
        aria-label="Opciones del menu" 
        aria-hidden="true"
        onClick={toggle} 
        className="flex items-center gap-2 px-4 py-2 rounded transition-colors  light:hover:bg-border/70 dark:bg-border dark:hover:bg-border/70"
      >
        <Icon fontSize="small" aria-hidden="false" />
        
      </button>

      {/* Contenedor del menu desplegable */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded border shadow-lg py-1 z-10 light:bg-card light:border-border dark:bg-card dark:border-border">
          {Options.map((item) => (
            <span
              key={item.id || item.title}
              className="block px-4 py-2 text-subtext hover:text-text hover:bg-border cursor-pointer light:text-subtext light:hover:text-text dark:text-subtext dark:hover:text-text"
            >
              {item.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}