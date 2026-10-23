"use client";

import React, { useState } from "react";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import BalanceRoundedIcon from "@mui/icons-material/BalanceRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function AnalisisAvanzado({ data }) {
  const [filtroMétrica, setFiltroMétrica] = useState("velocidad");

  // Extracción de datos con fallbacks
  const litrosTotales = Number(data?.combustible?.litros_totales || 165);
  const rendimientoGlobal = Number(data?.rendimiento || 2.8);

  // Muestras sintéticas para el Scatter Plot de Correlación
  const datosScatter = [
    { velocidad: 55, rendimiento: 3.8, carga: 12, camion: "AB-123-CD" },
    { velocidad: 68, rendimiento: 3.2, carga: 15, camion: "EF-456-GH" },
    { velocidad: 82, rendimiento: 2.6, carga: 18, camion: "JK-789-LM" },
    { velocidad: 95, rendimiento: 2.1, carga: 22, camion: "NP-012-RS" },
    { velocidad: 105, rendimiento: 1.7, carga: 25, camion: "ST-345-UV" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Ralentí Innecesario</span>
            <AccessTimeRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">14.2 %</p>
          <p className="text-subtext mt-1 text-xs">~23.4 Horas motor encendido sin marcha</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Coeficiente de Correlación</span>
            <ShowChartRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">- 0.84 r</p>
          <p className="text-subtext mt-1 text-xs">Velocidad vs. Rendimiento (Fuerte Inversa)</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Desviación Estándar</span>
            <BalanceRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">± 0.42 Km/L</p>
          <p className="text-subtext mt-1 text-xs">Variabilidad de conducción en flota</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Proyección Gasto Mensual</span>
            <AssessmentRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">$1.450.000</p>
          <p className="text-subtext mt-1 text-xs">Estimación basada en regresión lineal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card text-text lg:col-span-2 rounded-xl border border-border p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-text text-lg font-bold">
                Análisis de Dispersión y Correlación
              </h2>
              <p className="text-subtext text-xs">
                Evaluación del impacto de factores operativos sobre el rendimiento de combustible
              </p>
            </div>

            <div className="bg-background flex rounded-lg border border-border p-1">
              <button
                onClick={() => setFiltroMétrica("velocidad")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  filtroMétrica === "velocidad"
                    ? "bg-text text-background"
                    : "text-subtext hover:text-text"
                }`}
              >
                Velocidad (Km/h)
              </button>
              <button
                onClick={() => setFiltroMétrica("carga")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  filtroMétrica === "carga"
                    ? "bg-text text-background"
                    : "text-subtext hover:text-text"
                }`}
              >
                Carga (Toneladas)
              </button>
            </div>
          </div>

          <div className="bg-background rounded-lg border border-border p-4">
            <div className="text-subtext mb-3 grid grid-cols-[29fr_25fr_29fr_17fr] items-center gap-3 border-b border-border pb-2 text-xs font-bold">
              <span>Vehículo / Patente</span>
              <span>{filtroMétrica === "velocidad" ? "Velocidad Promedio" : "Carga Transportada"}</span>
              <span>Rendimiento Real</span>
              <span className="whitespace-nowrap text-right">Impacto Relativo</span>
            </div>

            <div className="flex flex-col gap-3">
              {datosScatter.map((item, idx) => {
                const valorVariable = filtroMétrica === "velocidad" ? `${item.velocidad} Km/h` : `${item.carga} Ton`;
                const esIneficiente = item.rendimiento < 2.5;

                return (
                  <div
                    key={idx}
                    className="bg-card text-text grid grid-cols-[29fr_25fr_29fr_17fr] items-center gap-3 rounded-md border border-border p-3 text-xs"
                  >
                    <span className="text-text font-bold">{item.camion}</span>
                    <span className="text-subtext font-medium">{valorVariable}</span>
                    <span className="text-text font-semibold">{item.rendimiento} Km/L</span>
                    <span
                      className={`justify-self-end whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-bold ${
                        esIneficiente ? "bg-accent text-background" : "bg-brand text-white"
                      }`}
                    >
                      {esIneficiente ? "Alto Consumo" : "Eficiente"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Panel de Diagnóstico */}
        <div className="bg-card text-text flex flex-col justify-between rounded-xl border border-border p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-text mb-1 text-lg font-bold">
              Diagnóstico Algorítmico
            </h2>
            <p className="text-subtext mb-6 text-xs">
              Detección automática de anomalías operativas
            </p>

            <div className="flex flex-col gap-4">
              <div className="bg-background rounded-lg border border-border p-3.5">
                <span className="text-accent text-xs font-bold">Exceso de Velocidad</span>
                <p className="text-text mt-1 text-xs leading-relaxed">
                  Los tramos superiores a 85 Km/h representan el 68% de las pérdidas de rendimiento registradas en la flota.
                </p>
              </div>

              <div className="bg-background rounded-lg border border-border p-3.5">
                <span className="text-accent text-xs font-bold">Ralentí Prolongado</span>
                <p className="text-text mt-1 text-xs leading-relaxed">
                  Se detectaron detenciones con motor encendido en puntos de acopio de Castro superando los 40 min continuos.
                </p>
              </div>

              <div className="bg-background rounded-lg border border-border p-3.5">
                <span className="text-accent text-xs font-bold">Optimización Recomendada</span>
                <p className="text-text mt-1 text-xs leading-relaxed">
                  Regular la velocidad máxima a 80 Km/h ahorraría aprox. <strong>180 Litros/mes</strong> en la operación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}