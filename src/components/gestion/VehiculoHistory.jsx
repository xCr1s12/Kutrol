"use client";
import { Seccion, Tarjeta, Tabla, Dato, LineaTiempo } from "@/components/ui/Modal";

const COLUMNAS_RUTAS = [
  { key: "conductor", label: "CONDUCTOR" },
  { key: "ruta", label: "RUTA" },
];

export const VEHICULO_DEMO = {
  patenteInterna: "A1",
  anioFabricacion: 2020,
  kilometraje: "1000KM",
  patente: "A1",
  revisionTecnica: "XX",
  caracteristicas: ["Pintura Roja", "Carga total 10K...."],
  rutas: [
    { conductor: "Jhon Doe", ruta: "OSORNO - SANTIAGO" },
    { conductor: "Jhon Doe", ruta: "COIHUE - ÑUÑOA" },
    { conductor: "Jhon Doe", ruta: "TEMUCO - QUELLON" },
    { conductor: "Jhon Doe", ruta: "QUELLON - SANTIAGO" },
  ],
  viajes: [
    { titulo: "A1", detalle: "Actual", actual: true },
    { titulo: "A1", detalle: "hace 5 días" },
    { titulo: "A1", detalle: "1 mes" },
    { titulo: "A1", detalle: "30 Días" },
    { titulo: "A1", detalle: "30 Días" },
    { titulo: "A1", detalle: "30 Días" },
  ],
};

const crearHistorial = ({
  patente,
  conductor,
  anioFabricacion,
  kilometraje,
  revisionTecnica,
  caracteristicas,
  rutas,
  viajes,
}) => ({
  patenteInterna: patente,
  patente,
  anioFabricacion,
  kilometraje,
  revisionTecnica,
  caracteristicas,
  rutas: rutas.map((ruta) => ({ conductor, ruta })),
  viajes: viajes.map((detalle, index) => ({
    titulo: patente,
    detalle,
    actual: index === 0,
  })),
});

const HISTORIALES_VEHICULOS = [
  VEHICULO_DEMO,
  crearHistorial({
    patente: "A2",
    conductor: "Jhon Doe",
    anioFabricacion: 2021,
    kilometraje: "24500 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Blanca", "Carga total 8K"],
    rutas: ["SANTIAGO - VALDIVIA", "VALDIVIA - OSORNO"],
    viajes: ["Actual", "hace 2 días", "hace 2 semanas"],
  }),
  crearHistorial({
    patente: "A3",
    conductor: "Jhon Doe",
    anioFabricacion: 2019,
    kilometraje: "58200 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Azul", "Carga total 12K"],
    rutas: ["TEMUCO - PUERTO MONTT", "PUERTO MONTT - OSORNO"],
    viajes: ["Actual", "hace 4 días", "hace 1 mes"],
  }),
  crearHistorial({
    patente: "B1",
    conductor: "Jhon Doe",
    anioFabricacion: 2022,
    kilometraje: "18300 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Gris", "Carga total 6K"],
    rutas: ["SANTIAGO - RANCAGUA", "RANCAGUA - TALCA"],
    viajes: ["Actual", "hace 1 día", "hace 10 días"],
  }),
  crearHistorial({
    patente: "B2",
    conductor: "Jhon Doe",
    anioFabricacion: 2018,
    kilometraje: "74600 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Roja", "Carga total 10K"],
    rutas: ["CONCEPCION - TEMUCO", "TEMUCO - VALDIVIA"],
    viajes: ["Actual", "hace 3 días", "hace 3 semanas"],
  }),
  crearHistorial({
    patente: "B3",
    conductor: "Jhon Doe",
    anioFabricacion: 2023,
    kilometraje: "9600 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Negra", "Carga total 5K"],
    rutas: ["SANTIAGO - LA SERENA", "LA SERENA - COPIAPO"],
    viajes: ["Actual", "hace 6 días", "hace 2 semanas"],
  }),
  crearHistorial({
    patente: "C1",
    conductor: "Jhon Doe",
    anioFabricacion: 2020,
    kilometraje: "39100 KM",
    revisionTecnica: "Vigente",
    caracteristicas: ["Pintura Verde", "Carga total 9K"],
    rutas: ["OSORNO - PUERTO MONTT", "PUERTO MONTT - COYHAIQUE"],
    viajes: ["Actual", "hace 5 días", "hace 1 mes"],
  }),
  crearHistorial({
    patente: "C2",
    conductor: "Jhon Doe",
    anioFabricacion: 2017,
    kilometraje: "91200 KM",
    revisionTecnica: "En mantencion",
    caracteristicas: ["Pintura Amarilla", "Carga total 7K"],
    rutas: ["TALCA - CHILLAN", "CHILLAN - CONCEPCION"],
    viajes: ["En mantencion", "hace 8 días", "hace 1 mes"],
  }),
];

/* Solo contenido: el Modal lo pone quien lo usa */
const VehiculoHistory = ({ vehiculo = VEHICULO_DEMO }) => {
  const historial = HISTORIALES_VEHICULOS.find(
    (registro) => registro.patente === vehiculo.patente,
  ) ?? {
    patente: vehiculo.patente,
    anioFabricacion: vehiculo.ano ?? "Sin datos",
    kilometraje: "Sin datos",
    revisionTecnica: "Sin datos",
    caracteristicas: [],
    rutas: [],
    viajes: [],
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <Seccion titulo="Historial de Conductor y rutas">
          <Tabla columnas={COLUMNAS_RUTAS} filas={historial.rutas} />
        </Seccion>

        <Seccion titulo="Informacion relevante">
          <Tarjeta className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Dato
                label="Año de Fabricacion"
                value={historial.anioFabricacion}
              />
              <Dato label="Kilometraje" value={historial.kilometraje} />
              <Dato label="Patente" value={historial.patente} />
            </div>

            <div className="flex flex-col gap-4 border-l border-border-muted pl-5">
              <Dato
                label="Revision Tecnica"
                value={historial.revisionTecnica}
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-brand/70">Caracteristicas:</p>
                {historial.caracteristicas.map((caracteristica) => (
                  <p
                    key={caracteristica}
                    className="text-base font-bold text-brand"
                  >
                    {caracteristica}
                  </p>
                ))}
              </div>
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

export default VehiculoHistory;
