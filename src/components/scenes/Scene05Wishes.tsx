"use client";

import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface Props {
  onComplete: () => void;
}

export default function Scene07Wishes({ onComplete }: Props) {
  useEffect(() => {
    // Soft continuous confetti for this scene
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 20;
      
      confetti({
        particleCount,
        startVelocity: 15,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#ffffff', '#F3A6C7'],
        disableForReducedMotion: true,
        zIndex: 1
      });
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6 overflow-y-auto no-scrollbar pt-24 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center mb-12 md:mb-16 mt-auto">
        <h2 className="font-display text-3xl md:text-5xl text-brand-cream">
          My wishes for you...
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl w-full mb-auto px-2">
        {birthdayConfig.wishes.map((wish, index) => (
          <WishCard key={index} wish={wish} index={index} />
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        onClick={onComplete}
        className="mt-12 px-8 py-4 rounded-full bg-brand-pink text-white font-sans tracking-widest text-sm interactive shadow-[0_0_20px_rgba(200,101,145,0.4)] z-10"
      >
        NEXT
      </motion.button>
    </motion.div>
  );
}

function WishCard({ wish, index }: { wish: string; index: number }) {
  const isAdventure = wish.toLowerCase().includes("adventure");
  const isSmile = wish.toLowerCase().includes("smile");
  const isNoodle = wish.toLowerCase().includes("noodle");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.2, duration: 0.8, type: "spring" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-center text-center min-h-[120px] md:min-h-[160px] relative overflow-hidden group interactive transform-gpu"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Unique micro animations based on content */}
      {isAdventure && (
        <motion.div 
          className="absolute w-[2px] h-[20px] bg-white top-0 left-4 opacity-0 group-hover:opacity-100"
          animate={{ y: [-20, 200], x: [0, 50], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {isSmile && (
        <motion.div 
          className="absolute w-full h-full bg-brand-pink/10 opacity-0 group-hover:opacity-100 top-0 left-0"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {isNoodle && (
        <motion.div 
          className="absolute right-4 bottom-4 text-2xl opacity-0 group-hover:opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🍜
        </motion.div>
      )}
      
      <p className="font-serif text-brand-cream text-sm md:text-lg lg:text-xl font-light relative z-10 leading-relaxed">
        {wish}
      </p>
    </motion.div>
  );
}
