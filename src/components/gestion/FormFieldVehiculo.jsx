import FormField from "@/components/ui/FormField";

const inputClase =
  "w-full rounded-md border border-[#E3E3E3] bg-white px-3 py-2.5 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const CamposFormularioVehiculo = () => (
  <div className="grid grid-cols-2 gap-4">
    <FormField label="Patente" id="patente">
      <input
        id="patente"
        name="patente"
        required
        placeholder="M20500STK"
        className={inputClase}
      />
    </FormField>
    <FormField label="Marca" id="marca">
      <input
        id="marca"
        name="marca"
        required
        placeholder="Toyota"
        className={inputClase}
      />
    </FormField>
    <FormField label="Modelo" id="modelo">
      <input
        id="modelo"
        name="modelo"
        required
        placeholder="Hilux"
        className={inputClase}
      />
    </FormField>
    <FormField label="Año" id="ano">
      <input
        id="ano"
        name="ano"
        type="number"
        min="1900"
        max="2030"
        step="1"
        required
        placeholder="2024"
        className={inputClase}
      />
    </FormField>
    <FormField label="Tipo de combustible" id="combustible">
      <select
        id="combustible"
        name="combustible"
        required
        defaultValue=""
        className={`${inputClase} invalid:text-subtext`}
      >
        <option value="" disabled>
          Selecciona un tipo
        </option>
        <option value="diesel">Diesel</option>
        <option value="gas">Gas</option>
        <option value="petroleo">Petroleo</option>
      </select>
    </FormField>
    <FormField label="Capacidad de carga" id="capacidad_carga">
      <input
        id="capacidad_carga"
        name="capacidad_carga"
        type="number"
        step="any"
        min="0"
        max="100000"
        required
        placeholder="1000"
        className={inputClase}
      />
    </FormField>
    <FormField label="Estado" id="estado">
      <select
        id="estado"
        name="estado"
        required
        defaultValue=""
        className={`${inputClase} invalid:text-subtext`}
      >
        <option value="" disabled>
          Selecciona un estado
        </option>
        <option value="Activo">Activo</option>
        <option value="En mantencion">En mantencion</option>
        <option value="por definir">Por definir</option>
      </select>
    </FormField>
  </div>
);

export default CamposFormularioVehiculo;
