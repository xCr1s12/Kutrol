"use client";
import { Seccion, Tarjeta, Tabla, Dato, LineaTiempo } from "@/components/ui/Modal";

const COLUMNAS_RUTAS = [
  { key: "vehiculo", label: "VEHICULO" },
  { key: "tiempo", label: "TIEMPO" },
  { key: "ruta", label: "RUTA" },
];

export const CONDUCTOR_DEMO = {
  conductor: "Jhon Doea",
  vehiculo: "A1",
  licencia: "123456",
  run: "12345678-9",
  edad: 40,
  anioContrata: 2010,
  rutas: [
    { vehiculo: "A1", dias: 3, ruta: "OSORNO - SANTIAGO" },
    { vehiculo: "A1", dias: 2, ruta: "COIHUE - ÑUÑOA" },
    { vehiculo: "A1", dias: 4, ruta: "TEMUCO - QUELLON" },
  ],
  viajes: [
    { titulo: "A1", detalle: "Actual", actual: true },
    { titulo: "A1", detalle: "hace 5 días" },
    { titulo: "A1", detalle: "hace 1 mes" },
  ],
};

const crearHistorial = ({
  conductor,
  vehiculo,
  licencia,
  run,
  edad,
  anioContrata,
  rutas,
  viajes,
}) => ({
  conductor,
  vehiculo,
  licencia,
  run,
  edad,
  anioContrata,
  rutas: rutas.map((ruta) => ({ vehiculo, dias: ruta.dias, ruta: ruta.nombre })),
  viajes: viajes.map((detalle, index) => ({
    titulo: vehiculo,
    detalle,
    actual: index === 0,
  })),
});

const HISTORIALES_CONDUCTORES = [
  CONDUCTOR_DEMO,
  crearHistorial({
    conductor: "Jhon Doe",
    vehiculo: "A2",
    licencia: "234567",
    run: "98765432-1",
    edad: 35,
    anioContrata: 2015,
    rutas: [
      { nombre: "SANTIAGO - VALDIVIA", dias: 2 },
      { nombre: "VALDIVIA - OSORNO", dias: 3 },
    ],
    viajes: ["Actual", "hace 2 días", "hace 2 semanas"],
  }),
  crearHistorial({
    conductor: "Jhon Doe",
    vehiculo: "A3",
    licencia: "345678",
    run: "11222333-4",
    edad: 42,
    anioContrata: 2008,
    rutas: [
      { nombre: "TEMUCO - PUERTO MONTT", dias: 4 },
      { nombre: "PUERTO MONTT - OSORNO", dias: 2 },
    ],
    viajes: ["Actual", "hace 4 días", "hace 1 mes"],
  }),
];

const PillTiempo = ({ dias }) => (
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-[10px] font-bold uppercase text-accent-dark">
    {dias} {dias === 1 ? "día" : "días"}
  </span>
);

/* Solo contenido: el Modal lo pone quien lo usa */
const ConductorHistory = ({ conductor = CONDUCTOR_DEMO }) => {
  const nombre = conductor.conductor ?? conductor.nombre;
  const historial = HISTORIALES_CONDUCTORES.find(
    (registro) =>
      registro.conductor === nombre && registro.vehiculo === conductor.vehiculo,
  ) ?? {
    conductor: nombre,
    vehiculo: conductor.vehiculo,
    licencia: conductor.licencia_num ?? "Sin datos",
    run: conductor.run ?? "Sin datos",
    edad: "Sin datos",
    anioContrata: "Sin datos",
    rutas: [],
    viajes: [],
  };

  const filas = historial.rutas.map((r) => ({
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
              <Dato label="Nº Licencia" value={historial.licencia} />
              <Dato label="RUN" value={historial.run} />
            </div>
            <div className="flex flex-col gap-4 border-l border-[#E0E0E0] pl-5">
              <Dato label="Edad" value={historial.edad} />
              <Dato label="Año de Contrata" value={historial.anioContrata} />
            </div>
          </Tarjeta>
        </Seccion>
      </div>

      <Seccion titulo="Historial de viajes">
        <LineaTiempo items={historial.viajes} />
      </Seccion>
    </div>
  );
};

export default ConductorHistory;