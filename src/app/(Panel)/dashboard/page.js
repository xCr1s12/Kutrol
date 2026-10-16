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
    <div
      id="dashboard-resumen"
      className="flex w-full flex-col bg-background p-6 light:bg-background dark:bg-background"
    >
      <header id="dashboard-encabezado" className="mb-6">
        <h1
          id="dashboard-titulo"
          className="text-text text-2xl font-bold light:text-text dark:text-text"
        >
          Resumen de Rendimiento General de {empresa?.nombre}
        </h1>

        <p
          id="dashboard-reloj"
          className="text-subtext mt-1 flex items-center gap-2 text-sm light:text-subtext dark:text-subtext"
          aria-label="Hora y fecha actual del sistema"
        >
          <Clock className="h-4 w-4" role="timer" />
        </p>
      </header>

      <section
        id="dashboard-metricas-kpi"
        aria-label="Métricas principales"
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-4"
      >
        <MetricasDashboard />
      </section>

      <div
        id="dashboard-estadisticas"
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3"
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
          className="light:bg-card dark:bg-card flex h-full w-full flex-col justify-between rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]"
        >
          <div id="dashboard-ranking-contenido">
            <h2
              id="dashboard-ranking-titulo"
              className="text-text mb-1 text-lg font-bold light:text-text dark:text-text"
            >
              Ranking de conductores
            </h2>
            <p
              id="dashboard-ranking-descripcion"
              className="text-subtext mb-6 text-sm light:text-subtext dark:text-subtext"
            >
              Ranking de Conductores en Base a Combustible Utilizado
            </p>

            <div
              id="dashboard-ranking-columnas"
              aria-hidden="true"
              className="text-subtext mb-4 flex items-center justify-between border-b border-border pb-2 text-sm font-semibold"
            >
              <span>Nombre</span>
              <span>Rendimiento</span>
            </div>

            <ol
              id="dashboard-ranking-lista"
              aria-describedby="dashboard-ranking-descripcion"
              className="m-0 flex list-none flex-col gap-y-4 p-0"
            >
              {[1, 2].map((driver) => (
                <li
                  key={driver}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-moss text-xs font-bold text-cream"
                      aria-hidden="true"
                    >
                      PM
                    </span>
                    <span className="text-text font-medium light:text-text dark:text-text">
                      Pedro Muñoz
                    </span>
                  </div>
                  <span className="text-subtext text-sm font-semibold light:text-subtext dark:text-subtext">
                    40 km/L
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section id="dashboard-alertas" aria-label="Sección de alertas" className="mt-4">
        <AlertsSection />
      </section>
    </div>
  );
}
