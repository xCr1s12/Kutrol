import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Listitem({ items, onSelect, selectedId }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-subtext">No hay datos disponibles.</p>;
  }

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {items.map((item) => {
        const active = item.id === selectedId;
        const count = item.viajes ? item.viajes.length : 0;

        return (
          <li key={item.id}>
            <button
              onClick={() => onSelect && onSelect(item)}
              className={`group flex w-full items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all
                ${active
                  ? "bg-accent/10 border-accent shadow-sm light:bg-accent/10 dark:bg-accent/10"
                  : "bg-card border-border hover:border-accent/60 hover:shadow-sm light:bg-card dark:bg-card"}`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0
                  ${active
                    ? "bg-accent text-brand light:bg-accent light:text-brand dark:bg-accent dark:text-brand"
                    : "bg-border text-icon light:bg-border light:text-text dark:bg-border dark:text-icon"}`}
              >
                <FmdGoodIcon fontSize="small" />
              </span>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-text truncate">{item.nombre}</h2>
                <span className="text-xs text-subtext">Ruta {item.id}</span>
              </div>

              <span className="text-xs font-medium px-2 py-1 rounded-full bg-border text-subtext whitespace-nowrap light:bg-border light:text-subtext dark:bg-border dark:text-subtext">
                {count} {count === 1 ? "viaje" : "viajes"}
              </span>

              <ChevronRightIcon
                fontSize="small"
                className={`transition-transform ${
                  active
                    ? "text-accent light:text-accent dark:text-accent"
                    : "text-icon group-hover:translate-x-0.5 light:text-icon dark:text-icon"
                }`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}