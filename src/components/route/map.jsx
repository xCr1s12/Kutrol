'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Reencuadra el mapa sobre la ruta completa
function FitBounds({ coordenadas }) {
  const map = useMap();

  useEffect(() => {
    if (coordenadas?.length) {
      map.fitBounds(coordenadas, { padding: [40, 40] });
    }
  }, [map, coordenadas]);

  return null;
}

export default function MapR({
  coordenadas,
  popupText = "Punto de ruta"
}) {
  const [geometriaRuta, setGeometriaRuta] = useState(coordenadas);
  const [cargandoRuta, setCargandoRuta] = useState(false);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Consultar OSRM para obtener el trazado por carretera
  useEffect(() => {
    if (!coordenadas || coordenadas.length < 2) {
      setGeometriaRuta(coordenadas);
      return;
    }

    const obtenerRutaCarretera = async () => {
      setCargandoRuta(true);
      try {
        const origen = coordenadas[0];
        const destino = coordenadas[coordenadas.length - 1];

        // Formato OSRM: lon,lat;lon,lat
        const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;

        const respuesta = await fetch(urlOSRM);
        const data = await respuesta.json();

        if (data.routes && data.routes[0]) {
          // OSRM devuelve [lon, lat], lo invertimos para Leaflet [lat, lon]
          const trazadoCarretera = data.routes[0].geometry.coordinates.map(
            (coord) => [coord[1], coord[0]]
          );
          setGeometriaRuta(trazadoCarretera);
        } else {
          setGeometriaRuta(coordenadas);
        }
      } catch (error) {
        console.error("Error al obtener la ruta por carretera:", error);
        setGeometriaRuta(coordenadas);
      } finally {
        setCargandoRuta(false);
      }
    };

    obtenerRutaCarretera();
  }, [coordenadas]);

  if (!coordenadas || coordenadas.length === 0) {
    return <p className="font-sans text-center text-cream">Cargando mapa...</p>;
  }

  return (
    <div className="relative w-full h-[400px]">
      {cargandoRuta && (
        <div className="absolute top-2 right-2 z-[1000] bg-brand/90 text-cream text-xs px-3 py-1.5 rounded-md font-sans shadow">
          Calculando trazado por carretera...
        </div>
      )}

      <MapContainer
        key={popupText}
        center={coordenadas[0]}
        zoom={9}
        style={{ height: '400px', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={geometriaRuta}
          color="#3b82f6"
          weight={5}
          opacity={0.85}
        />

        {coordenadas.map((coord, index) => {
          let etiqueta = "Parada";
          if (index === 0) etiqueta = "Origen";
          else if (index === coordenadas.length - 1) etiqueta = "Destino";

          return (
            <Marker key={index} position={coord}>
              <Popup>
                <div className="font-sans">
                  <strong>{etiqueta}</strong><br />
                  {popupText}
                </div>
              </Popup>
            </Marker>
          );
        })}

        <FitBounds coordenadas={geometriaRuta} />
      </MapContainer>
    </div>
  );
}