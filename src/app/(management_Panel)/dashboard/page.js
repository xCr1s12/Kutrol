import Clock from "@/components/dashboard/Clock";
import StatisticCard from "@/components/dashboard/StatisticCard";
import ConsumoChart from "@/components/dashboard/Chart";
import AlertsSection from "@/components/dashboard/alertsDashboard";

{
  /* Para fase de desarrollo 
    Informacion de los Card de estadistica
 */
}

const CardsData = [
  {
    Title: "Vehiculos",
    text: "Activos: 10/40",
    SubText: "Listado de Vehiculos",
    icon: "T",
  },
  {
    Title: "Gasto Total Vehicular",
    text: "CLP 1.000.000",
    SubText: "Costos De combustible",
    icon: "T",
  },
  {
    Title: "Combustible Utilizado",
    text: "1.000.000 L",
    SubText: "Combustible total utilizado",
    icon: "T",
  },
  {Title: "KPI ", text: "6.7 Km/L", SubText: "Rendimiento Km/L", icon: "T"},
];

export default function Dashboard() {
  return (
    <div
      className="flex flex-col w-full   bg-[#F4F5F7] p-6"
      lang="es"
    >
      {/* Encabezado de pagina  */}
      <div className="mb-6">
        <h1 className="text-[#1A1A1A] text-2xl font-bold">
          Resumen de Rendimiento General
        </h1>
        
        <p className="text-[#6E6E6E] text-sm mt-1 flex items-center gap-2">
          <Clock className="w-4 h-4" /> 26 de Oct de 2026 | 20:00 PM
        </p>
      </div>

      {/* Contenedor Principal  */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4">
        {/* Tarjetas KPI */}
        {CardsData.map((card, index) => {
          return (
            <StatisticCard
              key={index}
              Title={card.Title}
              text={card.text}
              SubText={card.SubText}
              icon={card.icon}
            />
          );
        })}
      </section>

      {/* Estadistica y Ranking */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4">
        
        {/* Grafico para estadistica */}
        <div className="lg:col-span-2">
          <ConsumoChart/>
        </div>
        

        {/* Ranking De conductores */}
        <div className="w-full h-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col justify-between"> 
          <div>
            <h2 className="text-[#1A1A1A] font-bold text-lg mb-1">Ranking de conductores</h2>
            <p className="text-xs text-[#6E6E6E] mb-6">
              Ranking de Conductores en Base a Combustible Utilizado
            </p>

            {/* Encabezado de la tabla/lista */}
            <div className="flex justify-between items-center text-xs font-semibold text-[#6E6E6E] pb-2 border-b border-gray-100 mb-4">
              <p>Nombre</p>
              <p>Rendimiento</p>
            </div>

            {/* Lista de conductores (Ejemplo de filas) */}
            <div className="flex flex-col gap-y-4">
              {/* Fila 1 */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-gray-600">
                    JD
                  </div>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-xs font-semibold text-[#6E6E6E]">40 km/L</span>
              </div>

              {/* Fila 2 */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-gray-600">
                    JD
                  </div>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-xs font-semibold text-[#6E6E6E]">40 km/L</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* Aleras */}
      <section className="w-full mt-10">
        <AlertsSection />
      </section>

    </div>
  );
}
