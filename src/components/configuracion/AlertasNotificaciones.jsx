import { DeleteRounded } from "@mui/icons-material";
import { tarjeta, titulo, botonIcono, valores } from "./comun";
import { Interruptor, Lista, MenuEstado, AgregarAlerta } from "./Controles";

// Alertas que se pueden agregar desde el menú
const tiposAlerta = [
  { id: "consumo", nombre: "Consumo excesivo", unidad: "Km/L" },
  { id: "robo", nombre: "Robo", unidad: "L" },
  { id: "rendimiento", nombre: "Bajo rendimiento", unidad: "Km/L" },
  { id: "carga", nombre: "Carga sospechosa", unidad: "L" },
];

export default function AlertasNotificaciones({ alertas, cambiar }) {
  const disponibles = tiposAlerta.filter((t) => !alertas.some((a) => a.id === t.id));

  function agregarAlerta(tipo) {
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
      {/* Encabezado con botón de agregar */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h2 className={titulo}>Alertas y notificaciones</h2>
        <AgregarAlerta disponibles={disponibles} onAgregar={agregarAlerta} />
      </div>

      {alertas.length === 0 && (
        <div className="p-8 text-center text-xs text-subtext border border-dashed border-border/60 rounded-xl bg-background/30">
          No hay alertas configuradas actualmente.
        </div>
      )}

      {/* Lista de tarjetas de alerta */}
      <div className="flex flex-col gap-3">
        {alertas.map((a) => (
          <div
            key={a.id}
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background/50 transition-all ${
              !a.activa ? "opacity-60 bg-background/20" : "hover:border-border"
            }`}
          >
            {/* 1. Nombre de la alerta */}
            <div className="min-w-40">
              <p className="text-sm font-bold text-text">{a.nombre}</p>
            </div>

            {/* 2. Umbral y Unidades */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-subtext font-medium">Umbral:</span>
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

            {/* 3. Menú de Estado */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-subtext font-medium">Estado:</span>
              <MenuEstado
                valor={a.estado}
                disabled={!a.activa}
                etiqueta={`Estado de la alerta ${a.nombre}`}
                onChange={(estado) => cambiarAlerta(a.id, "estado", estado)}
              />
            </div>

            {/* 4. Interruptores y Botón de Eliminar */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-border/40">
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
                className={`${botonIcono} hover:bg-danger/10 text-danger transition-colors`}
                aria-label={`Eliminar la alerta ${a.nombre}`}
                onClick={() => eliminarAlerta(a.id)}
              >
                <DeleteRounded sx={{ fontSize: 18 }} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}