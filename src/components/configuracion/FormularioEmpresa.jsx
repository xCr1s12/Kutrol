import {
  ArrowBackRounded, PhotoCameraRounded, BusinessRounded, EmailRounded, PhoneRounded, LocationOnRounded,
<<<<<<< HEAD
  MapRounded, LocationCityRounded,
=======
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
} from "@mui/icons-material";
import { regiones } from "./regiones";
import { tarjeta, campo, bordeError, botonAmarillo, botonIcono, elegirImagen } from "./comun";
import { Campo, Lista } from "./Controles";
import { LogoEmpresa, icono } from "./VistaEmpresa";
import { formatearRut } from "./validarEmpresa";

const limiteDescripcion = 300;

<<<<<<< HEAD
export default function FormularioEmpresa({ empresa, errores, cambiar, onVolver }) {
=======
export default function FormularioEmpresa({ empresa, errores, cambiar, nueva, onVolver }) {
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
  const comunas = regiones.find((r) => r.nombre === empresa.region)?.comunas ?? [];

  function poner(dato, valor) {
    cambiar("empresa", { ...empresa, [dato]: valor });
  }

  function elegirRegion(e) {
    // al cambiar de region la comuna anterior ya no sirve
    cambiar("empresa", { ...empresa, region: e.target.value, comuna: "" });
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
      <div className="flex items-center gap-3 mb-4">
        <button className={botonIcono} aria-label="Volver al perfil" onClick={onVolver}>
<<<<<<< HEAD
          <ArrowBackRounded className="text-icon" sx={{ fontSize: 20 }} aria-hidden="true" />
        </button>
        <h2 className="text-text font-bold text-lg">Editar empresa</h2>
=======
          <ArrowBackRounded htmlColor="#4A4A4A" sx={{ fontSize: 16 }} aria-hidden="true" />
        </button>
        <h2 className="text-[#1A1A1A] font-bold text-lg">{nueva ? "Registrar empresa" : "Editar empresa"}</h2>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
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
<<<<<<< HEAD
          <p className="text-xs text-subtext">Recomendado: PNG o JPG transparente de 500x500px</p>
=======
          <p className="text-xs text-[#4A4A4A]">Recomendado: PNG o JPG transparente de 500x500px</p>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
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
          placeholder="76.123.456-0"
          value={empresa.rut}
          error={errores.rut}
          onChange={(e) => poner("rut", formatearRut(e.target.value))}
        />
        <Campo
          titulo="Correo de contacto"
          icono={<EmailRounded {...icono} />}
          type="email"
          placeholder="contacto@empresa.cl"
          value={empresa.correo}
          error={errores.correo}
          onChange={(e) => poner("correo", e.target.value.trim())}
        />

        <Campo titulo="Teléfono" icono={<PhoneRounded {...icono} />} error={errores.telefono}>
          <div className="flex">
<<<<<<< HEAD
            <span className="text-xs font-normal text-subtext bg-background border border-r-0 border-border rounded-l-md px-3 py-2">
=======
            <span className="text-xs font-normal text-[#4A4A4A] bg-[#F4F5F7] border border-r-0 border-[#E2E8F0] rounded-l-md px-3 py-2">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
              +56
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={9}
              className={`${campo} flex-1 min-w-0 rounded-l-none ${errores.telefono ? bordeError : ""}`}
              placeholder="912345678"
              value={empresa.telefono}
              onChange={(e) => poner("telefono", e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </Campo>

<<<<<<< HEAD
        <Campo titulo="Región" icono={<MapRounded {...icono} />}>
=======
        <Campo titulo="Región">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
          <Lista
            opciones={regiones.map((r) => r.nombre)}
            vacio="Selecciona una región"
            value={empresa.region}
            onChange={elegirRegion}
          />
        </Campo>

<<<<<<< HEAD
        <Campo titulo="Comuna" icono={<LocationCityRounded {...icono} />} error={errores.comuna}>
=======
        <Campo titulo="Comuna" error={errores.comuna}>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
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
            value={empresa.descripcion}
            onChange={(e) => poner("descripcion", e.target.value)}
          />
<<<<<<< HEAD
          <span className="self-end font-normal text-subtext">
=======
          <span className="self-end font-normal text-[#4A4A4A]">
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
            {empresa.descripcion.length}/{limiteDescripcion}
          </span>
        </Campo>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
