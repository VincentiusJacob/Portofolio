import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vincentius Jacob Gunawan - AI-Powered Digital Architect",
  description:
    "Building the future of human-computer interaction through intelligent design and immersive experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-950 text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
