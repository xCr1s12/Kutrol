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
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======

>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
  return (
    <main
      id="dashboard-resumen"
      className="flex w-full flex-col bg-background p-6 light:bg-background dark:bg-background"
    >
      <header id="dashboard-encabezado" className="mb-6">
<<<<<<< HEAD
        <h1 id="dashboard-titulo" className="text-[#1A1A1A] text-2xl font-bold">
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
        <h1
          id="dashboard-titulo"
          className="text-text text-2xl font-bold light:text-text dark:text-text"
        >
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
          Resumen de Rendimiento General de {empresa?.nombre}
        </h1>

        <p
          id="dashboard-reloj"
<<<<<<< HEAD
<<<<<<< HEAD
          className="text-subtext mt-1 flex items-center gap-2 text-sm light:text-subtext dark:text-subtext"
          aria-label="Hora y fecha actual del sistema"
        >
          <Clock className="h-4 w-4" role="timer" />
=======
          className="text-[#1A1A1A] text-sm mt-1 flex items-center gap-2"
        >
          <Clock className="w-4 h-4" role="timer" />
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
          className="text-subtext mt-1 flex items-center gap-2 text-sm light:text-subtext dark:text-subtext"
          aria-label="Hora y fecha actual del sistema"
        >
          <Clock className="h-4 w-4" role="timer" />
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        </p>
      </header>

      <section
        id="dashboard-metricas-kpi"
        aria-label="Métricas principales"
<<<<<<< HEAD
<<<<<<< HEAD
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-4"
=======
        className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-4"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
      >
        <MetricasDashboard />
      </section>

      <div
        id="dashboard-estadisticas"
<<<<<<< HEAD
<<<<<<< HEAD
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3"
=======
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
        className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
<<<<<<< HEAD
<<<<<<< HEAD
          className="light:bg-card dark:bg-card flex h-full w-full flex-col justify-between rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]"
=======
          className="w-full h-full bg-text rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col justify-between"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
          className="light:bg-card dark:bg-card flex h-full w-full flex-col justify-between rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        >
          <div id="dashboard-ranking-contenido">
            <h2
              id="dashboard-ranking-titulo"
<<<<<<< HEAD
<<<<<<< HEAD
              className="text-text mb-1 text-lg font-bold light:text-text dark:text-text"
=======
              className="text-[#1A1A1A] font-bold text-lg mb-1"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
              className="text-text mb-1 text-lg font-bold light:text-text dark:text-text"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            >
              Ranking de conductores
            </h2>
            <p
              id="dashboard-ranking-descripcion"
<<<<<<< HEAD
<<<<<<< HEAD
              className="text-subtext mb-6 text-sm light:text-subtext dark:text-subtext"
=======
              className="text-sm text-[#4A4A4A] mb-6"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
              className="text-subtext mb-6 text-sm light:text-subtext dark:text-subtext"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            >
              Ranking de Conductores en Base a Combustible Utilizado
            </p>

            <div
              id="dashboard-ranking-columnas"
              aria-hidden="true"
<<<<<<< HEAD
<<<<<<< HEAD
              className="text-subtext mb-4 flex items-center justify-between border-b border-border pb-2 text-sm font-semibold"
=======
              className="flex justify-between items-center text-sm font-semibold text-[#4A4A4A] pb-2 border-b border-[#EAE5DA] mb-4"
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
              className="text-subtext mb-4 flex items-center justify-between border-b border-border pb-2 text-sm font-semibold"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            >
              <span>Nombre</span>
              <span>Rendimiento</span>
            </div>

            <ol
              id="dashboard-ranking-lista"
              aria-describedby="dashboard-ranking-descripcion"
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
              className="flex flex-col gap-y-4 m-0 p-0 list-none"
=======
              className="m-0 flex list-none flex-col gap-y-4 p-0"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            >
              {[1, 2].map((driver) => (
                <li
                  key={driver}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#314139] text-xs font-bold text-[#FDFBF7]"
=======
>>>>>>> 2295efd (fix(ui): correct spelling and add landmarks and page headings)
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
<<<<<<< HEAD
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
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
                </li>
              ))}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
            </ol>
          </div>
        </section>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      <section id="dashboard-alertas" aria-label="Sección de alertas" className="mt-4">
=======
      <section id="dashboard-alertas" aria-label="Sección de alertas">
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
      <section id="dashboard-alertas" aria-label="Sección de alertas" className="mt-4">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
        <AlertsSection />
      </section>
    </div>
  );
}
