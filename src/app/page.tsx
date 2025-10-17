"use client";

import React, { useState, useEffect, useMemo } from "react";
// at top of the file
import Highlighter from "@/components/ui/highlighter";

import { MultiLineReveal } from "@/components/magicui/text-reveal";
import { HeroParallax } from "@/components/ui/hero-parallax";

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

  const products = [
    {
      title: "KL Tourism Portal",
      link: "/projects/kl-tourism",
      thumbnail: "/images/p1.jpg",
    },
    {
      title: "Retail POS Companion",
      link: "/projects/pos-companion",
      thumbnail: "/images/p2.jpg",
    },
    {
      title: "Smart Routing Engine",
      link: "/projects/routing",
      thumbnail: "/images/p3.jpg",
    },
    {
      title: "Media Booking System",
      link: "/projects/booking",
      thumbnail: "/images/p4.jpg",
    },
    {
      title: "Citizen Assist App",
      link: "/projects/citizen",
      thumbnail: "/images/p5.jpg",
    },
    {
      title: "Forecasting Copilot",
      link: "/projects/forecasting",
      thumbnail: "/images/p6.jpg",
    },
    {
      title: "KLTG Marketing Site",
      link: "/projects/kltg",
      thumbnail: "/images/p7.jpg",
    },
    {
      title: "City Events Hub",
      link: "/projects/events",
      thumbnail: "/images/p8.jpg",
    },
    {
      title: "eGov Service Desk",
      link: "/projects/egov",
      thumbnail: "/images/p9.jpg",
    },
    {
      title: "Payments Gateway",
      link: "/projects/payments",
      thumbnail: "/images/p10.jpg",
    },
    {
      title: "Fleet Tracker",
      link: "/projects/fleet",
      thumbnail: "/images/p11.jpg",
    },
    {
      title: "Creator Studio",
      link: "/projects/studio",
      thumbnail: "/images/p12.jpg",
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

        <section id="capabilities" className="scroll-mt-24 py-20 bg-white">
          <HeroParallax products={products} />
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

        <section
          id="contact"
          aria-label="Contact"
          className="min-h-screen bg-white text-neutral-900 grid grid-rows-[auto_1fr]"
        >
          {/* TOP: info (3 kolom) */}
          <div className="mx-auto w-full max-w-7xl px-6 pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* Menu */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-500">Menu</h4>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a href="#about" className="hover:underline">
                      Studio
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="hover:underline">
                      Work
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-500">
                  Social
                </h4>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://behance.net"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Behance
                    </a>
                  </li>
                </ul>
              </div>

              {/* Emails */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-500">
                  Business enquiries
                </h4>
                <p className="mt-3">
                  <a
                    href="mailto:hi@uncuworklabs.co"
                    className="hover:underline"
                  >
                    hi@uncuworklabs.co
                  </a>
                </p>

                <h4 className="mt-8 text-sm font-semibold text-neutral-500">
                  Join our team
                </h4>
                <p className="mt-3">
                  <a
                    href="mailto:apply@uncuworklabs.co"
                    className="hover:underline"
                  >
                    apply@uncuworklabs.co
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM: headline besar (fit 1 page, stack, tidak overflow) */}
          <div className="flex items-center justify-center px-6">
            <div className="mx-auto max-w-[92rem] text-center font-black leading-[0.9] tracking-[-0.03em]">
              <span className="block text-[clamp(5rem,12vw,14rem)]">UNCU</span>
              <span className="block text-[clamp(5rem,12vw,14rem)]">
                WORKLABS
              </span>
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
