"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { darkModeContext } from "@/components/ui/DarkModeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ConsumoChart() {
  const { darkMode } = useContext(darkModeContext);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const chartColors = darkMode
    ? ["#FDFBF7", "#A8B0AB", "#C2C9C4", "#D4AF37"]
    : ["#1A1A1A", "#6E6E6E", "#A8B0AB", "#D1D5DB"];

  useEffect(() => {
    const controller = new AbortController();

    async function cargarConsumo() {
      try {
        const response = await fetch("/api/dashboard/consumo", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (
          !response.ok ||
          !result.ok ||
          !Array.isArray(result.data?.labels) ||
          !Array.isArray(result.data?.datasets)
        ) {
          throw new Error(result.error || "No se pudieron cargar los datos de consumo.");
        }

        setChartData(result.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Error al cargar el consumo.");
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarConsumo();
    return () => controller.abort();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico llene el contenedor
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
            family: "system-ui",
          },
          color: darkMode ? "#A8B0AB" : "#6E6E6E",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? "#C2C9C4" : "#A8B0AB",
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: chartColors[index % chartColors.length],
      backgroundColor: chartColors[index % chartColors.length],
      tension: 0.4,
      pointRadius: 4,
    })),
  };

  return (
    <figure className="light:bg-card dark:bg-card m-0 flex w-full flex-col rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
      <figcaption>
        <h3 className="text-text mb-4 text-lg font-bold light:text-text dark:text-text">
          Consumo últimos 30 días
        </h3>
      </figcaption>

      <div className="w-full h-[280px] relative">
        {cargando ? (
          <p className="text-subtext flex h-full items-center justify-center text-sm" role="status">
            Cargando consumo...
          </p>
        ) : error ? (
          <p className="flex h-full items-center justify-center text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : data.datasets.length === 0 ? (
          <p className="text-subtext flex h-full items-center justify-center text-sm">
            No hay datos de consumo para los últimos 30 días.
          </p>
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </figure>
  );
}