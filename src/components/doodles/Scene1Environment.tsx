"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
  const [dustParticles, setDustParticles] = useState<any[]>([]);
  const [diamondSparkles, setDiamondSparkles] = useState<any[]>([]);
  const [bokehOrbs, setBokehOrbs] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);

    // Floating micro-dust particles
    setDustParticles(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 12,
        size: 1.5 + Math.random() * 2.5,
        color: [
          "rgba(247, 214, 219, 0.45)",
          "rgba(183, 110, 121, 0.38)",
          "rgba(232, 226, 248, 0.3)",
          "rgba(250, 243, 230, 0.4)",
          "rgba(13, 148, 136, 0.28)",
          "rgba(221, 160, 221, 0.35)",
        ][Math.floor(Math.random() * 6)],
        left: `${Math.random() * 94 + 3}%`,
        top: `${Math.random() * 94 + 3}%`,
      }))
    );

    // Occasional 4-point diamond sparkles
    setDiamondSparkles(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3.5,
        left: `${14 + Math.random() * 72}%`,
        top: `${12 + Math.random() * 76}%`,
        size: 6 + Math.random() * 4,
      }))
    );

    // Large photographic bokeh circles around the perimeter
    setBokehOrbs(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        size: 140 + Math.random() * 100,
        blur: 50 + Math.random() * 25,
        color: [
          "rgba(183, 110, 121, 0.18)",
          "rgba(13, 148, 136, 0.14)",
          "rgba(221, 160, 221, 0.16)",
          "rgba(88, 38, 110, 0.22)",
        ][i % 4],
        left: [`10%`, `82%`, `15%`, `78%`, `50%`][i],
        top: [`18%`, `22%`, `75%`, `80%`, `88%`][i],
        duration: 18 + Math.random() * 10,
        delay: i * 3,
      }))
    );
  }, []);

  // Subtle cursor parallax offset (clamped to +/- 18px)
  const offsetX = Math.max(-18, Math.min(18, mousePos.x * 16));
  const offsetY = Math.max(-18, Math.min(18, mousePos.y * 16));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* =========================================================
          LAYER 1: DEEP MIDNIGHT VELVET FOUNDATION
          ========================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-[#0b0918] to-[#1a0816]" />

      {/* =========================================================
          LAYER 2: ASYMMETRIC ATMOSPHERIC COLOR BLOOMS
          ========================================================= */}
      {/* Top-Left: Royal Violet & Indigo Bloom */}
      <motion.div
        className="absolute -top-16 -left-16 w-[clamp(320px,65vw,560px)] h-[clamp(320px,65vw,560px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(75, 30, 110, 0.45) 0%, rgba(45, 18, 70, 0.2) 50%, transparent 75%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: offsetX * 0.4,
          y: offsetY * 0.4,
          scale: [1, 1.08, 1],
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top-Right: Warm Dusty Rose Bloom */}
      <motion.div
        className="absolute -top-12 -right-12 w-[clamp(300px,60vw,520px)] h-[clamp(300px,60vw,520px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.38) 0%, rgba(139, 69, 133, 0.18) 50%, transparent 75%)",
          filter: "blur(130px)",
        }}
        animate={{
          x: -offsetX * 0.4,
          y: offsetY * 0.4,
          scale: [1, 1.1, 1],
          opacity: isHovered ? 0.9 : [0.7, 0.88, 0.7],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-Left: Midnight Teal Mist */}
      <motion.div
        className="absolute -bottom-16 -left-12 w-[clamp(300px,60vw,500px)] h-[clamp(300px,60vw,500px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.28) 0%, rgba(10, 90, 85, 0.12) 50%, transparent 75%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: offsetX * 0.3,
          y: -offsetY * 0.3,
          scale: [1, 1.06, 1],
          opacity: [0.65, 0.85, 0.65],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-Right: Deep Velvet Plum Bloom */}
      <motion.div
        className="absolute -bottom-16 -right-16 w-[clamp(320px,65vw,550px)] h-[clamp(320px,65vw,550px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(120, 25, 80, 0.38) 0%, rgba(80, 15, 55, 0.18) 50%, transparent 75%)",
          filter: "blur(125px)",
        }}
        animate={{
          x: -offsetX * 0.3,
          y: -offsetY * 0.3,
          scale: [1, 1.09, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* =========================================================
          LAYER 3: DRIFTING ATMOSPHERIC HAZE / CLOUDS
          ========================================================= */}
      <div
        className="absolute top-1/4 left-1/4 w-[clamp(350px,70vw,600px)] h-[clamp(280px,50vw,450px)] rounded-full animate-haze-1 opacity-25 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(183, 110, 121, 0.4) 0%, rgba(139, 69, 133, 0.2) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[clamp(350px,70vw,600px)] h-[clamp(280px,50vw,450px)] rounded-full animate-haze-2 opacity-25 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(13, 148, 136, 0.35) 0%, rgba(75, 30, 110, 0.25) 45%, transparent 70%)",
          filter: "blur(95px)",
        }}
      />

      {/* =========================================================
          LAYER 4: CINEMATIC LIGHT LEAK (DRIFTING CORNER RAY)
          ========================================================= */}
      <div
        className="absolute -top-1/3 -left-1/3 w-[120vw] h-[120vh] rounded-full animate-light-leak pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(247, 214, 219, 0.18) 0%, rgba(183, 110, 121, 0.09) 35%, transparent 65%)",
          filter: "blur(110px)",
        }}
      />

      {/* =========================================================
          LAYER 5: CENTRAL DIFFUSE LIGHT POOL (HERO GIFT ILLUMINATION)
          ========================================================= */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(320px,90vw,650px)] h-[clamp(320px,90vw,650px)] rounded-full animate-light-pool -z-10"
        style={{
          background: isOpened
            ? "radial-gradient(circle at center, rgba(255, 245, 230, 0.55) 0%, rgba(247, 214, 219, 0.45) 30%, rgba(183, 110, 121, 0.3) 55%, transparent 80%)"
            : isHovered
            ? "radial-gradient(circle at center, rgba(247, 214, 219, 0.35) 0%, rgba(183, 110, 121, 0.26) 35%, rgba(139, 69, 133, 0.15) 58%, transparent 80%)"
            : "radial-gradient(circle at center, rgba(247, 214, 219, 0.26) 0%, rgba(183, 110, 121, 0.18) 36%, rgba(88, 38, 92, 0.1) 62%, transparent 80%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: isOpened ? [1, 2.2] : isHovered ? 1.25 : 1,
          opacity: isOpened ? [0.8, 1, 0.9] : isHovered ? 0.95 : 0.8,
        }}
        transition={{ duration: isOpened ? 1.4 : 0.8 }}
      />

      {/* =========================================================
          LAYER 6: PHOTOGRAPHIC PERIMETER BOKEH ORBS
          ========================================================= */}
      {isMounted &&
        bokehOrbs.map((orb) => (
          <motion.div
            key={`bokeh-${orb.id}`}
            className="absolute rounded-full pointer-events-none -z-10"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.left,
              top: orb.top,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
            }}
            animate={{
              y: [0, -25, 10, -20, 0],
              x: [0, 15, -10, 18, 0],
              opacity: [0.4, 0.75, 0.35, 0.8, 0.4],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* =========================================================
          LAYER 7: STARFIELD & FLOATING LIGHT DUST
          ========================================================= */}
      {isMounted &&
        dustParticles.map((p) => (
          <motion.div
            key={`dust-${p.id}`}
            className="absolute rounded-full pointer-events-none -z-5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.65, 0.25, 0.7, 0],
              y: [0, -50, -20, -75, 0],
              x: [0, 10, -8, 14, 0],
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
              boxShadow: `0 0 5px ${p.color}`,
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
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.3, 1.2, 0.3],
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
              className="w-full h-full text-[#f7d6db] drop-shadow-[0_0_8px_rgba(247,214,219,0.9)]"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}

      {/* =========================================================
          LAYER 8: SOFT VIGNETTE (FOCUSING EYE TO THE CENTER)
          ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none -z-5"
        style={{
          background: "radial-gradient(circle at center, transparent 48%, rgba(5, 7, 17, 0.6) 100%)",
        }}
      />

      {/* =========================================================
          LAYER 9: FINE ANALOG FILM GRAIN TEXTURE
          ========================================================= */}
      <div
        className="absolute inset-0 opacity-[0.038] pointer-events-none -z-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
