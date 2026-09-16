"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientEffects() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate gentle background floating dust
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5 : 30;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 mix-blend-screen">
      {/* Deep nebula glow - Desktop Only */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-rose/5 rounded-full blur-[120px] hidden md:block"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-pink/5 rounded-full blur-[100px] hidden md:block"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Dust */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0%", "-100%"],
            x: ["0%", `${Math.sin(p.id) * 50}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
