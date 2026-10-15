"use client";

import { useState, useEffect } from "react";
import { SettingsRounded, BusinessRounded } from "@mui/icons-material";
import { botonAmarillo } from "@/components/configuracion/comun";
import ParametrosOperativos from "@/components/configuracion/ParametrosOperativos";
import GestionUsuarios from "@/components/configuracion/GestionUsuarios";
import AlertasNotificaciones from "@/components/configuracion/AlertasNotificaciones";
import VistaEmpresa from "@/components/configuracion/VistaEmpresa";
import FormularioEmpresa from "@/components/configuracion/FormularioEmpresa";
import { validarEmpresa } from "@/components/configuracion/validarEmpresa";

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
  // empresa de ejemplo, se reemplaza por la que llega de la base de datos
  empresa: {
    logo: null,
    nombre: "Transportes Chiloé SpA",
    rut: "76.123.456-0",
    correo: "contacto@transporteschiloe.cl",
    telefono: "912345678",
    region: "Los Lagos",
    comuna: "Castro",
    direccion: "Calle 123, oficina 4",
    descripcion: "Empresa de transporte de carga en la isla de Chiloé.",
  },
};

const pestanas = [
  { id: "general", nombre: "General", Icono: SettingsRounded },
  { id: "empresa", nombre: "Empresa", Icono: BusinessRounded },
];

export default function Configuracion() {
  const [pestana, setPestana] = useState("general");
  // guardado = lo ultimo que se guardo, config = lo que se esta editando
  const [guardado, setGuardado] = useState(configInicial);
  const [config, setConfig] = useState(configInicial);
  const [editandoEmpresa, setEditandoEmpresa] = useState(false);

  // trae los datos de la empresa desde la base de datos al abrir la pagina
  useEffect(() => {
    fetch("/api/empresa") // cambiar por la ruta real del backend
      .then((res) => (res.ok ? res.json() : null))
      .then((empresa) => {
        if (!empresa) return;
        const datos = { ...configInicial, empresa: { ...configInicial.empresa, ...empresa } };
        setGuardado(datos);
        setConfig(datos);
      })
      .catch((error) => console.error("no se pudo cargar la empresa", error));
  }, []);

  const hayCambios = JSON.stringify(config) !== JSON.stringify(guardado);
  // la empresa solo se valida mientras el formulario esta abierto
  const errores = editandoEmpresa ? validarEmpresa(config.empresa) : {};
  const hayErrores = Object.keys(errores).length > 0;

  function cambiar(dato, valor) {
    setConfig({ ...config, [dato]: valor });
  }

  function guardarCambios() {
    // aca va la llamada al backend para guardar
    console.log(config);
    setGuardado(config);
    setEditandoEmpresa(false);
  }

  function cancelarCambios() {
    setConfig(guardado);
    setEditandoEmpresa(false);
  }

  // al volver se descartan los cambios de la empresa que no se guardaron
  function cerrarFormulario() {
    setConfig({ ...config, empresa: guardado.empresa });
    setEditandoEmpresa(false);
  }

  return (
    <div className="flex flex-col w-full bg-background text-text p-6 gap-5">
      <header>
        <h1 className="text-text text-2xl font-bold">Configuración</h1>
      </header>

      <div role="tablist" aria-label="Secciones de configuración" className="flex gap-2 border-b border-border">
        {pestanas.map(({ id, nombre, Icono }) => (
          <button
            key={id}
            role="tab"
            aria-selected={pestana === id}
            onClick={() => setPestana(id)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px text-sm rounded-t-lg border-b-2 ${
              pestana === id
                ? "border-accent bg-card font-semibold text-text"
                : "border-transparent text-subtext hover:text-text"
            }`}
          >
            {/* la pestana abierta lleva el icono dorado */}
            <Icono fontSize="small" className={pestana === id ? "text-accent-dark" : "text-icon"} aria-hidden="true" />
            {nombre}
          </button>
        ))}
      </div>

      {pestana === "general" ? (
        <div className="flex flex-col gap-5">
          <ParametrosOperativos config={config} cambiar={cambiar} />
          <GestionUsuarios usuarios={config.usuarios} cambiar={cambiar} />
          <AlertasNotificaciones alertas={config.alertas} cambiar={cambiar} />
        </div>
      ) : editandoEmpresa ? (
        <FormularioEmpresa
          empresa={config.empresa}
          errores={errores}
          cambiar={cambiar}
          onVolver={cerrarFormulario}
        />
      ) : (
        <VistaEmpresa empresa={guardado.empresa} onEditar={() => setEditandoEmpresa(true)} />
      )}

      {hayCambios && (
        <div
          role="status"
          className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 bg-card text-text border border-border rounded-xl px-5 py-3 shadow-lg"
        >
          <span className="text-sm">
            {hayErrores ? "Corrige los datos de la empresa antes de guardar" : "Tienes cambios sin guardar"}
          </span>
          <div className="flex gap-2">
            <button
              className="text-sm rounded-lg px-4 py-2 border border-border text-text hover:bg-border"
              onClick={cancelarCambios}
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
