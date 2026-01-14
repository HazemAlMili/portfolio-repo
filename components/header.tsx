"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

import "../styles/Header.css";

// ============================================================================
// CONSTANTS - Extracted outside component to prevent recreation
// ============================================================================

const NAV_SECTIONS = ["Home", "About", "Projects", "Certificates", "Contact"] as const;
const SCROLL_THRESHOLD = 50;
const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0,
} as const;

// ============================================================================
// SVG ICONS - Memoized Components
// ============================================================================

const SunIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Throttle function to limit scroll event frequency
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = <T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Hydration-safe: Start with false, update on client
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ============================================================================
  // THEME MANAGEMENT - Hydration-safe & Flicker-free
  // ============================================================================

  // Initialize theme on client (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    
    setIsDarkMode(isDark);
    
    // Safety sync: ensures DOM matches state
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      
      // Disable transitions to prevent flickering
      document.documentElement.classList.add('no-transition');
      
      // Apply theme
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      
      // Re-enable transitions after paint (double RAF)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('no-transition');
        });
      });
      
      return newTheme;
    });
  }, []);

  // ============================================================================
  // SCROLL DETECTION - Throttled for performance
  // ============================================================================

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, 100); // Throttle to max 10 calls per second

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================================
  // INTERSECTION OBSERVER - Optimized section tracking
  // ============================================================================

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.toLowerCase());
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      OBSERVER_OPTIONS
    );

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Empty deps - sections don't change

  // ============================================================================
  // NAVIGATION HANDLER - Memoized with useCallback
  // ============================================================================

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogoClick = useCallback(() => {
    scrollToSection("home");
  }, [scrollToSection]);

  // ============================================================================
  // MEMOIZED NAV ITEMS
  // ============================================================================

  const navItems = useMemo(
    () =>
      NAV_SECTIONS.map((item) => {
        const sectionId = item.toLowerCase();
        return (
          <button
            key={item}
            onClick={() => scrollToSection(sectionId)}
            className={`nav-link ${
              activeSection === sectionId ? "active" : ""
            }`}
            aria-current={activeSection === sectionId ? "page" : undefined}
          >
            <span>{item}</span>
          </button>
        );
      }),
    [activeSection, scrollToSection]
  );

  const mobileNavItems = useMemo(
    () =>
      NAV_SECTIONS.map((item) => {
        const sectionId = item.toLowerCase();
        return (
          <button
            key={`mobile-${item}`}
            onClick={() => scrollToSection(sectionId)}
            className={`nav-link ${
              activeSection === sectionId ? "active" : ""
            }`}
            aria-current={activeSection === sectionId ? "page" : undefined}
          >
            <span>{item}</span>
          </button>
        );
      }),
    [activeSection, scrollToSection]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="container">
        <div className="header-nav">
          {/* Logo - Optimized with Next.js Image */}
          <button 
            onClick={handleLogoClick} 
            className="logo"
            aria-label="Go to home section"
          >
            <Image
              src="/Logo.png"
              alt="Hazem Al-Melli Logo"
              className="logo-img"
              width={150}
              height={150}
              priority
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </button>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems}

            {/* Theme Toggle Button */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={mounted ? `Switch to ${isDarkMode ? "light" : "dark"} mode` : "Switch theme"}
              aria-pressed={isDarkMode}
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : isDarkMode ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn btn btn-ghost"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {mobileNavItems}

            {/* Theme Toggle Button in Mobile Menu */}
            <button
              className="theme-toggle mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label={mounted ? `Switch to ${isDarkMode ? "light" : "dark"} mode` : "Switch theme"}
              aria-pressed={isDarkMode}
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : isDarkMode ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
