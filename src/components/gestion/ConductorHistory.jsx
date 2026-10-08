"use client";
import { Seccion, Tarjeta, Tabla, Dato, LineaTiempo } from "@/components/ui/Modal";

const COLUMNAS_RUTAS = [
  { key: "vehiculo", label: "VEHICULO" },
  { key: "tiempo", label: "TIEMPO" },
  { key: "ruta", label: "RUTA" },
];

export const CONDUCTOR_DEMO = {
  nombre: "Jhon Doe",
  licencia: "123456",
  run: "12345678-9",
  edad: 40,
  anioContrata: 2010,
  rutas: [
    { vehiculo: "A1246", dias: 3, ruta: "OSORNO - SANTIAGO" },
    { vehiculo: "A1246", dias: 3, ruta: "COIHUE - ÑUÑOA" },
    { vehiculo: "A1246", dias: 3, ruta: "TEMUCO - QUELLON" },
    { vehiculo: "A1246", dias: 3, ruta: "QUELLON - SANTIAGO" },
  ],
  viajes: [
    { titulo: "A1246", detalle: "Apm", actual: true },
    { titulo: "A1246", detalle: "hace 5 días" },
    { titulo: "A1246", detalle: "1 mes" },
    { titulo: "A1246", detalle: "30 Días" },
    { titulo: "A1246", detalle: "30 Días" },
    { titulo: "A1246", detalle: "30 Días" },
  ],
};

const PillTiempo = ({ dias }) => (
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-[10px] font-bold uppercase text-accent-dark">
    {dias} {dias === 1 ? "día" : "días"}
  </span>
);

/* Solo contenido: el Modal lo pone quien lo usa */
const ConductorHistory = ({ conductor = CONDUCTOR_DEMO }) => {
  const filas = conductor.rutas.map((r) => ({
    vehiculo: r.vehiculo,
    tiempo: <PillTiempo dias={r.dias} />,
    ruta: r.ruta,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <Seccion titulo="Historial de vehiculos y rutas">
          <Tabla columnas={COLUMNAS_RUTAS} filas={filas} />
        </Seccion>

        <Seccion titulo="Informacion relevante">
          <Tarjeta className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Dato label="Nº Licencia" value={conductor.licencia} />
              <Dato label="RUN" value={conductor.run} />
            </div>
            <div className="flex flex-col gap-4 border-l border-[#E0E0E0] pl-5">
              <Dato label="Edad" value={conductor.edad} />
              <Dato label="Año de Contrata" value={conductor.anioContrata} />
            </div>
          </Tarjeta>
        </Seccion>
      </div>

      <Seccion titulo="Historial de viajes">
        <LineaTiempo items={conductor.viajes} />
      </Seccion>
    </div>
  );
};

export default ConductorHistory;