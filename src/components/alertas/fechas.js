const unDia = 24 * 60 * 60 * 1000;

// dias completos entre la fecha y hoy (0 = hoy, 1 = ayer)
export function diasDesde(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const dia = new Date(fecha);
  dia.setHours(0, 0, 0, 0);
  return Math.round((hoy - dia) / unDia);
}

// texto corto para la linea de tiempo: ahora, hoy, ayer, hace 3 dias
export function haceCuanto(fecha) {
<<<<<<< HEAD
<<<<<<< HEAD
  const minutos = (Date.now() - new Date(fecha).getTime()) / 60000;
=======
  const minutos = (Date.now() - new Date(fecha)) / 60000;
>>>>>>> 0c414e2 (pagina de alerta)
=======
  const minutos = (Date.now() - new Date(fecha).getTime()) / 60000;
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
  if (minutos < 60) return "Ahora";

  const dias = diasDesde(fecha);
  if (dias === 0) return "Hoy";
  if (dias === 1) return "Ayer";
  return `Hace ${dias} días`;
}

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0c414e2 (pagina de alerta)
=======

>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
export function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-CL");
}
