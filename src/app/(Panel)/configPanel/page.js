"use client";

import { useState } from "react";
import { regiones } from "./regiones";
import {
  KeyboardArrowDownRounded, AddRounded, EditRounded, DeleteRounded, SearchRounded,
  ImageRounded, PhotoCameraRounded, SettingsRounded, BusinessRounded,
  LocalGasStationRounded, NatureRounded, EmailRounded, PhoneRounded, LocationOnRounded,
} from "@mui/icons-material";

// datos de prueba, despues se reemplazan por los del backend
const configInicial = {
  rendimiento: 40,
  unidadRendimiento: "Km/L",
  emisiones: 1000,
  usuarios: [
    { id: 1, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Admin", foto: null },
    { id: 2, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Usuario", foto: null },
    { id: 3, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Usuario", foto: null },
  ],
  alertas: [
    { id: "consumo", nombre: "Consumo excesivo", estado: "Moderado", activa: true, valor: 40, unidad: "Km/L", correo: true },
    { id: "robo", nombre: "Robo", estado: "Crítico", activa: true, valor: 40, unidad: "L", correo: true },
  ],
  empresa: {
    logo: null, nombre: "", rut: "", correo: "", telefono: "",
    region: "", comuna: "", direccion: "", descripcion: "",
  },
};

// alertas que se pueden agregar desde el menu, las dos ultimas son de ejemplo
const tiposAlerta = [
  { id: "consumo", nombre: "Consumo excesivo", unidad: "Km/L" },
  { id: "robo", nombre: "Robo", unidad: "L" },
  { id: "rendimiento", nombre: "Bajo rendimiento", unidad: "Km/L" },
  { id: "carga", nombre: "Carga sospechosa", unidad: "L" },
];

const estados = ["Leve", "Moderado", "Crítico"];
const valores = [10, 20, 30, 40, 50, 60];
const emisiones = [500, 1000, 1500, 2000];

const coloresRol = {
  Admin: "bg-blue-100 text-blue-800",
  Usuario: "bg-green-100 text-green-800",
};

// clases que se repiten en varios elementos
const tarjeta = "bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]";
const campo =
  "text-xs font-normal text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-3 py-2 disabled:opacity-50";
const botonAmarillo =
  "inline-flex items-center justify-center gap-1 bg-accent text-[#1A1A1A] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-accent-dark";
const bordeError = "outline outline-1 outline-red-500";
const botonIcono = "w-7 h-7 rounded-full bg-[#F4F5F7] hover:bg-[#E9EAED]";

// lee la imagen elegida y se la pasa a la funcion que la guarda
function elegirImagen(e, guardar) {
  const archivo = e.target.files[0];
  if (archivo) guardar(URL.createObjectURL(archivo));
}

function iniciales(nombre) {
  return nombre.split(" ").slice(0, 2).map((palabra) => palabra[0]).join("").toUpperCase();
}

function Interruptor({ activo, onChange, etiqueta, disabled }) {
  return (
    <label
      className={`flex items-center gap-2 text-xs text-[#1A1A1A] ${disabled ? "opacity-50" : "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={activo}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="relative w-9 h-5 shrink-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-[#1A1A1A] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
      {etiqueta}
    </label>
  );
}

// select con sus opciones, "vacio" es el texto de la opcion sin valor
function Lista({ opciones, vacio, className = "", ...props }) {
  return (
    <select className={`${campo} ${className}`} {...props}>
      {vacio && <option value="">{vacio}</option>}
      {opciones.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

// etiqueta + input + error. si recibe children, van en lugar del input
function Campo({ titulo, icono, error, className = "", children, ...props }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-semibold text-[#1A1A1A] ${className}`}>
      <span className="flex items-center gap-1">
        {icono}
        {titulo}
      </span>
      {children ?? <input className={`${campo} ${error ? bordeError : ""}`} {...props} />}
      {error && <span className="font-normal text-red-600">{error}</span>}
    </label>
  );
}

// sirve para agregar y para editar: si recibe un usuario, parte con sus datos
function ModalUsuario({ usuario, onCerrar, onGuardar }) {
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
        className="w-full max-w-sm bg-white rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
      >
        <h2 className="text-[#1A1A1A] text-lg font-bold mb-4">{titulo}</h2>

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
            <div className="w-28 h-28 flex items-center justify-center border border-[#E2E8F0] rounded-md overflow-hidden">
              {foto ? (
                <img src={foto} alt="Foto del usuario" className="w-full h-full object-cover" />
              ) : (
                <ImageRounded htmlColor="#B0B5BD" fontSize="large" aria-hidden="true" />
              )}
            </div>
            <label className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1A1A] bg-[#F4F5F7] rounded-full px-3 py-1.5 cursor-pointer hover:bg-[#E9EAED]">
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

function MenuEstado({ valor, onChange, disabled, etiqueta }) {
  const [abierto, setAbierto] = useState(false);

  function cerrarSiSale(e) {
    // se cierra cuando el foco sale del menu
    if (!e.currentTarget.contains(e.relatedTarget)) setAbierto(false);
  }

  return (
    <div
      className="relative"
      onBlur={cerrarSiSale}
      onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={etiqueta}
        disabled={disabled}
        onClick={() => setAbierto(!abierto)}
        className="flex items-center justify-between gap-2 w-28 text-xs font-semibold text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-2 py-1.5 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {valor}
        <KeyboardArrowDownRounded sx={{ fontSize: 16 }} aria-hidden="true" />
      </button>

      {abierto && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white border border-[#E2E8F0] rounded-md shadow-md overflow-hidden"
        >
          {estados.map((estado) => (
            <li key={estado} role="option" aria-selected={estado === valor}>
              <button
                type="button"
                onClick={() => {
                  onChange(estado);
                  setAbierto(false);
                }}
                className={`w-full text-left text-xs text-[#1A1A1A] px-2 py-1.5 hover:bg-[#F4F5F7] focus:outline-none focus:bg-[#F4F5F7] ${
                  estado === valor ? "font-semibold bg-accent/20" : ""
                }`}
              >
                {estado}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// boton con un menu de las alertas que todavia no estan en la lista
function AgregarAlerta({ disponibles, onAgregar }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div
      className="relative"
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setAbierto(false)}
      onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={abierto}
        disabled={disponibles.length === 0}
        onClick={() => setAbierto(!abierto)}
        className={`${botonAmarillo} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <AddRounded fontSize="small" aria-hidden="true" />
        Agregar alerta
      </button>

      {abierto && (
        <ul
          role="menu"
          className="absolute right-0 z-10 mt-1 w-48 bg-white border border-[#E2E8F0] rounded-md shadow-md overflow-hidden"
        >
          {disponibles.map((tipo) => (
            <li key={tipo.id} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onAgregar(tipo);
                  setAbierto(false);
                }}
                className="w-full text-left text-xs text-[#1A1A1A] px-3 py-2 hover:bg-[#F4F5F7] focus:outline-none focus:bg-[#F4F5F7]"
              >
                {tipo.nombre}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// fila de parametros operativos, los selects van como children
function Parametro({ Icono, titulo, texto, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#E2E8F0] last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center">
          <Icono htmlColor="#4A4A4A" fontSize="small" aria-hidden="true" />
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

function PestanaGeneral({ config, cambiar }) {
  const [busqueda, setBusqueda] = useState("");
  // null = cerrado, "nuevo" = agregar, o el usuario que se esta editando
  const [modal, setModal] = useState(null);

  const texto = busqueda.toLowerCase();
  const usuariosFiltrados = config.usuarios.filter(
    (u) => u.nombre.toLowerCase().includes(texto) || u.correo.toLowerCase().includes(texto)
  );

  function guardarUsuario(datos) {
    const usuarios =
      modal === "nuevo"
        ? [...config.usuarios, { id: Date.now(), ...datos }]
        : config.usuarios.map((u) => (u.id === modal.id ? { ...u, ...datos } : u));
    cambiar("usuarios", usuarios);
    setModal(null);
  }

  function eliminarUsuario(id) {
    cambiar("usuarios", config.usuarios.filter((u) => u.id !== id));
  }

  const alertasDisponibles = tiposAlerta.filter((t) => !config.alertas.some((a) => a.id === t.id));

  function agregarAlerta(tipo) {
    // parte con los mismos valores por defecto que las demas
    const nueva = { ...tipo, estado: "Moderado", activa: true, valor: 40, correo: true };
    cambiar("alertas", [...config.alertas, nueva]);
  }

  function eliminarAlerta(id) {
    cambiar("alertas", config.alertas.filter((a) => a.id !== id));
  }

  function cambiarAlerta(id, dato, valor) {
    cambiar("alertas", config.alertas.map((a) => (a.id === id ? { ...a, [dato]: valor } : a)));
  }

  return (
    <div className="flex flex-col gap-5">
      <section className={tarjeta} aria-label="Parámetros operativos">
        <h2 className="text-[#1A1A1A] font-bold text-lg">Parámetros operativos</h2>
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

      <section className={tarjeta} aria-label="Gestión de usuarios">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <h2 className="text-[#1A1A1A] font-bold text-lg">Gestión de usuarios</h2>
          <button className={botonAmarillo} onClick={() => setModal("nuevo")}>
            <AddRounded fontSize="small" aria-hidden="true" />
            Agregar usuario
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-56 border border-[#E2E8F0] rounded-md px-2 py-1 mb-3">
          <SearchRounded htmlColor="#4A4A4A" fontSize="small" aria-hidden="true" />
          <input
            type="search"
            className="w-full bg-transparent text-xs text-[#1A1A1A] outline-none"
            placeholder="Buscar"
            aria-label="Buscar usuario"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#1A1A1A]">
            <thead>
              <tr className="bg-[#F4F5F7]">
                {["Usuario", "Correo electrónico", "Rol"].map((t) => (
                  <th key={t} className="px-4 py-2 font-semibold">{t}</th>
                ))}
                <th className="px-4 py-2 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="border-b border-[#E2E8F0] last:border-b-0">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      {u.foto ? (
                        <img src={u.foto} alt="" className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <span
                          className="w-7 h-7 rounded-full bg-[#4A4A4A] flex items-center justify-center text-[10px] font-bold text-[#FDFBF7]"
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
                    <span className={`px-2 py-0.5 rounded-full font-medium ${coloresRol[u.rol]}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <button className={botonIcono} aria-label={`Editar a ${u.nombre}`} onClick={() => setModal(u)}>
                        <EditRounded htmlColor="#4A4A4A" sx={{ fontSize: 14 }} aria-hidden="true" />
                      </button>
                      <button
                        className={botonIcono}
                        aria-label={`Eliminar a ${u.nombre}`}
                        onClick={() => eliminarUsuario(u.id)}
                      >
                        <DeleteRounded htmlColor="#C0392B" sx={{ fontSize: 14 }} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-[#4A4A4A]">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={tarjeta} aria-label="Alertas y notificaciones">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
          <h2 className="text-[#1A1A1A] font-bold text-lg">Alertas y notificaciones</h2>
          <AgregarAlerta disponibles={alertasDisponibles} onAgregar={agregarAlerta} />
        </div>
        {config.alertas.length === 0 && (
          <p className="py-6 text-center text-xs text-[#4A4A4A]">No hay alertas configuradas</p>
        )}
        {config.alertas.map((a) => (
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

      {modal && (
        <ModalUsuario
          usuario={modal === "nuevo" ? null : modal}
          onCerrar={() => setModal(null)}
          onGuardar={guardarUsuario}
        />
      )}
    </div>
  );
}

const limiteDescripcion = 300;
const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// deja el rut como 76.123.456-0 mientras se escribe
function formatearRut(valor) {
  const limpio = valor.replace(/[^0-9kK]/g, "").toUpperCase().slice(0, 9);
  if (limpio.length < 2) return limpio.replace("K", "");
  const cuerpo = limpio.slice(0, -1).replace(/K/g, "");
  const dv = limpio.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
}

// revisa el digito verificador con el modulo 11
function rutValido(rut) {
  const limpio = rut.replace(/[^0-9K]/g, "");
  if (limpio.length < 8) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === esperado;
}

// solo marca error en los campos que ya tienen algo escrito
function validarEmpresa(empresa) {
  const errores = {};
  if (empresa.rut && !rutValido(empresa.rut)) errores.rut = "El RUT no es válido";
  if (empresa.correo && !correoValido.test(empresa.correo))
    errores.correo = "Escribe un correo válido, como nombre@empresa.cl";
  if (empresa.telefono && empresa.telefono.length !== 9)
    errores.telefono = "El teléfono debe tener 9 dígitos";
  if (empresa.region && !empresa.comuna) errores.comuna = "Elige una comuna";
  return errores;
}

function PestanaEmpresa({ empresa, errores, cambiar }) {
  const icono = { sx: { fontSize: 14 }, htmlColor: "#4A4A4A", "aria-hidden": "true" };
  const comunas = regiones.find((r) => r.nombre === empresa.region)?.comunas ?? [];

  function poner(dato, valor) {
    cambiar("empresa", { ...empresa, [dato]: valor });
  }

  function elegirRegion(e) {
    // al cambiar de region la comuna anterior ya no sirve
    cambiar("empresa", { ...empresa, region: e.target.value, comuna: "" });
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
      <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">Perfil de la empresa</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-[120px] h-[120px] shrink-0 rounded-2xl border border-dashed border-[#B0B5BD] bg-[#F4F5F7] flex items-center justify-center overflow-hidden">
          {empresa.logo ? (
            <img src={empresa.logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
          ) : (
            <BusinessRounded htmlColor="#B0B5BD" sx={{ fontSize: 48 }} aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className={`${botonAmarillo} cursor-pointer`}>
            <PhotoCameraRounded fontSize="small" aria-hidden="true" />
            {empresa.logo ? "Cambiar logo" : "Subir logo"}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => elegirImagen(e, (url) => poner("logo", url))}
              hidden
            />
          </label>
          <p className="text-xs text-[#4A4A4A]">Recomendado: PNG o JPG transparente de 500x500px</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Campo
          titulo="Nombre de la empresa"
          icono={<BusinessRounded {...icono} />}
          type="text"
          maxLength={80}
          placeholder="Transportes Chiloé SpA"
          value={empresa.nombre}
          onChange={(e) => poner("nombre", e.target.value)}
        />
        <Campo
          titulo="RUT"
          type="text"
          placeholder="76.123.456-0"
          value={empresa.rut}
          error={errores.rut}
          onChange={(e) => poner("rut", formatearRut(e.target.value))}
        />
        <Campo
          titulo="Correo de contacto"
          icono={<EmailRounded {...icono} />}
          type="email"
          placeholder="contacto@empresa.cl"
          value={empresa.correo}
          error={errores.correo}
          onChange={(e) => poner("correo", e.target.value.trim())}
        />

        <Campo titulo="Teléfono" icono={<PhoneRounded {...icono} />} error={errores.telefono}>
          <div className="flex">
            <span className="text-xs font-normal text-[#4A4A4A] bg-[#F4F5F7] border border-r-0 border-[#E2E8F0] rounded-l-md px-3 py-2">
              +56
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={9}
              className={`${campo} flex-1 min-w-0 rounded-l-none ${errores.telefono ? bordeError : ""}`}
              placeholder="912345678"
              value={empresa.telefono}
              onChange={(e) => poner("telefono", e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </Campo>

        <Campo titulo="Región">
          <Lista
            opciones={regiones.map((r) => r.nombre)}
            vacio="Selecciona una región"
            value={empresa.region}
            onChange={elegirRegion}
          />
        </Campo>

        <Campo titulo="Comuna" error={errores.comuna}>
          <Lista
            opciones={comunas}
            vacio={empresa.region ? "Selecciona una comuna" : "Primero elige una región"}
            className={errores.comuna ? bordeError : ""}
            value={empresa.comuna}
            disabled={!empresa.region}
            onChange={(e) => poner("comuna", e.target.value)}
          />
        </Campo>

        <Campo
          className="md:col-span-2"
          titulo="Dirección"
          icono={<LocationOnRounded {...icono} />}
          type="text"
          maxLength={120}
          placeholder="Calle 123, oficina 4"
          value={empresa.direccion}
          onChange={(e) => poner("direccion", e.target.value)}
        />

        <Campo className="md:col-span-2" titulo="Descripción de la empresa">
          <textarea
            rows={4}
            maxLength={limiteDescripcion}
            className={`${campo} resize-none`}
            placeholder="Describe brevemente a qué se dedica la empresa"
            value={empresa.descripcion}
            onChange={(e) => poner("descripcion", e.target.value)}
          />
          <span className="self-end font-normal text-[#4A4A4A]">
            {empresa.descripcion.length}/{limiteDescripcion}
          </span>
        </Campo>
      </div>
    </section>
  );
}

const pestanas = [
  { id: "general", nombre: "General", Icono: SettingsRounded },
  { id: "empresa", nombre: "Empresa", Icono: BusinessRounded },
];

export default function Configuracion() {
  const [pestana, setPestana] = useState("general");
  // guardado = lo ultimo que se guardo, config = lo que se esta editando
  const [guardado, setGuardado] = useState(configInicial);
  const [config, setConfig] = useState(configInicial);

  const hayCambios = JSON.stringify(config) !== JSON.stringify(guardado);
  const errores = validarEmpresa(config.empresa);
  const hayErrores = Object.keys(errores).length > 0;

  function cambiar(dato, valor) {
    setConfig({ ...config, [dato]: valor });
  }

  function guardarCambios() {
    // aca va la llamada al backend cuando exista
    console.log(config);
    setGuardado(config);
  }

  return (
    <div className="flex flex-col w-full bg-[#F4F5F7] p-6 gap-5">
      <header>
        <h1 className="text-[#1A1A1A] text-2xl font-bold">Configuración</h1>
      </header>

      <div role="tablist" aria-label="Secciones de configuración" className="flex gap-2 border-b border-[#E2E8F0]">
        {pestanas.map(({ id, nombre, Icono }) => (
          <button
            key={id}
            role="tab"
            aria-selected={pestana === id}
            onClick={() => setPestana(id)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px text-sm rounded-t-lg border-b-2 ${
              pestana === id
                ? "border-accent bg-white font-semibold text-[#1A1A1A]"
                : "border-transparent text-[#4A4A4A] hover:text-[#1A1A1A]"
            }`}
          >
            <Icono fontSize="small" aria-hidden="true" />
            {nombre}
          </button>
        ))}
      </div>

      {pestana === "general" ? (
        <PestanaGeneral config={config} cambiar={cambiar} />
      ) : (
        <PestanaEmpresa empresa={config.empresa} errores={errores} cambiar={cambiar} />
      )}

      {hayCambios && (
        <div
          role="status"
          className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 bg-brand text-text rounded-xl px-5 py-3 shadow-lg"
        >
          <span className="text-sm">
            {hayErrores ? "Corrige los datos de la empresa antes de guardar" : "Tienes cambios sin guardar"}
          </span>
          <div className="flex gap-2">
            <button
              className="text-sm rounded-lg px-4 py-2 border border-border hover:bg-white/10"
              onClick={() => setConfig(guardado)}
            >
              Cancelar
            </button>
            <button
              className={`${botonAmarillo} disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={hayErrores}
              onClick={guardarCambios}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}