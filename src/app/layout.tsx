// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutProps } from "@/types/layout";
import { NextAuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ORUS V2",
  description: "ORUS V2",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NextAuthProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}