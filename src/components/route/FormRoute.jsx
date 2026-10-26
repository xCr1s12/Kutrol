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
import {
  obtenerComunas,
  obtenerComunasIntermedias,
  obtenerRegiones,
} from "@/services/client/ubicacion.service";
import { calcularDistanciaKm } from "@/lib/distance";

const selectClase = `${inputClase} w-full appearance-none pr-10`;

function CampoUbicacion({
  id,
  label,
  region,
  comuna,
  regiones,
  comunas,
  loadingComunas,
  onRegionChange,
  onComunaChange,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Campo label={`Región de ${label}`} id={`${id}-region`}>
        <div className="relative">
          <select
            id={`${id}-region`}
            value={region}
            onChange={(event) => onRegionChange(event.target.value)}
            required
            className={selectClase}
          >
            <option value="">Selecciona una región</option>
            {regiones.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.nombre}
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

      <Campo label={`Comuna de ${label}`} id={`${id}-comuna`}>
        <div className="relative">
          <select
            id={`${id}-comuna`}
            value={comuna}
            onChange={(event) => onComunaChange(event.target.value)}
            disabled={!region || loadingComunas}
            required
            className={`${selectClase} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="">
              {loadingComunas ? "Cargando comunas..." : "Selecciona una comuna"}
            </option>
            {comunas.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.nombre}
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
    </div>
  );
}

export default function FormRoute({ open, onClose, onSubmit }) {
  const [regiones, setRegiones] = useState([]);
  const [comunasOrigen, setComunasOrigen] = useState([]);
  const [comunasDestino, setComunasDestino] = useState([]);
  const [comunasIntermedias, setComunasIntermedias] = useState([]);
  const [regionOrigen, setRegionOrigen] = useState("");
  const [regionDestino, setRegionDestino] = useState("");
  const [comunaOrigen, setComunaOrigen] = useState("");
  const [comunaDestino, setComunaDestino] = useState("");
  const [puntosControl, setPuntosControl] = useState([]);
  const [puntoControlPendiente, setPuntoControlPendiente] = useState("");
  const [cargandoRegiones, setCargandoRegiones] = useState(true);
  const [cargandoOrigen, setCargandoOrigen] = useState(false);
  const [cargandoDestino, setCargandoDestino] = useState(false);
  const [cargandoIntermedias, setCargandoIntermedias] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    obtenerRegiones(controller.signal)
      .then(setRegiones)
      .catch((error) => {
        if (error.name !== "AbortError") setErrorUbicacion(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargandoRegiones(false);
      });

    return () => controller.abort();
  }, []);

  const handleRegionOrigenChange = (siguienteRegion) => {
    if (siguienteRegion === regionOrigen) return;
    setRegionOrigen(siguienteRegion);
    setComunasOrigen([]);
    setComunaOrigen("");
    setComunasIntermedias([]);
    setPuntosControl([]);
    setPuntoControlPendiente("");
    setCargandoIntermedias(false);
    if (siguienteRegion) setErrorUbicacion("");
    setCargandoOrigen(Boolean(siguienteRegion));
  };

  const handleRegionDestinoChange = (siguienteRegion) => {
    if (siguienteRegion === regionDestino) return;
    setRegionDestino(siguienteRegion);
    setComunasDestino([]);
    setComunaDestino("");
    setComunasIntermedias([]);
    setPuntosControl([]);
    setPuntoControlPendiente("");
    setCargandoIntermedias(false);
    if (siguienteRegion) setErrorUbicacion("");
    setCargandoDestino(Boolean(siguienteRegion));
  };

  useEffect(() => {
    if (!regionOrigen) return;

    const controller = new AbortController();

    obtenerComunas(regionOrigen, controller.signal)
      .then(setComunasOrigen)
      .catch((error) => {
        if (error.name !== "AbortError") setErrorUbicacion(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargandoOrigen(false);
      });

    return () => controller.abort();
  }, [regionOrigen]);

  useEffect(() => {
    if (!regionDestino) return;

    const controller = new AbortController();

    obtenerComunas(regionDestino, controller.signal)
      .then(setComunasDestino)
      .catch((error) => {
        if (error.name !== "AbortError") setErrorUbicacion(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargandoDestino(false);
      });

    return () => controller.abort();
  }, [regionDestino]);

  useEffect(() => {
    if (!comunaOrigen || !comunaDestino) return;

    const controller = new AbortController();

    obtenerComunasIntermedias(comunaOrigen, comunaDestino, controller.signal)
      .then(setComunasIntermedias)
      .catch((error) => {
        if (error.name !== "AbortError") setErrorUbicacion(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargandoIntermedias(false);
      });

    return () => controller.abort();
  }, [comunaOrigen, comunaDestino]);

  const handleComunaOrigenChange = (siguienteComuna) => {
    setComunaOrigen(siguienteComuna);
    setPuntosControl([]);
    setPuntoControlPendiente("");
    setComunasIntermedias([]);
    setCargandoIntermedias(Boolean(siguienteComuna && comunaDestino));
    setErrorUbicacion("");
  };

  const handleComunaDestinoChange = (siguienteComuna) => {
    setComunaDestino(siguienteComuna);
    setPuntosControl([]);
    setPuntoControlPendiente("");
    setComunasIntermedias([]);
    setCargandoIntermedias(Boolean(comunaOrigen && siguienteComuna));
    setErrorUbicacion("");
  };

  const origenSeleccionado = comunasOrigen.find(
    (opcion) => String(opcion.id) === comunaOrigen,
  );
  const destinoSeleccionado = comunasDestino.find(
    (opcion) => String(opcion.id) === comunaDestino,
  );
  const distanciaCalculada =
    origenSeleccionado && destinoSeleccionado
      ? calcularDistanciaKm(origenSeleccionado, destinoSeleccionado)
      : null;
  const distancia =
    Number.isFinite(distanciaCalculada) && distanciaCalculada > 0
      ? distanciaCalculada.toFixed(2)
      : "";
  const errorDistancia =
    origenSeleccionado && destinoSeleccionado && !distancia
      ? "No hay coordenadas válidas para calcular esta distancia."
      : "";

  const puntosDisponiblesParaAgregar = comunasIntermedias.filter(
    (comuna) =>
      !puntosControl.some((punto) => String(punto.id) === String(comuna.id)),
  );

  const agregarPuntoControl = () => {
    const punto = puntosDisponiblesParaAgregar.find(
      (comuna) => String(comuna.id) === puntoControlPendiente,
    );
    if (!punto) return;

    setPuntosControl((actuales) => [...actuales, punto]);
    setPuntoControlPendiente("");
    setErrorUbicacion("");
  };

  const quitarPuntoControl = (id) => {
    setPuntosControl((actuales) =>
      actuales.filter((punto) => String(punto.id) !== String(id)),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const origen = comunasOrigen.find(
      (opcion) => String(opcion.id) === comunaOrigen,
    );
    const destino = comunasDestino.find(
      (opcion) => String(opcion.id) === comunaDestino,
    );

    if (!origen || !destino) {
      setErrorUbicacion("Selecciona una comuna de origen y una de destino.");
      return;
    }

    if (puntosControl.length === 0) {
      setErrorUbicacion("Agrega al menos una ciudad como punto de control.");
      return;
    }

    const km = Number(distancia);
    if (!Number.isFinite(km) || km <= 0) {
      setErrorUbicacion("No se pudo calcular la distancia entre las ciudades.");
      return;
    }

    onSubmit({
      origen,
      destino,
      puntosControl,
      distancia: km,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="route-form-modal"
      title="Agregar ruta"
      eyebrow="RUTAS"
      icon={<AddRoadRoundedIcon />}
      size="lg"
      footer={
        <>
          <BotonSecundario onClick={onClose}>
            Cancelar
          </BotonSecundario>
          <BotonPrimario
            type="submit"
            form="form-ruta"
            disabled={!distancia || puntosControl.length === 0}
          >
            Agregar ruta
          </BotonPrimario>
        </>
      }
    >
      <form
        id="form-ruta"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        {cargandoRegiones ? (
          <p className="text-sm text-subtext">Cargando regiones...</p>
        ) : regiones.length === 0 && !errorUbicacion ? (
          <p className="text-sm text-subtext">
            No hay regiones disponibles para seleccionar.
          </p>
        ) : (
          <>
            <CampoUbicacion
              id="origen"
              label="origen"
              region={regionOrigen}
              comuna={comunaOrigen}
              regiones={regiones}
              comunas={comunasOrigen}
              loadingComunas={cargandoOrigen}
              onRegionChange={handleRegionOrigenChange}
              onComunaChange={handleComunaOrigenChange}
            />
            <CampoUbicacion
              id="destino"
              label="destino"
              region={regionDestino}
              comuna={comunaDestino}
              regiones={regiones}
              comunas={comunasDestino}
              loadingComunas={cargandoDestino}
              onRegionChange={handleRegionDestinoChange}
              onComunaChange={handleComunaDestinoChange}
            />
            <Campo label="Punto de control" id="punto-control">
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <select
                    id="punto-control"
                    value={puntoControlPendiente}
                    onChange={(event) =>
                      setPuntoControlPendiente(event.target.value)
                    }
                    disabled={
                      !comunaOrigen ||
                      !comunaDestino ||
                      cargandoIntermedias ||
                      puntosDisponiblesParaAgregar.length === 0
                    }
                    className={`${selectClase} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <option value="">
                      {cargandoIntermedias
                        ? "Buscando ciudades intermedias..."
                        : puntosDisponiblesParaAgregar.length > 0
                          ? "Selecciona una ciudad"
                          : puntosControl.length > 0
                            ? "Ya agregaste todas las ciudades"
                            : "No hay ciudades intermedias disponibles"}
                    </option>
                    {puntosDisponiblesParaAgregar.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.nombre}
                      </option>
                    ))}
                  </select>
                  <KeyboardArrowDownRoundedIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtext"
                    fontSize="small"
                  />
                </div>
                <button
                  type="button"
                  onClick={agregarPuntoControl}
                  disabled={!puntoControlPendiente}
                  className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-brand disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Agregar
                </button>
              </div>
              {puntosControl.length > 0 && (
                <ol className="mt-2 flex flex-col gap-2">
                  {puntosControl.map((punto, indice) => (
                    <li
                      key={punto.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-icon px-3 py-2 text-xs"
                    >
                      <span>
                        {indice + 1}. {punto.nombre}
                      </span>
                      <button
                        type="button"
                        onClick={() => quitarPuntoControl(punto.id)}
                        aria-label={`Quitar ${punto.nombre} de los puntos de control`}
                        className="text-red-600 hover:underline"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </Campo>
            <Campo
              label="Distancia aproximada en línea recta (km)"
              id="distancia"
              error={errorDistancia}
            >
              <input
                id="distancia"
                name="distancia"
                type="text"
                readOnly
                aria-live="polite"
                value={distancia}
                placeholder="Selecciona origen y destino"
                className={`${selectClase} read-only:cursor-not-allowed read-only:opacity-80`}
              />
              <span className="text-xs text-subtext">
                Se calcula automáticamente con las coordenadas de ambas comunas.
              </span>
            </Campo>
          </>
        )}

        {errorUbicacion && (
          <p role="alert" className="text-sm text-red-600">
            {errorUbicacion}
          </p>
        )}
      </form>
    </Modal>
  );
}