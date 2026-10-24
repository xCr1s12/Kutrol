import { LocalGasStationRounded, NatureRounded } from "@mui/icons-material";
import { tarjeta, titulo, valores } from "./comun";
import { Lista } from "./Controles";

const emisiones = [500, 1000, 1500, 2000];

// Fila con icono, título, descripción y controles en una tarjeta delimitada
function Parametro({ Icono, titulo, texto, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background/50 transition-colors hover:border-border">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 shrink-0 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
          <Icono className="text-text" sx={{ fontSize: 22 }} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold text-text">{titulo}</p>
          <p className="text-xs text-subtext">{texto}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {children}
      </div>
    </div>
  );
}

export default function ParametrosOperativos({ config, cambiar }) {
  return (
    <section className={tarjeta} aria-label="Parámetros operativos">
      <div className="mb-5">
        <h2 className={titulo}>Parámetros operativos</h2>
        <p className="text-xs text-subtext mt-1">
          Define los valores base para calcular desvíos de combustible y metas de huella de carbono.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Parametro
          Icono={LocalGasStationRounded}
          titulo="Rendimiento esperado"
          texto="Rendimiento que debería tener la flota"
        >
          <Lista
            opciones={valores}
            aria-label="Rendimiento esperado"
            value={config.rendimiento}
            onChange={(e) => cambiar("rendimiento", Number(e.target.value))}
          />
          <Lista
            opciones={["Km/L", "L/100Km"]}
            aria-label="Unidad del rendimiento"
            value={config.unidadRendimiento}
            onChange={(e) => cambiar("unidadRendimiento", e.target.value)}
          />
        </Parametro>

        <Parametro
          Icono={NatureRounded}
          titulo="Emisiones esperadas"
          texto="Meta de emisiones de la flota"
        >
          <Lista
            opciones={emisiones}
            aria-label="Emisiones esperadas"
            value={config.emisiones}
            onChange={(e) => cambiar("emisiones", Number(e.target.value))}
          />
        </Parametro>
      </div>
    </section>
  );
}