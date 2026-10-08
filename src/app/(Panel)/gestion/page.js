"use client";
import { useEffect, useState, useMemo } from "react";
import Modal from "@/components/ui/Modal";
import FormularioConductor from "@/components/ux/FormConductores";
import FormularioVehiculo from "@/components/ux/FormVehiculos";
import {
  Card,
  Estado,
  Filtros,
  Paginacion,
  PillButton,
  Tabla,
  Td,
  VerHistorial,
} from "@/components/gestion/FlotaComponents";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ConductorHistory from "@/components/gestion/ConductorHistory";
import VehiculoHistory from "@/components/gestion/VehiculoHistory";

const ICONCONDUCTOR = <PermIdentityOutlinedIcon fontSize="large" />;

const ICONVEHICULO = <LocalShippingOutlinedIcon fontSize="large" />;

const PAGE_SIZE = 7;

const FILTROS = ["Todos", "Activos", "En Mantencion"];

const VEHICULOS = [
  {
    patente: "A1",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "A2",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "A3",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "B1",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "B2",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "B3",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "C1",
    rendimiento: "100km/L",
    estado: "activo",
    encargado: "Jhon Doe",
  },
  {
    patente: "C2",
    rendimiento: "0km/L",
    estado: "en mantencion",
    encargado: "Jhon Doe",
  },
];

const CONDUCTORES = [
  { conductor: "Jhon Doea", estado: "activo", vehiculo: "A1" },
  { conductor: "Jhon Doe", estado: "activo", vehiculo: "A2" },
  { conductor: "Jhon Doe", estado: "sin carga", vehiculo: "A3" },
];

const ESTADOS = {
  activo: { label: "Activo", color: "var(--color-success)" },
  "sin carga": { label: "Sin Carga", color: "var(--color-accent-dark)" },
  "en mantencion": { label: "En Mantencion", color: "var(--color-warning)" },
};

const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

/* ---------- Página ---------- */

const Flota = () => {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [pagina, setPagina] = useState(1);

  const vehiculosFiltrados = useMemo(
    () =>
      VEHICULOS.filter((v) => {
        const estado = normalizar(v.estado);
        if (filtroActivo === "Activos") return estado === "activo";
        if (filtroActivo === "En Mantencion")
          return estado.includes("mantencion");
        return true;
      }),
    [filtroActivo],
  );

  const totalPaginas = Math.max(
    1,
    Math.ceil(vehiculosFiltrados.length / PAGE_SIZE),
  );

  useEffect(() => {
    setPagina(1);
  }, [filtroActivo]);

  const vehiculosPagina = vehiculosFiltrados.slice(
    (pagina - 1) * PAGE_SIZE,
    pagina * PAGE_SIZE,
  );
  const [modalVehiculo, setModalVehiculo] = useState(false);
  const handleNuevoVehiculo = (datos) => {
    console.log(datos);
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
      <Card>
        <h2 className="text-base font-bold text-brand">Vehiculos</h2>

        <div className="mb-3 mt-3 flex items-end justify-between gap-4">
          <Filtros
            opciones={FILTROS}
            seleccionado={filtroActivo}
            onSelect={setFiltroActivo}
          />
          <PillButton onClick={() => setModalVehiculo(true)}>
            Agregar Vehiculo
          </PillButton>
        </div>

        <Tabla
          columnas={[
            "Vehiculo",
            "Rendimiento",
            "Estado",
            "Encargado",
            "Historial",
          ]}
          anchos={[18, 20, 18, 22, 22]}
        >
          {vehiculosPagina.length > 0 ? (
            vehiculosPagina.map((v) => (
              <tr key={v.patente}>
                <Td>{v.patente}</Td>
                <Td>{v.rendimiento}</Td>
                <Td>
                  <Estado estado={normalizar(v.estado)} estados={ESTADOS} />
                </Td>
                <Td>{v.encargado}</Td>
                <Td>
                  <VerHistorial
                    onClick={() => {
                      setVEHICULOSELECT(v);
                      setModalHistorialV(true);
                    }}
                  />
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="h-15 text-center text-base text-subtext"
              >
                No hay vehículos para este filtro.
              </td>
            </tr>
          )}
        </Tabla>

        {/* Paginación */}
        <Paginacion
          pagina={pagina}
          totalPaginas={totalPaginas}
          onCambiarPagina={setPagina}
        />
      </Card>

      {/* ---------- Conductores ---------- */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-brand">Conductores</h2>
          <PillButton onClick={() => setModalConductor(true)}>
            Agregar Conductor
          </PillButton>
        </div>

        <Tabla
          columnas={["Conductor", "Estado", "Vehiculo a cargo", "Historial"]}
          anchos={[23, 20, 27, 30]}
        >
          {CONDUCTORES.map((c, i) => (
            <tr key={`${c.conductor}-${i}`}>
              <Td>{c.conductor}</Td>
              <Td>
                <Estado estado={normalizar(c.estado)} estados={ESTADOS} />
              </Td>
              <Td>{c.vehiculo}</Td>
              <Td>
                <VerHistorial
                  onClick={() => {
                    setCONDUCTORSELECT(c);
                    setModalHistorialC(true);
                  }}
                />
              </Td>
            </tr>
          ))}
        </Tabla>
      </Card>
      {/* Modal del Historial del Conductor */}
      <Modal
        open={modalHistorialC}
        onClose={() => setModalHistorialC(false)}
        size="xl"
        eyebrow="CONDUCTOR"
        title={CONDUCTORSELECT?.conductor ?? "Historial del conductor"}
        icon={ICONCONDUCTOR}
      >
        <ConductorHistory conductor={CONDUCTORSELECT ?? undefined} />
      </Modal>

      {/* Modal Agregar Conductor */}
      <Modal
        icon={ICONCONDUCTOR}
        open={modalConductor}
        onClose={() => setModalConductor(false)}
        title="Agregar Conductor"
        size="lg"
      >
        <FormularioConductor
          onSubmit={handleNuevoConductor}
          onCancel={() => setModalConductor(false)}
        />
      </Modal>

      {/* Modal del Historial del Vehiculo */}
      <Modal
        open={modalHistorialV}
        onClose={() => setModalHistorialV(false)}
        size="xl"
        eyebrow="VEHICULO"
        title={VEHICULOSELECT?.patente ?? "Historial del Vehiculo"}
        icon={ICONVEHICULO}
      >
        <VehiculoHistory vehiculo={VEHICULOSELECT ?? undefined} />
      </Modal>
      {/* Modal Agregar Vehiculo */}
      <Modal
        icon={ICONVEHICULO}
        open={modalVehiculo}
        onClose={() => setModalVehiculo(false)}
        title="Agregar Vehiculo"
        size="lg"
      >
        <FormularioVehiculo
          onSubmit={handleNuevoVehiculo}
          onCancel={() => setModalVehiculo(false)}
        />
      </Modal>
    </main>
  );
};

export default Flota;
