import CamposFormularioVehiculo from "@/components/gestion/FormFieldVehiculo";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> FrontEnd
=======
import { useState } from "react";
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)

/**
 * Props:
 * - onSubmit(datos): recibe { patente, marca, modelo, ano, combustible, capacidad_carga, estado }
 * - onCancel(): se llama al presionar "Cancelar"
 */
const FormularioVehiculo = ({ onSubmit, onCancel }) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const handleSubmit = (e) => {
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
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
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
<<<<<<< HEAD
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
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)

    setSubmitting(true);
    setError("");

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch("/api/data/vehiculos", {
=======
      const response = await fetch("/api/vehiculos", {
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
=======
      const response = await fetch("/api/data/vehiculos", {
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
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
<<<<<<< HEAD
<<<<<<< HEAD
          );

=======
        );
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
=======
          );

>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
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
<<<<<<< HEAD
>>>>>>> FrontEnd
=======
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Columna izquierda: campos */}
      <div className="flex flex-col gap-4">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <h3 className="text-sm font-bold text-brand">Detalles</h3>
=======
        <h3 className="text-sm font-bold text-text dark:text-[#1A1A1A]">
=======
        <h3 className="text-sm font-bold text-text dark:text-ink">
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
          Detalles
        </h3>
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)

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
            className="rounded-md bg-accent px-6 py-2.5 text-xs font-semibold text-brand transition-colors light:hover:bg-copper-dark light:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-gold dark:text-brand dark:hover:opacity-90 dark:focus-visible:outline-gold"
          >
<<<<<<< HEAD
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
=======
            {submitting ? "Guardando..." : "Finalizar"}
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
          </button>
          <button
            type="button"
            onClick={onCancel}
<<<<<<< HEAD
<<<<<<< HEAD
=======
            disabled={submitting}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon"
=======
            disabled={submitting}
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-linen light:text-ink light:hover:bg-linen-hover light:hover:text-cream dark:bg-moss dark:text-cream dark:hover:bg-deep"
>>>>>>> FrontEnd
=======
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-[#EAE5DA] light:text-[#1A1A1A] light:hover:bg-[#D8CDBA] light:hover:text-[#FDFBF7] dark:bg-[#314139] dark:text-[#FDFBF7] dark:hover:bg-[#20332B]"
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
=======
            className="rounded-md bg-text px-6 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-icon light:bg-linen light:text-ink light:hover:bg-linen-hover light:hover:text-cream dark:bg-moss dark:text-cream dark:hover:bg-deep"
>>>>>>> 7fb52cf (refactor(theme): replace literal colors with design tokens)
          >
            Cancelar
          </button>
        </div>
      </div>

    </form>
  );
};

export default FormularioVehiculo;