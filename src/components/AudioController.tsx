"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/data";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioControllerProps {
  isEnabled: boolean;
  onToggle: () => void;
  currentScene: number;
}

export default function AudioController({ isEnabled, onToggle, currentScene }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only instantiate and buffer the audio when the user has entered Scene 2+ and enabled audio
    if (isEnabled && currentScene > 1) {
      if (!audioRef.current) {
        const audio = new Audio(siteConfig.audio.backgroundMusic);
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.25;
        audioRef.current = audio;
      }
      audioRef.current.play().catch((e) => console.log("Audio play blocked", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isEnabled, currentScene]);

  // Adjust volume based on scene
  useEffect(() => {
    if (audioRef.current) {
      if (currentScene === 6) {
        audioRef.current.volume = 0.3; // Climax celebration
      } else if (currentScene === 5) {
        audioRef.current.volume = 0.15; // Intimate letter scene
      } else {
        audioRef.current.volume = 0.25;
      }
    }
  }, [currentScene]);

  if (currentScene === 1) return null; // Don't show in the mysterious opening

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-50 p-3 rounded-full glass hover:bg-white/10 active:scale-90 transition-transform cursor-pointer shadow-lg"
      style={{
        top: "max(1rem, env(safe-area-inset-top, 1rem))",
        right: "max(1rem, env(safe-area-inset-right, 1rem))",
      }}
      onClick={onToggle}
      aria-label="Toggle audio"
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5 text-[#b76e79]" />
      ) : (
        <VolumeX className="w-5 h-5 text-[#e6e6fa]/60" />
      )}
    </motion.button>
  );
}
