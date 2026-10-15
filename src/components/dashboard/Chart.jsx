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
import { useContext } from "react";
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
  const chartColors = darkMode
    ? ["#FDFBF7", "#A8B0AB", "#C2C9C4", "#D4AF37"]
    : ["#1A1A1A", "#6E6E6E", "#A8B0AB", "#D1D5DB"];

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
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie"],
    datasets: [
      {
        label: "Camion 1",
        data: [40, 70, 50, 80, 45],
        borderColor: chartColors[0],
        backgroundColor: chartColors[0],
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 2",
        data: [30, 55, 45, 75, 30],
        borderColor: chartColors[1],
        backgroundColor: chartColors[1],
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 3",
        data: [20, 60, 35, 65, 80],
        borderColor: chartColors[2],
        backgroundColor: chartColors[2],
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 4",
        data: [50, 30, 20, 45, 25],
        borderColor: chartColors[3],
        backgroundColor: chartColors[3],
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <figure className="light:bg-card dark:bg-card m-0 flex w-full flex-col rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
      <figcaption>
        <h3 className="text-text mb-4 text-lg font-bold light:text-text dark:text-text">
          Consumo Ultimos 30 Dias
        </h3>
      </figcaption>

      <div className="w-full h-[280px] relative">
        <Line options={options} data={data} />
      </div>
    </figure>
  );
}