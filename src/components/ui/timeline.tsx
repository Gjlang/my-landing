"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  right?: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="w-full bg-black text-white font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-10 py-16">
        <p className="font-black uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.8rem,8vw,9rem)]">
          <span className="block">YOUR BIGGEST</span>
          <span className="block">CHALLENGES DON&apos;T</span>
          <span className="block">SCARE US</span>
        </p>
        <p className="mt-8 text-neutral-300 text-lg md:text-2xl max-w-3xl">
          Big or small, 5 employees or 5,000, most organizations face the same
          challenges at different scales:
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-10">
        {data.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            total={data.length}
          />
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[1.25rem] md:left-[2.5rem] top-0 overflow-visible w-[2px]
          bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
          from-transparent via-neutral-200 to-transparent"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full
            bg-gradient-to-b from-white via-white to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({
  item,
  index,
  total,
}: {
  item: TimelineEntry;
  index: number;
  total: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "start start"],
  });

  // Smooth scale from behind
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1]);

  // Gentle opacity fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0.7]
  );

  // Subtle y movement
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, 0]);

  // Very subtle blur for depth
  const blur = useTransform(scrollYProgress, [0, 0.3, 1], [3, 0, 0]);

  // Visual elements
  const visualOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  const visualScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.9, 1, 1]);

  const visualY = useTransform(scrollYProgress, [0, 0.4, 1], [40, 0, 0]);

  return (
    <motion.div
      ref={itemRef}
      style={{
        scale,
        opacity,
        y,
        filter: `blur(${blur}px)`,
      }}
      className="relative flex justify-start pt-10 md:pt-20 gap-8 md:gap-12 min-h-[90vh]"
    >
      {/* Timeline dot */}
      <div className="flex-shrink-0 relative">
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
          <motion.div
            style={{ opacity: visualOpacity, scale: visualScale }}
            className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-400"
          />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0">
        <div
          className={`${
            item.right ? "md:grid md:grid-cols-2 md:gap-12 md:items-center" : ""
          }`}
        >
          {/* Text content */}
          <motion.div
            style={{
              opacity: visualOpacity,
              y: visualY,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {item.content}
          </motion.div>

          {/* Right content (Visual) */}
          {item.right && (
            <motion.div
              style={{
                opacity: visualOpacity,
                scale: visualScale,
                y: visualY,
              }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
              className="mt-8 md:mt-0 flex items-center justify-center"
            >
              {item.right}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Demo component
export default function TimelineDemo() {
  const data = [
    {
      title: "Challenge 1",
      content: (
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Digital Transformation
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Moving from legacy systems to modern cloud infrastructure while
            maintaining business continuity and data integrity.
          </p>
        </div>
      ),
      right: (
        <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center text-6xl backdrop-blur-sm">
          🚀
        </div>
      ),
    },
    {
      title: "Challenge 2",
      content: (
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Team Scaling
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Building and managing distributed teams across multiple time zones
            while maintaining culture and productivity.
          </p>
        </div>
      ),
      right: (
        <div className="w-full h-64 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl flex items-center justify-center text-6xl backdrop-blur-sm">
          👥
        </div>
      ),
    },
    {
      title: "Challenge 3",
      content: (
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Data Security
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Protecting sensitive information while enabling seamless access for
            authorized users across platforms.
          </p>
        </div>
      ),
      right: (
        <div className="w-full h-64 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center text-6xl backdrop-blur-sm">
          🔒
        </div>
      ),
    },
    {
      title: "Challenge 4",
      content: (
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Innovation Speed
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Accelerating product development cycles without compromising quality
            or increasing technical debt.
          </p>
        </div>
      ),
      right: (
        <div className="w-full h-64 bg-gradient-to-br from-yellow-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center text-6xl backdrop-blur-sm">
          ⚡
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}
