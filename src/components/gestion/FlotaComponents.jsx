<<<<<<< HEAD
export const GOLD = "var(--color-accent)";

export const Card = ({ children }) => (
  <section className="flex h-110 shrink-0 flex-col rounded-2xl border border-icon bg-background px-5 pb-4 pt-5 shadow-sm p-10">
=======
export const Card = ({ children }) => (
  <section className="flex h-110 shrink-0 flex-col rounded-2xl border border-icon bg-card px-5 pb-4 pt-5 shadow-sm p-10">
>>>>>>> FrontEnd
    {children}
  </section>
);

export const PillButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
<<<<<<< HEAD
    className="rounded-full border border-icon bg-background px-3.5 py-1.5 text-xs text-brand transition-colors hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
=======
    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-text transition-colors hover:bg-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent light:hover:bg-border light:hover:text-text  dark:bg-brand  dark:hover:bg-moss dark:focus-visible:outline-gold"
>>>>>>> FrontEnd
  >
    {children}
  </button>
);

export const Th = ({ children }) => (
<<<<<<< HEAD
  <th className="px-3.75 py-3 text-left text-base font-semibold text-brand">
=======
  <th className="px-3.75 py-3 text-left text-base font-semibold text-text">
>>>>>>> FrontEnd
    {children}
  </th>
);

export const Td = ({ children, style }) => (
  <td
<<<<<<< HEAD
    className="h-7 px-3.75 py-1 text-left align-middle text-base text-brand"
=======
    className="h-7 px-3.75 py-1 text-left align-middle text-base text-text"
>>>>>>> FrontEnd
    style={style}
  >
    {children}
  </td>
);

export const FilaTabla = ({ children }) => (
  <tr
<<<<<<< HEAD
    style={{
      backgroundImage:
        "linear-gradient(var(--color-icon), var(--color-icon))",
      backgroundPosition: "15px 100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "calc(90% - 15px) 1px",
    }}
=======
  className="border-y-2 border-border"
>>>>>>> FrontEnd
  >
    {children}
  </tr>
);

export const Estado = ({ estado, estados }) => {
<<<<<<< HEAD
  const { label, color } = estados[estado] ?? { label: estado, color: "var(--color-brand)" };
  return <span style={{ color }}>{label}</span>;
=======
  const { label, color } = estados[estado] ?? { label: estado, color: "var(--text)" };
  return <span className="text-text">{label}</span>;
>>>>>>> FrontEnd
};

export const VerHistorial = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
<<<<<<< HEAD
    className="underline underline-offset-2 hover:opacity-80"
    style={{ color: GOLD }}
=======
    className="underline underline-offset-2 hover:opacity-80 text-accent"
>>>>>>> FrontEnd
  >
    Ver Historial
  </button>
);

export const Tabla = ({ columnas, anchos, children }) => (
  <div className="overflow-x-auto">
<<<<<<< HEAD
    <table className="w-full min-w-160 table-fixed border-collapse">
=======
    <table className="w-5/6 bg-background border-2  border-border rounded-3xl min-w-160 table-fixed ">
>>>>>>> FrontEnd
      <colgroup>
        {anchos.map((ancho, index) => (
          <col key={index} style={{ width: `${ancho}%` }} />
        ))}
      </colgroup>
<<<<<<< HEAD
      <thead>
        <tr className="bg-background">
=======
      <thead className="bg-background   ">
        <tr >
>>>>>>> FrontEnd
          {columnas.map((columna) => (
            <Th key={columna}>{columna}</Th>
          ))}
        </tr>
      </thead>
<<<<<<< HEAD
      <tbody className="before:block before:h-2 before:content-['']">{children}</tbody>
=======
      <tbody className="before:block before:h-2 before:content-[''] ">{children}</tbody>
>>>>>>> FrontEnd
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
<<<<<<< HEAD
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activo
                ? "border-transparent font-bold text-brand"
                : "border-icon bg-background text-brand hover:bg-text"
            }`}
            style={activo ? { backgroundColor: GOLD } : undefined}
=======
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-gold ${
              activo
                ? "border-transparent bg-accent font-bold text-white dark:bg-accent dark:text-brand"
                : "bg-background text-text hover:bg-text light:hover:bg-border light:hover:text-text border-border dark:bg-brand  dark:hover:bg-moss"
            }`}
>>>>>>> FrontEnd
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
<<<<<<< HEAD
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50"
=======
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50 dark:border-mist dark:bg-brand dark:text-sage"
>>>>>>> FrontEnd
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
<<<<<<< HEAD
              ? "border-transparent text-brand"
              : "border-icon bg-background text-subtext"
          }`}
          style={numero === pagina ? { backgroundColor: GOLD } : undefined}
=======
              ? "border-transparent bg-accent text-brand light:text-white dark:bg-gold dark:text-brand"
              : "border-icon bg-background text-subtext dark:border-mist dark:bg-brand dark:text-sage"
          }`}
>>>>>>> FrontEnd
        >
          {numero}
        </button>
      ))}
      <button
        type="button"
        aria-label="Página siguiente"
        disabled={pagina === totalPaginas}
        onClick={() => onCambiarPagina(pagina + 1)}
<<<<<<< HEAD
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50"
=======
        className="h-6 w-6 rounded-md border border-icon bg-background text-xs text-subtext disabled:opacity-50 dark:border-mist dark:bg-brand dark:text-sage"
>>>>>>> FrontEnd
      >
        ›
      </button>
    </nav>
  </div>
<<<<<<< HEAD
);
=======
);
>>>>>>> FrontEnd
