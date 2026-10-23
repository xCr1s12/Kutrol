"use client";

import Link from "next/link"; 
import { useHookNavigation } from "@/hooks/useAuthRedirect"; 
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { darkModeContext } from "@/components/ui/DarkModeProvider";
import Logo from "./Logo";


export default function HomeHeader() {
    {
        /* hook personalizado de navegacion y auth */
    }

    const { handleRedirect } = useHookNavigation();
    const { darkMode, toggleDarkMode } = useContext(darkModeContext);
    return (
        <div
            className={` font-big w-full overflow-hidden `}
            lang="es"
        >
            <header className="w-full bg-header flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-border border-b-2 flex-wrap gap-2">
                <Logo fondo={darkMode ? "oscuro" : "claro"} />

                
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        aria-pressed={darkMode}
                        className="cursor-pointer rounded-md p-2 text-icon transition-colors hover:bg-border/50 hover:text-text"
                    >
                        {darkMode ? <LightModeOutlinedIcon /> : <ModeNightOutlinedIcon />}
                    </button>

                    <button
                        onClick={() => {
                            handleRedirect("/login");
                        }}
                        className="text-xs sm:text-sm font-medium text-subtext transition-colors hover:text-text px-2 sm:px-4 py-1 sm:py-2"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={() => {
                            handleRedirect("/register");
                        }}
                        className="rounded-md bg-gold light:bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-ink light:text-white transition-all duration-200 hover:shadow-[0_0_12px_rgba(212,175,55,0.6)] light:hover:shadow-[0_0_12px_rgba(140,98,57,0.5)]"
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