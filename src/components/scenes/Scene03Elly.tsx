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
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center cursor-pointer interactive"
      onClick={onComplete}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      <div className="space-y-12 md:space-y-16 w-full max-w-4xl">
        <div className="text-sm md:text-xl font-sans text-brand-cream/80 tracking-widest uppercase">
          <TextReveal text="For the girl named" type="word" delay={0.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
          className="relative inline-block w-full"
        >
          <h2 className="font-display text-h1 text-white text-glow z-10 relative px-4">
            {birthdayConfig.name}
          </h2>
          
          <svg className="absolute w-full h-8 -bottom-2 md:-bottom-4 left-0 z-0 opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none">
            <motion.path
              d="M10,10 Q100,25 190,5"
              fill="none"
              stroke="var(--color-brand-pink)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Floating tiny hearts around name */}
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-brand-pink text-xs pointer-events-none"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: h.y,
                x: h.x,
                scale: [0.5, 1, 0.5]
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

        <div className="text-xl md:text-3xl font-display text-brand-cream font-light italic px-4">
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
