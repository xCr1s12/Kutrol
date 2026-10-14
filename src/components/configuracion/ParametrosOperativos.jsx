import { LocalGasStationRounded, NatureRounded } from "@mui/icons-material";
import { tarjeta, titulo, valores } from "./comun";
import { Lista } from "./Controles";

const emisiones = [500, 1000, 1500, 2000];

// fila con icono, titulo y los selects que van como children
function Parametro({ Icono, titulo, texto, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#E2E8F0] last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="w-12 h-12 shrink-0 rounded-full bg-brand flex items-center justify-center">
          <Icono className="text-accent" sx={{ fontSize: 26 }} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#1A1A1A]">{titulo}</p>
          <p className="text-xs text-[#4A4A4A]">{texto}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function ParametrosOperativos({ config, cambiar }) {
  return (
    <section className={tarjeta} aria-label="Parámetros operativos">
      <h2 className={titulo}>Parámetros operativos</h2>
      <p className="text-sm text-[#4A4A4A] mb-2">
        Define los valores base para calcular desvíos de combustible y metas de huella de carbono.
      </p>

      <Parametro
        Icono={LocalGasStationRounded}
        titulo="Rendimiento esperado"
        texto="Rendimiento que debería tener la flota"
      >
        <div className="flex gap-2">
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
        </div>
      </Parametro>

      <Parametro Icono={NatureRounded} titulo="Emisiones esperadas" texto="Meta de emisiones de la flota">
        <Lista
          opciones={emisiones}
          aria-label="Emisiones esperadas"
          value={config.emisiones}
          onChange={(e) => cambiar("emisiones", Number(e.target.value))}
        />
      </Parametro>
    </section>
  );
}