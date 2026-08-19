"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Scene1Gift from "@/components/Scene1Gift";
import Scene2Reveal from "@/components/Scene2Reveal";
import Scene3Story from "@/components/Scene3Story";
import Scene4Quest from "@/components/Scene4Quest";
import Scene5Letter from "@/components/Scene5Letter";
import Scene6Ending from "@/components/Scene6Ending";
import AudioController from "@/components/AudioController";

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
