"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Props {
  onWishMade: () => void;
}

export default function BirthdayCake({ onWishMade }: Props) {
  const [stage, setStage] = useState<"entering" | "idle" | "wished" | "blowing" | "celebrating">("entering");
  const [flameParams, setFlameParams] = useState<{ blowDur: number; idleDur: number }[]>([]);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlameParams([1, 2, 3].map(() => ({
      blowDur: 0.5 + Math.random() * 0.5,
      idleDur: 0.2 + Math.random() * 0.3
    })));

    // Entrance sequence
    const timer = setTimeout(() => setStage("idle"), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCakeTap = () => {
    if (stage === "idle") {
      setStage("wished");
    }
  };

  const handleBlowOut = () => {
    setStage("blowing");
    
    // Simulate blowing out duration
    setTimeout(() => {
      setStage("celebrating");
      
      // Fire celebration confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C86591', '#F3A6C7', '#FFF3F7']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C86591', '#F3A6C7', '#FFF3F7']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Notify parent
      setTimeout(() => onWishMade(), 2000);
    }, 2000);
  };

  const isBlowing = stage === "blowing";
  const isDark = isBlowing;
  const isCelebrating = stage === "celebrating";

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm mx-auto h-[400px]">
      
      {/* Background Darkening Effect for Blow Out */}
      <AnimatePresence>
        {isDark && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-[calc(-100vw)] bg-black z-[-1] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="relative cursor-pointer interactive"
        onClick={handleCakeTap}
        initial={{ y: 150, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 2.5, type: "spring", bounce: 0.3 }}
        whileTap={{ scale: stage === "idle" ? 0.95 : 1 }}
      >
        {/* Glow behind cake */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-pink/20 rounded-full blur-[50px] -z-10"
          animate={{ scale: isBlowing ? 0 : [1, 1.2, 1], opacity: isBlowing ? 0 : [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* SVG CAKE */}
        <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-2xl z-10 relative overflow-visible">
          {/* Base shadow */}
          <ellipse cx="100" cy="230" rx="90" ry="15" fill="rgba(0,0,0,0.15)" />
          
          {/* Plate */}
          <motion.path 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            d="M 10 220 Q 100 250 190 220 L 170 235 Q 100 260 30 235 Z" 
            fill="#e2e8f0" 
          />
          
          {/* Bottom Tier */}
          <motion.path 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            d="M 20 215 L 20 160 Q 100 180 180 160 L 180 215 Q 100 240 20 215" 
            fill="#F3A6C7" 
          />
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            d="M 20 160 Q 100 135 180 160 Q 100 180 20 160" 
            fill="#C86591" 
          />

          {/* Top Tier */}
          <motion.path 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            d="M 40 165 L 40 110 Q 100 125 160 110 L 160 165 Q 100 185 40 165" 
            fill="#FFF3F7" 
          />
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            d="M 40 110 Q 100 95 160 110 Q 100 125 40 110" 
            fill="#FCE7F3" 
          />

          {/* Frosting Drips */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
            d="M 20 160 Q 30 180 40 160 Q 55 190 70 165 Q 85 175 100 160 Q 115 185 130 165 Q 145 175 160 160 Q 170 180 180 160"
            fill="none" stroke="#FFF3F7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            d="M 40 110 Q 55 130 70 112 Q 85 140 100 115 Q 115 125 130 112 Q 145 135 160 110"
            fill="none" stroke="#F3A6C7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Candles */}
          {[1, 2, 3].map((candle, i) => (
            <motion.g 
              key={candle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 + (i * 0.2), duration: 0.5 }}
            >
              {/* Stick */}
              <rect x={70 + (i * 25)} y={75 + (i === 1 ? -10 : 0)} width="6" height="35" rx="3" fill="#ffffff" />
              {/* Flame */}
              {!isCelebrating && flameParams.length > 0 && (
                <motion.path
                  d={`M ${73 + (i * 25)} ${73 + (i === 1 ? -10 : 0)} Q ${70 + (i * 25)} ${60 + (i === 1 ? -10 : 0)} ${73 + (i * 25)} ${55 + (i === 1 ? -10 : 0)} Q ${76 + (i * 25)} ${60 + (i === 1 ? -10 : 0)} ${73 + (i * 25)} ${73 + (i === 1 ? -10 : 0)}`}
                  fill="#FFD700"
                  animate={isBlowing ? {
                    scale: [1, 0.5, 0],
                    x: [0, 10, 20],
                    opacity: [1, 0, 0]
                  } : {
                    scale: [1, 1.1, 1],
                    skewX: [0, 5, -5, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={isBlowing ? {
                    duration: flameParams[i].blowDur,
                    delay: i * 0.2
                  } : {
                    duration: flameParams[i].idleDur,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  style={{ transformOrigin: "bottom center" }}
                />
              )}
              {/* Flame Glow */}
              {!isBlowing && !isCelebrating && (
                <motion.circle
                  cx={73 + (i * 25)}
                  cy={60 + (i === 1 ? -10 : 0)}
                  r="15"
                  fill="rgba(255, 215, 0, 0.2)"
                  className="blur-[5px]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "wished" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-10 text-center w-full whitespace-nowrap"
          >
            <p className="font-serif text-brand-cream text-lg italic mb-4">Make a wish, Sayang Ellya ❤️</p>
            <button
              onClick={handleBlowOut}
              className="px-8 py-3 rounded-full bg-brand-rose text-white font-sans text-sm tracking-widest shadow-[0_0_20px_rgba(200,101,145,0.6)] hover:scale-105 transition-transform"
            >
              BLOW OUT CANDLES ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
