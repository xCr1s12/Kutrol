const RADIO_TIERRA_KM = 6371;

export function calcularDistanciaKm(origen, destino) {
  const valores = [
    origen?.latitud,
    origen?.longitud,
    destino?.latitud,
    destino?.longitud,
  ];
  if (valores.some((valor) => valor === null || valor === undefined || valor === "")) {
    return null;
  }

  const coordenadas = valores.map(Number);

  if (
    coordenadas.some((coordenada) => !Number.isFinite(coordenada)) ||
    Math.abs(coordenadas[0]) > 90 ||
    Math.abs(coordenadas[2]) > 90 ||
    Math.abs(coordenadas[1]) > 180 ||
    Math.abs(coordenadas[3]) > 180
  ) {
    return null;
  }

  const [latOrigen, lonOrigen, latDestino, lonDestino] = coordenadas.map(
    (coordenada) => (coordenada * Math.PI) / 180,
  );
  const diferenciaLatitud = latDestino - latOrigen;
  const diferenciaLongitud = lonDestino - lonOrigen;
  const haversine =
    Math.sin(diferenciaLatitud / 2) ** 2 +
    Math.cos(latOrigen) *
      Math.cos(latDestino) *
      Math.sin(diferenciaLongitud / 2) ** 2;

  return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(haversine));
}
