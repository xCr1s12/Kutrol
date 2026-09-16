'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css'; 

export default function MapR({ 
  coordenadas, 
  zoom = 9,    
  popupText = "Punto de ruta" 
}) {
  
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!coordenadas || coordenadas.length === 0) return <p>Cargando mapa...</p>;

  const centroMapa = coordenadas[0];

  return (
    <MapContainer 
      center={centroMapa} 
      zoom={zoom} 
      style={{ height: '400px', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Polyline 
        positions={coordenadas} 
        color="#3b82f6" 
        weight={5} 
        opacity={0.8} 
      />

      {coordenadas.map((coord, index) => {

        let etiqueta = "Parada";
        if (index === 0) etiqueta = "Origen";
        else if (index === coordenadas.length - 1) etiqueta = "Destino";

        return (
          <Marker key={index} position={coord}>
            <Popup>
              <strong>{etiqueta}</strong><br/>
              {popupText}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}