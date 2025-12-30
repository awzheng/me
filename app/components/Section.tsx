"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  color: string;
  children?: ReactNode;
}

// ============================================================================
// SECTION DESCRIPTIONS - Edit the text for each section here
// ============================================================================
const sectionContent: Record<string, { description: string }> = {
  hardware: {
    // CUSTOMIZE: Change this description for the Hardware section
    description: "Electronic design, schematics, PCB layout, and mechanical engineering design.",
  },
  firmware: {
    // CUSTOMIZE: Change this description for the Firmware section
    description: "Embedded, microcontroller, and RTOS-related components of my hardware projects.",
  },
  software: {
    // CUSTOMIZE: Change this description for the Software section
    description: "Full-stack and software engineering-related projects.",
  },
  business: {
    // CUSTOMIZE: Change this description for the Business section
    description: "At first, I joined DECA to impress a crush. A year later, I won 1st worldwide for retail. Somewhere in between, I realized my true love for problem-solving in business.",
  },
  about: {
    // CUSTOMIZE: Change this description for the About section (your bio!)
    description: "A 1B Computer Engineering student at the University of Waterloo. Loves: electrical design, mechanical design, playing music. Weaknesses: distance running, chess, baseball caps.",
  },
  extras: {
    // CUSTOMIZE: Change this description for the Extras section
    description: "My favourite side quests.",
  },
};

export default function Section({ id, title, color, children }: SectionProps) {
  const content = sectionContent[id];

  return (
    <section
      id={id}
      // CUSTOMIZE: Section padding and minimum height
      // - min-h-screen: Makes each section full viewport height
      // - px-6: Horizontal padding (6 = 1.5rem = 24px)
      // - py-24: Vertical padding (24 = 6rem = 96px)
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <motion.div
        // CUSTOMIZE: Content container width and padding
        // - max-w-4xl: Maximum width (896px) - change to max-w-5xl, max-w-6xl for wider
        // - p-8 md:p-12: Padding inside the card (8 = 2rem, 12 = 3rem)
        // - rounded-2xl: Border radius (2xl = 1rem = 16px)
        className="w-full max-w-4xl section-content rounded-2xl p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        // CUSTOMIZE: Animation duration (in seconds)
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ================================================================
            SECTION TITLE
            ================================================================ */}
        <h2
          // CUSTOMIZE: Title font and size
          // - font-montagu-slab: The display font (change to font-figtree for sans-serif)
          // - text-4xl: Mobile size (2.25rem = 36px)
          // - md:text-5xl: Desktop size (3rem = 48px)
          // - mb-6: Margin bottom (1.5rem = 24px)
          className="font-[family-name:var(--font-montagu-slab)] text-4xl md:text-5xl mb-6"
          style={{ color }}
        >
          {title}
        </h2>

        {/* ================================================================
            ACCENT LINE UNDER TITLE
            ================================================================ */}
        <div
          // CUSTOMIZE: Accent line dimensions
          // - w-24: Width (6rem = 96px)
          // - h-1: Height (0.25rem = 4px)
          // - mb-8: Margin bottom (2rem = 32px)
          className="w-24 h-1 rounded-full mb-8"
          // CUSTOMIZE: Accent line opacity (0.6 = 60%)
          style={{ backgroundColor: color, opacity: 0.6 }}
        />

        {/* ================================================================
            SECTION DESCRIPTION TEXT
            ================================================================ */}
        <p
          // CUSTOMIZE: Description font and size
          // - text-lg: Mobile size (1.125rem = 18px)
          // - md:text-xl: Desktop size (1.25rem = 20px)
          // - text-gray-400: Text color (#9ca3af)
          // - leading-relaxed: Line height (1.625)
          // - mb-8: Margin bottom (2rem = 32px)
          className="text-lg md:text-xl text-gray-400 font-[family-name:var(--font-figtree)] leading-relaxed mb-8"
        >
          {content.description}
        </p>

        {/* ================================================================
            PROJECT CARDS GRID
            If you pass children to Section, they will replace this default grid
            ================================================================ */}
        {children || (
          <div
            // CUSTOMIZE: Grid layout
            // - grid-cols-1: 1 column on mobile
            // - md:grid-cols-2: 2 columns on desktop
            // - gap-6: Gap between cards (1.5rem = 24px)
            className="grid grid-cols-1 md:grid-cols-1 gap-6"
          >
            {/* CUSTOMIZE: Change [1, 2, 3, 4] to add/remove project cards */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                // CUSTOMIZE: Card styling
                // - bg-white/5: Background with 5% opacity
                // - rounded-xl: Border radius (0.75rem = 12px)
                // - p-6: Padding (1.5rem = 24px)
                // - border-white/10: Border with 10% opacity
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                // CUSTOMIZE: Hover scale effect (1.02 = 2% larger)
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Card icon container */}
                <div
                  // CUSTOMIZE: Icon container size
                  // - w-10 h-10: 2.5rem = 40px square
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  {/* CUSTOMIZE: Inner icon size (w-4 h-4 = 1rem = 16px) */}
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color }}
                  />
                </div>

                {/* CUSTOMIZE: Project card title */}
                <h3
                  // CUSTOMIZE: Card title size (text-xl = 1.25rem = 20px)
                  className="font-[family-name:var(--font-figtree)] text-xl text-white mb-2 font-semibold"
                >
                  Project {i}
                </h3>

                {/* CUSTOMIZE: Project card description */}
                <p
                  // CUSTOMIZE: Card description size (text-sm = 0.875rem = 14px)
                  // CUSTOMIZE: Card description color (text-gray-500 = #6b7280)
                  className="text-gray-500 text-sm font-[family-name:var(--font-figtree)]"
                >
                  Coming soon — exciting work in progress!
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
