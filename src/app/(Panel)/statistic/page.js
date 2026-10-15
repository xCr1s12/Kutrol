<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Clock from "@/components/statistic/Clock";
=======
import Clock from "@/components/dashboard/Clock";
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
import Clock from "@/components/statistic/Clock";
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
import AnalisisAvanzado from "@/components/statistic/AnalisisAvanzado";
import AlertsSection from "@/components/dashboard/alertsDashboard";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/tokenSession";
import { obtenerMetricasDashboard } from "@/services/server/metricas.service";
<<<<<<< HEAD

export default async function StatisticPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const metricas = await obtenerMetricasDashboard(session.id_empresa);

  return (
    <div
      id="estadisticas-avanzadas"
      className="flex min-h-screen w-full flex-col bg-background p-6 text-text"
    >
      {/* Encabezado limpio */}
      <header id="estadisticas-encabezado" className="mb-6">
        <h1 id="estadisticas-titulo" className="text-text text-2xl font-bold">
          Análisis Estadístico
        </h1>

        <span
          id="estadisticas-reloj"
          className="text-subtext mt-1 flex items-center gap-2 text-sm"
        >
          <Clock className="w-4 h-4" role="timer" />
        </span>
      </header>

      {/* Bloques de Análisis Estadístico y Correlación */}
      <section id="estadisticas-bloque-analitico" className="w-full">
        <AnalisisAvanzado data={metricas} />
      </section>

      {/* Sección de Alertas */}
      <section id="estadisticas-alertas" className="mt-8" aria-label="Sección de alertas">
        <AlertsSection />
=======
"use client";
=======
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)

export default async function StatisticPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const metricas = await obtenerMetricasDashboard(session.id_empresa);

  return (
    <div
      id="estadisticas-avanzadas"
      className="flex min-h-screen w-full flex-col bg-background p-6 text-text"
    >
      {/* Encabezado limpio */}
      <header id="estadisticas-encabezado" className="mb-6">
        <h1 id="estadisticas-titulo" className="text-text text-2xl font-bold">
          Análisis Estadístico
        </h1>

        <span
          id="estadisticas-reloj"
          className="text-subtext mt-1 flex items-center gap-2 text-sm"
        >
          <Clock className="w-4 h-4" role="timer" />
        </span>
      </header>

      {/* Bloques de Análisis Estadístico y Correlación */}
      <section id="estadisticas-bloque-analitico" className="w-full">
        <AnalisisAvanzado data={metricas} />
      </section>

      {/* Sección de Alertas */}
      <section id="estadisticas-alertas" className="mt-8" aria-label="Sección de alertas">
        <AlertsSection />
      </section>
<<<<<<< HEAD
<<<<<<< HEAD

      {/* Alertas */}
      <section className="w-full mt-10" aria-label="Sección de alertas">
        <AlertsSection alertas={data?.alertas || []} />
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
      </section>
    </div>
=======
    </main>
>>>>>>> a6268ee (creación de mapa de calor en ambiente y modificación de pestaña estadística; se agrega algoritmos de correlación y análisis estadistico.)
=======
    </div>
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
  );
}