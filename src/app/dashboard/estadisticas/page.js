"use client";

import { useEffect, useState } from "react";
import Clock from "@/components/dashboard/Clock";
import StatisticCard from "@/components/dashboard/StatisticCard";
import ConsumoChart from "@/components/dashboard/Chart";
import AlertsSection from "@/components/dashboard/alertsDashboard";

import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos desde la API Route
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/estadisticas");
        const json = await res.json();

        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || "Error al cargar los datos");
        }
      } catch (err) {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-[#F4F5F7]">
        <p className="text-[#4A4A4A] font-semibold animate-pulse">
          Cargando datos del sistema Kutrol...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-[#F4F5F7]">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  // Formateador para moneda CLP
  const formatCLP = (monto) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(monto);

  // Preparar datos dinámicos de las Tarjetas KPI
  const CardsData = [
    {
      Title: "Vehículos Operativos",
      text: `Activos: ${data?.vehiculos?.en_ruta || 0}/${data?.vehiculos?.total || 0}`,
      SubText: `Mantenimiento: ${data?.vehiculos?.mantencion || 0} | Disponibles: ${data?.vehiculos?.disponibles || 0}`,
      icon: <LocalShippingRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
      ariaLabel: "Tarjeta de flota de vehículos",
    },
    {
      Title: "Gasto Total Vehicular",
      text: formatCLP(data?.combustible?.gasto_total || 0),
      SubText: "Costos de combustible acumulados",
      icon: <MonetizationOnRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
      ariaLabel: "Tarjeta de gasto total",
    },
    {
      Title: "Combustible Utilizado",
      text: `${Number(data?.combustible?.litros_totales || 0).toLocaleString("es-CL")} L`,
      SubText: "Volumen total cargado",
      icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
      ariaLabel: "Tarjeta de combustible utilizado",
    },
    {
      Title: "KPI Rendimiento",
      text: `${data?.rendimiento || 0} Km/L`,
      SubText: "Promedio global de la flota",
      icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
      ariaLabel: "Tarjeta de rendimiento promedio en kilómetros por litro",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#F4F5F7] p-6 min-h-screen">
      {/* Encabezado */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[#1A1A1A] text-2xl font-bold">
            Resumen de Rendimiento General
          </h1>
          <div
            className="text-[#1A1A1A] text-sm mt-1 flex items-center gap-2"
            aria-label="Hora y fecha actual del sistema"
          >
            <Clock className="w-4 h-4" role="timer" />
          </div>
        </div>

        {/* Acciones */}
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#1A1A1A] text-[#FDFBF7] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#4A4A4A] transition-colors self-start md:self-auto"
        >
          <DownloadRoundedIcon className="w-4 h-4" />
          <span>Exportar Vista</span>
        </button>
      </header>

      {/* Contenedor Tarjetas KPI */}
      <section aria-label="Métricas principales" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
        {CardsData.map((card, index) => (
          <StatisticCard
            key={index}
            Title={card.Title}
            text={card.text}
            SubText={card.SubText}
            icon={card.icon}
            aria={card.ariaLabel}
          />
        ))}
      </section>

      {/* Estadística y Ranking */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4">
        {/* Gráfico para estadística */}
        <div
          className="lg:col-span-2"
          role="region"
          aria-label="Gráfico de consumo de los últimos 30 días"
        >
          <ConsumoChart />
        </div>

        {/* Ranking de conductores dinámico */}
        <aside className="w-full h-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#EAE5DA]">
          <div>
            <h2 className="text-[#1A1A1A] font-bold text-lg mb-1">
              Ranking de Conductores
            </h2>
            <p className="text-sm text-[#4A4A4A] mb-6">
              Mayor eficiencia basada en registros de viaje
            </p>

            <div className="flex justify-between items-center text-sm font-semibold text-[#4A4A4A] pb-2 border-b border-[#EAE5DA] mb-4">
              <span>Nombre</span>
              <span>Rendimiento</span>
            </div>

            <ul className="flex flex-col gap-y-4 m-0 p-0 list-none">
              {data?.ranking && data.ranking.length > 0 ? (
                data.ranking.map((driver) => {
                  const iniciales = driver.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <li key={driver.id_conductor} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-[#FDFBF7]"
                          aria-hidden="true"
                        >
                          {iniciales}
                        </div>
                        <span className="font-medium text-[#1A1A1A]">{driver.nombre}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#4A4A4A]">
                        {driver.rendimiento_kml} Km/L
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="text-xs text-[#4A4A4A]">No hay registros de viajes completados</li>
              )}
            </ul>
          </div>
        </aside>
      </section>

      {/* Alertas */}
      <section className="w-full mt-10" aria-label="Sección de alertas">
        <AlertsSection alertas={data?.alertas || []} />
      </section>
    </div>
  );
}