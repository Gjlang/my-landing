"use client";

import React, { useState, useEffect, useMemo } from "react";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TextReveal } from "@/components/magicui/text-reveal";


type Project = {
  id: number;
  title: string;
  impact: string;
  tag: "Web" | "Mobile" | "AI";
};

type Service = {
  id: number;
  name: string;
  desc: string;
  bullets: string[];
  href: string;
  icon?: React.ReactNode;
};

export default function Page() {
  const [currentService, setCurrentService] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ---- DATA (dummy) ----
  const servicesRotating = useMemo(
    () => ["Mobile App Development", "Software Development", "Web Development"],
    []
  );

  const projectData: Project[] = [
    { id: 1, title: "KL Tourism Portal", impact: "↑ +38% session time", tag: "Web" },
    { id: 2, title: "Retail POS Companion", impact: "↓ −27% checkout time", tag: "Mobile" },
    { id: 3, title: "Smart Routing Engine", impact: "↑ +19% conversion", tag: "AI" },
    { id: 4, title: "Media Booking System", impact: "↑ +2.1x bookings", tag: "Web" },
    { id: 5, title: "Citizen Assist App", impact: "↑ +4.7 ★ store rating", tag: "Mobile" },
    { id: 6, title: "Forecasting Copilot", impact: "↓ −34% ops cost", tag: "AI" },
  ];

  const servicesList: Service[] = [
    {
      id: 1,
      name: "Web Development",
      desc:
        "Production‑ready websites and web apps with clean architecture, performance first.",
      bullets: ["Responsive UI", "API integration", "SEO & analytics"],
      href: "/services/web",
    },
    {
      id: 2,
      name: "Mobile App Development",
      desc:
        "iOS/Android apps with native feel, offline‑first patterns, and smooth delivery.",
      bullets: ["App Store/Play deploy", "Push & auth", "Offline sync"],
      href: "/services/mobile",
    },
    {
      id: 3,
      name: "Software & AI",
      desc:
        "Internal tools and AI features that automate workflows and boost accuracy.",
      bullets: ["LLM integration", "RAG & agents", "ETL & dashboards"],
      href: "/services/ai",
    },
  ];

  // ---- Effects ----
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typewriter for hero subtitle
  useEffect(() => {
    const currentText = servicesRotating[currentService];
    const timeout = setTimeout(() => {
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
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentService, servicesRotating]);

  // ---- Helper ----
  const getServiceColor = () => {
    const colors = ["#000000", "#000000", "#000000"];
    return colors[currentService];
  };

  // ---- Local UI state (projects filter) ----
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
        backgroundColor: "white",
        color: "black",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ============ HERO — Typography First ============ */}
      <section
        className="relative min-h-[92vh] flex items-center pt-24"
        aria-label="Hero"
      >
        {/* subtle vertical grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "repeating-linear-gradient(90deg,#000, #000 1px, transparent 1px, transparent 140px)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="flex items-center gap-16">
            {/* Left side - Hero content */}
            <div className="flex-1 pr-8">
              {/* giant headline */}
              <h1
                className="leading-[0.9] tracking-[-0.02em] font-extrabold opacity-0 animate-[fadeIn_.6s_ease-out_.1s_forwards]"
              >
                <div className="leading-[0.9] tracking-tight">
                <span className="block text-[clamp(6rem,12vw,12rem)] font-bold text-black">
                  UNCU
                </span>
                <span className="block pl-[5.7ch] text-[clamp(3rem,8vw,8rem)] font-semibold text-black">
                  WORKLABS
                </span>
              </div>
              </h1>
              {/* strapline */}
              <p className="mt-8 max-w-2xl text-base md:text-lg font-medium text-black inline-block px-4 py-3 opacity-0 animate-[fadeIn_.6s_ease-out_.35s_forwards]">
                A Creative Lab for Digital Solutions crafting websites, apps, and cutting-edge AI ready for the future.
              </p>
              {/* CTA */}
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
      {/* =================== ABOUT =================== */} 
      <section 
        id="about" 
        className="scroll-mt-24 bg-gradient-to-br from-[#ffffff] via-white to-[#fff7f7]" 
      > 
        <div className="mx-auto max-w-6xl px-6 py-20"> 
          {/* Big Bold Title - Fixed to 3 lines */} 
          <div className="text-center"> 
            <h2 className="about-hero-title"> 
              LEARN MORE
              <br /> 
              ABOUT US
            </h2> 
            
            <TextReveal className="about-subtitle mx-auto mt-4 max-w-3xl text-lg sm:text-xl leading-7 text-neutral-700 text-center"> 
              Uncu Worklabs isn’t just a worklabs we’re your launchpad
              We design and build web, mobile, and AI solutions
              so your ideas don’t just launch, they take off.
            </TextReveal> 
          </div> 

          {/* Optional: Keep the CTA button if you want */} 
          <div className="text-center"> 
            <a 
              href="/about" 
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100" 
            > 
              Learn more → 
            </a> 
          </div> 
        </div> 
      </section>
      {/* =================== INSIDE THE WORKLABS =================== */}
      <section id="services" className="scroll-mt-24 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Inside the Worklabs
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {servicesList.map((s) => (
              <div
                key={s.id}
                className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="text-lg font-bold text-neutral-900">
                  {s.name}
                </div>
                <p className="mt-2 text-neutral-700">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#4bbbed]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={s.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d33831] hover:underline"
                >
                  Explore →
                </a>
              </div>
            ))}
          </div>

          <a
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
          >
            Explore services →
          </a>
        </div>
      </section>


      {/* =================== PROJECTS =================== */}
      <section id="projects" className="scroll-mt-24">
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
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
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
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm outline-none ring-neutral-300 transition hover:-translate-y-0.5 hover:shadow-md focus:ring"
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

     {/* =================== CONTACT US =================== */}
    <section id="contact" aria-label="Contact Us">
      <div className="contact-container">
        {/* ===== Scroll Velocity Opening ===== */}
        <ScrollVelocityContainer className="text-4xl md:text-7xl font-bold mb-8">
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            · Start Your Launch · Mulai Peluncuranmu · 开始你的启航 · あなたの発射を始めよう · ابدأ انطلاقتك ·
            Inicia Tu Lanzamiento · Commence Ton Lancement · 당신의 출발을 시작하세요 · Начни свой запуск · Starte Deinen
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

      <div className="contact-container">
        {/* Email Button */}
        <InteractiveHoverButton
          onClick={() => (window.location.href = "mailto:Uncu.worklabs@gmail.com")}
          className="contact-btn"
        >
          Uncu.worklabs@gmail.com
        </InteractiveHoverButton>

        {/* Social Links */}
        <div className="social-links">
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://tiktok.com">TikTok</a>
          <a href="https://github.com">GitHub</a>
          <a href="https://dribbble.com">Dribbble</a>
          <a href="https://substack.com">Substack</a>
        </div>
      </div>

      </div>
      </section>

      {/* ===== styles for hero caret + mobile stacking ===== */}
      <style jsx>{`
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
