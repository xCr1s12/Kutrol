import { useState } from "react";
import { AddRounded, EditRounded, SearchRounded } from "@mui/icons-material";
import { tarjeta, titulo, botonAmarillo, botonIcono } from "./comun";
import ModalUsuario from "./ModalUsuario";

const coloresRol = "bg-accent/20 text-text";
const columnas = ["Usuario", "Usuario de acceso", "Correo", "Cargo", "Permisos"];

function iniciales(nombre = "") {
  return nombre.split(" ").filter(Boolean).slice(0, 2).map((palabra) => palabra[0]).join("").toUpperCase();
}

// mensaje del backend: el detalle de validacion es mas util que el mensaje generico
function mensajeError(cuerpo, porDefecto) {
  const detalle = Array.isArray(cuerpo?.error?.details) ? cuerpo.error.details[0]?.mensaje : null;
  return detalle ?? cuerpo?.error?.message ?? porDefecto;
}

export default function GestionUsuarios({ usuarios, onRecargar, onAviso, puedeGestionar = true }) {
  const [busqueda, setBusqueda] = useState("");
  // null = cerrado, "nuevo" = agregar, o el usuario que se esta editando
  const [modal, setModal] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const texto = busqueda.toLowerCase();
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      (u.nombre ?? "").toLowerCase().includes(texto) ||
      (u.correo ?? "").toLowerCase().includes(texto) ||
      (u.usuario ?? "").toLowerCase().includes(texto)
  );

  async function guardarUsuario(datos) {
    const editando = modal !== "nuevo";
    setGuardando(true);
    try {
      const respuesta = await fetch(
        editando ? `/api/data/usuarios/${modal.id}` : "/api/data/usuarios",
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        }
      );
      const cuerpo = await respuesta.json().catch(() => null);
      if (!respuesta.ok) {
        onAviso?.(mensajeError(cuerpo, "No se pudo guardar el usuario"), "error");
        return;
      }
      setModal(null);
      await onRecargar?.();
    } catch (error) {
      console.error("no se pudo guardar el usuario", error);
      onAviso?.("No se pudo guardar el usuario", "error");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className={tarjeta} aria-label="Gestión de usuarios">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className={titulo}>Gestión de usuarios</h2>
        {puedeGestionar && (
          <button className={botonAmarillo} onClick={() => setModal("nuevo")}>
            <AddRounded fontSize="small" aria-hidden="true" />
            Agregar usuario
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 w-full max-w-56 border border-border bg-background rounded-md px-2 py-1 mb-4">
        <SearchRounded className="text-icon" fontSize="small" aria-hidden="true" />
        <input
          type="search"
          className="w-full bg-transparent text-xs text-text placeholder:text-subtext focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="Buscar"
          aria-label="Buscar usuario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Contenedor de la tabla con borde general */}
      <div className="overflow-x-auto rounded-lg border border-border/60 bg-background/50">
        <table className="w-full text-xs text-left text-text border-collapse">
          <thead>
            <tr className="bg-background border-b border-border/60 text-subtext">
              {columnas.map((t) => (
                <th key={t} className="px-4 py-3 font-semibold">{t}</th>
              ))}
              {puedeGestionar && (
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} className="hover:bg-background/80 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full bg-accent/20 ring-1 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-text"
                      aria-hidden="true"
                    >
                      {iniciales(u.nombre)}
                    </span>
                    <span className="font-medium text-text">{u.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-subtext">{u.usuario}</td>
                <td className="px-4 py-3 text-subtext">{u.correo}</td>
                <td className="px-4 py-3 text-subtext">{u.cargo}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full font-medium text-[11px] ${coloresRol}`}>{u.rol}</span>
                </td>
                {puedeGestionar && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className={botonIcono} aria-label={`Editar a ${u.nombre}`} onClick={() => setModal(u)}>
                        <EditRounded className="text-icon" sx={{ fontSize: 18 }} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan={columnas.length + (puedeGestionar ? 1 : 0)} className="px-4 py-6 text-center text-subtext">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <ModalUsuario
          usuario={modal === "nuevo" ? null : modal}
          onCerrar={() => setModal(null)}
          onGuardar={guardarUsuario}
          guardando={guardando}
        />
      )}
    </section>
  );
}
