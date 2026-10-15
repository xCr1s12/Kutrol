"use client";

export default function AlertsSection({ alertas = [] }) {
  // Mapper para estilos visuales según el estado de la alerta
  const getBadgeStyle = (estado) => {
    switch (estado) {
      case "GENERADA":
<<<<<<< HEAD
<<<<<<< HEAD
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800";
      case "EN_REVISION":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800";
      case "RESUELTA":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800";
      default:
        return "bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600";
=======
        return "bg-amber-100 text-amber-800 border-amber-300";
=======
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800";
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
      case "EN_REVISION":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800";
      case "RESUELTA":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800";
      default:
<<<<<<< HEAD
        return "bg-stone-100 text-stone-700 border-stone-300";
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
        return "bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600";
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="bg-card w-full rounded-xl border border-border p-6 text-text shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-text text-lg font-bold">
            Alertas Operativas Recientes
          </h2>
          <p className="text-subtext text-xs">
            Anomalías y eventos detectados en la flota de transporte
          </p>
        </div>
        <span className="bg-text text-background rounded-full px-3 py-1 text-xs font-semibold">
=======
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA]">
=======
    <div className="bg-card w-full rounded-xl border border-border p-6 text-text shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-text text-lg font-bold">
            Alertas Operativas Recientes
          </h2>
          <p className="text-subtext text-xs">
            Anomalías y eventos detectados en la flota de transporte
          </p>
        </div>
<<<<<<< HEAD
        <span className="text-xs font-semibold bg-[#1A1A1A] text-[#FDFBF7] px-3 py-1 rounded-full">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
        <span className="bg-text text-background rounded-full px-3 py-1 text-xs font-semibold">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
          {alertas.length} Pendientes
        </span>
      </div>

      <div className="overflow-x-auto">
<<<<<<< HEAD
<<<<<<< HEAD
        <table className="text-text w-full text-left text-sm">
          <thead className="bg-background text-subtext border-b border-border text-xs uppercase">
=======
        <table className="w-full text-left text-sm text-[#1A1A1A]">
          <thead className="text-xs uppercase bg-[#F4F5F7] text-[#4A4A4A] border-b border-[#EAE5DA]">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
        <table className="text-text w-full text-left text-sm">
          <thead className="bg-background text-subtext border-b border-border text-xs uppercase">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
            <tr>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3">Conductor</th>
              <th scope="col" className="px-4 py-3">Mensaje</th>
              <th scope="col" className="px-4 py-3">Fecha</th>
              <th scope="col" className="px-4 py-3">Estado</th>
            </tr>
          </thead>
<<<<<<< HEAD
<<<<<<< HEAD
          <tbody className="divide-y divide-border">
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <tr key={alerta.id_alerta} className="hover:bg-background/70 transition-colors">
                  <td className="text-text px-4 py-3 font-semibold">
                    {alerta.tipo.replace("_", " ")}
                  </td>
                  <td className="text-subtext px-4 py-3">
                    {alerta.conductor_nombre || "Sin Asignar"}
                  </td>
                  <td className="text-subtext max-w-xs truncate px-4 py-3 text-xs">
                    {alerta.mensaje}
                  </td>
                  <td className="text-subtext whitespace-nowrap px-4 py-3 text-xs">
=======
          <tbody className="divide-y divide-[#EAE5DA]">
=======
          <tbody className="divide-y divide-border">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <tr key={alerta.id_alerta} className="hover:bg-background/70 transition-colors">
                  <td className="text-text px-4 py-3 font-semibold">
                    {alerta.tipo.replace("_", " ")}
                  </td>
                  <td className="text-subtext px-4 py-3">
                    {alerta.conductor_nombre || "Sin Asignar"}
                  </td>
                  <td className="text-subtext max-w-xs truncate px-4 py-3 text-xs">
                    {alerta.mensaje}
                  </td>
<<<<<<< HEAD
                  <td className="px-4 py-3 text-xs text-[#4A4A4A] whitespace-nowrap">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                  <td className="text-subtext whitespace-nowrap px-4 py-3 text-xs">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
                    {new Date(alerta.fecha_hora).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                        alerta.estado
                      )}`}
                    >
                      {alerta.estado.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
<<<<<<< HEAD
<<<<<<< HEAD
                <td colSpan={5} className="text-subtext px-4 py-6 text-center text-xs">
=======
                <td colSpan={5} className="px-4 py-6 text-center text-xs text-[#4A4A4A]">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
                <td colSpan={5} className="text-subtext px-4 py-6 text-center text-xs">
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
                  No hay alertas activas registradas en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}