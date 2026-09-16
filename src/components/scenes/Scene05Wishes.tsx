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
  const isStress = wish.toLowerCase().includes("stress");
  const isHappiness = wish.toLowerCase().includes("happiness");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.2, duration: 0.8, type: "spring" }}
      whileHover={{ y: -5, scale: 1.03, rotateX: 5, rotateY: -5 }}
      style={{ perspective: 1000 }}
      className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-center justify-center text-center min-h-[120px] md:min-h-[160px] relative overflow-hidden group interactive transform-gpu shadow-[0_0_15px_rgba(200,101,145,0.05)] hover:shadow-[0_0_25px_rgba(200,101,145,0.2)] transition-shadow duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Unique micro animations based on content */}
      {isAdventure && (
        <motion.div 
          className="absolute w-[2px] h-[30px] bg-white top-[-10px] left-[10px] opacity-0 group-hover:opacity-80"
          animate={{ y: [-30, 250], x: [0, 80], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {isSmile && (
        <motion.div 
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(243,166,199,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {isNoodle && (
        <>
          <motion.div 
            className="absolute right-4 bottom-4 text-2xl opacity-0 group-hover:opacity-30"
            animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🍜
          </motion.div>
          <motion.div 
            className="absolute right-8 bottom-8 text-xl opacity-0 group-hover:opacity-20"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            🍜
          </motion.div>
        </>
      )}

      {isStress && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 pointer-events-none"
          animate={{ x: [0, 50, 100], opacity: [0, 0.2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-4xl blur-[2px]">☁️</span>
        </motion.div>
      )}

      {isHappiness && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-pink/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl"
          animate={{ scale: [0, 1.5], opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      
      <p className="font-serif text-brand-cream text-sm md:text-lg lg:text-xl font-light relative z-10 leading-relaxed drop-shadow-sm group-hover:text-white transition-colors duration-300">
        {wish}
      </p>
    </motion.div>
  );
}
