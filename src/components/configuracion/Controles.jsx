import { useState } from "react";
import { KeyboardArrowDownRounded, AddRounded } from "@mui/icons-material";
import { campo, bordeError, botonAmarillo } from "./comun";

const estados = ["Leve", "Moderado", "Crítico"];

export function Interruptor({ activo, onChange, etiqueta, disabled }) {
  return (
    <label
      className={`flex items-center gap-2 text-xs text-[#1A1A1A] ${disabled ? "opacity-50" : "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={activo}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="relative w-9 h-5 shrink-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-[#1A1A1A] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
      {etiqueta}
    </label>
  );
}

// select con sus opciones, "vacio" es el texto de la opcion sin valor
export function Lista({ opciones, vacio, className = "", ...props }) {
  return (
    <select className={`${campo} ${className}`} {...props}>
      {vacio && <option value="">{vacio}</option>}
      {opciones.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

// etiqueta + input + error. si recibe children, van en lugar del input
export function Campo({ titulo, icono, error, className = "", children, ...props }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-semibold text-[#1A1A1A] ${className}`}>
      <span className="flex items-center gap-1">
        {icono}
        {titulo}
      </span>
      {children ?? <input className={`${campo} ${error ? bordeError : ""}`} {...props} />}
      {error && <span className="font-normal text-red-600">{error}</span>}
    </label>
  );
}

// se cierra cuando el foco sale del menu o con escape
function eventosMenu(setAbierto) {
  return {
    onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setAbierto(false),
    onKeyDown: (e) => e.key === "Escape" && setAbierto(false),
  };
}

export function MenuEstado({ valor, onChange, disabled, etiqueta }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="relative" {...eventosMenu(setAbierto)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={etiqueta}
        disabled={disabled}
        onClick={() => setAbierto(!abierto)}
        className="flex items-center justify-between gap-2 w-28 text-xs font-semibold text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-2 py-1.5 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {valor}
        <KeyboardArrowDownRounded sx={{ fontSize: 16 }} aria-hidden="true" />
      </button>

      {abierto && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white border border-[#E2E8F0] rounded-md shadow-md overflow-hidden"
        >
          {estados.map((estado) => (
            <li key={estado} role="option" aria-selected={estado === valor}>
              <button
                type="button"
                onClick={() => {
                  onChange(estado);
                  setAbierto(false);
                }}
                className={`w-full text-left text-xs text-[#1A1A1A] px-2 py-1.5 hover:bg-[#F4F5F7] focus:outline-none focus:bg-[#F4F5F7] ${
                  estado === valor ? "font-semibold bg-accent/20" : ""
                }`}
              >
                {estado}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// boton con un menu de las alertas que todavia no estan en la lista
export function AgregarAlerta({ disponibles, onAgregar }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="relative" {...eventosMenu(setAbierto)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={abierto}
        disabled={disponibles.length === 0}
        onClick={() => setAbierto(!abierto)}
        className={`${botonAmarillo} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <AddRounded fontSize="small" aria-hidden="true" />
        Agregar alerta
      </button>

      {abierto && (
        <ul
          role="menu"
          className="absolute right-0 z-10 mt-1 w-48 bg-white border border-[#E2E8F0] rounded-md shadow-md overflow-hidden"
        >
          {disponibles.map((tipo) => (
            <li key={tipo.id} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onAgregar(tipo);
                  setAbierto(false);
                }}
                className="w-full text-left text-xs text-[#1A1A1A] px-3 py-2 hover:bg-[#F4F5F7] focus:outline-none focus:bg-[#F4F5F7]"
              >
                {tipo.nombre}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
