import { useState } from "react";
import { SearchRounded, LocalShippingOutlined } from "@mui/icons-material";
import { diasDesde, formatearFecha } from "./fechas";

const coloresEstado = {
  Leve: "bg-green-100 text-green-800",
  Moderado: "bg-amber-100 text-amber-800",
  Crítico: "bg-red-100 text-red-700",
};

// cuantos dias hacia atras muestra cada opcion del filtro de fecha
const rangosFecha = [
  { valor: "", nombre: "Fecha" },
  { valor: "0", nombre: "Hoy" },
  { valor: "7", nombre: "Últimos 7 días" },
  { valor: "30", nombre: "Últimos 30 días" },
];

const filtro =
<<<<<<< HEAD
  "text-xs text-text bg-background border border-icon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent";
=======
  "text-xs text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent";
>>>>>>> 0c414e2 (pagina de alerta)

export default function TablaAlertas({ alertas }) {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  const texto = busqueda.toLowerCase();
  const filtradas = alertas.filter(
    (a) =>
      (a.vehiculo.toLowerCase().includes(texto) || a.mensaje.toLowerCase().includes(texto)) &&
      (!estado || a.estado === estado) &&
      (!fecha || diasDesde(a.fecha) <= Number(fecha))
  );

  return (
<<<<<<< HEAD
    <section className="bg-background rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] min-w-0" aria-label="Registro de alertas">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-56 border border-border rounded-full px-3 py-1.5">
          <SearchRounded className="text-icon" fontSize="small" aria-hidden="true" />
          <input
            type="search"
            className="w-full bg-transparent text-xs text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
=======
    <section className="bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] min-w-0" aria-label="Registro de alertas">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-56 border border-[#E2E8F0] rounded-full px-3 py-1.5">
          <SearchRounded htmlColor="#4A4A4A" fontSize="small" aria-hidden="true" />
          <input
            type="search"
            className="w-full bg-transparent text-xs text-[#1A1A1A] outline-none"
>>>>>>> 0c414e2 (pagina de alerta)
            placeholder="Buscar..."
            aria-label="Buscar alerta"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <select className={filtro} aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Estado</option>
          {Object.keys(coloresEstado).map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>

        <select className={filtro} aria-label="Filtrar por fecha" value={fecha} onChange={(e) => setFecha(e.target.value)}>
          {rangosFecha.map((r) => (
            <option key={r.valor} value={r.valor}>{r.nombre}</option>
          ))}
        </select>
      </div>

<<<<<<< HEAD
      <div className="overflow-x-auto  ligh:border-border dark:border-border/90 rounded-lg">
        <table className="w-full text-xs text-left text-text">
          <thead>
            <tr className="bg-card">
=======
      <div className="overflow-x-auto border border-[#E2E8F0] rounded-lg">
        <table className="w-full text-xs text-left text-[#1A1A1A]">
          <thead>
            <tr className="bg-[#F4F5F7]">
>>>>>>> 0c414e2 (pagina de alerta)
              {["Vehículo", "Mensaje", "Estado", "Fecha"].map((t) => (
                <th key={t} className="px-4 py-3 font-semibold">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtradas.map((a) => (
<<<<<<< HEAD
              <tr key={a.id} className="border-2 border-border">
=======
              <tr key={a.id} className="border-t border-[#E2E8F0]">
>>>>>>> 0c414e2 (pagina de alerta)
                <td className="px-4 py-3 font-semibold whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    {a.vehiculo}
                    <LocalShippingOutlined className="text-accent-dark" sx={{ fontSize: 16 }} aria-hidden="true" />
                  </span>
                </td>
                <td className="px-4 py-3 max-w-56">{a.mensaje}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-md font-semibold ${coloresEstado[a.estado]}`}>{a.estado}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{formatearFecha(a.fecha)}</td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr>
<<<<<<< HEAD
                <td colSpan={4} className="px-4 py-8 text-center text-graphite">
=======
                <td colSpan={4} className="px-4 py-8 text-center text-[#4A4A4A]">
>>>>>>> 0c414e2 (pagina de alerta)
                  No se encontraron alertas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
