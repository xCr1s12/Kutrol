"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

export const darkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

const STORAGE_KEY = "darkMode";
const THEME_EVENT = "kutrol:theme";
const DEFAULT_DARK = true;

// useLayoutEffect avisa en el servidor: ahi no hay DOM que ajustar.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function aplicarClase(darkMode) {
  const clases = document.documentElement.classList;
  clases.toggle("light", !darkMode);
  clases.toggle("dark", darkMode);
}

function leerGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado === null ? DEFAULT_DARK : guardado === "true";
  } catch {
    // localStorage puede no estar disponible (modo privado)
    return DEFAULT_DARK;
  }
}

// El script inline del layout ya dejo la clase correcta antes del primer
// pintado, asi que el DOM es la fuente de verdad del tema.
function suscribir(alCambiar) {
  window.addEventListener(THEME_EVENT, alCambiar);
  window.addEventListener("storage", alCambiar);
  return () => {
    window.removeEventListener(THEME_EVENT, alCambiar);
    window.removeEventListener("storage", alCambiar);
  };
}

function leerDelDom() {
  return document.documentElement.classList.contains("dark");
}

function leerDelServidor() {
  return DEFAULT_DARK;
}

export default function DarkModeProvider({ children }) {
  const darkMode = useSyncExternalStore(
    suscribir,
    leerDelDom,
    leerDelServidor,
  );

  // En desarrollo React remonta y limpia los atributos de <html>, borrando la
  // clase que fijo el script. Se reaplica antes del pintado (no-op en prod).
  useIsomorphicLayoutEffect(() => {
    aplicarClase(leerGuardado());
  }, []);

  const toggleDarkMode = useCallback(() => {
    const siguiente = !document.documentElement.classList.contains("dark");
    try {
      localStorage.setItem(STORAGE_KEY, String(siguiente));
    } catch {
      // localStorage puede no estar disponible (modo privado)
    }
    aplicarClase(siguiente);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}
