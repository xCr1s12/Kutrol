"use client";

import Link from "next/link"; 
import { useHookNavigation } from "@/hooks/useAuthRedirect"; 
import { useState } from "react";
import Logo from "./Logo";


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
            <header className=" w-full bg-brand flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-moss border-b-2 flex-wrap gap-2">
                {/* Logo Kutrol y Nombre */}
                <Logo/>

                
                {/* Contenedor Botones de registro y inicio de sesion */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => {
                            handleRedirect("/login");
                        }}
                        className="text-xs sm:text-sm font-medium text-sage transition-colors hover:text-cream px-2 sm:px-4 py-1 sm:py-2"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={() => {
                            handleRedirect("/register");
                        }}
                        className="rounded-md bg-gold px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-ink transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]"
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
                                className="text-sage hover:text-cream"
                                href={"#Que-hace-kutrol"}
                            >
                                ¿Qué hace?{" "}
                            </Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link
                                className="text-sage hover:text-cream"
                                href={"#Pasos"}
                            >
                                Pasos{" "}
                            </Link>
                        </li>
                        <li>
                            {" "}
                            <Link
                                className="text-sage hover:text-cream"
                                href={"#Registrate"}
                            >
                                Registrate{" "}
                            </Link>
                        </li>
                    </ul>
                </nav> 
                */}