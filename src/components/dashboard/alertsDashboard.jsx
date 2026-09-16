"use client";
<<<<<<< HEAD

export default function AlertsSection({ alertas = [] }) {
  // Mapper para estilos visuales según el estado de la alerta
  const getBadgeStyle = (estado) => {
    switch (estado) {
      case "GENERADA":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "EN_REVISION":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "RESUELTA":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-stone-100 text-stone-700 border-stone-300";
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[#1A1A1A] font-bold text-lg">
            Alertas Operativas Recientes
          </h2>
          <p className="text-xs text-[#4A4A4A]">
            Anomalías y eventos detectados en la flota de transporte
          </p>
        </div>
        <span className="text-xs font-semibold bg-[#1A1A1A] text-[#FDFBF7] px-3 py-1 rounded-full">
          {alertas.length} Pendientes
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#1A1A1A]">
          <thead className="text-xs uppercase bg-[#F4F5F7] text-[#4A4A4A] border-b border-[#EAE5DA]">
            <tr>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3">Conductor</th>
              <th scope="col" className="px-4 py-3">Mensaje</th>
              <th scope="col" className="px-4 py-3">Fecha</th>
              <th scope="col" className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE5DA]">
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <tr key={alerta.id_alerta} className="hover:bg-[#F4F5F7]/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#1A1A1A]">
                    {alerta.tipo.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-[#4A4A4A]">
                    {alerta.conductor_nombre || "Sin Asignar"}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#4A4A4A] max-w-xs truncate">
                    {alerta.mensaje}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#4A4A4A] whitespace-nowrap">
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
                <td colSpan={5} className="px-4 py-6 text-center text-xs text-[#4A4A4A]">
                  No hay alertas activas registradas en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
=======
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropMenu from "../ui/DropMenu";

// Datos de prueba para las alertas
const AlertsData = [
  {
    id: 1,
    title: "Alerta Consumo Anormal",
    description:
      "Se ha detectado un consumo superior al promedio registrado en la ruta Norte. Verifique el estado del vehículo y la presión de neumáticos.",
  },
  {
    id: 2,
    title: "Alerta Consumo Anormal",
    description:
      "El vehículo ID-204 presentó una variación inhabitual durante el turno de la tarde. Se sugiere revisión técnica preventiva.",
  },
];

export default function AlertsSection() {
  return (
    <div className="w-full bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col gap-y-4">
      <h2 className="text-[#1A1A1A] font-bold text-lg mb-2">Alertas</h2>

      <div className="flex flex-col gap-y-3">
        {AlertsData.map((alert) => (
          <div
            key={alert.id}
            className="w-full bg-[#F9F9FB] border border-gray-100 rounded-2xl p-4 shadow-sm flex justify-between items-start"
          >
            <div className="flex flex-col gap-y-1 pr-4">
              <h3 className="text-[#1A1A1A] font-bold text-sm">
                {alert.title}
              </h3>
              <p className="text-[#6E6E6E] text-xs leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div
              className="text-[#A8B0AB] hover:text-[#1A1A1A] p-1 rounded transition-colors cursor-pointer">
              <DropMenu />
            </div>
          </div>
        ))}
>>>>>>> FrontEnd
      </div>
    </div>
  );
}