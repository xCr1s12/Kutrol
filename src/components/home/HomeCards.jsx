export default function HomeCards({title, description, icon}) {
    return (
        <div className="flex flex-col h-50 w-100 bg-[#314139] rounded-2xl p-7 max-w-full max-sm:w-full max-sm:h-auto max-sm:p-5">
            
            {/* fila superior: icono y titulo */}
            <div className="flex items-center gap-4 h-1/2 p-5 max-sm:p-3">
                <div className="font-bold flex h-12 w-12 items-center justify-center text-[#D4AF37] max-sm:h-10 max-sm:w-10">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-[#FDFBF7] max-sm:text-xl">{title}</h3>
            </div>

            {/* fila inferior: descripcion */}
            <div className="flex items-end justify-between h-1/2">
                <p className="font-semibold text-sm text-[#A8B0AB] justify-center">{description}</p>
            </div>
        </div>
    );
};