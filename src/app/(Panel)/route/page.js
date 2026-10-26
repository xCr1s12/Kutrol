"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Listitem from "@/components/route/Listitem";
import InfoCard from "@/components/route/InfoCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FormRoute from "@/components/route/FormRoute";
import FormViaje from "@/components/route/FormViaje";

async function obtenerMensajeError(respuesta, mensajePredeterminado) {
  const resultado = await respuesta.json().catch(() => ({}));
  return resultado.error?.message || resultado.error || mensajePredeterminado;
}

const MapR = dynamic(() => import("@/components/route/map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px] text-white font-sans">
      <p>Cargando mapa interactivo...</p>
    </div>
  ),
});

function obtenerEstiloAhorro(ahorroTexto) {
  if (!ahorroTexto || ahorroTexto === "—") return "bg-subtext/20 text-subtext";
  const valor = parseFloat(ahorroTexto.replace(/[^0-9.-]/g, ""));
  if (isNaN(valor)) return "bg-subtext/20 text-subtext";

  if (valor <= 10) return "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30";
  if (valor <= 25) return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30";
  return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30";
}

export default function RoutePage() {
  const [rutas, setRutas] = useState([]);
  const [asignado, setAsignado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [formRutaAbierto, setFormRutaAbierto] = useState(false);
  const [formViajeAbierto, setFormViajeAbierto] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const res = await fetch("/api/data/rutas");
        if (!res.ok) {
          throw new Error(await obtenerMensajeError(res, "No se pudieron cargar las rutas."));
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("La API devolvió un formato de rutas inválido.");
        }

        setRutas(data);
        setAsignado(data[0] ?? null);
      } catch (err) {
        setErrorApi(err.message || "No se pudieron cargar las rutas.");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  const agregarRuta = async ({ origen, destino, puntosControl, distancia }) => {
    try {
      setErrorApi("");
      const res = await fetch("/api/data/rutas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_comuna_origen: origen.id,
          id_comuna_destino: destino.id,
          ids_comunas_puntos_control: puntosControl.map((punto) => punto.id),
          distancia_km: distancia,
        }),
      });

      if (!res.ok) {
        throw new Error(await obtenerMensajeError(res, "No se pudo guardar la ruta."));
      }

      const creada = await res.json();
      const recarga = await fetch("/api/data/rutas");
      if (!recarga.ok) {
        throw new Error(
          `La ruta se guardó, pero no se pudo actualizar la lista: ${await obtenerMensajeError(
            recarga,
            "Error al cargar rutas.",
          )}`,
        );
      }

      const actualizadas = await recarga.json();
      if (!Array.isArray(actualizadas)) {
        throw new Error("La API devolvió un formato de rutas inválido.");
      }

      setRutas(actualizadas);
      setAsignado(actualizadas.find((ruta) => ruta.id === String(creada.id_ruta)) ?? actualizadas[0] ?? null);
      setFormRutaAbierto(false);
    } catch (err) {
      setErrorApi(err.message || "No se pudo guardar la ruta.");
    }
  };

  const agregarViaje = async (datosViaje) => {
    setErrorApi("");
    const res = await fetch("/api/data/viajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...datosViaje,
        id_ruta: Number(asignado.id),
      }),
    });
    if (!res.ok) {
      throw new Error(await obtenerMensajeError(res, "No se pudo guardar el viaje."));
    }

    setFormViajeAbierto(false);
    try {
      const recarga = await fetch("/api/data/rutas");
      if (!recarga.ok) {
        throw new Error(await obtenerMensajeError(recarga, "Error al cargar rutas."));
      }

      const actualizadas = await recarga.json();
      if (!Array.isArray(actualizadas)) {
        throw new Error("La API devolvió un formato de rutas inválido.");
      }

      setRutas(actualizadas);
      setAsignado(actualizadas.find((ruta) => ruta.id === asignado.id) ?? null);
    } catch (err) {
      setErrorApi(`El viaje se guardó, pero no se pudo actualizar la lista: ${err.message}`);
    }
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-text font-sans">
        <p>Cargando rutas de la empresa...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full dark:bg-card light:bg-card rounded-2xl font-sans" lang="es">
      <header className="px-6 pt-5">
        <h1 className="text-text text-2xl font-bold">Rutas</h1>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-5 items-stretch font-sans">
        <div className="lg:col-span-1 border-2 light:border-border dark:border-border p-6 rounded-2xl bg-background">
          <h2 className="font-bold text-lg light:text-text dark:text-text font-sans">Lista de Rutas</h2>
          {errorApi && (
            <p role="alert" className="mt-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
              {errorApi}
            </p>
          )}
          <p className="text-sm light:text-subtext dark:text-subtext font-sans">
            Selecciona una para verla en el mapa
          </p>
          <Listitem
            items={rutas}
            selectedId={asignado?.id}
            onSelect={(data) => setAsignado(data)}
          />
        </div>

        <div className="lg:col-span-2 min-w-0 flex flex-col rounded-2xl overflow-hidden bg-slate font-sans">
          <h2 className="text-cream p-2 font-sans font-bold">Mapa</h2>
          <div className="relative flex-1 min-h-[400px]">
            {asignado ? (
              asignado.coordenadas.length > 0 ? (
                <MapR coordenadas={asignado.coordenadas} popupText={asignado.nombre} />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] px-6 text-center text-cream font-sans">
                  <p>Esta ruta aún no tiene coordenadas grabadas en el mapa.</p>
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

      {asignado && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 px-6 pb-8 pt-2 w-full font-sans">
          <InfoCard
            title={`Viajes de la ruta ${asignado.id}`}
            icon={<GroupsIcon fontSize="small" />}
            className="min-w-0"
            action={
              <button
                type="button"
                onClick={() => setFormViajeAbierto(true)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-bold text-brand transition hover:bg-accent-dark light:text-white"
              >
                <AddRoundedIcon fontSize="small" aria-hidden="true" />
                Agregar viajes
              </button>
            }
          >
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide dark:text-subtext light:text-subtext">
                  <th className="font-medium pb-2">Conductor</th>
                  <th className="font-medium pb-2">Encargado</th>
                </tr>
              </thead>
              <tbody>
                {asignado.viajes.length > 0 ? (
                  asignado.viajes.map((v, i) => (
                    <tr key={i} className="border-t dark:border-border light:border-border">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sand text-xs font-semibold text-ink">
                            {v.conductor.split(" ").map((n) => n[0]).join("")}
                          </span>
                          <span className="light:text-text dark:text-text">{v.conductor}</span>
                        </div>
                      </td>
                      <td className="py-2 light:text-text dark:text-text">{v.encargado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-3 text-center text-xs text-subtext">No hay viajes asignados a esta ruta.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </InfoCard>

          <InfoCard title="Combustible" icon={<LocalGasStationIcon fontSize="small" />} className="min-w-0">
            <dl className="flex flex-col gap-3 text-sm font-sans">
              <div className="flex justify-between">
                <dt className="light:text-text dark:text-text">Consumo promedio</dt>
                <dd className="font-semibold light:text-text dark:text-text">{asignado.combustible.consumo}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="light:text-text dark:text-text">Rendimiento</dt>
                <dd className="font-semibold light:text-text dark:text-text">{asignado.combustible.rendimiento}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="light:text-text dark:text-text">Ahorro</dt>
                <dd className={`font-semibold px-2.5 py-0.5 rounded-full text-xs font-sans transition-colors ${obtenerEstiloAhorro(asignado.combustible.ahorro)}`}>
                  {asignado.combustible.ahorro}
                </dd>
              </div>
            </dl>
          </InfoCard>

          <InfoCard title="Plan de tiempo" icon={<AccessTimeIcon fontSize="small" />} className="min-w-0 text-center">
            <div className="flex-1 flex flex-col items-center justify-center font-sans">
              <p className="text-4xl font-bold light:text-text dark:text-text">{asignado.tiempoEstimado}</p>
              <p className="text-sm light:text-subtext dark:text-subtext mt-1">Tiempo estimado</p>
            </div>
          </InfoCard>

          <InfoCard title="Métricas de ruta" icon={<RouteIcon fontSize="small" />} className="min-w-0 text-center">
            <div className="flex-1 flex flex-col items-center justify-center font-sans">
              <p className="text-4xl font-bold light:text-text dark:text-text">{asignado.distanciaTotal}</p>
              <p className="text-sm light:text-subtext dark:text-subtext mt-1">Distancia total</p>
            </div>
          </InfoCard>
        </section>
      )}

      {formViajeAbierto && asignado && (
        <FormViaje
          open={formViajeAbierto}
          onClose={() => setFormViajeAbierto(false)}
          onSubmit={agregarViaje}
          rutaNombre={asignado.nombre}
        />
      )}

      <button
        type="button"
        onClick={() => setFormRutaAbierto(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-brand light:text-white shadow-lg transition hover:bg-accent-dark font-sans"
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