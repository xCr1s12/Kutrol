export default function Card({ className = '', children }) {
  return (
    <div
      className={`bg-brand border border-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </div>
  );
}