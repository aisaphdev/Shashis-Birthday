"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

export interface DoodleProps extends SVGMotionProps<SVGSVGElement> {
  className?: string;
  color?: string;
}

// All paths are slightly imperfect and organic to simulate hand-drawn doodles.
export function DoodleStar({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M50 10 C52 35, 65 48, 90 50 C65 52, 52 65, 50 90 C48 65, 35 52, 10 50 C35 48, 48 35, 50 10 Z" 
        stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" 
        fill="transparent"
      />
    </motion.svg>
  );
}

export function DoodleSparkle({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M20 50 Q 50 50 50 20 Q 50 50 80 50 Q 50 50 50 80 Q 50 50 20 50 Z" 
        stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="3" fill={color} />
      <circle cx="80" cy="80" r="2" fill={color} />
      <circle cx="80" cy="20" r="4" fill={color} />
      <circle cx="20" cy="80" r="3" fill={color} />
    </motion.svg>
  );
}

export function DoodleCloud({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 50 80 
           C 30 80 15 65 20 45 
           C 25 25 45 15 65 25 
           C 80 5 120 5 140 30 
           C 165 25 185 45 180 70 
           C 175 90 150 80 140 80 
           Z" 
        stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function DoodleBalloon({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 50 10 C 20 10 25 60 50 70 C 75 60 80 10 50 10 Z" 
        stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
      <path 
        d="M 50 70 L 45 80 L 55 80 Z" 
        stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path 
        d="M 50 80 Q 40 100 50 120 Q 60 140 45 150" 
        stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"
      />
    </motion.svg>
  );
}

export function DoodleHeart({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 50 90 
           C 50 90 10 60 15 30 
           C 20 10 45 15 50 35 
           C 55 15 80 10 85 30 
           C 90 60 50 90 50 90 Z" 
        stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function DoodleFlower({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 50 30 C 65 15 85 35 70 50 C 85 65 65 85 50 70 C 35 85 15 65 30 50 C 15 35 35 15 50 30 Z" 
        stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="5" />
    </motion.svg>
  );
}

export function DoodleArrow({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 20 80 Q 50 20 80 20 M 60 20 L 80 20 L 80 40" 
        stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function DoodleRibbon({ className = "", color = "currentColor", ...props }: DoodleProps) {
  return (
    <motion.svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path 
        d="M 20 80 Q 40 40 75 50 T 130 20" 
        stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"
      />
      <path 
        d="M 30 90 Q 50 50 75 60 T 140 30" 
        stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5"
      />
    </motion.svg>
  );
}
