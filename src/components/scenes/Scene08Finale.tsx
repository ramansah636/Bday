"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";
import confetti from "canvas-confetti";
import TextReveal from "@/components/ui/TextReveal";

export default function Scene08Finale() {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // Stage Orchestration logic (13 stages as requested)
    // 0: Fade to midnight (initial state)
    // 1: Tiny star 1
    // 2: Tiny star 2
    // 3: Heart forming
    // 4: "Happy Birthday..."
    // 5: "Sayang Ellya ❤️"
    // 6: Stars orbiting
    // 7: Particles appear
    // 8: Heart expands
    // 9: Large celebration burst
    // 10: Elegant confetti
    // 11: Final message fades in
    // 12: Environment settles

    const timings = [
      0,      // 0
      1000,   // 1: Star 1
      2000,   // 2: Star 2
      3000,   // 3: Heart
      5000,   // 4: Happy Bday
      6500,   // 5: Sayang Ellya
      8000,   // 6: Orbit
      9000,   // 7: Particles
      10500,  // 8: Expand
      11500,  // 9: Burst
      12000,  // 10: Confetti
      14000,  // 11: Final Message
      16000   // 12: Settle
    ];

    const timeouts = timings.map((time, idx) => 
      setTimeout(() => setStage(idx), time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 9) {
      // Large celebration burst
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#C86591', '#F3A6C7'],
        disableForReducedMotion: true
      });
    }

    if (stage === 10) {
      // Elegant continuous confetti
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      
      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6 overflow-hidden bg-brand-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* 1 & 2: Tiny Stars */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div 
            key="star1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            className="absolute top-[30%] left-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" 
          />
        )}
        {stage >= 2 && (
          <motion.div 
            key="star2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-brand-pink rounded-full shadow-[0_0_10px_#C86591]" 
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10">
        
        {/* 4 & 5: Text */}
        <div className="text-center absolute top-[-100px] md:top-[-150px] w-full">
          {stage >= 4 && (
            <div className="font-display text-2xl md:text-4xl text-brand-cream/80 italic mb-2">
              <TextReveal text="Happy Birthday..." type="blur" delay={0} />
            </div>
          )}
          {stage >= 5 && (
            <motion.h1 
              className="font-display text-4xl md:text-7xl lg:text-h1 text-white text-glow leading-tight"
            >
              <TextReveal text={birthdayConfig.nickname + " ❤️"} type="blur" delay={0} className="text-brand-pink" />
            </motion.h1>
          )}
        </div>

        {/* 3, 6, 8: Heart Forming, Orbiting, Expanding */}
        <AnimatePresence>
          {stage >= 3 && stage < 8 && (
            <motion.div
              key="heart-formation"
              initial={{ opacity: 0, filter: "blur(20px)", scale: 0.5 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-8xl md:text-9xl text-brand-pink relative z-20"
            >
              ❤️
              {stage >= 6 && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-brand-rose/30"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                >
                  <div className="w-2 h-2 bg-white rounded-full absolute -top-1 left-1/2 shadow-[0_0_10px_white]" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 11 & 12: Final Message */}
        <AnimatePresence>
          {stage >= 11 && (
            <motion.div
              key="final-message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="mt-40 text-center space-y-6 z-30"
            >
              <p className="font-sans text-brand-cream/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Thank you for being the most beautiful part of my days. Here is to celebrating you today, tomorrow, and always.
              </p>
              
              <div className="pt-8">
                <p className="font-serif italic text-brand-rose/80">With all my love,</p>
                <p className="font-display text-2xl text-brand-cream mt-2">{birthdayConfig.senderName}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 7 & 12: Particles / Settle (handled via CSS/Motion background) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: stage >= 7 
            ? "radial-gradient(circle at center, rgba(200,101,145,0.15) 0%, transparent 60%)" 
            : "none",
          opacity: stage >= 12 ? 0.7 : 1
        }}
        transition={{ duration: 3 }}
      />
    </motion.div>
  );
}
