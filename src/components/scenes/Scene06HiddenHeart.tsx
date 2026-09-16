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
    blurAmount: number;
  }[]>([]);

  useEffect(() => {
    // Generate hearts on client side to avoid hydration mismatch
    const generated = Array.from({ length: window.innerWidth < 768 ? 25 : 50 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      isSecret: i === 7, // The 7th heart is the secret one
      delay: Math.random() * 3,
      opDuration: 2 + Math.random() * 3,
      xDuration: 5 + Math.random() * 8,
      yDuration: 5 + Math.random() * 8,
      blurAmount: Math.random() * 3 + 2,
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
      transition={{ duration: 0.5 }}
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
                  zIndex: h.isSecret ? 30 : 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: h.isSecret ? [0.8, 1, 0.8] : [0.1, 0.5, 0.1],
                  scale: h.isSecret ? [1, 1.15, 1] : 1,
                  x: [0, Math.sin(h.id) * 30, 0],
                  y: [0, Math.cos(h.id) * 30, 0],
                  filter: h.isSecret ? "blur(0px)" : `blur(${h.blurAmount}px)`
                }}
                transition={{
                  opacity: { duration: h.opDuration, repeat: Infinity, ease: "easeInOut" },
                  scale: h.isSecret ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {},
                  x: { duration: h.xDuration, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: h.yDuration, repeat: Infinity, ease: "easeInOut" },
                  delay: h.delay,
                }}
                onClick={() => h.isSecret && handleFound()}
                whileTap={h.isSecret ? { scale: 0.8 } : {}}
              >
                <div className={`transition-all duration-500 relative ${h.isSecret ? 'text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]' : 'text-xl md:text-3xl'}`}>
                  {h.isSecret ? (
                    <>
                      <span className="relative z-10">❤️</span>
                      <span className="absolute inset-0 animate-ping opacity-30 z-0">❤️</span>
                      {/* Halo particle glow */}
                      <div className="absolute inset-[-20px] bg-brand-pink/20 rounded-full blur-md -z-10" />
                    </>
                  ) : (
                    <span className="opacity-40">🤍</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center space-y-8 z-30 relative"
          >
            {/* Shockwave Ripple */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[4px] border-brand-rose rounded-full z-0"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: "300vw", height: "300vw", opacity: 0, borderWidth: "0px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl md:text-[10rem] drop-shadow-[0_0_50px_rgba(243,166,199,0.8)] relative z-10"
            >
              ❤️
            </motion.div>
            <div className="text-center space-y-4 relative z-10">
              <h2 className="font-display text-3xl md:text-5xl text-brand-cream">
                You found it.
              </h2>
              <p className="font-sans text-brand-rose">Of course you did.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(200,101,145,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-8 px-10 py-4 rounded-full bg-brand-pink text-white font-sans tracking-widest text-sm interactive shadow-[0_0_10px_rgba(200,101,145,0.4)] relative z-10 transition-shadow"
            >
              CONTINUE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
