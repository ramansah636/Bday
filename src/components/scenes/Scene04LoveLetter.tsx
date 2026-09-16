"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

interface Props {
  onComplete: () => void;
}

export default function Scene06LoveLetter({ onComplete }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 overflow-y-auto no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 2 }}
    >
      <div className="max-w-2xl w-full mx-auto glass-card rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(200,101,145,0.05)] border-brand-pink/20 relative overflow-hidden my-auto">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
        
        <div className="space-y-6 md:space-y-8 font-serif text-base md:text-lg lg:text-xl text-brand-cream/90 leading-relaxed font-light">
          <p>
            <TextReveal text="Sayang Ellya," type="blur" delay={1} />
          </p>
          <p>
            <TextReveal text="There's something I wanted to tell you..." type="word" delay={2.5} />
          </p>
          <p>
            <TextReveal text="I wanted to build something that felt as special as you make me feel. I'm not always perfect with words, so I wrote this with code instead." type="blur" delay={4.5} />
          </p>
          <p>
            <TextReveal text="Thank you for being exactly who you are. For the laughs, the late-night talks, the random arguments over food, and just... everything." type="blur" delay={7} />
          </p>
          <p>
            <TextReveal text="I hope this next year brings you so much joy." type="blur" delay={9.5} />
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 12, duration: 2 }}
          className="mt-12 md:mt-16 text-center"
        >
          <button
            onClick={onComplete}
            className="px-10 py-4 rounded-full bg-transparent border-2 border-brand-pink/50 text-brand-cream font-sans tracking-widest text-sm hover:bg-brand-pink/10 transition-colors interactive"
          >
            TURN THE PAGE
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
