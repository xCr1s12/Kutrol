import { AddRounded, EditRounded, EmailRounded, PhoneRounded, LocationOnRounded, BusinessRounded } from "@mui/icons-material";
import { tarjeta, botonAmarillo } from "./comun";

export const icono = { sx: { fontSize: 14 }, htmlColor: "#4A4A4A", "aria-hidden": "true" };

export function LogoEmpresa({ logo }) {
  return (
    <div className="w-[120px] h-[120px] shrink-0 rounded-2xl border border-dashed border-[#B0B5BD] bg-[#F4F5F7] flex items-center justify-center overflow-hidden">
      {logo ? (
        <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
      ) : (
        <BusinessRounded htmlColor="#B0B5BD" sx={{ fontSize: 48 }} aria-hidden="true" />
      )}
    </div>
  );
}

// un dato de la empresa en modo lectura
function Dato({ titulo, icono, valor, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="flex items-center gap-1 text-xs font-semibold text-[#1A1A1A]">
        {icono}
        {titulo}
      </span>
      <p className="text-sm text-[#4A4A4A] whitespace-pre-line">{valor || "Sin información"}</p>
    </div>
  );
}

// muestra los datos guardados, el formulario se abre con el boton
export default function VistaEmpresa({ empresa, onEditar }) {
  if (!empresa.nombre) {
    return (
      <section className={`${tarjeta} flex flex-col items-center gap-3 py-12 text-center`} aria-label="Perfil de la empresa">
        <LogoEmpresa />
        <h2 className="text-[#1A1A1A] font-bold text-lg">Aún no has registrado tu empresa</h2>
        <p className="text-sm text-[#4A4A4A]">Agrega sus datos para que aparezcan en tu perfil.</p>
        <button className={botonAmarillo} onClick={onEditar}>
          <AddRounded fontSize="small" aria-hidden="true" />
          Registrar empresa
        </button>
      </section>
    );
  }

  return (
    <section className={tarjeta} aria-label="Perfil de la empresa">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <LogoEmpresa logo={empresa.logo} />
          <div>
            <h2 className="text-[#1A1A1A] font-bold text-lg">{empresa.nombre}</h2>
            <p className="text-sm text-[#4A4A4A]">RUT {empresa.rut}</p>
          </div>
        </div>
        <button className={botonAmarillo} onClick={onEditar}>
          <EditRounded fontSize="small" aria-hidden="true" />
          Editar datos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dato titulo="Correo de contacto" icono={<EmailRounded {...icono} />} valor={empresa.correo} />
        <Dato
          titulo="Teléfono"
          icono={<PhoneRounded {...icono} />}
          valor={empresa.telefono && `+56 ${empresa.telefono}`}
        />
        <Dato titulo="Región" valor={empresa.region} />
        <Dato titulo="Comuna" valor={empresa.comuna} />
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
