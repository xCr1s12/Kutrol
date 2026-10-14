import CamposFormularioVehiculo from "@/components/gestion/FormFieldVehiculo";
import { useState } from "react";

/**
 * Props:
 * - onSubmit(datos): recibe { patente, marca, modelo, ano, combustible, capacidad_carga, estado }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioVehiculo = ({ onSubmit, onCancel }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formatearDetallesError = (details) => {
    if (!Array.isArray(details)) return "";

    const etiquetas = {
      id_flota: "Flota",
      patente: "Patente",
      codigo_dispositivo: "Código del dispositivo",
      marca: "Marca",
      modelo: "Modelo",
      ano: "Año",
      capacidad_carga_kg: "Capacidad de carga",
      capacidad_estanque_l: "Capacidad del estanque",
      tipo_combustible: "Tipo de combustible",
      estado: "Estado",
    };

    return details
      .map(({ campo, mensaje }) =>
        mensaje ? `${etiquetas[campo] ?? campo}: ${mensaje}` : "",
      )
      .filter(Boolean)
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const datos = {
      id_flota: Number(formData.get("id_flota")),
      patente: formData.get("patente").trim(),
      codigo_dispositivo: formData.get("codigo_dispositivo").trim(),
      marca: formData.get("marca").trim(),
      modelo: formData.get("modelo").trim(),
      ano: Number(formData.get("ano")),
      capacidad_carga_kg: Number(formData.get("capacidad_carga_kg")),
      capacidad_estanque_l: Number(formData.get("capacidad_estanque_l")),
      tipo_combustible: formData.get("tipo_combustible"),
      estado: formData.get("estado"),
    };

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/data/vehiculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        const detalle = formatearDetallesError(result.error?.details);
        throw new Error(
          detalle ||
            result.error?.message ||
            result.mensaje ||
            "No fue posible registrar el vehículo.",
        );
      }

      await onSubmit(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al registrar el vehículo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Columna izquierda: campos */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-brand">Detalles</h3>

        <CamposFormularioVehiculo />

        {error && (
          <p role="alert" className="text-sm text-accent-dark">
            {error}
          </p>
        )}

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md px-6 py-2.5 text-xs font-semibold text-brand transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {submitting ? "Guardando..." : "Finalizar"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon"
          >
            Cancelar
          </button>
        </div>
      </div>

    </form>
  );
};

export default FormularioVehiculo;