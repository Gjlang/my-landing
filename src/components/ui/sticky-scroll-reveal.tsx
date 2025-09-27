"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/* =========================
   StickyScroll - Cinematic Effect
   ========================= */
export function StickyScroll({
  content,
  contentClassName,
  heightVh = 200,
}: {
  content: { title: string; description: string; content?: React.ReactNode }[];
  contentClassName?: string;
  heightVh?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    mass: 0.3,
  });

  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(smooth, "change", (latest) => {
    const n = content.length;
    if (n === 0) return;

    const breakpoints = content.map((_, i) => (n === 1 ? 0 : i / (n - 1)));

    let idx = 0;
    let closest = Infinity;

    for (let i = 0; i < breakpoints.length; i++) {
      const diff = Math.abs(latest - breakpoints[i]);
      if (diff < closest) {
        closest = diff;
        idx = i;
      }
    }

    if (Math.abs(latest - breakpoints[activeCard]) > 0.07) {
      setActiveCard(idx);
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden "
      style={{
        height: `${heightVh}vh`,
      }}
    >
      {/* Centered Sticky Title */}
      <div className="sticky top-0 z-20 flex h-screen w-full items-center justify-center pointer-events-none">
        <div className="text-center">
          <motion.h1
            className="text-black font-black select-none leading-[0.9]
                       tracking-[-0.04em] text-[clamp(3rem,7vw,7rem)]"
          >
            INSIDE THE WORKLABS
          </motion.h1>

          {/* Subtitle Animation */}
          <div className="relative mt-6 h-24 overflow-hidden">
            {content.map((item, index) => (
              <motion.p
                key={index}
                className="absolute inset-0 flex items-center justify-center
                           text-gray-300 text-lg md:text-xl lg:text-2xl
                           font-medium max-w-3xl mx-auto px-6 text-center [text-wrap:balance]"
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  y: activeCard === index ? 0 : 30,
                  filter: activeCard === index ? "blur(0px)" : "blur(4px)",
                  scale: activeCard === index ? 1 : 0.98,
                }}
                transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {item.description}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Content Layer */}
      <div className="absolute inset-0 z-30">
        {content.map((item, index) => (
          <ParallaxImage
            key={index}
            index={index}
            total={content.length}
            scrollYProgress={smooth}
            content={item.content}
            contentClassName={contentClassName}
            isActive={activeCard === index}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   ParallaxImage
   ========================= */
function ParallaxImage({
  index,
  total,
  scrollYProgress,
  content,
  contentClassName,
  isActive,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  content?: React.ReactNode;
  contentClassName?: string;
  isActive?: boolean;
}) {
  const windowSlack = 1.2;
  const start = total <= 1 ? 0 : index / total;
  const end = total <= 1 ? 1 : Math.min(1, start + windowSlack / total);

  const y = useTransform(
    scrollYProgress,
    [start - 0.1, start + 0.1, start + 0.4, end - 0.4, end - 0.1, end + 0.1],
    [-180, 0, 0, 0, 0, 180]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0, 1, 1, 0]
  );

  const getImagePosition = (i: number): React.CSSProperties => {
    const positions = [
      { left: "22%", top: "20%" },
      { right: "22%", top: "25%" },
      { left: "20%", bottom: "25%" },
      { right: "25%", bottom: "18%" },
      { left: "28%", top: "15%" },
      { right: "30%", top: "35%" },
    ];
    return positions[i % positions.length];
  };

  return (
    <motion.div
      style={{
        y,
        opacity,
        ...getImagePosition(index),
        willChange: "transform, opacity",
      }}
      className="absolute w-[50vw] h-[35vw] max-w-[640px] max-h-[420px]"
    >
      <motion.div
        className={cn(
          "w-full h-full rounded-3xl overflow-hidden relative shadow-2xl ring-1 ring-white/10 backdrop-blur-xl",
          contentClassName
        )}
        style={{
          background: "linear-gradient(135deg, #111111, #1e1e1e)",
        }}
      >
        {/* Content or fallback text */}
        {content ?? (
          <div className="relative flex flex-col h-full w-full items-center justify-center p-6">
            <div className="relative z-10 text-white text-center">
              <div className="text-3xl font-bold mb-2">
                Workspace {index + 1}
              </div>
              <div className="text-lg opacity-75">Behind the scenes</div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
