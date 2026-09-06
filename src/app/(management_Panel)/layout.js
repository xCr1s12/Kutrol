import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/Header";

export default function DashboardLayout({children}) {
  return (
    <div className="flex w-full min-h-screen bg-[#FDFBF7] overflow-hidden">
      {/* 1. Sidebar lateral estático */}
      <Sidebar />

      {/* 2. Contenedor principal derecho */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        {/* Inyección dinámica del contenido de cada página */}
        <main className="bg-[#ffffff] w-full flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
