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

    const breakpoints = content.map((_, i) =>
      n === 1 ? 0 : i / (n - 1)
    );

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

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex space-x-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          {content.map((_, index) => (
            <motion.div
              key={index}
              className="w-2.5 h-2.5 rounded-full"
              animate={{
                backgroundColor:
                  activeCard === index ? "#ffffff" : "rgba(255,255,255,0.3)",
                scale: activeCard === index ? 1.6 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            />
          ))}
        </div>
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

// "use client";

// import React, { useRef, useState } from "react";
// import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";
// import type { MotionValue } from "motion/react";
// import { cn } from "@/lib/utils";

// /* =========================
//    StickyScroll - Cinematic Effect
//    ========================= */
// export function StickyScroll({
//   content,
//   contentClassName,
//   heightVh = 280, // optimal scroll runway
// }: {
//   content: { title: string; description: string; content?: React.ReactNode }[];
//   contentClassName?: string;
//   heightVh?: number;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });
//   const [activeCard, setActiveCard] = useState(0);

//   useMotionValueEvent(smooth, "change", (latest) => {
//     const n = content.length;
//     if (n === 0) return;

//     const bps = content.map((_, i) => (n === 1 ? 0 : i / (n - 1)));

//     let idx = 0;
//     let best = Infinity;
//     for (let i = 0; i < bps.length; i++) {
//       const d = Math.abs(latest - bps[i]);
//       if (d < best) {
//         best = d;
//         idx = i;
//       }
//     }
//     const bNow = bps[activeCard] ?? 0;
//     if (Math.abs(latest - bNow) > 0.12) setActiveCard(idx); // refined sensitivity
//   });

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full overflow-hidden"
//       style={{ 
//         height: `${heightVh}vh`,
//         background: '#111827', // clean dark gray
//       }}
//     >
//       {/* Clean minimalist background - no flashy effects */}

//       {/* Minimalist Cards Layer - subtle parallax */}
//       <div className="absolute inset-0 z-10">
//         {content.length > 0 &&
//           content.map((item, index) => (
//             <MinimalistCard
//               key={index}
//               index={index}
//               total={content.length}
//               scrollYProgress={smooth}
//               content={item.content}
//               contentClassName={contentClassName}
//               isActive={activeCard === index}
//             />
//           ))}
//       </div>

//       {/* Fixed Center Text - Clean & Elegant */}
//       <div className="sticky top-0 z-30 flex h-screen w-full items-center justify-center">
//         <div className="text-center relative pointer-events-none max-w-4xl px-6">
          
//           {/* Clean Bold Headline */}
//           <motion.h1
//             className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
//                        font-bold text-white leading-[0.9] tracking-tight
//                        select-none"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//           >
//             INSIDE THE
//             <br />
//             WORKLABS
//           </motion.h1>

//           {/* Elegant Subtitle */}
//           <div className="relative mt-8 h-16 overflow-hidden">
//             {content.map((item, index) => (
//               <motion.p
//                 key={index}
//                 className="absolute inset-0 flex items-center justify-center
//                            text-lg md:text-xl text-gray-400 max-w-[48rem] mx-auto
//                            leading-relaxed font-medium"
//                 style={{ textWrap: "balance" }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0,
//                   y: activeCard === index ? 0 : 20,
//                 }}
//                 transition={{ 
//                   duration: 0.8, 
//                   ease: [0.25, 1, 0.5, 1],
//                   delay: activeCard === index ? 0.1 : 0
//                 }}
//               >
//                 {item.description}
//               </motion.p>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Minimalist Progress Indicator */}
//       <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
//         <div className="flex space-x-3">
//           {content.map((_, index) => (
//             <motion.div
//               key={index}
//               className="w-2 h-2 rounded-full"
//               animate={{
//                 backgroundColor: activeCard === index ? '#ffffff' : '#6b7280',
//                 scale: activeCard === index ? 1.2 : 1,
//               }}
//               transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MinimalistCard - Clean cards with subtle parallax
//    ========================= */
// function MinimalistCard({
//   index,
//   total,
//   scrollYProgress,
//   content,
//   isActive,
// }: {
//   index: number;
//   total: number;
//   scrollYProgress: MotionValue<number>;
//   content?: React.ReactNode;
//   contentClassName?: string;
//   isActive?: boolean;
// }) {
//   // Timing windows for each card
//   const start = total <= 1 ? 0 : Math.max(0, (index - 0.3) / total);
//   const end = total <= 1 ? 1 : Math.min(1, (index + 1.3) / total);

//   // Subtle parallax movement - no rotation
//   const y = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end, end + 0.1],
//     [60, 0, -100, -140]
//   );

//   const scale = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end, end + 0.1],
//     [0.9, 1, 1.02, 0.95]
//   );

//   const opacity = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end - 0.1, end + 0.1],
//     [0, 1, 1, 0]
//   );

//   // Alternating left/right positions - clear center space
//   const isLeft = index % 2 === 0;
//   const positioning = isLeft 
//     ? { left: "8%", top: "50%", transform: "translateY(-50%)" }
//     : { right: "8%", top: "50%", transform: "translateY(-50%)" };

//   // Clean, modern gradients
//   const gradients = [
//     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//   ];

//   return (
//     <motion.div
//       style={{ 
//         y, 
//         scale, 
//         opacity, 
//         ...positioning,
//         willChange: "transform, opacity" 
//       }}
//       className="absolute w-[min(40rem,85vw)] h-[min(26rem,55vw)] md:w-[40rem] md:h-[26rem]"
//     >
//       <motion.div
//         className="w-full h-full rounded-xl overflow-hidden relative
//                    border shadow-2xl"
//         style={{ background: gradients[index % gradients.length] }}
//         animate={isActive ? {
//           borderColor: "#4b5563"
//         } : {
//           borderColor: "#374151"
//         }}
//         transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
//       >
//         {/* Minimal overlay */}
//         <div className="absolute inset-0 bg-black/20" />
        
//         {/* Content */}
//         {content ?? (
//           <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
//             <motion.h3 
//               className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
//               animate={isActive ? {
//                 opacity: 1,
//                 y: 0
//               } : {
//                 opacity: 0.8,
//                 y: 10
//               }}
//               transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
//             >
//               Workspace {index + 1}
//             </motion.h3>
            
//             <motion.p 
//               className="text-lg text-white/90 leading-relaxed"
//               animate={isActive ? {
//                 opacity: 1,
//                 y: 0
//               } : {
//                 opacity: 0.7,
//                 y: 15
//               }}
//               transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
//             >
//               Behind the scenes of our creative process
//             </motion.p>
//           </div>
//         )}

//         {/* Minimal corner accent */}
//         <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent" />
//       </motion.div>
//     </motion.div>
//   );
// } 