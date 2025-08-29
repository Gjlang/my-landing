"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, FC, useRef } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Consistent easing function
const smoothEasing = [0.22, 1, 0.36, 1] as const;

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  heightVh?: number;     // runway height (default 100)
  stickyHeight?: string; // sticky box height (default 60vh)
}

type MultiLineRevealProps = {
  lines: string[];               // pass 3 lines here
  className?: string;
  heightVh?: number;             // runway height (default 100)
  stickyHeight?: string;         // sticky box height (default 55vh)
};

export const MultiLineReveal: FC<MultiLineRevealProps> = ({
  lines,
  className,
  heightVh = 100,
  stickyHeight = "60vh",
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={targetRef} className={cn(`relative h-[${heightVh}vh]`, className)}>
      {/* Transparent backdrop - removed vignette */}
      <div className="fixed inset-0 pointer-events-none bg-transparent" />

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
                delay={i * 80} // Staggered by 80ms
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const TextReveal: FC<TextRevealProps> = ({ 
  children, 
  className, 
  heightVh = 100,
  stickyHeight = "60vh"
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

  return (
    <div ref={targetRef} className={cn(`relative h-[${heightVh}vh]`, className)}>
      {/* Transparent backdrop - removed vignette */}
      <div className="fixed inset-0 pointer-events-none bg-transparent" />

      <div className="sticky top-0 flex items-center justify-center px-6" style={{ height: stickyHeight }}>
        <div className="mx-auto max-w-6xl text-center text-neutral-900">
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
                delay={i * 80} // Staggered by 80ms
              />
            );
          })}
        </div>
      </div>
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
  delay?: number;
}

const LineReveal: FC<LineRevealProps> = ({ 
  line, 
  lineIndex, 
  progress, 
  start, 
  end, 
  totalLines, 
  delay = 0 
}) => {
  const lineOpacity = useTransform(progress, [start, end], [0, 1]);
  
  return (
    <motion.p
      className={cn(
        lineIndex > 0 ? "mt-2 md:mt-3" : "",
        "font-semibold tracking-tight leading-tight",
        "text-2xl md:text-4xl lg:text-5xl xl:text-6xl",
        "drop-shadow-[0_1px_12px_rgba(0,0,0,0.06)]",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      )}
      style={{ 
        opacity: lineOpacity,
        WebkitTextStroke: "0.3px rgba(0,0,0,0.15)" 
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: smoothEasing,
        delay: delay / 1000
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
            delay={delay + (wi * 60)} 
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
  delay?: number;
}

const Word: FC<WordProps> = ({ children, progress, range, delay = 0 }) => {
  // Toned down motion - reduced values as specified
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [12, 0]); // Reduced from 18
  const scale = useTransform(progress, range, [0.995, 1]); // Reduced from 0.98
  const blur = useTransform(progress, range, [4, 0]); // Reduced from 6

  return (
    <span className="relative inline-block mr-3 md:mr-4 lg:mr-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
      {/* Soft ghost behind for extra separation */}
      <span className="absolute inset-0 translate-y-[2px] text-white select-none pointer-events-none">
        {children}
      </span>

      {/* Main animated text with consistent easing */}
      <motion.span
        className="relative inline-block select-none"
        style={{
          opacity,
          y,
          scale,
          filter: useTransform(blur, (v: number) => `blur(${v}px)`),
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: smoothEasing,
          delay: delay / 1000
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
