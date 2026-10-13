import FormField from "@/components/ui/FormField";

const inputClase =
<<<<<<< HEAD
  "w-full rounded-md border border-icon bg-background px-3 py-2.5 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

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

// flotas = [] como param  
const flotas =  [{id_flota: "1" , nombre: "Flota Sur"}]
// flotas: [{ id_flota: 1, nombre: "Flota Sur" }, ...] (viene de tu API)
const CamposFormularioVehiculo = ({  }) => ( 
    
  <div className="grid grid-cols-2 gap-4">
<<<<<<< HEAD
=======
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

// flotas = [] como param  
const flotas =  [{id_flota: "1" , nombre: "Flota Sur"}]
// flotas: [{ id_flota: 1, nombre: "Flota Sur" }, ...] (viene de tu API)
const CamposFormularioVehiculo = ({  }) => ( 
    
  <div className="grid grid-cols-2 gap-4">
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Flota" id="id_flota">
      <select
        id="id_flota"
        name="id_flota"
        required
        defaultValue=""
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

<<<<<<< HEAD
>>>>>>> FrontEnd
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Patente" id="patente">
      <input
        id="patente"
        name="patente"
        required
<<<<<<< HEAD
<<<<<<< HEAD
        placeholder="M20500STK"
        className={inputClase}
      />
    </FormField>
=======
        maxLength={10}
        placeholder="BCDF12"
        className={`${inputClase} uppercase`}
      />
    </FormField>

    <FormField label="Código del dispositivo" id="codigo_dispositivo">
      <input
        id="codigo_dispositivo"
        name="codigo_dispositivo"
        required
        maxLength={50}
        placeholder="DEV-0001"
        className={inputClase}
      />
    </FormField>

>>>>>>> FrontEnd
=======
        maxLength={10}
        placeholder="BCDF12"
        className={`${inputClase} uppercase`}
      />
    </FormField>

    <FormField label="Código del dispositivo" id="codigo_dispositivo">
      <input
        id="codigo_dispositivo"
        name="codigo_dispositivo"
        required
        maxLength={50}
        placeholder="DEV-0001"
        className={inputClase}
      />
    </FormField>

>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Marca" id="marca">
      <input
        id="marca"
        name="marca"
        required
<<<<<<< HEAD
<<<<<<< HEAD
        placeholder="Toyota"
        className={inputClase}
      />
    </FormField>
=======
        maxLength={50}
        placeholder="Volvo"
        className={inputClase}
      />
    </FormField>

>>>>>>> FrontEnd
=======
        maxLength={50}
        placeholder="Volvo"
        className={inputClase}
      />
    </FormField>

>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Modelo" id="modelo">
      <input
        id="modelo"
        name="modelo"
        required
<<<<<<< HEAD
<<<<<<< HEAD
        placeholder="Hilux"
        className={inputClase}
      />
    </FormField>
=======
        maxLength={50}
        placeholder="FH 460"
        className={inputClase}
      />
    </FormField>

>>>>>>> FrontEnd
=======
        maxLength={50}
        placeholder="FH 460"
        className={inputClase}
      />
    </FormField>

>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Año" id="ano">
      <input
        id="ano"
        name="ano"
        type="number"
<<<<<<< HEAD
<<<<<<< HEAD
        min="1900"
        max="2030"
=======
        min="1990"
        max="2100"
>>>>>>> FrontEnd
=======
        min="1990"
        max="2100"
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
        step="1"
        required
        placeholder="2024"
        className={inputClase}
      />
    </FormField>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

    <FormField label="Capacidad de carga (kg)" id="capacidad_carga_kg">
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
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
<<<<<<< HEAD
=======

    <FormField label="Capacidad de carga (kg)" id="capacidad_carga_kg">
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
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)

    <FormField label="Capacidad del estanque (L)" id="capacidad_estanque_l">
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

    <FormField label="Tipo de combustible" id="tipo_combustible">
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

<<<<<<< HEAD
>>>>>>> FrontEnd
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
    <FormField label="Estado" id="estado">
      <select
        id="estado"
        name="estado"
        required
<<<<<<< HEAD
<<<<<<< HEAD
        defaultValue=""
        className={`${inputClase} invalid:text-subtext`}
      >
        <option value="" disabled>
          Selecciona un estado
        </option>
        <option value="Activo">Activo</option>
        <option value="En mantencion">En mantencion</option>
        <option value="por definir">Por definir</option>
=======
        defaultValue="DISPONIBLE"
        className={inputClase}
      >
=======
        defaultValue="DISPONIBLE"
        className={inputClase}
      >
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
        {ESTADOS.map((e) => (
          <option key={e.value} value={e.value}>
            {e.label}
          </option>
        ))}
<<<<<<< HEAD
>>>>>>> FrontEnd
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
      </select>
    </FormField>
  </div>
);

<<<<<<< HEAD
<<<<<<< HEAD
export default CamposFormularioVehiculo;
=======
export default CamposFormularioVehiculo;
>>>>>>> FrontEnd
=======
export default CamposFormularioVehiculo;
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
