import 'leaflet/dist/leaflet.css';
import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import PanelHeaderServer from "@/components/ui/panelHeaderServer";
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/tokenSession';

export default async function DashboardLayout({children}) {
    const session = await getSession();
    if (!session) redirect("/login");


  return (
    <div
      lang="es"
      className="panel-theme flex w-full h-screen overflow-hidden light:bg-background dark:bg-background"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <PanelHeaderServer />
        <main className="font-pop w-full flex-1 bg-background p-4 sm:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
