import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import TitanBadge from "@/components/titan/TitanBadge";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
    <html lang="it" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <footer className="px-6 pb-10" suppressHydrationWarning>
            <TitanBadge className="max-w-4xl mx-auto" />
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
