"use client";

<<<<<<< HEAD
import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";
=======
import { createContext, useEffect, useState } from "react";
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)

export const darkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

<<<<<<< HEAD
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

=======
export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    document.documentElement.classList.toggle("light", !darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode, initialized]);

  const toggleDarkMode = () => {
    setDarkMode((current) => !current);
  };

>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> bd76fc1 (feat(ui): implement dark mode support and update panel views)
