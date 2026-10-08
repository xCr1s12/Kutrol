const inputClase =
  "w-full rounded-md border border-[#E3E3E3] bg-white px-3 py-2.5 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const Campo = ({ label, id, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-[11px] font-semibold text-brand">
      {label}
    </label>
    {children}
  </div>
);

/**
 * Props:
 * - onSubmit(datos): recibe { modelo, patente, combustible }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioVehiculo = ({ onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget));
    onSubmit(datos);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_1fr] gap-6">
      {/* Columna izquierda: campos */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-brand">Detalles</h3>

        <div className="grid grid-cols-2 gap-4">
          <Campo label="Modelo" id="modelo">
            <input
              id="modelo"
              name="modelo"
              required
              placeholder="Nasus A20"
              className={inputClase}
            />
          </Campo>
          <Campo label="Patente" id="patente">
            <input
              id="patente"
              name="patente"
              required
              placeholder="M20500STK"
              className={inputClase}
            />
          </Campo>
        </div>

        <Campo label="Tipo Combustible" id="combustible">
          <select
            id="combustible"
            name="combustible"
            required
            defaultValue=""
            className={`${inputClase} invalid:text-subtext`}
          >
            <option value="" disabled>
              Diesel / Gas / Petroleo
            </option>
            <option value="diesel">Diesel</option>
            <option value="gas">Gas</option>
            <option value="petroleo">Petroleo</option>
          </select>
        </Campo>

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

      {/* Columna derecha: separador vertical, vacía como en el diseño */}
      <div className="border-l border-[#EDEDED]" aria-hidden="true" />
    </form>
  );
};

export default FormularioVehiculo;