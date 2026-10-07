"use client";

import LineaTiempo from "@/components/alertas/LineaTiempo";
import TablaAlertas from "@/components/alertas/TablaAlertas";

// crea una fecha de hace unos dias, solo para los datos de prueba
function hace(dias, horas = 0) {
  return new Date(Date.now() - (dias * 24 + horas) * 60 * 60 * 1000);
}

// datos de prueba, despues se reemplazan por los del backend
const alertas = [
  { id: 1, vehiculo: "Camión A1", mensaje: "Alerta de anomalía de combustible", estado: "Crítico", fecha: hace(0) },
  { id: 2, vehiculo: "Camión A2", mensaje: "Alerta: Falla", estado: "Moderado", fecha: hace(1) },
  { id: 3, vehiculo: "Camión A3", mensaje: "Alerta: Falla", estado: "Crítico", fecha: hace(2) },
  { id: 4, vehiculo: "Camión A1", mensaje: "Alerta de anomalía de combustible", estado: "Leve", fecha: hace(2, 5) },
  { id: 5, vehiculo: "Camión A4", mensaje: "Consumo excesivo en ruta", estado: "Moderado", fecha: hace(9) },
  { id: 6, vehiculo: "Camión A2", mensaje: "Carga sospechosa de combustible", estado: "Crítico", fecha: hace(20) },
];

export default function Alertas() {
  // de la mas reciente a la mas antigua
  const ordenadas = [...alertas].sort((a, b) => b.fecha - a.fecha);

  return (
    <div className="flex flex-col w-full bg-card  p-6 gap-5 rounded-2xl">
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
