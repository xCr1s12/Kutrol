import FormField from "@/components/ui/FormField";

const inputClase =
  "w-full rounded-md border border-icon bg-background dark:bg-foreground px-3 py-2.5 text-xs text-text  placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-mist dark:bg-brand dark:text-ink dark:placeholder:text-sage dark:focus:border-gold dark:focus:ring-gold";

const COMBUSTIBLES = [
  { value: "DIESEL", label: "Diesel" },
  { value: "GASOLINA", label: "Gasolina" },
  { value: "GNC", label: "GNC (gas natural comprimido)" },
  { value: "GLP", label: "GLP (gas licuado)" },
  { value: "ELECTRICO", label: "Eléctrico" },
];


const ESTADOS = [
  { value: "DISPONIBLE", label: "Disponible" },
  { value: "EN_RUTA", label: "En ruta" },
  { value: "MANTENCION", label: "En mantención" },
  { value: "FUERA_DE_SERVICIO", label: "Fuera de servicio" },

];

const CamposFormularioVehiculo = ({ flotas = [], flotaSeleccionada = "", errores = {} }) => (
    
  <div className="grid grid-cols-2 gap-4">
    <FormField label="Flota" id="id_flota" error={errores.id_flota}>
      <select
        id="id_flota"
        name="id_flota"
        required
        defaultValue={flotaSeleccionada ? String(flotaSeleccionada) : ""}
        disabled={!flotas.length}
        className={`${inputClase} invalid:text-subtext`}
      >
        <option value="" disabled>
          Selecciona una flota
        </option>
        {flotas.map((f) => (
          <option key={f.id_flota} value={f.id_flota}>
            {f.nombre}
          </option>
        ))}
      </select>
    </FormField>

    <FormField label="Patente" id="patente" error={errores.patente}>
      <input
        id="patente"
        name="patente"
        required
        maxLength={10}
        placeholder="BCDF12"
        className={`${inputClase} uppercase`}
      />
    </FormField>

    <FormField label="Código del dispositivo" id="codigo_dispositivo" error={errores.codigo_dispositivo}>
      <input
        id="codigo_dispositivo"
        name="codigo_dispositivo"
        required
        maxLength={50}
        placeholder="DEV-0001"
        className={inputClase}
      />
    </FormField>

    <FormField label="Marca" id="marca" error={errores.marca}>
      <input
        id="marca"
        name="marca"
        required
        maxLength={50}
        placeholder="Volvo"
        className={inputClase}
      />
    </FormField>

    <FormField label="Modelo" id="modelo" error={errores.modelo}>
      <input
        id="modelo"
        name="modelo"
        required
        maxLength={50}
        placeholder="FH 460"
        className={inputClase}
      />
    </FormField>

    <FormField label="Año" id="ano" error={errores.ano}>
      <input
        id="ano"
        name="ano"
        type="number"
        min="1990"
        max="2100"
        step="1"
        required
        placeholder="2024"
        className={inputClase}
      />
    </FormField>

    <FormField label="Capacidad de carga (kg)" id="capacidad_carga_kg" error={errores.capacidad_carga_kg}>
      <input
        id="capacidad_carga_kg"
        name="capacidad_carga_kg"
        type="number"
        step="0.01"
        min="0.01"
        max="999999.99"
        required
        placeholder="25000"
        className={inputClase}
      />
    </FormField>

    <FormField label="Capacidad del estanque (L)" id="capacidad_estanque_l" error={errores.capacidad_estanque_l}>
      <input
        id="capacidad_estanque_l"
        name="capacidad_estanque_l"
        type="number"
        step="0.01"
        min="0.01"
        max="99999.99"
        required
        placeholder="400"
        className={inputClase}
      />
    </FormField>

    <FormField label="Tipo de combustible" id="tipo_combustible" error={errores.tipo_combustible}>
      <select
        id="tipo_combustible"
        name="tipo_combustible"
        required
        defaultValue="DIESEL"
        className={inputClase}
      >
        {COMBUSTIBLES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </FormField>

    <FormField label="Estado" id="estado" error={errores.estado}>
      <select
        id="estado"
        name="estado"
        required
        defaultValue="DISPONIBLE"
        className={inputClase}
      >
        {ESTADOS.map((e) => (
          <option key={e.value} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
    </FormField>
  </div>
);

export default CamposFormularioVehiculo;