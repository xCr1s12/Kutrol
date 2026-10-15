"use client";

import React, { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

export default function MapaCalorAmbiente() {
  const [tabActiva, setTabActiva] = useState("horario"); // 'horario', 'geografico', 'camiones'

  // --- DATOS MAPA HORARIO ---
  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const horas = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
  const matrizHoraria = [
    [0, 1, 2, 2, 1, 0],
    [0, 2, 2, 1, 1, 0],
    [1, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 0, 0],
    [1, 2, 2, 2, 2, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  // --- DATOS MAPA CAMIONES (PATENTES REALES) VS RUTAS ---
  const camiones = ["AB-123-CD", "EF-456-GH", "JK-789-LM", "NP-012-RS"];
  const rutas = ["Castro - Ancud", "Castro - Quellón", "Castro - P. Montt", "Chonchi - Dalcahue"];
  const matrizCamiones = [
    [0, 1, 2, 0],
    [1, 0, 2, 1],
    [2, 2, 2, 1],
    [0, 0, 1, 0],
  ];

  // --- DATOS MAPA GEOGRÁFICO / ZONAS ---
  const zonas = [
    { comuna: "Castro (Centro)", descripcion: "Pendiente & Tráfico", co2: "4.2 Ton", nivel: 2 },
    { comuna: "Ancud (Norte)", descripcion: "Ruta 5 Sur", co2: "2.8 Ton", nivel: 1 },
    { comuna: "Quellón (Sur)", descripcion: "Flujo Continuo", co2: "1.1 Ton", nivel: 0 },
    { comuna: "Chonchi / Dalcahue", descripcion: "Cruces Rurales", co2: "2.1 Ton", nivel: 1 },
  ];

  // Mantener los niveles distinguibles sobre las superficies de ambos temas.
  const getStyleByLevel = (nivel) => {
    switch (nivel) {
      case 2:
        return "bg-[#8C6239] dark:bg-orange-400";
      case 1:
        return "bg-[#D4AF37]";
      case 0:
      default:
        return "bg-[#1B2B24] dark:bg-emerald-500";
    }
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-text shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
      {/* Encabezado y Selector de Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold">
            Análisis de Impacto Ambiental y Emisiones
          </h2>
          <p className="mt-0.5 text-xs text-subtext">
            Monitoreo de la huella de carbono de la flota según franja y ruta
          </p>
        </div>

        {/* Tabs de Selección */}
        <div className="flex self-start rounded-lg border border-border bg-background p-1 md:self-auto">
          <button
            onClick={() => setTabActiva("horario")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "horario"
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
            }`}
          >
            <AccessTimeRoundedIcon fontSize="small" />
            <span>Franja Horaria</span>
          </button>

          <button
            onClick={() => setTabActiva("geografico")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "geografico"
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
            }`}
          >
            <MapIcon fontSize="small" />
            <span>Por Zonas</span>
          </button>

          <button
            onClick={() => setTabActiva("camiones")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "camiones"
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
            }`}
          >
            <LocalShippingRoundedIcon fontSize="small" />
            <span>Camión vs Ruta</span>
          </button>
        </div>
      </div>

      {/* Leyenda de Colores */}
      <div className="mb-4 flex items-center gap-4 border-b border-border pb-3 text-xs">
        <span className="font-semibold text-subtext">Nivel de CO₂:</span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(0)}`} />
          <span className="text-text">Bajo / Eficiente</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(1)}`} />
          <span className="text-text">Moderado</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(2)}`} />
          <span className="text-text">Crítico / Elevado</span>
        </span>
      </div>

      {/* VISTA 1: FRANJA HORARIA */}
      {tabActiva === "horario" && (
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[500px]">
            <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-bold text-subtext">
              <span className="text-left">Día / Hora</span>
              {horas.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>

            {dias.map((dia, fIdx) => (
              <div key={dia} className="mb-2 grid grid-cols-7 items-center gap-2">
                <span className="text-xs font-bold text-text">{dia}</span>
                {matrizHoraria[fIdx].map((val, cIdx) => (
                  <div
                    key={cIdx}
                    className={`h-9 rounded-md transition-transform hover:scale-105 cursor-pointer ${getStyleByLevel(
                      val
                    )}`}
                    title={`Nivel CO₂: ${val === 2 ? "Crítico" : val === 1 ? "Moderado" : "Bajo"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA 2: POR ZONAS */}
      {tabActiva === "geografico" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {zonas.map((zona, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
            >
              <div>
                <h3 className="text-sm font-bold text-text">{zona.comuna}</h3>
                <p className="text-xs text-subtext">{zona.descripcion}</p>
                <span className="mt-1 inline-block text-xs font-medium text-accent">
                  Huella registrada: {zona.co2}
                </span>
              </div>
              <div
                className={`w-10 h-10 rounded-lg transition-transform hover:scale-105 ${getStyleByLevel(
                  zona.nivel
                )}`}
                title={`Nivel CO₂: ${zona.nivel === 2 ? "Crítico" : zona.nivel === 1 ? "Moderado" : "Bajo"}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* VISTA 3: CAMIÓN (PATENTE) VS RUTA */}
      {tabActiva === "camiones" && (
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[550px]">
            <div className="mb-2 grid grid-cols-5 gap-2 text-center text-xs font-bold text-subtext">
              <span className="text-left">Patente / Ruta</span>
              {rutas.map((r) => (
                <span key={r} className="truncate">{r}</span>
              ))}
            </div>

            {camiones.map((patente, fIdx) => (
              <div key={patente} className="mb-2 grid grid-cols-5 items-center gap-2">
                <span className="truncate text-xs font-bold text-text">
                  {patente}
                </span>
                {matrizCamiones[fIdx].map((val, cIdx) => (
                  <div
                    key={cIdx}
                    className={`h-9 rounded-md transition-transform hover:scale-105 cursor-pointer ${getStyleByLevel(
                      val
                    )}`}
                    title={`Patente: ${patente} | Ruta: ${rutas[cIdx]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}