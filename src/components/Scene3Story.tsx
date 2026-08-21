"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/data";
import Image from "next/image";

interface Scene3StoryProps {
  onNext: () => void;
}

export default function Scene3Story({ onNext }: Scene3StoryProps) {
  const [messagesToShow, setMessagesToShow] = useState<number>(0);
  const [typingSender, setTypingSender] = useState<string | null>(null);
  const [showFastForward, setShowFastForward] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  // Handle chat message progression with realistic typing delays
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    siteConfig.storyMessages.forEach((msg, index) => {
      // Show typing indicator 450ms before message appears
      const typingTimeout = setTimeout(() => {
        setTypingSender(msg.sender);
      }, Math.max(0, msg.delay - 450));
      timeouts.push(typingTimeout);

      const msgTimeout = setTimeout(() => {
        setMessagesToShow(index + 1);
        setTypingSender(null);
        
        if (index === siteConfig.storyMessages.length - 1) {
          setTimeout(() => {
            setShowFastForward(true);
          }, 1600);
        }
      }, msg.delay);
      timeouts.push(msgTimeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Handle counter animation with requestAnimationFrame
  useEffect(() => {
    if (showFastForward) {
      let animationFrameId: number;
      const startTime = performance.now();
      const duration = 1600;
      const target = siteConfig.daysSince;
      let lastVal = -1;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth easeOutQuad
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOut * target);

        if (currentVal !== lastVal) {
          lastVal = currentVal;
          setCounter(currentVal);
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCounter(target);
          setTimeout(() => setShowContinue(true), 400);
        }
      };

      animationFrameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [showFastForward]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-start pt-10 pb-20 sm:py-16 safe-px safe-pb relative overflow-y-auto bg-gradient-to-b from-[#050811] via-[#0f0c18] to-[#1a0815] select-none"
    >
      {/* Ambient background blooms (Zero Blur Cost) */}
      <div
        className="absolute top-12 right-6 w-80 h-80 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-16 left-6 w-80 h-80 rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(183, 110, 121, 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Intro Header */}
      <div className="text-center mb-6 sm:mb-10 max-w-lg px-2 z-10">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full glass-pill text-[#e5a9b1] font-semibold text-[10.5px] sm:text-xs tracking-[0.22em] uppercase mb-3"
        >
          {siteConfig.friendshipStartDate}
        </motion.div>
        <motion.h2
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[clamp(1.35rem,4.2vw,2.35rem)] font-serif font-bold text-[#faf3e6] leading-snug"
        >
          The day a random stranger appeared...
        </motion.h2>
      </div>

      {/* Chat Section */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10 mb-8 sm:mb-12">
        {/* Mascot Peeking */}
        <motion.div 
          initial={{ x: -25, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="w-20 sm:w-28 md:w-1/3 flex-shrink-0 mx-auto md:mx-0"
        >
          <div className="animate-gift-float">
            <Image 
              src={siteConfig.mascot.confused} 
              alt="Confused Mascot" 
              width={200} 
              height={240} 
              sizes="(max-width: 768px) 100px, 200px"
              className="w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>

        {/* Chat Bubbles */}
        <div className="w-full md:w-2/3 flex flex-col gap-3 sm:gap-3.5">
          {siteConfig.storyMessages.map((msg, index) => (
            <AnimatePresence key={index}>
              {messagesToShow > index && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`flex flex-col ${msg.sender === siteConfig.recipientName ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] sm:text-xs text-[#e8e2f8]/70 mb-1 px-1 tracking-wide">{msg.sender}</span>
                  <div 
                    className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-[80%] shadow-lg text-xs sm:text-sm md:text-base leading-relaxed ${
                      msg.sender === siteConfig.recipientName 
                        ? 'bg-gradient-to-r from-[#b76e79] to-[#8b4585] text-white rounded-tr-none border border-white/20' 
                        : 'bg-white/[0.07] text-[#faf3e6] border border-white/12 rounded-tl-none backdrop-blur-xl'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {typingSender && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col ${typingSender === siteConfig.recipientName ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[9.5px] text-[#e8e2f8]/50 mb-1 px-1">{typingSender} is typing...</span>
                <div className="px-3.5 py-2 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                  <span className="typing-dot" style={{ animation: "typing-dot-bounce 1.2s infinite ease-in-out" }} />
                  <span className="typing-dot" style={{ animation: "typing-dot-bounce 1.2s infinite ease-in-out 0.2s" }} />
                  <span className="typing-dot" style={{ animation: "typing-dot-bounce 1.2s infinite ease-in-out 0.4s" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fast Forward & Counter Card */}
      {showFastForward && (
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center w-full max-w-md sm:max-w-xl glass-luxury glass-shimmer p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl mt-4 z-10"
        >
          <p className="text-[#dda0dd] font-semibold tracking-[0.24em] text-[10px] sm:text-xs uppercase mb-3">FAST FORWARD</p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-5xl sm:text-6xl md:text-7xl font-serif font-black mb-3 text-[#f7d6db]">
            <span className="glow-editorial-gold">{counter}</span>
            <span className="text-xl sm:text-2xl md:text-3xl text-[#e8e2f8]/85 font-sans font-light tracking-widest">DAYS</span>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#faf3e6]/90 max-w-sm mx-auto leading-relaxed font-medium">
            Somehow we became best friends in just 39 days. How did this happen so fast? ✨
          </p>
          
          <AnimatePresence>
            {showContinue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onNext}
                className="mt-6 px-8 py-3.5 bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#b76e79] text-white rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Let&apos;s keep going →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
