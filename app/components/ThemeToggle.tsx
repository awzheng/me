"use client";

const ICON_COUNT = 7;
const STORAGE_KEY = "toggle-icon";

// The current icon lives in <html data-icon>, set before first paint by the inline
// script in layout.tsx; CSS shows the matching image and accent color.
const next = () => {
  const root = document.documentElement;
  const n = ((Number(root.dataset.icon) || 1) % ICON_COUNT) + 1;
  root.dataset.icon = String(n);
  try {
    localStorage.setItem(STORAGE_KEY, String(n));
  } catch {}
};

/* eslint-disable @next/next/no-img-element */
export default function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" onClick={next} aria-label="Change icon">
      {Array.from({ length: ICON_COUNT }, (_, i) => (
        <img key={i} src={`/images/icons/toggle-icons/icon-${i + 1}.png`} alt="" width={32} height={32} />
      ))}
    </button>
  );
}
