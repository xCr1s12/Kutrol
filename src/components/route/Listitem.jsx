import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Listitem({ items, onSelect, selectedId }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-[#6E6E6E]">No hay datos disponibles.</p>;
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
                  ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-sm"
                  : "bg-white border-[#EAE5DA] hover:border-[#D4AF37]/60 hover:shadow-sm"}`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0
                  ${active ? "bg-[#D4AF37] text-white" : "bg-[#D4AF37]/15 text-[#D4AF37]"}`}
              >
                <FmdGoodIcon fontSize="small" />
              </span>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-[#1A1A1A] truncate">{item.nombre}</h2>
                <span className="text-xs text-[#6E6E6E]">Ruta {item.id}</span>
              </div>

              <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F3EFE6] text-[#1A1A1A] whitespace-nowrap">
                {count} {count === 1 ? "viaje" : "viajes"}
              </span>

              <ChevronRightIcon
                fontSize="small"
                className={`transition-transform ${active ? "text-[#D4AF37]" : "text-[#6E6E6E] group-hover:translate-x-0.5"}`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}