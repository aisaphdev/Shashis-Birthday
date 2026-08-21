"use client";

import { motion } from "framer-motion";

interface SceneProgressProps {
  currentScene: number;
  totalScenes?: number;
}

export default function SceneProgress({ currentScene, totalScenes = 6 }: SceneProgressProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center gap-2.5 pointer-events-none"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))",
      }}
    >
      {Array.from({ length: totalScenes }, (_, i) => {
        const sceneNum = i + 1;
        const isActive = sceneNum === currentScene;
        const isPast = sceneNum < currentScene;

        return (
          <motion.div
            key={sceneNum}
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.08, duration: 0.4 }}
          >
            {/* Outer glow ring for active dot */}
            {isActive && (
              <motion.div
                className="absolute w-5 h-5 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(183, 110, 121, 0.35) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Dot */}
            <motion.div
              className="rounded-full"
              style={{
                width: isActive ? 7 : 4,
                height: isActive ? 7 : 4,
                background: isActive
                  ? "linear-gradient(135deg, #f7d6db, #b76e79)"
                  : isPast
                  ? "rgba(183, 110, 121, 0.5)"
                  : "rgba(232, 226, 248, 0.2)",
                boxShadow: isActive
                  ? "0 0 8px rgba(183, 110, 121, 0.6)"
                  : "none",
              }}
              animate={
                isActive
                  ? { opacity: [0.7, 1, 0.7] }
                  : {}
              }
              transition={
                isActive
                  ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}
