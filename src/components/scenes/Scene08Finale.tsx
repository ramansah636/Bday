"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";
import confetti from "canvas-confetti";
import TextReveal from "@/components/ui/TextReveal";
import BirthdayCake from "@/components/ui/BirthdayCake";

export default function Scene08Finale() {
  const [stage, setStage] = useState<"intro" | "cake" | "celebration" | "final">("intro");
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{ id: number; size: number; left: number; top: number; dur: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate stars client-side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 3 + Math.random() * 5,
      delay: Math.random() * 5
    })));

    // Intro sequence builds up the atmosphere
    const timer = setTimeout(() => {
      setStage("cake");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWishMade = () => {
    setStage("celebration");
    
    const isMobile = window.innerWidth < 768;
    // Celebration particles
    confetti({
      particleCount: isMobile ? 60 : 200,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#C86591', '#F3A6C7'],
      disableForReducedMotion: true
    });

    // Start final message sequence
    setTimeout(() => {
      setStage("final");
    }, 2500);
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-brand-midnight z-[-2]" />
      <motion.div 
        className="absolute inset-0 z-[-1] opacity-50 bg-[radial-gradient(circle_at_center,rgba(243,166,199,0.1)_0%,transparent_60%)]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full shadow-[0_0_10px_white] z-0"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}

      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10 h-full">
        
        {/* Cake Section */}
        <div className="absolute top-[35%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full">
          <AnimatePresence>
            {(stage === "cake" || stage === "celebration" || stage === "final") && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="transform scale-[0.65] md:scale-100 mt-20 md:mt-0 flex flex-col items-center"
              >
                <BirthdayCake onWishMade={handleWishMade} />
                <AnimatePresence>
                  {stage === "cake" && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="mt-8 font-sans text-brand-cream/80 text-sm md:text-base animate-pulse"
                    >
                      Touch the cake 🎂
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Text Reveal */}
        <div className="absolute top-[10%] md:top-[15%] w-full text-center z-30">
          <AnimatePresence>
            {(stage === "celebration" || stage === "final") && (
              <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 2 }}
                className="space-y-4"
              >
                <h3 className="font-serif italic text-xl md:text-3xl text-brand-cream/80">
                  <TextReveal text="Happy Birthday," type="blur" delay={0.5} />
                </h3>
                <h2 className="text-h2 md:text-h1 font-display text-brand-pink text-glow break-words">
                  <TextReveal text={birthdayConfig.nickname + " ❤️"} type="word" delay={2} />
                </h2>
                <h1 className="text-h3 md:text-h2 font-display text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] break-words">
                  <TextReveal text={birthdayConfig.name} type="blur" delay={4} />
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Sign-off */}
        <div className="absolute bottom-[5%] md:bottom-[10%] w-full text-center z-30">
          <AnimatePresence>
            {stage === "final" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1 }}
                className="space-y-6 bg-brand-midnight/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 inline-block mx-4"
              >
                <p className="font-sans text-brand-cream/90 text-sm md:text-lg">
                  Made specially for you. ❤️
                </p>
                <p className="font-sans text-brand-cream/70 text-xs md:text-sm">
                  Now go to sleep... 😴❤️
                </p>
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3, type: "spring" }}
                  className="font-serif text-brand-rose italic text-sm md:text-base"
                >
                  ...and please don&apos;t forget the chicken 🍗
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
