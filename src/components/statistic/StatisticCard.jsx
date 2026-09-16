"use client";

export default function StatisticCard({ Title, text, SubText, icon, aria }) {
  return (
    <div
      tabIndex={0}
      aria-label={aria}
<<<<<<< HEAD
      className="bg-card text-text flex flex-col justify-between rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-subtext text-xs font-semibold tracking-wide uppercase">
          {Title}
        </span>
        {icon && (
          <div className="bg-background text-icon flex items-center justify-center rounded-lg p-2">
=======
      className="bg-[#FDFBF7] rounded-xl p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA] flex flex-col justify-between hover:border-[#4A4A4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-[#4A4A4A] text-xs font-semibold tracking-wide uppercase">
          {Title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-[#F4F5F7] flex items-center justify-center">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
<<<<<<< HEAD
        <h3 className="text-text text-2xl font-bold tracking-tight">
          {text}
        </h3>
        <p className="text-subtext mt-1 text-xs font-medium">
=======
        <h3 className="text-[#1A1A1A] text-2xl font-bold tracking-tight">
          {text}
        </h3>
        <p className="text-[#4A4A4A] text-xs mt-1 font-medium">
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
          {SubText}
        </p>
      </div>
    </div>
  );
}