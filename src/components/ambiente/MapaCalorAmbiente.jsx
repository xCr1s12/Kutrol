"use client";

import React, { useState, useEffect } from "react";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

export default function MapaCalorAmbiente() {
  const [tabActiva, setTabActiva] = useState("horario");
  const [loading, setLoading] = useState(true);
  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const horasDelDia = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  const [matrizHoraria, setMatrizHoraria] = useState([]);
  const [zonasRegistradas, setZonasRegistradas] = useState([]);
  const [datosCamionesRuta, setDatosCamionesRuta] = useState({ camiones: [], rutas: [], matrizCamiones: [] });

  useEffect(() => {
    async function cargarDatosMapaCalor() {
      try {
        const respuestaServidor = await fetch("/api/ambiente/mapa-calor");
        if (respuestaServidor.ok) {
          const jsonServidor = await respuestaServidor.json();
          if (jsonServidor.data?.matrizHoraria) setMatrizHoraria(jsonServidor.data.matrizHoraria);
          if (jsonServidor.data?.zonas) setZonasRegistradas(jsonServidor.data.zonas);
          if (jsonServidor.data?.camionesRuta) setDatosCamionesRuta(jsonServidor.data.camionesRuta);
        }
      } catch (errorPeticion) {
        console.error("Error al cargar mapa de calor:", errorPeticion);
      } finally {
        setLoading(false);
      }
    }
    cargarDatosMapaCalor();
  }, []);

  const obtenerEstiloPorNivelCO2 = (nivelContaminacion) => {
    switch (nivelContaminacion) {
      case 2: return "bg-copper";
      case 1: return "bg-gold";
      case 0: default: return "bg-brand";
    }
  };

  // aca revisamos si la matriz tiene algun dato mayor a cero para no dibujar una grilla vacia
  const contieneDatosHorariosValidos = matrizHoraria.length > 0 && matrizHoraria.some((filaDia) => filaDia.some((valorHora) => valorHora > 0));

  if (loading) {
    return (
      <div className="w-full bg-card rounded-xl p-8 text-center text-subtext font-medium animate-pulse border border-border">
        Cargando análisis de emisiones desde la base de datos...
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-text font-bold text-lg">Análisis de Impacto Ambiental y Emisiones</h2>
          <p className="text-xs text-subtext mt-0.5">Monitoreo de la huella de carbono de la flota según franja y ruta</p>
        </div>
        <div className="flex bg-background p-1 rounded-lg border border-border self-start md:self-auto">
          <button onClick={() => setTabActiva("horario")} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${tabActiva === "horario" ? "bg-accent text-brand light:text-white" : "text-subtext hover:text-text"}`}>
            <AccessTimeRoundedIcon fontSize="small" /><span>Franja Horaria</span>
          </button>
          <button onClick={() => setTabActiva("geografico")} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${tabActiva === "geografico" ? "bg-accent text-brand light:text-white" : "text-subtext hover:text-text"}`}>
            <MapIcon fontSize="small" /><span>Por Zonas</span>
          </button>
          <button onClick={() => setTabActiva("camiones")} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${tabActiva === "camiones" ? "bg-accent text-brand light:text-white" : "text-subtext hover:text-text"}`}>
            <LocalShippingRoundedIcon fontSize="small" /><span>Camión vs Ruta</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs mb-4 pb-3 border-b border-border">
        <span className="text-subtext font-semibold">Nivel de CO₂:</span>
        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-brand inline-block" /><span className="text-text">Bajo / Eficiente</span></span>
        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-gold inline-block" /><span className="text-text">Moderado</span></span>
        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-copper inline-block" /><span className="text-text">Crítico / Elevado</span></span>
      </div>

      {tabActiva === "horario" && (
        <div className="overflow-x-auto pt-2">
          {contieneDatosHorariosValidos ? (
            <div className="min-w-[850px]">
              <div className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 mb-2 text-center text-[10px] font-bold text-subtext">
                <span className="text-left font-bold text-xs text-text">Día</span>
                {horasDelDia.map((horaEspecifica) => <span key={horaEspecifica} className="truncate">{horaEspecifica}</span>)}
              </div>
              {diasSemana.map((nombreDia, indiceFila) => (
                <div key={nombreDia} className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 mb-1.5 items-center">
                  <span className="text-xs font-bold text-text">{nombreDia}</span>
                  {matrizHoraria[indiceFila]?.map((valorContaminacion, indiceColumna) => (
                    <div key={indiceColumna} className={`h-8 rounded-sm transition-transform hover:scale-110 cursor-pointer ${obtenerEstiloPorNivelCO2(valorContaminacion)}`} title={`Hora: ${horasDelDia[indiceColumna]} | Día: ${nombreDia}`} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <p className="text-sm text-subtext font-medium">No hay datos suficientes registrados para generar el mapa de calor horario.</p>
            </div>
          )}
        </div>
      )}

      {tabActiva === "geografico" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {zonasRegistradas.length > 0 ? (
            zonasRegistradas.map((zonaUbicacion, indiceZona) => (
              <div key={indiceZona} className="p-4 rounded-lg border border-border flex items-center justify-between bg-background">
                <div>
                  <h3 className="font-bold text-sm text-text">{zonaUbicacion.comuna}</h3>
                  <p className="text-xs text-subtext">{zonaUbicacion.descripcion}</p>
                  <span className="text-xs text-accent font-medium mt-1 inline-block">Huella registrada: {zonaUbicacion.co2}</span>
                </div>
                <div className={`w-10 h-10 rounded-lg transition-transform hover:scale-105 ${obtenerEstiloPorNivelCO2(zonaUbicacion.nivel)}`} />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-10 col-span-2">
              <p className="text-sm text-subtext font-medium">No hay datos de zonas registrados en la base de datos.</p>
            </div>
          )}
        </div>
      )}

      {tabActiva === "camiones" && (
        <div className="overflow-x-auto pt-2">
          {datosCamionesRuta?.camiones?.length > 0 && datosCamionesRuta?.rutas?.length > 0 ? (
            <div className="min-w-[550px]">
              <div className="grid gap-2 mb-2 text-center text-xs font-bold text-subtext" style={{ gridTemplateColumns: `100px repeat(${datosCamionesRuta.rutas.length}, 1fr)` }}>
                <span className="text-left">Patente / Ruta</span>
                {datosCamionesRuta.rutas.map((nombreRuta) => <span key={nombreRuta} className="truncate" title={nombreRuta}>{nombreRuta}</span>)}
              </div>
              {datosCamionesRuta.camiones.map((patenteCamion, indiceFilaCamion) => (
                <div key={patenteCamion} className="grid gap-2 mb-2 items-center" style={{ gridTemplateColumns: `100px repeat(${datosCamionesRuta.rutas.length}, 1fr)` }}>
                  <span className="text-xs font-bold text-text truncate">{patenteCamion}</span>
                  {datosCamionesRuta.matrizCamiones[indiceFilaCamion]?.map((valorContaminacionRuta, indiceColumnaRuta) => (
                    <div key={indiceColumnaRuta} className={`h-9 rounded-md transition-transform hover:scale-105 cursor-pointer ${obtenerEstiloPorNivelCO2(valorContaminacionRuta)}`} title={`Patente: ${patenteCamion} | Ruta: ${datosCamionesRuta.rutas[indiceColumnaRuta]}`} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <p className="text-sm text-subtext font-medium">No hay registros suficientes de rutas por camión en la base de datos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}