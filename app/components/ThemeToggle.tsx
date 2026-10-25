"use client";

import { useSyncExternalStore } from "react";

const ICON_COUNT = 7;
const STORAGE_KEY = "toggle-icon";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener("toggle-icon", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("toggle-icon", cb);
  };
};

const getSnapshot = () => {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= 1 && saved <= ICON_COUNT) return saved;
  } catch {}
  return 1;
};

/* eslint-disable @next/next/no-img-element */
export default function ThemeToggle() {
  const index = useSyncExternalStore(subscribe, getSnapshot, () => 1);

  const next = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String((index % ICON_COUNT) + 1));
    } catch {}
    window.dispatchEvent(new Event("toggle-icon"));
  };

  return (
    <button type="button" className="theme-toggle" onClick={next} aria-label="Change icon">
      <img src={`/images/icons/toggle-icons/icon-${index}.png`} alt="" width={32} height={32} />
    </button>
  );
}
