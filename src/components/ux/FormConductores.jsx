import CamposFormularioConductor from "../gestion/FormFieldsConductores";
/**
 * Props:
 * - onSubmit(datos): recibe { nombre, run, licencia_num, email, telefono }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioConductor = ({ onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const datos = {
      nombre: formData.get("nombre").trim(),
      run: formData.get("run").trim(),
      licencia_num: formData.get("licencia_num").trim(),
      telefono: formData.get("telefono").trim(),
      email: formData.get("email").trim(),
    };
    onSubmit(datos);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Campos */}
      <div className="flex flex-col gap-4">
<<<<<<< HEAD
<<<<<<< HEAD
        <h3 className="text-sm font-bold text-brand">Detalles</h3>
=======
        <h3 className="text-sm font-bold text-text dark:text-ink ">
          Detalles
        </h3>
>>>>>>> FrontEnd
=======
        <h3 className="text-sm font-bold text-text dark:text-[#1A1A1A] ">
          Detalles
        </h3>
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)

        <CamposFormularioConductor />

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
<<<<<<< HEAD
<<<<<<< HEAD
            className="rounded-md px-6 py-2.5 text-xs font-semibold text-brand transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ backgroundColor: "var(--color-accent)" }}
=======
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand light:text-white transition-colors light:hover:bg-copper-dark light:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-gold dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-gold"
>>>>>>> FrontEnd
=======
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand transition-colors light:hover:bg-[#A8784A] light:hover:text-[#FDFBF7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-[#D4AF37] dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-[#D4AF37]"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
          >
            Finalizar
          </button>
          <button
            type="button"
            onClick={onCancel}
<<<<<<< HEAD
<<<<<<< HEAD
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon"
=======
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-linen light:text-ink light:hover:bg-linen-hover light:hover:text-cream dark:bg-moss dark:text-cream dark:hover:bg-deep"
>>>>>>> FrontEnd
=======
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-[#EAE5DA] light:text-[#1A1A1A] light:hover:bg-[#D8CDBA] light:hover:text-[#FDFBF7] dark:bg-[#314139] dark:text-[#FDFBF7] dark:hover:bg-[#20332B]"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioConductor;