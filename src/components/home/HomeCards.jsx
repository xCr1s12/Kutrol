export default function HomeCards({ title, description, icon }) {
  return (
    <div className="flex flex-col h-50 w-100 bg-card rounded-2xl p-7 max-w-full max-sm:w-full max-sm:h-auto max-sm:p-5">

      {/* fila superior: icono y titulo */}
      <div className="flex items-center gap-4 h-1/2 p-5 max-sm:p-3">
<<<<<<< HEAD
        <div className="font-bold flex h-12 w-12 items-center justify-center light:text-brand max-sm:h-10 max-sm:w-10">
=======
        <div className="font-bold flex h-12 w-12 items-center justify-center light:text-[#1B2B24] max-sm:h-10 max-sm:w-10">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-text max-sm:text-xl">{title}</h3>
      </div>

      {/* fila inferior: descripcion */}
      <div className="flex items-end justify-between h-1/2">
        <p className="font-semibold text-sm text-subtext justify-center">{description}</p>
      </div>
    </div>
  );
};