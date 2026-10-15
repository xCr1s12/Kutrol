import "leaflet/dist/leaflet.css";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import DarkModeProvider from "@/components/ui/DarkModeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "KUTROL — Gestión Inteligente de Combustible",
  description:
    "Optimiza cada gota. Reduce tu huella. Dashboard de gestión de combustible para flotas de transporte.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistMono.variable} ${geistSans.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Fija el tema guardado antes del primer pintado: sin esto, quien usa
            modo claro ve un parpadeo oscuro -> claro. El script corre durante
            el parseo del HTML, antes de que React hidrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var s=localStorage.getItem("darkMode");var d=s===null?true:s==="true";var c=document.documentElement.classList;c.toggle("light",!d);c.toggle("dark",d)}catch(e){}})()',
          }}
        />
      </head>
      <body className="font-pop bg-background min-h-full flex flex-col">
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
