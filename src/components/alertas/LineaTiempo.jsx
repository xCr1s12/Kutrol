import { haceCuanto } from "./fechas";

// las ultimas alertas en una linea vertical, la mas reciente arriba
export default function LineaTiempo({ alertas }) {
  return (
    <section
<<<<<<< HEAD
      className="bg-background rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] self-start"
      aria-label="Últimas alertas"
    >
      <ol className="relative flex flex-col gap-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 dark:before:bg-accent light:before:bg-accent">
=======
      className="bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] self-start"
      aria-label="Últimas alertas"
    >
      <ol className="relative flex flex-col gap-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
>>>>>>> 0c414e2 (pagina de alerta)
        {alertas.map((a, i) => (
          <li key={a.id} className="relative flex items-center justify-between gap-4 pl-7">
            <span
              className={`absolute left-0 w-4 h-4 rounded-full border-2 ${
<<<<<<< HEAD
                i === 0 ? "bg-accent border-accent" : "bg-white border-subtext"
              }`}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-text">{a.vehiculo}</span>
            <span className="text-xs font-semibold text-subtext shrink-0">{haceCuanto(a.fecha)}</span>
          </li>
        ))}
      </ol>
      {alertas.length === 0 && <p className="text-sm text-subtext">No hay alertas recientes</p>}
=======
                i === 0 ? "bg-accent border-accent" : "bg-white border-[#4A4A4A]"
              }`}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-[#1A1A1A]">{a.vehiculo}</span>
            <span className="text-xs font-semibold text-[#4A4A4A] shrink-0">{haceCuanto(a.fecha)}</span>
          </li>
        ))}
      </ol>
      {alertas.length === 0 && <p className="text-sm text-[#4A4A4A]">No hay alertas recientes</p>}
>>>>>>> 0c414e2 (pagina de alerta)
    </section>
  );
}
