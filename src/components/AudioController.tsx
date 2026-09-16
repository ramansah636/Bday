"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";

interface AudioControllerProps {
  play: boolean;
}

let globalAudio: HTMLAudioElement | null = null;

export const initAudio = () => {
  if (typeof window === "undefined") return;
  if (!globalAudio) {
    globalAudio = new Audio(birthdayConfig.music.src);
    globalAudio.loop = true;
    globalAudio.volume = 0.5;
  }
  globalAudio.play().then(() => {
    globalAudio?.pause();
  }).catch(e => console.log("Audio unlock failed/pending", e));
};

export default function AudioController({ play }: AudioControllerProps) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!birthdayConfig.music.enabled) return;

    if (!globalAudio) {
      globalAudio = new Audio(birthdayConfig.music.src);
      globalAudio.loop = true;
      globalAudio.volume = 0.5;
    }

    if (play && !isMuted) {
      if (globalAudio.paused) {
        globalAudio.volume = 0;
        globalAudio.play().then(() => {
          let vol = 0;
          const targetVol = 0.5; // MEDIUM level
          const fadeInterval = setInterval(() => {
            if (vol < targetVol) {
              vol += 0.05;
              if (globalAudio) globalAudio.volume = Math.min(vol, targetVol);
            } else {
              clearInterval(fadeInterval);
            }
          }, 200);
        }).catch((err) => {
          console.log("Audio auto-play prevented by browser.", err);
        });
      }
    } else if (!play || isMuted) {
      if (globalAudio) globalAudio.pause();
    }

    // Do NOT pause on unmount because this is a global SPA player
  }, [play, isMuted]);

  if (!birthdayConfig.music.enabled) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer interactive"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </motion.button>
  );
}
