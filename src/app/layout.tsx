// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutProps } from "@/types/layout";
import { NextAuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AWS Console Clone",
  description: "AWS Console Clone built with Next.js 14",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
