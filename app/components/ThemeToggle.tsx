"use client";

import { useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
export default function ThemeToggle() {
  // A system theme change takes over again, clearing any manual override.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => delete document.documentElement.dataset.theme;
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light/dark mode">
      <img className="icon-light" src="/images/icons/mode-light.png" alt="" width={32} height={32} />
      <img className="icon-dark" src="/images/icons/mode-dark.png" alt="" width={32} height={32} />
    </button>
  );
}
