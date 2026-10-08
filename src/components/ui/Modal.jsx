import { useEffect, useRef } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/**
 * Modal reutilizable basado en <dialog> con cabecera oscura estilo Kutrol.
 *
 * Props:
 * - open:         boolean que controla si el modal está visible
 * - onClose:      se llama al cerrar (Escape, clic fuera o botón de la cabecera)
 * - title:        título principal (ej: "A1246")
 * - eyebrow:      (opcional) etiqueta pequeña sobre el título (ej: "VEHICULO")
 * - icon:         (opcional) icono MUI dentro del círculo dorado
 * - actionIcon:   (opcional) icono del botón derecho. Por defecto: cerrar (×)
 * - onAction:     (opcional) acción del botón derecho. Por defecto: onClose
 * - children:     contenido del modal
 * - footer:       (opcional) botones de acción abajo
 * - size:         "md" | "lg" | "xl"
 */
const SIZES = {
  md: "max-w-md",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

const Modal = ({
  open,
  onClose,
  title,
  eyebrow,
  icon,
  actionIcon,
  onAction,
  children,
  footer,
  size = "md",
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [open]);

  const handleClickFondo = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClickFondo}
      aria-labelledby="modal-titulo"
      className={`m-auto w-[calc(100%-2rem)] ${SIZES[size]} overflow-hidden rounded-3xl border-0 bg-white p-0 font-['Poppins',sans-serif] text-brand shadow-2xl `}
    >
      {open && (
        <div className="flex max-h-[90vh] flex-col">
          {/* ---------- Cabecera oscura ---------- */}
          <header className="flex items-center justify-between gap-4 border-b-2 border-accent bg-brand px-6 py-5">
            <div className="flex items-center gap-4">
              {icon && (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-[#4A4A4A] [&_svg]:text-[30px]">
                  {icon}
                </span>
              )}
              <div className="flex flex-col">
                {eyebrow && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {eyebrow}
                  </span>
                )}
                <h2
                  id="modal-titulo"
                  className="text-xl font-bold leading-tight text-text"
                >
                  {title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onAction ?? onClose}
              aria-label={onAction ? "Acción" : "Cerrar"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white/5 text-icon transition hover:bg-white/10 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {actionIcon ?? <CloseRoundedIcon fontSize="small" />}
            </button>
          </header>

          {/* ---------- Cuerpo ---------- */}
          <div className="overflow-y-auto px-6 py-6">{children}</div>

          {footer && (
            <footer className="flex justify-end gap-2 border-t border-[#EEEEEE] px-6 py-4">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  );
};

/* ================= Piezas para armar el contenido ================= */

/** Título de sección con barrita dorada a la izquierda */
export const Seccion = ({ titulo, children, className = "" }) => (
  <section className={`flex flex-col gap-3 ${className}`}>
    <h3 className="flex items-center gap-2 text-[13px] font-semibold text-brand">
      <span className="h-4 w-[3px] rounded-full bg-accent" />
      {titulo}
    </h3>
    {children}
  </section>
);

/** Contenedor gris claro con borde redondeado (para datos, listas, etc.) */
export const Tarjeta = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-[#E6E6E6] bg-[#F7F7F7] p-5 ${className}`}
  >
    {children}
  </div>
);

/** Tabla con cabecera gris. columnas: [{ key, label }], filas: [{...}] */
export const Tabla = ({ columnas, filas }) => (
  <div className="overflow-hidden rounded-2xl border border-[#E6E6E6]">
    <table className="w-full text-left text-[13px]">
      <thead className="bg-[#E8EAE9] text-[11px] font-bold uppercase tracking-wider">
        <tr>
          {columnas.map((c) => (
            <th key={c.key} className="px-5 py-3">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-[#F7F7F7]">
        {filas.map((fila, i) => (
          <tr key={i} className="border-t border-[#E6E6E6]">
            {columnas.map((c, j) => (
              <td
                key={c.key}
                className={`px-5 py-3 ${j === 0 ? "font-semibold" : "text-brand/80"}`}
              >
                {fila[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Dato "Etiqueta: valor" */
export const Dato = ({ label, value }) => (
  <p className="text-[13px] text-brand/70">
    {label}: <strong className="font-bold text-brand">{value}</strong>
  </p>
);

/** Línea de tiempo vertical. items: [{ titulo, detalle, actual }] */
export const LineaTiempo = ({ items }) => (
  <Tarjeta className="px-6 py-5">
    <ol className="relative flex flex-col gap-5">
      <span className="absolute bottom-2 left-[5px] top-2 w-px bg-[#D5D9D7]" />
      {items.map((it, i) => (
        <li key={i} className="relative flex items-center gap-4 pl-6 text-[13px]">
          <span
            className={`absolute left-0 rounded-full ${
              it.actual
                ? "h-3 w-3 bg-accent ring-4 ring-accent/25"
                : "ml-[2px] h-2 w-2 bg-subtext"
            }`}
          />
          <span className={`font-semibold ${it.actual ? "text-brand" : "text-brand/70"}`}>
            {it.titulo}
          </span>
          <span
            className={`ml-auto ${
              it.actual ? "font-bold text-accent-dark" : "text-brand/60"
            }`}
          >
            {it.detalle}
          </span>
        </li>
      ))}
    </ol>
  </Tarjeta>
);

/* ---------- Formularios  ---------- */

export const Campo = ({ label, id, children }) => (
  <div className="mb-3 flex flex-col gap-1">
    <label htmlFor={id} className="text-[11px] font-semibold">
      {label}
    </label>
    {children}
  </div>
);

export const inputClase =
  "rounded-lg border border-[#E3E3E3] bg-background px-3 py-2 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export const BotonSecundario = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className="rounded-full border border-[#E3E3E3] bg-background px-4 py-1.5 text-[11px] hover:bg-[#EDEDED]"
  >
    {children}
  </button>
);

export const BotonPrimario = ({ children, ...props }) => (
  <button
    {...props}
    className="rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold text-brand hover:bg-accent-dark"
  >
    {children}
  </button>
);

export default Modal; 