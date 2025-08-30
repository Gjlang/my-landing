"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

interface Project {
  id: number;
  title: string;
  impact: string;
  tag: string;
}

const projectData: Project[] = [
  { id: 1, title: "KL Tourism Portal", impact: "↑ +38% session time", tag: "Web" },
  { id: 2, title: "Retail POS Companion", impact: "↓ −27% checkout time", tag: "Mobile" },
  { id: 3, title: "Smart Routing Engine", impact: "↑ +19% conversion", tag: "AI" },
  { id: 4, title: "Media Booking System", impact: "↑ +2.1x bookings", tag: "Web" },
  { id: 5, title: "Citizen Assist App", impact: "↑ +4.7 ★ store rating", tag: "Mobile" },
  { id: 6, title: "Forecasting Copilot", impact: "↓ −34% ops cost", tag: "AI" },
];

const getTagColor = (tag: string) => {
  switch (tag) {
    case "Web":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Mobile":
      return "bg-green-50 text-green-700 border-green-200";
    case "AI":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-8 leading-tight">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
              Over 10 years of experience delivering high-quality solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-6 pb-20 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projectData.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-100"
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-8 h-full transition-all duration-500 group-hover:border-gray-200">
                  {/* Project Tag */}
                  <div className="mb-6">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getTagColor(project.tag)}`}>
                      {project.tag}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-light text-gray-900 mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Impact Metric */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-lg font-medium text-gray-600 tracking-wide">
                      {project.impact}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center text-gray-400 group-hover:text-gray-600">
                      <span className="text-sm font-medium mr-2">View Project</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </main>
  );
}