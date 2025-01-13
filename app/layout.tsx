import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";

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
        className={cn(
          "min-h-screen antialiased bg-[#fafafa] dark:bg-[#111]"
          // GeistSans.variable,
          // GeistMono.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1 flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
