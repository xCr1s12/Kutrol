"use client";

import Link from "next/link"; 
import { useHookNavigation } from "@/hooks/useAuthRedirect"; 
import { useState } from "react";


export default function HomeHeader() {
    {
        /* hook personalizado de navegacion y auth */
    }

    const { handleRedirect } = useHookNavigation();
    const {hasNav, setHasNav} = useState(false);
    return (
        <div
            className={` font-big w-full overflow-hidden `}
            lang="es"
        >
            <header className=" w-full bg-[#1B2B24] flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-[#314139] border-b-2 flex-wrap gap-2">
                {/* Logo Kutrol y Nombre */}
                <span className=" text-xl sm:text-2xl font-bold text-[#FDFBF7] tracking-tighter">
                    Kutrol
                </span>

                
                {/* Contenedor Botones de registro y inicio de sesion */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => {
                            handleRedirect("/login");
                        }}
                        className="text-xs sm:text-sm font-medium text-[#A8B0AB] transition-colors hover:text-[#FDFBF7] px-2 sm:px-4 py-1 sm:py-2"
                    >
                        Iniciar Sesion
                    </button>

                    <button
                        onClick={() => {
                            handleRedirect("/register");
                        }}
                        className="rounded-md bg-[#D4AF37] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                    >
                        Registrarse
                    </button>
                </div>
            </header>
        </div>
    );
}
 
    
    {/* barra de navegacion 
                <nav className="items-center px-4 py-2">
                    <ul className="flex flex-row ustify-between gap-3 items-center   ">
                        <li>
                            {" "}
                            <Link
                                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                                href={"#Que-hace-kutrol"}
                            >
                                ¿Qué hace?{" "}
                            </Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link
                                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                                href={"#Pasos"}
                            >
                                Pasos{" "}
                            </Link>
                        </li>
                        <li>
                            {" "}
                            <Link
                                className="text-[#A8B0AB] hover:text-[#FDFBF7]"
                                href={"#Registrate"}
                            >
                                Registrate{" "}
                            </Link>
                        </li>
                    </ul>
                </nav> 
                */}