import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Builder România & UK",
  description: "Configurator PC cu prețuri reale - eMAG, PC Garage, Amazon UK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-16">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}