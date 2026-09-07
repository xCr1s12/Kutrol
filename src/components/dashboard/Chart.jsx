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
          color: "#6E6E6E",
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
          color: "#A8B0AB",
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
        borderColor: "#1A1A1A",
        backgroundColor: "#1A1A1A",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 2",
        data: [30, 55, 45, 75, 30],
        borderColor: "#6E6E6E",
        backgroundColor: "#6E6E6E",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 3",
        data: [20, 60, 35, 65, 80],
        borderColor: "#A8B0AB",
        backgroundColor: "#A8B0AB",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Camion 4",
        data: [50, 30, 20, 45, 25],
        borderColor: "#D1D5DB",
        backgroundColor: "#D1D5DB",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col">
      <h3 className="text-[#1A1A1A] font-bold text-lg mb-4">Consumo Ultimos 30 Dias</h3>
      
      {/* CAMBIO CLAVE: Agregamos min-h-[250px] o h-[300px] al div que envuelve a <Line /> */}
      <div className="w-full h-[280px] relative">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}