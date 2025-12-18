import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import TitanBadge from "@/components/titan/TitanBadge";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ULTRAROBOTS | Meccatronica e AI",
  description: "Il futuro della robotica industriale integrata con l'intelligenza artificiale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white selection:bg-cyan-500/30`}
      >
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <footer className="px-6 pb-10">
          <TitanBadge className="max-w-4xl mx-auto" />
        </footer>
      </body>
    </html>
  );
}
