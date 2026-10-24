import { useState } from "react";
import {
  ArrowBackRounded, PhotoCameraRounded, BusinessRounded, EmailRounded, PhoneRounded, LocationOnRounded,
  MapRounded, LocationCityRounded,
} from "@mui/icons-material";
import { regiones } from "./regiones";
import { tarjeta, campo, bordeError, botonAmarillo, botonIcono, elegirImagen } from "./comun";
import { Campo, Lista } from "./Controles";
import CampoTelefono from "@/components/ui/CampoTelefono";
import MultiField from "@/components/ui/MultiField";
import { LogoEmpresa, icono } from "./VistaEmpresa";
import { formatearRut } from "./validarEmpresa";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const limiteDescripcion = 255;

export default function FormularioEmpresa({ empresa, errores, cambiar, onVolver }) {
  const comunas = regiones.find((r) => r.nombre === empresa.region)?.comunas ?? [];
  const descripcion = empresa.descripcion ?? "";
  const emails = empresa.emails?.length ? empresa.emails : [""];
  const telefonos = empresa.telefonos?.length ? empresa.telefonos : [""];

  function poner(dato, valor) {
    cambiar("empresa", { ...empresa, [dato]: valor });
  }

  function agregarTelefono() {
    poner("telefonos", [...(empresa.telefonos ?? []), ""]);
  }

  function quitarTelefono(indice) {
    poner(
      "telefonos",
      (empresa.telefonos ?? []).filter((_, posicion) => posicion !== indice),
    );
  }

  function elegirRegion(e) {
    // al cambiar de region la comuna anterior ya no sirve
    cambiar("empresa", { ...empresa, region: e.target.value, comuna: "" });
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
      <div className="flex items-center gap-3 mb-4">
        <button className={botonIcono} aria-label="Volver al perfil" onClick={onVolver}>
          <ArrowBackRounded className="text-icon" sx={{ fontSize: 20 }} aria-hidden="true" />
        </button>
        <h2 className="text-text font-bold text-lg">Editar empresa</h2>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <LogoEmpresa logo={empresa.logo} />
        <div className="flex flex-col items-start gap-2">
          <label className={`${botonAmarillo} cursor-pointer`}>
            <PhotoCameraRounded fontSize="small" aria-hidden="true" />
            {empresa.logo ? "Cambiar logo" : "Subir logo"}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => elegirImagen(e, (url) => poner("logo", url))}
              hidden
            />
          </label>
          <p className="text-xs text-subtext">Recomendado: PNG o JPG transparente de 500x500px</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Campo
          titulo="Nombre de la empresa"
          icono={<BusinessRounded {...icono} />}
          type="text"
          maxLength={80}
          placeholder="Transportes Chiloé SpA"
          value={empresa.nombre}
          error={errores.nombre}
          onChange={(e) => poner("nombre", e.target.value)}
        />
        <Campo
          titulo="RUT"
          type="text"
          placeholder="12.345.678-5"
          value={empresa.rut}
          error={errores.rut}
          onChange={(e) => poner("rut", formatearRut(e.target.value))}
        />
        <Campo titulo="Correos de contacto" icono={<EmailRounded {...icono} />}>
          <MultiField
            name="emailEmpresa"
            campo="Correo"
            type="email"
            placeholder="contacto@empresa.cl"
            addLabel="+ Agregar otro correo"
            values={emails}
            setValues={(lista) => poner("emails", lista)}
            error={errores.emails}
          />
        </Campo>

        <Campo titulo="Teléfonos" icono={<PhoneRounded {...icono} />} error={errores.telefonos}>
          <div className="flex flex-col gap-2">
            {telefonos.map((telefono, indice) => (
              <div key={indice} className="flex items-stretch gap-2">
                <div className="min-w-0 flex-1">
                  <CampoTelefono
                    valor={telefono}
                    indice={indice}
                    onChange={(nuevo) => {
                      const lista = [...(empresa.telefonos ?? [])];
                      lista[indice] = nuevo;
                      poner("telefonos", lista);
                    }}
                    error={errores.telefonos}
                  />
                </div>
                {telefonos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => quitarTelefono(indice)}
                    aria-label={`Quitar teléfono ${indice + 1}`}
                    className="px-2 text-subtext hover:text-text"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={agregarTelefono}
              className="self-start text-xs font-medium text-accent hover:underline"
            >
              + Agregar otro teléfono
            </button>
          </div>
        </Campo>

        <Campo titulo="Región" icono={<MapRounded {...icono} />}>
          <Lista
            opciones={regiones.map((r) => r.nombre)}
            vacio="Selecciona una región"
            value={empresa.region}
            onChange={elegirRegion}
          />
        </Campo>

        <Campo titulo="Comuna" icono={<LocationCityRounded {...icono} />} error={errores.comuna}>
          <Lista
            opciones={comunas}
            vacio={empresa.region ? "Selecciona una comuna" : "Primero elige una región"}
            className={errores.comuna ? bordeError : ""}
            value={empresa.comuna}
            disabled={!empresa.region}
            onChange={(e) => poner("comuna", e.target.value)}
          />
        </Campo>

        <Campo
          className="md:col-span-2"
          titulo="Dirección"
          icono={<LocationOnRounded {...icono} />}
          type="text"
          maxLength={120}
          placeholder="Calle 123, oficina 4"
          value={empresa.direccion}
          onChange={(e) => poner("direccion", e.target.value)}
        />

        <Campo className="md:col-span-2" titulo="Descripción de la empresa">
          <textarea
            rows={4}
            maxLength={limiteDescripcion}
            className={`${campo} resize-none`}
            placeholder="Describe brevemente a qué se dedica la empresa"
            value={descripcion}
            onChange={(e) => poner("descripcion", e.target.value)}
          />
          <span className="self-end font-normal text-subtext">
            {descripcion.length}/{limiteDescripcion}
          </span>
        </Campo>
      </div>
    </section>
  );
}