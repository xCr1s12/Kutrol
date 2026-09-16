"use client";

import { useState, useEffect } from "react";
import HomeHeader from "@/components/ui/HomeHeader";
import CardKutrol from "@/components/AboutKutrol/CardKutrol";
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Integrantes = [
  { Nombre: "Cristobal Oñate", Rol: "Frontend", Imagen: "https://res.cloudinary.com/l8olp2ix/image/upload/v1789529005/Avatar-1.jpg", Descripcion: "Estudiante de Ingenieria Civil en Informatica, amo el lol :v", ig: "https://www.instagram.com/cristobaal1_/", lk: "https://www.linkedin.com/in/cristobal-o%C3%B1ate-1b7679431/", git: "https://github.com/xCr1s12" },
  { Nombre: "Valentina Calderon", Rol: "UX", Imagen: "https://res.cloudinary.com/l8olp2ix/image/upload/v1789529116/Avatar-3.jpg", Descripcion: "Estudiante de Ingenieria Civil en Informatica, amo el Core Keeper", ig: "https://www.instagram.com/valentina_calderon.cl", lk: "https://www.linkedin.com/in/valentina-antonia-calder%C3%B3n-torres-a19a41249/", git: "https://github.com/LizzIna" },
  { Nombre: "Carla Vargas", Rol: "QA", Imagen: "https://res.cloudinary.com/l8olp2ix/image/upload/v1789529052/Avatar-2.jpg", Descripcion: "Estudiante de Ingenieria Civil en Informatica, amo el Core Keeper", ig: "https://www.instagram.com/valentina_calderon.cl", lk: "https://www.linkedin.com/in/valentina-antonia-calder%C3%B3n-torres-a19a41249/", git: "https://github.com/LizzIna" },
  { Nombre: "Claudio Uribe", Rol: "QA", Imagen: "https://res.cloudinary.com/hzpulemv/image/upload/v1789522215/Emo.jpg", Descripcion: "Estudiante de Ingenieria Civil en Informatica, amo el Core Keeper", ig: "https://www.instagram.com/valentina_calderon.cl", lk: "https://www.linkedin.com/in/valentina-antonia-calder%C3%B3n-torres-a19a41249/", git: "https://github.com/LizzIna" },
];

export default function Acerca_de() {
  const TOTAL_SLOTS = 3;
  const middleIndex = Math.floor(TOTAL_SLOTS / 2);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (Integrantes.length <= TOTAL_SLOTS) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % Integrantes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
    const integranteIndex = (startIndex + i) % Integrantes.length;
    return Integrantes[integranteIndex] ?? null;
  });

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % Integrantes.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + Integrantes.length) % Integrantes.length);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden" lang="es">
      <HomeHeader />

      <section className="w-full h-full flex flex-col items-center justify-center py-24">
        <div className="relative w-full flex flex-row items-center justify-center gap-6 sm:gap-10 mt-10 min-h-[450px]">

          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full  hover:bg-accent/50 shadow-md transition-colors"
          >
            <ArrowForwardIosIcon className="rotate-180" htmlColor="#FDFBF7" fontSize="small" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-accent/50   shadow-md transition-colors"
          >
            <ArrowForwardIosIcon htmlColor="#FDFBF7" fontSize="small" />
          </button>

          <AnimatePresence mode="popLayout">
            {slots.map((integrante, index) => {
              const isMiddle = index === middleIndex;

              if (!integrante) return null;

              return (
                <motion.div
                  layout
                  key={integrante.Nombre}
                  initial={{ opacity: 0, x: 150, scale: 0.9 }}
                  animate={{ 
                    opacity: isMiddle ? 1 : 0.8, 
                    x: 0, 
                    y: isMiddle ? -40 : 0,
                    scale: isMiddle ? 1.05 : 1
                  }}
                  exit={{ opacity: 0, x: -150, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex-shrink-0 origin-center"
                  style={{ zIndex: isMiddle ? 20 : 10 }}
                >
                  <CardKutrol
                    Nombre={integrante.Nombre}
                    Rol={integrante.Rol}
                    Imagen={integrante.Imagen}
                    Descripcion={integrante.Descripcion}
                    ig={integrante.ig}
                    lk={integrante.lk}
                    git={integrante.git}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}