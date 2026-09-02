

import { Geist, Geist_Mono , Big_Shoulders} from "next/font/google";
import "../globals.css";



const big_Shoulders = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-big-shoulders',
  fallback: ['sans-serif', 'Arial'],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KUTROL — Gestión Inteligente de Combustible",
  description:
    "Optimiza cada gota. Reduce tu huella. Dashboard de gestión de combustible para flotas de transporte.",
};

export default function RootLayout({ children }) {
  return (
    <div
      lang="es"
      className={`${big_Shoulders.variable} ${geistMono.variable} ${geistSans.variable}  h-full antialiased`}
    >
      <main className="min-h-full flex flex-col">{children}</main>
    </div>
  );
}
