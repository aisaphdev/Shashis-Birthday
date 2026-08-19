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
  const [showFastForward, setShowFastForward] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  // Handle chat message progression
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    siteConfig.storyMessages.forEach((msg, index) => {
      const timeout = setTimeout(() => {
        setMessagesToShow(index + 1);
        
        if (index === siteConfig.storyMessages.length - 1) {
          setTimeout(() => {
            setShowFastForward(true);
          }, 1800);
        }
      }, msg.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Handle counter animation
  useEffect(() => {
    if (showFastForward) {
      const duration = 2000;
      const steps = 60;
      const stepTime = Math.abs(Math.floor(duration / steps));
      const target = siteConfig.daysSince;
      
      let current = 0;
      const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) {
          setCounter(target);
          clearInterval(timer);
          setTimeout(() => setShowContinue(true), 700);
        } else {
          setCounter(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [showFastForward]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-start pt-10 pb-20 sm:py-16 safe-px safe-pb relative overflow-y-auto bg-gradient-to-b from-[#050811] via-[#0f0c18] to-[#1a0815] select-none"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-12 right-6 w-72 h-72 bg-[#0d9488]/10 rounded-full blur-[110px] -z-10" />
      <div className="absolute bottom-16 left-6 w-80 h-80 bg-[#b76e79]/12 rounded-full blur-[110px] -z-10" />

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
        {/* Mascot Peeking (Desktop / Tablet) */}
        <motion.div 
          initial={{ x: -25, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="hidden md:block w-1/3 flex-shrink-0"
        >
          <div className="animate-gift-float">
            <Image 
              src={siteConfig.mascot.confused} 
              alt="Confused Mascot" 
              width={240} 
              height={300} 
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
        </div>
      </div>

      {/* Fast Forward & Counter Card */}
      {showFastForward && (
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center w-full max-w-md sm:max-w-xl glass-luxury p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl mt-4 z-10"
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
