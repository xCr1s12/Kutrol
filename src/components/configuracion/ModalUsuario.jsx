import { useState } from "react";
import { ImageRounded, PhotoCameraRounded } from "@mui/icons-material";
import { botonAmarillo, elegirImagen } from "./comun";
import { Campo, Lista } from "./Controles";

// sirve para agregar y para editar: si recibe un usuario, parte con sus datos
export default function ModalUsuario({ usuario, onCerrar, onGuardar }) {
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [correo, setCorreo] = useState(usuario?.correo ?? "");
  const [rol, setRol] = useState(usuario?.rol ?? "Usuario");
  const [foto, setFoto] = useState(usuario?.foto ?? null);

  const titulo = usuario ? "Editar usuario" : "Agregar usuario";

  function enviar(e) {
    e.preventDefault();
    onGuardar({ nombre, correo, rol, foto });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"
      onClick={onCerrar}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="w-full max-w-sm bg-card text-text border border-border rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
      >
        <h2 className="text-text text-lg font-bold mb-4">{titulo}</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 flex flex-col gap-2">
            <Campo
              titulo="Usuario"
              type="text"
              placeholder="Jhon doe"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Campo
              titulo="Correo"
              type="email"
              placeholder="Jhondoe@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <Campo titulo="Rol">
              <Lista opciones={["Usuario", "Admin"]} value={rol} onChange={(e) => setRol(e.target.value)} />
            </Campo>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-28 h-28 flex items-center justify-center border border-border bg-background rounded-md overflow-hidden">
              {foto ? (
                <img src={foto} alt="Foto del usuario" className="w-full h-full object-cover" />
              ) : (
                <ImageRounded className="text-icon" fontSize="large" aria-hidden="true" />
              )}
            </div>
            <label className="inline-flex items-center gap-1 text-xs font-semibold text-text bg-background border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-border">
              <PhotoCameraRounded sx={{ fontSize: 14 }} aria-hidden="true" />
              {foto ? "Cambiar imagen" : "Agregar imagen"}
              <input type="file" accept="image/*" onChange={(e) => elegirImagen(e, setFoto)} hidden />
            </label>
          </div>
        </div>

        <button type="submit" className={`${botonAmarillo} w-full py-3`}>
          {usuario ? "Guardar" : "Agregar"}
        </button>
      </form>
    </div>
  );
}
