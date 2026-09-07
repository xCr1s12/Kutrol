"use client";

import {useState, useEffect} from "react";

export default function Clock() {
  const [Fecha, setFecha] = useState("");
  const [Hora, setHora] = useState("");

  useEffect(() => {
    const FormatoFecha = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const FormatoHora = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const ActualizarReloj = () => {
      const Ahora = new Date();
      setFecha(Ahora.toLocaleDateString("es-ES", FormatoFecha));
      setHora(Ahora.toLocaleTimeString("es-ES", FormatoHora));
    };

    ActualizarReloj();

    const intervalo = setInterval(ActualizarReloj, 60000);

    return () => clearInterval(intervalo);
  }, []);

  if (!Fecha || !Hora)
    return <span className="animate-pulse">Cargando...</span>;

  return (
    <span>
      {Fecha} - {Hora}
    </span>
  );
}
