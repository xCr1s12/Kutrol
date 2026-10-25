import FormField from "@/components/ui/FormField";

const inputClase =
  "w-full rounded-md border border-icon bg-background dark:bg-foreground px-3 py-2.5 text-xs text-brand placeholder:text-subtext focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-mist dark:bg-brand dark:text-cream dark:placeholder:text-sage dark:focus:border-gold dark:focus:ring-gold";

const CamposFormularioConductor = ({ errores = {} }) => (
  <div className="grid grid-cols-2 gap-4 dark:text-ink">
    <FormField label="Nombre" id="nombre" error={errores.nombre}>
      <input
        id="nombre"
        name="nombre"
        required
        placeholder="Juan Pérez"
        className={inputClase}
      />
    </FormField>
    <FormField label="RUN" id="run" error={errores.run}>
      <input
        id="run"
        name="run"
        required
        pattern="^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$"
        title="Formato esperado: 12.345.678-9"
        placeholder="12.345.678-9"
        className={inputClase}
      />
    </FormField>
    <FormField label="N° de licencia" id="licencia_num" error={errores.licencia_num}>
      <input
        id="licencia_num"
        name="licencia_num"
        required
        placeholder="12345678"
        className={inputClase}
      />
    </FormField>
    <FormField
      label="Vencimiento de licencia"
      id="fecha_venc_licencia"
      error={errores.fecha_venc_licencia}
    >
      <input
        id="fecha_venc_licencia"
        name="fecha_venc_licencia"
        type="date"
        required
        className={inputClase}
      />
    </FormField>
    <FormField label="Email" id="email" error={errores.email}>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="juan.perez@correo.cl"
        className={inputClase}
      />
    </FormField>
    <FormField label="Teléfono" id="telefono" error={errores.telefono}>
      <input
        id="telefono"
        name="telefono"
        type="tel"
        required
        pattern="^(\+?56)?\s?9\s?\d{4}\s?\d{4}$"
        title="Formato esperado: +56 9 1234 5678"
        placeholder="+56 9 1234 5678"
        className={inputClase}
      />
    </FormField>
  </div>
);

export default CamposFormularioConductor;