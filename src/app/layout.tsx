import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SocketProvider } from "@/context/SocketContext";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "react-hot-toast";

export const viewport: Viewport = {
  themeColor: "#8b1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bichar-bd-bm56.vercel.app/"),
  title: "BicharBD — বাংলাদেশের বিচারিক রেকর্ড ও ঐতিহাসিক আর্কাইভ (১৯৭১–২০২৬)",
  description: "১৯৭১ সালের স্বাধীনতা যুদ্ধ থেকে বর্তমান সময় পর্যন্ত বাংলাদেশের প্রতিটি বিচারিক রেকর্ড, মানবাধিকার লঙ্ঘন এবং আইনি লড়াইয়ের পূর্ণাঙ্গ আর্কাইভ।",
  manifest: "/manifest.json",
  openGraph: {
    title: "BicharBD — Justice Archive",
    description: "Digital archive of judicial records and human rights in Bangladesh (1971-2026).",
    url: "https://bichar-bd-bm56.vercel.app/",
    siteName: "BicharBD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Bangla&family=IBM+Plex+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <SocketProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'bg-surface border border-border text-white text-sm font-mono',
                duration: 5000,
                style: {
                  borderRadius: '0px',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #333',
                },
              }}
            />
          </SocketProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
