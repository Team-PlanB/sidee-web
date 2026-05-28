import type { Metadata } from "next";
import localFont from "next/font/local";
import { QueryProvider } from "@/shared/api";
import "./globals.css";

const wantedSans = localFont({
  src: "../../../packages/ui/fonts/WantedSansVariable.woff2",
  variable: "--font-wanted-sans",
  display: "swap",
  weight: "100 900",
});

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
    <html lang="ko" className={`${wantedSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
