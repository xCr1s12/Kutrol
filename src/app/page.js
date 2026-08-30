'use client';
import { useRouter } from 'next/navigation';
import { Big_Shoulders } from 'next/font/google';
import Image from 'next/image';

const big_Shoulders = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-big-shoulders',
});

export default function Home() {
  const router = useRouter();

  const handleRedirect = (route) => {
    router.push(route);
  };

  return (
    <div className="w-full min-h-screen bg-brand" lang="es">
      {/* Navbar */}
      <header className="w-full bg-brand flex items-center justify-between px-8 py-4 border-b-border border-b-2">
        <span className="text-2xl font-bold text-text tracking-tighter">
          Kutrol
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleRedirect('/login')}
            className="text-sm font-medium text-subtext transition-colors hover:text-text px-4 py-2"
          >
            Iniciar Sesion
          </button>
          <button
            onClick={() => handleRedirect('/register')}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Registrarse
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-2 w-full min-h-screen items-center px-18 gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-subtext">
            · Herramienta de Gestion de Flota y Combustible
          </p>
          <h1 className="text-5xl font-bold uppercase leading-tight text-text">
            Rentabilidad <br />
            Para ti <br />
            Respiro para el <br />
            planeta
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-subtext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
            velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
            commodo lectus, ac blandit elit.
          </p>
        </div>

        {/* Imágenes superpuestas */}
        <div className="relative w-full max-w-[650px] h-[380px] sm:h-[480px] flex items-center justify-center mx-auto">
          <div className="absolute top-0 left-0 w-[82%] rounded-lg overflow-hidden shadow-xl -translate-x-2 -translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980331/imagen_2026-08-29_011211191.png"
              alt="Vista previa del panel de estadísticas de Kutrol"
              width={400}
              height={400}
              className="w-full h-auto object-cover opacity-80"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-10 w-[85%] rounded-lg overflow-hidden shadow-2xl border border-white/10 translate-x-2 translate-y-2">
            <Image
              src="https://res.cloudinary.com/ur93naqo/image/upload/v1787980138/imagen_2026-08-29_010859066.png"
              alt="Captura del dashboard principal de Kutrol"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* placeholder sección "Qué hace" */}
      <div className="w-full items-center min-h-screen" />
    </div>
  );
}