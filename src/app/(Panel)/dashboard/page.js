import Clock from "@/components/dashboard/Clock";
import StatisticCard from "@/components/dashboard/StatisticCard";
import ConsumoChart from "@/components/dashboard/Chart";
import AlertsSection from "@/components/dashboard/alertsDashboard";
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';


// Para Fase de Desarrollo
// Contenido de la section Tarjetas KPI
const CardsData = [
  {
    Title: "Vehículos",
    text: "Activos: 10/40",
    SubText: "Listado de Vehículos",
    icon: <LocalShippingRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
    ariaLabel: "Tarjeta de vehículos: Activos 10 de 40",
  },
  {
    Title: "Gasto Total Vehicular",
    text: "CLP 1.000.000",
    SubText: "Costos De combustible",
    icon: <MonetizationOnRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
    ariaLabel: "Tarjeta de gasto total vehicular: 1.000.000 pesos chilenos",
  },
  {
    Title: "Combustible Utilizado",
    text: "1.000.000 L",
    SubText: "Combustible total utilizado",
    icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
    ariaLabel: "Tarjeta de combustible utilizado: 1.000.000 litros",
  },
  {
    Title: "KPI",
    text: "6.7 Km/L",
    SubText: "Rendimiento Km/L",
    icon: <LocalGasStationRoundedIcon htmlColor="#4A4A4A" aria-hidden="true" />,
    ariaLabel: "Tarjeta de rendimiento KPI: 6.7 kilómetros por litro",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full bg-[#F4F5F7] p-6">
      {/* Encabezado de página */}
      <header className="mb-6">
        <h1 className="text-[#1A1A1A] text-2xl font-bold">
          Resumen de Rendimiento General
        </h1>
 
        <div 
          className="text-[#1A1A1A] text-sm mt-1 flex items-center gap-2" 
          aria-label="Hora y fecha actual del sistema"
        >
          <Clock className="w-4 h-4" role="timer" />
        </div>
      </header>

      {/* Contenedor Tarjetas KPI */}
      <section aria-label="Métricas principales" className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4">
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

        {/* Ranking de conductores */}
        <aside className="w-full h-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <h2 className="text-[#1A1A1A] font-bold text-lg mb-1">
              Ranking de conductores
            </h2>
            <p className="text-sm text-[#4A4A4A] mb-6">
              Ranking de Conductores en Base a Combustible Utilizado
            </p>

            {/* Encabezado de la lista */}
            <div className="flex justify-between items-center text-sm font-semibold text-[#4A4A4A] pb-2 border-b border-[#EAE5DA] mb-4">
              <span>Nombre</span>
              <span>Rendimiento</span>
            </div>

            <ul className="flex flex-col gap-y-4 m-0 p-0 list-none">
              <li className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  
                  <div 
                    className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-[#FDFBF7]"
                    aria-hidden="true"
                  >
                    JD
                  </div>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-sm font-semibold text-[#4A4A4A]">
                  40 km/L
                </span>
              </li>

              <li className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-[#FDFBF7]"
                    aria-hidden="true"
                  >
                    JD
                  </div>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-sm font-semibold text-[#4A4A4A]">
                  40 km/L
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Alertas */}
      <section className="w-full mt-10" aria-label="Sección de alertas">
        <AlertsSection />
      </section>
    </div>
  );
}