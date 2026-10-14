import 'leaflet/dist/leaflet.css';
import { Geist, Geist_Mono, Poppins } from "next/font/google";
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
      className={` ${geistMono.variable} ${geistSans.variable} ${poppins.variable} h-full antialiased`}
    >

      <body className=" font-pop bg-[#1B2B24] min-h-full flex flex-col">{children}</body>
    </html>
  );
}
