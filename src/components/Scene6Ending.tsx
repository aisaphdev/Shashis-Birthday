"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import Image from "next/image";

export default function Scene6Ending() {
  const [stage, setStage] = useState(0);
  const [playFireworks] = useSound(siteConfig.audio.soundEffects.fireworks, { volume: 0.5 });

  useEffect(() => {
    const timeline = [
      { delay: 2500, action: () => setStage(1) },
      { delay: 3500, action: () => setStage(2) },
      {
        delay: 3500,
        action: () => {
          setStage(3);
          fireConfetti();
          playFireworks();
        },
      },
      { delay: 2500, action: () => setStage(4) },
      { delay: 1800, action: () => setStage(5) },
    ];

    let currentDelay = 0;
    const timeouts: NodeJS.Timeout[] = [];

    timeline.forEach(({ delay, action }) => {
      currentDelay += delay;
      timeouts.push(setTimeout(action, currentDelay));
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const fireConfetti = () => {
    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.35), y: Math.random() - 0.2 },
        colors: ["#b76e79", "#dda0dd", "#0d9488", "#e6e6fa", "#f5f5dc"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.65, 0.9), y: Math.random() - 0.2 },
        colors: ["#b76e79", "#dda0dd", "#0d9488", "#e6e6fa", "#f5f5dc"],
      });
    }, 280);
  };

  return (
    <motion.div
      className="w-full h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden safe-px safe-pt safe-pb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
    >
      {/* Deep velvet gradient background: Navy → Plum → Midnight Maroon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-[#10091c] to-[#200818] z-0" />

      {/* Atmospheric ambient blooms */}
      <div className="absolute top-0 left-1/4 w-[clamp(350px,70vw,600px)] h-[clamp(350px,70vw,600px)] bg-[#b76e79]/15 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[clamp(320px,65vw,500px)] h-[clamp(320px,65vw,500px)] bg-[#0d9488]/12 rounded-full blur-[130px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,60vw,450px)] h-[clamp(300px,60vw,450px)] bg-[#dda0dd]/10 rounded-full blur-[110px]" />

      {/* Atmospheric drifting haze */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-0 animate-haze-1"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(183, 110, 121, 0.3) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.random() * 0.7 + 0.15 }}
            transition={{ delay: Math.random() * 2.5, duration: 1.8 }}
            style={{
              width: Math.random() * 2 + 0.5 + "px",
              height: Math.random() * 2 + 0.5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              background: ["#ffffff", "#e6e6fa", "#dda0dd", "#b76e79"][Math.floor(Math.random() * 4)],
              boxShadow:
                Math.random() > 0.8
                  ? `0 0 ${4 + Math.random() * 4}px 1px rgba(221,160,221,0.6)`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="z-10 text-center px-4 sm:px-6 flex flex-col items-center max-w-xl w-full my-auto">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.p
              key="part1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2 }}
              className="text-lg sm:text-2xl md:text-3xl font-light text-[#e6e6fa]/85 tracking-wide leading-relaxed"
            >
              {siteConfig.finalScene.part1}
            </motion.p>
          )}

          {stage === 2 && (
            <motion.p
              key="part2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="text-lg sm:text-2xl md:text-3xl font-light text-[#e6e6fa]/85 tracking-wide leading-relaxed"
            >
              {siteConfig.finalScene.part2}
            </motion.p>
          )}
        </AnimatePresence>

        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="flex flex-col items-center justify-center relative w-full"
          >
            {/* Mascot at top of name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="w-24 sm:w-32 md:w-40 mb-2 sm:mb-3 flex-shrink-0"
            >
              <Image
                src={siteConfig.mascot.soft}
                alt="Soft Mascot"
                width={180}
                height={180}
                className="w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>

            {/* Name */}
            <h1 className="text-[clamp(2.25rem,8vw,5.5rem)] font-serif font-black tracking-tight mb-2 sm:mb-3 z-10 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b76e79] via-[#f5f5dc] to-[#0d9488] glow-rosegold">
                SHASHIIII
              </span>
              <span className="ml-1.5 inline-block">❤️</span>
            </h1>

            {/* Happy Birthday */}
            {stage >= 4 && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[clamp(1.15rem,4.5vw,2.5rem)] font-serif font-bold tracking-widest text-[#dda0dd] glow-plum mb-4 sm:mb-6 uppercase"
              >
                <span>HAPPY BIRTHDAY</span>
                <span className="ml-1.5">🎂</span>
              </motion.h2>
            )}

            {/* Final heartfelt lines */}
            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-lg text-[#e6e6fa]/85 font-medium"
              >
                {siteConfig.finalScene.part5.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <p className="pt-4 sm:pt-6 font-handwriting text-xl sm:text-2xl md:text-3xl text-[#b76e79] font-bold glow-rosegold">
                  {siteConfig.finalScene.signoff}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
