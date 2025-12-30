"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

// Custom GitHub icon (brand icons were removed from Lucide)
function GitHubIcon({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// Custom LinkedIn icon (brand icons were removed from Lucide)
function LinkedInIcon({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Header() {
  return (
    <header 
      // CUSTOMIZE: Header positioning and padding
      // - fixed: Stays at top when scrolling
      // - z-50: Stack order (higher = on top)
      // - px-6: Horizontal padding (1.5rem = 24px)
      // - py-4: Vertical padding (1rem = 16px)
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
    >
      {/* ================================================================
          SITE TITLE / LOGO WITH SUBTITLE
          ================================================================ */}
      <motion.a
        href="#"
        className="flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        // CUSTOMIZE: Animation duration (in seconds)
        transition={{ duration: 0.5 }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {/* ============================================================
            CUSTOMIZE: Change your name/title here!
            - text-2xl md:text-6xl: Font size (mobile / desktop)
            - text-[#e8e8e8]: Text color (light gray)
            ============================================================ */}
        <span className="font-[family-name:var(--font-montagu-slab)] text-2xl md:text-6xl text-[#e8e8e8] chalk-text hover:text-white transition-colors">
          awzheng
        </span>
        {/* ============================================================
            CUSTOMIZE: Subtitle text and styling
            - text-sm md:text-base: Font size (14px / 16px)
            - text-[#555555]: Same grey as unlit strings
            ============================================================ */}
        <span className="font-[family-name:var(--font-figtree)] text-sm md:text-3xl text-[#555555]">
          Portfolio
        </span>
      </motion.a>
      
      {/* ================================================================
          SOCIAL ICONS
          ================================================================ */}
      <motion.nav 
        // CUSTOMIZE: Icon spacing
        // - gap-4: Mobile gap (1rem = 16px)
        // - md:gap-6: Desktop gap (1.5rem = 24px)
        className="flex items-center gap-4 md:gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        // CUSTOMIZE: Animation delay (in seconds)
        transition={{ duration: 0.5, delay: 0.2 }}
        suppressHydrationWarning
      >
        {/* ============================================================
            GITHUB ICON
            CUSTOMIZE: Change href to your GitHub profile
            ============================================================ */}
        <a
          href="https://github.com/awzheng"
          target="_blank"
          rel="noopener noreferrer"
          // CUSTOMIZE: Icon color
          // - text-[#e8e8e8]: Default color (light gray)
          // - hover:text-white: Color on hover
          className="chalk-icon text-[#e8e8e8] hover:text-white transition-all duration-300"
          aria-label="GitHub"
          suppressHydrationWarning
        >
          {/* CUSTOMIZE: Icon size (40 = 40px) and strokeWidth (1.5 = line thickness) */}
          <GitHubIcon size={40} strokeWidth={1.5} />
        </a>
        
        {/* ============================================================
            LINKEDIN ICON
            CUSTOMIZE: Change href to your LinkedIn profile
            ============================================================ */}
        <a
          href="https://linkedin.com/in/andrewzheng2007"
          target="_blank"
          rel="noopener noreferrer"
          className="chalk-icon text-[#e8e8e8] hover:text-white transition-all duration-300"
          aria-label="LinkedIn"
          suppressHydrationWarning
        >
          {/* CUSTOMIZE: Icon size and strokeWidth */}
          <LinkedInIcon size={40} strokeWidth={1.5} />
        </a>
        
        {/* ============================================================
            EMAIL ICON
            CUSTOMIZE: Change href to your email address
            ============================================================ */}
        <a
          href="mailto:andrewhaozheng@gmail.com"
          className="chalk-icon text-[#e8e8e8] hover:text-white transition-all duration-300"
          aria-label="Email"
          suppressHydrationWarning
        >
          {/* CUSTOMIZE: Icon size and strokeWidth */}
          <Mail size={40} strokeWidth={1.5} suppressHydrationWarning />
        </a>
      </motion.nav>
    </header>
  );
}
