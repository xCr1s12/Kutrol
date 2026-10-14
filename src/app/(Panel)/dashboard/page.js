import Clock from "@/components/dashboard/Clock";
import MetricasDashboard from "@/components/dashboard/MetricasDashboard";
import ConsumoChart from "@/components/dashboard/Chart";
import AlertsSection from "@/components/dashboard/alertsDashboard";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/tokenSession";
import { findByIdEmpresa } from "@/repositories/Empresa.repository";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/login");
  const empresa = await findByIdEmpresa(session.id_empresa);
  return (
    <main
      id="dashboard-resumen"
      className="flex flex-col w-full bg-[#F4F5F7] p-6"
    >
      <header id="dashboard-encabezado" className="mb-6">
        <h1 id="dashboard-titulo" className="text-[#1A1A1A] text-2xl font-bold">
          Resumen de Rendimiento General de {empresa?.nombre}
        </h1>

        <p
          id="dashboard-reloj"
          className="text-[#1A1A1A] text-sm mt-1 flex items-center gap-2"
        >
          <Clock className="w-4 h-4" role="timer" />
        </p>
      </header>

      <section
        id="dashboard-metricas-kpi"
        aria-label="Métricas principales"
        className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4"
      >
        <MetricasDashboard />
      </section>

      <div
        id="dashboard-estadisticas"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4"
      >
        <section
          id="dashboard-grafico-consumo"
          aria-label="Gráfico de consumo de los últimos 30 días"
          className="lg:col-span-2"
        >
          <ConsumoChart />
        </section>

        <section
          id="dashboard-ranking-conductores"
          aria-labelledby="dashboard-ranking-titulo"
          className="w-full h-full bg-text rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col justify-between"
        >
          <div id="dashboard-ranking-contenido">
            <h2
              id="dashboard-ranking-titulo"
              className="text-[#1A1A1A] font-bold text-lg mb-1"
            >
              Ranking de conductores
            </h2>
            <p
              id="dashboard-ranking-descripcion"
              className="text-sm text-[#4A4A4A] mb-6"
            >
              Ranking de Conductores en Base a Combustible Utilizado
            </p>

            <div
              id="dashboard-ranking-columnas"
              aria-hidden="true"
              className="flex justify-between items-center text-sm font-semibold text-[#4A4A4A] pb-2 border-b border-[#EAE5DA] mb-4"
            >
              <span>Nombre</span>
              <span>Rendimiento</span>
            </div>

            <ol
              id="dashboard-ranking-lista"
              aria-describedby="dashboard-ranking-descripcion"
              className="flex flex-col gap-y-4 m-0 p-0 list-none"
            >
              <li className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-text"
                    aria-hidden="true"
                  >
                    JD
                  </span>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-sm font-semibold text-[#4A4A4A]">
                  40 km/L
                </span>
              </li>

              <li className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-xs font-bold text-text"
                    aria-hidden="true"
                  >
                    JD
                  </span>
                  <span className="font-medium text-[#1A1A1A]">Jhon Doe</span>
                </div>
                <span className="text-sm font-semibold text-[#4A4A4A]">
                  40 km/L
                </span>
              </li>
            </ol>
          </div>
        </section>
      </div>

      <section id="dashboard-alertas" aria-label="Sección de alertas">
        <AlertsSection />
      </section>
    </main>
  );
}