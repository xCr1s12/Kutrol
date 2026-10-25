"use client";

import { useState, useEffect } from "react";
import LineaTiempo from "@/components/alertas/LineaTiempo";
import TablaAlertas from "@/components/alertas/TablaAlertas";

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarAlertas() {
      try {
        const respuesta = await fetch("/api/alerts");
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las alertas");
        }
        const datos = await respuesta.json();

        const procesadas = datos.map((a) => ({
          ...a,
          fecha: new Date(a.fecha),
        }));

        setAlertas(procesadas);
      } catch (err) {
        console.error("Error cargando alertas:", err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarAlertas();
  }, []);

  const ordenadas = [...alertas].sort((a, b) => b.fecha - a.fecha);

  if (cargando) {
    return (
      <div className="flex flex-col w-full bg-card p-6 gap-5 rounded-2xl">
        <p className="text-text font-semibold">Cargando alertas desde la base de datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full bg-card p-6 gap-5 rounded-2xl">
        <p className="text-red-500 font-semibold">Ocurrió un problema: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-card p-6 gap-5 rounded-2xl">
      <header>
        <h1 className="text-text text-2xl font-bold">Registro de alertas</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <LineaTiempo alertas={ordenadas.slice(0, 5)} />
        <TablaAlertas alertas={ordenadas} />
      </div>
    </div>
  );
}