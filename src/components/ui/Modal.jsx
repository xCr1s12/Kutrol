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
<<<<<<< HEAD
=======
  className = "",
>>>>>>> FrontEnd
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
<<<<<<< HEAD
      className={`m-auto w-[calc(100%-2rem)] ${SIZES[size]} overflow-hidden rounded-3xl border-0 bg-white p-0 font-['Poppins',sans-serif] text-brand shadow-2xl `}
=======
      className={`m-auto w-[calc(100%-2rem)] ${SIZES[size]} overflow-hidden rounded-3xl border-0 bg-white p-0 font-['Poppins',sans-serif] text-brand shadow-2xl ${className}`}
>>>>>>> FrontEnd
    >
      {open && (
        <div className="flex max-h-[90vh] flex-col">
          {/* ---------- Cabecera oscura ---------- */}
<<<<<<< HEAD
          <header className="flex items-center justify-between gap-4 border-b-2 border-accent bg-brand px-6 py-5">
            <div className="flex items-center gap-4">
              {icon && (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-brand/80 [&_svg]:text-3xl">
=======
          <header className="flex items-center justify-between gap-4 border-b-2 border-gold bg-brand px-6 py-5">
            <div className="flex items-center gap-4">
              {icon && (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-brand [&_svg]:text-3xl">
>>>>>>> FrontEnd
                  {icon}
                </span>
              )}
              <div className="flex flex-col">
                {eyebrow && (
<<<<<<< HEAD
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
=======
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
>>>>>>> FrontEnd
                    {eyebrow}
                  </span>
                )}
                <h2
                  id="modal-titulo"
<<<<<<< HEAD
                  className="text-xl font-bold leading-tight text-text"
=======
                  className="text-xl font-bold leading-tight text-cream"
>>>>>>> FrontEnd
                >
                  {title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onAction ?? onClose}
              aria-label={onAction ? "Acción" : "Cerrar"}
<<<<<<< HEAD
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white/5 text-icon transition hover:bg-white/10 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
=======
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-moss bg-deep text-mist hover:bg-moss hover:text-cream focus-visible:outline-gold  focus-visible:outline-2 focus-visible:outline-offset-2  dark:border-moss dark:bg-deep dark:text-mist dark:hover:bg-moss dark:hover:text-cream dark:focus-visible:outline-gold"
>>>>>>> FrontEnd
            >
              {actionIcon ?? <CloseRoundedIcon fontSize="small" />}
            </button>
          </header>

          {/* ---------- Cuerpo ---------- */}
          <div className="overflow-y-auto px-6 py-6">{children}</div>

          {footer && (
            <footer className="flex justify-end gap-2 border-t border-icon px-6 py-4">
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
    <h3 className="flex items-center gap-2 text-sm font-semibold text-brand">
      <span className="h-4 w-0.75 rounded-full bg-accent" />
      {titulo}
    </h3>
    {children}
  </section>
);

/** Contenedor gris claro con borde redondeado (para datos, listas, etc.) */
export const Tarjeta = ({ children, className = "" }) => (
  <div
<<<<<<< HEAD
    className={`rounded-2xl border border-icon bg-background p-5 ${className}`}
=======
    className={`rounded-2xl border border-icon dark:bg-foreground p-5 ${className}`}
>>>>>>> FrontEnd
  >
    {children}
  </div>
);

/** Tabla con cabecera gris. columnas: [{ key, label }], filas: [{...}] */
export const Tabla = ({ columnas, filas }) => (
  <div className="overflow-hidden rounded-2xl border border-icon">
    <table className="w-full text-left text-sm">
<<<<<<< HEAD
      <thead className="bg-text text-xs font-bold uppercase tracking-wider">
=======
      <thead className="light:bg-background dark:bg-foreground text-xs font-bold uppercase tracking-wider">
>>>>>>> FrontEnd
        <tr>
          {columnas.map((c) => (
            <th key={c.key} className="px-5 py-3">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
<<<<<<< HEAD
      <tbody className="bg-background">
=======
      <tbody className="dark:bg-foreground light:bg-background">
>>>>>>> FrontEnd
        {filas.map((fila, i) => (
          <tr key={i} className="border-t border-icon">
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
  <p className="text-sm text-brand/70">
    {label}: <strong className="font-bold text-brand">{value}</strong>
  </p>
);

/** Línea de tiempo vertical. items: [{ titulo, detalle, actual }] */
export const LineaTiempo = ({ items }) => (
<<<<<<< HEAD
  <Tarjeta className="px-6 py-5">
    <ol className="relative flex flex-col gap-5">
=======
  <Tarjeta className="px-6 py-5 dark:bg-foreground">
    <ol className="relative flex flex-col gap-5 dark:bg-foreground">
>>>>>>> FrontEnd
      <span className="absolute bottom-2 left-1.25 top-2 w-px bg-icon" />
      {items.map((it, i) => (
        <li key={i} className="relative flex items-center gap-4 pl-6 text-sm">
          <span
            className={`absolute left-0 rounded-full ${
              it.actual
                ? "h-3 w-3 bg-accent ring-4 ring-accent/25"
<<<<<<< HEAD
                : "ml-0.5 h-2 w-2 bg-subtext"
            }`}
          />
          <span className={`font-semibold ${it.actual ? "text-brand" : "text-brand/70"}`}>
=======
                : "ml-0.5 h-2 w-2 dark:bg-foreground light:bg:background"
            }`}
          />
          <span className={`font-semibold ${it.actual ? "light:text-text" : "light:text-text/70"}`}>
>>>>>>> FrontEnd
            {it.titulo}
          </span>
          <span
            className={`ml-auto ${
<<<<<<< HEAD
              it.actual ? "font-bold text-accent-dark" : "text-brand/60"
=======
              it.actual ? "font-bold text-ochre" : "text-brand/60"
>>>>>>> FrontEnd
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
    <label htmlFor={id} className="text-xs font-semibold">
      {label}
    </label>
    {children}
  </div>
);

export const inputClase =
  "rounded-lg border border-icon bg-background px-3 py-2 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

<<<<<<< HEAD
export const BotonSecundario = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className="rounded-full border border-icon bg-background px-4 py-1.5 text-xs hover:bg-text"
=======
export const BotonSecundario = ({
  children,
  className = "rounded-full border border-icon bg-background px-4 py-1.5 text-xs hover:bg-text",
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={className}
>>>>>>> FrontEnd
  >
    {children}
  </button>
);

export const BotonPrimario = ({ children, ...props }) => (
  <button
    {...props}
<<<<<<< HEAD
    className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-brand hover:bg-accent-dark"
=======
    className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-brand light:text-white hover:bg-accent-dark"
>>>>>>> FrontEnd
  >
    {children}
  </button>
);

export default Modal; 