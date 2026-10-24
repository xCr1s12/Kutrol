import { useState } from "react";
import { AddRounded, EditRounded, DeleteRounded, SearchRounded } from "@mui/icons-material";
import { tarjeta, titulo, botonAmarillo, botonIcono } from "./comun";
import ModalUsuario from "./ModalUsuario";

const coloresRol = "bg-accent/20 text-text";

function iniciales(nombre) {
  return nombre.split(" ").slice(0, 2).map((palabra) => palabra[0]).join("").toUpperCase();
}

export default function GestionUsuarios({ usuarios, cambiar }) {
  const [busqueda, setBusqueda] = useState("");
  // null = cerrado, "nuevo" = agregar, o el usuario que se esta editando
  const [modal, setModal] = useState(null);

  const texto = busqueda.toLowerCase();
  const usuariosFiltrados = usuarios.filter(
    (u) => u.nombre.toLowerCase().includes(texto) || u.correo.toLowerCase().includes(texto)
  );

  function guardarUsuario(datos) {
    const nuevos =
      modal === "nuevo"
        ? [...usuarios, { id: Date.now(), ...datos }]
        : usuarios.map((u) => (u.id === modal.id ? { ...u, ...datos } : u));
    cambiar("usuarios", nuevos);
    setModal(null);
  }

  function eliminarUsuario(id) {
    cambiar("usuarios", usuarios.filter((u) => u.id !== id));
  }

  return (
    <section className={tarjeta} aria-label="Gestión de usuarios">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className={titulo}>Gestión de usuarios</h2>
        <button className={botonAmarillo} onClick={() => setModal("nuevo")}>
          <AddRounded fontSize="small" aria-hidden="true" />
          Agregar usuario
        </button>
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
              {["Usuario", "Correo electrónico", "Rol"].map((t) => (
                <th key={t} className="px-4 py-3 font-semibold">{t}</th>
              ))}
              <th className="px-4 py-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} className="hover:bg-background/80 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {u.foto ? (
                      <img src={u.foto} alt="" className="w-7 h-7 rounded-full object-cover border border-border/40" />
                    ) : (
                      <span
                        className="w-7 h-7 rounded-full bg-accent/20 ring-1 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-text"
                        aria-hidden="true"
                      >
                        {iniciales(u.nombre)}
                      </span>
                    )}
                    <span className="font-medium text-text">{u.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-subtext">{u.correo}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full font-medium text-[11px] ${coloresRol}`}>{u.rol}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className={botonIcono} aria-label={`Editar a ${u.nombre}`} onClick={() => setModal(u)}>
                      <EditRounded className="text-icon" sx={{ fontSize: 18 }} aria-hidden="true" />
                    </button>
                    <button
                      className={botonIcono}
                      aria-label={`Eliminar a ${u.nombre}`}
                      onClick={() => eliminarUsuario(u.id)}
                    >
                      <DeleteRounded className="text-danger" sx={{ fontSize: 18 }} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-subtext">
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
        />
      )}
    </section>
  );
}