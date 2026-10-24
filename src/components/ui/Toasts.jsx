"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ToastContext = createContext({ mostrar: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const DURACION_MS = 5000;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const quitar = useCallback((id) => {
    setToasts((actuales) => actuales.filter((toast) => toast.id !== id));
  }, []);

  const mostrar = useCallback(
    (mensaje, tipo = "exito") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((actuales) => [...actuales, { id, mensaje, tipo }]);
      setTimeout(() => quitar(id), DURACION_MS);
    },
    [quitar],
  );

  const valor = useMemo(() => ({ mostrar }), [mostrar]);

  return (
    <ToastContext.Provider value={valor}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
      >
        {toasts.map((toast) => {
          const esError = toast.tipo === "error";
          const Icono = esError ? ErrorRoundedIcon : CheckCircleRoundedIcon;

          return (
            <div
              key={toast.id}
              role={esError ? "alert" : "status"}
              className={`pointer-events-auto flex items-start gap-2 rounded-lg border-2 bg-card px-4 py-3 text-sm text-text shadow-lg ${
                esError ? "border-danger" : "border-accent"
              }`}
            >
              <Icono
                aria-hidden="true"
                fontSize="small"
                className={esError ? "text-danger" : "text-accent"}
              />
              <span className="flex-1">{toast.mensaje}</span>
              <button
                type="button"
                onClick={() => quitar(toast.id)}
                aria-label="Cerrar notificación"
                className="rounded p-0.5 text-icon transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
              >
                <CloseRoundedIcon fontSize="small" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
