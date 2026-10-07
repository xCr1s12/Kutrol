import CamposFormularioVehiculo from "@/components/gestion/FormFieldVehiculo";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> FrontEnd

/**
 * Props:
 * - onSubmit(datos): recibe { patente, marca, modelo, ano, combustible, capacidad_carga, estado }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioVehiculo = ({ onSubmit, onCancel }) => {
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const datos = {
      patente: formData.get("patente").trim(),
      marca: formData.get("marca").trim(),
      modelo: formData.get("modelo").trim(),
      ano: Number(formData.get("ano")),
      combustible: formData.get("combustible"),
      capacidad_carga: Number(formData.get("capacidad_carga")),
      estado: formData.get("estado").trim(),
    };
    onSubmit(datos);
=======
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
>>>>>>> FrontEnd
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Columna izquierda: campos */}
      <div className="flex flex-col gap-4">
<<<<<<< HEAD
        <h3 className="text-sm font-bold text-brand">Detalles</h3>

        <CamposFormularioVehiculo />

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-md px-6 py-2.5 text-xs font-semibold text-brand transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Finalizar
=======
        <h3 className="text-sm font-bold text-text dark:text-ink">
          Detalles
        </h3>

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
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand light:text-white transition-colors light:hover:bg-copper-dark light:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-gold dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-gold"
          >
            {submitting ? "Guardando..." : "Finalizar"}
>>>>>>> FrontEnd
          </button>
          <button
            type="button"
            onClick={onCancel}
<<<<<<< HEAD
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon"
=======
            disabled={submitting}
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-linen light:text-ink light:hover:bg-linen-hover light:hover:text-cream dark:bg-moss dark:text-cream dark:hover:bg-deep"
>>>>>>> FrontEnd
          >
            Cancelar
          </button>
        </div>
      </div>

    </form>
  );
};

export default FormularioVehiculo;