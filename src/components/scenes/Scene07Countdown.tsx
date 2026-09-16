"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

export default function Scene11Countdown({ onComplete }: Props) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-brand-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-9xl md:text-[15rem] font-display text-brand-pink text-glow"
        >
          {count > 0 ? count : ""}
        </motion.div>
        
        {count === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center absolute"
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white] animate-ping mx-auto" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
