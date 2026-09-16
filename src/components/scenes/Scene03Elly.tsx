"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";
import TextReveal from "@/components/ui/TextReveal";

interface Props {
  onComplete: () => void;
}

export default function Scene03Elly({ onComplete }: Props) {
  const [hearts, setHearts] = useState<{ id: number; top: number; left: number; y: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      y: -60 - Math.random() * 60,
      x: (Math.random() - 0.5) * 150,
      delay: 2 + Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(generated);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center cursor-pointer interactive overflow-hidden"
      onClick={onComplete}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Background Cinematic Movement */}
      <motion.div 
        className="absolute inset-0 z-[-1] opacity-50 bg-[radial-gradient(circle_at_center,rgba(243,166,199,0.1)_0%,transparent_60%)]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="space-y-12 md:space-y-16 w-full max-w-4xl relative z-10">
        <div className="text-sm md:text-xl font-sans text-brand-cream/80 tracking-widest uppercase">
          <TextReveal text="For the girl named" type="word" delay={0.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 2, type: "spring", bounce: 0.2 }}
          className="relative inline-block w-full"
        >
          {/* Subtle Light Rays behind name */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-white/5 blur-2xl rounded-full"
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 0.8] }}
            transition={{ delay: 2, duration: 4, repeat: Infinity }}
          />

          <h2 className="font-display text-h1 text-white z-10 relative px-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            {birthdayConfig.name}
          </h2>
          
          <svg className="absolute w-full h-8 -bottom-2 md:-bottom-4 left-0 z-0 opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none">
            <motion.path
              d="M10,10 Q100,25 190,5"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#C86591" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Floating tiny hearts around name */}
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-brand-pink text-xs pointer-events-none drop-shadow-[0_0_5px_rgba(200,101,145,0.8)]"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: h.y,
                x: h.x,
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                delay: h.delay,
                duration: h.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>

        <div className="text-xl md:text-3xl font-display text-brand-cream font-light italic px-4 drop-shadow-md">
          <TextReveal text="...who somehow makes ordinary days" type="blur" delay={4} />
          <br />
          <TextReveal text="feel less ordinary." type="blur" delay={5} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 7, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-sans tracking-widest animate-bounce w-full"
        >
          TAP ANYWHERE TO CONTINUE
        </motion.div>
      </div>
    </motion.div>
  );
}
