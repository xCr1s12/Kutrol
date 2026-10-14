export default function InfoCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`bg-white border border-[#EAE5DA] rounded-2xl p-6 flex flex-col shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EAE5DA]">
          {icon && (
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
              {icon}
            </span>
          )}
          <h3 className="font-semibold text-[#1A1A1A]">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}