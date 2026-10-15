export const Card = ({ children }) => (
  <section className="flex h-110 shrink-0 flex-col rounded-2xl border border-icon bg-card px-5 pb-4 pt-5 shadow-sm p-10">
    {children}
  </section>
);

export const PillButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-text transition-colors hover:bg-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent light:hover:bg-border light:hover:text-text  dark:bg-brand  dark:hover:bg-[#314139] dark:focus-visible:outline-[#D4AF37]"
  >
    {children}
  </button>
);

export const Th = ({ children }) => (
  <th className="px-3.75 py-3 text-left text-base font-semibold text-text">
    {children}
  </th>
);

export const Td = ({ children, style }) => (
  <td
    className="h-7 px-3.75 py-1 text-left align-middle text-base text-text"
    style={style}
  >
    {children}
  </td>
);

export const FilaTabla = ({ children }) => (
  <tr
  className="border-y-2 border-border"
  >
    {children}
  </tr>
);

export const Estado = ({ estado, estados }) => {
  const { label, color } = estados[estado] ?? { label: estado, color: "var(--text)" };
  return <span className="text-text">{label}</span>;
};

export const VerHistorial = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="underline underline-offset-2 hover:opacity-80 text-accent"
  >
    Ver Historial
  </button>
);

export const Tabla = ({ columnas, anchos, children }) => (
  <div className="overflow-x-auto">
    <table className="w-5/6 bg-background border-2  border-border rounded-3xl min-w-160 table-fixed ">
      <colgroup>
        {anchos.map((ancho, index) => (
          <col key={index} style={{ width: `${ancho}%` }} />
        ))}
      </colgroup>
      <thead className="bg-background   ">
        <tr >
          {columnas.map((columna) => (
            <Th key={columna}>{columna}</Th>
          ))}
        </tr>
      </thead>
      <tbody className="before:block before:h-2 before:content-[''] ">{children}</tbody>
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
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-[#D4AF37] ${
              activo
                ? "border-transparent bg-accent font-bold text-text dark:bg-accent"
                : "bg-background text-text hover:bg-text light:hover:bg-border light:hover:text-text border-border dark:bg-brand  dark:hover:bg-[#314139]"
            }`}
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
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50 dark:border-[#C2C9C4] dark:bg-brand dark:text-[#A8B0AB]"
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
              ? "border-transparent bg-accent text-brand dark:bg-[#D4AF37] dark:text-brand"
              : "border-icon bg-background text-subtext dark:border-[#C2C9C4] dark:bg-brand dark:text-[#A8B0AB]"
          }`}
        >
          {numero}
        </button>
      ))}
      <button
        type="button"
        aria-label="Página siguiente"
        disabled={pagina === totalPaginas}
        onClick={() => onCambiarPagina(pagina + 1)}
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50 dark:border-[#C2C9C4] dark:bg-brand dark:text-[#A8B0AB]"
      >
        ›
      </button>
    </nav>
  </div>
);