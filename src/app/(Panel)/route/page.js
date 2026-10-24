"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Listitem from "@/components/route/Listitem";
import InfoCard from "@/components/route/InfoCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FormRoute from "@/components/route/FormRoute";

// Importamos el mapa dinámicamente apagando el SSR
const MapR = dynamic(() => import("@/components/route/map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px] text-white font-sans">
      <p>Cargando mapa interactivo...</p>
    </div>
  ),
});

const RUTAS = [
  {
    id: "A",
    nombre: "Ancud — Castro",
    coordenadas: [[-41.8683, -73.8282], [-42.4816, -73.7644]],
    viajes: [
      { conductor: "Juan Díaz", encargado: "M. Soto" },
      { conductor: "Ana Rojas", encargado: "M. Soto" },
      { conductor: "Luis Pérez", encargado: "C. Vera" },
      { conductor: "Marta Silva", encargado: "C. Vera" },
    ],
    combustible: { consumo: "8,5 L", rendimiento: "12 km/L", ahorro: "15 %" },
    tiempoEstimado: "1 h 10 min",
    distanciaTotal: "87 km",
  },
  {
    id: "B",
    nombre: "Castro — Dalcahue",
    coordenadas: [[-42.4816, -73.7644], [-42.3789, -73.6521]],
    viajes: [
      { conductor: "Pedro Núñez", encargado: "M. Soto" },
      { conductor: "Sofía Lagos", encargado: "C. Vera" },
      { conductor: "Diego Ortiz", encargado: "C. Vera" },
    ],
    combustible: { consumo: "6,2 L", rendimiento: "13,5 km/L", ahorro: "9 %" },
    tiempoEstimado: "20 min",
    distanciaTotal: "20 km",
  },
  {
    id: "C",
    nombre: "Castro — Quellon",
    coordenadas: [[-42.4816, -73.7644], [-43.1189, -73.6139]],
    viajes: [
      { conductor: "Juan Díaz", encargado: "C. Vera" },
      { conductor: "Ana Rojas", encargado: "M. Soto" },
      { conductor: "Luis Pérez", encargado: "M. Soto" },
      { conductor: "Marta Silva", encargado: "M. Soto" },
      { conductor: "Pedro Núñez", encargado: "C. Vera" },
      { conductor: "Sofía Lagos", encargado: "C. Vera" },
    ],
    combustible: { consumo: "11,4 L", rendimiento: "9,8 km/L", ahorro: "5 %" },
    tiempoEstimado: "1 h 25 min",
    distanciaTotal: "93 km",
  },
  {
    id: "D",
    nombre: "Castro — Chonchi",
    coordenadas: [[-42.4816, -73.7644], [-42.6247, -73.7742]],
    viajes: [
      { conductor: "Diego Ortiz", encargado: "M. Soto" },
      { conductor: "Marta Silva", encargado: "C. Vera" },
    ],
    combustible: { consumo: "9,1 L", rendimiento: "11 km/L", ahorro: "18 %" },
    tiempoEstimado: "25 min",
    distanciaTotal: "24 km",
  },
];

export default function RoutePage() {
  const [asignado, setAsignado] = useState(null);
  const [rutas, setRutas] = useState(RUTAS);
  const [formRutaAbierto, setFormRutaAbierto] = useState(false);

  const agregarRuta = ({ origen, destino, distancia }) => {
    const nuevaRuta = {
      id: `N${Date.now()}`,
      nombre: `${origen.nombre} — ${destino.nombre}`,
      coordenadas: [],
      viajes: [],
      combustible: { consumo: "—", rendimiento: "—", ahorro: "—" },
      tiempoEstimado: "—",
      distanciaTotal: `${distancia} km`,
    };

    setRutas((actuales) => [...actuales, nuevaRuta]);
    setAsignado(nuevaRuta);
    setFormRutaAbierto(false);
  };

  return (
    <div className="flex flex-col w-full dark:bg-card light:bg-card rounded-2xl font-sans" lang="es">
      {/* Lista de rutas y mapa */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-5 items-stretch font-sans">
        {/* Lista de rutas: 1/3 */}
        <div className="lg:col-span-1 border-2 light:border-border dark:border-border p-6 rounded-2xl bg-white dark:bg-background">
          <h1 className="font-bold text-lg light:text-text dark:text-text font-sans">Lista de Rutas</h1>
          <p className="text-sm light:text-subtext dark:text-subtext font-sans">
            Selecciona una para verla en el mapa
          </p>
          <Listitem
            items={rutas}
            selectedId={asignado?.id}
            onSelect={(data) => setAsignado(data)}
          />
        </div>

        {/* Mapa: 2/3 */}
        <div className="lg:col-span-2 min-w-0 flex flex-col rounded-2xl overflow-hidden bg-slate font-sans">
          <h2 className="text-cream p-2 font-sans font-bold">Mapa</h2>

          <div className="relative flex-1 min-h-[400px]">
            {asignado ? (
              asignado.coordenadas.length > 0 ? (
                <MapR
                  coordenadas={asignado.coordenadas}
                  popupText={asignado.nombre}
                />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] px-6 text-center text-cream font-sans">
                  <p>Esta ruta aún no tiene coordenadas para mostrar en el mapa.</p>
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-cream font-sans">
                <p>Selecciona una ruta en la lista para verla en el mapa</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cards de información */}
      {asignado && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 px-6 pb-8 pt-2 w-full font-sans">
          {/* Viajes asignados */}
          <InfoCard
            title={`Viajes de la ruta ${asignado.id}`}
            icon={<GroupsIcon fontSize="small" />}
            className="min-w-0"
          >
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide dark:text-subtext light:text-subtext">
                  <th className="font-medium pb-2">Conductor</th>
                  <th className="font-medium pb-2">Encargado</th>
                </tr>
              </thead>
              <tbody>
                {asignado.viajes.map((v, i) => (
                  <tr key={i} className="border-t dark:border-border light:border-border">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sand text-xs font-semibold text-ink">
                          {v.conductor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <span className="light:text-text dark:text-text">{v.conductor}</span>
                      </div>
                    </td>
                    <td className="py-2 light:text-text dark:text-text">{v.encargado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfoCard>

          {/* Combustible */}
          <InfoCard
            title="Combustible"
            icon={<LocalGasStationIcon fontSize="small" />}
            className="min-w-0"
          >
            <dl className="flex flex-col gap-3 text-sm font-sans">
              <div className="flex justify-between">
                <dt className="light:text-text dark:text-text">Consumo promedio</dt>
                <dd className="font-semibold light:text-text dark:text-text">
                  {asignado.combustible.consumo}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="light:text-text dark:text-text">Rendimiento</dt>
                <dd className="font-semibold light:text-text dark:text-text">
                  {asignado.combustible.rendimiento}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="light:text-text dark:text-text">Ahorro</dt>
                <dd className="font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  {asignado.combustible.ahorro}
                </dd>
              </div>
            </dl>
          </InfoCard>

          {/* Plan de tiempo */}
          <InfoCard
            title="Plan de tiempo"
            icon={<AccessTimeIcon fontSize="small" />}
            className="min-w-0 text-center"
          >
            <div className="flex-1 flex flex-col items-center justify-center font-sans">
              <p className="text-4xl font-bold light:text-text dark:text-text">
                {asignado.tiempoEstimado}
              </p>
              <p className="text-sm light:text-subtext dark:text-subtext mt-1">Tiempo estimado</p>
            </div>
          </InfoCard>

          {/* Métricas de ruta */}
          <InfoCard
            title="Métricas de ruta"
            icon={<RouteIcon fontSize="small" />}
            className="min-w-0 text-center"
          >
            <div className="flex-1 flex flex-col items-center justify-center font-sans">
              <p className="text-4xl font-bold light:text-text dark:text-text">
                {asignado.distanciaTotal}
              </p>
              <p className="text-sm light:text-subtext dark:text-subtext mt-1">Distancia total</p>
            </div>
          </InfoCard>
        </section>
      )}

      <button
        type="button"
        onClick={() => setFormRutaAbierto(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-brand light:text-white shadow-lg transition hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand font-sans"
      >
        <AddRoundedIcon fontSize="small" aria-hidden="true" />
        Agregar ruta
      </button>

      {formRutaAbierto && (
        <FormRoute
          open={formRutaAbierto}
          onClose={() => setFormRutaAbierto(false)}
          onSubmit={agregarRuta}
        />
      )}
    </div>
  );
}