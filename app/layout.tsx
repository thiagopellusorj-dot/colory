import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PosthogProvider } from "@/components/providers/PosthogProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#9333ea",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Colory — Transforme fotos em páginas de colorir",
  description:
    "Transforme a foto do seu filho em uma página de colorir personalizada usando IA. Crie memórias únicas em segundos.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Colory — Páginas de Colorir Personalizadas",
    description:
      "Transforme fotos do seu filho em páginas de colorir usando IA. Em segundos, com apenas alguns cliques!",
    url: "https://colory-eight.vercel.app",
    siteName: "Colory",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Colory Logo",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Colory",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <PosthogProvider>{children}</PosthogProvider>
      </body>
    </html>
  );
}
