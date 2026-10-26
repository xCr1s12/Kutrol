import { useEffect, useState } from "react";
import { tarjeta, titulo, campo, botonAmarillo } from "./comun";

const categorias = {
  COMBUSTIBLE: "Combustible", MOTOR: "Motor", NEUMATICO: "Neumático",
  EMISION: "Emisión", ELECTRICO: "Eléctrico", CARGA: "Carga",
};

const columnas = ["Medición", "Umbral mínimo", "Umbral máximo", "Severidad", ""];

// los mismos 3 niveles que muestra la pagina de Alertas (alertas.service.js),
// guardados con su id de la tabla SEVERIDAD. "Desactivada" (INFORMATIVA) no genera alerta.
const severidades = [
  { id: 1, nombre: "Desactivada" },
  { id: 2, nombre: "Leve" },
  { id: 3, nombre: "Moderado" },
  { id: 5, nombre: "Crítico" },
];

// ALTA (4) se muestra como Crítico, igual que en la pagina de Alertas
function severidadVisible(id) {
  return Number(id) >= 4 ? 5 : Number(id);
}

// lo que se edita en el formulario: los umbrales como texto para poder dejarlos vacios
function aFormulario(tipo) {
  return {
    umbral_min: tipo.umbral_min ?? "",
    umbral_max: tipo.umbral_max ?? "",
    id_severidad: tipo.id_severidad,
  };
}

function mensajeError(cuerpo, porDefecto) {
  const detalle = Array.isArray(cuerpo?.error?.details) ? cuerpo.error.details[0]?.mensaje : null;
  return detalle ?? cuerpo?.error?.message ?? porDefecto;
}

export default function ConfigAlertas({ onAviso, puedeGestionar = false }) {
  const [tipos, setTipos] = useState([]);
  // cambios sin guardar, por id_tipo_medicion
  const [edicion, setEdicion] = useState({});
  const [guardando, setGuardando] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/data/config-alertas")
      .then((res) => (res.ok ? res.json() : null))
      .then((datos) => {
        setTipos(datos?.tipos ?? []);
      })
      .catch((error) => console.error("no se pudieron cargar las alertas", error))
      .finally(() => setCargando(false));
  }, []);

  function valores(tipo) {
    return edicion[tipo.id_tipo_medicion] ?? aFormulario(tipo);
  }

  function cambiar(tipo, dato, valor) {
    setEdicion({ ...edicion, [tipo.id_tipo_medicion]: { ...valores(tipo), [dato]: valor } });
  }

  function hayCambios(tipo) {
    const actual = edicion[tipo.id_tipo_medicion];
    return actual && JSON.stringify(actual) !== JSON.stringify(aFormulario(tipo));
  }

  async function guardar(tipo) {
    setGuardando(tipo.id_tipo_medicion);
    try {
      const respuesta = await fetch("/api/data/config-alertas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_tipo_medicion: tipo.id_tipo_medicion, ...valores(tipo) }),
      });
      const cuerpo = await respuesta.json().catch(() => null);
      if (!respuesta.ok) {
        onAviso?.(mensajeError(cuerpo, "No se pudo guardar la alerta"), "error");
        return;
      }
      setTipos(tipos.map((t) => (t.id_tipo_medicion === cuerpo.id_tipo_medicion ? cuerpo : t)));
      const resto = { ...edicion };
      delete resto[tipo.id_tipo_medicion];
      setEdicion(resto);
      onAviso?.("Alerta actualizada", "exito");
    } catch (error) {
      console.error("no se pudo guardar la alerta", error);
      onAviso?.("No se pudo guardar la alerta", "error");
    } finally {
      setGuardando(null);
    }
  }

  return (
    <section className={tarjeta} aria-label="Alertas">
      <h2 className={`${titulo} mb-1`}>Alertas</h2>
      <p className="text-sm text-subtext mb-4">
        Si una lectura queda bajo el mínimo o sobre el máximo se genera una alerta con la severidad
        elegida. Deja un umbral vacío para no usarlo, o elige &quot;Desactivada&quot; para no recibir esa alerta.
      </p>

      <div className="overflow-x-auto rounded-lg border border-border/60 bg-background/50">
        <table className="w-full text-xs text-left text-text border-collapse">
          <thead>
            <tr className="bg-background border-b border-border/60 text-subtext">
              {columnas.map((t, i) => (
                <th key={i} className="px-4 py-3 font-semibold">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {tipos.map((tipo) => {
              const v = valores(tipo);
              const cambiado = hayCambios(tipo);
              return (
                <tr key={tipo.id_tipo_medicion} className="hover:bg-background/80 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{tipo.nombre}</p>
                    <p className="text-[11px] text-subtext">
                      {categorias[tipo.categoria] ?? tipo.categoria} · {tipo.unidad}
                    </p>
                  </td>
                  {["umbral_min", "umbral_max"].map((dato) => (
                    <td key={dato} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="any"
                          className={`${campo} w-24`}
                          aria-label={`${dato === "umbral_min" ? "Umbral mínimo" : "Umbral máximo"} de ${tipo.nombre}`}
                          placeholder="Sin umbral"
                          value={v[dato]}
                          min={tipo.valor_min_fisico ?? undefined}
                          max={tipo.valor_max_fisico ?? undefined}
                          disabled={!puedeGestionar}
                          onChange={(e) => cambiar(tipo, dato, e.target.value)}
                        />
                        <span className="text-subtext">{tipo.unidad}</span>
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <select
                      className={campo}
                      aria-label={`Severidad de ${tipo.nombre}`}
                      value={severidadVisible(v.id_severidad)}
                      disabled={!puedeGestionar}
                      onChange={(e) => cambiar(tipo, "id_severidad", Number(e.target.value))}
                    >
                      {severidades.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {puedeGestionar && (
                      <button
                        className={`${botonAmarillo} text-xs px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed`}
                        disabled={!cambiado || guardando === tipo.id_tipo_medicion}
                        onClick={() => guardar(tipo)}
                      >
                        {guardando === tipo.id_tipo_medicion ? "Guardando..." : "Guardar"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {!tipos.length && (
              <tr>
                <td colSpan={columnas.length} className="px-4 py-6 text-center text-subtext">
                  {cargando ? "Cargando alertas..." : "No se encontraron tipos de medición"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
