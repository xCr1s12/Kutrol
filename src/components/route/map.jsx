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
  const [trazadoResuelto, setTrazadoResuelto] = useState(null);
  const claveRuta = JSON.stringify(coordenadas);

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
    if (!coordenadas || coordenadas.length < 2) return;

    const controller = new AbortController();

    const obtenerRutaCarretera = async () => {
      try {
        // Formato OSRM: lon,lat;lon,lat, incluyendo cada punto de control.
        const waypoints = coordenadas
          .map(([latitud, longitud]) => `${longitud},${latitud}`)
          .join(";");
        const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;

        const respuesta = await fetch(urlOSRM, { signal: controller.signal });
        if (!respuesta.ok) {
          throw new Error(`OSRM respondió con estado ${respuesta.status}`);
        }
        const data = await respuesta.json();
        const ruta = data.routes?.[0];
        const paradasAjustadas = data.waypoints?.map(
          ({ location }) => [location[1], location[0]],
        );

        if (
          data.code === "Ok" &&
          ruta?.geometry?.coordinates?.length > 0 &&
          paradasAjustadas?.length === coordenadas.length &&
          paradasAjustadas.every((punto) =>
            punto.every(Number.isFinite),
          )
        ) {
          // OSRM devuelve [lon, lat]; Leaflet necesita [lat, lon].
          const geometria = ruta.geometry.coordinates.map(
            (coord) => [coord[1], coord[0]]
          );
          setTrazadoResuelto({
            clave: claveRuta,
            geometria,
            paradas: paradasAjustadas,
          });
        } else {
          throw new Error("OSRM no devolvió el trazado completo con todos los puntos.");
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Error al obtener la ruta por carretera:", error);
        setTrazadoResuelto({
          clave: claveRuta,
          geometria: coordenadas,
          paradas: coordenadas,
        });
      }
    };

    obtenerRutaCarretera();
    return () => controller.abort();
  }, [coordenadas, claveRuta]);

  if (!coordenadas || coordenadas.length === 0) {
    return <p className="font-sans text-center text-cream">Cargando mapa...</p>;
  }

  const trazadoActual =
    trazadoResuelto?.clave === claveRuta ? trazadoResuelto : null;
  const geometriaDibujada = trazadoActual?.geometria ?? coordenadas;
  const paradasDibujadas = trazadoActual?.paradas ?? coordenadas;
  const cargandoRuta = coordenadas.length > 1 && !trazadoActual;

  return (
    <div className="relative w-full h-[400px]">
      {cargandoRuta && (
        <div className="absolute top-2 right-2 z-[1000] bg-brand/90 text-cream text-xs px-3 py-1.5 rounded-md font-sans shadow">
          Calculando trazado por carretera...
        </div>
      )}

      <MapContainer
        key={claveRuta}
        center={coordenadas[0]}
        zoom={9}
        style={{ height: '400px', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={geometriaDibujada}
          color="#3b82f6"
          weight={5}
          opacity={0.85}
        />

        {paradasDibujadas.map((coord, index) => {
          let etiqueta = `Punto de control ${index}`;
          if (index === 0) etiqueta = "Origen";
          else if (index === paradasDibujadas.length - 1) etiqueta = "Destino";

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

        <FitBounds coordenadas={geometriaDibujada} />
      </MapContainer>
    </div>
  );
}