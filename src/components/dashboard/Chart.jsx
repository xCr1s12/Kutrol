"use client";
<<<<<<< HEAD

import { useState, useEffect } from "react";

export default function ConsumoChart() {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState("semanal"); // "semanal" | "mensual" | "anual"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/consumo?periodo=${periodo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al consultar datos");
        return res.json();
      })
      .then((rows) => {
        const datosProcesados = rows.map((row) => {
          const litros = Number(row.cantidad_combustible || 0);
          return {
            fecha: row.fecha,
            litros: Math.round(litros),
            km: Math.round(litros * 3.7),
          };
        });

        setData(datosProcesados);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [periodo]);

  // Límites SVG
  const maxLitros = Math.max(...data.map((d) => d.litros), 10);
  const maxKm = Math.max(...data.map((d) => d.km), 10);
  const chartHeight = 180;
  const chartWidth = 500;
  const paddingX = 35;

  const points = data.map((item, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / Math.max(data.length - 1, 1);
    const yBar = chartHeight - (item.litros / maxLitros) * (chartHeight - 20);
    const yLine = chartHeight - (item.km / maxKm) * (chartHeight - 20);
    return { ...item, x, yBar, yLine };
  });

  const linePath = points.reduce(
    (acc, point, index) =>
      index === 0 ? `M ${point.x} ${point.yLine}` : `${acc} L ${point.x} ${point.yLine}`,
    ""
  );

  return (
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.04)] border border-[#EAE5DA] flex flex-col gap-4 font-sans">
      {/* Cabecera con Selector de Rango */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-[#1A1A1A] font-bold text-lg leading-tight">Consumo y Eficiencia</h2>
          <p className="text-xs text-[#6E6E6E] mt-0.5">Litros consumidos vs. Kilómetros recorridos</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-[#4A4A4A]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#1A1A1A] rounded-sm inline-block"></span>
              Litros (L)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#8C6239] inline-block"></span>
              Recorrido (Km)
            </span>
          </div>

          {/* Botones de Filtro por Rango */}
          <div className="flex bg-[#EAE5DA] p-1 rounded-full text-xs font-medium text-[#4A4A4A]">
            {["semanal", "mensual", "anual"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-3 py-1 rounded-full capitalize transition-colors ${
                  periodo === p ? "bg-[#1A1A1A] text-[#FDFBF7]" : "hover:text-[#1A1A1A]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ámbito del Gráfico */}
      {loading ? (
        <div className="w-full h-64 flex items-center justify-center text-xs text-[#6E6E6E]">
          Cargando periodo {periodo}...
        </div>
      ) : error || data.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center text-xs text-[#6E6E6E]">
          No hay datos disponibles para el rango seleccionado.
        </div>
      ) : (
        <div className="w-full relative">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="w-full h-64 overflow-visible">
            {[0, 0.33, 0.66, 1].map((ratio, i) => {
              const y = chartHeight - ratio * (chartHeight - 20);
              return (
                <line
                  key={i}
                  x1="15"
                  y1={y}
                  x2={chartWidth - 15}
                  y2={y}
                  stroke="#EAE5DA"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Barras dinámicas según el ancho del lote de datos */}
            {points.map((pt, i) => {
              const barWidth = periodo === "anual" ? 12 : periodo === "mensual" ? 22 : 18;
              return (
                <rect
                  key={i}
                  x={pt.x - barWidth / 2}
                  y={pt.yBar}
                  width={barWidth}
                  height={chartHeight - pt.yBar}
                  fill="#1A1A1A"
                  rx="3"
                  className="transition-all duration-200 opacity-90 hover:opacity-100 cursor-pointer"
                  onMouseEnter={() => setHovered(pt)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            <path d={linePath} fill="none" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" />

            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.yLine}
                r="3.5"
                fill="#FDFBF7"
                stroke="#8C6239"
                strokeWidth="2"
                className="cursor-pointer"
                onMouseEnter={() => setHovered(pt)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}

            {points.map((pt, i) => (
              <text
                key={i}
                x={pt.x}
                y={chartHeight + 20}
                textAnchor="middle"
                fill="#6E6E6E"
                fontSize="10"
                className="font-medium select-none"
              >
                {pt.fecha}
              </text>
            ))}
          </svg>

          {hovered && (
            <div
              className="absolute bg-[#FDFBF7] border border-[#EAE5DA] p-2.5 rounded-lg shadow-md text-xs pointer-events-none z-10 transition-all"
              style={{
                left: `${(hovered.x / chartWidth) * 100}%`,
                top: "10%",
                transform: "translateX(-50%)",
              }}
            >
              <p className="font-bold text-[#1A1A1A] mb-1">{hovered.fecha}</p>
              <p className="text-[#1A1A1A]">Litros: <span className="font-semibold">{hovered.litros} L</span></p>
              <p className="text-[#8C6239]">Recorrido: <span className="font-semibold">{hovered.km} Km</span></p>
            </div>
          )}
        </div>
      )}
=======
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
      
      <div className="w-full h-[280px] relative">
        <Line options={options} data={data} />
      </div>
>>>>>>> FrontEnd
    </div>
  );
}