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
    </div>
  );
}