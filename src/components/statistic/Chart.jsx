"use client";

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
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="bg-card text-text flex w-full flex-col gap-4 rounded-xl border border-border p-6 font-sans shadow-[0px_4px_10px_rgba(0,0,0,0.04)]">
      {/* Cabecera con Selector de Rango */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-text text-lg font-bold leading-tight">Consumo y Eficiencia</h2>
          <p className="text-subtext mt-0.5 text-xs">Litros consumidos vs. Kilómetros recorridos</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-subtext flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="bg-text inline-block h-3 w-3 rounded-sm"></span>
              Litros (L)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-accent inline-block h-0.5 w-3"></span>
=======
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.04)] border border-[#EAE5DA] flex flex-col gap-4 font-sans">
=======
    <div className="bg-card text-text flex w-full flex-col gap-4 rounded-xl border border-border p-6 font-sans shadow-[0px_4px_10px_rgba(0,0,0,0.04)]">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
      {/* Cabecera con Selector de Rango */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-text text-lg font-bold leading-tight">Consumo y Eficiencia</h2>
          <p className="text-subtext mt-0.5 text-xs">Litros consumidos vs. Kilómetros recorridos</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-subtext flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="bg-text inline-block h-3 w-3 rounded-sm"></span>
              Litros (L)
            </span>
            <span className="flex items-center gap-1.5">
<<<<<<< HEAD
              <span className="w-3 h-0.5 bg-[#8C6239] inline-block"></span>
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
              <span className="bg-accent inline-block h-0.5 w-3"></span>
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
              Recorrido (Km)
            </span>
          </div>

          {/* Botones de Filtro por Rango */}
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="bg-background text-subtext flex rounded-full border border-border p-1 text-xs font-medium">
=======
          <div className="flex bg-[#EAE5DA] p-1 rounded-full text-xs font-medium text-[#4A4A4A]">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
          <div className="bg-background text-subtext flex rounded-full border border-border p-1 text-xs font-medium">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
            {["semanal", "mensual", "anual"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-3 py-1 rounded-full capitalize transition-colors ${
<<<<<<< HEAD
<<<<<<< HEAD
                  periodo === p ? "bg-text text-background" : "hover:text-text"
=======
                  periodo === p ? "bg-[#1A1A1A] text-[#FDFBF7]" : "hover:text-[#1A1A1A]"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                  periodo === p ? "bg-text text-background" : "hover:text-text"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
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
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="text-subtext flex h-64 w-full items-center justify-center text-xs">
          Cargando periodo {periodo}...
        </div>
      ) : error || data.length === 0 ? (
        <div className="text-subtext flex h-64 w-full items-center justify-center text-xs">
=======
        <div className="w-full h-64 flex items-center justify-center text-xs text-[#6E6E6E]">
          Cargando periodo {periodo}...
        </div>
      ) : error || data.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center text-xs text-[#6E6E6E]">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
        <div className="text-subtext flex h-64 w-full items-center justify-center text-xs">
          Cargando periodo {periodo}...
        </div>
      ) : error || data.length === 0 ? (
        <div className="text-subtext flex h-64 w-full items-center justify-center text-xs">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
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
<<<<<<< HEAD
<<<<<<< HEAD
                  stroke="var(--border)"
=======
                  stroke="#EAE5DA"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                  stroke="var(--border)"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
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
<<<<<<< HEAD
<<<<<<< HEAD
                  fill="var(--text)"
=======
                  fill="#1A1A1A"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                  fill="var(--text)"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
                  rx="3"
                  className="transition-all duration-200 opacity-90 hover:opacity-100 cursor-pointer"
                  onMouseEnter={() => setHovered(pt)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

<<<<<<< HEAD
<<<<<<< HEAD
            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
=======
            <path d={linePath} fill="none" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" />
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
>>>>>>> 612f808 (feat(statistic): update statistic page and components)

            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.yLine}
                r="3.5"
<<<<<<< HEAD
<<<<<<< HEAD
                fill="var(--card)"
                stroke="var(--accent)"
=======
                fill="#FDFBF7"
                stroke="#8C6239"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                fill="var(--card)"
                stroke="var(--accent)"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
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
<<<<<<< HEAD
<<<<<<< HEAD
                fill="var(--subtext)"
=======
                fill="#6E6E6E"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                fill="var(--subtext)"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
                fontSize="10"
                className="font-medium select-none"
              >
                {pt.fecha}
              </text>
            ))}
          </svg>

          {hovered && (
            <div
<<<<<<< HEAD
<<<<<<< HEAD
              className="bg-card text-text border-border pointer-events-none absolute z-10 rounded-lg border p-2.5 text-xs shadow-md transition-all"
=======
              className="absolute bg-[#FDFBF7] border border-[#EAE5DA] p-2.5 rounded-lg shadow-md text-xs pointer-events-none z-10 transition-all"
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
              className="bg-card text-text border-border pointer-events-none absolute z-10 rounded-lg border p-2.5 text-xs shadow-md transition-all"
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
              style={{
                left: `${(hovered.x / chartWidth) * 100}%`,
                top: "10%",
                transform: "translateX(-50%)",
              }}
            >
<<<<<<< HEAD
<<<<<<< HEAD
              <p className="text-text mb-1 font-bold">{hovered.fecha}</p>
              <p>Litros: <span className="font-semibold">{hovered.litros} L</span></p>
              <p className="text-accent">Recorrido: <span className="font-semibold">{hovered.km} Km</span></p>
=======
              <p className="font-bold text-[#1A1A1A] mb-1">{hovered.fecha}</p>
              <p className="text-[#1A1A1A]">Litros: <span className="font-semibold">{hovered.litros} L</span></p>
              <p className="text-[#8C6239]">Recorrido: <span className="font-semibold">{hovered.km} Km</span></p>
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
              <p className="text-text mb-1 font-bold">{hovered.fecha}</p>
              <p>Litros: <span className="font-semibold">{hovered.litros} L</span></p>
              <p className="text-accent">Recorrido: <span className="font-semibold">{hovered.km} Km</span></p>
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
            </div>
          )}
        </div>
      )}
    </div>
  );
}