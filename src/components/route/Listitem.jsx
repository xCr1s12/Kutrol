import FmdGoodIcon from '@mui/icons-material/FmdGood';

export default function Listitem({ items, onSelect }) {

  if (!items || items.length === 0) {
    return <p>No hay Datos disponibles.</p>;
  }
  
  const Counter = (obj) => obj.viajes ? obj.viajes.length : 0;
  
  return (
    <>
      {items.map((item, i) => {
        return (
          <button 
            key={i} 
            onClick={() => onSelect && onSelect(item)}
            className="flex w-full items-center gap-2 p-3 border-[#EAE5DA] rounded-md text-left hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FmdGoodIcon htmlColor='#D4AF37' />
            
            <div>
              <h2 className="font-semibold text-[#1A1A1A]">{item.nombre}</h2>
              <span className="text-sm text-[#1A1A1A]">{Counter(item)}</span>              
            </div>
          </button> 
        );
      })}
    </>
  );
}