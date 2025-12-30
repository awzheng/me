"use client";

import { useRef, useState, useCallback, useEffect, memo } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

// ============================================================================
// STRING DATA - Customize the labels, colors, and section IDs
// ============================================================================
interface StringData {
  id: string;      // Must match the section ID in page.tsx
  label: string;   // Text shown on the right side
  color: string;   // Color when string is lit/active
  idleColor: string; // Color when string is idle
}

// CUSTOMIZE: Edit this array to change strings
// - id: Links to section (must match section id in page.tsx)
// - label: Text displayed on the right
// - color: Lit/active color (pastel colors work best)
// - idleColor: Idle/default color
const strings: StringData[] = [
  { id: "hardware", label: "Hardware", color: "#FF6B6B", idleColor: "#555555" },
  { id: "firmware", label: "Firmware", color: "#FF9F43", idleColor: "#555555" },
  { id: "software", label: "Software", color: "#FDCB6E", idleColor: "#555555" },
  { id: "business", label: "Business", color: "#4ADE80", idleColor: "#555555" },
  { id: "about", label: "About", color: "#74B9FF", idleColor: "#555555" },
  { id: "extras", label: "Extras", color: "#C084FC", idleColor: "#555555" },
];

// ============================================================================
// SOUNDHOLE CONTENT - Customize the emoji or image shown for each section
// 
// For emojis: { type: "emoji", value: "🔧" }
// For images: { type: "image", value: "/images/photo.png" }
//
// Images are AUTOMATICALLY CROPPED INTO A CIRCLE to fit the soundhole.
// - Place images in the /public/images/ folder
// - Any aspect ratio works - images are centered and cropped to fill
// - The circular clipPath handles the cropping, no manual editing needed
// ============================================================================
const placeholderContent: Record<string, { type: "emoji" | "image"; value: string }> = {
  hardware: { type: "image", value: "/images/hardware.png" },  // CUSTOMIZE: Change content for Hardware
  firmware: { type: "emoji", value: "⚡" },  // CUSTOMIZE: Change content for Firmware
  software: { type: "emoji", value: "💻" },  // CUSTOMIZE: Change content for Software
  business: { type: "image", value: "/images/business.png" },  // CUSTOMIZE: Image for Business
  about: { type: "emoji", value: "👋" },     // CUSTOMIZE: Change content for About
  extras: { type: "image", value: "/images/extras.png" },    // CUSTOMIZE: Change content for Extras
};

// ============================================================================
// MONOCHROME IMAGE FILTER SYSTEM
// 
// Converts images to monochrome with the string's accent color as the hue.
// - Images are automatically tinted to match their string's color
// - Example: Business image becomes monochrome green (#4ADE80)
// 
// CUSTOMIZE: Adjust these values to change the monochrome effect intensity
// ============================================================================

// Helper: Convert hex color to RGB values (0-1 range for SVG filters)
function hexToRgbNormalized(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 1, g: 1, b: 1 };
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

// CUSTOMIZE: Monochrome effect settings
const MONOCHROME_SETTINGS = {
  // How much of the original color shows through
  // 0 = full monochrome (image is completely tinted with string color)
  // 0.5 = 50% blend (mix of original and tinted)
  // 1 = no effect (original image colors)
  colorBleed: 0.1,

  // Brightness boost for the tinted image
  // 1 = normal brightness
  // 1.2 = 20% brighter (good for dark images)
  // 0.8 = 20% darker
  brightness: 1.1,

  // Contrast adjustment
  // 1 = normal contrast
  // 1.2 = higher contrast (more dramatic)
  // 0.8 = lower contrast (more washed out)
  contrast: 1.05,
};

// ============================================================================
// FADE ANIMATION SETTINGS
// 
// Controls how quickly the soundhole images/emojis and string colors fade
// ============================================================================
const FADE_SETTINGS = {
  // CUSTOMIZE: How quickly content fades IN when hovering (in seconds)
  // Lower = faster fade in, Higher = slower fade in
  fadeInDuration: 0.15,

  // CUSTOMIZE: How quickly content fades OUT when leaving (in seconds)
  // Lower = faster fade out, Higher = slower/lingering fade out
  fadeOutDuration: 0.3,

  // CUSTOMIZE: Easing function for animations
  // Options: "easeIn", "easeOut", "easeInOut", "linear"
  fadeInEase: "easeOut" as const,
  fadeOutEase: "easeOut" as const,
};

// ============================================================================
// STRING INTERACTION SETTINGS
// ============================================================================
// CUSTOMIZE: How close mouse needs to be to string to trigger (in SVG units)
// - Higher = easier to trigger, Lower = more precise
const DETECTION_RANGE = 20;

interface GuitarStringProps {
  stringData: StringData;
  index: number;
  onStrum: (id: string) => void;
  onHover: (id: string | null) => void;
  onLeaveDetectionZone: () => void;
  onStrummingChange: (id: string, isStrumming: boolean) => void;
  isActive: boolean;
  isHovered: boolean;
  soundholeCenter: { x: number; y: number };
  soundholeRadius: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  stringY: number;
  svgRectRef: React.MutableRefObject<DOMRect | null>;
}

const GuitarString = memo(function GuitarString({
  stringData,
  index,
  onStrum,
  onHover,
  onLeaveDetectionZone,
  onStrummingChange,
  isActive,
  isHovered,
  soundholeCenter,
  soundholeRadius,
  viewBoxWidth,
  viewBoxHeight,
  stringY,
  svgRectRef,
}: GuitarStringProps) {
  const [isStrumming, setIsStrumming] = useState(false);
  const lastY = useRef<number | null>(null);
  const lastTime = useRef<number>(0);
  const strumCooldown = useRef(false);
  const wasInRange = useRef(false);

  // ============================================================================
  // STRING PHYSICS - Customize the "bounciness" of strings
  // ============================================================================
  const displacement = useSpring(0, {
    stiffness: 150,  // CUSTOMIZE: Higher = faster oscillation (50-500)
    damping: 0.6,    // CUSTOMIZE: Higher = less bouncy (0.1-10)
    mass: 0.10,      // CUSTOMIZE: Higher = slower, heavier feel (0.05-1)
  });

  const y = stringY;

  const pathD = useMotionValue(`M 0 ${y} Q ${soundholeCenter.x} ${y} ${viewBoxWidth} ${y}`);

  // Update path when stringY changes (e.g., when stringSpacing is modified)
  useEffect(() => {
    const currentDisplacement = displacement.get();
    const path = `M 0 ${y} Q ${soundholeCenter.x} ${y + currentDisplacement} ${viewBoxWidth} ${y}`;
    pathD.set(path);
  }, [y, soundholeCenter.x, viewBoxWidth, pathD, displacement]);

  // Update path when displacement changes (string vibration)
  useEffect(() => {
    const unsubscribe = displacement.on("change", (v) => {
      const startX = 0;
      const endX = viewBoxWidth;
      const midX = soundholeCenter.x;
      const path = `M ${startX} ${y} Q ${midX} ${y + v} ${endX} ${y}`;
      pathD.set(path);
    });

    return unsubscribe;
  }, [displacement, y, soundholeCenter.x, viewBoxWidth, pathD]);

  const triggerStrum = useCallback((direction: number) => {
    if (strumCooldown.current) return;
    strumCooldown.current = true;

    setIsStrumming(true);
    onStrummingChange(stringData.id, true);
    // CUSTOMIZE: Strum amplitude (how far string moves) - default 50
    displacement.set(direction * 50);
    onStrum(stringData.id);

    setTimeout(() => {
      displacement.set(0);
    }, 30);

    // CUSTOMIZE: How long string stays "lit" after strumming (in ms)
    // Default: 1600ms = 1.6 seconds
    setTimeout(() => {
      setIsStrumming(false);
      onStrummingChange(stringData.id, false);
      strumCooldown.current = false;
    }, 1600);
  }, [displacement, onStrum, onStrummingChange, stringData.id]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGGElement>) => {
    // OPTIMIZATION: Use cached rect to avoid layout thrashing (reflow)
    const rect = svgRectRef.current;
    if (!rect) return;

    const now = performance.now();
    const svgY = (e.clientY - rect.top) / rect.height * viewBoxHeight;

    const distanceToString = Math.abs(svgY - y);
    const isNearString = distanceToString < DETECTION_RANGE;

    if (isNearString && !wasInRange.current) {
      strumCooldown.current = false;
      wasInRange.current = true;
      onHover(stringData.id);
    } else if (!isNearString && wasInRange.current) {
      wasInRange.current = false;
      onLeaveDetectionZone();
    }

    if (isNearString) {
      onHover(stringData.id);
    }

    if (lastY.current !== null) {
      const deltaY = svgY - lastY.current;

      const crossedDown = lastY.current < y && svgY >= y;
      const crossedUp = lastY.current > y && svgY <= y;
      const movedThroughRange = (lastY.current < y - DETECTION_RANGE / 2 && svgY > y + DETECTION_RANGE / 2) ||
        (lastY.current > y + DETECTION_RANGE / 2 && svgY < y - DETECTION_RANGE / 2);

      if ((crossedDown || crossedUp || movedThroughRange) && Math.abs(deltaY) > 2) {
        triggerStrum(deltaY > 0 ? 1 : -1);
      }
    }

    lastY.current = svgY;
    lastTime.current = now;
  }, [y, triggerStrum, onHover, onLeaveDetectionZone, stringData.id, viewBoxHeight]);

  const handleMouseLeave = useCallback(() => {
    lastY.current = null;
    wasInRange.current = false;
    strumCooldown.current = false;
    onHover(null);
  }, [onHover]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<SVGGElement>) => {
    const rect = svgRectRef.current;
    if (!rect) return;

    const svgY = (e.clientY - rect.top) / rect.height * viewBoxHeight;
    lastY.current = svgY;
    lastTime.current = performance.now();
    strumCooldown.current = false;

    const distanceToString = Math.abs(svgY - y);
    if (distanceToString < DETECTION_RANGE) {
      wasInRange.current = true;
      onHover(stringData.id);
    }
  }, [viewBoxHeight, y, onHover, stringData.id]);

  const handleClick = useCallback(() => {
    strumCooldown.current = false;
    triggerStrum(1);
    setTimeout(() => {
      const element = document.getElementById(stringData.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }, [triggerStrum, stringData.id]);

  const isLit = isStrumming || isActive || isHovered;
  const currentColor = isLit ? stringData.color : stringData.idleColor;
  // CUSTOMIZE: String thickness (3 = idle, 4 = strumming)
  const strokeWidth = isStrumming ? 4 : 3;

  // Use different durations for lighting up vs dimming
  // See FADE_SETTINGS above to customize these values
  const transitionDuration = isLit
    ? FADE_SETTINGS.fadeInDuration
    : FADE_SETTINGS.fadeOutDuration;

  return (
    <g
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* Invisible hit area for easier interaction */}
      <motion.path
        d={useTransform(pathD, (v) => v)}
        stroke="transparent"
        strokeWidth={DETECTION_RANGE * 2}
        fill="none"
      />
      {/* Visible string */}
      <motion.path
        d={useTransform(pathD, (v) => v)}
        stroke={currentColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        style={{
          // CUSTOMIZE: Glow intensity (8px blur radius)
          filter: isLit ? `drop-shadow(0 0 8px ${stringData.color})` : "none",
          // Transition duration synced with FADE_SETTINGS
          transition: `stroke ${transitionDuration}s ease, filter ${transitionDuration}s ease`,
        }}
      />
    </g>
  );
});

interface StringHeroProps {
  onStringHover?: (id: string | null) => void;
}

export default function StringHero({ onStringHover }: StringHeroProps) {
  const [activeString, setActiveString] = useState<string | null>(null);
  const [hoveredString, setHoveredString] = useState<string | null>(null);
  const [strummingStrings, setStrummingStrings] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  const svgRectRef = useRef<DOMRect | null>(null);

  // OPTIMIZATION: Update cached rect on resize/scroll to avoid querying in render loop
  useEffect(() => {
    const updateRect = () => {
      if (svgRef.current) {
        svgRectRef.current = svgRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  // ============================================================================
  // LAYOUT SETTINGS - Customize the overall string hero layout
  // ============================================================================
  const viewBoxWidth = 1200;   // CUSTOMIZE: SVG canvas width
  const viewBoxHeight = 600;   // CUSTOMIZE: SVG canvas height

  // CUSTOMIZE: Soundhole position (x = left/right, y = up/down)
  // viewBoxWidth / 3 = positioned at 1/3 from left
  const soundholeCenter = { x: viewBoxWidth / 3, y: viewBoxHeight / 2 };

  // CUSTOMIZE: Soundhole size (in SVG units)
  const soundholeRadius = 225;

  // CUSTOMIZE: Spacing between strings (in SVG units)
  const stringSpacing = 40;

  // Calculate first string position (centered vertically)
  const firstStringY = viewBoxHeight / 2 - (strings.length - 1) * stringSpacing / 2;

  // Determine which string is currently lit (for soundhole content and shadow)
  // Priority: hovered > strumming > active
  const currentlyLitString = hoveredString
    || (strummingStrings.size > 0 ? Array.from(strummingStrings)[strummingStrings.size - 1] : null)
    || activeString;

  const isAnyStringLit = currentlyLitString !== null;
  const shadowColor = isAnyStringLit && currentlyLitString
    ? strings.find(s => s.id === currentlyLitString)?.color || "transparent"
    : "transparent";

  const handleStrum = useCallback((id: string) => {
    setActiveString(id);
    onStringHover?.(id);

    setTimeout(() => {
      setActiveString(null);
    }, 1600);
  }, [onStringHover]);

  const handleStringHover = useCallback((id: string | null) => {
    setHoveredString(id);
  }, []);

  const handleLeaveDetectionZone = useCallback(() => {
    setHoveredString(null);
  }, []);

  const handleStrummingChange = useCallback((id: string, isStrumming: boolean) => {
    setStrummingStrings(prev => {
      const next = new Set(prev);
      if (isStrumming) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const handleLabelClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLabelHover = (id: string | null) => {
    setHoveredString(id);
  };

  // CUSTOMIZE: Label X position (distance from right edge)
  // viewBoxWidth - 100 = 100 units from right edge
  const labelX = viewBoxWidth - 100;

  return (
    <div className="relative w-full h-screen flex items-center overflow-hidden">
      <div className="relative w-full h-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Clip path for soundhole content */}
            <clipPath id="soundhole-clip">
              {/* CUSTOMIZE: Clip radius (soundholeRadius - 4 = content area) */}
              <circle cx={soundholeCenter.x} cy={soundholeCenter.y} r={soundholeRadius - 4} />
            </clipPath>

            {/* Soundhole gradient (dark center) */}
            <radialGradient id="soundhole-gradient" cx="50%" cy="50%" r="50%">
              {/* CUSTOMIZE: Soundhole colors (darkest at center) */}
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="60%" stopColor="#121212" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>

            {/* Dynamic shadow filter */}
            <filter id="soundhole-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                // CUSTOMIZE: Shadow blur radius (25 when lit)
                stdDeviation={isAnyStringLit ? "25" : "0"}
                floodColor={shadowColor}
                // CUSTOMIZE: Shadow opacity (0.5 = 50%)
                floodOpacity={isAnyStringLit ? "0.5" : "0"}
              />
            </filter>

            {/* ================================================================
                MONOCHROME FILTERS FOR IMAGES
                
                Each string gets its own filter that converts images to 
                monochrome with that string's accent color as the hue.
                
                How it works:
                1. feColorMatrix converts image to grayscale (luminance)
                2. feComponentTransfer adjusts brightness/contrast
                3. feColorMatrix tints the grayscale with the target color
                ================================================================ */}
            {strings.map((stringData) => {
              const rgb = hexToRgbNormalized(stringData.color);
              const { brightness, contrast, colorBleed } = MONOCHROME_SETTINGS;
              // Calculate the blend between monochrome tint and original color
              // colorBleed: 0 = full monochrome, 1 = full original colors
              const mono = 1 - colorBleed;

              return (
                <filter key={`mono-${stringData.id}`} id={`monochrome-${stringData.id}`}>
                  {/* 
                    MONOCHROME TINT FILTER
                    
                    This filter creates a monochrome effect tinted with the string's color.
                    It works by converting the image to grayscale, then applying the color tint,
                    while optionally blending with the original colors (colorBleed).
                    
                    The matrix math:
                    - First, calculate luminance (grayscale) using standard weights
                    - Then multiply by the target RGB color
                    - Finally, blend with original based on colorBleed
                  */}

                  {/* Single matrix that does: grayscale → tint → blend with original */}
                  {/* This combines all operations for better performance */}
                  <feColorMatrix
                    type="matrix"
                    values={`
                      ${colorBleed + mono * 0.299 * rgb.r}  ${mono * 0.587 * rgb.r}  ${mono * 0.114 * rgb.r}  0  ${(brightness - 1) * rgb.r * 0.3}
                      ${mono * 0.299 * rgb.g}  ${colorBleed + mono * 0.587 * rgb.g}  ${mono * 0.114 * rgb.g}  0  ${(brightness - 1) * rgb.g * 0.3}
                      ${mono * 0.299 * rgb.b}  ${mono * 0.587 * rgb.b}  ${colorBleed + mono * 0.114 * rgb.b}  0  ${(brightness - 1) * rgb.b * 0.3}
                      0  0  0  1  0
                    `}
                    result="tinted"
                  />

                  {/* Apply contrast adjustment if needed */}
                  {contrast !== 1 && (
                    <feComponentTransfer>
                      <feFuncR type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
                      <feFuncG type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
                      <feFuncB type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
                    </feComponentTransfer>
                  )}
                </filter>
              );
            })}
          </defs>

          {/* ================================================================
              SOUNDHOLE BACKGROUND
              ================================================================ */}
          <circle
            cx={soundholeCenter.x}
            cy={soundholeCenter.y}
            // CUSTOMIZE: Background circle size (slightly larger than ring)
            r={soundholeRadius + 10}
            fill="url(#soundhole-gradient)"
            filter="url(#soundhole-shadow)"
            style={{
              // Shadow transition synced with FADE_SETTINGS
              // Uses fadeIn duration when lighting up, fadeOut duration when dimming
              transition: `filter ${isAnyStringLit ? FADE_SETTINGS.fadeInDuration : FADE_SETTINGS.fadeOutDuration}s ease`,
            }}
          />

          {/* ================================================================
              SOUNDHOLE RINGS - Customize the decorative rings
              ================================================================ */}
          {/* Outer ring */}
          <circle
            cx={soundholeCenter.x}
            cy={soundholeCenter.y}
            r={soundholeRadius}
            fill="none"
            // CUSTOMIZE: Ring color
            stroke="#2a2a2a"
            // CUSTOMIZE: Ring thickness
            strokeWidth="2"
          />

          {/* Inner ring 1 */}
          <circle
            cx={soundholeCenter.x}
            cy={soundholeCenter.y}
            // CUSTOMIZE: Inner ring position (soundholeRadius - 3)
            r={soundholeRadius - 3}
            fill="none"
            stroke="#333"
            strokeWidth="1"
            // CUSTOMIZE: Ring opacity
            opacity="0.5"
          />

          {/* Inner ring 2 */}
          <circle
            cx={soundholeCenter.x}
            cy={soundholeCenter.y}
            r={soundholeRadius - 5}
            fill="none"
            stroke="#333"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* ================================================================
              STRINGS (rendered before content so content appears on top)
              ================================================================ */}
          {strings.map((stringData, index) => (
            <GuitarString
              key={stringData.id}
              stringData={stringData}
              index={index}
              onStrum={handleStrum}
              onHover={handleStringHover}
              onLeaveDetectionZone={handleLeaveDetectionZone}
              onStrummingChange={handleStrummingChange}
              isActive={activeString === stringData.id}
              isHovered={hoveredString === stringData.id}
              soundholeCenter={soundholeCenter}
              soundholeRadius={soundholeRadius}
              viewBoxWidth={viewBoxWidth}
              viewBoxHeight={viewBoxHeight}
              stringY={firstStringY + index * stringSpacing}
              svgRectRef={svgRectRef}
            />
          ))}

          {/* ================================================================
              SOUNDHOLE CONTENT (Emoji or Image)
              - Rendered ABOVE strings so images appear on top
              - Fades in/out with the string's lit status
              - Only shows when a string is currently lit (hovered/strumming)
              - Images are automatically cropped into a circle by the clipPath
              - Images are automatically tinted to monochrome with string color
              ================================================================ */}
          <g clipPath="url(#soundhole-clip)">
            {strings.map((stringData) => {
              const isThisStringLit = currentlyLitString === stringData.id;
              const content = placeholderContent[stringData.id];
              if (!content) return null;

              // Use different durations for fade in vs fade out
              // See FADE_SETTINGS above to customize these values
              const fadeTransition = {
                duration: isThisStringLit
                  ? FADE_SETTINGS.fadeInDuration
                  : FADE_SETTINGS.fadeOutDuration,
                ease: isThisStringLit
                  ? FADE_SETTINGS.fadeInEase
                  : FADE_SETTINGS.fadeOutEase,
              };

              return content.type === "image" ? (
                <motion.image
                  key={`content-${stringData.id}`}
                  href={content.value}
                  // Image fills the entire soundhole and gets cropped to circle
                  x={soundholeCenter.x - (soundholeRadius - 4)}
                  y={soundholeCenter.y - (soundholeRadius - 4)}
                  width={(soundholeRadius - 4) * 2}
                  height={(soundholeRadius - 4) * 2}
                  preserveAspectRatio="xMidYMid slice"
                  // Apply monochrome filter - tints image with string's accent color
                  // CUSTOMIZE: Remove this line to show original image colors
                  filter={`url(#monochrome-${stringData.id})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isThisStringLit ? 1 : 0 }}
                  transition={fadeTransition}
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <motion.text
                  key={`content-${stringData.id}`}
                  x={soundholeCenter.x}
                  y={soundholeCenter.y + 25}
                  textAnchor="middle"
                  fontSize="90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isThisStringLit ? 1 : 0 }}
                  transition={fadeTransition}
                  style={{ pointerEvents: "none" }}
                >
                  {content.value}
                </motion.text>
              );
            })}
          </g>

          {/* ================================================================
              STRING LABELS (Right side)
              ================================================================ */}
          {strings.map((stringData, index) => {
            const isLit = strummingStrings.has(stringData.id) ||
              activeString === stringData.id ||
              hoveredString === stringData.id;
            const stringY = firstStringY + index * stringSpacing;
            // Position text above the string (half line up)
            const textY = stringY - stringSpacing / 2;

            // Use different durations for lighting up vs dimming
            // See FADE_SETTINGS above to customize these values
            const transitionDuration = isLit
              ? FADE_SETTINGS.fadeInDuration
              : FADE_SETTINGS.fadeOutDuration;

            return (
              <text
                key={`label-${stringData.id}`}
                x={labelX}
                // CUSTOMIZE: Label vertical offset (+ = down)
                y={textY + 6}
                textAnchor="end"
                // CUSTOMIZE: Label font size (24 = 24px)
                fontSize="24"
                fontFamily="var(--font-figtree), sans-serif"
                // CUSTOMIZE: Label font weight (500 = medium)
                fontWeight="500"
                style={{
                  fill: isLit ? stringData.color : "#555555",
                  // CUSTOMIZE: Label glow intensity
                  filter: isLit ? `drop-shadow(0 0 10px ${stringData.color}40)` : "none",
                  cursor: "pointer",
                  // Transition duration synced with FADE_SETTINGS
                  transition: `fill ${transitionDuration}s ease, filter ${transitionDuration}s ease`,
                }}
                onClick={() => handleLabelClick(stringData.id)}
                onMouseEnter={() => handleLabelHover(stringData.id)}
                onMouseLeave={() => handleLabelHover(null)}
              >
                {stringData.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* ================================================================
          SCROLL INDICATOR (Bottom center)
          ================================================================ */}
      <motion.div
        // CUSTOMIZE: Position from bottom (bottom-8 = 2rem = 32px)
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        // CUSTOMIZE: Final opacity (0.5 = 50%)
        animate={{ opacity: 0.5, y: 0 }}
        // CUSTOMIZE: Animation delay (in seconds)
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* CUSTOMIZE: Scroll indicator text */}
        <span
          // CUSTOMIZE: Text size (text-sm = 0.875rem = 14px)
          // CUSTOMIZE: Text color (text-gray-500 = #6b7280)
          className="text-2xl font-[family-name:var(--font-figtree)] text-gray-500"
        >
          explore
        </span>
        <motion.div
          // CUSTOMIZE: Bounce animation distance (y: [0, 8, 0] = 8px bounce)
          animate={{ y: [0, 8, 0] }}
          // CUSTOMIZE: Animation duration and repeat
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          {/* CUSTOMIZE: Arrow icon size (24 = 24px) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
            <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
