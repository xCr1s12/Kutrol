"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Estado,
  FilaTabla,
  Filtros,
  Paginacion,
  Tabla,
  Td,
  VerHistorial,
} from "@/components/gestion/FlotaComponents";

const PAGE_SIZE = 7;

const FILTROS = [
  "Todos",
  "DISPONIBLE",
  "EN RUTA",
  "MANTENCION",
  "FUERA DE SERVICIO",
];

const ESTADOS = {
<<<<<<< HEAD
<<<<<<< HEAD
  disponible: { label: "DISPONIBLE", color: "var(--color-text)" },
  en_ruta: { label: "EN RUTA", color: "var(--color-accent)" },
  mantencion: { label: "MANTENCION", color: "var(--color-accent-dark)" },
  fuera_de_servicio: {
    label: "FUERA DE SERVICIO",
    color: "var(--color-red)",
=======
  disponible: { label: "DISPONIBLE", color: "var(--color-brand)" },
  en_ruta: { label: "EN RUTA", color: "var(--color-accent-dark)" },
  mantencion: { label: "MANTENCION", color: "var(--color-accent-dark)" },
  fuera_de_servicio: {
    label: "FUERA DE SERVICIO",
    color: "var(--color-accent-dark)",
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
  disponible: { label: "DISPONIBLE", color: "var(--color-text)" },
  en_ruta: { label: "EN RUTA", color: "var(--color-accent)" },
  mantencion: { label: "MANTENCION", color: "var(--color-accent-dark)" },
  fuera_de_servicio: {
    label: "FUERA DE SERVICIO",
    color: "var(--color-red)",
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
  },
};

const normalizar = (texto) =>
  (texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "_");

export default function TablaCamiones({
  flotaId = 1,
  onVerHistorial,
  acciones,
}) {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarVehiculos() {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(
<<<<<<< HEAD
<<<<<<< HEAD
          `/api/data/vehiculos?flota_id=${encodeURIComponent(flotaId)}`,
=======
          `/api/vehiculos?flota_id=${encodeURIComponent(flotaId)}`,
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
          `/api/data/vehiculos?flota_id=${encodeURIComponent(flotaId)}`,
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
          { signal: controller.signal },
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(
<<<<<<< HEAD
            json.error?.message ||
              json.message ||
              json.mensaje ||
              (typeof json.error === "string" ? json.error : null) ||
              "Error al cargar vehículos",
=======
            json.message || json.error || "Error al cargar vehículos",
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
          );
        }
        if (!Array.isArray(json.data)) {
          throw new Error("La respuesta de vehículos no tiene un formato válido");
        }

        setVehiculos(json.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Error al cargar vehículos",
        );
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarVehiculos();
    return () => controller.abort();
  }, [flotaId]);

  const vehiculosFiltrados = useMemo(
    () =>
      vehiculos.filter((vehiculo) => {
        const estado = normalizar(vehiculo.estado);
        return (
          filtroActivo === "Todos" || estado === normalizar(filtroActivo)
        );
      }),
    [filtroActivo, vehiculos],
  );

  const totalPaginas = Math.max(
    1,
    Math.ceil(vehiculosFiltrados.length / PAGE_SIZE),
  );
  const paginaActual = Math.min(pagina, totalPaginas);
  const vehiculosPagina = vehiculosFiltrados.slice(
    (paginaActual - 1) * PAGE_SIZE,
    paginaActual * PAGE_SIZE,
  );

<<<<<<< HEAD
  // Al cambiar el filtro se vuelve a la primera pagina (antes vivia en un
  // useEffect que provocaba un render en cascada).
  const cambiarFiltro = (filtro) => {
    setFiltroActivo(filtro);
    setPagina(1);
  };
=======
  useEffect(() => {
    setPagina(1);
  }, [filtroActivo]);

  useEffect(() => {
    if (pagina > totalPaginas) setPagina(totalPaginas);
  }, [pagina, totalPaginas]);
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)

  return (
    <>
      <div className="mb-3 mt-3 flex items-end justify-between gap-4">
        <Filtros
          opciones={FILTROS}
          seleccionado={filtroActivo}
<<<<<<< HEAD
          onSelect={cambiarFiltro}
=======
          onSelect={setFiltroActivo}
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
        />
        {acciones}
      </div>

      <Tabla
        columnas={[
<<<<<<< HEAD
          "Vehículo",
=======
          "Vehiculo",
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
          "Marca / modelo",
          "Estado",
          "Capacidad carga",
          "Historial",
        ]}
        anchos={[18, 22, 18, 22, 20]}
      >
        {cargando ? (
          <tr>
<<<<<<< HEAD
<<<<<<< HEAD
            <td colSpan={5} className="h-15 text-center text-text">
=======
            <td colSpan={5} className="h-15 text-center text-base text-subtext">
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
            <td colSpan={5} className="h-15 text-center text-text">
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
              Cargando vehículos...
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={5} className="h-15 text-center text-base text-subtext">
              Error: {error}
            </td>
          </tr>
        ) : vehiculosPagina.length > 0 ? (
          vehiculosPagina.map((vehiculo) => (
            <FilaTabla key={vehiculo.id_camion}>
              <Td>{vehiculo.patente}</Td>
              <Td>
                {[vehiculo.marca, vehiculo.modelo].filter(Boolean).join(" ") ||
                  "—"}
              </Td>
              <Td>
                <Estado
                  estado={normalizar(vehiculo.estado)}
                  estados={ESTADOS}
                />
              </Td>
              <Td>
                {vehiculo.capacidad_carga_kg != null
                  ? `${vehiculo.capacidad_carga_kg} kg`
                  : "—"}
              </Td>
              <Td>
                {onVerHistorial ? (
                  <VerHistorial onClick={() => onVerHistorial(vehiculo)} />
                ) : (
                  "—"
                )}
              </Td>
            </FilaTabla>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="h-15 text-center text-base text-subtext">
              No hay vehículos para este filtro.
            </td>
          </tr>
        )}
      </Tabla>

      <Paginacion
        pagina={paginaActual}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      />
    </>
  );
}
