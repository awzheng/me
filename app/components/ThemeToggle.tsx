"use client";

/* eslint-disable @next/next/no-img-element */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light/dark mode">
      <img className="icon-light" src="/images/icons/mode-light.png" alt="" width={32} height={32} />
      <img className="icon-dark" src="/images/icons/mode-dark.png" alt="" width={32} height={32} />
    </button>
  );
}
