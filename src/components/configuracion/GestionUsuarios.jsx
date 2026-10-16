import { useState } from "react";
import { AddRounded, EditRounded, DeleteRounded, SearchRounded } from "@mui/icons-material";
<<<<<<< HEAD
<<<<<<< HEAD
import { tarjeta, titulo, botonAmarillo, botonIcono } from "./comun";
import ModalUsuario from "./ModalUsuario";

<<<<<<< HEAD
<<<<<<< HEAD
const coloresRol = "bg-accent/20 text-text";
=======
import { tarjeta, botonAmarillo, botonIcono } from "./comun";
=======
import { tarjeta, titulo, botonAmarillo, botonIcono } from "./comun";
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
import ModalUsuario from "./ModalUsuario";

const coloresRol = {
  Admin: "bg-blue-100 text-blue-800",
  Usuario: "bg-green-100 text-green-800",
};
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
const coloresRol = "bg-accent/20 text-accent";
>>>>>>> 065276d (config panel dark mode adapt)
=======
const coloresRol = "bg-accent/20 text-text";
>>>>>>> e84c658 (fix(a11y): correct text, border and focus contrast)

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
<<<<<<< HEAD
<<<<<<< HEAD
        <h2 className={titulo}>Gestión de usuarios</h2>
=======
        <h2 className="text-[#1A1A1A] font-bold text-lg">Gestión de usuarios</h2>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
        <h2 className={titulo}>Gestión de usuarios</h2>
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
        <button className={botonAmarillo} onClick={() => setModal("nuevo")}>
          <AddRounded fontSize="small" aria-hidden="true" />
          Agregar usuario
        </button>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="flex items-center gap-2 w-full max-w-56 border border-border bg-background rounded-md px-2 py-1 mb-3">
        <SearchRounded className="text-icon" fontSize="small" aria-hidden="true" />
        <input
          type="search"
          className="w-full bg-transparent text-xs text-text placeholder:text-subtext focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
=======
      <div className="flex items-center gap-2 w-full max-w-56 border border-[#E2E8F0] rounded-md px-2 py-1 mb-3">
        <SearchRounded className="text-icon" fontSize="small" aria-hidden="true" />
        <input
          type="search"
          className="w-full bg-transparent text-xs text-[#1A1A1A] outline-none"
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
      <div className="flex items-center gap-2 w-full max-w-56 border border-border bg-background rounded-md px-2 py-1 mb-3">
        <SearchRounded className="text-icon" fontSize="small" aria-hidden="true" />
        <input
          type="search"
<<<<<<< HEAD
          className="w-full bg-transparent text-xs text-text placeholder:text-subtext outline-none"
>>>>>>> 065276d (config panel dark mode adapt)
=======
          className="w-full bg-transparent text-xs text-text placeholder:text-subtext focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
>>>>>>> e84c658 (fix(a11y): correct text, border and focus contrast)
          placeholder="Buscar"
          aria-label="Buscar usuario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
<<<<<<< HEAD
<<<<<<< HEAD
        <table className="w-full text-xs text-left text-text">
          <thead>
            <tr className="bg-background text-subtext">
=======
        <table className="w-full text-xs text-left text-[#1A1A1A]">
          <thead>
            <tr className="bg-[#F4F5F7]">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
        <table className="w-full text-xs text-left text-text">
          <thead>
            <tr className="bg-background text-subtext">
>>>>>>> 065276d (config panel dark mode adapt)
              {["Usuario", "Correo electrónico", "Rol"].map((t) => (
                <th key={t} className="px-4 py-2 font-semibold">{t}</th>
              ))}
              <th className="px-4 py-2 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
<<<<<<< HEAD
<<<<<<< HEAD
              <tr key={u.id} className="border-b border-border last:border-b-0">
=======
              <tr key={u.id} className="border-b border-[#E2E8F0] last:border-b-0">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
              <tr key={u.id} className="border-b border-border last:border-b-0">
>>>>>>> 065276d (config panel dark mode adapt)
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    {u.foto ? (
                      <img src={u.foto} alt="" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <span
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                        className="w-7 h-7 rounded-full bg-accent/20 ring-2 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-text"
=======
                        className="w-7 h-7 rounded-full bg-[#4A4A4A] flex items-center justify-center text-[10px] font-bold text-[#FDFBF7]"
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
                        className="w-7 h-7 rounded-full bg-brand ring-2 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-accent"
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
=======
                        className="w-7 h-7 rounded-full bg-accent/20 ring-2 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-accent"
>>>>>>> 065276d (config panel dark mode adapt)
=======
                        className="w-7 h-7 rounded-full bg-accent/20 ring-2 ring-accent/40 flex items-center justify-center text-[10px] font-bold text-text"
>>>>>>> e84c658 (fix(a11y): correct text, border and focus contrast)
                        aria-hidden="true"
                      >
                        {iniciales(u.nombre)}
                      </span>
                    )}
                    <span className="font-medium">{u.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{u.correo}</td>
                <td className="px-4 py-2">
<<<<<<< HEAD
<<<<<<< HEAD
                  <span className={`px-2 py-0.5 rounded-full font-medium ${coloresRol}`}>{u.rol}</span>
=======
                  <span className={`px-2 py-0.5 rounded-full font-medium ${coloresRol[u.rol]}`}>{u.rol}</span>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
                  <span className={`px-2 py-0.5 rounded-full font-medium ${coloresRol}`}>{u.rol}</span>
>>>>>>> 065276d (config panel dark mode adapt)
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <button className={botonIcono} aria-label={`Editar a ${u.nombre}`} onClick={() => setModal(u)}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                      <EditRounded className="text-icon" sx={{ fontSize: 18 }} aria-hidden="true" />
=======
                      <EditRounded htmlColor="#4A4A4A" sx={{ fontSize: 14 }} aria-hidden="true" />
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
                      <EditRounded htmlColor="#4A4A4A" sx={{ fontSize: 18 }} aria-hidden="true" />
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
=======
                      <EditRounded className="text-icon" sx={{ fontSize: 18 }} aria-hidden="true" />
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
                    </button>
                    <button
                      className={botonIcono}
                      aria-label={`Eliminar a ${u.nombre}`}
                      onClick={() => eliminarUsuario(u.id)}
                    >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                      <DeleteRounded className="text-danger" sx={{ fontSize: 18 }} aria-hidden="true" />
=======
                      <DeleteRounded htmlColor="#C0392B" sx={{ fontSize: 14 }} aria-hidden="true" />
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
                      <DeleteRounded htmlColor="#C0392B" sx={{ fontSize: 18 }} aria-hidden="true" />
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
=======
                      <DeleteRounded className="text-danger" sx={{ fontSize: 18 }} aria-hidden="true" />
>>>>>>> 065276d (config panel dark mode adapt)
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr>
<<<<<<< HEAD
<<<<<<< HEAD
                <td colSpan={4} className="px-4 py-6 text-center text-subtext">
=======
                <td colSpan={4} className="px-4 py-6 text-center text-[#4A4A4A]">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
                <td colSpan={4} className="px-4 py-6 text-center text-subtext">
>>>>>>> 065276d (config panel dark mode adapt)
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
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
}
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
