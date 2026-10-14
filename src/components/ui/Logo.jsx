import Link from "next/link";

// logo de kutrol para todas las paginas, si cambia el logo se cambia solo aca
// fondo = color del fondo donde va: "oscuro" usa letras blancas, "claro" letras oscuras
export default function Logo({ fondo = "oscuro", href = "/", className = "h-10" }) {
  const src =
    fondo === "oscuro"
      ? "/images/logo-kutrol-completo-claro.svg"
      : "/images/logo-kutrol-completo.svg";

  return (
    <Link href={href} className="inline-flex shrink-0">
      <img src={src} alt="Kutrol, ir al inicio" className={`${className} w-auto`} />
    </Link>
  );
}