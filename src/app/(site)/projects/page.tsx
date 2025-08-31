"use client";

import { useState } from "react";

interface Project {
  id: number;
  title: string;
  impact: string;
  tag: string;
  description: string;
  image: string;
}

const projectData: Project[] = [
  { 
    id: 1, 
    title: "KL Tourism Portal", 
    impact: "↑ +38% session time", 
    tag: "Web",
    description: "Interactive tourism platform connecting visitors with authentic KL experiences",
    image: "🏙️"
  },
  { 
    id: 2, 
    title: "Retail POS Companion", 
    impact: "↓ −27% checkout time", 
    tag: "Mobile",
    description: "Streamlined point-of-sale solution enhancing retail efficiency",
    image: "📱"
  },
  { 
    id: 3, 
    title: "Smart Routing Engine", 
    impact: "↑ +19% conversion", 
    tag: "AI",
    description: "AI-powered routing system optimizing delivery and logistics",
    image: "🤖"
  },
  { 
    id: 4, 
    title: "Media Booking System", 
    impact: "↑ +2.1x bookings", 
    tag: "Web",
    description: "Comprehensive platform for media space reservations and management",
    image: "📺"
  },
  { 
    id: 5, 
    title: "Citizen Assist App", 
    impact: "↑ +4.7 ★ store rating", 
    tag: "Mobile",
    description: "Government services app simplifying citizen-state interactions",
    image: "🏛️"
  },
  { 
    id: 6, 
    title: "Forecasting Copilot", 
    impact: "↓ −34% ops cost", 
    tag: "AI",
    description: "Predictive analytics tool for operational decision making",
    image: "📊"
  },
];

const getTagColor = (tag: string) => {
  switch (tag) {
    case "Web":
      return "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200/50";
    case "Mobile":
      return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50";
    case "AI":
      return "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200/50";
    default:
      return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200/50";
  }
};

const ScrollingText = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
      <div className="animate-scroll inline-block text-4xl md:text-7xl font-bold">
        · Start Your Launch · Mulai Peluncuranmu · 开始你的启航 · あなたの発射を始めよう · ابدأ انطلاقتك ·
        Inicia Tu Lanzamiento · Commence Ton Lancement · 당신의 출발을 시작하세요 · Начни свой запуск · Starte Deinen
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <div className="relative px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200/50">
              <span className="text-sm font-medium text-indigo-700">✨ Portfolio Showcase</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent mb-8 leading-tight">
              Our Projects
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-12">
              Over 10 years of experience delivering high-quality solutions that drive real impact and transformation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
                <div className="text-sm text-gray-500">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative px-6 pb-20 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projectData.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-2"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 h-full transition-all duration-700 group-hover:border-gray-300/50 group-hover:shadow-2xl group-hover:shadow-gray-200/50 group-hover:bg-white/90 relative overflow-hidden">
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Project Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      {project.image}
                    </div>
                    <span className={`inline-flex px-4 py-2 text-sm font-medium rounded-full border backdrop-blur-sm ${getTagColor(project.tag)}`}>
                      {project.tag}
                    </span>
                  </div>

                  {/* Project Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-light text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {project.description}
                    </p>

                    {/* Impact Metric */}
                    <div className="mt-auto pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {project.impact}
                        </p>
                        
                        {/* Animated Arrow */}
                        <div className={`transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <svg 
                              className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-12 overflow-hidden">
            <ScrollingText />
          </div>

          <div className="text-center">
            <button
              onClick={() => (window.location.href = "mailto:Uncu.worklabs@gmail.com")}
              className="group mb-12 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-6 text-white text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <span className="mr-3">✉️</span>
              Uncu.worklabs@gmail.com
              <div className="ml-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {[
                { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
                { name: "Instagram", url: "https://instagram.com", icon: "📸" },
                { name: "TikTok", url: "https://tiktok.com", icon: "🎵" },
                { name: "GitHub", url: "https://github.com", icon: "⚡" },
                { name: "Dribbble", url: "https://dribbble.com", icon: "🎨" },
                { name: "Substack", url: "https://substack.com", icon: "✍️" },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                >
                  <span className="transition-transform duration-300 group-hover:scale-125">{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </main>
  );
}