"use client";

import { useEffect, useRef, useState } from "react";
import FormField from "@/components/ui/FormField";

const CLASE_CAMPO =
  "w-full rounded-md border border-icon bg-background px-4 py-2.5 text-sm text-text placeholder:text-subtext outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60";

/**
 * Props:
 * - onCreada(flota): se llama con la flota creada por POST /api/flota
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioFlota = ({ onCreada, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [idTipoFlota, setIdTipoFlota] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [tipos, setTipos] = useState([]);
  const [cargandoTipos, setCargandoTipos] = useState(true);
  const [errorTipos, setErrorTipos] = useState("");

  const [erroresCampo, setErroresCampo] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  const nombreRef = useRef(null);

  useEffect(() => {
    nombreRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarTipos() {
      try {
        const response = await fetch("/api/tipos-flota", {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error?.message ||
              data?.error ||
              data?.message ||
              "No se pudieron cargar los tipos de flota",
          );
        }
        if (!Array.isArray(data)) {
          throw new Error("La lista de tipos de flota no tiene un formato válido");
        }

        setTipos(data);
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorTipos(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los tipos de flota",
        );
      } finally {
        if (!controller.signal.aborted) setCargandoTipos(false);
      }
    }

    cargarTipos();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setErrorGeneral("");
    setErroresCampo({});

    try {
      const response = await fetch("/api/flota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          id_tipo_flota: Number(idTipoFlota),
          descripcion: descripcion.trim(),
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const detalles = Array.isArray(data?.error?.details)
          ? data.error.details
          : [];
        const porCampo = {};
        for (const { campo, mensaje } of detalles) {
          if (campo && mensaje) porCampo[campo] = mensaje;
        }
        setErroresCampo(porCampo);

        throw new Error(
          data?.error?.message ||
            data?.message ||
            "No se pudo crear la flota.",
        );
      }

      onCreada?.(data);
    } catch (error) {
      setErrorGeneral(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear la flota.",
      );
    } finally {
      setEnviando(false);
    }
  };

  const marcadorTipos = cargandoTipos
    ? "Cargando tipos..."
    : "Selecciona un tipo de flota";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-text">Detalles</h3>

      <FormField label="Nombre" id="nombre" required error={erroresCampo.nombre}>
        <input
          ref={nombreRef}
          id="nombre"
          name="nombre"
          type="text"
          required
          maxLength={50}
          placeholder="Flota Norte"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          disabled={enviando}
          aria-invalid={erroresCampo.nombre ? true : undefined}
          aria-describedby={erroresCampo.nombre ? "nombre-error" : undefined}
          className={CLASE_CAMPO}
        />
      </FormField>

      <FormField
        label="Tipo de flota"
        id="id_tipo_flota"
        required
        error={erroresCampo.id_tipo_flota}
      >
        <select
          id="id_tipo_flota"
          name="id_tipo_flota"
          required
          value={idTipoFlota}
          onChange={(event) => setIdTipoFlota(event.target.value)}
          disabled={enviando || cargandoTipos || Boolean(errorTipos)}
          aria-invalid={erroresCampo.id_tipo_flota ? true : undefined}
          aria-describedby={
            erroresCampo.id_tipo_flota ? "id_tipo_flota-error" : undefined
          }
          className={`${CLASE_CAMPO} appearance-none pr-10`}
        >
          <option value="" disabled>
            {marcadorTipos}
          </option>
          {tipos.map((tipo) => (
            <option key={tipo.id_tipo_flota} value={tipo.id_tipo_flota}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </FormField>

      {errorTipos && (
        <p role="alert" className="text-sm text-accent-dark">
          {errorTipos}
        </p>
      )}

      <FormField
        label="Descripción (opcional)"
        id="descripcion"
        error={erroresCampo.descripcion}
      >
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          maxLength={255}
          placeholder="Para qué se usará esta flota"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          disabled={enviando}
          aria-invalid={erroresCampo.descripcion ? true : undefined}
          aria-describedby={
            erroresCampo.descripcion ? "descripcion-error" : undefined
          }
          className={`${CLASE_CAMPO} resize-none`}
        />
      </FormField>

      {errorGeneral && (
        <p role="alert" className="text-sm text-accent-dark">
          {errorGeneral}
        </p>
      )}

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 dark:bg-gold dark:text-brand"
        >
          {enviando ? "Creando flota..." : "Crear flota"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={enviando}
          className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 dark:bg-moss dark:text-cream"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioFlota;
