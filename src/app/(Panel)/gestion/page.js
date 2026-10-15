"use client";
import { useState } from "react";
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

const ICONCONDUCTOR = <PermIdentityOutlinedIcon fontSize="large" />;

const ICONVEHICULO = <LocalShippingOutlinedIcon fontSize="large" />;

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
  const [modalVehiculo, setModalVehiculo] = useState(false);
  const [versionVehiculos, setVersionVehiculos] = useState(0);
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
        <h2 className="text-base font-bold text-text">Vehiculos</h2>

        <TablaCamiones
          key={versionVehiculos}
          flotaId={1}
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
      </Card>

      {/* ---------- Conductores ---------- */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-text">Conductores</h2>
          <PillButton onClick={() => setModalConductor(true)}>
            Agregar Conductor
          </PillButton>
        </div>

        <Tabla
          columnas={["Conductor", "Estado", "Vehiculo a cargo", "Historial"]}
          anchos={[23, 20, 27, 30]}
        >
          {CONDUCTORES.map((c, i) => (
            <FilaTabla key={`${c.conductor}-${i}`}>
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
            </FilaTabla>
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
