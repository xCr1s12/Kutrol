"use client";

import React, { useState, useEffect } from "react";
import StatisticCard from "@/components/dashboard/StatisticCard";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";

export default function MetricasAmbiente() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetricas() {
      try {
        const res = await fetch("/api/ambiente/mapa-calor");
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
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
        Cargando métricas de sostenibilidad desde la base de datos...
      </div>
    );
  }

  const litrosTotales = Number(data?.litros_totales || 0);
  const rendimientoPromedio = Number(data?.km_por_litro || 0).toFixed(2);
  const emisionesCO2Kg = Math.round(litrosTotales * 2.68);
  const emisionesCO2Ton = (emisionesCO2Kg / 1000).toFixed(2);
  const co2EvitadoKg = Math.round(emisionesCO2Kg * 0.12);
  const arbolesEquivalentes = Math.round(co2EvitadoKg / 20);

  return (
    <>
      <StatisticCard
        Title="CO₂ Evitado Estimado"
        text={`${co2EvitadoKg.toLocaleString("es-CL")} kg`}
        SubText={`Equivale a ~${arbolesEquivalentes} árboles absorbentes/año`}
        icon={<ParkRoundedIcon className="text-icon" aria-hidden="true" />}
        aria="Tarjeta de CO2 Evitado"
      />
      <StatisticCard
        Title="Emisiones Totales CO₂"
        text={`${emisionesCO2Ton} Ton`}
        SubText={`Huella por ${litrosTotales.toLocaleString("es-CL")} Litros cargados`}
        icon={<CloudRoundedIcon className="text-icon" aria-hidden="true" />}
        aria="Tarjeta de Emisiones CO2"
      />
      <StatisticCard
        Title="Eficiencia Energética"
        text={`${rendimientoPromedio} Km/L`}
        SubText="Promedio global de rendimiento"
        icon={<LocalGasStationRoundedIcon className="text-icon" aria-hidden="true" />}
        aria="Tarjeta de Eficiencia Energética"
      />
    </>
  );
}