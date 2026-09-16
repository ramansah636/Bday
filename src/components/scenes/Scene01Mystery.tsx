"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

interface Props {
  onComplete: () => void;
}

export default function Scene01Mystery({ onComplete }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h1 className="font-display text-3xl md:text-5xl text-brand-cream font-light tracking-wide leading-relaxed">
          <TextReveal text="Hey, Sayang Ellya..." type="blur" delay={1} />
          <br />
          <TextReveal text="I made something for you." type="blur" delay={3} className="text-brand-rose" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1.5 }}
          className="text-sm font-sans text-brand-cream/60 mt-8"
        >
          But you have to open it yourself. ❤️
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7, duration: 1.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(243, 166, 199, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="mt-16 group relative px-8 py-4 rounded-full glass-card border-brand-pink/30 text-brand-cream font-sans tracking-widest text-sm uppercase flex items-center gap-3 overflow-hidden interactive"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-rose/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Sparkles size={16} className="text-brand-rose group-hover:animate-pulse" />
        <span className="relative z-10">Open Your Surprise</span>
      </motion.button>
    </motion.div>
  );
}
