import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/PanelHeader";

export default function DashboardLayout({children}) {
  return (
    <div
      lang="es"
      className=" flex w-full h-screen bg-[#FDFBF7] overflow-hidden"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <Header />

        <main className=" font-pop bg-[#F5F5F5] w-full flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
