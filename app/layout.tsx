import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "SQL Assistant - צ'אט SQL חכם",
  description: "צ'אט בוט לעזרה בכתיבת שאילתות SQL ופתרון בעיות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={cn("min-h-screen antialiased bg-slate-50", geist.variable)}
      >
        {children}
      </body>
    </html>
  );
}
