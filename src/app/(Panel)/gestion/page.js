"use client";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import FormularioConductor from "@/components/ux/FormConductores";
import FormularioVehiculo from "@/components/ux/FormVehiculos";
import FormularioFlota from "@/components/gestion/FormularioFlota";
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

const ESTADOS = {
  activo: { label: "Activo", color: "var(--color-brand)" },
  en_ruta: { label: "En ruta", color: "var(--color-accent-dark)" },
  inactivo: { label: "Inactivo", color: "var(--color-accent-dark)" },
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
  const [modalFlota, setModalFlota] = useState(false);
  const [versionFlotas, setVersionFlotas] = useState(0);
  const [tiposFlota, setTiposFlota] = useState({});
  const flotaPendienteRef = useRef(null);

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

        const idPendiente = flotaPendienteRef.current;
        const creada = idPendiente
          ? data.find((flota) => String(flota.id_flota) === idPendiente)
          : null;

        setFlotaSeleccionada(
          creada
            ? String(creada.id_flota)
            : data.length
              ? String(data[0].id_flota)
              : "",
        );
        flotaPendienteRef.current = null;
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
  }, [versionFlotas]);

  // Tipos de flota para mostrar el nombre del tipo en la lista de flotas
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/tipos-flota", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (controller.signal.aborted || !Array.isArray(data)) return;

        const mapa = {};
        for (const tipo of data) {
          mapa[String(tipo.id_tipo_flota)] = tipo.nombre;
        }
        setTiposFlota(mapa);
      })
      .catch(() => {
        // Si falla, la lista muestra "Tipo no disponible" en lugar del id
      });

    return () => controller.abort();
  }, []);

  const handleNuevoVehiculo = () => {
    setVersionVehiculos((version) => version + 1);
    setModalVehiculo(false);
  };

  const handleNuevaFlota = (flota) => {
    if (flota?.id_flota) flotaPendienteRef.current = String(flota.id_flota);
    setModalFlota(false);
    setVersionFlotas((version) => version + 1);
  };

  const [modalConductor, setModalConductor] = useState(false);
  const [conductores, setConductores] = useState([]);
  const [cargandoConductores, setCargandoConductores] = useState(true);
  const [errorConductores, setErrorConductores] = useState("");
  const [errorGuardarConductor, setErrorGuardarConductor] = useState("");
  const [guardandoConductor, setGuardandoConductor] = useState(false);
  const [versionConductores, setVersionConductores] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarConductores() {
      try {
        setCargandoConductores(true);
        setErrorConductores("");
        const response = await fetch("/api/conductores", {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.error?.message || data.message || data.error || "No se pudieron cargar los conductores",
          );
        }
        if (!Array.isArray(data)) {
          throw new Error("La respuesta de conductores no tiene un formato válido");
        }
        setConductores(data);
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorConductores(
          error instanceof Error ? error.message : "No se pudieron cargar los conductores",
        );
      } finally {
        if (!controller.signal.aborted) setCargandoConductores(false);
      }
    }

    cargarConductores();
    return () => controller.abort();
  }, [versionConductores]);

  const handleNuevoConductor = async (datos) => {
    try {
      setGuardandoConductor(true);
      setErrorGuardarConductor("");
      const response = await fetch("/api/conductores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const data = await response.json();
      if (!response.ok) {
        const details = data.error?.details;
        const detailMessage = Array.isArray(details)
          ? details.map((detail) => detail.mensaje).join(". ")
          : "";
        throw new Error(
          detailMessage ||
            data.error?.message ||
            data.message ||
            data.error ||
            "No se pudo agregar el conductor",
        );
      }
      setModalConductor(false);
      setVersionConductores((version) => version + 1);
    } catch (error) {
      setErrorGuardarConductor(
        error instanceof Error ? error.message : "No se pudo agregar el conductor",
      );
    } finally {
      setGuardandoConductor(false);
    }
  };
  
  const [VEHICULOSELECT, setVEHICULOSELECT] = useState(null);
  const [CONDUCTORSELECT, setCONDUCTORSELECT] = useState(null);
  const [modalHistorialC, setModalHistorialC] = useState(false);

  const [modalHistorialV, setModalHistorialV] = useState(false);
  return (
    <div
      lang="es"
      className="flex min-h-screen w-full flex-col gap-4 bg-background p-4.5 font-pop"
    >
      {/* Encabezado de la pagina */}
      <header className="mb-1">
        <h1 className="text-2xl font-bold text-text">Gestión de flota</h1>
      </header>

      <Card className={flotas.length ? "h-110" : "h-auto"}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-text">Flotas</h2>
          <PillButton onClick={() => setModalFlota(true)}>
            Nueva flota
          </PillButton>
        </div>

        {cargandoFlotas ? (
          <p className="py-4 text-sm text-subtext">Cargando flotas...</p>
        ) : errorFlotas ? (
          <p role="alert" className="py-4 text-sm text-accent-dark">
            Error: {errorFlotas}
          </p>
        ) : flotas.length ? (
          <ul className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {flotas.map((flota) => (
              <li
                key={flota.id_flota}
                className="rounded-xl border border-border bg-background px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-text">
                    {flota.nombre}
                  </p>
                  <span className="text-xs text-subtext">
                    {tiposFlota[String(flota.id_tipo_flota)] ??
                      "Tipo no disponible"}
                  </span>
                </div>
                {flota.descripcion ? (
                  <p className="mt-1 text-sm text-subtext">
                    {flota.descripcion}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-2 text-sm text-subtext">
            Todavía no tienes flotas. Crea la primera para poder agregar
            vehículos.
          </p>
        )}
      </Card>

      <Card>
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
              className="rounded-lg border border-icon bg-background px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
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
                Agregar Vehículo
              </PillButton>
            }
          />
        ) : flotas.length ? (
          <p className="py-4 text-sm text-subtext">
            Selecciona una flota para revisar sus vehículos.
          </p>
        ) : (
          <p className="py-4 text-sm text-subtext">
            Los vehículos se registran dentro de una flota. Crea tu primera flota
            en la sección de arriba para poder agregar vehículos.
          </p>
        )}
      </Card>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-text">Conductores</h2>
          <PillButton
            onClick={() => {
              setErrorGuardarConductor("");
              setModalConductor(true);
            }}
          >
            Agregar Conductor
          </PillButton>
        </div>

        {cargandoConductores ? (
          <p className="py-4 text-sm text-subtext">Cargando conductores...</p>
        ) : errorConductores ? (
          <p role="alert" className="py-4 text-sm text-red-600">
            Error: {errorConductores}
          </p>
        ) : conductores.length ? (
          <Tabla
            columnas={["Conductor", "Estado", "Vehículo a cargo", "Historial"]}
            anchos={[23, 20, 27, 30]}
          >
            {conductores.map((conductor) => (
              <FilaTabla key={conductor.id_conductor}>
                <Td>{conductor.conductor}</Td>
                <Td>
                  <Estado
                    estado={normalizar(conductor.estado)}
                    estados={ESTADOS}
                  />
                </Td>
                <Td>{conductor.vehiculo ?? "Sin vehículo"}</Td>
                <Td>
                  <VerHistorial
                    onClick={() => {
                      setCONDUCTORSELECT(conductor);
                      setModalHistorialC(true);
                    }}
                  />
                </Td>
              </FilaTabla>
            ))}
          </Tabla>
        ) : (
          <p className="py-4 text-sm text-subtext">
            Todavía no hay conductores registrados.
          </p>
        )}
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
          error={errorGuardarConductor}
          guardando={guardandoConductor}
        />
      </Modal>

      {/* Modal del Historial del Vehiculo */}
      <Modal
        open={modalHistorialV}
        onClose={() => setModalHistorialV(false)}
        size="xl"
        eyebrow="VEHÍCULO"
        title={VEHICULOSELECT?.patente ?? "Historial del Vehículo"}
        icon={ICONVEHICULO}
      >
        <VehiculoHistory vehiculo={VEHICULOSELECT ?? undefined} />
      </Modal>
      {/* Modal Nueva Flota */}
      <Modal
        open={modalFlota}
        onClose={() => setModalFlota(false)}
        title="Nueva flota"
        size="lg"
      >
        <FormularioFlota
          onCreada={handleNuevaFlota}
          onCancel={() => setModalFlota(false)}
        />
      </Modal>

      {/* Modal Agregar Vehiculo */}
      <Modal
        icon={ICONVEHICULO}
        open={modalVehiculo}
        onClose={() => setModalVehiculo(false)}
        title="Agregar Vehículo"
        size="lg"
      >
        <FormularioVehiculo
          flotas={flotas}
          flotaSeleccionada={flotaSeleccionada}
          onSubmit={handleNuevoVehiculo}
          onCancel={() => setModalVehiculo(false)}
        />
      </Modal>
    </div>
  );
};

export default Flota;
