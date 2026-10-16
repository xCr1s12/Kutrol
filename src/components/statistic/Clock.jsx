"use client";
import { useState, useEffect } from "react";

export default function Clock({ className = "", role }) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false)
  

  useEffect(() => {
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      setMounted(true);
      clearInterval(timer)};
  }, []);

  if (!mounted) {
    return (
      <span
        className={`text-subtext inline-flex items-center text-xs ${className}`}
      >
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
  const fechaFormatted =
    fechaBruta.charAt(0).toUpperCase() + fechaBruta.slice(1);

  const horaFormatted = time.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`text-subtext inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${className}`}
      role={role}
    >
      <span className="flex items-center gap-1">
        <span>📅</span>
        <span>{fechaFormatted}</span>
      </span>
      <span className="text-border">•</span>
      <span className="flex items-center gap-1">
        <span>🕒</span>
        <span>{horaFormatted}</span>
      </span>
    </div>
  );
}
