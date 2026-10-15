"use client";

import { useState, useEffect } from "react";

export default function Clock({ className = "", role }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <span className={`text-xs text-[#4A4A4A] inline-flex items-center ${className}`}>
        Cargando hora...
      </span>
    );
  }

  // Obtenemos la fecha en español
  const fechaBruta = time.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Capitalizamos ÚNICAMENTE la primera letra del día (ej: "Miércoles, 16 de septiembre")
  const fechaFormatted = fechaBruta.charAt(0).toUpperCase() + fechaBruta.slice(1);

  const horaFormatted = time.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`inline-flex items-center gap-2 text-xs font-medium text-[#4A4A4A] whitespace-nowrap ${className}`} role={role}>
      <span className="flex items-center gap-1">
        <span>📅</span>
        <span>{fechaFormatted}</span>
      </span>
      <span className="text-gray-300">•</span>
      <span className="flex items-center gap-1">
        <span>🕒</span>
        <span>{horaFormatted}</span>
      </span>
    </div>
  );
}