"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Scene1Gift from "@/components/Scene1Gift";
import AudioController from "@/components/AudioController";

// Code-split Scenes 2-6 to minimize initial JavaScript bundle and TBT
const Scene2Reveal = dynamic(() => import("@/components/Scene2Reveal"), { ssr: false });
const Scene3Story = dynamic(() => import("@/components/Scene3Story"), { ssr: false });
const Scene4Quest = dynamic(() => import("@/components/Scene4Quest"), { ssr: false });
const Scene5Letter = dynamic(() => import("@/components/Scene5Letter"), { ssr: false });
const Scene6Ending = dynamic(() => import("@/components/Scene6Ending"), { ssr: false });

export default function Home() {
  const [currentScene, setCurrentScene] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Lock scrolling when not on story scene
  useEffect(() => {
    if (currentScene === 3 || currentScene === 5) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [currentScene]);

  const nextScene = () => setCurrentScene((prev) => prev + 1);

  return (
    <main className="min-h-[100dvh] w-full bg-[#0f172a] text-[#f5f5dc] overflow-x-hidden relative selection:bg-[#b76e79]/30">
      <AudioController 
        isEnabled={audioEnabled} 
        onToggle={() => setAudioEnabled(!audioEnabled)} 
        currentScene={currentScene} 
      />

      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <Scene1Gift 
            key="scene1" 
            onComplete={() => {
              setAudioEnabled(true);
              nextScene();
            }} 
          />
        )}
        {currentScene === 2 && (
          <Scene2Reveal key="scene2" onNext={nextScene} />
        )}
        {currentScene === 3 && (
          <Scene3Story key="scene3" onNext={nextScene} />
        )}
        {currentScene === 4 && (
          <Scene4Quest key="scene4" onNext={nextScene} />
        )}
        {currentScene === 5 && (
          <Scene5Letter key="scene5" onNext={nextScene} />
        )}
        {currentScene === 6 && (
          <Scene6Ending key="scene6" />
        )}
      </AnimatePresence>
    </main>
  );
}
