"use client";

import { useState, useEffect, useCallback } from "react";
import { GroupRounded, BusinessRounded } from "@mui/icons-material";
import { botonAmarillo } from "@/components/configuracion/comun";
import GestionUsuarios from "@/components/configuracion/GestionUsuarios";
import VistaEmpresa from "@/components/configuracion/VistaEmpresa";
import FormularioEmpresa from "@/components/configuracion/FormularioEmpresa";
import { validarEmpresa } from "@/components/configuracion/validarEmpresa";
import { obtenerComunas, obtenerRegiones } from "@/services/client/ubicacion.service";
import { useToast } from "@/components/ui/Toasts";

const configInicial = {
  // empresa de ejemplo, se reemplaza por la que llega de la base de datos
  empresa: {
    logo: null,
    nombre: "Transportes Chiloé SpA",
    rut: "76.123.456-0",
    emails: [],
    telefonos: [],
    region: "Los Lagos",
    comuna: "Castro",
    direccion: "Calle 123, oficina 4",
    descripcion: "Empresa de transporte de carga en la isla de Chiloé.",
  },
};

const pestanas = [
  { id: "empresa", nombre: "Empresa", Icono: BusinessRounded },
  { id: "usuarios", nombre: "Usuarios", Icono: GroupRounded },
];

// la lista de usuarios siempre sale de la api, nunca de estado local
async function pedirUsuarios() {
  const res = await fetch("/api/data/usuarios");
  const lista = res.ok ? await res.json() : [];
  return Array.isArray(lista) ? lista : [];
}

export default function Configuracion() {
  const [pestana, setPestana] = useState("empresa");
  // guardado = lo ultimo que se guardo, config = lo que se esta editando
  const [guardado, setGuardado] = useState(configInicial);
  const [config, setConfig] = useState(configInicial);
  const [editandoEmpresa, setEditandoEmpresa] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [puedeAdministrar, setPuedeAdministrar] = useState(null);
  const { mostrar } = useToast();

  const recargarUsuarios = useCallback(
    () =>
      pedirUsuarios()
        .then((lista) => setUsuarios(lista))
        .catch((error) => console.error("no se pudieron cargar los usuarios", error)),
    []
  );

  useEffect(() => {
    recargarUsuarios();
  }, [recargarUsuarios]);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((datos) => {
        const nivel = Number(datos?.session?.nivel);
        if (Number.isFinite(nivel)) setPuedeAdministrar(nivel <= 2);
      })
      .catch((error) => {
        console.error("no se pudo leer la sesión", error);
        setPuedeAdministrar(true);
      });
  }, []);

  useEffect(() => {
    fetch("/api/data/empresa")
      .then((res) => (res.ok ? res.json() : null))
      .then((empresa) => {
        if (!empresa) return;
        const datos = {
          ...configInicial,
          empresa: {
            logo: empresa.url_imagen ?? null,
            nombre: empresa.nombre ?? "",
            rut: empresa.rut ?? "",
            emails: empresa.emails ?? [],
            telefonos: empresa.telefonos ?? [],
            region: empresa.region ?? "",
            comuna: empresa.comuna ?? "",
            direccion: empresa.direccion ?? "",
            descripcion: empresa.descripcion ?? "",
          },
        };
        setGuardado(datos);
        setConfig(datos);
      })
      .catch((error) => console.error("no se pudo cargar la empresa", error));
  }, []);

  // solo la empresa tiene endpoint de guardado
  const hayCambios =
    JSON.stringify(config.empresa) !== JSON.stringify(guardado.empresa);
  // la empresa solo se valida mientras el formulario esta abierto
  const errores = editandoEmpresa ? validarEmpresa(config.empresa) : {};
  const hayErrores = Object.keys(errores).length > 0;

  function cambiar(dato, valor) {
    setConfig({ ...config, [dato]: valor });
  }

  async function resolverComuna(region, comuna) {
    const regiones = await obtenerRegiones();
    const regionEncontrada = (regiones ?? []).find(
      (item) => item.nombre === region,
    );
    if (!regionEncontrada) {
      throw new Error("Selecciona una región válida");
    }

    const comunas = await obtenerComunas(regionEncontrada.id);
    const comunaEncontrada = (comunas ?? []).find(
      (item) => item.nombre === comuna,
    );
    if (!comunaEncontrada) {
      throw new Error("La comuna elegida no pertenece a esa región");
    }
    return comunaEncontrada.id;
  }

  async function guardarCambios() {
    if (guardando) return;

    if (Object.keys(validarEmpresa(config.empresa)).length) {
      setEditandoEmpresa(true);
      mostrar("Revisa los datos de la empresa antes de guardar", "error");
      return;
    }

    setGuardando(true);
    try {
      const id_comuna = await resolverComuna(
        config.empresa.region,
        config.empresa.comuna,
      );
      const respuesta = await fetch("/api/data/empresa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: config.empresa.nombre,
          rut: config.empresa.rut,
          direccion: config.empresa.direccion,
          descripcion: config.empresa.descripcion,
          url_imagen: config.empresa.logo ?? "",
          id_comuna,
          emails: config.empresa.emails,
          telefonos: config.empresa.telefonos,
        }),
      });
      const cuerpo = await respuesta.json().catch(() => null);

      if (!respuesta.ok) {
        const detalles = cuerpo?.error?.details;
        const mensaje = Array.isArray(detalles)
          ? detalles.map((detalle) => detalle.mensaje).join(" ")
          : cuerpo?.error?.message || "No se pudo guardar la empresa";
        throw new Error(mensaje);
      }

      const datos = {
        ...config,
        empresa: {
          logo: cuerpo?.url_imagen ?? null,
          nombre: cuerpo?.nombre ?? "",
          rut: cuerpo?.rut ?? "",
          emails: cuerpo?.emails ?? [],
          telefonos: cuerpo?.telefonos ?? [],
          region: cuerpo?.region ?? "",
          comuna: cuerpo?.comuna ?? "",
          direccion: cuerpo?.direccion ?? "",
          descripcion: cuerpo?.descripcion ?? "",
        },
      };
      setConfig(datos);
      setGuardado(datos);
      setEditandoEmpresa(false);
      mostrar("Cambios guardados", "exito");
    } catch (error) {
      mostrar(
        error instanceof Error ? error.message : "No se pudo guardar la empresa",
        "error",
      );
    } finally {
      setGuardando(false);
    }
  }

  function cancelarCambios() {
    setConfig(guardado);
    setEditandoEmpresa(false);
  }

  // al volver no se descarta nada en silencio: primero hay que guardar o cancelar
  function cerrarFormulario() {
    if (hayCambios) {
      mostrar("Guarda o cancela los cambios antes de volver", "error");
      return;
    }
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
            <Icono fontSize="small" className={pestana === id ? "text-accent-dark" : "text-icon"} aria-hidden="true" />
            {nombre}
          </button>
        ))}
      </div>

      {pestana === "usuarios" ? (
        <GestionUsuarios
          usuarios={usuarios}
          onRecargar={recargarUsuarios}
          onAviso={mostrar}
          puedeGestionar={puedeAdministrar === true}
        />
      ) : editandoEmpresa ? (
        <FormularioEmpresa
          empresa={config.empresa}
          errores={errores}
          cambiar={cambiar}
          onVolver={cerrarFormulario}
        />
      ) : (
        <VistaEmpresa
          empresa={guardado.empresa}
          onEditar={() => setEditandoEmpresa(true)}
          puedeEditar={puedeAdministrar === true}
        />
      )}

      {hayCambios && (
        <div
          role="status"
          className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 bg-card text-text border-2 border-gold ring-2 ring-gold/30 rounded-xl px-5 py-3 shadow-[0_0_22px_rgba(212,175,55,0.35)]"
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
              disabled={hayErrores || guardando}
              onClick={guardarCambios}
            >
              {guardando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
