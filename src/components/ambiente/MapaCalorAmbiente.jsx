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

<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
  // Mapeo de Colores de la Paleta Kutrol
=======
  // Mantener los niveles distinguibles sobre las superficies de ambos temas.
>>>>>>> f577f5f (minor changes)
  const getStyleByLevel = (nivel) => {
    switch (nivel) {
      case 2:
        return "bg-[#8C6239] dark:bg-orange-400";
      case 1:
        return "bg-[#D4AF37]";
      case 0:
      default:
<<<<<<< HEAD
        return "bg-[#1B2B24]"; // Verde Oscuro Fondo Kutrol (#1B2B24)
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
        return "bg-[#1B2B24] dark:bg-emerald-500";
>>>>>>> f577f5f (minor changes)
=======
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
    <div className="w-full bg-cream rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-linen">
      {/* Encabezado y Selector de Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-ink font-bold text-lg">
            Análisis de Impacto Ambiental y Emisiones
          </h2>
          <p className="text-xs text-graphite mt-0.5">
<<<<<<< HEAD
=======
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA]">
=======
    <div className="w-full rounded-xl border border-border bg-card p-6 text-text shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
>>>>>>> f577f5f (minor changes)
      {/* Encabezado y Selector de Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold">
            Análisis de Impacto Ambiental y Emisiones
          </h2>
<<<<<<< HEAD
          <p className="text-xs text-[#4A4A4A] mt-0.5">
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
          <p className="mt-0.5 text-xs text-subtext">
>>>>>>> f577f5f (minor changes)
=======
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
            Monitoreo de la huella de carbono de la flota según franja y ruta
          </p>
        </div>

        {/* Tabs de Selección */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
        <div className="flex bg-linen/50 p-1 rounded-lg border border-linen self-start md:self-auto">
          <button
            onClick={() => setTabActiva("horario")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "horario"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
<<<<<<< HEAD
=======
        <div className="flex bg-[#EAE5DA]/50 p-1 rounded-lg border border-[#EAE5DA] self-start md:self-auto">
=======
        <div className="flex self-start rounded-lg border border-border bg-background p-1 md:self-auto">
>>>>>>> f577f5f (minor changes)
          <button
            onClick={() => setTabActiva("horario")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "horario"
<<<<<<< HEAD
                ? "bg-[#1A1A1A] text-[#FDFBF7]"
                : "text-[#4A4A4A] hover:text-[#1A1A1A]"
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
>>>>>>> f577f5f (minor changes)
=======
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
            }`}
          >
            <AccessTimeRoundedIcon fontSize="small" />
            <span>Franja Horaria</span>
          </button>

          <button
            onClick={() => setTabActiva("geografico")}
<<<<<<< HEAD
<<<<<<< HEAD
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "geografico"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
=======
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tabActiva === "geografico"
<<<<<<< HEAD
                ? "bg-[#1A1A1A] text-[#FDFBF7]"
                : "text-[#4A4A4A] hover:text-[#1A1A1A]"
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "geografico"
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
>>>>>>> f577f5f (minor changes)
=======
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
            }`}
          >
            <MapIcon fontSize="small" />
            <span>Por Zonas</span>
          </button>

          <button
            onClick={() => setTabActiva("camiones")}
<<<<<<< HEAD
<<<<<<< HEAD
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "camiones"
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
=======
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tabActiva === "camiones"
<<<<<<< HEAD
                ? "bg-[#1A1A1A] text-[#FDFBF7]"
                : "text-[#4A4A4A] hover:text-[#1A1A1A]"
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "camiones"
                ? "bg-text text-background"
                : "text-subtext hover:text-text"
>>>>>>> f577f5f (minor changes)
=======
                ? "bg-ink text-cream"
                : "text-graphite hover:text-ink"
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
            }`}
          >
            <LocalShippingRoundedIcon fontSize="small" />
            <span>Camión vs Ruta</span>
          </button>
        </div>
      </div>

      {/* Leyenda de Colores */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      <div className="flex items-center gap-4 text-xs mb-4 pb-3 border-b border-[#EAE5DA]">
        <span className="text-[#4A4A4A] font-semibold">Nivel de CO₂:</span>
=======
      <div className="mb-4 flex items-center gap-4 border-b border-border pb-3 text-xs">
        <span className="font-semibold text-subtext">Nivel de CO₂:</span>
>>>>>>> f577f5f (minor changes)
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(0)}`} />
          <span className="text-text">Bajo / Eficiente</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(1)}`} />
          <span className="text-text">Moderado</span>
        </span>
        <span className="flex items-center gap-1.5">
<<<<<<< HEAD
          <span className="w-3.5 h-3.5 rounded bg-[#8C6239] inline-block" />
          <span className="text-[#1A1A1A]">Crítico / Elevado</span>
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
          <span className={`inline-block h-3.5 w-3.5 rounded ${getStyleByLevel(2)}`} />
          <span className="text-text">Crítico / Elevado</span>
>>>>>>> f577f5f (minor changes)
=======
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
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
        </span>
      </div>

      {/* VISTA 1: FRANJA HORARIA */}
      {tabActiva === "horario" && (
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[500px]">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-graphite">
=======
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-[#4A4A4A]">
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
            <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-bold text-subtext">
>>>>>>> f577f5f (minor changes)
=======
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-graphite">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
              <span className="text-left">Día / Hora</span>
              {horas.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>

            {dias.map((dia, fIdx) => (
<<<<<<< HEAD
              <div key={dia} className="grid grid-cols-7 gap-2 mb-2 items-center">
<<<<<<< HEAD
<<<<<<< HEAD
                <span className="text-xs font-bold text-ink">{dia}</span>
=======
                <span className="text-xs font-bold text-[#1A1A1A]">{dia}</span>
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
              <div key={dia} className="mb-2 grid grid-cols-7 items-center gap-2">
                <span className="text-xs font-bold text-text">{dia}</span>
>>>>>>> f577f5f (minor changes)
=======
                <span className="text-xs font-bold text-ink">{dia}</span>
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              className="p-4 rounded-lg border border-linen flex items-center justify-between bg-cream"
            >
              <div>
                <h3 className="font-bold text-sm text-ink">{zona.comuna}</h3>
                <p className="text-xs text-graphite">{zona.descripcion}</p>
                <span className="text-xs text-copper font-medium mt-1 inline-block">
=======
              className="p-4 rounded-lg border border-[#EAE5DA] flex items-center justify-between bg-[#FDFBF7]"
            >
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">{zona.comuna}</h3>
                <p className="text-xs text-[#4A4A4A]">{zona.descripcion}</p>
                <span className="text-xs text-[#8C6239] font-medium mt-1 inline-block">
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
            >
              <div>
                <h3 className="text-sm font-bold text-text">{zona.comuna}</h3>
                <p className="text-xs text-subtext">{zona.descripcion}</p>
                <span className="mt-1 inline-block text-xs font-medium text-accent">
>>>>>>> f577f5f (minor changes)
=======
              className="p-4 rounded-lg border border-linen flex items-center justify-between bg-cream"
            >
              <div>
                <h3 className="font-bold text-sm text-ink">{zona.comuna}</h3>
                <p className="text-xs text-graphite">{zona.descripcion}</p>
                <span className="text-xs text-copper font-medium mt-1 inline-block">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="grid grid-cols-5 gap-2 mb-2 text-center text-xs font-bold text-graphite">
=======
            <div className="grid grid-cols-5 gap-2 mb-2 text-center text-xs font-bold text-[#4A4A4A]">
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
            <div className="mb-2 grid grid-cols-5 gap-2 text-center text-xs font-bold text-subtext">
>>>>>>> f577f5f (minor changes)
=======
            <div className="grid grid-cols-5 gap-2 mb-2 text-center text-xs font-bold text-graphite">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
              <span className="text-left">Patente / Ruta</span>
              {rutas.map((r) => (
                <span key={r} className="truncate">{r}</span>
              ))}
            </div>

            {camiones.map((patente, fIdx) => (
<<<<<<< HEAD
              <div key={patente} className="grid grid-cols-5 gap-2 mb-2 items-center">
<<<<<<< HEAD
<<<<<<< HEAD
                <span className="text-xs font-bold text-ink truncate">
=======
                <span className="text-xs font-bold text-[#1A1A1A] truncate">
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
              <div key={patente} className="mb-2 grid grid-cols-5 items-center gap-2">
                <span className="truncate text-xs font-bold text-text">
>>>>>>> f577f5f (minor changes)
=======
                <span className="text-xs font-bold text-ink truncate">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
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