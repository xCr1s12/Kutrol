"use client";

import React, { useState, useEffect } from "react";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

export default function MapaCalorAmbiente() {
  const [tabActiva, setTabActiva] = useState("horario");
  const [loading, setLoading] = useState(true);

  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const horas24 = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  const [matrizHoraria, setMatrizHoraria] = useState(
    Array.from({ length: 7 }, () => Array(24).fill(0))
  );
  const [zonas, setZonas] = useState([]);
  const [camionesRuta, setCamionesRuta] = useState({
    camiones: [],
    rutas: [],
    matrizCamiones: [],
  });

  useEffect(() => {
    async function cargarMapaCalor() {
      try {
        const res = await fetch("/api/ambiente/mapa-calor");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.matrizHoraria) {
            setMatrizHoraria(json.data.matrizHoraria);
          }
          if (json.data?.zonas) {
            setZonas(json.data.zonas);
          }
          if (json.data?.camionesRuta) {
            setCamionesRuta(json.data.camionesRuta);
          }
        }
      } catch (e) {
        console.error("Error al cargar mapa de calor:", e);
      } finally {
        setLoading(false);
      }
    }
    cargarMapaCalor();
  }, []);

  const getStyleByLevel = (nivel) => {
    switch (nivel) {
      case 2:
        return "bg-copper";
      case 1:
        return "bg-gold";
      case 0:
      default:
        return "bg-brand";
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-cream rounded-xl p-8 text-center text-graphite font-medium animate-pulse border border-linen">
        Cargando análisis de emisiones desde la base de datos...
      </div>
    );
  }

  return (
    <div className="w-full bg-cream rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-linen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-ink font-bold text-lg">
            Análisis de Impacto Ambiental y Emisiones
          </h2>
          <p className="text-xs text-graphite mt-0.5">
            Monitoreo de la huella de carbono de la flota según franja y ruta
          </p>
        </div>

        <div className="flex bg-linen/50 p-1 rounded-lg border border-linen self-start md:self-auto">
          <button
            onClick={() => setTabActiva("horario")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "horario" ? "bg-ink text-cream" : "text-graphite hover:text-ink"
            }`}
          >
            <AccessTimeRoundedIcon fontSize="small" />
            <span>Franja Horaria</span>
          </button>

          <button
            onClick={() => setTabActiva("geografico")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "geografico" ? "bg-ink text-cream" : "text-graphite hover:text-ink"
            }`}
          >
            <MapIcon fontSize="small" />
            <span>Por Zonas</span>
          </button>

          <button
            onClick={() => setTabActiva("camiones")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              tabActiva === "camiones" ? "bg-ink text-cream" : "text-graphite hover:text-ink"
            }`}
          >
            <LocalShippingRoundedIcon fontSize="small" />
            <span>Camión vs Ruta</span>
          </button>
        </div>
      </div>

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

      {tabActiva === "horario" && (
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[850px]">
            <div className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 mb-2 text-center text-[10px] font-bold text-graphite">
              <span className="text-left font-bold text-xs text-ink">Día</span>
              {horas24.map((h) => (
                <span key={h} className="truncate">{h}</span>
              ))}
            </div>

            {dias.map((dia, fIdx) => (
              <div key={dia} className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 mb-1.5 items-center">
                <span className="text-xs font-bold text-ink">{dia}</span>
                {matrizHoraria[fIdx]?.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    className={`h-8 rounded-sm transition-transform hover:scale-110 cursor-pointer ${getStyleByLevel(
                      val
                    )}`}
                    title={`Hora: ${horas24[cIdx]} | Día: ${dia} | Nivel CO₂: ${
                      val === 2 ? "Crítico" : val === 1 ? "Moderado" : "Bajo"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {tabActiva === "geografico" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {zonas.length > 0 ? (
            zonas.map((zona, idx) => (
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
            ))
          ) : (
            <p className="text-xs text-graphite py-4 col-span-2">No hay datos de zonas registrados en la BD.</p>
          )}
        </div>
      )}

      {tabActiva === "camiones" && (
        <div className="overflow-x-auto pt-2">
          {camionesRuta.camiones.length > 0 && camionesRuta.rutas.length > 0 ? (
            <div className="min-w-[550px]">
              <div
                className="grid gap-2 mb-2 text-center text-xs font-bold text-graphite"
                style={{
                  gridTemplateColumns: `100px repeat(${camionesRuta.rutas.length}, 1fr)`,
                }}
              >
                <span className="text-left">Patente / Ruta</span>
                {camionesRuta.rutas.map((r) => (
                  <span key={r} className="truncate" title={r}>
                    {r}
                  </span>
                ))}
              </div>

              {camionesRuta.camiones.map((patente, fIdx) => (
                <div
                  key={patente}
                  className="grid gap-2 mb-2 items-center"
                  style={{
                    gridTemplateColumns: `100px repeat(${camionesRuta.rutas.length}, 1fr)`,
                  }}
                >
                  <span className="text-xs font-bold text-ink truncate">{patente}</span>
                  {camionesRuta.matrizCamiones[fIdx]?.map((val, cIdx) => (
                    <div
                      key={cIdx}
                      className={`h-9 rounded-md transition-transform hover:scale-105 cursor-pointer ${getStyleByLevel(
                        val
                      )}`}
                      title={`Patente: ${patente} | Ruta: ${camionesRuta.rutas[cIdx]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-graphite py-4">No hay rutas registradas para los camiones en la BD.</p>
          )}
        </div>
      )}
    </div>
  );
}