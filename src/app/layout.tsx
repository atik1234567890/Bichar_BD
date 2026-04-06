import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BicharBD — বাংলাদেশের বিচারিক রেকর্ড ও ঐতিহাসিক আর্কাইভ (১৯৭১–২০২৬)",
  description: "১৯৭১ সালের স্বাধীনতা যুদ্ধ থেকে বর্তমান সময় পর্যন্ত বাংলাদেশের প্রতিটি বিচারিক রেকর্ড, মানবাধিকার লঙ্ঘন এবং আইনি লড়াইয়ের পূর্ণাঙ্গ আর্কাইভ।",
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
      <body>{children}</body>
    </html>
  );
}
