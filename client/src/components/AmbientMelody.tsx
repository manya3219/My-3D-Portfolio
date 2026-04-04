import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

type MelodyNote = {
  frequency: number;
  harmony: number;
  duration: number;
};

const melody: MelodyNote[] = [
  { frequency: 392.0, harmony: 493.88, duration: 1.25 },
  { frequency: 440.0, harmony: 523.25, duration: 1.15 },
  { frequency: 523.25, harmony: 659.25, duration: 1.7 },
  { frequency: 659.25, harmony: 783.99, duration: 1.35 },
  { frequency: 587.33, harmony: 698.46, duration: 1.15 },
  { frequency: 523.25, harmony: 659.25, duration: 1.65 },
  { frequency: 440.0, harmony: 523.25, duration: 1.25 },
  { frequency: 349.23, harmony: 440.0, duration: 1.7 },
];

export default function AmbientMelody() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const playNextNote = () => {
    const context = audioContextRef.current;
    if (!context || context.state !== "running" || !isPlaying) {
      return;
    }

    const currentNote = melody[noteIndexRef.current];
    const now = context.currentTime;
    const master = context.createGain();
    const lead = context.createOscillator();
    const harmony = context.createOscillator();
    const shimmer = context.createOscillator();
    const pad = context.createOscillator();
    const filter = context.createBiquadFilter();

    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.09, now + 0.14);
    master.gain.exponentialRampToValueAtTime(0.0001, now + currentNote.duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1650, now);

    lead.type = "triangle";
    lead.frequency.setValueAtTime(currentNote.frequency, now);

    harmony.type = "sine";
    harmony.frequency.setValueAtTime(currentNote.harmony, now);

    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(currentNote.frequency * 2, now);

    pad.type = "sine";
    pad.frequency.setValueAtTime(currentNote.frequency / 2, now);

    lead.connect(filter);
    harmony.connect(filter);
    shimmer.connect(filter);
    pad.connect(filter);
    filter.connect(master);
    master.connect(context.destination);

    lead.start(now);
    harmony.start(now);
    shimmer.start(now);
    pad.start(now);

    lead.stop(now + currentNote.duration);
    harmony.stop(now + currentNote.duration);
    shimmer.stop(now + currentNote.duration);
    pad.stop(now + currentNote.duration);

    noteIndexRef.current = (noteIndexRef.current + 1) % melody.length;
    timeoutRef.current = window.setTimeout(playNextNote, currentNote.duration * 1000 + 120);
  };

  const getOrCreateContext = () => {
    if (audioContextRef.current) {
      return audioContextRef.current;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) {
      setSupported(false);
      return null;
    }

    const context = new AudioContextCtor();
    audioContextRef.current = context;
    return context;
  };

  const startPlayback = async () => {
    const context = getOrCreateContext();
    if (!context) {
      return;
    }

    clearTimer();

    if (context.state !== "running") {
      await context.resume();
    }

    noteIndexRef.current = 0;
    setIsPlaying(true);
  };

  const stopPlayback = async () => {
    clearTimer();

    const context = audioContextRef.current;
    if (context && context.state === "running") {
      await context.suspend();
    }

    setIsPlaying(false);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await stopPlayback();
      return;
    }

    await startPlayback();
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    playNextNote();
    return clearTimer;
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => {
        void togglePlayback();
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
    >
      {isPlaying ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
      <span className="font-rajdhani text-sm tracking-wide">
        {!supported ? "Audio Unsupported" : isPlaying ? "Music On" : "Play Music"}
      </span>
    </motion.button>
  );
}
