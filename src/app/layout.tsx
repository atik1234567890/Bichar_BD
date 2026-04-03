import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BicharBD — Bangladesh-Specific Power Features",
  description: "বাংলাদেশের নিজস্ব সংকট — বিচারBD",
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
