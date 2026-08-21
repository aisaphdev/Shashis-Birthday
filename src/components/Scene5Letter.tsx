"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import Image from "next/image";

interface Scene5Props {
  onNext: () => void;
}

export default function Scene5Letter({ onNext }: Scene5Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  const lines = siteConfig.letter;

  useEffect(() => {
    // Reveal lines one by one every 2.4 seconds
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, visibleLines === 0 ? 800 : 2400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, lines.length]);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 6 : 14;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (i * 18 + 9) % 94,
      y: (i * 22 + 14) % 90,
      size: 2 + (i % 3),
      duration: 12 + (i % 6),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div 
      className="w-full min-h-[100dvh] pt-10 pb-20 sm:py-20 safe-px safe-pb safe-pt flex flex-col items-center justify-center relative overflow-y-auto select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 }}
    >
      {/* Deep velvet foundation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050811] via-[#100818] to-[#1f0918] -z-10" />

      {/* Atmospheric ambient blooms (Native GPU Fill - Zero Blur Cost) */}
      <div
        className="absolute top-1/4 left-1/4 w-[clamp(320px,65vw,550px)] h-[clamp(320px,65vw,550px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.28) 0%, rgba(139, 69, 133, 0.12) 40%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[clamp(300px,60vw,500px)] h-[clamp(300px,60vw,500px)] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(221, 160, 221, 0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-3/4 left-1/3 w-72 h-72 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#f7d6db]/25 blur-[1px] pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.1, 0.65, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-3xl w-full relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-end my-auto">
        
        {/* Soft Mascot */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-20 sm:w-28 md:w-1/3 mb-2 md:mb-4 flex-shrink-0 mx-auto md:mx-0"
        >
          <div className="animate-gift-float">
            <Image 
              src={siteConfig.mascot.soft} 
              alt="Soft Mascot" 
              width={200} 
              height={260} 
              sizes="(max-width: 768px) 100px, 200px"
              className="w-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Letter Card */}
        <div className="w-full md:w-2/3 bg-[#1a1520]/85 glass-shimmer backdrop-blur-xl border border-[#b76e79]/25 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl">
          <div className="space-y-4 sm:space-y-5 text-left text-xs sm:text-sm md:text-base font-medium leading-relaxed text-[#faf3e6]">
            <AnimatePresence>
              {lines.map((line, index) => (
                index < visibleLines && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={
                      line.includes("Dear")
                        ? "font-handwriting text-2xl sm:text-3xl text-[#f7d6db] mb-2"
                        : index === 1
                        ? "letter-drop-cap"
                        : line.startsWith("—")
                        ? "font-handwriting text-xl sm:text-2xl text-[#dda0dd] text-right pt-2 tracking-wider"
                        : ""
                    }
                  >
                    {(line.includes("Never trust strangers") || line.includes("Zeus") || line.includes("Happy Birthday"))
                      ? (() => {
                          const parts = line.split(/([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)/gu);
                          return parts.map((part, pi) =>
                            /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(part)
                              ? <span key={pi}>{part}</span>
                              : <span key={pi} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b76e79] to-[#dda0dd]">{part}</span>
                          );
                        })()
                      : line
                    }
                  </motion.p>
                )
              ))}
            </AnimatePresence>
          </div>

          {visibleLines >= lines.length && (
            <motion.div 
              className="mt-8 sm:mt-12 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="ornamental-divider mb-5 opacity-60">
                <span className="text-[10px] text-[#b76e79]">✦</span>
              </div>
              <p className="text-[#dda0dd] font-bold mb-4 tracking-[0.24em] text-[10px] sm:text-xs uppercase">ONE LAST THING...</p>
              <button
                onClick={onNext}
                className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#b76e79] via-[#8b4585] to-[#0d9488] text-white font-bold text-xs sm:text-sm tracking-widest shadow-xl shadow-[#b76e79]/20 hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
              >
                OPEN →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
