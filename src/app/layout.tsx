import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata: Metadata = {
  title: "PrimeCuts | Premium Meat Delivery",
  description: "Fresh, premium quality meat from local farms — delivered to your door. Hand-selected cuts, expertly prepared.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <ClientProviders>{children}</ClientProviders>
        </main>
        <Footer />
      </body>
    </html>
  );
}
