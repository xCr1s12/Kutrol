"use client";
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
    <section
<<<<<<< HEAD
      className="light:bg-card dark:bg-card w-full rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col gap-y-4"
      aria-labelledby="alerts-title"
    >
      <h2 id="alerts-title" className="text-text font-bold text-lg mb-2 light:text-text dark:text-text">
=======
      className="w-full mt-10 bg-[#FDFBF7] rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] flex flex-col gap-y-4"
      aria-labelledby="alerts-title"
    >
      <h2 id="alerts-title" className="text-[#1A1A1A] font-bold text-lg mb-2">
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
        Alertas
      </h2>

      <ul className="flex flex-col gap-y-3 m-0 p-0 list-none">
        {AlertsData.map((alert) => (
          <li
            key={alert.id}
            className=" w-full rounded-2xl border-2 p-4 shadow-sm flex justify-between items-start light:bg-background light:border-border dark:bg-background dark:border-border"
          >
            <div className="flex flex-col gap-y-1 pr-4">
              <h3 className="text-text light:text-text dark:text-text font-bold text-sm">
                {alert.title}
              </h3>
              <p className="text-subtext light:text-subtext dark:text-subtext text-xs leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div
              className="  light:text-text hover:text-text p-1 rounded transition-colors cursor-pointer  dark:text-icon dark:hover:text-text">
              <DropMenu />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}