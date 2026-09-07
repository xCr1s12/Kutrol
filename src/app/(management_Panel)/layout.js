import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/Header";

export default function DashboardLayout({children}) {
  return (
    <div className="flex w-full h-screen bg-[#FDFBF7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <Header />

        <main className="bg-[#F5F5F5] w-full flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
