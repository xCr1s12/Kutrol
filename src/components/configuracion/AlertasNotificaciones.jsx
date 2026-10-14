import { DeleteRounded } from "@mui/icons-material";
import { tarjeta, botonIcono, valores } from "./comun";
import { Interruptor, Lista, MenuEstado, AgregarAlerta } from "./Controles";

// alertas que se pueden agregar desde el menu, las dos ultimas son de ejemplo
const tiposAlerta = [
  { id: "consumo", nombre: "Consumo excesivo", unidad: "Km/L" },
  { id: "robo", nombre: "Robo", unidad: "L" },
  { id: "rendimiento", nombre: "Bajo rendimiento", unidad: "Km/L" },
  { id: "carga", nombre: "Carga sospechosa", unidad: "L" },
];

export default function AlertasNotificaciones({ alertas, cambiar }) {
  const disponibles = tiposAlerta.filter((t) => !alertas.some((a) => a.id === t.id));

  function agregarAlerta(tipo) {
    // parte con los mismos valores por defecto que las demas
    const nueva = { ...tipo, estado: "Moderado", activa: true, valor: 40, correo: true };
    cambiar("alertas", [...alertas, nueva]);
  }

  function eliminarAlerta(id) {
    cambiar("alertas", alertas.filter((a) => a.id !== id));
  }

  function cambiarAlerta(id, dato, valor) {
    cambiar("alertas", alertas.map((a) => (a.id === id ? { ...a, [dato]: valor } : a)));
  }

  return (
    <section className={tarjeta} aria-label="Alertas y notificaciones">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
        <h2 className="text-[#1A1A1A] font-bold text-lg">Alertas y notificaciones</h2>
        <AgregarAlerta disponibles={disponibles} onAgregar={agregarAlerta} />
      </div>
      {alertas.length === 0 && (
        <p className="py-6 text-center text-xs text-[#4A4A4A]">No hay alertas configuradas</p>
      )}
      {alertas.map((a) => (
        <div
          key={a.id}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_170px_130px_auto] items-center gap-3 md:gap-6 py-3 border-b border-[#E2E8F0] last:border-b-0"
        >
          <p className="text-sm font-semibold text-[#1A1A1A]">{a.nombre}</p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#4A4A4A]">Umbral</span>
            <Lista
              opciones={valores}
              aria-label={`Umbral de la alerta ${a.nombre}`}
              value={a.valor}
              disabled={!a.activa}
              onChange={(e) => cambiarAlerta(a.id, "valor", Number(e.target.value))}
            />
            <Lista
              opciones={["Km/L", "L"]}
              aria-label={`Unidad de la alerta ${a.nombre}`}
              value={a.unidad}
              disabled={!a.activa}
              onChange={(e) => cambiarAlerta(a.id, "unidad", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#4A4A4A]">Estado</span>
            <MenuEstado
              valor={a.estado}
              disabled={!a.activa}
              etiqueta={`Estado de la alerta ${a.nombre}`}
              onChange={(estado) => cambiarAlerta(a.id, "estado", estado)}
            />
          </div>

          <Interruptor
            activo={a.correo}
            disabled={!a.activa}
            onChange={(v) => cambiarAlerta(a.id, "correo", v)}
            etiqueta="Alerta al correo"
          />
          <Interruptor
            activo={a.activa}
            onChange={(v) => cambiarAlerta(a.id, "activa", v)}
            etiqueta="Activar alerta"
          />
          <button
            className={`${botonIcono} justify-self-start md:justify-self-end`}
            aria-label={`Eliminar la alerta ${a.nombre}`}
            onClick={() => eliminarAlerta(a.id)}
          >
            <DeleteRounded htmlColor="#C0392B" sx={{ fontSize: 14 }} aria-hidden="true" />
          </button>
        </div>
      ))}
    </section>
  );
}
