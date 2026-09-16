export default function FormField({
  label,
  id,
  type = "text",
  placeholder,
  rows,
  maxLength,
  minLength,
  error,
}) {
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
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full bg-brand border border-border text-text placeholder-subtext rounded-md px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
