import path from "node:path";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

/*
 * Next resuelve el alias "@/..." y el marcador "server-only" en tiempo de build;
 * node:test no. Estos hooks replican ambas resoluciones para poder importar los
 * servicios sin arrancar Next y sin tocar la base de datos.
 *
 * Se importa como primera línea de cada archivo de test: `import "./harness.mjs";`.
 */
const RAIZ = path.resolve(import.meta.dirname, "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const destino = path.join(RAIZ, "src", `${specifier.slice(2)}.js`);
      return nextResolve(pathToFileURL(destino).href, context);
    }
    if (specifier === "server-only") {
      const marcador = path.join(RAIZ, "node_modules", "server-only", "empty.js");
      return nextResolve(pathToFileURL(marcador).href, context);
    }
    return nextResolve(specifier, context);
  },
});
