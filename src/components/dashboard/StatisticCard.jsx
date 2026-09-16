<<<<<<< HEAD
export default function StatisticCard({ Title, text, SubText, icon, ariaLabel }) {
  return (
    <div 
      className="flex flex-col border-2 border-border p-5 rounded-2xl shadow-sm bg-card text-text light:border-border light:bg-card light:text-text dark:border-border dark:bg-card dark:text-text"
      aria-label={ariaLabel}
    >
      <h3 className="font-semibold text-base">{Title}</h3>
      
      <div className="flex flex-row justify-between items-center my-1"> 
        <p className="font-bold text-2xl">{text}</p>
        {icon}
      </div>
      
      <p className="text-sm text-subtext light:text-subtext dark:text-subtext">{SubText}</p>
=======
"use client";

export default function StatisticCard({ Title, text, SubText, icon, aria }) {
  return (
    <div
      tabIndex={0}
      aria-label={aria}
      className="bg-[#FDFBF7] rounded-xl p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DA] flex flex-col justify-between hover:border-[#4A4A4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-[#4A4A4A] text-xs font-semibold tracking-wide uppercase">
          {Title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-[#F4F5F7] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-[#1A1A1A] text-2xl font-bold tracking-tight">
          {text}
        </h3>
        <p className="text-[#4A4A4A] text-xs mt-1 font-medium">
          {SubText}
        </p>
      </div>
>>>>>>> 8db7d62 (Creación Funcional de la pestaña dashboard)
    </div>
  );
}