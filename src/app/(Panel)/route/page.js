"use client";
import Listitem from "@/components/route/Listitem";
import { useState } from "react";
import dynamic from "next/dynamic"; // 1. Importamos dynamic de Next.js
import InfoCard from "@/components/route/InfoCard";

// 2. Importamos el componente MapR dinámicamente apagando el SSR
const MapR = dynamic(
  () => import("@/components/route/map"),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex items-center justify-center h-[400px] text-white">
        <p>Cargando mapa interactivo...</p>
      </div>
    )
  }
);

const RUTAS = [
  {
    id: "A",
    nombre: "Ancud — Castro",
    coordenadas: [[-41.8683, -73.8282], [-42.4816, -73.7644]],
    viajes: [
      {conductor: "Juan Díaz", encargado: "M. Soto"},
      {conductor: "Ana Rojas", encargado: "M. Soto"},
      {conductor: "Luis Pérez", encargado: "C. Vera"},
      {conductor: "Marta Silva", encargado: "C. Vera"},
    ],
    combustible: {consumo: "8,5 L", rendimiento: "12 km/L", ahorro: "15 %"},
    tiempoEstimado: "30 min",
    distanciaTotal: "100 km",
  },
  {
    id: "B",
    nombre: "Castro — Dalcahue",
    coordenadas: [[-42.4816, -73.7644], [-42.3800, -73.6492]],
    viajes: [
      {conductor: "Pedro Núñez", encargado: "M. Soto"},
      {conductor: "Sofía Lagos", encargado: "C. Vera"},
      {conductor: "Diego Ortiz", encargado: "C. Vera"},
    ],
    combustible: {consumo: "6,2 L", rendimiento: "13,5 km/L", ahorro: "9 %"},
    tiempoEstimado: "22 min",
    distanciaTotal: "68 km",
  },
  {
    id: "C",
    nombre: "Castro — Quellon",
    coordenadas: [[-42.4816, -73.7644], [-43.1189, -73.6139]],
    viajes: [
      {conductor: "Juan Díaz", encargado: "C. Vera"},
      {conductor: "Ana Rojas", encargado: "M. Soto"},
      {conductor: "Luis Pérez", encargado: "M. Soto"},
      {conductor: "Marta Silva", encargado: "M. Soto"},
      {conductor: "Pedro Núñez", encargado: "C. Vera"},
      {conductor: "Sofía Lagos", encargado: "C. Vera"},
    ],
    combustible: {consumo: "11,4 L", rendimiento: "9,8 km/L", ahorro: "5 %"},
    tiempoEstimado: "48 min",
    distanciaTotal: "142 km",
  },
  {
    id: "D",
    nombre: "Castro — Chonchi",
    coordenadas: [[-42.4816, -73.7644], [-42.6247, -73.7742]],
    viajes: [
      {conductor: "Diego Ortiz", encargado: "M. Soto"},
      {conductor: "Marta Silva", encargado: "C. Vera"},
    ],
    combustible: {consumo: "9,1 L", rendimiento: "11 km/L", ahorro: "18 %"},
    tiempoEstimado: "35 min",
    distanciaTotal: "89 km",
  },
];

export default function Route() {
  const [asignado, setAsignado] = useState(null);

  return (
    <div
      className="flex flex-col w-full bg-[#FDFBF7] overflow-hidden"
      lang="es"
    >
      {/* Lista de rutas y mapas */}
      <section className="grid grid-cols-2 grid-rows-1 items-center">
        
        {/* Lista de rutas */}
        <div className="mr-10 shadow-2xl border-2 border-[#EAE5DA] w-1/2 h-auto p-10 rounded-xl">
          <h1 className="font-bold text-[#1A1A1A]">Lista de Rutas</h1>
          <Listitem 
            items={RUTAS}
            onSelect={(data) => setAsignado(data)} 
          />
        </div>

        {/* Mapa */}
        <div className="w-full bg-[#6E6E6E]">
          <h2 className="text-[#FDFBF7] p-2">Mapa</h2>
          
          {/* Condición: Si hay una ruta asignada, muestra el mapa. Si no, pide que se seleccione una. */}
          {asignado ? (
            <MapR 
              zoom={40}
              coordenadas={asignado.coordenadas} 
              popupText={asignado.nombre} 
            />
          ) : (
            <div className="flex items-center justify-center h-[400px] text-[#FDFBF7]">
              <p>Selecciona una ruta en la lista para verla en el mapa</p>
            </div>
          )}
        </div>
      </section>

      {/* Cards de información */}
      {asignado && (
        <section className="flex flex-wrap gap-6 px-6 pb-6">
          {/* Viajes asignados */}
          <InfoCard>
            <h3 className="text-center font-semibold text-[#1A1A1A] mb-4">
              Viajes asignados a la ruta {asignado.id}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6E6E6E]">
                  <th className="font-normal pb-2">Conductor</th>
                  <th className="font-normal pb-2">Encargado</th>
                </tr>
              </thead>
              <tbody>
                {asignado.viajes.map((v, i) => (
                  <tr key={i} className="border-t border-[#EAE5DA]">
                    <td className="py-2 text-[#1A1A1A]">{v.conductor}</td>
                    <td className="py-2 text-[#1A1A1A]">{v.encargado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfoCard>
 
          {/* Datos de combustible */}
          <InfoCard>
            <h3 className="text-center font-semibold text-[#1A1A1A] mb-4">
              Datos de combustible
              <br />
              de la ruta {asignado.id}
            </h3>
            <p className="font-medium text-[#1A1A1A] mb-2">Uso de combustible</p>
            <p className="text-sm text-[#6E6E6E] mb-1">
              Consumo promedio: {asignado.combustible.consumo}
            </p>
            <p className="text-sm text-[#6E6E6E] mb-1">
              Rendimiento: {asignado.combustible.rendimiento}
            </p>
            <p className="text-sm text-[#6E6E6E]">
              Ahorro: {asignado.combustible.ahorro}
            </p>
          </InfoCard>
 
          {/* Plan de tiempo */}
          <InfoCard className="flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-[#1A1A1A] mb-4">Plan de tiempo</h3>
            <p className="text-4xl font-bold text-[#1A1A1A]">
              {asignado.tiempoEstimado}
            </p>
            <p className="text-sm text-[#6E6E6E] mt-1">Tiempo estimado</p>
          </InfoCard>
 
          {/* Métricas de ruta */}
          <InfoCard className="flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-[#1A1A1A] mb-4">Métricas de ruta</h3>
            <p className="text-4xl font-bold text-[#1A1A1A]">
              {asignado.distanciaTotal}
            </p>
            <p className="text-sm text-[#6E6E6E] mt-1">Distancia total</p>
          </InfoCard>
        </section>
      )}
    </div>
  );
}
 