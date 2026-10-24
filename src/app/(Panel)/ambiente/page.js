import Clock from "@/components/dashboard/Clock";
import MetricasAmbiente from "@/components/ambiente/MetricasAmbiente";
import MapaCalorAmbiente from "@/components/ambiente/MapaCalorAmbiente";
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
    <div
      id="ambiente-resumen"
      className="flex flex-col w-full bg-cloud dark:bg-background p-6 min-h-screen"
    >
      <header id="ambiente-encabezado" className="mb-6">
        <h1 id="ambiente-titulo" className="text-ink dark:text-text text-2xl font-bold">
          Ambiente y Sostenibilidad de {empresa?.nombre}
        </h1>

        <span
          id="ambiente-reloj"
          className="text-ink dark:text-text text-sm mt-1 flex items-center gap-2"
        >
          <Clock className="w-4 h-4" role="timer" />
        </span>
      </header>

      <section
        id="ambiente-metricas-kpi"
        aria-label="Métricas de sostenibilidad"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4"
      >
        <MetricasAmbiente />
      </section>

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

        <section
          id="ambiente-impacto-card"
          className="w-full h-full bg-cream rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] dark:border-0 border border-linen flex flex-col justify-between dark:bg-card"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PublicRoundedIcon className="text-icon" />
              <h2 className="text-ink font-bold text-lg dark:text-text">
                Impacto Ecológico
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center my-6">
              <div className="w-32 h-32 rounded-full bg-linen flex items-center justify-center border-4 border-ink">
                <ParkRoundedIcon className="text-ink w-14 h-14" />
              </div>
              <p className="mt-4 text-2xl font-bold text-ink dark:text-text">85%</p>
              <p className="text-xs text-graphite font-medium text-center dark:text-text">
                Cumplimiento Meta Verde
              </p>
            </div>

            <div className="w-full bg-linen h-3 rounded-full overflow-hidden mb-2">
              <div className="bg-gold h-full w-[85%]" />
            </div>

            <p className="text-xs text-graphite leading-relaxed mt-4 dark:text-text">
              Rendimiento y reducción de emisiones calculados a partir de los
              viajes y abastecimientos de combustible de la flota.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}