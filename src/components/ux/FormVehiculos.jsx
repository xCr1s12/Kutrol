import CamposFormularioVehiculo from "@/components/gestion/FormFieldVehiculo";

/**
 * Props:
 * - onSubmit(datos): recibe { patente, marca, modelo, ano, combustible, capacidad_carga, estado }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioVehiculo = ({ onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const datos = {
      patente: formData.get("patente").trim(),
      marca: formData.get("marca").trim(),
      modelo: formData.get("modelo").trim(),
      ano: Number(formData.get("ano")),
      combustible: formData.get("combustible"),
      capacidad_carga: Number(formData.get("capacidad_carga")),
      estado: formData.get("estado").trim(),
    };
    onSubmit(datos);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Columna izquierda: campos */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-brand">Detalles</h3>

        <CamposFormularioVehiculo />

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

export default FormularioVehiculo;