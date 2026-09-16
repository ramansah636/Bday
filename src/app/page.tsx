"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import AudioController from "@/components/AudioController";
import BackgroundEffect from "@/components/BackgroundEffect";
import AmbientEffects from "@/components/ui/AmbientEffects";

import Scene01Mystery from "@/components/scenes/Scene01Mystery";
import Scene02Reveal from "@/components/scenes/Scene02Reveal";
import Scene03Elly from "@/components/scenes/Scene03Elly";
import Scene04LoveLetter from "@/components/scenes/Scene04LoveLetter";
import Scene05Wishes from "@/components/scenes/Scene05Wishes";
import Scene06HiddenHeart from "@/components/scenes/Scene06HiddenHeart";
import Scene07Countdown from "@/components/scenes/Scene07Countdown";
import Scene08Finale from "@/components/scenes/Scene08Finale";

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate short loading to ensure fonts/assets are ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextScene = () => setCurrentScene((prev) => prev + 1);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-midnight">
        <div className="text-brand-pink animate-pulse text-sm font-sans tracking-widest uppercase">
          Preparing something special...
        </div>
      </div>
    );
  }

  const scenes = [
    <Scene01Mystery key="scene01" onComplete={() => { setAudioPlaying(true); nextScene(); }} />,
    <Scene02Reveal key="scene02" onComplete={nextScene} />,
    <Scene03Elly key="scene03" onComplete={nextScene} />,
    <Scene04LoveLetter key="scene04" onComplete={nextScene} />,
    <Scene05Wishes key="scene05" onComplete={nextScene} />,
    <Scene06HiddenHeart key="scene06" onComplete={nextScene} />,
    <Scene07Countdown key="scene07" onComplete={nextScene} />,
    <Scene08Finale key="scene08" />,
  ];

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <BackgroundEffect />
      <AmbientEffects />
      <CustomCursor />
      <AudioController play={audioPlaying} />

      <AnimatePresence mode="wait">
        {scenes[currentScene]}
      </AnimatePresence>
    </main>
  );
}
