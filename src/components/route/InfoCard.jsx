export default function InfoCard({ title, icon, action, children, className = "" }) {
  return (
    <div
      className={`light:bg-background dark:bg-background dark:border-border border light:border-border rounded-2xl p-6 flex flex-col shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b light:border-border dark:border-border">
          <div className="flex min-w-0 items-center gap-2">
            {icon && (
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-icon/15 text-icon">
                {icon}
              </span>
            )}
            <h3 className="font-semibold dark:text-text light:text-text">{title}</h3>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}