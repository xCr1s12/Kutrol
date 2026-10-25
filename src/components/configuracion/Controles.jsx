import { campo, bordeError } from "./comun";

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
    <label className={`flex flex-col gap-1 text-xs font-semibold text-text ${className}`}>
      <span className="flex items-center gap-1">
        {icono}
        {titulo}
      </span>
      {children ?? <input className={`${campo} ${error ? bordeError : ""}`} {...props} />}
      {error && <span className="font-normal text-accent-dark">{error}</span>}
    </label>
  );
}
