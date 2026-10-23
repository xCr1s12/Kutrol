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
import { formatearRut, validateRut } from "@/lib/validateRut";
import MultiField from "@/components/ui/MultiField";
import CampoTelefono from "@/components/ui/CampoTelefono";

const CAMPO_BASE =
  "h-11 rounded-[10px] border border-icon bg-background px-3.5 text-sm text-text placeholder:text-subtext/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const INPUT_CLASS = `w-full ${CAMPO_BASE}`;

function SelectField({ label, id, value, onChange, options, placeholder, disabled, error }) {
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
            <option key={option.id} value={option.id} className="text-text bg-background">
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
      {error && <p className="text-xs text-accent-dark">{error}</p>}
    </div>
  );
}

const VACIO = {
  nombre: "",
  rut: "",
  direccion: "",
  region: "",
  comuna: "",
  descripcion: "",
  telefonos: [""],
  emails: [""],
  url_imagen: "",
};

const CAMPOS = {
  nombre: "companyName",
  rut: "rut",
  direccion: "address",
  region: "region",
  comuna: "comuna",
  telefono: "telefono-0",
  email: "emailEmpresa-0",
};

const FormEmpresa = ({
  defaults = {},
  onCambio,
  onBack,
  onSubmit,
  errors = {},
  submitting = false,
}) => {
  const [valores, setValores] = useState(() => ({
    ...VACIO,
    ...defaults,
    telefonos: defaults.telefonos?.length ? defaults.telefonos : [""],
    emails: defaults.emails?.length ? defaults.emails : [""],
  }));
  const [preview, setPreview] = useState(defaults.url_imagen || null);
  const [uploadError, setUploadError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [loadingRegiones, setLoadingRegiones] = useState(true);
  const [loadingComunas, setLoadingComunas] = useState(false);

  const region = valores.region;
  const comuna = valores.comuna;

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
    if (!region) return;

    const controller = new AbortController();

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

  useEffect(() => {
    const primero = Object.keys(errors).find((campo) => CAMPOS[campo]);
    if (primero) document.getElementById(CAMPOS[primero])?.focus();
  }, [errors]);

  function poner(campo, valor) {
    const nuevo = { ...valores, [campo]: valor };
    setValores(nuevo);
    onCambio?.(nuevo);
  }

  function elegirRegion(event) {
    const siguienteRegion = event.target.value;
    const nuevo = { ...valores, region: siguienteRegion, comuna: "" };
    setValores(nuevo);
    onCambio?.(nuevo);
    setComunas([]);
    if (siguienteRegion) setLocationError("");
    setLoadingComunas(Boolean(siguienteRegion));
  }

  function actualizarTelefonos(lista) {
    const nuevo = { ...valores, telefonos: lista };
    setValores(nuevo);
    onCambio?.(nuevo);
  }

  function cambiarTelefono(indice, valor) {
    actualizarTelefonos(
      valores.telefonos.map((t, i) => (i === indice ? valor : t)),
    );
  }

  function quitarTelefono(indice) {
    actualizarTelefonos(
      valores.telefonos.filter((_, posicion) => posicion !== indice),
    );
  }

  async function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploadError("");
    setUploadingImage(true);

    try {
      const image = await subirImagenAPI(file);
      poner("url_imagen", image.url || "");
      setPreview(image.url || null);
    } catch (error) {
      setUploadError(error.message);
      setPreview(defaults.url_imagen || null);
    } finally {
      setUploadingImage(false);
    }
  }

  function enviar(event) {
    event.preventDefault();
    onSubmit?.({
      ...valores,
      id_comuna: Number(valores.comuna),
      telefonos: valores.telefonos.filter(Boolean),
      emails: valores.emails.map((m) => m.trim()).filter(Boolean),
    });
  }

  const errorRut = valores.rut ? validateRut(valores.rut) : "";
  const pistaRut = !valores.rut
    ? "Puede ser el RUT de la empresa o uno personal"
    : errorRut || "RUT válido";

  return (
    <form noValidate onSubmit={enviar} className="flex flex-col gap-[18px] my-4">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-subtext">Imagen</span>
          <label
            htmlFor="image"
            className="group flex size-[130px] cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-dashed border-border bg-background text-xs text-subtext transition-colors hover:border-accent focus-within:border-accent"
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
            value={valores.nombre}
            onChange={(event) => poner("nombre", event.target.value)}
            error={errors.nombre}
          />
          <FormField
            label="RUT"
            id="rut"
            required
            placeholder="12.345.678-5"
            hint={pistaRut}
            error={errors.rut}
            value={valores.rut}
            onChange={(event) => poner("rut", formatearRut(event.target.value))}
          />
        </div>
      </div>

      <FormField
        label="Dirección"
        id="address"
        required
        placeholder="Av. Principal 1234, Of. 5"
        value={valores.direccion}
        onChange={(event) => poner("direccion", event.target.value)}
        error={errors.direccion}
      />

      <FormField
        label="Descripción de la empresa (opcional)"
        id="descripcion"
        type="textarea"
        rows={3}
        maxLength={255}
        placeholder="A qué se dedica la empresa"
        value={valores.descripcion ?? ""}
        onChange={(event) => poner("descripcion", event.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Región"
          id="region"
          value={region}
          onChange={elegirRegion}
          options={regiones}
          placeholder="Selecciona una región"
          disabled={loadingRegiones}
          error={errors.region}
        />
        <SelectField
          label="Comuna"
          id="comuna"
          value={comuna}
          onChange={(event) => poner("comuna", event.target.value)}
          options={comunas}
          placeholder={loadingComunas ? "Cargando comunas..." : "Selecciona una comuna"}
          disabled={!region || loadingComunas}
          error={errors.comuna}
        />
      </div>
      {locationError && (
        <p className="text-xs text-red-500" role="alert">
          {locationError}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex min-w-0 flex-col gap-3">
          <span className="text-xs font-medium text-subtext">Teléfono</span>

          {valores.telefonos.map((telefono, indice) => (
            <div key={indice} className="flex items-stretch gap-2">
              <div className="min-w-0 flex-1">
                <CampoTelefono
                  valor={telefono}
                  indice={indice}
                  onChange={(nuevo) => cambiarTelefono(indice, nuevo)}
                  error={indice === 0 ? errors.telefonos : ""}
                />
              </div>
              {indice > 0 && (
                <button
                  type="button"
                  onClick={() => quitarTelefono(indice)}
                  aria-label={`Quitar teléfono ${indice + 1}`}
                  className="shrink-0 px-2 text-subtext hover:text-text"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <p className="text-xs text-subtext">
            Elige el país de cada número. Puedes pegar el número completo.
          </p>

          {errors.telefonos && (
            <p className="text-xs text-accent-dark">{errors.telefonos}</p>
          )}

          <button
            type="button"
            onClick={() => actualizarTelefonos([...valores.telefonos, ""])}
            className="self-start text-xs font-medium text-accent hover:underline"
          >
            + Agregar otro teléfono
          </button>
        </div>

        <div className="min-w-0">
          <MultiField
            label="Emails"
            name="emailEmpresa"
            type="email"
            placeholder="contacto@empresa.cl"
            addLabel="+ Agregar otro email"
            values={valores.emails}
            setValues={(emails) => poner("emails", emails)}
            error={errors.emails}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onBack?.(valores)}
          disabled={submitting}
          className="flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-[15px] text-text transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent"
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
