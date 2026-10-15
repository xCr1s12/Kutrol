import Clock from "@/components/dashboard/Clock";
import MetricasAmbiente from "@/components/ambiente/MetricasAmbiente";
import MapaCalorAmbiente from "@/components/ambiente/MapaCalorAmbiente";
import AlertsSection from "@/components/dashboard/alertsDashboard";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/tokenSession";
import { findByIdEmpresa } from "@/repositories/Empresa.repository";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";

export default async function AmbientePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const empresa = await findByIdEmpresa(session.id_empresa);

  return (
    <main
      id="ambiente-resumen"
      className="flex min-h-screen w-full flex-col bg-background p-6 text-text"
    >
      {/* Encabezado del panel */}
      <header id="ambiente-encabezado" className="mb-6">
        <h1 id="ambiente-titulo" className="text-2xl font-bold">
          Ambiente y Sostenibilidad de {empresa?.nombre}
        </h1>

        <p
          id="ambiente-reloj"
          className="mt-1 flex items-center gap-2 text-sm text-subtext"
        >
          <Clock className="w-4 h-4" role="timer" />
        </p>
      </header>

      {/* Tarjetas KPI de Métricas Ambientales */}
      <section
        id="ambiente-metricas-kpi"
        aria-label="Métricas de sostenibilidad"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4"
      >
        <MetricasAmbiente />
      </section>

      {/* Mapas de Calor de Emisiones y Sección de Impacto Ecológico */}
      <div
        id="ambiente-estadisticas"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4"
      >
        <section
          id="ambiente-mapa-calor"
          aria-label="Mapas de calor de emisiones e impacto ambiental"
          className="lg:col-span-2"
        >
          <MapaCalorAmbiente />
        </section>

        {/* Card resumen de Impacto Ecológico */}
        <section
          id="ambiente-impacto-card"
          className="flex h-full w-full flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PublicRoundedIcon className="text-icon" />
              <h2 className="text-lg font-bold">
                Impacto Ecológico
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center my-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-text bg-background">
                <ParkRoundedIcon className="h-14 w-14 text-text" />
              </div>
              <p className="mt-4 text-2xl font-bold">85%</p>
              <p className="text-center text-xs font-medium text-subtext">
                Cumplimiento Meta Verde
              </p>
            </div>

            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full w-[85%] bg-accent" />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-subtext">
              Rendimiento y reducción de emisiones calculados a partir de los
              viajes y abastecimientos de combustible de la flota.
            </p>
          </div>
        </section>
      </div>

      {/* Alertas */}
      <section id="ambiente-alertas" className="mt-6" aria-label="Sección de alertas">
        <AlertsSection />
      </section>
    </main>
  );
}