export const GOLD = "var(--color-accent)";

export const Card = ({ children }) => (
  <section className="flex h-110 shrink-0 flex-col rounded-2xl border border-icon bg-background px-5 pb-4 pt-5 shadow-sm p-10">
    {children}
  </section>
);

export const PillButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full border border-icon bg-background px-3.5 py-1.5 text-xs text-brand transition-colors hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
  >
    {children}
  </button>
);

export const Th = ({ children }) => (
  <th className="px-3.75 py-3 text-left text-base font-semibold text-brand">
    {children}
  </th>
);

export const Td = ({ children, style }) => (
  <td
    className="h-7 px-3.75 py-1 text-left align-middle text-base text-brand"
    style={style}
  >
    {children}
  </td>
);

export const FilaTabla = ({ children }) => (
  <tr
    style={{
      backgroundImage:
        "linear-gradient(var(--color-icon), var(--color-icon))",
      backgroundPosition: "15px 100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "calc(90% - 15px) 1px",
    }}
  >
    {children}
  </tr>
);

export const Estado = ({ estado, estados }) => {
  const { label, color } = estados[estado] ?? { label: estado, color: "var(--color-brand)" };
  return <span style={{ color }}>{label}</span>;
};

export const VerHistorial = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="underline underline-offset-2 hover:opacity-80"
    style={{ color: GOLD }}
  >
    Ver Historial
  </button>
);

export const Tabla = ({ columnas, anchos, children }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-160 table-fixed border-collapse">
      <colgroup>
        {anchos.map((ancho, index) => (
          <col key={index} style={{ width: `${ancho}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr className="bg-background">
          {columnas.map((columna) => (
            <Th key={columna}>{columna}</Th>
          ))}
        </tr>
      </thead>
      <tbody className="before:block before:h-2 before:content-['']">{children}</tbody>
    </table>
  </div>
);

export const Filtros = ({ opciones, seleccionado, onSelect }) => (
  <ul className="flex flex-row gap-2">
    {opciones.map((opcion) => {
      const activo = seleccionado === opcion;
      return (
        <li key={opcion}>
          <button
            type="button"
            aria-pressed={activo}
            onClick={() => onSelect(opcion)}
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activo
                ? "border-transparent font-bold text-brand"
                : "border-icon bg-background text-subtext hover:bg-text"
            }`}
            style={activo ? { backgroundColor: GOLD } : undefined}
          >
            {opcion}
          </button>
        </li>
      );
    })}
  </ul>
);

export const Paginacion = ({ pagina, totalPaginas, onCambiarPagina }) => (
  <div className="mt-auto flex items-center justify-between px-3.75 pt-2">
    <span className="text-xs text-subtext">
      Mostrando Pag {pagina} de {totalPaginas}
    </span>
    <nav aria-label="Paginación" className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={pagina === 1}
        onClick={() => onCambiarPagina(pagina - 1)}
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50"
      >
        ‹
      </button>
      {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
        <button
          key={numero}
          type="button"
          aria-current={numero === pagina ? "page" : undefined}
          onClick={() => onCambiarPagina(numero)}
          className={`h-6 w-6 rounded-md border text-xs font-bold ${
            numero === pagina
              ? "border-transparent text-brand"
              : "border-icon bg-background text-subtext"
          }`}
          style={numero === pagina ? { backgroundColor: GOLD } : undefined}
        >
          {numero}
        </button>
      ))}
      <button
        type="button"
        aria-label="Página siguiente"
        disabled={pagina === totalPaginas}
        onClick={() => onCambiarPagina(pagina + 1)}
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50"
      >
        ›
      </button>
    </nav>
  </div>
);
