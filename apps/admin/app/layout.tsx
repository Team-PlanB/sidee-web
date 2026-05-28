import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidee Admin",
  description: "Sidee 관리자 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
