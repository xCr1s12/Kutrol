"use client";

const CAMPO =
  "h-11 w-full rounded-[10px] border border-border bg-background px-3.5 text-sm text-text outline-none placeholder:text-subtext/60 focus:border-accent";

export default function MultiField({
  label,
  name,
  type = "text",
  placeholder,
  addLabel,
  values,
  setValues,
  error,
  campo,
}) {
  const actualizar = (indice, valor) =>
    setValues(values.map((actual, posicion) => (posicion === indice ? valor : actual)));

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={`${name}-0`} className="text-xs font-medium text-subtext">
          {label}
        </label>
      )}
      {values.map((valor, indice) => (
        <div key={indice} className="relative">
          <input
            id={`${name}-${indice}`}
            name={name}
            aria-label={`${campo ?? label ?? "Campo"} ${indice + 1}`}
            type={type}
            required={indice === 0}
            value={valor}
            onChange={(evento) => actualizar(indice, evento.target.value)}
            placeholder={placeholder}
            className={`${CAMPO} ${indice > 0 ? "pr-10" : ""}`}
          />
          {indice > 0 && (
            <button
              type="button"
              onClick={() => setValues(values.filter((_, posicion) => posicion !== indice))}
              aria-label={`Quitar ${(campo ?? label ?? "campo").toLowerCase()} ${indice + 1}`}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext hover:text-text"
            >
              ×
            </button>
          )}
        </div>
      ))}
      {error && <p className="text-xs text-accent-dark">{error}</p>}
      <button
        type="button"
        onClick={() => setValues([...values, ""])}
        className="self-start text-xs font-medium text-accent hover:underline"
      >
        {addLabel}
      </button>
    </div>
  );
}
