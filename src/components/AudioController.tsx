"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";

interface AudioControllerProps {
  play: boolean;
  finalAudioTrigger?: boolean;
}

export default function AudioController({ play, finalAudioTrigger }: AudioControllerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!birthdayConfig.music.enabled) return;

    if (!audioRef.current) {
      const audio = new Audio(birthdayConfig.music.src);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    if (play && !isMuted) {
      if (finalAudioTrigger && audioRef.current.src !== birthdayConfig.music.finaleSrc) {
        audioRef.current.pause();
        audioRef.current.src = birthdayConfig.music.finaleSrc;
      }
      
      if (audioRef.current.paused) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          let vol = 0;
          const targetVol = finalAudioTrigger ? 0.5 : 0.5; // MEDIUM level
          const fadeInterval = setInterval(() => {
            if (vol < targetVol) {
              vol += 0.05;
              if (audioRef.current) audioRef.current.volume = Math.min(vol, targetVol);
            } else {
              clearInterval(fadeInterval);
            }
          }, 200);
        }).catch((err) => {
          console.log("Audio auto-play prevented by browser.", err);
        });
      }
    } else if (!play || isMuted) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [play, isMuted, finalAudioTrigger]);

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
