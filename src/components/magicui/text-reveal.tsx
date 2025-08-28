"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, FC, useRef } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  heightVh?: number;     // runway height (default 120)
  stickyHeight?: string; // sticky box height (default 100vh)
}

// MultiLineReveal props for the new component
type MultiLineRevealProps = {
  lines: string[];               // pass 3 lines here
  className?: string;
  heightVh?: number;             // runway height (default 120)
  stickyHeight?: string;         // sticky box height (default 60vh)
};

export const MultiLineReveal: FC<MultiLineRevealProps> = ({
  lines,
  className,
  heightVh = 120,
  stickyHeight = "60vh",
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Dark vignette that breathes in/out slightly
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.9]);

  return (
    <div ref={targetRef} className={cn(`relative h-[${heightVh}vh]`, className)}>
      {/* Solid black with subtle vignette */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.0)_60%)]" />
      </motion.div>

      <div className="sticky top-0 flex items-center justify-center px-6" style={{ height: stickyHeight }}>
        <div className="mx-auto max-w-6xl text-center text-white">
          {lines.map((line, i) => {
            const start = i / lines.length;
            const end = (i + 1) / lines.length;
            
            return (
              <LineReveal
                key={i}
                line={line}
                lineIndex={i}
                progress={scrollYProgress}
                start={start}
                end={end}
                totalLines={lines.length}
              />
            );
          })}
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
      </motion.div>
    </div>
  );
};

export const TextReveal: FC<TextRevealProps> = ({ 
  children, 
  className, 
  heightVh = 120,
  stickyHeight = "100vh"
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  // Split into lines (you can also split by periods, newlines, etc.)
  const lines = children.split(/[.!?]+/).filter(line => line.trim()).map(line => line.trim());

  // Dark vignette that breathes in/out slightly
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.9]);

  return (
    <div ref={targetRef} className={cn(`relative h-[${heightVh}vh]`, className)}>
      {/* Solid black with subtle vignette */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.0)_60%)]" />
      </motion.div>

      <div className="sticky top-0 flex items-center justify-center px-6" style={{ height: stickyHeight }}>
        <div className="mx-auto max-w-6xl text-center text-white">
          {lines.map((line, i) => {
            const start = i / lines.length;
            const end = (i + 1) / lines.length;
            
            return (
              <LineReveal
                key={i}
                line={line}
                lineIndex={i}
                progress={scrollYProgress}
                start={start}
                end={end}
                totalLines={lines.length}
              />
            );
          })}
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
      </motion.div>
    </div>
  );
};

interface LineRevealProps {
  line: string;
  lineIndex: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  totalLines: number;
}

const LineReveal: FC<LineRevealProps> = ({ line, lineIndex, progress, start, end, totalLines }) => {
  const lineOpacity = useTransform(progress, [start, end], [0, 1]);
  
  return (
    <motion.p
      className={cn(
        lineIndex > 0 ? "mt-2 md:mt-3" : "",
        "font-semibold tracking-tight leading-tight",
        "text-2xl md:text-4xl lg:text-5xl xl:text-6xl",
        "drop-shadow-[0_1px_12px_rgba(255,255,255,0.06)]"
      )}
      style={{ 
        opacity: lineOpacity,
        WebkitTextStroke: "0.3px rgba(255,255,255,0.15)" 
      }}
    >
      {line.split(/\s+/).map((word, wi) => {
        const words = line.split(/\s+/);
        const wordStart = start + (wi / Math.max(1, words.length)) * (1 / totalLines);
        const wordEnd = wordStart + (1 / Math.max(1, words.length)) * (1 / totalLines);
        
        return (
          <Word 
            key={wi} 
            progress={progress} 
            range={[wordStart, wordEnd]}
          >
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  // Stronger reveal & motion
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [18, 0]);
  const scale = useTransform(progress, range, [0.98, 1]);
  const blur = useTransform(progress, range, [6, 0]);

  return (
    <span className="relative inline-block mr-3 md:mr-4 lg:mr-5">
      {/* Soft ghost behind for extra separation */}
      <span className="absolute inset-0 translate-y-[2px] text-white/10 select-none pointer-events-none">
        {children}
      </span>

      {/* Main animated text */}
      <motion.span
        className="relative inline-block select-none"
        style={{
          opacity,
          y,
          scale,
          filter: useTransform(blur, (v: number) => `blur(${v}px)`),
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};