export default function InfoCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-[#EAE5DA] rounded-xl p-6 flex-1 min-w-[220px] ${className}`}
    >
      {children}
    </div>
  );
}