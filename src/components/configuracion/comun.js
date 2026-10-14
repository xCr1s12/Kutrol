// clases que se repiten en varios componentes
<<<<<<< HEAD
export const tarjeta =
  "bg-card text-text border border-border rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]";
export const campo =
  "text-xs font-normal text-text bg-background border border-icon rounded-md px-3 py-2 disabled:opacity-50 placeholder:text-subtext focus:outline-none focus:ring-1 focus:ring-accent";
export const botonAmarillo =
  "inline-flex items-center justify-center gap-1 bg-accent text-brand light:text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const bordeError = "outline outline-1 outline-danger";
export const botonIcono =
  "w-9 h-9 shrink-0 rounded-full bg-background text-icon hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
// titulo de cada tarjeta con una rayita amarilla al lado, como en la pagina de inicio
export const titulo =
  "flex items-center gap-2 text-text font-bold text-lg before:content-[''] before:w-1 before:h-5 before:rounded-full before:bg-accent";
=======
export const tarjeta = "bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]";
export const campo =
  "text-xs font-normal text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-3 py-2 disabled:opacity-50";
export const botonAmarillo =
  "inline-flex items-center justify-center gap-1 bg-accent text-[#1A1A1A] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-accent-dark";
export const bordeError = "outline outline-1 outline-red-500";
<<<<<<< HEAD
export const botonIcono = "w-7 h-7 rounded-full bg-[#F4F5F7] hover:bg-[#E9EAED]";
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
export const botonIcono = "w-9 h-9 shrink-0 rounded-full bg-[#F4F5F7] hover:bg-[#E9EAED]";
// titulo de cada tarjeta con una rayita amarilla al lado, como en la pagina de inicio
export const titulo =
  "flex items-center gap-2 text-[#1A1A1A] font-bold text-lg before:content-[''] before:w-1 before:h-5 before:rounded-full before:bg-accent";
>>>>>>> 835c9c1 (arrelgando iconos y limite pantalla)

// valores de los umbrales y del rendimiento
export const valores = [10, 20, 30, 40, 50, 60];

// lee la imagen elegida y se la pasa a la funcion que la guarda
export function elegirImagen(e, guardar) {
  const archivo = e.target.files[0];
  if (archivo) guardar(URL.createObjectURL(archivo));
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b3d41a (Agregando archivos de pagina "Configuracion")
=======
}
>>>>>>> 835c9c1 (arrelgando iconos y limite pantalla)
