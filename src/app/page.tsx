"use client";

import React, { useState, useEffect, useMemo } from "react";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { MultiLineReveal } from "@/components/magicui/text-reveal";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

type Project = {
  id: number;
  title: string;
  impact: string;
  tag: "Web" | "Mobile" | "AI";
};

export default function Page() {
  // 👉 NEW: menu data

  const [currentService, setCurrentService] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const servicesRotating = useMemo(
    () => ["Mobile App Development", "Software Development", "Web Development"],
    []
  );

  const projectData: Project[] = [
    {
      id: 1,
      title: "KL Tourism Portal",
      impact: "↑ +38% session time",
      tag: "Web",
    },
    {
      id: 2,
      title: "Retail POS Companion",
      impact: "↓ −27% checkout time",
      tag: "Mobile",
    },
    {
      id: 3,
      title: "Smart Routing Engine",
      impact: "↑ +19% conversion",
      tag: "AI",
    },
    {
      id: 4,
      title: "Media Booking System",
      impact: "↑ +2.1x bookings",
      tag: "Web",
    },
    {
      id: 5,
      title: "Citizen Assist App",
      impact: "↑ +4.7 ★ store rating",
      tag: "Mobile",
    },
    {
      id: 6,
      title: "Forecasting Copilot",
      impact: "↓ −34% ops cost",
      tag: "AI",
    },
  ];

  const stickyScrollContent = [
    {
      title: "Inside the Worklabs",
      description:
        "Discover how we transform ideas into reality with our expertise in web, mobile, and AI solutions.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center text-neutral-900">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Web Solutions</h3>
            <p className="text-sm">Responsive • Fast • Scalable</p>
          </div>
        </div>
      ),
    },
    {
      title: "Mobile App Innovation",
      description:
        "iOS and Android applications with native performance and user experience. We focus on offline-first patterns and smooth deployment processes.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center text-neutral-900">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Mobile Apps</h3>
            <p className="text-sm">iOS • Android • Cross-platform</p>
          </div>
        </div>
      ),
    },
    {
      title: "AI & Software Solutions",
      description:
        "Cutting-edge AI integration and internal tools that automate workflows, boost accuracy, and transform how your business operates.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center text-neutral-900">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AI Solutions</h3>
            <p className="text-sm">LLM • RAG • Automation</p>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const currentText = servicesRotating[currentService];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText !== currentText) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else if (!isDeleting && displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1400);
        } else if (isDeleting && displayText !== "") {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentService((prev) => (prev + 1) % servicesRotating.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentService, servicesRotating]);

  const [activeTag, setActiveTag] = useState<"All" | "Web" | "Mobile" | "AI">(
    "All"
  );
  const filteredProjects =
    activeTag === "All"
      ? projectData
      : projectData.filter((p) => p.tag === activeTag);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      className="relative"
    >
      {/* faint grid lines */}
      <div
        style={{
          background:
            "repeating-linear-gradient(90deg,rgba(0,0,0,0.12), rgba(0,0,0,0.12) 1px, transparent 1px, transparent 140px)",
        }}
        className="opacity-[0.03]"
      />

      <div className="relative z-10">
        {/* HERO */}
        <section
          className="relative min-h-[92vh] flex items-center pt-24 pb-16 text-white overflow-hidden"
          aria-label="Hero"
        >
          {/* Background image */}
          <img
            src="/main_background.png"
            alt="Blueprint background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
            <div className="flex items-center gap-16">
              <div className="flex-1 pr-8">
                <h1 className="leading-[0.9] tracking-[-0.02em] font-extrabold opacity-0 animate-[fadeIn_.6s_ease-out_.1s_forwards]">
                  <div className="leading-[0.9] tracking-tight">
                    <span className="block text-[clamp(6rem,12vw,12rem)] font-bold text-white">
                      UNCU
                    </span>
                    <span className="block pl-[5.7ch] text-[clamp(3rem,8vw,8rem)] font-semibold text-white">
                      WORKLABS
                    </span>
                  </div>
                </h1>

                <p className="mt-8 max-w-2xl text-base md:text-lg font-medium text-white inline-block px-4 py-3 opacity-0 animate-[fadeIn_.6s_ease-out_.35s_forwards]">
                  A Creative Lab for Digital Solutions crafting websites, apps,
                  and cutting-edge AI ready for the future.
                </p>

                <div className="mt-10 flex">
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full bg-black px-6 py-3 text-white text-sm font-semibold hover:bg-neutral-800 transition hover:scale-105"
                  >
                    WORKLABS BEGINS NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24 bg-white text-black">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h2 className="text-black font-extrabold text-4xl md:text-6xl tracking-tight">
              LEARN MORE
              <br />
              ABOUT US
            </h2>

            <MultiLineReveal
              heightVh={100}
              stickyHeight="55vh"
              className=""
              lines={[
                "We're your launchpad.",
                "We design and build web, mobile, and AI solutions",
                "so your ideas don't just launch, they take off.",
              ]}
            />
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-24 py-20 bg-white">
          <StickyScroll content={stickyScrollContent} />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  My latest work
                </h2>
              </div>

              {/* Filter pills */}
              <div className="mt-4 flex gap-2 sm:mt-0">
                {(["All", "Web", "Mobile", "AI"] as const).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-medium transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      activeTag === tag
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-700 hover:bg-neutral-100",
                    ].join(" ")}
                    aria-pressed={activeTag === tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => (
                <article
                  key={p.id}
                  tabIndex={0}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm outline-none ring-neutral-300 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md focus:ring"
                >
                  <div className="mb-3 inline-flex rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {p.tag}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-neutral-600">{p.impact}</p>
                  <div className="mt-4 text-sm font-semibold text-[#4bbbed] group-hover:underline">
                    View case study →
                  </div>
                </article>
              ))}
            </div>

            <a
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              View all projects →
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-label="Contact Us" className="py-0">
          {/* Full-bleed marquee acts as the stage */}
          <div className="relative w-screen max-w-none left-1/2 right-1/2 -mx-[50vw]">
            <ScrollVelocityContainer className="h-screen w-full flex items-center">
              <ScrollVelocityRow
                baseVelocity={1.2}
                direction={1}
                className="py-4"
              >
                <span className="px-[4vw] text-[22vw] md:text-[16vw] leading-[0.85] tracking-[-0.04em] font-extrabold uppercase">
                  · Start Your Launch · Mulai Peluncuranmu · 开始你的启航 ·
                  あなたの発射を始めよう · ابدأ انطلاقتك · Inicia Tu Lanzamiento
                  · Commence Ton Lancement · 당신의 출발을 시작하세요 · Начни
                  свой запуск · Starte Deinen
                </span>
              </ScrollVelocityRow>
            </ScrollVelocityContainer>

            {/* Logo row OVERLAY (visible on white bg) */}
            <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 w-full z-20">
              <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-center gap-16 px-6">
                <a
                  href="mailto:Uncu.worklabs@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                    alt=""
                    className="h-8 md:h-10 w-auto brightness-0 opacity-80 hover:opacity-100 transition"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    alt=""
                    className="h-8 md:h-10 w-auto brightness-0 opacity-80 hover:opacity-100 transition"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                    alt=""
                    className="h-8 md:h-10 w-auto brightness-0 opacity-80 hover:opacity-100 transition"
                  />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                    alt=""
                    className="h-8 md:h-10 w-auto brightness-0 opacity-80 hover:opacity-100 transition"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* utilities */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .main-container {
            flex-direction: column !important;
            text-align: center;
            gap: 2rem !important;
            padding: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
