"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  type?: "word" | "character" | "line" | "blur";
  delay?: number;
  className?: string;
  staggerDelay?: number;
}

export default function TextReveal({ text, type = "blur", delay = 0, className = "", staggerDelay = 0.1 }: Props) {
  if (type === "blur") {
    return (
      <motion.span
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    );
  }

  if (type === "word") {
    const words = text.split(" ");
    return (
      <span className={`inline-block ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * staggerDelay, ease: "easeOut" }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }
  
  if (type === "character") {
    return (
      <span className={`inline-block ${className}`}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + i * (staggerDelay / 2), ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  }

  // Default to simple fade in
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}
