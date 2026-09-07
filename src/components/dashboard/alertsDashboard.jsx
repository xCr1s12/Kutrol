import MoreVertIcon from "@mui/icons-material/MoreVert";

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

            <button className="text-[#A8B0AB] hover:text-[#1A1A1A] p-1 rounded transition-colors cursor-pointer">
              <MoreVertIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}