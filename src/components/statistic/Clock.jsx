"use client";
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

=======
>>>>>>> f577f5f (minor changes)
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
<<<<<<< HEAD
<<<<<<< HEAD
      <span className={`text-xs text-[#4A4A4A] inline-flex items-center ${className}`}>
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
      <span className={`text-subtext inline-flex items-center text-xs ${className}`}>
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
=======
      <span
        className={`text-subtext inline-flex items-center text-xs ${className}`}
      >
>>>>>>> f577f5f (minor changes)
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
<<<<<<< HEAD
<<<<<<< HEAD
  const fechaFormatted =
    fechaBruta.charAt(0).toUpperCase() + fechaBruta.slice(1);
=======
  const fechaFormatted = fechaBruta.charAt(0).toUpperCase() + fechaBruta.slice(1);
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
  const fechaFormatted =
    fechaBruta.charAt(0).toUpperCase() + fechaBruta.slice(1);
>>>>>>> f577f5f (minor changes)

  const horaFormatted = time.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
<<<<<<< HEAD
<<<<<<< HEAD
  });

  return (
    <div
      className={`text-subtext inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${className}`}
      role={role}
    >
=======
    second: "2-digit",
  });

  return (
<<<<<<< HEAD
    <div className={`inline-flex items-center gap-2 text-xs font-medium text-[#4A4A4A] whitespace-nowrap ${className}`} role={role}>
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
    <div className={`text-subtext inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${className}`} role={role}>
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
=======
  });

  return (
    <div
      className={`text-subtext inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${className}`}
      role={role}
    >
>>>>>>> f577f5f (minor changes)
      <span className="flex items-center gap-1">
        <span>📅</span>
        <span>{fechaFormatted}</span>
      </span>
<<<<<<< HEAD
<<<<<<< HEAD
      <span className="text-border">•</span>
=======
      <span className="text-gray-300">•</span>
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
      <span className="text-border">•</span>
>>>>>>> 612f808 (feat(statistic): update statistic page and components)
      <span className="flex items-center gap-1">
        <span>🕒</span>
        <span>{horaFormatted}</span>
      </span>
    </div>
  );
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 169239c (rama feature/estadistica con FrontEnd  (Pestañas del Menú funcionando por individual, fusión del fronted y estadistica con generación de datos sinteticos))
=======
}
>>>>>>> f577f5f (minor changes)
