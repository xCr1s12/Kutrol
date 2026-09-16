"use client";

import Image from "next/image"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function CardKutrol({ Nombre, Rol, Imagen, Descripcion, ig, lk, git }) {
    return (
        <div className="relative w-80 h-[480px] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between p-4">
            {/* imagen */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={Imagen} 
                    alt={`Fotografia de ${Nombre}`}
                    fill
                    className="object-cover object-center"
                    priority 
                />
            </div>

            <div className=" w-full relative z-20 bg-[#1B2B24] rounded-2xl p-5 flex flex-col items-center text-center mt-auto shadow-lg">
                
                <h2 className="text-2xl font-bold text-[#FDFBF7]">{Nombre}</h2>
                
                <span className="text-sm text-[#A8B0AB] mb-4">{Rol}</span>
                
                <div className="flex gap-3 mt-1 mb-4">
                    <a
                        href={git}
                        className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                        aria-label="github"
                    >
                        <GitHubIcon sx={{fontSize: 16}} />
                    </a>
                    <a
                        href={ig}
                        className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                        aria-label="Instagram"
                    >
                        <InstagramIcon sx={{fontSize: 16}} />
                    </a>
                    <a
                        href={lk}
                        className="w-8 h-8 rounded-full bg-[#314139] flex items-center justify-center text-[#D4AF37] hover:bg-[#3d4f45] transition-colors"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon sx={{fontSize: 16}} />
                    </a>
                </div>                
                
                <p className="text-xs text-[#A8B0AB] line-clamp-4">{Descripcion}</p>
            </div>
        </div>
    )
}