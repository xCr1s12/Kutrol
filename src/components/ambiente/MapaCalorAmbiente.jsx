"use client";

import React, { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

export default function MapaCalorAmbiente() {
  const [tabActiva, setTabActiva] = useState("horario"); // 'horario', 'geografico', 'camiones'

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

  const camiones = ["AB-123-CD", "EF-456-GH", "JK-789-LM", "NP-012-RS"];
  const rutas = ["Castro - Ancud", "Castro - Quellón", "Castro - P. Montt", "Chonchi - Dalcahue"];
  const matrizCamiones = [
    [0, 1, 2, 0],
    [1, 0, 2, 1],
    [2, 2, 2, 1],
    [0, 0, 1, 0],
  ];

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
        return "bg-copper"; // Acento Oscuro / Cobre Kutrol (#8C6239)
      case 1:
        return "bg-gold"; // Dorado Acento Kutrol (#D4AF37)
      case 0:
      default:
        return "bg-brand"; // Verde Oscuro Fondo Kutrol (#1B2B24)
    }
  };

  return (
    <div className="w-full bg-cream rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-linen">
      {/* Encabezado y Selector de Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-ink font-bold text-lg">
            Análisis de Impacto Ambiental y Emisiones
          </h2>
          <p className="text-xs text-graphite mt-0.5">
            Monitoreo de la huella de carbono de la flota según franja y ruta
          </p>
        </div>

        {/* Tabs de Selección */}
        <div className="flex bg-linen/50 p-1 rounded-lg border border-linen self-start md:self-auto">
          <button
            onClick={() => setTabActiva("horario")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "horario"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
            }`}
          >
            <AccessTimeRoundedIcon fontSize="small" />
            <span>Franja Horaria</span>
          </button>

          <button
            onClick={() => setTabActiva("geografico")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "geografico"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
            }`}
          >
            <MapIcon fontSize="small" />
            <span>Por Zonas</span>
          </button>

          <button
            onClick={() => setTabActiva("camiones")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "camiones"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
            }`}
          >
            <LocalShippingRoundedIcon fontSize="small" />
            <span>Camión vs Ruta</span>
          </button>
        </div>
      </div>

      {/* Leyenda de Colores */}
      <div className="flex items-center gap-4 text-xs mb-4 pb-3 border-b border-linen">
        <span className="text-graphite font-semibold">Nivel de CO₂:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-brand inline-block" />
          <span className="text-ink">Bajo / Eficiente</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-gold inline-block" />
          <span className="text-ink">Moderado</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-copper inline-block" />
          <span className="text-ink">Crítico / Elevado</span>
        </span>
      </div>

      {/* VISTA 1: FRANJA HORARIA */}
      {tabActiva === "horario" && (
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-graphite">
              <span className="text-left">Día / Hora</span>
              {horas.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>

            {dias.map((dia, fIdx) => (
              <div key={dia} className="grid grid-cols-7 gap-2 mb-2 items-center">
                <span className="text-xs font-bold text-ink">{dia}</span>
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
              className="p-4 rounded-lg border border-linen flex items-center justify-between bg-cream"
            >
              <div>
                <h3 className="font-bold text-sm text-ink">{zona.comuna}</h3>
                <p className="text-xs text-graphite">{zona.descripcion}</p>
                <span className="text-xs text-copper font-medium mt-1 inline-block">
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
            <div className="grid grid-cols-5 gap-2 mb-2 text-center text-xs font-bold text-graphite">
              <span className="text-left">Patente / Ruta</span>
              {rutas.map((r) => (
                <span key={r} className="truncate">{r}</span>
              ))}
            </div>

            {camiones.map((patente, fIdx) => (
              <div key={patente} className="grid grid-cols-5 gap-2 mb-2 items-center">
                <span className="text-xs font-bold text-ink truncate">
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