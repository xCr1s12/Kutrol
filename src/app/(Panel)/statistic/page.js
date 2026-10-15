import Clock from "@/components/dashboard/Clock";
import AnalisisAvanzado from "@/components/statistic/AnalisisAvanzado";
import AlertsSection from "@/components/dashboard/alertsDashboard";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/tokenSession";
import { obtenerMetricasDashboard } from "@/services/server/metricas.service";

export default async function StatisticPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const metricas = await obtenerMetricasDashboard(session.id_empresa);

  return (
    <main
      id="estadisticas-avanzadas"
      className="flex flex-col w-full bg-[#F4F5F7] p-6 min-h-screen"
    >
      {/* Encabezado limpio */}
      <header id="estadisticas-encabezado" className="mb-6">
        <h1 id="estadisticas-titulo" className="text-[#1A1A1A] text-2xl font-bold">
          Análisis Estadístico
        </h1>

        <p
          id="estadisticas-reloj"
          className="text-[#1A1A1A] text-sm mt-1 flex items-center gap-2"
        >
          <Clock className="w-4 h-4" role="timer" />
        </p>
      </header>

      {/* Bloques de Análisis Estadístico y Correlación */}
      <section id="estadisticas-bloque-analitico" className="w-full">
        <AnalisisAvanzado data={metricas} />
      </section>

      {/* Sección de Alertas */}
      <section id="estadisticas-alertas" className="mt-8" aria-label="Sección de alertas">
        <AlertsSection />
      </section>
    </main>
  );
}