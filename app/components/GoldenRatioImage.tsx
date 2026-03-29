'use client';

import { useState, useEffect } from 'react';

export default function GoldenRatioImage() {
  const [isDark, setIsDark] = useState(false);

  // Sync data-theme attribute on <html> whenever isDark changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Initialize from system preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
  }, []);

  return (
    <div
      className="sidebar-golden-ratio"
      onClick={() => setIsDark((d) => !d)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={isDark ? '/images/golden-ratio-dark.png' : '/images/golden-ratio-light.png'}
        alt="Golden ratio"
        draggable={false}
      />
      <p className="golden-ratio-caption">toggle light/dark</p>
    </div>
  );
}
