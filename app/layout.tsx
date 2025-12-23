import type { Metadata } from "next";
import { Baloo_Da_2, Quicksand, Comfortaa } from "next/font/google";
import "./globals.css";

const balooDa = Baloo_Da_2({
  variable: "--font-baloo-da",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Poro-List - Your Productivity Journey Starts Here",
  description: "A simple and cheerful way to organize your tasks, focus better, and make progress without stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${balooDa.variable} ${quicksand.variable} ${comfortaa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
