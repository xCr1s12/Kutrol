export default function FormField({
  label,
  id,
  type = "text",
  placeholder,
  rows,
  maxLength,
  minLength,
  error,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  required,
>>>>>>> FrontEnd
=======
  required,
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
  children,
}) {
  if (children) {
    return (
      <div className="flex flex-col gap-1.5">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <label htmlFor={id} className="text-xs font-semibold text-brand">
=======
        <label htmlFor={id} className="text-xs font-semibold text-text dark:text-ink">
>>>>>>> FrontEnd
=======
        <label htmlFor={id} className="text-xs font-semibold text-text dark:text-[#1A1A1A]">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
        <label htmlFor={id} className="text-xs font-semibold text-text dark:text-ink">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
          {label}
        </label>
        {children}
      </div>
    );
  }

  const isTextarea = type === "textarea";
  const Tag = isTextarea ? "textarea" : "input";
  const inputProps = isTextarea ? { rows: rows ?? 3 } : { type };

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs text-subtext font-medium uppercase tracking-wider"
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
<<<<<<< HEAD
<<<<<<< HEAD
        className="w-full bg-background border border-icon text-text placeholder-subtext rounded-md px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
=======
        className="w-full bg-background border border-border text-text placeholder-subtext rounded-md px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
        className="w-full bg-background border border-icon text-text placeholder-subtext rounded-md px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
>>>>>>> e84c658 (fix(a11y): correct text, border and focus contrast)
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-accent-dark">
          {error}
        </p>
      )}
    </div>
  );
}
