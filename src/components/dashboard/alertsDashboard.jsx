"use client";
import { useEffect, useState } from "react";
import DropMenu from "../ui/DropMenu";

const estilosEstado = {
  Leve: "bg-green-100 text-green-800",
  Moderado: "bg-amber-100 text-amber-800",
  "Crítico": "bg-red-100 text-red-700",
};

export default function AlertsSection() {
  const [alertas, setAlertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarAlertas() {
      try {
        const respuesta = await fetch("/api/alerts", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las alertas.");
        }

        const datos = await respuesta.json();
        if (!Array.isArray(datos)) {
          throw new Error("La respuesta de alertas no tiene un formato válido.");
        }

        setAlertas(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error cargando alertas del dashboard:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarAlertas();
    return () => controller.abort();
  }, []);

  const alertasRecientes = [...alertas]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5);

  return (
    <section
      className="light:bg-card dark:bg-card flex w-full flex-col gap-y-4 rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]"
      aria-labelledby="alerts-title"
    >
      <h2 id="alerts-title" className="text-text mb-2 text-lg font-bold light:text-text dark:text-text">
        Alertas
      </h2>

      {cargando ? (
        <p className="text-subtext text-sm" role="status">
          Cargando alertas...
        </p>
      ) : error ? (
        <p className="text-red-500 text-sm" role="alert">
          Ocurrió un problema: {error}
        </p>
      ) : alertasRecientes.length === 0 ? (
        <p className="text-subtext text-sm">No hay alertas registradas.</p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-y-3 p-0">
          {alertasRecientes.map((alerta) => (
            <li
              key={alerta.id}
              className="light:bg-background light:border-border dark:bg-background dark:border-border flex w-full items-start justify-between rounded-2xl border-2 p-4 shadow-sm"
            >
              <div className="flex flex-col gap-y-2 pr-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-text text-sm font-bold light:text-text dark:text-text">
                    Alerta {alerta.estado}
                  </h3>
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                      estilosEstado[alerta.estado] || "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {alerta.estado}
                  </span>
                </div>
                <p className="text-subtext text-xs leading-relaxed light:text-subtext dark:text-subtext">
                  {alerta.mensaje}
                </p>
                <p className="text-subtext text-xs light:text-subtext dark:text-subtext">
                  Vehículo: {alerta.vehiculo} ·{" "}
                  {new Date(alerta.fecha).toLocaleString("es-CL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="light:text-text hover:text-text cursor-pointer rounded p-1 transition-colors dark:text-icon dark:hover:text-text">
                <DropMenu />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}