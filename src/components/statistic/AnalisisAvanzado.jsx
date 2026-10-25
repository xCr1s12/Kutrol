"use client";

import React, { useEffect, useState } from "react";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import BalanceRoundedIcon from "@mui/icons-material/BalanceRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function AnalisisAvanzado() {
  const [filtro_metrica, setFiltroMetrica] = useState("velocidad");
  const [datos_estadisticos, setDatosEstadisticos] = useState(null);
  const [cargando_datos, setCargandoDatos] = useState(true);
  const [error_estadisticas, setErrorEstadisticas] = useState("");

  useEffect(() => {
    const controlador_abortar = new AbortController();

    async function cargarEstadisticasDesdeNeon() {
      try {
        const respuesta_servidor = await fetch("/api/estadisticas", {
          cache: "no-store",
          signal: controlador_abortar.signal,
        });
        const resultado_json = await respuesta_servidor.json();

        if (!respuesta_servidor.ok || !resultado_json.success) {
          throw new Error(resultado_json.message || "No se pudieron obtener las estadísticas desde la base de datos.");
        }

        setDatosEstadisticos(resultado_json.data);
      } catch (error_capturado) {
        if (controlador_abortar.signal.aborted) return;
        setErrorEstadisticas(
          error_capturado instanceof Error
            ? error_capturado.message
            : "No se pudieron cargar las estadísticas.",
        );
      } finally {
        if (!controlador_abortar.signal.aborted) setCargandoDatos(false);
      }
    }

    cargarEstadisticasDesdeNeon();
    return () => controlador_abortar.abort();
  }, []);

  const formato_numero_chileno = new Intl.NumberFormat("es-CL");
  const formato_pesos_chilenos = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  
  const mostrar_metrica_en_pantalla = (valor_recibido, funcion_formato) => {
    if (cargando_datos) return "Cargando...";
    if (error_estadisticas) return "—";
    if (valor_recibido === null || valor_recibido === undefined || !Number.isFinite(Number(valor_recibido))) return "Sin datos";
    return funcion_formato(Number(valor_recibido));
  };

  const datos_dispersion = datos_estadisticos?.datosScatter || [];
  const diagnosticos_sistema = datos_estadisticos?.diagnosticos || [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {error_estadisticas && (
          <p role="alert" className="col-span-full text-sm text-red-600">
            Error al cargar las estadísticas: {error_estadisticas}
          </p>
        )}
        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Ralentí Innecesario</span>
            <AccessTimeRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">
            {mostrar_metrica_en_pantalla(datos_estadisticos?.ralentiInnecesarioPct, (valor) => `${formato_numero_chileno.format(valor)} %`)}
          </p>
          <p className="text-subtext mt-1 text-xs">Registros con motor encendido y vehículo detenido</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Coeficiente de Correlación</span>
            <ShowChartRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">
            {mostrar_metrica_en_pantalla(datos_estadisticos?.correlacionVelocidadRendimiento, (valor) => `${formato_numero_chileno.format(valor)} r`)}
          </p>
          <p className="text-subtext mt-1 text-xs">Velocidad media vs. rendimiento</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Desviación Estándar</span>
            <BalanceRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">
            {mostrar_metrica_en_pantalla(datos_estadisticos?.desviacionEstandarRendimiento, (valor) => `± ${formato_numero_chileno.format(valor)} Km/L`)}
          </p>
          <p className="text-subtext mt-1 text-xs">Variabilidad del rendimiento entre viajes</p>
        </div>

        <div className="bg-card text-text rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-subtext text-xs font-semibold">Proyección Gasto Mensual</span>
            <AssessmentRoundedIcon className="text-icon" fontSize="small" />
          </div>
          <p className="text-text text-2xl font-bold">
            {mostrar_metrica_en_pantalla(datos_estadisticos?.proyeccionGastoMensual, (valor) => formato_pesos_chilenos.format(valor))}
          </p>
          <p className="text-subtext mt-1 text-xs">Estimación basada en el gasto de los últimos 30 días</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card text-text lg:col-span-2 rounded-xl border border-border p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-text text-lg font-bold">Análisis de Dispersión y Correlación</h2>
              <p className="text-subtext text-xs">Evaluación del impacto de factores operativos sobre el rendimiento</p>
            </div>
            <div className="bg-background flex rounded-lg border border-border p-1">
              <button
                onClick={() => setFiltroMetrica("velocidad")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filtro_metrica === "velocidad" ? "bg-text text-background" : "text-subtext hover:text-text"}`}
              >
                Velocidad (Km/h)
              </button>
              <button
                onClick={() => setFiltroMetrica("carga")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filtro_metrica === "carga" ? "bg-text text-background" : "text-subtext hover:text-text"}`}
              >
                Carga (Toneladas)
              </button>
            </div>
          </div>

          <div className="bg-background rounded-lg border border-border p-4">
            <div className="text-subtext mb-3 grid grid-cols-[29fr_25fr_29fr_17fr] items-center gap-3 border-b border-border pb-2 text-xs font-bold">
              <span>Vehículo / Patente</span>
              <span>{filtro_metrica === "velocidad" ? "Velocidad Promedio" : "Carga Transportada"}</span>
              <span>Rendimiento Real</span>
              <span className="whitespace-nowrap text-right">Impacto Relativo</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {datos_dispersion.length > 0 ? (
                datos_dispersion.map((registro_camion, indice_registro) => {
                  const valor_variable_seleccionada = filtro_metrica === "velocidad" ? `${registro_camion.velocidad} Km/h` : `${registro_camion.carga} Ton`;
                  const es_consumo_ineficiente = Number(registro_camion.rendimiento) < 2.5;

                  return (
                    <div key={indice_registro} className="bg-card text-text grid grid-cols-[29fr_25fr_29fr_17fr] items-center gap-3 rounded-md border border-border p-3 text-xs">
                      <span className="text-text font-bold">{registro_camion.camion}</span>
                      <span className="text-subtext font-medium">{valor_variable_seleccionada}</span>
                      <span className="text-text font-semibold">{registro_camion.rendimiento} Km/L</span>
                      <span className={`justify-self-end whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-bold ${es_consumo_ineficiente ? "bg-accent text-background" : "bg-brand text-white"}`}>
                        {es_consumo_ineficiente ? "Alto Consumo" : "Eficiente"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-subtext py-4 text-center">No hay registros suficientes para este análisis.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card text-text flex flex-col justify-between rounded-xl border border-border p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-text mb-1 text-lg font-bold">Diagnóstico Algorítmico</h2>
            <p className="text-subtext mb-6 text-xs">Detección automática de anomalías operativas</p>
            <div className="flex flex-col gap-4">
              {diagnosticos_sistema.length > 0 ? (
                diagnosticos_sistema.map((diagnostico_actual, indice_diagnostico) => (
                  <div key={indice_diagnostico} className="bg-background rounded-lg border border-border p-3.5">
                    <span className="text-accent text-xs font-bold">{diagnostico_actual.titulo}</span>
                    <p className="text-text mt-1 text-xs leading-relaxed">{diagnostico_actual.descripcion}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-subtext italic">No se han detectado anomalías operativas recientes en la base de datos.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}