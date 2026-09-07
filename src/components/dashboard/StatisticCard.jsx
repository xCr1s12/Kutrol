export default function StatisticCard({ Title , text , SubText, icon }) {
    return (
        <div className = " flex flex-col  border-[#EAE5DA] border-2 p-5 rounded-2xl shadow-sm bg-[#FDFBF7]   ">
            <span className=" text-[#1A1A1A] font-semibold text-md "> {Title} </span>
            <div className=" flex flex-row items-center"> 
                <h2 className="text-[#1A1A1A] font-bold"> {text} </h2>
                {icon}
            </div>
            <p className="text-sm text-[#6E6E6E]"> {SubText}</p>
        </div>
    )

}