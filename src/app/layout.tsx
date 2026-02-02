import type React from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700", "900"],
});


export const metadata: Metadata = {
  title: "RentEase - Find Your Perfect Property",
  description:
    "Premium house rental platform connecting renters with property owners",
  generator: "v0.app",
};


export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
