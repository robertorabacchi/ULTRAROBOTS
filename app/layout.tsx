import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import TitanBadge from "@/components/titan/TitanBadge";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const baseUrl = process.env.SITE_URL || "https://ultrarobots.netlify.app";
const ogImage = `${baseUrl}/assets/og-image-cyan-white-oneline.PNG`;

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
  openGraph: {
    title: "ULTRAROBOTS | Meccatronica e AI",
    description: "Il futuro della robotica industriale integrata con l'intelligenza artificiale.",
    url: baseUrl,
    siteName: "ULTRAROBOTS",
    images: [{ url: ogImage }],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ULTRAROBOTS | Meccatronica e AI",
    description: "Il futuro della robotica industriale integrata con l'intelligenza artificiale.",
    images: [ogImage],
  },
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
          <footer className="bg-slate-950/80 backdrop-blur-md border-t border-sky-900/30 px-6 pb-10 pt-6" suppressHydrationWarning>
            <div className="max-w-4xl mx-auto mb-8 text-center">
              <a 
                href="/ai-robot-bridge" 
                className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/30 hover:border-cyan-500/50 px-4 py-2 rounded-lg bg-cyan-950/20 hover:bg-cyan-950/40"
              >
                <span className="text-[10px] tracking-widest uppercase">AI-Robot Bridge</span>
                <span className="text-cyan-500">→</span>
              </a>
            </div>
            <TitanBadge className="max-w-4xl mx-auto" />
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
