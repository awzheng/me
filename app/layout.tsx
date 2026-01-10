import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Zheng",
  description: "Personal portfolio and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
