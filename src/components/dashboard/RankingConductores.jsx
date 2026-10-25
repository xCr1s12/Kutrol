"use client";

import { useEffect, useState } from "react";

const formatoRendimiento = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 1,
});

export default function RankingConductores() {
  const [ranking, setRanking] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarRanking() {
      try {
        const response = await fetch("/api/dashboard/ranking-conductores", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "No se pudo cargar el ranking de conductores.",
          );
        }

        if (!Array.isArray(result.data?.ranking)) {
          throw new Error("La API devolvió un ranking de conductores inválido.");
        }

        setRanking(result.data.ranking);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar el ranking de conductores.",
        );
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarRanking();
    return () => controller.abort();
  }, []);

  if (cargando) {
    return (
      <li className="text-subtext text-sm" role="status">
        Cargando ranking...
      </li>
    );
  }

  if (error) {
    return (
      <li className="text-sm text-red-600" role="alert">
        Error al cargar el ranking: {error}
      </li>
    );
  }

  if (ranking.length === 0) {
    return (
      <li className="text-subtext text-sm">
        No hay datos de rendimiento disponibles.
      </li>
    );
  }

  return ranking.map((conductor) => {
    const nombre = conductor.nombre || "Conductor sin nombre";
    const iniciales = nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase();
    const rendimiento = Number(conductor.rendimiento_kml);

    return (
      <li
        key={conductor.id_conductor}
        className="flex items-center justify-between text-sm"
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-moss text-xs font-bold text-cream"
            aria-hidden="true"
          >
            {iniciales || "?"}
          </span>
          <span className="text-text font-medium light:text-text dark:text-text">
            {nombre}
          </span>
        </div>
        <span className="text-subtext text-sm font-semibold light:text-subtext dark:text-subtext">
          {formatoRendimiento.format(rendimiento)} km/L
        </span>
      </li>
    );
  });
}
