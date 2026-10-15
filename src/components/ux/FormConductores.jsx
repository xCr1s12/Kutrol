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
        <h3 className="text-sm font-bold text-text dark:text-[#1A1A1A] ">
          Detalles
        </h3>

        <CamposFormularioConductor />

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand transition-colors light:hover:bg-[#A8784A] light:hover:text-[#FDFBF7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-[#D4AF37] dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-[#D4AF37]"
          >
            Finalizar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-[#EAE5DA] light:text-[#1A1A1A] light:hover:bg-[#D8CDBA] light:hover:text-[#FDFBF7] dark:bg-[#314139] dark:text-[#FDFBF7] dark:hover:bg-[#20332B]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioConductor;