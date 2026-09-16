"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

interface Props {
  onComplete: () => void;
}

export default function Scene06LoveLetter({ onComplete }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 overflow-hidden"
      initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    >
      {/* Intimate ambient lighting */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gentle camera pan effect on container */}
      <motion.div 
        className="absolute inset-0 z-[-1] hidden md:block"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-brand-pink/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-brand-rose/5 blur-[80px] rounded-full" />
      </motion.div>

      <div className="max-w-2xl w-full mx-auto glass-card rounded-3xl p-8 md:p-14 shadow-[0_0_50px_rgba(200,101,145,0.05)] border-brand-pink/20 relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />
        
        <div className="space-y-10 md:space-y-12 font-serif text-base md:text-xl lg:text-2xl text-brand-cream/90 leading-relaxed font-light tracking-wide">
          <p>
            <TextReveal text="I want you to know..." type="blur" delay={0.2} />
          </p>
          <h2 className="text-h3 md:text-h2 font-display text-brand-cream leading-tight mt-4 drop-shadow-md">
            <TextReveal text="How incredibly special you are to me." type="word" delay={1.5} />
          </h2>
          <p>
            <TextReveal text="I wanted to build something that felt as special as you make me feel. I'm not always perfect with words, so I wrote this with code instead." type="blur" delay={3} />
          </p>
          <p>
            <TextReveal text="Thank you for being exactly who you are. For the laughs, the late-night talks, the random arguments over food, and just... everything." type="blur" delay={5} />
          </p>
          <motion.p
            initial={{ textShadow: "0px 0px 0px rgba(255,255,255,0)" }}
            animate={{ textShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
            transition={{ delay: 7, duration: 3 }}
          >
            <TextReveal text="I hope this next year brings you so much joy." type="blur" delay={7} />
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.5, duration: 0.8 }}
          className="pt-12 md:mt-20 text-center"
        >
          <button
            onClick={onComplete}
            className="px-10 py-4 rounded-full bg-transparent border border-brand-pink/40 text-brand-cream font-sans tracking-widest text-sm hover:bg-brand-pink/20 hover:border-brand-pink transition-all interactive duration-300 shadow-[0_0_15px_rgba(200,101,145,0)] hover:shadow-[0_0_15px_rgba(200,101,145,0.3)]"
          >
            TURN THE PAGE
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
