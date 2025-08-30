"use client";

import React, { useState, useEffect } from 'react';
import { Smartphone, Code, Globe } from 'lucide-react';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

const ServicesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6 text-neutral-900" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications built with cutting-edge technologies for iOS and Android platforms."
    },
    {
      id: 2,
      icon: <Code className="w-6 h-6 text-neutral-900" />,
      title: "Software Development", 
      description: "Custom software solutions and enterprise applications designed to streamline your business processes and drive growth."
    },
    {
      id: 3,
      icon: <Globe className="w-6 h-6 text-neutral-900" />,
      title: "Web Development",
      description: "Modern, responsive websites and web applications using the latest frameworks and best practices for optimal performance."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Main Content */}
      <main className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className={`mb-32 transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-8 tracking-tight leading-none">
              Our Service
            </h1>
            <div className="w-24 h-px bg-neutral-900 mb-8"></div>
            <p className="text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
              Over 10 years of experience delivering high-quality solutions across mobile, web, and software development.
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-0 mb-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group border-b border-neutral-200 py-12 hover:bg-neutral-100/50 transition-all duration-500 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{
                  transitionDelay: `${index * 150 + 300}ms`,
                }}
              >
                <div className="flex items-start gap-8">
                  {/* Number */}
                  <div className="flex-shrink-0 w-12">
                    <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300">
                      0{service.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center group-hover:bg-neutral-300 transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4 group-hover:text-neutral-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 text-base leading-relaxed font-light max-w-3xl group-hover:text-neutral-500 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {/* CONTACT */}
            <section id="contact" aria-label="Contact Us" className="bg-white py-20">
              <div className="mx-auto max-w-6xl px-6">
                <ScrollVelocityContainer className="text-4xl md:text-7xl font-bold mb-8">
                  <ScrollVelocityRow baseVelocity={3} direction={1}>
                    · Start Your Launch · Mulai Peluncuranmu · 开始你的启航 · あなたの発射を始めよう · ابدأ انطلاقتك ·
                    Inicia Tu Lanzamiento · Commence Ton Lancement · 당신의 출발을 시작하세요 · Начни свой запуск · Starte Deinen
                  </ScrollVelocityRow>
                </ScrollVelocityContainer>
    
                <div className="text-center">
                  <InteractiveHoverButton
                    onClick={() => (window.location.href = "mailto:Uncu.worklabs@gmail.com")}
                    className="mb-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-black text-lg font-semibold hover:bg-neutral-800 transition hover:scale-105"
                  >
                    Uncu.worklabs@gmail.com
                  </InteractiveHoverButton>
    
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="https://linkedin.com" className="text-neutral-600 hover:text-black transition">LinkedIn</a>
                    <a href="https://instagram.com" className="text-neutral-600 hover:text-black transition">Instagram</a>
                    <a href="https://tiktok.com" className="text-neutral-600 hover:text-black transition">TikTok</a>
                    <a href="https://github.com" className="text-neutral-600 hover:text-black transition">GitHub</a>
                    <a href="https://dribbble.com" className="text-neutral-600 hover:text-black transition">Dribbble</a>
                    <a href="https://substack.com" className="text-neutral-600 hover:text-black transition">Substack</a>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </main>

      {/* Footer Circle */}
      <div className="fixed bottom-8 left-8">
        <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors duration-300">
          <span className="text-white font-medium text-sm">N</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;