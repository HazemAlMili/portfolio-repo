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
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Throttle function to limit scroll event frequency
 */
const throttle = <T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
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
  
  // Navigation and scroll logic

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
      // Prevent active section jumps when mobile menu is open (layout shifts)
      if (isMobileMenuOpen) return;

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
  }, [isMobileMenuOpen]); // sections don't change, but we pause observation when menu is open

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
    <header className={`header ${isScrolled || isMobileMenuOpen ? "scrolled" : ""}`}>
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
              width={170}
              height={170}
              priority
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </button>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems}
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
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
