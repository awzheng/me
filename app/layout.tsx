import type { Metadata } from "next";
import { Figtree, Montagu_Slab } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const montaguSlab = Montagu_Slab({
  variable: "--font-montagu-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew Zheng",
  description: "Andrew Zheng's Personal Website - Hardware, Firmware, Software, Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${montaguSlab.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
