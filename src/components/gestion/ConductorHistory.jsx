"use client";
import { useEffect, useState } from "react";
import { Seccion, Tarjeta, Tabla, Dato, LineaTiempo } from "@/components/ui/Modal";

const COLUMNAS_RUTAS = [
  { key: "vehiculo", label: "VEHÍCULO" },
  { key: "tiempo", label: "TIEMPO" },
  { key: "ruta", label: "RUTA" },
];

const formatearFecha = (valor) => {
  if (!valor) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-CL", { dateStyle: "medium" }).format(
    new Date(valor),
  );
};

const PillTiempo = ({ dias }) => (
  <span className="inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-bold uppercase text-text">
    {dias} {dias === 1 ? "día" : "días"}
  </span>
);

const mensajeError = (data) =>
  data.error?.message || data.message || data.error || "No se pudo cargar el historial";

const ConductorHistory = ({ conductor }) => {
  const [historial, setHistorial] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!conductor?.id_conductor) return;

    const controller = new AbortController();

    async function cargarHistorial() {
      try {
        setCargando(true);
        setError("");
        const response = await fetch(
          `/api/conductores/${encodeURIComponent(conductor.id_conductor)}/historial`,
          { signal: controller.signal, cache: "no-store" },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(mensajeError(data));
        setHistorial(data);
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "No se pudo cargar el historial",
        );
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarHistorial();
    return () => controller.abort();
  }, [conductor?.id_conductor]);

  if (!conductor?.id_conductor) {
    return (
      <p role="alert" className="py-4 text-sm text-red-600">
        No se pudo identificar al conductor.
      </p>
    );
  }
  if (cargando) {
    return <p className="py-4 text-sm text-subtext">Cargando historial...</p>;
  }
  if (error) {
    return (
      <p role="alert" className="py-4 text-sm text-red-600">
        Error: {error}
      </p>
    );
  }

  const filas = historial.rutas.map((ruta, index) => ({
    key: `${ruta.vehiculo}-${ruta.ruta}-${index}`,
    vehiculo: ruta.vehiculo ?? "Sin vehículo",
    tiempo: <PillTiempo dias={ruta.dias} />,
    ruta: ruta.ruta,
  }));
  const viajes = historial.viajes.map((viaje) => ({
    titulo: viaje.titulo ?? "Viaje",
    fecha:
      viaje.estado === "COMPLETADO" ? viaje.fecha_fin ?? viaje.fecha : viaje.fecha,
    detalle:
      viaje.estado === "EN_CURSO"
        ? `En curso · ${formatearFecha(viaje.fecha)}`
        : viaje.estado === "PROGRAMADO"
          ? `Programado · ${formatearFecha(viaje.fecha)}`
          : `Completado · ${formatearFecha(viaje.fecha_fin ?? viaje.fecha)}`,
    actual: viaje.actual,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <Seccion titulo="Historial de vehículos y rutas">
          {filas.length ? (
            <Tabla columnas={COLUMNAS_RUTAS} filas={filas} />
          ) : (
            <p className="rounded-2xl border border-icon p-5 text-sm text-subtext">
              Este conductor aún no tiene viajes registrados.
            </p>
          )}
        </Seccion>

        <Seccion titulo="Información relevante">
          <Tarjeta className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Dato label="Nº Licencia" value={historial.licencia_num || "Sin datos"} />
              <Dato label="RUN" value={historial.run || "Sin datos"} />
              <Dato
                label="Vencimiento licencia"
                value={
                  historial.fecha_venc_licencia
                    ? formatearFecha(historial.fecha_venc_licencia)
                    : "Sin datos"
                }
              />
            </div>
            <div className="flex flex-col gap-4 border-l border-icon pl-5">
              <Dato label="Email" value={historial.email || "Sin datos"} />
              <Dato label="Teléfono" value={historial.telefono || "Sin datos"} />
              <Dato label="Edad" value={historial.edad ?? "Sin datos"} />
              <Dato
                label="Año de Contrata"
                value={historial.anioContrata ?? "Sin datos"}
              />
            </div>
          </Tarjeta>
        </Seccion>
      </div>

      <Seccion titulo="Historial de viajes">
        {viajes.length ? (
          <LineaTiempo items={viajes} />
        ) : (
          <p className="rounded-2xl border border-icon p-5 text-sm text-subtext">
            Sin viajes registrados.
          </p>
        )}
      </Seccion>
    </div>
  );
};

export default ConductorHistory;
