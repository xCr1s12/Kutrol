// clases que se repiten en varios componentes
export const tarjeta = "bg-white rounded-xl p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]";
export const campo =
  "text-xs font-normal text-[#1A1A1A] bg-white border border-[#E2E8F0] rounded-md px-3 py-2 disabled:opacity-50";
export const botonAmarillo =
  "inline-flex items-center justify-center gap-1 bg-accent text-[#1A1A1A] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-accent-dark";
export const bordeError = "outline outline-1 outline-red-500";
export const botonIcono = "w-7 h-7 rounded-full bg-[#F4F5F7] hover:bg-[#E9EAED]";

// valores de los umbrales y del rendimiento
export const valores = [10, 20, 30, 40, 50, 60];

// lee la imagen elegida y se la pasa a la funcion que la guarda
export function elegirImagen(e, guardar) {
  const archivo = e.target.files[0];
  if (archivo) guardar(URL.createObjectURL(archivo));
}
