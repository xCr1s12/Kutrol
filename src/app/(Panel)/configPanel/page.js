"use client";

import { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

// datos de prueba, despues se reemplazan por los del backend
const usuariosIniciales = [
  { id: 1, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Admin" },
  { id: 2, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Operador" },
  { id: 3, nombre: "Jhon Doe", correo: "jhondoe@correo.com", rol: "Operador" },
];

const alertasIniciales = [
  { id: "consumo", nombre: "Consumo excesivo", activa: true, valor: 40, unidad: "Km/L", correo: true },
  { id: "robo", nombre: "Robo", activa: true, valor: 40, unidad: "L", correo: true },
];

const valores = [10, 20, 30, 40, 50, 60];
const emisiones = [500, 1000, 1500, 2000];

// clases que se repiten en varios elementos
const tarjeta = "bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]";
const campo = "text-xs text-[#1A1A1A] bg-white border border-[#E2E2E2] rounded-md px-3 py-1.5";
const botonAmarillo =
  "bg-accent text-[#1A1A1A] text-sm font-semibold rounded-lg px-10 py-3 hover:bg-accent-dark";

function Interruptor({ activo, onChange, etiqueta }) {
  return (
    <label className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={activo}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="relative w-9 h-5 shrink-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-[#1A1A1A] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
      {etiqueta}
    </label>
  );
}

function ModalAgregarUsuario({ onCerrar, onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("Usuario");
  const [foto, setFoto] = useState(null);

  function enviar(e) {
    e.preventDefault();
    onAgregar({ nombre, correo, rol });
  }

  function elegirFoto(e) {
    const archivo = e.target.files[0];
    if (archivo) setFoto(URL.createObjectURL(archivo));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"
      onClick={onCerrar}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Agregar usuario"
        className="w-full max-w-sm bg-white rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
      >
        <h2 className="text-[#1A1A1A] text-lg font-bold mb-4">Agregar usuario</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="flex flex-col gap-1 text-[10px] font-semibold text-[#1A1A1A]">
              Usuario
              <input
                type="text"
                className={campo}
                placeholder="Jhon doe"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-[10px] font-semibold text-[#1A1A1A]">
              Correo
              <input
                type="email"
                className={campo}
                placeholder="Jhondoe@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-[10px] font-semibold text-[#1A1A1A]">
              Rol
              <select className={campo} value={rol} onChange={(e) => setRol(e.target.value)}>
                <option>Usuario</option>
                <option>Operador</option>
                <option>Admin</option>
              </select>
            </label>
          </div>

          <label
            className="w-28 h-28 shrink-0 flex items-center justify-center border border-[#E2E2E2] rounded-md cursor-pointer overflow-hidden"
            aria-label="Subir foto del usuario"
          >
            {foto ? (
              <img src={foto} alt="Foto del usuario" className="w-full h-full object-cover" />
            ) : (
              <ImageRoundedIcon htmlColor="#B0B5BD" fontSize="large" aria-hidden="true" />
            )}
            <input type="file" accept="image/*" onChange={elegirFoto} hidden />
          </label>
        </div>

        <button type="submit" className={`${botonAmarillo} w-full`}>
          Agregar
        </button>
      </form>
    </div>
  );
}

function PestanaGeneral() {
  const [rendimiento, setRendimiento] = useState(40);
  const [unidadRendimiento, setUnidadRendimiento] = useState("Km/L");
  const [emisionesEsperadas, setEmisionesEsperadas] = useState(1000);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [alertas, setAlertas] = useState(alertasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto = busqueda.toLowerCase();
    return u.nombre.toLowerCase().includes(texto) || u.correo.toLowerCase().includes(texto);
  });

  function cambiarAlerta(id, dato, valor) {
    setAlertas(alertas.map((a) => (a.id === id ? { ...a, [dato]: valor } : a)));
  }

  function agregarUsuario(nuevo) {
    setUsuarios([...usuarios, { id: Date.now(), ...nuevo }]);
    setModalAbierto(false);
  }

  function guardarCambios() {
    // aca va la llamada al backend cuando exista
    console.log({ rendimiento, unidadRendimiento, emisionesEsperadas, alertas, usuarios });
  }

  return (
    <>
      <section className={tarjeta} aria-label="Parámetros">
        <h2 className="text-[#1A1A1A] font-bold text-lg mb-3">Parámetros</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#F4F5F7] border border-[#E2E2E2] rounded-lg px-4 py-3 min-w-60">
            <p className="text-sm text-[#1A1A1A] mb-2">Rendimiento Esperado (Km/L)</p>
            <div className="flex gap-2">
              <select
                className={campo}
                aria-label="Rendimiento esperado"
                value={rendimiento}
                onChange={(e) => setRendimiento(Number(e.target.value))}
              >
                {valores.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                className={campo}
                aria-label="Unidad del rendimiento"
                value={unidadRendimiento}
                onChange={(e) => setUnidadRendimiento(e.target.value)}
              >
                <option>Km/L</option>
                <option>L/100Km</option>
              </select>
            </div>
          </div>

          <div className="bg-[#F4F5F7] border border-[#E2E2E2] rounded-lg px-4 py-3 min-w-60">
            <p className="text-sm text-[#1A1A1A] mb-2">Emisiones Esperadas</p>
            <select
              className={campo}
              aria-label="Emisiones esperadas"
              value={emisionesEsperadas}
              onChange={(e) => setEmisionesEsperadas(Number(e.target.value))}
            >
              {emisiones.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className={tarjeta} aria-label="Gestión de usuarios">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-medium text-[#1A1A1A]">Gestión de usuarios</h2>
          <button
            className="text-xs text-[#1A1A1A] bg-[#F4F5F7] rounded-full px-4 py-2 hover:bg-[#E9EAED]"
            onClick={() => setModalAbierto(true)}
          >
            Agregar Conductor
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-56 bg-[#F4F5F7] border border-[#E2E2E2] rounded-md px-2 py-1 mb-3">
          <SearchRoundedIcon htmlColor="#4A4A4A" fontSize="small" aria-hidden="true" />
          <input
            type="search"
            className="w-full bg-transparent text-xs text-[#1A1A1A] outline-none"
            placeholder="Search"
            aria-label="Buscar usuario"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#1A1A1A]">
            <thead>
              <tr className="bg-[#F4F5F7]">
                <th className="px-4 py-2 font-semibold">Usuario</th>
                <th className="px-4 py-2 font-semibold">Correo electrónico</th>
                <th className="px-4 py-2 font-semibold">Rol</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="border-b border-[#E2E2E2] last:border-b-0">
                  <td className="px-4 py-2">{u.nombre}</td>
                  <td className="px-4 py-2">{u.correo}</td>
                  <td className="px-4 py-2">{u.rol}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="w-7 h-7 rounded-full bg-[#F4F5F7] hover:bg-[#E9EAED]"
                      aria-label={`Editar a ${u.nombre}`}
                    >
                      <EditRoundedIcon htmlColor="#4A4A4A" sx={{ fontSize: 14 }} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={tarjeta} aria-label="Alertas">
        <h2 className="text-[#1A1A1A] font-bold text-lg mb-3">Alertas</h2>
        <div className="flex flex-col gap-3">
          {alertas.map((a) => (
            <div key={a.id} className="grid grid-cols-1 md:grid-cols-[170px_auto_1fr] items-center gap-2 md:gap-6">
              <Interruptor
                activo={a.activa}
                onChange={(v) => cambiarAlerta(a.id, "activa", v)}
                etiqueta={a.nombre}
              />
              <div className="flex gap-2">
                <select
                  className={campo}
                  aria-label={`Valor de la alerta ${a.nombre}`}
                  value={a.valor}
                  onChange={(e) => cambiarAlerta(a.id, "valor", Number(e.target.value))}
                >
                  {valores.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <select
                  className={campo}
                  aria-label={`Unidad de la alerta ${a.nombre}`}
                  value={a.unidad}
                  onChange={(e) => cambiarAlerta(a.id, "unidad", e.target.value)}
                >
                  <option>Km/L</option>
                  <option>L</option>
                </select>
              </div>
              <Interruptor
                activo={a.correo}
                onChange={(v) => cambiarAlerta(a.id, "correo", v)}
                etiqueta="Alerta al correo"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button className={botonAmarillo} onClick={guardarCambios}>
          Guardar Cambios
        </button>
      </div>

      {modalAbierto && (
        <ModalAgregarUsuario onCerrar={() => setModalAbierto(false)} onAgregar={agregarUsuario} />
      )}
    </>
  );
}

function PestanaEmpresa() {
  const [logo, setLogo] = useState(null);
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  function cambiarDato(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  function elegirLogo(e) {
    const archivo = e.target.files[0];
    if (archivo) setLogo(URL.createObjectURL(archivo));
  }

  function guardarEmpresa(e) {
    e.preventDefault();
    // aca va la llamada al backend cuando exista
    console.log(datos);
  }

  const etiqueta = "flex flex-col gap-1 text-xs font-semibold text-[#1A1A1A]";

  return (
    <form className="flex flex-col gap-5" onSubmit={guardarEmpresa}>
      <section className={tarjeta} aria-label="Datos de la empresa">
        <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">Datos de la empresa</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-2">
            <label
              className="w-32 h-32 flex items-center justify-center border border-[#E2E2E2] rounded-lg cursor-pointer overflow-hidden"
              aria-label="Subir logo de la empresa"
            >
              {logo ? (
                <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
              ) : (
                <ImageRoundedIcon htmlColor="#B0B5BD" fontSize="large" aria-hidden="true" />
              )}
              <input type="file" accept="image/*" onChange={elegirLogo} hidden />
            </label>
            <span className="text-xs text-[#4A4A4A]">Logo de la empresa</span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`${etiqueta} md:col-span-2`}>
              Nombre
              <input
                type="text"
                name="nombre"
                placeholder="Transportes Chiloé SpA"
                className={campo}
                value={datos.nombre}
                onChange={cambiarDato}
                required
              />
            </label>

            <label className={`${etiqueta} md:col-span-2`}>
              Descripción
              <textarea
                name="descripcion"
                placeholder="Describe brevemente a qué se dedica la empresa"
                rows={4}
                className={`${campo} resize-none`}
                value={datos.descripcion}
                onChange={cambiarDato}
              />
            </label>

            <label className={etiqueta}>
              Correo de contacto
              <input
                type="email"
                name="correo"
                placeholder="contacto@empresa.cl"
                className={campo}
                value={datos.correo}
                onChange={cambiarDato}
              />
            </label>

            <label className={etiqueta}>
              Teléfono
              <input
                type="tel"
                name="telefono"
                placeholder="+56 9 1234 5678"
                className={campo}
                value={datos.telefono}
                onChange={cambiarDato}
              />
            </label>

            <label className={`${etiqueta} md:col-span-2`}>
              Dirección
              <input
                type="text"
                name="direccion"
                placeholder="Calle 123, Castro"
                className={campo}
                value={datos.direccion}
                onChange={cambiarDato}
              />
            </label>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button type="submit" className={botonAmarillo}>
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}

const pestanas = [
  { id: "general", nombre: "General" },
  { id: "empresa", nombre: "Empresa" },
];

export default function Configuracion() {
  const [pestana, setPestana] = useState("general");

  return (
    <div className="flex flex-col w-full bg-[#F4F5F7] p-6 gap-5">
      <header>
        <h1 className="text-[#1A1A1A] text-2xl font-bold">Configuración</h1>
      </header>

      <div role="tablist" aria-label="Secciones de configuración" className="flex gap-6 border-b border-[#E2E2E2]">
        {pestanas.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={pestana === p.id}
            onClick={() => setPestana(p.id)}
            className={`pb-2 -mb-px text-sm border-b-2 ${
              pestana === p.id
                ? "border-accent font-semibold text-[#1A1A1A]"
                : "border-transparent text-[#4A4A4A] hover:text-[#1A1A1A]"
            }`}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      {/* las dos quedan montadas para no perder lo escrito al cambiar de pestaña */}
      <div role="tabpanel" className={pestana === "general" ? "flex flex-col gap-5" : "hidden"}>
        <PestanaGeneral />
      </div>
      <div role="tabpanel" className={pestana === "empresa" ? "" : "hidden"}>
        <PestanaEmpresa />
      </div>
    </div>
  );
}