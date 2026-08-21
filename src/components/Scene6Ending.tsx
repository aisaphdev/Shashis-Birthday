"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import Image from "next/image";
import { getClampedDPR } from "@/utils/device";

export default function Scene6Ending() {
  const [stage, setStage] = useState(0);
  const [playFireworks] = useSound(siteConfig.audio.soundEffects.fireworks, { volume: 0.5 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const timeline = [
      { delay: 2200, action: () => setStage(1) },
      { delay: 3000, action: () => setStage(2) },
      {
        delay: 3000,
        action: () => {
          setStage(3);
          fireCelebration();
          playFireworks();
        },
      },
      { delay: 2200, action: () => setStage(4) },
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

  // Efficient 1-time canvas starfield drawing (zero per-frame DOM cost)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = getClampedDPR(1.5);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isMobile = width < 768;
    const starCount = isMobile ? 40 : 80;
    const colors = ["#ffffff", "#e6e6fa", "#dda0dd", "#b76e79"];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.2 + 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.random() * 0.7 + 0.2;
      ctx.fill();
    }
  }, []);

  const fireCelebration = () => {
    // 2 crisp celebratory bursts
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { x: 0.2, y: 0.5 },
      colors: ["#b76e79", "#dda0dd", "#0d9488", "#e6e6fa", "#f5f5dc"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x: 0.8, y: 0.5 },
        colors: ["#b76e79", "#dda0dd", "#0d9488", "#e6e6fa", "#f5f5dc"],
      });
    }, 300);
  };

  return (
    <motion.div
      className="w-full h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden safe-px safe-pt safe-pb select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
    >
      {/* Deep velvet gradient background: Navy → Plum → Midnight Maroon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-[#10091c] to-[#200818] z-0" />

      {/* Atmospheric ambient blooms (Native GPU Fill - Zero Blur Cost) */}
      <div
        className="absolute top-0 left-1/4 w-[clamp(350px,70vw,600px)] h-[clamp(350px,70vw,600px)] rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.28) 0%, rgba(139, 69, 133, 0.12) 40%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[clamp(320px,65vw,500px)] h-[clamp(320px,65vw,500px)] rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,60vw,450px)] h-[clamp(300px,60vw,450px)] rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(221, 160, 221, 0.18) 0%, transparent 70%)",
        }}
      />

      {/* High-Performance Static Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

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
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, type: "spring", bounce: 0.35 }}
            className="flex flex-col items-center justify-center relative w-full"
          >
            {/* Climax Light Bloom behind name */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full pointer-events-none -z-10"
              style={{
                background: "radial-gradient(circle, rgba(183, 110, 121, 0.4) 0%, rgba(221, 160, 221, 0.2) 40%, transparent 70%)",
              }}
            />

            {/* Mascot at top of name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="w-24 sm:w-32 md:w-40 mb-2 sm:mb-3 flex-shrink-0"
            >
              <div className="animate-gift-float">
                <Image
                  src={siteConfig.mascot.soft}
                  alt="Soft Mascot"
                  width={160}
                  height={160}
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                  className="w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-[clamp(1.15rem,4.5vw,2.5rem)] font-serif font-bold tracking-widest text-[#dda0dd] glow-plum mb-3 uppercase">
                  <span>HAPPY BIRTHDAY</span>
                  <span className="ml-1.5">🎂</span>
                </h2>
                <div className="ornamental-divider mb-4 opacity-50">
                  <span className="text-[10px] text-[#b76e79]">✦</span>
                </div>
              </motion.div>
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
                <p className="pt-4 sm:pt-6 font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#f7d6db] font-bold glow-rosegold tracking-wide">
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
