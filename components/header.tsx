"use client";

import { useState, useEffect } from "react";
import "../styles/Header.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="container">
        <div className="header-nav">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="logo">
            <img src="/images/logo.svg" alt="" className="logo-img" />
          </button>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn btn btn-ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;
