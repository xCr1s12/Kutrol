import 'leaflet/dist/leaflet.css';
import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import PanelHeaderServer from "@/components/ui/panelHeaderServer";
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/tokenSession';

<<<<<<< HEAD
=======

>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
export default async function DashboardLayout({children}) {
    const session = await getSession();
    if (!session) redirect("/login");


  return (
    <div
      lang="es"
<<<<<<< HEAD
      className="panel-theme flex w-full h-screen overflow-hidden light:bg-background dark:bg-background"
=======
      className=" flex w-full h-screen bg-text overflow-hidden"
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
    >
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <PanelHeaderServer />
<<<<<<< HEAD
        <main className="font-pop w-full flex-1 bg-background p-4 sm:p-8">
=======

        <main className=" font-pop bg-[#F5F5F5] w-full flex-1 p-4 sm:p-8">
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
          {children}
        </main>

      </div>
    </div>
  );
}
