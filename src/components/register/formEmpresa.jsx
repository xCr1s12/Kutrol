"use client";

import { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { subirImagenAPI } from "@/services/client/upload.service";
import {
  obtenerComunas,
  obtenerRegiones,
} from "@/services/client/ubicacion.service";

const INPUT_CLASS =
<<<<<<< HEAD
  "h-11 w-full rounded-[10px] border border-icon bg-background px-3.5 text-sm text-text placeholder:text-subtext/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
=======
  "h-11 w-full rounded-[10px] border border-border bg-brand px-3.5 text-sm text-text placeholder:text-subtext/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)

function SelectField({ label, id, value, onChange, options, placeholder, disabled }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium text-subtext">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${INPUT_CLASS} appearance-none pr-10 disabled:opacity-50 ${
            value ? "" : "text-subtext/60"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
<<<<<<< HEAD
            <option key={option.id} value={option.id} className="text-text bg-background">
=======
            <option key={option.id} value={option.id} className="text-text bg-brand">
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
              {option.nombre}
            </option>
          ))}
        </select>
        <KeyboardArrowDownRoundedIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-subtext/70"
          sx={{ fontSize: 20 }}
        />
      </div>
    </div>
  );
}

function MultiField({ label, name, type, placeholder, addLabel, values, setValues }) {
  const update = (i, v) => setValues(values.map((x, idx) => (idx === i ? v : x)));
  const remove = (i) => setValues(values.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${name}-0`} className="text-xs font-medium text-subtext">
        {label}
      </label>
      {values.map((v, i) => (
        <div key={i} className="relative">
          <input
            id={`${name}-${i}`}
            name={name}
            type={type}
            required={i === 0}
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className={`${INPUT_CLASS} ${i > 0 ? "pr-10" : ""}`}
          />
          {i > 0 && (
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Quitar ${label.toLowerCase()} ${i + 1}`}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext hover:text-text"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => setValues([...values, ""])}
        className="self-start text-xs font-medium text-accent hover:underline"
      >
        {addLabel}
      </button>
    </div>
  );
}

const FormEmpresa = ({
  onBack,
  onSubmit,
  errors = {},
  submitting = false,
}) => {
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [loadingRegiones, setLoadingRegiones] = useState(true);
  const [loadingComunas, setLoadingComunas] = useState(false);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [telefonos, setTelefonos] = useState([""]);
  const [emails, setEmails] = useState([""]);

  useEffect(() => {
    const controller = new AbortController();

    obtenerRegiones(controller.signal)
      .then(setRegiones)
      .catch((error) => {
        if (error.name !== "AbortError") setLocationError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingRegiones(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!region) {
      setComunas([]);
      setComuna("");
      setLoadingComunas(false);
      return;
    }

    const controller = new AbortController();
    setComunas([]);
    setComuna("");
    setLocationError("");
    setLoadingComunas(true);

    obtenerComunas(region, controller.signal)
      .then(setComunas)
      .catch((error) => {
        if (error.name !== "AbortError") setLocationError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingComunas(false);
      });

    return () => controller.abort();
  }, [region]);

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploadedImage(null);
    setUploadError("");
    setUploadingImage(true);

    try {
      const image = await subirImagenAPI(file);
      setUploadedImage(image);
    } catch (error) {
      setUploadError(error.message);
      setPreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmit?.({
      nombre: String(data.get("companyName") || ""),
      rut: String(data.get("rut") || ""),
      direccion: String(data.get("address") || ""),
      id_comuna: Number(comuna),
      url_imagen: uploadedImage?.url || "",
      telefonos: telefonos.map((t) => t.trim()).filter(Boolean),
      emails: emails.map((m) => m.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] my-4">
      {/* Imagen + Nombre / RUT */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-subtext">Imagen</span>
          <label
            htmlFor="image"
<<<<<<< HEAD
            className="group flex size-[130px] cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-dashed border-border bg-background text-xs text-subtext transition-colors hover:border-accent focus-within:border-accent"
=======
            className="group flex size-[130px] cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-dashed border-border bg-brand text-xs text-subtext transition-colors hover:border-accent focus-within:border-accent"
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Vista previa de la imagen" className="size-full object-cover" />
            ) : (
              <>
                <CloudUploadOutlinedIcon
                  aria-hidden="true"
                  className="text-accent"
                  sx={{ fontSize: 28 }}
                />
                Subir imagen
              </>
            )}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              disabled={uploadingImage}
              className="sr-only"
            />
          </label>
          {uploadingImage && (
            <p className="text-xs text-subtext" role="status">
              Subiendo imagen...
            </p>
          )}
          {uploadError && (
            <p className="max-w-[130px] text-xs text-red-500" role="alert">
              {uploadError}
            </p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[18px]">
          <FormField
            label="Nombre de la empresa"
            id="companyName"
            required
            placeholder="Transportes Kutrol SpA"
          />
          <FormField
            label="RUT"
            id="rut"
            required
            placeholder="76.123.456-0"
            error={errors.rut}
          />
        </div>
      </div>

      <FormField
        label="Dirección"
        id="address"
        required
        placeholder="Av. Principal 1234, Of. 5"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Región"
          id="region"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
          options={regiones}
          placeholder="Selecciona una región"
          disabled={loadingRegiones}
        />
        <SelectField
          label="Comuna"
          id="comuna"
          value={comuna}
          onChange={(e) => setComuna(e.target.value)}
          options={comunas}
          placeholder={loadingComunas ? "Cargando comunas..." : "Selecciona una comuna"}
          disabled={!region || loadingComunas}
        />
      </div>
      {locationError && (
        <p className="text-xs text-red-500" role="alert">
          {locationError}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MultiField
          label="Teléfonos"
          name="telefono"
          type="tel"
          placeholder="+56 9 1234 5678"
          addLabel="+ Agregar otro teléfono"
          values={telefonos}
          setValues={setTelefonos}
        />
        <MultiField
          label="Emails"
          name="emailEmpresa"
          type="email"
          placeholder="contacto@empresa.cl"
          addLabel="+ Agregar otro email"
          values={emails}
          setValues={setEmails}
        />
      </div>

      {/* Acciones */}
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
<<<<<<< HEAD
          className="flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-[15px] text-text transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent"
=======
          className="flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-[15px] text-text transition-colors hover:bg-brand/40 focus-visible:outline-2 focus-visible:outline-accent"
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
        >
          <ArrowBackRoundedIcon aria-hidden="true" sx={{ fontSize: 18 }} />
          Atrás
        </button>
        <Button
          type="submit"
          className="flex-1"
          disabled={uploadingImage || submitting || loadingRegiones || loadingComunas}
        >
          {submitting ? "Registrando..." : "Finalizar registro"}
        </Button>
      </div>
      {errors.form && (
        <p className="text-sm text-red-500" role="alert">
          {errors.form}
        </p>
      )}
    </form>
  );
};

export default FormEmpresa;