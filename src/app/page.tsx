"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

import { MultiLineReveal } from "@/components/magicui/text-reveal";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Timeline } from "@/components/ui/timeline";

export default function Page() {
  const [currentService, setCurrentService] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);

  const servicesRotating = useMemo(
    () => ["Mobile App Development", "Software Development", "Web Development"],
    []
  );

  const timelineData = [
    {
      title: "2024 → 2025",
      content: (
        <div className="space-y-3 text-neutral-700">
          <p>Kickoff, early client wins, and first product launch.</p>
          <ul className="list-disc pl-5">
            <li>Brand + design system</li>
            <li>Landing pages + growth experiments</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Q2 2025",
      content: (
        <div className="space-y-3 text-neutral-700">
          <p>Scaled engineering pipeline and shipped v2.</p>
          <ul className="list-disc pl-5">
            <li>Web, Mobile & AI integrations</li>
            <li>Performance & SEO upgrades</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Today",
      content: (
        <div className="space-y-3 text-neutral-700">
          <p>Onboarding new partners and polishing DX/UX.</p>
          <ul className="list-disc pl-5">
            <li>Component library hardening</li>
            <li>Analytics-driven iteration</li>
          </ul>
        </div>
      ),
    },
  ];

  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];

  useEffect(() => {
    const el = heroRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!el || !l1 || !l2) return;

    let raf = 0;
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const vw = window.innerWidth || 1;

        // absolute positions
        const absTop = rect.top + window.scrollY;
        const start = absTop; // progress=0 saat top hero sejajar top viewport
        const end = absTop + rect.height; // progress=1 saat hero keluar di atas
        const y = window.scrollY;

        const progress = clamp((y - start) / (end - start), 0, 1);

        // batas aman + drift yang lebih konservatif
        const gutter = Math.min(vw * 0.06, 64);
        const baseMax = vw * (vw < 768 ? 0.06 : 0.12);

        // ruang aman kiri/kanan (biar gak kepotong)
        const l1Rect = l1.getBoundingClientRect();
        const l2Rect = l2.getBoundingClientRect();
        const roomLeft = Math.max(0, l1Rect.left - gutter);
        const roomRight = Math.max(0, vw - gutter - l2Rect.right);

        const l1Max = Math.min(baseMax, roomLeft);
        const l2Max = Math.min(baseMax, roomRight);

        const l1x = -progress * l1Max; // UNCU ke kiri
        const l2x = progress * l2Max; // WORKLABS ke kanan

        l1.style.transform = `translate3d(${l1x}px,0,0)`;
        l2.style.transform = `translate3d(${l2x}px,0,0)`;
      });
    };

    // set posisi awal rapi (progress=0)
    l1.style.transform = `translate3d(0,0,0)`;
    l2.style.transform = `translate3d(0,0,0)`;

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      className="relative bg-white"
    >
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center bg-white overflow-visible"
        >
          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[6vw] md:px-[8vw] py-24 md:py-32">
            <h1
              ref={heroRef}
              className="text-center leading-[0.85] tracking-[-0.03em] font-black text-black"
            >
              <span
                ref={line1Ref}
                className="inline-block mx-auto text-[clamp(4rem,12vw,14rem)] will-change-transform"
                style={{ transform: "translate3d(0,0,0)" }}
              >
                UNCU
              </span>

              <span
                ref={line2Ref}
                className="inline-block mx-auto text-[clamp(4rem,12vw,14rem)] mt-2 will-change-transform"
                style={{ transform: "translate3d(0,0,0)" }}
              >
                WORKLABS
              </span>
            </h1>

            {/* CTA + Who We Are */}
            <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-14 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
              {/* Left: CTA */}
              <a
                href="#contact"
                className="inline-flex items-center border-2 border-black rounded-full px-8 py-4 text-black text-sm font-bold transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg group"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-[-4px]">
                  GET STARTED
                </span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* Right: "Who We Are" blurb */}
              <div className="max-w-[46rem] text-left">
                <div className="text-sm font-semibold text-neutral-500 mb-2">
                  Who We Are
                </div>
                <p className="text-[1.35rem] md:text-[1.6rem] leading-snug tracking-tight text-neutral-900">
                  <span className="mr-3">✺</span>
                  UNCU Worklabs is a strategic design & engineering partner to
                  bold digital brands. We embed with your team, co-build your
                  product, and help bring it to the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="timeline" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-10">
            <Timeline data={timelineData} />
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-24 py-20 bg-white">
          <HeroParallax products={products} />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-label="Contact"
          className="min-h-screen bg-white text-neutral-900 grid grid-rows-[auto_1fr]"
        >
          {/* TOP: info (3 columns) */}
          <div className="mx-auto w-full max-w-7xl px-6 pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* Menu */}
              <div className="group">
                <h4 className="text-sm font-semibold text-neutral-500 transition-colors duration-300 group-hover:text-black">
                  Menu
                </h4>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="#about"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      Work
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="group">
                <h4 className="text-sm font-semibold text-neutral-500 transition-colors duration-300 group-hover:text-black">
                  Social
                </h4>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://behance.net"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-all duration-200 hover:underline hover:translate-x-1 inline-block hover:text-black"
                    >
                      Behance
                    </a>
                  </li>
                </ul>
              </div>

              {/* Emails */}
              <div className="group">
                <h4 className="text-sm font-semibold text-neutral-500 transition-colors duration-300 group-hover:text-black">
                  Business enquiries
                </h4>
                <p className="mt-3">
                  <a
                    href="mailto:hi@uncuworklabs.co"
                    className="transition-all duration-200 hover:underline hover:text-black"
                  >
                    hi@uncuworklabs.co
                  </a>
                </p>

                <h4 className="mt-8 text-sm font-semibold text-neutral-500 transition-colors duration-300 group-hover:text-black">
                  Join our team
                </h4>
                <p className="mt-3">
                  <a
                    href="mailto:apply@uncuworklabs.co"
                    className="transition-all duration-200 hover:underline hover:text-black"
                  >
                    apply@uncuworklabs.co
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM: Large headline */}
          <div className="flex items-center justify-center px-6">
            <div className="mx-auto max-w-[92rem] text-center font-black leading-[0.9] tracking-[-0.03em] group">
              <span className="block text-[clamp(5rem,12vw,14rem)] transition-all duration-500 group-hover:tracking-[-0.05em]">
                UNCU
              </span>
              <span className="block text-[clamp(5rem,12vw,14rem)] transition-all duration-500 group-hover:tracking-[-0.05em]">
                WORKLABS
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Utilities */}
      <style jsx>
        {`
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
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
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
          .will-change-transform {
            will-change: transform;
          }

          @media (max-width: 768px) {
            .main-container {
              flex-direction: column !important;
              text-align: center;
              gap: 2rem !important;
              padding: 32px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
