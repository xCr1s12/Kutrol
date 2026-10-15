"use client";

export default function StatisticCard({ Title, text, SubText, icon, aria }) {
  return (
    <div
      tabIndex={0}
      aria-label={aria}
      className="bg-card text-text flex flex-col justify-between rounded-xl border border-border p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-subtext text-xs font-semibold tracking-wide uppercase">
          {Title}
        </span>
        {icon && (
          <div className="bg-background text-icon flex items-center justify-center rounded-lg p-2">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-text text-2xl font-bold tracking-tight">
          {text}
        </h3>
        <p className="text-subtext mt-1 text-xs font-medium">
          {SubText}
        </p>
      </div>
    </div>
  );
}