"use client";

import React, { useState, useEffect, useMemo } from "react";
// at top of the file
import Image from "next/image";
import Highlighter from "@/components/ui/highlighter";

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
                  A <Highlighter color="#FF9800">Creative Lab</Highlighter> for
                  Digital Solutions crafting{" "}
                  <Highlighter color="#FFC107">websites</Highlighter>,{" "}
                  <Highlighter color="#FFC107" action="circle">
                    apps
                  </Highlighter>
                  , and cutting-edge{" "}
                  <Highlighter color="#FF9800">AI</Highlighter> ready for the
                  future.
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
        <section
          id="contact"
          aria-label="Contact Us"
          className="relative py-0 bg-white"
        >
          {/* Full-bleed marquee */}
          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
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

            {/* Icon row overlay */}
            {/* pointer-events-none on wrapper so the marquee underneath can still scroll;
            pointer-events-auto on the actual links so they remain clickable */}
            <div className="pointer-events-none absolute inset-x-0 bottom-8 z-50">
              <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-center gap-10 px-6 text-neutral-900">
                {/* Email */}
                <a
                  href="mailto:Uncu.worklabs@gmail.com"
                  aria-label="Email"
                  className="group"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    className="opacity-80 group-hover:opacity-100 transition"
                    aria-hidden="true"
                  >
                    <title>Email</title>
                    <rect
                      x="4"
                      y="6"
                      width="16"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      rx="1.5"
                    />
                    <path
                      d="M22 6L12 13 2 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    className="opacity-80 group-hover:opacity-100 transition"
                    aria-hidden="true"
                  >
                    <title>LinkedIn</title>
                    <path
                      d="M4.98 3.5A2.5 2.5 0 107.5 6a2.5 2.5 0 00-2.52-2.5zM3.5 8.5h3v12h-3zM10 8.5h2.8v1.7h.04A3.1 3.1 0 0115.6 8.7c2.94 0 3.48 1.94 3.48 4.46v7.36h-3v-6.52c0-1.56-.03-3.56-2.17-3.56-2.18 0-2.52 1.7-2.52 3.45v6.63h-3z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    className="opacity-80 group-hover:opacity-100 transition"
                    aria-hidden="true"
                  >
                    <title>Instagram</title>
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="group"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    className="opacity-80 group-hover:opacity-100 transition"
                    aria-hidden="true"
                  >
                    <title>GitHub</title>
                    <path
                      d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.19-3.37-1.19a2.65 2.65 0 00-1.11-1.47c-.91-.62.07-.61.07-.61a2.1 2.1 0 011.54 1.04 2.14 2.14 0 002.93.84 2.13 2.13 0 01.64-1.34c-2.22-.25-4.56-1.11-4.56-4.95a3.86 3.86 0 011.03-2.68 3.58 3.58 0 01.1-2.65s.84-.27 2.75 1.02a9.48 9.48 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.37.84.4 1.79.1 2.65a3.86 3.86 0 011.03 2.68c0 3.85-2.34 4.7-4.57 4.95a2.39 2.39 0 01.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0012 2z"
                      fill="currentColor"
                    />
                  </svg>
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
