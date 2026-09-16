"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

interface Props {
  onComplete: () => void;
}

export default function Scene02Reveal({ onComplete }: Props) {
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0, r: 0 });
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMaybeEscape = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    
    // Spawn sparkle trail at old position
    setSparkles(prev => [...prev.slice(-4), { id: Date.now(), x: buttonPos.x, y: buttonPos.y }]);

    // Calculate a safe jump distance bounded by viewport
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 600;
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Keep it safely within 35% of the screen center to avoid corners/clipping
    const maxRadiusX = viewportW * 0.35;
    const maxRadiusY = viewportH * 0.35;
    
    let newX = (Math.random() - 0.5) * maxRadiusX * 2;
    let newY = (Math.random() - 0.5) * maxRadiusY * 2;
    const newR = (Math.random() - 0.5) * 30; // Random rotation between -15 and 15
    
    // Ensure it jumps a minimum distance away from current pos
    if (Math.abs(newX - buttonPos.x) < 80) newX = newX < 0 ? newX - 100 : newX + 100;
    if (Math.abs(newY - buttonPos.y) < 80) newY = newY < 0 ? newY - 100 : newY + 100;
    
    // Prevent overlapping with the main button (which is roughly around 0,0)
    // Mobile safety box
    if (Math.abs(newX) < 130 && Math.abs(newY) < 90) {
      if (Math.abs(newY) < 90) {
        newY = newY >= 0 ? newY + 90 : newY - 90;
      }
    }

    // Final clamp to ensure safety
    newX = Math.max(-maxRadiusX, Math.min(maxRadiusX, newX));
    newY = Math.max(-maxRadiusY, Math.min(maxRadiusY, newY));

    setButtonPos({ x: newX, y: newY, r: newR });
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6 md:space-y-8 w-full max-w-[90vw] md:max-w-3xl">
        <h1 className="text-h2 md:text-h1 text-brand-cream leading-tight break-words">
          <TextReveal text="Happy Birthday," type="word" delay={0.5} />
          <br className="sm:hidden" />
          <TextReveal text="Sayang Ellya ❤️" type="word" delay={1} className="text-brand-pink" />
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-2xl font-sans text-brand-rose font-light"
        >
          Today is all about you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="pt-8 md:pt-12 space-y-6"
        >
          <p className="text-sm md:text-base font-sans text-brand-cream/80">
            And yes... I spent way too much time making this.
            <br />
            <span className="italic mt-3 block text-brand-pink/80">Was it worth it?</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 h-40 relative z-30">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="w-48 py-3 rounded-full bg-brand-pink text-white font-sans text-sm interactive z-20 shadow-[0_0_20px_rgba(200,101,145,0.4)] relative"
            >
              Absolutely ❤️
            </motion.button>

            {sparkles.map(s => (
              <motion.div
                key={s.id}
                className="absolute text-[10px] pointer-events-none z-10 drop-shadow-sm"
                initial={{ x: s.x, y: s.y, opacity: 1, scale: 1, rotate: 0 }}
                animate={{ y: s.y - 20, opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.8 }}
                style={{ left: "50%", top: "50%" }}
              >
                ✨
              </motion.div>
            ))}

            <motion.button
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: buttonPos.x,
                y: buttonPos.y,
                rotate: buttonPos.r
              }}
              transition={{ type: "spring", stiffness: 600, damping: 12, bounce: 0.5 }}
              onPointerEnter={handleMaybeEscape}
              onPointerDown={handleMaybeEscape}
              onTouchStart={handleMaybeEscape}
              onClick={handleMaybeEscape}
              className="w-48 py-3 rounded-full glass-card text-brand-cream font-sans text-sm interactive z-30 absolute sm:static bg-white/5 border border-white/10"
              style={{ position: 'absolute' }}
            >
              Maybe... 👀
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
