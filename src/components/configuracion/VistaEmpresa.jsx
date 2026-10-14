<<<<<<< HEAD
<<<<<<< HEAD
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
      <div className="w-full h-full rounded-xl border border-dashed border-gold/50 flex items-center justify-center overflow-hidden">
        {logo ? (
          <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
        ) : (
          <BusinessRounded className="text-gold" sx={{ fontSize: 48 }} aria-hidden="true" />
        )}
      </div>
=======
import { AddRounded, EditRounded, EmailRounded, PhoneRounded, LocationOnRounded, BusinessRounded } from "@mui/icons-material";
=======
import {
  EditRounded, EmailRounded, PhoneRounded, LocationOnRounded, BusinessRounded, MapRounded, LocationCityRounded,
} from "@mui/icons-material";
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
import { tarjeta, botonAmarillo } from "./comun";

// iconos chicos de los campos, en amarillo oscuro para que se lean sobre blanco
export const icono = { sx: { fontSize: 18 }, className: "text-accent-dark", "aria-hidden": "true" };

// marco verde con borde amarillo, como las tarjetas de la pagina de inicio
export function LogoEmpresa({ logo }) {
  return (
<<<<<<< HEAD
    <div className="w-[120px] h-[120px] shrink-0 rounded-2xl border border-dashed border-[#B0B5BD] bg-[#F4F5F7] flex items-center justify-center overflow-hidden">
      {logo ? (
        <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
      ) : (
        <BusinessRounded htmlColor="#B0B5BD" sx={{ fontSize: 48 }} aria-hidden="true" />
      )}
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
    <div className="w-[120px] h-[120px] shrink-0 rounded-2xl bg-brand p-1.5 ring-2 ring-accent/60 ring-offset-2">
      <div className="w-full h-full rounded-xl border border-dashed border-accent/50 flex items-center justify-center overflow-hidden">
        {logo ? (
          <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
        ) : (
          <BusinessRounded className="text-accent" sx={{ fontSize: 48 }} aria-hidden="true" />
        )}
      </div>
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
    </div>
  );
}

// un dato de la empresa en modo lectura
function Dato({ titulo, icono, valor, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
<<<<<<< HEAD
      <span className="flex items-center gap-1 text-xs font-semibold text-text">
        {icono}
        {titulo}
      </span>
      <p className="text-sm text-subtext whitespace-pre-line">{valor || "Sin información"}</p>
=======
      <span className="flex items-center gap-1 text-xs font-semibold text-[#1A1A1A]">
        {icono}
        {titulo}
      </span>
      <p className="text-sm text-[#4A4A4A] whitespace-pre-line">{valor || "Sin información"}</p>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
// muestra los datos que la empresa dejo al registrarse
export default function VistaEmpresa({ empresa, onEditar }) {
  // por si la base de datos no devuelve nada
  if (!empresa.nombre) {
    return (
      <section className={`${tarjeta} py-12 text-center text-sm text-subtext`} aria-label="Perfil de la empresa">
        No se encontraron los datos de la empresa
=======
// muestra los datos guardados, el formulario se abre con el boton
=======
// muestra los datos que la empresa dejo al registrarse
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
export default function VistaEmpresa({ empresa, onEditar }) {
  // por si la base de datos no devuelve nada
  if (!empresa.nombre) {
    return (
<<<<<<< HEAD
      <section className={`${tarjeta} flex flex-col items-center gap-3 py-12 text-center`} aria-label="Perfil de la empresa">
        <LogoEmpresa />
        <h2 className="text-[#1A1A1A] font-bold text-lg">Aún no has registrado tu empresa</h2>
        <p className="text-sm text-[#4A4A4A]">Agrega sus datos para que aparezcan en tu perfil.</p>
        <button className={botonAmarillo} onClick={onEditar}>
          <AddRounded fontSize="small" aria-hidden="true" />
          Registrar empresa
        </button>
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
      <section className={`${tarjeta} py-12 text-center text-sm text-[#4A4A4A]`} aria-label="Perfil de la empresa">
        No se encontraron los datos de la empresa
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
      </section>
    );
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
=======
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
          <LogoEmpresa logo={empresa.logo} />
          <div>
            <h2 className="text-[#1A1A1A] font-bold text-lg">{empresa.nombre}</h2>
            <p className="text-sm text-[#4A4A4A]">RUT {empresa.rut}</p>
          </div>
        </div>
        <button className={`${botonAmarillo} shrink-0`} onClick={onEditar}>
          <EditRounded fontSize="small" aria-hidden="true" />
<<<<<<< HEAD
          Editar datos
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
          Editar
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
<<<<<<< HEAD
        {/* izquierda contacto, derecha ubicacion */}
        <Dato titulo="Correo de contacto" icono={<EmailRounded {...icono} />} valor={empresa.correo} />
        <Dato titulo="Región" icono={<MapRounded {...icono} />} valor={empresa.region} />
=======
        <Dato titulo="Correo de contacto" icono={<EmailRounded {...icono} />} valor={empresa.correo} />
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
        {/* izquierda contacto, derecha ubicacion */}
        <Dato titulo="Correo de contacto" icono={<EmailRounded {...icono} />} valor={empresa.correo} />
        <Dato titulo="Región" icono={<MapRounded {...icono} />} valor={empresa.region} />
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
        <Dato
          titulo="Teléfono"
          icono={<PhoneRounded {...icono} />}
          valor={empresa.telefono && `+56 ${empresa.telefono}`}
        />
<<<<<<< HEAD
<<<<<<< HEAD
        <Dato titulo="Comuna" icono={<LocationCityRounded {...icono} />} valor={empresa.comuna} />
=======
        <Dato titulo="Región" valor={empresa.region} />
        <Dato titulo="Comuna" valor={empresa.comuna} />
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
        <Dato titulo="Comuna" icono={<LocationCityRounded {...icono} />} valor={empresa.comuna} />
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
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
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
}
>>>>>>> e612c5b (Agregando iconos dorados y verdes)
