import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Zheng",
  description: "Andrew Zheng studies Computer Engineering at the University of Waterloo and builds software at the intersection of hardware, vehicles, and connected systems.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b2826",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
