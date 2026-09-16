"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Props {
  onComplete: () => void;
  onUnlockAudio?: () => void;
}

export default function Scene08HiddenHeart({ onComplete, onUnlockAudio }: Props) {
  const [found, setFound] = useState(false);
  const [hearts, setHearts] = useState<{ 
    id: number; 
    x: number; 
    y: number; 
    isSecret: boolean; 
    delay: number;
    opDuration: number;
    xDuration: number;
    yDuration: number;
  }[]>([]);

  useEffect(() => {
    // Generate hearts on client side to avoid hydration mismatch
    const generated = Array.from({ length: window.innerWidth < 768 ? 15 : 25 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      isSecret: i === 7, // The 7th heart is the secret one
      delay: Math.random() * 2,
      opDuration: 2 + Math.random() * 2,
      xDuration: 5 + Math.random() * 5,
      yDuration: 5 + Math.random() * 5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(generated);
  }, []);

  const handleFound = () => {
    setFound(true);
    if (onUnlockAudio) onUnlockAudio();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#C86591', '#F3A6C7', '#FFF3F7']
    });
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-10 md:top-20 text-center z-20 pointer-events-none w-full px-4">
        <h2 className="font-display text-2xl md:text-4xl text-brand-cream text-glow">
          There are many hearts here.
        </h2>
        <p className="text-brand-cream/60 font-sans mt-2 text-sm md:text-base">
          But only one is the right one.
        </p>
      </div>

      <AnimatePresence>
        {!found ? (
          <div className="absolute inset-0 w-full h-full">
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute interactive"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  cursor: h.isSecret ? "pointer" : "default",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: h.isSecret ? [1, 1.1, 1] : 1,
                  x: [0, Math.sin(h.id) * 30, 0],
                  y: [0, Math.cos(h.id) * 30, 0]
                }}
                transition={{
                  opacity: { duration: h.opDuration, repeat: Infinity },
                  scale: h.isSecret ? { duration: 1.5, repeat: Infinity } : {},
                  x: { duration: h.xDuration, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: h.yDuration, repeat: Infinity, ease: "easeInOut" },
                  delay: h.delay,
                }}
                onClick={() => h.isSecret && handleFound()}
                whileTap={h.isSecret ? { scale: 0.8 } : {}}
              >
                <div className={`text-2xl md:text-4xl transition-all duration-500 ${h.isSecret ? 'hover:scale-125' : ''}`}>
                  {h.isSecret ? (
                    <span className="relative">
                      ❤️
                      <span className="absolute inset-0 animate-ping opacity-20">❤️</span>
                    </span>
                  ) : (
                    <span className="opacity-40 blur-[1px]">🤍</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center space-y-8 z-30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl drop-shadow-[0_0_50px_rgba(243,166,199,0.8)]"
            >
              ❤️
            </motion.div>
            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl md:text-5xl text-brand-cream">
                You found it.
              </h2>
              <p className="font-sans text-brand-rose">Of course you did.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-8 px-10 py-4 rounded-full bg-brand-pink text-white font-sans tracking-widest text-sm interactive shadow-[0_0_20px_rgba(200,101,145,0.4)]"
            >
              CONTINUE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
