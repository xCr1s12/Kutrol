"use client";

import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { PAISES, construirTelefono, detectarPais, soloDigitos } from "@/lib/paises";

export default function CampoTelefono({ valor = "", indice = 0, onChange, error }) {
  const [codigo, setCodigo] = useState(() => detectarPais(valor).codigo);
  const pais = PAISES.find((opcion) => opcion.codigo === codigo) ?? PAISES[0];
  const paisValor = detectarPais(valor);
  const numero = soloDigitos(String(valor).slice(paisValor.codigo.length));

  return (
    <div
      className={`flex h-11 items-stretch overflow-hidden rounded-[10px] border bg-background transition-colors ${
        error ? "border-danger" : "border-border focus-within:border-accent"
      }`}
    >
      <div className="relative flex items-center">
        <select
          aria-label={`País del teléfono ${indice + 1}`}
          value={codigo}
          onChange={(evento) => {
            setCodigo(evento.target.value);
            onChange(construirTelefono(evento.target.value, numero));
          }}
          className="h-full appearance-none bg-transparent pl-3.5 pr-7 text-sm text-text outline-none"
        >
          {PAISES.map((opcion) => (
            <option key={opcion.iso} value={opcion.codigo} className="text-text bg-background">
              {opcion.codigo}
            </option>
          ))}
        </select>
        <KeyboardArrowDownRoundedIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-1.5 text-subtext/70"
          sx={{ fontSize: 18 }}
        />
      </div>
      <span className="my-2 w-px bg-border" aria-hidden="true" />
      <input
        type="tel"
        inputMode="numeric"
        aria-label={`Teléfono ${indice + 1}`}
        required={indice === 0}
        maxLength={pais.digitos}
        placeholder={pais.ejemplo}
        value={numero}
        onChange={(evento) => onChange(construirTelefono(codigo, evento.target.value))}
        aria-invalid={error ? true : undefined}
        className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-sm text-text outline-none placeholder:text-subtext/60"
      />
    </div>
  );
}
