export default function StatisticCard({ Title, text, SubText, icon, ariaLabel }) {
  return (
    <div 
      className="flex flex-col border-2 border-border p-5 rounded-2xl shadow-sm bg-card text-text light:border-border light:bg-card light:text-text dark:border-border dark:bg-card dark:text-text"
      aria-label={ariaLabel}
    >
      <h3 className="font-semibold text-base">{Title}</h3>
      
      <div className="flex flex-row justify-between items-center my-1"> 
        <p className="font-bold text-2xl">{text}</p>
        {icon}
      </div>
      
      <p className="text-sm text-subtext light:text-subtext dark:text-subtext">{SubText}</p>
    </div>
  );
}