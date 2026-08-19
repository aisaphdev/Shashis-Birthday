"use client";

/**
 * Lightweight helper to determine if current device is a mobile or touch screen
 */
export function isMobileScreen(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    window.matchMedia("(max-width: 767px)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Returns clamped DPR for canvas or raster effects to avoid GPU memory explosion on high-DPR phones
 */
export function getClampedDPR(maxDPR: number = 1.5): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, maxDPR);
}

/**
 * Checks if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
