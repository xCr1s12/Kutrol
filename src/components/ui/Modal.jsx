import { useEffect, useRef } from "react";

/**
 * Modal reutilizable basado en el elemento nativo <dialog>.
 * El navegador se encarga de: atrapar el foco, cerrar con Escape,
 * bloquear la interacción con el resto de la página y devolver el foco
 * al botón que lo abrió.
 *
 * Props:
 * - open:     boolean que controla si el modal está visible
 * - onClose:  función que se llama al cerrar (Escape, clic fuera o botón ×)
 * - title:    título del modal
 * - children: contenido (por ejemplo, un <form>)
 * - footer:   (opcional) botones de acción, se muestran abajo
 * - size:     "md" (predeterminado) o "lg" para un modal más ancho
 */
const Modal = ({ open, onClose, title, children, footer, size = "md" }) => {
  const dialogRef = useRef(null);
  const sizeClass = size === "lg" ? "max-w-3xl" : "max-w-md";

  // Abrir / cerrar el <dialog> según la prop `open`
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Bloquear el scroll de la página mientras el modal está abierto
  useEffect(() => {
    if (!open) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [open]);

  // Cerrar al hacer clic en el fondo oscuro (fuera del contenido)
  const handleClickFondo = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClickFondo}
      aria-labelledby="modal-titulo"
      className={`m-auto w-[calc(100%-2rem)] ${sizeClass} rounded-2xl border border-[#E6E6E6] bg-white p-0 font-['Poppins',sans-serif] text-brand shadow-xl backdrop:bg-black/40`}
    >
      {/* Se renderiza solo abierto, así el formulario se reinicia cada vez */}
      {open && (
        <div className="flex max-h-[85vh] flex-col">
          <header className="flex items-center justify-between px-5 pb-3 pt-5">
            <h2 id="modal-titulo" className="text-[15px] font-bold">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-subtext hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              ×
            </button>
          </header>

          <div className="overflow-y-auto px-5 py-2">{children}</div>

          {footer && (
            <footer className="flex justify-end gap-2 px-5 pb-5 pt-4">{footer}</footer>
          )}
        </div>
      )}
    </dialog>
  );
};

/* ---------- Piezas para armar formularios con el mismo estilo ---------- */

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
    className="rounded-full px-4 py-1.5 text-[11px] font-bold text-brand hover:opacity-90"
    style={{ backgroundColor: "var(--color-accent)" }}
  >
    {children}
  </button>
);

export default Modal;