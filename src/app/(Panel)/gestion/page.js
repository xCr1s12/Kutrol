"use client";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 8339aaa (feat(api): implement flota module and add auth logout and proxy support)
import Modal from "@/components/ui/Modal";
import FormularioConductor from "@/components/ux/FormConductores";
import FormularioVehiculo from "@/components/ux/FormVehiculos";
import {
  Card,
  Estado,
  FilaTabla,
  PillButton,
  Tabla,
  Td,
  VerHistorial,
} from "@/components/gestion/FlotaComponents";
import TablaCamiones from "@/components/tablaCamiones";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ConductorHistory from "@/components/gestion/ConductorHistory";
import VehiculoHistory from "@/components/gestion/VehiculoHistory";
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)

import { useState } from "react";

const ACTIVE_TAB_COLOR = "#1A1A1A";

<<<<<<< HEAD
const page = () => {
    const [activeButton, setActiveButton] = useState("Todos");
    const buttons = [
        { text: "Todos" },
        { text: "Activos" },
        { text: "Mantencion" },
    ];


    const [conductores, setConductores] = useState([
        { conductor: "Juan Díaz", estado: "activo", vehiculo_cargo: "A1" },
        { conductor: "Ana Rojas", estado: "activo", vehiculo_cargo: "A2" },
        { conductor: "Luis Pérez", estado: "inactivo", vehiculo_cargo: "A3" },
        { conductor: "Marta Silva", estado: "activo", vehiculo_cargo: "A4" },
    ])
    const [vehiculos, setVehiculos] = useState([
        {patente: "A1", rendimiento: "100%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A2", rendimiento: "50%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A3", rendimiento: "250%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A4", rendimiento: "0%", estado: "activo", encargado: "Jhon doe"},
    ])

    return (
        <main
            className="flex flex-col w-full bg-[#FDFBF7] overflow-hidden"
            lang="es"
        >
            {/* Seccion de Vehiculos */}
            <section className="flex  p-10 flex-col w-full bg-[#FDFBF7]">
                <h2 className="text-[#1A1A1A] text-2xl font-bold"> Vehiculos</h2>
                <ul className="flex flex-row gap-5">
                    {buttons.map((button) => {
                        const isActive = activeButton === button.text;

                        return (
                            <li key={button.text}>
                                <button
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveButton(button.text)}
                                    className="px-5 rounded-t-xl pt-2"
                                    style={{
                                        backgroundColor: isActive ? ACTIVE_TAB_COLOR : "#D9D6CF",
                                        color: isActive ? "#FFFFFF" : "#1A1A1A",
                                    }}
                                >
                                    {button.text}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            {/* Tabla de vehiculos*/}
                <div className="w-5/6 overflow-x-auto">
                    <table className="w-full border-collapse text-left border-[#EAE5DA]">
                        <thead>
                            <tr className="bg-[#F4F5F4] border-b border-[#D9D6CF] text-[#1A1A1A]">
                                <th className="px-4 py-3">Patente</th>
                                <th className="px-4 py-3">Rendimiento</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Encargado</th>
                                <th className="px-4 py-3">Historial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo, index) => (
                                <tr
                                    key={`${vehiculo.patente}-${index}`}
                                    className="border-b border-[#D9D6CF] text-[#1A1A1A]"
                                >
                                    <td className="px-4 py-3">{vehiculo.patente}</td>
                                    <td className="px-4 py-3">{vehiculo.rendimiento}</td>
                                    <td className="px-4 py-3">{vehiculo.estado}</td>
                                    <td className="px-4 py-3">{vehiculo.encargado}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            className="rounded-md bg-[#1A1A1A] px-3 py-2 text-white"
                                        >
                                            Ver historial
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
=======
const CONDUCTORES = [
  { conductor: "Jhon Doea", estado: "activo", vehiculo: "A1" },
  { conductor: "Jhon Doe", estado: "activo", vehiculo: "A2" },
  { conductor: "Jhon Doe", estado: "sin carga", vehiculo: "A3" },
];

const ESTADOS = {
  activo: { label: "Activo", color: "var(--color-brand)" },
  "sin carga": { label: "Sin Carga", color: "var(--color-accent-dark)" },
  "en mantencion": { label: "En Mantencion", color: "var(--color-accent-dark)" },
};

const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

/* ---------- Página ---------- */

const Flota = () => {
  const [flotas, setFlotas] = useState([]);
  const [flotaSeleccionada, setFlotaSeleccionada] = useState("");
  const [cargandoFlotas, setCargandoFlotas] = useState(true);
  const [errorFlotas, setErrorFlotas] = useState("");
  const [modalVehiculo, setModalVehiculo] = useState(false);
  const [versionVehiculos, setVersionVehiculos] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarFlotas() {
      try {
        setCargandoFlotas(true);
        setErrorFlotas("");

        const sessionResponse = await fetch("/api/auth/session", {
          signal: controller.signal,
        });
        const sessionData = await sessionResponse.json();

        if (!sessionResponse.ok || !sessionData.authenticated) {
          throw new Error(
            sessionData.message || "No se pudo obtener la sesión del usuario",
          );
        }

        const idEmpresa = Number(sessionData.session?.id_empresa);
        if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
          throw new Error("La sesión no contiene una empresa válida");
        }

        const response = await fetch(
          `/api/flota?id_empresa=${encodeURIComponent(idEmpresa)}`,
          { signal: controller.signal },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "No se pudieron cargar las flotas",
          );
        }
        if (!Array.isArray(data)) {
          throw new Error("La respuesta de flotas no tiene un formato válido");
        }

        setFlotas(data);
        setFlotaSeleccionada(data.length ? String(data[0].id_flota) : "");
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorFlotas(
          error instanceof Error ? error.message : "No se pudieron cargar las flotas",
        );
      } finally {
        if (!controller.signal.aborted) setCargandoFlotas(false);
      }
    }

    cargarFlotas();
    return () => controller.abort();
  }, []);

  const handleNuevoVehiculo = () => {
    setVersionVehiculos((version) => version + 1);
    setModalVehiculo(false);
  };

  const [modalConductor, setModalConductor] = useState(false);
  const handleNuevoConductor = (datos) => {
    console.log(datos);
    setModalConductor(false);
  };
  
  const [VEHICULOSELECT, setVEHICULOSELECT] = useState(null);
  const [CONDUCTORSELECT, setCONDUCTORSELECT] = useState(null);
  const [modalHistorialC, setModalHistorialC] = useState(false);

  const [modalHistorialV, setModalHistorialV] = useState(false);
  return (
    <main
      lang="es"
      className="flex min-h-screen w-full flex-col gap-4 bg-background p-4.5 font-['Poppins',sans-serif]"
    >
      {/* ---------- Vehiculos ---------- */}
      <Card >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-text">Vehículos</h2>
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="flota-para-revisar"
              className="text-sm font-medium text-text"
            >
              Flota para revisar
            </label>
            <select
              id="flota-para-revisar"
              value={flotaSeleccionada}
              onChange={(event) => setFlotaSeleccionada(event.target.value)}
              disabled={cargandoFlotas || Boolean(errorFlotas) || !flotas.length}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
            >
              {cargandoFlotas ? (
                <option value="">Cargando flotas...</option>
              ) : flotas.length ? (
                flotas.map((flota) => (
                  <option key={flota.id_flota} value={flota.id_flota}>
                    {flota.nombre}
                  </option>
                ))
              ) : (
                <option value="">No hay flotas disponibles</option>
              )}
            </select>
          </div>
        </div>

        {cargandoFlotas ? (
          <p className="py-4 text-sm text-subtext">Cargando flotas...</p>
        ) : errorFlotas ? (
          <p role="alert" className="py-4 text-sm text-red-600">
            Error: {errorFlotas}
          </p>
        ) : flotaSeleccionada ? (
          <TablaCamiones
            key={`${flotaSeleccionada}-${versionVehiculos}`}
            flotaId={Number(flotaSeleccionada)}
            onVerHistorial={(vehiculo) => {
              setVEHICULOSELECT(vehiculo);
              setModalHistorialV(true);
            }}
            acciones={
              <PillButton onClick={() => setModalVehiculo(true)}>
                Agregar Vehiculo
              </PillButton>
            }
          />
        ) : (
          <p className="py-4 text-sm text-subtext">No hay flotas disponibles.</p>
        )}
      </Card>
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)

<<<<<<< HEAD
            {/* Seccion de Conductores */}
            <section className="flex flex-col w-full bg-[#FDFBF7] p-10">
                <h2 className="text-[#1A1A1A] text-2xl font-bold">Conductores</h2>
                <div className="w-5/6 overflow-x-auto">
                    <table className="w-full border-collapse text-left border-[#EAE5DA]">
                        <thead>
                            <tr className="bg-[#F4F5F4] border-b border-[#D9D6CF] text-[#1A1A1A]">
                                <th className="px-4 py-3">Conductor</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Vehículo a cargo</th>
                                <th className="px-4 py-3">Historial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conductores.map((conductor, index) => (
                                <tr
                                    key={`${conductor.conductor}-${index}`}
                                    className="border-b border-[#D9D6CF] text-[#1A1A1A]"
                                >
                                    <td className="px-4 py-3">{conductor.conductor}</td>
                                    <td className="px-4 py-3">{conductor.estado}</td>
                                    <td className="px-4 py-3">{conductor.vehiculo_cargo}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            className="rounded-md bg-[#1A1A1A] px-3 py-2 text-white"
                                        >
                                            Ver historial
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
=======
      {/* ---------- Conductores ---------- */}
      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-text">Conductores</h2>
          <PillButton onClick={() => setModalConductor(true)}>
            Agregar Conductor
          </PillButton>
        </div>
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)

export default page;