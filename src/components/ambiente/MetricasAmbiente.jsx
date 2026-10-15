"use client";

import { useEffect, useState } from "react";
import StatisticCard from "@/components/dashboard/StatisticCard";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";

export default function MetricasAmbiente() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetricas() {
      try {
        const res = await fetch("/api/ambiente/metricas");
        if (res.ok) {
          const json = await res.json();
          // Imprimir en consola para depuración
          console.log("Datos recibidos en Ambiente:", json);
          setData(json.data || json);
        }
      } catch (err) {
        console.error("Error al cargar métricas de ambiente:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMetricas();
  }, []);

  if (loading) {
    return (
      <div className="col-span-full py-8 text-center text-graphite animate-pulse font-medium">
        Cargando métricas de sostenibilidad...
      </div>
    );
  }

  // --- EXTRACCIÓN ROBUSTA DE LITROS DE COMBUSTIBLE Y RENDIMIENTO ---
  const rawLitros =
    data?.combustible?.litros_totales ??
    data?.combustible?.litros ??
    data?.litros_totales ??
    data?.litros ??
    0;

  const rawRendimiento =
    data?.rendimiento ??
    data?.rendimiento_promedio ??
    data?.kpi_rendimiento ??
    0;

  const litrosTotales = parseFloat(rawLitros) || 0;
  const rendimientoPromedio = parseFloat(rawRendimiento) || 0;

  // --- CÁLCULOS AMBIENTALES DINÁMICOS ---
  // Factor Diésel: 2.68 kg CO2 por litro
  const emisionesCO2Kg = Math.round(litrosTotales * 2.68);
  const emisionesCO2Ton = (emisionesCO2Kg / 1000).toFixed(2);

  // CO2 evitado por optimización (~12%)
  const co2EvitadoKg = Math.round(emisionesCO2Kg * 0.12);
  const arbolesEquivalentes = Math.round(co2EvitadoKg / 20);

  return (
    <>
      <StatisticCard
        Title="CO₂ Evitado Estimado"
        text={`${co2EvitadoKg.toLocaleString("es-CL")} kg`}
        SubText={`Equivale a ~${arbolesEquivalentes} árboles absorbentes/año`}
        icon={<ParkRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
        aria="Tarjeta de CO2 Evitado"
      />
      <StatisticCard
        Title="Emisiones Totales CO₂"
        text={`${emisionesCO2Ton} Ton`}
        SubText={`Huella por ${litrosTotales.toLocaleString("es-CL")} Litros cargados`}
        icon={<CloudRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
        aria="Tarjeta de Emisiones CO2"
      />
      <StatisticCard
        Title="Eficiencia Energética"
        text={`${rendimientoPromedio} Km/L`}
        SubText="Promedio global de rendimiento"
        icon={<LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
        aria="Tarjeta de Eficiencia Energética"
      />
    </>
  );
}