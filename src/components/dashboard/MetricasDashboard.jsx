"use client";

import { useEffect, useState } from "react";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import StatisticCard from "@/components/dashboard/StatisticCard";

const formatoCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 1,
});

export default function MetricasDashboard() {
  const [metricas, setMetricas] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarMetricas() {
      try {
        const response = await fetch("/api/dashboard/metricas", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.error || "No se pudieron cargar las métricas.");
        }

        setMetricas(result.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar las métricas.",
        );
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarMetricas();
    return () => controller.abort();
  }, []);

  const vehiculos = metricas?.vehiculos;
  const gasto = metricas?.gasto;
  const combustible = metricas?.combustible;
  const CardsData = [
    {
      Title: "Vehículos",
      text: cargando
        ? "Cargando..."
        : error
          ? "—"
          : `Disponibles: ${vehiculos.disponibles}/${vehiculos.totales}`,
      SubText: "Listado de vehículos",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      icon: <LocalShippingRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
=======
      icon: <LocalShippingRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
      icon: <LocalShippingRoundedIcon className="light:text-[#4A4A4A] dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
      icon: <LocalShippingRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
      ariaLabel: "Vehículos disponibles y totales",
    },
    {
      Title: "Gasto Total Vehicular",
      text: cargando
        ? "Cargando..."
        : error
          ? "—"
          : formatoCLP.format(gasto.total),
      SubText: "Costos de combustible",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      icon: <MonetizationOnRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
=======
      icon: <MonetizationOnRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
      icon: <MonetizationOnRoundedIcon className="light:text-[#4A4A4A] dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
      icon: <MonetizationOnRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
      ariaLabel: "Gasto total vehicular",
    },
    {
      Title: "Combustible Utilizado",
      text: cargando
        ? "Cargando..."
        : error
          ? "—"
          : `${formatoNumero.format(combustible.litros)} L`,
      SubText: "Combustible total utilizado",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      icon: <LocalGasStationRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
=======
      icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
      icon: <LocalGasStationRoundedIcon className="light:text-[#4A4A4A] dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
      icon: <LocalGasStationRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
      ariaLabel: "Combustible total utilizado en litros",
    },
    {
      Title: "KPI",
      text: cargando
        ? "Cargando..."
        : error
          ? "—"
          : `${formatoNumero.format(combustible.kmPorLitro)} Km/L`,
      SubText: "Rendimiento Km/L",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      icon: <LocalGasStationRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
=======
      icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
      icon: <LocalGasStationRoundedIcon className="light:text-[#4A4A4A] dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
      icon: <LocalGasStationRoundedIcon className="light:text-graphite dark:text-icon" fontSize="large" aria-hidden="true" />,
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
      ariaLabel: "Rendimiento en kilómetros por litro",
    },
  ];

  return (
    <>
      {error && (
        <p role="alert" className="col-span-full text-sm text-red-600">
          Error al cargar las métricas: {error}
        </p>
      )}
      {CardsData.map((card) => (
        <StatisticCard
          key={card.Title}
          Title={card.Title}
          text={card.text}
          SubText={card.SubText}
          icon={card.icon}
          ariaLabel={card.ariaLabel}
        />
      ))}
    </>
  );
}
