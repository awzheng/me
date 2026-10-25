import type { Metadata } from "next";
import { preload } from "react-dom";
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

// Runs before first paint: restores the saved toggle icon, and hides the page (see .fonts-loading
// in globals.css) until Hanyi WenHei is ready or 3s pass, after which it falls back to Arial.
const INIT_SCRIPT = `(function(){
var d=document.documentElement;
try{var n=+localStorage.getItem("toggle-icon");d.dataset.icon=n>=1&&n<=7?n:1}catch(e){}
d.classList.add("fonts-loading");
var show=function(){d.classList.remove("fonts-loading")};
setTimeout(show,3000);
document.addEventListener("DOMContentLoaded",function(){document.fonts.load('1em "Hanyi WenHei"').then(show,show)});
})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  preload("/fonts/hywenhei-85w.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
