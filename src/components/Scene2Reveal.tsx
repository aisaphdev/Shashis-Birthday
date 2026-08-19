"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/data";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Scene2Props {
  onNext: () => void;
}

export default function Scene2Reveal({ onNext }: Scene2Props) {
  const [diamondSparkles, setDiamondSparkles] = useState<any[]>([]);

  useEffect(() => {
    // Fire delicate initial celebratory burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#f7d6db", "#b76e79", "#dda0dd", "#0d9488", "#faf3e6"],
    });

    // Generate subtle floating diamond sparkles (lightweight)
    setDiamondSparkles(Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: [`15%`, `80%`, `25%`, `75%`][i],
      top: [`20%`, `30%`, `75%`, `65%`][i],
      size: 6 + (i % 3),
      delay: i * 1.5,
      duration: 3.5,
    })));
  }, []);

  return (
    <motion.div 
      className="w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center relative overflow-hidden safe-pt safe-pb safe-px select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Deep velvet gradient background: Navy → Midnight Maroon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050811] via-[#100b1a] to-[#25091a] -z-10" />

      {/* Atmospheric Ambient Light Blooms (Native GPU Fill - Zero Blur Cost) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,80vw,600px)] h-[clamp(300px,80vw,600px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.28) 0%, rgba(139, 69, 133, 0.12) 40%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-72 h-72 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-10 left-10 w-72 h-72 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(221, 160, 221, 0.2) 0%, transparent 68%)",
        }}
      />

      {/* Delicate 4-Point Diamond Sparkles */}
      {diamondSparkles.map((s) => (
        <motion.div
          key={`sparkle-${s.id}`}
          className="absolute pointer-events-none -z-5"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.4, 1.1, 0.4],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#f7d6db]">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
          </svg>
        </motion.div>
      ))}

      {/* ==================== TOP: EDITORIAL HEADER ==================== */}
      <div className="w-full max-w-lg flex flex-col items-center pt-2 sm:pt-4 z-10 flex-shrink-0">
        {/* Celebrating Mascot */}
        <motion.div
          initial={{ y: 25, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          className="w-24 sm:w-32 md:w-40 mb-2 sm:mb-3 flex-shrink-0"
        >
          <div className="animate-gift-float">
            <Image 
              src={siteConfig.mascot.happy} 
              alt="Happy Mascot" 
              width={160} 
              height={160} 
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
              className="w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          className="text-[clamp(1.45rem,4.8vw,2.75rem)] font-serif font-black text-center leading-tight px-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d6db] via-[#faf3e6] to-[#b76e79] glow-editorial-gold">
            HAPPY BIRTHDAY,
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b76e79] via-[#dda0dd] to-[#0d9488] glow-editorial-rosegold">
            {siteConfig.nickname.toUpperCase()}!
          </span>
          <span className="inline-block text-xl sm:text-2xl ml-2">🎂</span>
        </motion.h1>
      </div>

      {/* ==================== CENTER: STORY INTRO CARD ==================== */}
      <div className="w-full max-w-md sm:max-w-lg z-10 my-auto py-2">
        <motion.div 
          className="glass-luxury p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl space-y-3 sm:space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm md:text-base text-[#faf3e6]/95 font-medium leading-relaxed">
            Okay... technically we&apos;ve only been friends since{" "}
            <span className="text-[#f7d6db] font-bold underline decoration-[#b76e79]/50 underline-offset-4">{siteConfig.friendshipStartDate}</span>.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-[#e8e2f8]/90 font-medium leading-relaxed">
            But somehow, in just these few weeks, you went from being someone I barely knew to one of my favorite humans. 🫶
          </p>
        </motion.div>
      </div>

      {/* ==================== BOTTOM: CONTINUE CTA BUTTON ==================== */}
      <div className="w-full flex justify-center z-10 pb-2 sm:pb-4 flex-shrink-0">
        <motion.button
          className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#b76e79] via-[#8b4585] to-[#0d9488] text-white font-bold text-xs sm:text-sm tracking-widest shadow-xl shadow-[#b76e79]/30 hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          onClick={onNext}
        >
          Continue →
        </motion.button>
      </div>
    </motion.div>
  );
}
