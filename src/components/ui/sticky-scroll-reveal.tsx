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
//   heightVh = 400, // lebih tinggi untuk scroll runway yang panjang
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
//     if (Math.abs(latest - bNow) > 0.08) setActiveCard(idx);
//   });

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full overflow-hidden"
//       style={{ 
//         height: `${heightVh}vh`, // Tinggi section untuk scroll runway
//         background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)',
//       }}
//     >
//       {/* Animated background atmosphere */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
//         <div className="absolute top-3/4 left-3/4 w-80 h-80 bg-pink-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
//       </div>

//       {/* Parallax Images Layer - bergerak behind text */}
//       <div className="absolute inset-0 z-10">
//         {content.length > 0 &&
//           content.map((item, index) => (
//             <ParallaxImage
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

//       {/* FIXED CENTER TEXT - Never moves, always centered */}
//       <div className="sticky top-0 z-30 flex h-screen w-full items-center justify-center">
//         <div className="text-center relative pointer-events-none">
          
//           {/* Main Title - ALWAYS VISIBLE, NEVER MOVES */}
//           <motion.h1
//             className="leading-[0.85] tracking-[-0.04em] font-black
//                        text-[clamp(3.5rem,10vw,14rem)]
//                        bg-gradient-to-b from-white via-gray-100 to-gray-300 
//                        bg-clip-text text-transparent
//                        relative select-none"
//             animate={{
//               backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
//             }}
//             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//             style={{
//               backgroundSize: '100% 200%',
//               filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.4)) drop-shadow(0 0 100px rgba(255,255,255,0.1))',
//               textShadow: '0 0 40px rgba(255,255,255,0.3)'
//             }}
//           >
//             INSIDE THE
//             <br />
//             WORKLABS
//           </motion.h1>

//           {/* Subtitle - Changes based on active image */}
//           <div className="relative mt-8 h-20 overflow-hidden">
//             {content.map((item, index) => (
//               <motion.p
//                 key={index}
//                 className="absolute inset-0 flex items-center justify-center
//                            text-lg md:text-xl lg:text-2xl
//                            bg-gradient-to-b from-gray-300 to-gray-500 bg-clip-text text-transparent
//                            font-medium max-w-[50rem] mx-auto [text-wrap:balance] px-6"
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0,
//                   y: activeCard === index ? 0 : 30,
//                   filter: activeCard === index ? 'blur(0px)' : 'blur(4px)',
//                 }}
//                 transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//                 style={{
//                   textShadow: '0 0 20px rgba(255,255,255,0.1)'
//                 }}
//               >
//                 {item.description}
//               </motion.p>
//             ))}
//           </div>

//           {/* Decorative elements */}
//           <div className="flex items-center justify-center mt-12 space-x-4">
//             <motion.div
//               className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
//               animate={{ width: ['6rem', '12rem', '6rem'] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             />
//             <div className="w-2 h-2 rounded-full bg-white/60" />
//             <motion.div
//               className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
//               animate={{ width: ['6rem', '12rem', '6rem'] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Progress indicator */}
//       <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
//         <div className="flex space-x-3 bg-black/30 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
//           {content.map((_, index) => (
//             <motion.div
//               key={index}
//               className="w-2 h-2 rounded-full"
//               animate={{
//                 backgroundColor: activeCard === index ? '#ffffff' : 'rgba(255,255,255,0.3)',
//                 scale: activeCard === index ? 1.4 : 1,
//               }}
//               transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    ParallaxImage - Images that slide behind the text
//    ========================= */
// function ParallaxImage({
//   index,
//   total,
//   scrollYProgress,
//   content,
//   contentClassName,
//   isActive,
// }: {
//   index: number;
//   total: number;
//   scrollYProgress: MotionValue<number>;
//   content?: React.ReactNode;
//   contentClassName?: string;
//   isActive?: boolean;
// }) {
//   // Each image has a "window" of visibility
//   const start = total <= 1 ? 0 : Math.max(0, (index - 0.3) / total);
//   const end = total <= 1 ? 1 : Math.min(1, (index + 1.3) / total);

//   // Different parallax speeds for depth effect
//   const parallaxSpeeds = [400, 300, 350, 250, 320, 280]; // pixels to move
//   const speed = parallaxSpeeds[index % parallaxSpeeds.length];

//   // Position images in different areas (avoid center where text is)
//   const getImagePosition = (i: number): React.CSSProperties => {
//     const positions = [
//       // Left side
//       { left: "6%", top: "30%", transform: "rotate(-2deg)" },
//       // Right side
//       { right: "8%", top: "25%", transform: "rotate(3deg)" },
//       // Left lower
//       { left: "10%", bottom: "20%", transform: "rotate(1deg)" },
//       // Right lower
//       { right: "12%", bottom: "25%", transform: "rotate(-1deg)" },
//       // Left upper
//       { left: "8%", top: "15%", transform: "rotate(2deg)" },
//       // Right upper
//       { right: "10%", top: "40%", transform: "rotate(-3deg)" },
//     ];
//     return positions[i % positions.length];
//   };

//   // Parallax movement: images move UP as user scrolls DOWN
//   const y = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end, end + 0.1],
//     [speed * 0.3, 0, -speed, -speed * 1.2] // Start lower, end higher (moving up)
//   );
  
//   const scale = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end, end + 0.1],
//     [0.8, 1, 1.05, 0.9]
//   );
  
//   const opacity = useTransform(
//     scrollYProgress,
//     [start - 0.1, start, end - 0.2, end + 0.1],
//     [0, 1, 1, 0]
//   );

//   const rotate = useTransform(
//     scrollYProgress,
//     [start, end],
//     [0, 8] // Slight rotation as it moves
//   );

//   const gradients = [
//     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//     "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//     "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//     "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
//     "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//   ];

//   return (
//     <motion.div
//       style={{ 
//         y, 
//         scale, 
//         opacity, 
//         rotate,
//         ...getImagePosition(index), 
//         willChange: "transform, opacity" 
//       }}
//       className="absolute w-[min(22rem,45vw)] h-[min(16rem,32vw)] md:w-[26rem] md:h-[18rem] lg:w-[30rem] lg:h-[20rem]"
//     >
//       <motion.div
//         style={{ background: gradients[index % gradients.length] }}
//         className={cn(
//           "w-full h-full rounded-2xl shadow-2xl overflow-hidden relative",
//           "border border-white/20 backdrop-blur-sm",
//           contentClassName
//         )}
//         animate={isActive ? {
//           borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"],
//           boxShadow: [
//             "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
//             "0 30px 60px -12px rgba(255, 255, 255, 0.15)",
//             "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
//           ]
//         } : {}}
//         transition={{ duration: 3, repeat: Infinity }}
//         whileHover={{ 
//           scale: 1.02, 
//           rotate: 0,
//           transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
//         }}
//       >
//         {/* Glassmorphism layers */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-tl from-black/10 via-transparent to-white/5" />
        
//         {/* Active shimmer */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full"
//           animate={isActive ? { x: ['-100%', '200%'] } : {}}
//           transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
//         />
        
//         {/* Content */}
//         {content ?? (
//           <div className="relative flex flex-col h-full w-full items-center justify-center p-6">
//             <div className="relative z-10 text-white text-center">
//               <div className="text-2xl font-bold drop-shadow-lg mb-2">
//                 Workspace {index + 1}
//               </div>
//               <div className="text-sm opacity-75">
//                 Behind the scenes
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Corner accents */}
//         <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/40 to-transparent" />
//         <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-black/20 to-transparent rounded-tr-2xl" />
//       </motion.div>
//     </motion.div>
//   );
// }


"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/* =========================
   StickyScroll - Cinematic Effect
   ========================= */
export function StickyScroll({
  content,
  contentClassName,
  heightVh = 280, // optimal scroll runway
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

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });
  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(smooth, "change", (latest) => {
    const n = content.length;
    if (n === 0) return;

    const bps = content.map((_, i) => (n === 1 ? 0 : i / (n - 1)));

    let idx = 0;
    let best = Infinity;
    for (let i = 0; i < bps.length; i++) {
      const d = Math.abs(latest - bps[i]);
      if (d < best) {
        best = d;
        idx = i;
      }
    }
    const bNow = bps[activeCard] ?? 0;
    if (Math.abs(latest - bNow) > 0.12) setActiveCard(idx); // refined sensitivity
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ 
        height: `${heightVh}vh`,
        background: '#111827', // clean dark gray
      }}
    >
      {/* Clean minimalist background - no flashy effects */}

      {/* Minimalist Cards Layer - subtle parallax */}
      <div className="absolute inset-0 z-10">
        {content.length > 0 &&
          content.map((item, index) => (
            <MinimalistCard
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

      {/* Fixed Center Text - Clean & Elegant */}
      <div className="sticky top-0 z-30 flex h-screen w-full items-center justify-center">
        <div className="text-center relative pointer-events-none max-w-4xl px-6">
          
          {/* Clean Bold Headline */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-bold text-white leading-[0.9] tracking-tight
                       select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            INSIDE THE
            <br />
            WORKLABS
          </motion.h1>

          {/* Elegant Subtitle */}
          <div className="relative mt-8 h-16 overflow-hidden">
            {content.map((item, index) => (
              <motion.p
                key={index}
                className="absolute inset-0 flex items-center justify-center
                           text-lg md:text-xl text-gray-400 max-w-[48rem] mx-auto
                           leading-relaxed font-medium"
                style={{ textWrap: "balance" }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  y: activeCard === index ? 0 : 20,
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 1, 0.5, 1],
                  delay: activeCard === index ? 0.1 : 0
                }}
              >
                {item.description}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Minimalist Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-3">
          {content.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: activeCard === index ? '#ffffff' : '#6b7280',
                scale: activeCard === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   MinimalistCard - Clean cards with subtle parallax
   ========================= */
function MinimalistCard({
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
  // Timing windows for each card
  const start = total <= 1 ? 0 : Math.max(0, (index - 0.3) / total);
  const end = total <= 1 ? 1 : Math.min(1, (index + 1.3) / total);

  // Subtle parallax movement - no rotation
  const y = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [60, 0, -100, -140]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.9, 1, 1.02, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end + 0.1],
    [0, 1, 1, 0]
  );

  // Alternating left/right positions - clear center space
  const isLeft = index % 2 === 0;
  const positioning = isLeft 
    ? { left: "8%", top: "50%", transform: "translateY(-50%)" }
    : { right: "8%", top: "50%", transform: "translateY(-50%)" };

  // Clean, modern gradients
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];

  return (
    <motion.div
      style={{ 
        y, 
        scale, 
        opacity, 
        ...positioning,
        willChange: "transform, opacity" 
      }}
      className="absolute w-[min(40rem,85vw)] h-[min(26rem,55vw)] md:w-[40rem] md:h-[26rem]"
    >
      <motion.div
        className="w-full h-full rounded-xl overflow-hidden relative
                   border shadow-2xl"
        style={{ background: gradients[index % gradients.length] }}
        animate={isActive ? {
          borderColor: "#4b5563"
        } : {
          borderColor: "#374151"
        }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Minimal overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content */}
        {content ?? (
          <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
              animate={isActive ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0.8,
                y: 10
              }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
              Workspace {index + 1}
            </motion.h3>
            
            <motion.p 
              className="text-lg text-white/90 leading-relaxed"
              animate={isActive ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0.7,
                y: 15
              }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            >
              Behind the scenes of our creative process
            </motion.p>
          </div>
        )}

        {/* Minimal corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent" />
      </motion.div>
    </motion.div>
  );
}