import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon AI Generator GBA",
  description: "Generate pixel art Pokemon using AI in GameBoy Advance style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen p-4 md:p-8`}>
        <div className="max-w-[640px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
