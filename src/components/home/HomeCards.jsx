export default function HomeCards({title, description, icon}) {
    return (
        
        // Cards Reutilizables para Home 
        <div className="flex flex-col h-50 w-100 bg-[#314139] rounded-2xl p-7 max-w-full max-sm:w-full max-sm:h-auto max-sm:p-5">
            
            {/* fila superior: titulo y icono */}
            <div className=" flex items-center justify-between h-1/2 p-5 max-sm:p-3">
                
                <h3 className="text-2xl font-bold text-[#FDFBF7]   max-sm:text-xl">{title}</h3>
                <div className=" font-bold flex h-7 w-7 items-center justify-center mr-10 max-sm:mr-4">
                    {icon}
                </div>
            </div>

            {/* fila inferior: icono y descripcion*/}
            <div className=" flex items-end justify-between h-1/2 ">

                <div  aria-hidden="true " className=" flex h-5 w-5 items-center justify-center max-w-1/4 font-bold p-5 ml-10 max-sm:ml-4 max-sm:p-3">
                    {icon}
                </div>
                <p className=" font-semibold text-sm text-[#A8B0AB] justify-center  ">{description} </p>
            
            </div>
        </div>
    );

};