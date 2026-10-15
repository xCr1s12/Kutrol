"use client";

import Clock from "@/components/dashboard/Clock";
import StatisticCard from "@/components/dashboard/StatisticCard";

import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";

export default function AmbientePage() {
  return (
    <div className="flex flex-col w-full bg-[#F4F5F7] p-6 min-h-screen">
      {/* Encabezado */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[#1A1A1A] text-2xl font-bold">
            Ambiente y Sostenibilidad
          </h1>
          <div className="text-[#4A4A4A] text-sm mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Monitoreo de impacto ecológico y huella de carbono</span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#1A1A1A] text-[#FDFBF7] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#4A4A4A] transition-colors self-start md:self-auto"
        >
          <DownloadRoundedIcon className="w-4 h-4" />
          <span>Exportar Informe</span>
        </button>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel Izquierdo: Impacto Ecológico */}
        <section className="bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PublicRoundedIcon className="text-[#4A4A4A]" />
              <h2 className="text-[#1A1A1A] font-bold text-lg">Impacto Ecológico</h2>
            </div>

            {/* Ilustración / Gráfico Indicador */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="w-36 h-36 rounded-full bg-[#EAE5DA] flex items-center justify-center border-4 border-[#1A1A1A]">
                <ParkRoundedIcon className="text-[#1A1A1A] w-16 h-16" />
              </div>
              <p className="mt-4 text-2xl font-bold text-[#1A1A1A]">85%</p>
              <p className="text-xs text-[#4A4A4A]">Cumplimiento Meta Verde</p>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-[#EAE5DA] h-3 rounded-full overflow-hidden mb-4">
              <div className="bg-[#D4AF37] h-full w-[85%]" />
            </div>

            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              La flota ha reducido significativamente las emisiones contaminantes gracias a la optimización de rutas de transporte.
            </p>
          </div>
        </section>

        {/* Panel Derecho: Huella de Carbono y Sostenibilidad */}
        <section className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA]">
            <h2 className="text-[#1A1A1A] font-bold text-lg mb-1">
              Huella de Carbono y Sostenibilidad
            </h2>
            <p className="text-sm text-[#4A4A4A] mb-6">
              Indicadores clave de consumo y emisiones de la flota
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatisticCard
                Title="CO₂ Evitado"
                text="1.000.000 kg"
                SubText="Equivalente a 500 árboles conservados"
                icon={<ParkRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
                aria="Tarjeta de CO2 Evitado"
              />
              <StatisticCard
                Title="Emisiones CO₂ Totales"
                text="1.000.000 kg"
                SubText="Generación directa de la flota"
                icon={<CloudRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
                aria="Tarjeta de Emisiones CO2"
              />
              <StatisticCard
                Title="Eficiencia Energética"
                text="1.000.000 Km/L"
                SubText="Rendimiento promedio global"
                icon={<LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />}
                aria="Tarjeta de Eficiencia Energética"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}