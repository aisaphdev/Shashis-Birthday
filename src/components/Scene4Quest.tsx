"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import Image from "next/image";

interface Scene4Props {
  onNext: () => void;
}

export default function Scene4Quest({ onNext }: Scene4Props) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [cakeFound, setCakeFound] = useState(false);
  const [wishChosen, setWishChosen] = useState<string | null>(null);

  const [playCakeSound] = useSound(siteConfig.audio.soundEffects.cakeFound);
  const [playClickSound] = useSound(siteConfig.audio.soundEffects.buttonClick);

  const handleFindCake = () => {
    if (cakeFound) return;
    setCakeFound(true);
    playCakeSound();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f7d6db", "#b76e79", "#dda0dd", "#0d9488"],
    });
  };

  const handleWish = (wish: string) => {
    playClickSound();
    setWishChosen(wish);
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.55 },
      colors: ["#f7d6db", "#b76e79", "#dda0dd", "#0d9488"],
    });
  };

  return (
    <motion.div 
      className="w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center relative safe-pt safe-pb safe-px overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7 }}
    >
      {/* Deep atmosphere gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050811] via-[#100818] to-[#1f091c] -z-10" />

      {/* Atmospheric ambient lighting (Zero Blur Cost) */}
      <div
        className="absolute top-10 right-1/4 w-80 h-80 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.24) 0%, transparent 70%)",
        }}
      />

      {/* Top Header */}
      <div className="text-center z-10 flex flex-col items-center pt-2 sm:pt-4 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-2 sm:mb-3 text-[#e5a9b1] text-[9.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
          <span>A Little Interactive Chapter</span>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 sm:w-28 md:w-36 mb-1"
        >
          <div className="animate-gift-float">
            <Image 
              src={siteConfig.mascot.gamer} 
              alt="Gamer Mascot" 
              width={144} 
              height={144} 
              sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px"
              className="w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>

        <motion.h2 
          className="text-[clamp(1.35rem,4.2vw,2.25rem)] font-serif font-bold text-[#faf3e6]"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span>Three Mini Wishes</span>
          <span className="ml-2 text-[#dda0dd] text-base sm:text-xl">✨</span>
        </motion.h2>
      </div>

      {/* Interactive Luxury Card */}
      <div className="w-full max-w-md glass-luxury glass-shimmer rounded-2xl sm:rounded-3xl p-5 sm:p-7 min-h-[250px] sm:min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden z-10 my-auto">
        <AnimatePresence mode="wait">
          {missionIndex === 0 && (
            <motion.div
              key="mission1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="text-center w-full flex flex-col items-center"
            >
              <p className="text-[10.5px] sm:text-xs text-[#dda0dd] uppercase tracking-[0.22em] font-medium mb-3">
                CHAPTER I • THE HIDDEN SWEET
              </p>
              
              {!cakeFound ? (
                <div className="w-full flex flex-col items-center">
                  <p className="text-xs sm:text-sm text-[#faf3e6]/85 mb-4">
                    Tap the birthday cake to unlock the next wish.
                  </p>
                  
                  {/* The hidden cake interactive playground */}
                  <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 flex items-center justify-center overflow-hidden">
                    {/* Cake ambient halo */}
                    <div 
                      className="absolute w-20 h-20 rounded-full pointer-events-none" 
                      style={{
                        background: "radial-gradient(circle, rgba(183, 110, 121, 0.35) 0%, transparent 70%)"
                      }}
                    />
                    <motion.button
                      onClick={handleFindCake}
                      className="text-3xl sm:text-4xl p-3 cursor-pointer active:scale-125 transition-transform relative z-10"
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      aria-label="Birthday cake"
                    >
                      🎂
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-lg sm:text-xl font-serif font-bold text-[#f7d6db] mb-1 glow-editorial-gold">Cake Found! 🎂</p>
                  <p className="text-xs sm:text-sm mb-5 text-[#e8e2f8]/85">You were always fast at discovering things.</p>
                  <button 
                    onClick={() => { playClickSound(); setMissionIndex(1); }}
                    className="px-7 py-3 bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#b76e79] text-white rounded-full font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
                  >
                    Next Chapter →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {missionIndex === 1 && (
            <motion.div
              key="mission2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="text-center w-full flex flex-col items-center"
            >
              <p className="text-[10.5px] sm:text-xs text-[#dda0dd] uppercase tracking-[0.22em] font-medium mb-3">
                CHAPTER II • CHOOSE YOUR BLESSING
              </p>
              
              {!wishChosen ? (
                <div className="w-full">
                  <p className="text-xs sm:text-sm mb-3.5 text-[#faf3e6]/85">What energy are we manifesting this year?</p>
                  <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
                    {['🌸 Pure Happiness & Peace', '💰 Big Success & Ambition', '😂 Daily Laughter & Chaos', '❤️ Absolutely All of Them'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleWish(opt.includes('All') ? 'ALL' : opt)}
                        className="px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-[#b76e79]/20 hover:border-[#b76e79]/40 border border-white/10 active:scale-[0.98] text-left transition-all text-xs sm:text-sm font-medium text-[#faf3e6] cursor-pointer flex items-center justify-between group shadow-sm"
                      >
                        <span className="group-hover:text-[#f7d6db] transition-colors">{opt}</span>
                        <span className="text-[10px] text-[#e5a9b1] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all">✦</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  {wishChosen === 'ALL' ? (
                    <>
                      <p className="text-lg sm:text-xl font-serif font-bold text-[#f7d6db] mb-1 glow-editorial-gold">Every Single One. ✨</p>
                      <p className="text-xs sm:text-sm mb-5 text-[#e8e2f8]/85">You deserve all of them without holding back.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg sm:text-xl font-serif font-bold text-[#f7d6db] mb-1 glow-editorial-gold">Wish Granted. ✨</p>
                      <p className="text-xs sm:text-sm mb-5 text-[#e8e2f8]/85">May this year bring you all of it and more.</p>
                    </>
                  )}
                  <button 
                    onClick={() => { playClickSound(); setMissionIndex(2); }}
                    className="px-7 py-3 bg-gradient-to-r from-[#b76e79] via-[#8b4585] to-[#0d9488] text-white rounded-full font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
                  >
                    The Final Chapter →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {missionIndex === 2 && (
            <motion.div
              key="mission3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full flex flex-col items-center py-2"
            >
              <p className="text-[10.5px] sm:text-xs text-[#dda0dd] uppercase tracking-[0.22em] font-medium mb-2">
                FINAL CHAPTER
              </p>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f7d6db] via-[#faf3e6] to-[#b76e79] glow-editorial-gold">
                A Personal Letter For You...
              </h3>
              <div className="ornamental-divider mb-6 opacity-60">
                <span className="text-[10px] text-[#b76e79]">✦</span>
              </div>
              <button 
                onClick={() => { playClickSound(); onNext(); }}
                className="px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-[#b76e79] via-[#8b4585] to-[#0d9488] text-white rounded-full font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
              >
                Read Letter →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer spacer */}
      <div className="h-2 flex-shrink-0" />
    </motion.div>
  );
}
