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
        <h3 className="text-sm font-bold text-text dark:text-ink ">
          Detalles
        </h3>

        <CamposFormularioConductor />

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand transition-colors light:hover:bg-copper-dark light:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-gold dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-gold"
          >
            Finalizar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-linen light:text-ink light:hover:bg-linen-hover light:hover:text-cream dark:bg-moss dark:text-cream dark:hover:bg-deep"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioConductor;