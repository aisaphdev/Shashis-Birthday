"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobileScreen } from "@/utils/device";

interface Scene1EnvironmentProps {
  isHovered?: boolean;
  isOpened?: boolean;
  mousePos?: { x: number; y: number };
}

export default function Scene1Environment({
  isHovered = false,
  isOpened = false,
  mousePos = { x: 0, y: 0 },
}: Scene1EnvironmentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dustParticles, setDustParticles] = useState<any[]>([]);
  const [diamondSparkles, setDiamondSparkles] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const mobile = isMobileScreen();
    setIsMobile(mobile);

    // Adaptive particle density (Mobile: 7 motes, Desktop: 16 motes)
    const particleCount = mobile ? 7 : 16;
    setDustParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        delay: (i * 0.8) % 6,
        duration: 12 + ((i * 3) % 8),
        size: mobile ? 1.5 + (i % 2) : 1.5 + (i % 3),
        color: [
          "rgba(247, 214, 219, 0.4)",
          "rgba(183, 110, 121, 0.35)",
          "rgba(232, 226, 248, 0.3)",
          "rgba(221, 160, 221, 0.3)",
        ][i % 4],
        left: `${(i * 14 + 7) % 92}%`,
        top: `${(i * 18 + 12) % 88}%`,
      }))
    );

    // Subtle 4-point diamond sparkles (Mobile: 2, Desktop: 4)
    const sparkleCount = mobile ? 2 : 4;
    setDiamondSparkles(
      Array.from({ length: sparkleCount }, (_, i) => ({
        id: i,
        delay: i * 2.2,
        duration: 3.5,
        left: [`20%`, `80%`, `30%`, `75%`][i],
        top: [`25%`, `35%`, `70%`, `65%`][i],
        size: mobile ? 6 : 8,
      }))
    );
  }, []);

  // Clamped cursor parallax offset (only on desktop)
  const offsetX = isMobile ? 0 : Math.max(-12, Math.min(12, mousePos.x * 12));
  const offsetY = isMobile ? 0 : Math.max(-12, Math.min(12, mousePos.y * 12));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* =========================================================
          LAYER 1: DEEP MIDNIGHT VELVET FOUNDATION
          ========================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-[#0b0918] to-[#1a0816]" />

      {/* =========================================================
          LAYER 2: ZERO-COST MULTI-STOP RADIAL GRADIENT BLOOMS
          (100% Native GPU Fill — Zero Filter Blur Overhead)
          ========================================================= */}
      {/* Top-Left: Royal Violet Bloom */}
      <motion.div
        className="absolute -top-20 -left-20 w-[clamp(320px,65vw,560px)] h-[clamp(320px,65vw,560px)] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(75, 30, 110, 0.45) 0%, rgba(45, 18, 70, 0.22) 38%, transparent 70%)",
        }}
        animate={
          isMobile
            ? { opacity: 0.85 }
            : {
                x: offsetX * 0.3,
                y: offsetY * 0.3,
                opacity: [0.75, 0.92, 0.75],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top-Right: Warm Dusty Rose Bloom */}
      <motion.div
        className="absolute -top-16 -right-16 w-[clamp(300px,60vw,520px)] h-[clamp(300px,60vw,520px)] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.38) 0%, rgba(139, 69, 133, 0.18) 38%, transparent 70%)",
        }}
        animate={
          isMobile
            ? { opacity: isHovered ? 0.9 : 0.8 }
            : {
                x: -offsetX * 0.3,
                y: offsetY * 0.3,
                opacity: isHovered ? 0.9 : [0.7, 0.88, 0.7],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-Left: Midnight Teal Mist */}
      <motion.div
        className="absolute -bottom-20 -left-16 w-[clamp(300px,60vw,500px)] h-[clamp(300px,60vw,500px)] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.28) 0%, rgba(10, 90, 85, 0.12) 38%, transparent 70%)",
        }}
        animate={
          isMobile
            ? { opacity: 0.75 }
            : {
                x: offsetX * 0.25,
                y: -offsetY * 0.25,
                opacity: [0.65, 0.85, 0.65],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-Right: Deep Velvet Plum Bloom */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-[clamp(320px,65vw,550px)] h-[clamp(320px,65vw,550px)] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120, 25, 80, 0.38) 0%, rgba(80, 15, 55, 0.18) 38%, transparent 70%)",
        }}
        animate={
          isMobile
            ? { opacity: 0.8 }
            : {
                x: -offsetX * 0.25,
                y: -offsetY * 0.25,
                opacity: [0.7, 0.9, 0.7],
              }
        }
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* =========================================================
          LAYER 3: DRIFTING AMBIENT AURORA HAZE
          ========================================================= */}
      <div
        className="absolute top-1/4 left-1/4 w-[clamp(320px,65vw,550px)] h-[clamp(260px,45vw,400px)] rounded-full animate-haze-1 opacity-30 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(183, 110, 121, 0.35) 0%, rgba(139, 69, 133, 0.15) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[clamp(320px,65vw,550px)] h-[clamp(260px,45vw,400px)] rounded-full animate-haze-2 opacity-30 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(13, 148, 136, 0.28) 0%, rgba(75, 30, 110, 0.2) 45%, transparent 72%)",
        }}
      />

      {/* =========================================================
          LAYER 4: CENTRAL DIFFUSE LIGHT POOL (HERO GIFT ILLUMINATION)
          (100% GPU Hardware Composited Layer)
          ========================================================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,85vw,600px)] h-[clamp(300px,85vw,600px)] pointer-events-none -z-10 flex items-center justify-center">
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: isOpened
              ? "radial-gradient(circle at center, rgba(255, 245, 230, 0.6) 0%, rgba(247, 214, 219, 0.4) 30%, rgba(183, 110, 121, 0.2) 55%, transparent 78%)"
              : isHovered
              ? "radial-gradient(circle at center, rgba(247, 214, 219, 0.35) 0%, rgba(183, 110, 121, 0.24) 35%, rgba(139, 69, 133, 0.12) 58%, transparent 78%)"
              : "radial-gradient(circle at center, rgba(247, 214, 219, 0.24) 0%, rgba(183, 110, 121, 0.16) 36%, rgba(88, 38, 92, 0.08) 60%, transparent 78%)",
          }}
          animate={
            isOpened
              ? { scale: [1, 2], opacity: [0.8, 1, 0.9] }
              : isHovered
              ? { scale: 1.2, opacity: 0.95 }
              : { scale: [1, 1.08, 1], opacity: [0.7, 0.92, 0.7] }
          }
          transition={
            isOpened
              ? { duration: 1.4, ease: "easeOut" }
              : isHovered
              ? { duration: 0.6 }
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      {/* =========================================================
          LAYER 5: STARFIELD & FLOATING LIGHT DUST (ADAPTIVE COUNT)
          ========================================================= */}
      {isMounted &&
        dustParticles.map((p) => (
          <motion.div
            key={`dust-${p.id}`}
            className="absolute rounded-full pointer-events-none -z-5"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.65, 0.2, 0.7, 0],
              y: [0, -45, -15, -60, 0],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              left: p.left,
              top: p.top,
            }}
          />
        ))}

      {/* 4-Point Diamond Sparkles */}
      {isMounted &&
        diamondSparkles.map((s) => (
          <motion.div
            key={`sparkle-${s.id}`}
            className="absolute flex items-center justify-center pointer-events-none -z-5"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.4, 1.15, 0.4],
              rotate: [0, 45, 90],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#f7d6db]"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}

      {/* =========================================================
          LAYER 6: SOFT VIGNETTE (NATIVE GPU FALLOFF)
          ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none -z-5"
        style={{
          background: "radial-gradient(circle at center, transparent 50%, rgba(5, 7, 17, 0.55) 100%)",
        }}
      />
    </div>
  );
}
