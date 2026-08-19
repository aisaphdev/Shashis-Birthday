"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import Image from "next/image";
import Scene1Environment from "./doodles/Scene1Environment";

interface Scene1Props {
  onComplete: () => void;
}

export default function Scene1Gift({ onComplete }: Scene1Props) {
  const [playOpenSound] = useSound(siteConfig.audio.soundEffects.openGift, { volume: 0.7 });
  const [isOpened, setIsOpened] = useState(false);
  const [ribbonPulled, setRibbonPulled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpened || ribbonPulled) return;

    // Phase 1: Untie ribbon
    setRibbonPulled(true);

    // Phase 2: Open box & emit light
    setTimeout(() => {
      setIsOpened(true);
      playOpenSound();
      fireConfetti();

      // Phase 3: Transition to reveal scene
      setTimeout(() => {
        onComplete();
      }, 2400);
    }, 600);
  };

  const fireConfetti = () => {
    // Discrete lightweight dual burst (ultra-fast 60 FPS mobile friendly)
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.6 },
      colors: ["#f7d6db", "#b76e79", "#dda0dd", "#0d9488", "#faf3e6"],
    });
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.6 },
      colors: ["#f7d6db", "#b76e79", "#dda0dd", "#0d9488", "#faf3e6"],
    });
  };

  return (
    <motion.div
      className="w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center relative overflow-hidden safe-pt safe-pb safe-px select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Scene1Environment isHovered={isHovered} isOpened={isOpened} />

      {/* ============================================
          TOP / EDITORIAL HERO SECTION
          ============================================ */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mx-auto text-center flex flex-col items-center pt-2 sm:pt-4 z-10 flex-shrink-0"
      >
        {/* Micro Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-3 sm:mb-4 text-[#e5a9b1] text-[9.5px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79] animate-pulse" />
          <span>A little something for {siteConfig.nickname}</span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.85rem,5.4vw,3.35rem)] font-serif font-bold leading-[1.14] tracking-tight px-3"
        >
          <span className="text-[#faf3e6]/95">Someone made</span>
          <br />
          <span className="text-[#faf3e6]/95">something</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d6db] via-[#e5a9b1] to-[#b76e79] glow-editorial-gold">
            just for you.
          </span>
          <span className="inline-block text-[#dda0dd] ml-1.5 text-lg sm:text-2xl animate-sparkle">✦</span>
        </motion.h1>
      </motion.div>

      {/* ============================================
          CENTER / LUXURY HERO GIFT OBJECT
          ============================================ */}
      <div className="w-full flex flex-col items-center justify-center my-auto z-20 py-2 sm:py-3">
        <div className="relative flex flex-col items-center">
          {/* Main Interactive Gift Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.9, type: "spring", stiffness: 100 }}
            className="relative w-[clamp(175px,45vw,225px)] h-[clamp(175px,45vw,225px)] flex items-center justify-center cursor-pointer"
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.96 }}
            role="button"
            tabIndex={0}
            aria-label="Open the birthday gift"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Dynamic Ambient Glow behind the box (zero blur filter cost) */}
            <motion.div
              className="absolute -inset-6 rounded-full pointer-events-none"
              animate={{
                background: isHovered
                  ? "radial-gradient(circle, rgba(247,214,219,0.3) 0%, rgba(183,110,121,0.18) 40%, transparent 70%)"
                  : "radial-gradient(circle, rgba(183,110,121,0.2) 0%, rgba(139,69,133,0.1) 42%, transparent 70%)",
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Float Wrapper for idle levitation */}
            <div className={!isOpened && !ribbonPulled ? "animate-gift-float w-full h-full relative flex items-center justify-center" : "w-full h-full relative flex items-center justify-center"}>
              {/* ==================== BOX BODY ==================== */}
              <motion.div
                className="absolute bottom-2 sm:bottom-3 w-[84%] h-[68%] rounded-2xl overflow-hidden border border-white/20"
                style={{
                  background:
                    "linear-gradient(145deg, #660c23 0%, #7d102c 42%, #941738 82%, #54081c 100%)",
                  boxShadow:
                    "0 20px 45px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -8px 16px rgba(0,0,0,0.5)",
                }}
                animate={isOpened ? { y: 40, opacity: 0, scale: 0.85 } : {}}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                {/* Vertical Satin Ribbon with metallic reflection */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-6 sm:w-7 h-full z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, #b76e79 0%, #f7d6db 48%, #d4a0a7 70%, #8a4852 100%)",
                    boxShadow: "0 0 14px rgba(183,110,121,0.6)",
                  }}
                >
                  <div className="w-full h-full opacity-40 bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>

                {/* Horizontal Satin Ribbon */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-full h-6 sm:h-7 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, #f7d6db 0%, #d4a0a7 35%, #b76e79 70%, #8a4852 100%)",
                    boxShadow: "0 0 14px rgba(183,110,121,0.6)",
                  }}
                >
                  <div className="w-full h-full opacity-40 bg-gradient-to-b from-transparent via-white to-transparent" />
                </div>

                {/* Velvet fabric highlight sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/35 pointer-events-none" />
              </motion.div>

              {/* ==================== BOX LID ==================== */}
              <motion.div
                className="absolute bottom-[66%] w-[92%] h-[20%] rounded-t-xl rounded-b-md z-20 border border-white/25"
                style={{
                  background:
                    "linear-gradient(90deg, #660c23 0%, #8f1534 50%, #660c23 100%)",
                  boxShadow:
                    "0 10px 28px rgba(0,0,0,0.65), inset 0 1.5px 2px rgba(255,255,255,0.4)",
                }}
                animate={
                  isOpened
                    ? { y: -140, rotate: -22, opacity: 0 }
                    : ribbonPulled
                    ? { y: -12 }
                    : { y: [0, -3.5, 0] }
                }
                transition={
                  isOpened
                    ? { duration: 0.7, ease: "easeOut" }
                    : ribbonPulled
                    ? { duration: 0.3 }
                    : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                {/* Ribbon on lid */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-6 sm:w-7 h-full z-20"
                  style={{
                    background:
                      "linear-gradient(90deg, #b76e79 0%, #f7d6db 50%, #8a4852 100%)",
                    boxShadow: "0 0 12px rgba(183,110,121,0.6)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-t-xl pointer-events-none" />

                {/* ==================== 3D SATIN BOW ==================== */}
                <AnimatePresence>
                  {!ribbonPulled && (
                    <motion.div
                      className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 flex items-center justify-center z-30 pointer-events-auto"
                      exit={{ scale: 0, opacity: 0, y: -25, rotate: 180 }}
                      transition={{ duration: 0.45 }}
                    >
                      {/* Left bow loop */}
                      <div
                        className="absolute -left-5 sm:-left-6 w-9 sm:w-11 h-9 sm:h-11 border-[4px] sm:border-[5px] border-[#f7d6db] rounded-full -rotate-[30deg] opacity-95"
                        style={{
                          boxShadow:
                            "0 0 14px rgba(183,110,121,0.55), inset 0 0 8px rgba(183,110,121,0.4)",
                          background:
                            "radial-gradient(circle, rgba(183,110,121,0.3) 0%, transparent 70%)",
                        }}
                      />
                      {/* Right bow loop */}
                      <div
                        className="absolute -right-5 sm:-right-6 w-9 sm:w-11 h-9 sm:h-11 border-[4px] sm:border-[5px] border-[#f7d6db] rounded-full rotate-[30deg] opacity-95"
                        style={{
                          boxShadow:
                            "0 0 14px rgba(183,110,121,0.55), inset 0 0 8px rgba(183,110,121,0.4)",
                          background:
                            "radial-gradient(circle, rgba(183,110,121,0.3) 0%, transparent 70%)",
                        }}
                      />
                      {/* Center circular knot seal */}
                      <motion.div
                        className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-full z-40 flex items-center justify-center border border-white/40 shadow-lg"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 35%, #fff 0%, #f7d6db 25%, #b76e79 70%, #660c23 100%)",
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 14px rgba(183,110,121,0.6)",
                            "0 0 30px rgba(247,214,219,0.9)",
                            "0 0 14px rgba(183,110,121,0.6)",
                          ],
                          scale: isHovered ? 1.08 : [1, 1.04, 1],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span className="text-[7.5px] sm:text-[8px] font-black text-[#54081c] tracking-widest drop-shadow-sm">
                          TAP
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ==================== OPENING LIGHT BURST ==================== */}
              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    className="absolute w-28 h-28 rounded-full z-0 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 12, 24], opacity: [0, 0.95, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,240,1) 0%, rgba(247,214,219,0.75) 35%, rgba(183,110,121,0.4) 65%, transparent 100%)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Floor Shadow beneath the box */}
          {!isOpened && (
            <div className="w-[clamp(130px,36vw,170px)] h-4 bg-black/60 rounded-full blur-[8px] mt-[-10px] animate-shadow-breathe pointer-events-none" />
          )}
        </div>

        {/* Elegant Instruction Micro-Copy */}
        <AnimatePresence>
          {!ribbonPulled && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ delay: 1.6, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#e8e2f8]/75 text-[10.5px] sm:text-xs tracking-[0.24em] uppercase font-light mt-3 sm:mt-4 pointer-events-none"
            >
              tap the ribbon to open
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================
          BOTTOM SECTION / MASCOT INTEGRATION
          ============================================ */}
      <div className="w-full relative h-16 sm:h-20 flex items-end justify-start z-10 pointer-events-none flex-shrink-0">
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: [0, -5, 0],
                opacity: 1,
              }}
              exit={{ y: 60, opacity: 0, scale: 0.8 }}
              transition={{
                y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.7 },
              }}
              className="absolute -bottom-1 left-3 sm:left-6 md:left-12 w-24 sm:w-32 md:w-44"
            >
              <Image
                src={siteConfig.mascot.curious}
                alt="Curious Mascot"
                width={176}
                height={176}
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 176px"
                className="w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
