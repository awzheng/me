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

// Restores the saved toggle icon before first paint so the page never flashes the default.
const ICON_SCRIPT = `try{var n=+localStorage.getItem("toggle-icon");document.documentElement.dataset.icon=n>=1&&n<=7?n:1}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ICON_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
