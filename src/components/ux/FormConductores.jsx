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
        <h3 className="text-sm font-bold text-brand">Detalles</h3>

        <CamposFormularioConductor />

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-md px-6 py-2.5 text-xs font-semibold text-brand transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Finalizar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-[#E5E5E7] px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-[#DADADD]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioConductor;