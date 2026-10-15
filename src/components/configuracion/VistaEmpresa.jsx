import {
  EditRounded, EmailRounded, PhoneRounded, LocationOnRounded, BusinessRounded, MapRounded, LocationCityRounded,
} from "@mui/icons-material";
import { tarjeta, botonAmarillo } from "./comun";

// iconos chicos de los campos, en amarillo oscuro para que se lean sobre blanco
export const icono = { sx: { fontSize: 18 }, className: "text-accent", "aria-hidden": "true" };

// marco verde con borde amarillo, como las tarjetas de la pagina de inicio
export function LogoEmpresa({ logo }) {
  return (
    <div className="w-[120px] h-[120px] shrink-0 rounded-2xl bg-brand p-1.5 ring-2 ring-accent/60 ring-offset-2">
      <div className="w-full h-full rounded-xl border border-dashed border-accent/50 flex items-center justify-center overflow-hidden">
        {logo ? (
          <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
        ) : (
          <BusinessRounded className="text-accent" sx={{ fontSize: 48 }} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

// un dato de la empresa en modo lectura
function Dato({ titulo, icono, valor, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="flex items-center gap-1 text-xs font-semibold text-text">
        {icono}
        {titulo}
      </span>
      <p className="text-sm text-subtext whitespace-pre-line">{valor || "Sin información"}</p>
    </div>
  );
}

// muestra los datos que la empresa dejo al registrarse
export default function VistaEmpresa({ empresa, onEditar }) {
  // por si la base de datos no devuelve nada
  if (!empresa.nombre) {
    return (
      <section className={`${tarjeta} py-12 text-center text-sm text-subtext`} aria-label="Perfil de la empresa">
        No se encontraron los datos de la empresa
      </section>
    );
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <LogoEmpresa logo={empresa.logo} />
          <div>
            <h2 className="text-text font-bold text-lg">{empresa.nombre}</h2>
            <p className="text-sm text-subtext">RUT {empresa.rut}</p>
          </div>
        </div>
        <button className={`${botonAmarillo} shrink-0`} onClick={onEditar}>
          <EditRounded fontSize="small" aria-hidden="true" />
          Editar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* izquierda contacto, derecha ubicacion */}
        <Dato titulo="Correo de contacto" icono={<EmailRounded {...icono} />} valor={empresa.correo} />
        <Dato titulo="Región" icono={<MapRounded {...icono} />} valor={empresa.region} />
        <Dato
          titulo="Teléfono"
          icono={<PhoneRounded {...icono} />}
          valor={empresa.telefono && `+56 ${empresa.telefono}`}
        />
        <Dato titulo="Comuna" icono={<LocationCityRounded {...icono} />} valor={empresa.comuna} />
        <Dato
          className="md:col-span-2"
          titulo="Dirección"
          icono={<LocationOnRounded {...icono} />}
          valor={empresa.direccion}
        />
        <Dato className="md:col-span-2" titulo="Descripción de la empresa" valor={empresa.descripcion} />
      </div>
    </section>
  );
}