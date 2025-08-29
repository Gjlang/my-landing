"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      {/* Judul */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">
        About Us
      </h1>

      {/* Deskripsi */}
      <p className="max-w-2xl text-lg md:text-xl text-center leading-relaxed mb-10">
        We are UNCU Worklabs — a creative lab for digital solutions. 
        Our team designs and builds websites, mobile apps, and AI-powered 
        products that help ideas grow and thrive in the digital world.
      </p>

      {/* CTA */}
      <a
        href="/contact"
        className="inline-flex items-center rounded-full bg-white px-6 py-3 text-black text-sm font-semibold hover:bg-gray-200 transition"
      >
        Get in Touch
      </a>
    </main>
  );
}
