"use client";

import { useEffect, useState } from "react";
import AddRoadRoundedIcon from "@mui/icons-material/AddRoadRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Modal, {
  BotonPrimario,
  BotonSecundario,
  Campo,
  inputClase,
} from "@/components/ui/Modal";

const selectClase = `${inputClase} w-full appearance-none pr-10`;

function obtenerFechaLocal(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

async function mensajeError(response, fallback) {
  const body = await response.json().catch(() => ({}));
  return body.error?.message || body.error || fallback;
}

export default function FormViaje({ open, onClose, onSubmit, rutaNombre }) {
  const [fechaInicio, setFechaInicio] = useState(() => {
    const inicio = new Date();
    inicio.setMinutes(inicio.getMinutes() + 5);
    inicio.setSeconds(0, 0);
    return obtenerFechaLocal(inicio);
  });
  const [fechaFin, setFechaFin] = useState(() => {
    const inicio = new Date();
    inicio.setMinutes(inicio.getMinutes() + 5);
    inicio.setSeconds(0, 0);
    return obtenerFechaLocal(new Date(inicio.getTime() + 60 * 60 * 1000));
  });
  const [camiones, setCamiones] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [idCamion, setIdCamion] = useState("");
  const [idConductor, setIdConductor] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const minimoFechaFin = fechaInicio
    ? obtenerFechaLocal(new Date(new Date(fechaInicio).getTime() + 60_000))
    : undefined;

  useEffect(() => {
    if (!open) return;

    fetch("/api/data/viajes")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await mensajeError(response, "No se pudieron cargar camiones y conductores."));
        }
        return response.json();
      })
      .then((opciones) => {
        setCamiones(Array.isArray(opciones.camiones) ? opciones.camiones : []);
        setConductores(Array.isArray(opciones.conductores) ? opciones.conductores : []);
        setIdCamion("");
        setIdConductor("");
      })
      .catch((err) => setError(err.message || "No se pudieron cargar las opciones del viaje."))
      .finally(() => setCargando(false));
  }, [open]);

  const enviar = async (event) => {
    event.preventDefault();
    setError("");
    setGuardando(true);
    try {
      await onSubmit({
        id_camion: Number(idCamion),
        id_conductor: Number(idConductor),
        fecha_inicio: new Date(fechaInicio).toISOString(),
        fecha_fin_estimada: new Date(fechaFin).toISOString(),
      });
    } catch (err) {
      setError(err.message || "No se pudo guardar el viaje.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Agregar viaje"
      eyebrow={rutaNombre}
      icon={<AddRoadRoundedIcon />}
      size="md"
      footer={
        <>
          <BotonSecundario onClick={onClose} disabled={guardando}>
            Cancelar
          </BotonSecundario>
          <BotonPrimario type="submit" form="form-viaje" disabled={cargando || guardando}>
            {guardando ? "Guardando..." : "Crear viaje"}
          </BotonPrimario>
        </>
      }
    >
      <form id="form-viaje" onSubmit={enviar} className="grid gap-1">
        {error && (
          <p role="alert" className="mb-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {cargando ? (
          <p className="py-3 text-sm text-subtext">Cargando camiones y conductores...</p>
        ) : (
          <>
            <Campo label="Camión" id="viaje-camion">
              <div className="relative">
                <select
                  id="viaje-camion"
                  required
                  value={idCamion}
                  onChange={(event) => setIdCamion(event.target.value)}
                  className={selectClase}
                >
                  <option value="">Selecciona un camión disponible</option>
                  {camiones.map((camion) => (
                    <option key={camion.id_camion} value={camion.id_camion}>
                      {camion.patente} — {camion.marca} {camion.modelo}
                    </option>
                  ))}
                </select>
                <KeyboardArrowDownRoundedIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtext"
                  fontSize="small"
                />
              </div>
            </Campo>

            <Campo label="Conductor" id="viaje-conductor">
              <div className="relative">
                <select
                  id="viaje-conductor"
                  required
                  value={idConductor}
                  onChange={(event) => setIdConductor(event.target.value)}
                  className={selectClase}
                >
                  <option value="">Selecciona un conductor disponible</option>
                  {conductores.map((conductor) => (
                    <option key={conductor.id_conductor} value={conductor.id_conductor}>
                      {conductor.nombre}
                    </option>
                  ))}
                </select>
                <KeyboardArrowDownRoundedIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtext"
                  fontSize="small"
                />
              </div>
            </Campo>

            {!camiones.length && (
              <p className="mb-2 text-xs text-subtext">No hay camiones disponibles para asignar.</p>
            )}
            {!conductores.length && (
              <p className="mb-2 text-xs text-subtext">No hay conductores activos con licencia vigente.</p>
            )}

            <Campo label="Fecha y hora de inicio" id="viaje-inicio">
              <input
                id="viaje-inicio"
                type="datetime-local"
                required
                value={fechaInicio}
                onChange={(event) => setFechaInicio(event.target.value)}
                className={`${inputClase} w-full`}
              />
            </Campo>

            <Campo label="Término estimado" id="viaje-termino">
              <input
                id="viaje-termino"
                type="datetime-local"
                required
                min={minimoFechaFin}
                value={fechaFin}
                onChange={(event) => setFechaFin(event.target.value)}
                className={`${inputClase} w-full`}
              />
            </Campo>
          </>
        )}
      </form>
    </Modal>
  );
}
