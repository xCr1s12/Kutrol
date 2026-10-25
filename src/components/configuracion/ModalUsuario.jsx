import { useState } from "react";
import { campo, botonAmarillo } from "./comun";
import { Campo, Lista } from "./Controles";
import { NIVELES } from "@/schema/usuario.schema";
import { mensajePassword } from "@/lib/passwordPolicy";
import { CARGOS } from "@/lib/cargos";

const rolPorDefecto = "EMPLEADO";

// sirve para agregar y para editar: si recibe un usuario, parte con sus datos
export default function ModalUsuario({ usuario, onCerrar, onGuardar, guardando = false }) {
  const [nombre, setNombre] = useState(usuario?.primer_nombre ?? "");
  const [apellidos, setApellidos] = useState(usuario?.apellidos ?? "");
  const [correo, setCorreo] = useState(usuario?.correo ?? "");
  const [cargo, setCargo] = useState(usuario?.cargo ?? "");
  const [rol, setRol] = useState(usuario?.rol ?? rolPorDefecto);
  const [password, setPassword] = useState("");
  const [repetir, setRepetir] = useState("");
  const [errores, setErrores] = useState({});

  const titulo = usuario ? "Editar usuario" : "Agregar usuario";
  const avisoPassword = password ? mensajePassword(password) : "";
  // el duenio es quien registro la empresa: no se elige ni se cambia desde aqui
  const esDuenio = usuario?.rol === "DUEÑO";
  const roles = NIVELES.filter((nivel) => nivel.nombre !== "DUEÑO");
  // si el cargo guardado no esta en la lista se muestra igual, para no perderlo al guardar
  const opcionesCargo = cargo && !CARGOS.includes(cargo) ? [cargo, ...CARGOS] : CARGOS;
  let textoBoton = usuario ? "Guardar cambios" : "Agregar usuario";
  if (guardando) textoBoton = "Guardando...";

  // al escribir en un campo se borra el error de ese campo
  function alEscribir(clave, guardar) {
    return (e) => {
      guardar(e.target.value);
      setErrores((previos) => (previos[clave] ? { ...previos, [clave]: undefined } : previos));
    };
  }

  function enviar(e) {
    e.preventDefault();

    const encontrados = {};
    if (nombre.trim().length < 2) {
      encontrados.nombre = "Escribe el nombre del usuario";
    }
    if (apellidos.trim().length < 2) {
      encontrados.apellidos = "Escribe los apellidos del usuario";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      encontrados.correo = "Revisa el correo";
    }
    if (cargo.trim().length < 2) {
      encontrados.cargo = "Selecciona el cargo del usuario";
    }
    if (!password) {
      if (!usuario) encontrados.password = "Escribe una contraseña";
    } else {
      const mensaje = mensajePassword(password);
      if (mensaje) encontrados.password = mensaje;
      else if (repetir !== password) encontrados.repetir = "Las contraseñas no coinciden";
    }
    setErrores(encontrados);
    if (Object.keys(encontrados).length) return;

    const datos = {
      primer_nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      email: correo.trim(),
      cargo: cargo.trim(),
    };
    if (!esDuenio) {
      datos.id_nivel_jerarquico = NIVELES.find((nivel) => nivel.nombre === rol)?.id;
    }
    if (password) datos.password = password;
    onGuardar(datos);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"
      onClick={guardando ? undefined : onCerrar}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        aria-busy={guardando}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card text-text border border-border rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
        noValidate
      >
        <h2 className="text-text text-lg font-bold mb-4">{titulo}</h2>

        {usuario && (
          <div className="mb-4">
            <Campo titulo="Usuario de acceso">
              <input className={campo} value={usuario.usuario ?? ""} readOnly />
            </Campo>
            <p className="mt-1 text-xs font-normal text-subtext">
              Se genera solo a partir del nombre y del nombre de la empresa
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <Campo
            titulo="Nombre"
            type="text"
            placeholder="Ej: Camila"
            value={nombre}
            onChange={alEscribir("nombre", setNombre)}
            disabled={guardando}
            required
            error={errores.nombre}
          />
          <Campo
            titulo="Apellidos"
            type="text"
            placeholder="Ej: Rojas Fuentes"
            value={apellidos}
            onChange={alEscribir("apellidos", setApellidos)}
            disabled={guardando}
            required
            error={errores.apellidos}
          />
          <Campo
            titulo="Correo"
            type="email"
            placeholder="nombre.apellido@empresa.cl"
            value={correo}
            onChange={alEscribir("correo", setCorreo)}
            disabled={guardando}
            required
            error={errores.correo}
          />
          <Campo titulo="Cargo" error={errores.cargo}>
            <Lista
              opciones={opcionesCargo}
              value={cargo}
              onChange={alEscribir("cargo", setCargo)}
              vacio="Selecciona un cargo"
              disabled={guardando}
            />
          </Campo>
          {esDuenio ? (
            <Campo titulo="Permisos">
              <input className={campo} value="DUEÑO" readOnly />
              <span className="text-xs font-normal text-subtext">Es quien registró la empresa</span>
            </Campo>
          ) : (
            <Campo titulo="Permisos">
              <Lista
                opciones={roles.map((nivel) => nivel.nombre)}
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                disabled={guardando}
              />
            </Campo>
          )}
          <Campo
            titulo="Contraseña"
            type="password"
            placeholder="Mínimo 12 caracteres"
            autoComplete="new-password"
            value={password}
            onChange={alEscribir("password", setPassword)}
            disabled={guardando}
            required={!usuario}
            error={errores.password ?? avisoPassword}
          />
          <Campo
            titulo="Repetir contraseña"
            type="password"
            placeholder="Repite la contraseña"
            autoComplete="new-password"
            value={repetir}
            onChange={alEscribir("repetir", setRepetir)}
            disabled={guardando}
            required={!usuario}
            error={errores.repetir}
          />
          {usuario && (
            <p className="text-xs font-normal text-subtext">
              Déjala vacía para no cambiarla
            </p>
          )}
        </div>

        <button type="submit" className={`${botonAmarillo} w-full py-3`} disabled={guardando}>
          {textoBoton}
        </button>
      </form>
    </div>
  );
}
