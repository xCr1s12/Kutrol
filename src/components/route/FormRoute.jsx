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
  obtenerRegiones,
} from "@/services/client/ubicacion.service";

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
  const [regionOrigen, setRegionOrigen] = useState("");
  const [regionDestino, setRegionDestino] = useState("");
  const [comunaOrigen, setComunaOrigen] = useState("");
  const [comunaDestino, setComunaDestino] = useState("");
  const [distancia, setDistancia] = useState("");
  const [cargandoRegiones, setCargandoRegiones] = useState(true);
  const [cargandoOrigen, setCargandoOrigen] = useState(false);
  const [cargandoDestino, setCargandoDestino] = useState(false);
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

  useEffect(() => {
    if (!regionOrigen) {
      setComunasOrigen([]);
      setComunaOrigen("");
      setCargandoOrigen(false);
      return;
    }

    const controller = new AbortController();
    setComunasOrigen([]);
    setComunaOrigen("");
    setErrorUbicacion("");
    setCargandoOrigen(true);

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
    if (!regionDestino) {
      setComunasDestino([]);
      setComunaDestino("");
      setCargandoDestino(false);
      return;
    }

    const controller = new AbortController();
    setComunasDestino([]);
    setComunaDestino("");
    setErrorUbicacion("");
    setCargandoDestino(true);

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

    onSubmit({
      origen,
      destino,
      distancia: Number(distancia),
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
          <BotonSecundario
            onClick={onClose}
            className="rounded-full border border-icon bg-background px-4 py-1.5 text-xs text-brand hover:brightness-95"
          >
            Cancelar
          </BotonSecundario>
          <BotonPrimario type="submit" form="form-ruta">
            Agregar ruta
          </BotonPrimario>
        </>
      }
    >
      <form
        id="form-ruta"
        onSubmit={handleSubmit}
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
              onRegionChange={setRegionOrigen}
              onComunaChange={setComunaOrigen}
            />
            <CampoUbicacion
              id="destino"
              label="destino"
              region={regionDestino}
              comuna={comunaDestino}
              regiones={regiones}
              comunas={comunasDestino}
              loadingComunas={cargandoDestino}
              onRegionChange={setRegionDestino}
              onComunaChange={setComunaDestino}
            />
            <Campo label="Distancia (km)" id="distancia">
              <input
                id="distancia"
                name="distancia"
                type="number"
                min="0.1"
                step="0.1"
                required
                value={distancia}
                onChange={(event) => setDistancia(event.target.value)}
                placeholder="Ej. 100"
                className={selectClase}
              />
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