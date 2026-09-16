export default function StatisticCard({ Title, text, SubText, icon, ariaLabel }) {
  return (
    <div 
      className="flex flex-col border-[#EAE5DA] border-2 p-5 rounded-2xl shadow-sm bg-[#FDFBF7] text-[#1A1A1A]"
      aria-label={ariaLabel}
    >
      <h3 className="font-semibold text-base">{Title}</h3>
      
      <div className="flex flex-row justify-between items-center my-1"> 
        <p className="font-bold text-2xl">{text}</p>
        {icon}
      </div>
      
      <p className="text-sm text-[#6E6E6E]">{SubText}</p>
    </div>
  );
}