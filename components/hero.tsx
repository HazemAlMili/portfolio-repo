"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import "../styles/Hero.css";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsVisible(true);

    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Hazem Al-Melli", "Web Developer", "Front-End Developer"], 
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className={`hero-layout ${isVisible ? "fade-in-up" : ""}`}>
          {/* Left Column - Content */}
          <div className="hero-content">
            {/* Main Heading */}
            <h1 className="hero-title">
              Hi, I am <span className="accent" ref={typedRef}></span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              A passionate <span className="accent">Front-End Developer</span>{" "}
              crafting beautiful and functional web experiences
            </p>

            {/* Description */}
            <p className="hero-description">
              I specialize in creating responsive, user-friendly websites using
              modern technologies like React, HTML5, CSS3, and JavaScript. Lets
              build something amazing together.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button
                onClick={() => scrollToSection("projects")}
                className="btn btn-primary btn-lg"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="btn btn-outline btn-lg"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <a
                href="https://github.com/HazemAlMili"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hazem-al-melli-a0a0992a5"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hazem_almelli/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram Profile"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0-2h10c3.9 0 7 3.1 7 7v10c0 3.9-3.1 7-7 7H7c-3.9 0-7-3.1-7-7V7C0 3.1 3.1 0 7 0zm5 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm6.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/HazemAlMelli/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook Profile"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.022 4.388 11.022 10.125 11.958v-8.457H7.078V12.07h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.926-1.956 1.874v2.264h3.328l-.532 3.504h-2.796v8.457C19.612 23.096 24 18.096 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Hero Photo */}
          <div className="hero-photo">
            <div className="profile-image">
              <img
                src="/images/Hero.png"
                alt="Hazem Al-Melli - Front-End Developer"
                className="profile-img"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <button
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to About section"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
