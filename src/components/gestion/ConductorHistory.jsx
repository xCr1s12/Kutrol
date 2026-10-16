"use client";
import { Seccion, Tarjeta, Tabla, Dato, LineaTiempo } from "@/components/ui/Modal";

const COLUMNAS_RUTAS = [
<<<<<<< HEAD
<<<<<<< HEAD
  { key: "vehiculo", label: "VEHICULO" },
=======
  { key: "vehiculo", label: "VEHÍCULO" },
>>>>>>> FrontEnd
=======
  { key: "vehiculo", label: "VEHÍCULO" },
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
  { key: "tiempo", label: "TIEMPO" },
  { key: "ruta", label: "RUTA" },
];

export const CONDUCTOR_DEMO = {
<<<<<<< HEAD
<<<<<<< HEAD
  conductor: "Jhon Doea",
=======
  conductor: "Luis Mancilla",
>>>>>>> FrontEnd
=======
  conductor: "Luis Mancilla",
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
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
<<<<<<< HEAD
<<<<<<< HEAD
    conductor: "Jhon Doe",
=======
    conductor: "María Cárdenas",
>>>>>>> FrontEnd
=======
    conductor: "María Cárdenas",
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
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
<<<<<<< HEAD
<<<<<<< HEAD
    conductor: "Jhon Doe",
=======
    conductor: "Pedro Muñoz",
>>>>>>> FrontEnd
=======
    conductor: "Pedro Muñoz",
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
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
<<<<<<< HEAD
<<<<<<< HEAD
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-bold uppercase text-accent-dark">
=======
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-bold uppercase text-text">
>>>>>>> FrontEnd
=======
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-bold uppercase text-text">
>>>>>>> e84c658 (fix(a11y): correct text, border and focus contrast)
    {dias} {dias === 1 ? "día" : "días"}
  </span>
);

<<<<<<< HEAD
<<<<<<< HEAD
/* Solo contenido: el Modal lo pone quien lo usa */
=======
>>>>>>> FrontEnd
=======
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
<<<<<<< HEAD
<<<<<<< HEAD
        <Seccion titulo="Historial de vehiculos y rutas">
          <Tabla columnas={COLUMNAS_RUTAS} filas={filas} />
        </Seccion>

        <Seccion titulo="Informacion relevante">
=======
        <Seccion titulo="Historial de vehículos y rutas">
          <Tabla columnas={COLUMNAS_RUTAS} filas={filas} />
        </Seccion>

        <Seccion titulo="Información relevante">
>>>>>>> FrontEnd
=======
        <Seccion titulo="Historial de vehículos y rutas">
          <Tabla columnas={COLUMNAS_RUTAS} filas={filas} />
        </Seccion>

        <Seccion titulo="Información relevante">
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
          <Tarjeta className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Dato label="Nº Licencia" value={historial.licencia} />
              <Dato label="RUN" value={historial.run} />
            </div>
            <div className="flex flex-col gap-4 border-l border-icon pl-5">
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