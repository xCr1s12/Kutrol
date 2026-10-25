"use client";

import React, { useEffect, useState } from "react";
import AnalisisAvanzado from "@/components/statistic/AnalisisAvanzado";

export default function StatisticPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEstadisticas() {
      try {
        const response = await fetch("/api/estadisticas", {
          cache: "no-store",
        });
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Error al obtener las estadísticas desde la base de datos");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEstadisticas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-text text-sm font-medium">
        Cargando estadísticas en tiempo real desde la base de datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-accent text-sm font-medium">
        Error al cargar los datos: {error}
      </div>
    );
  }

  return <AnalisisAvanzado data={data} />;
}