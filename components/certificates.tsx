"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import GlowCard from "./GlowCard";
import "../styles/Certificates.css";

// ============================================================================
// CONSTANTS - Extracted to prevent recreation on every render
// ============================================================================

const OBSERVER_OPTIONS = {
  threshold: 0.1,
  rootMargin: "50px", // Start loading slightly before visible
} as const;

const HEADER_STYLES = {
  textAlign: "center" as const,
  marginBottom: "4rem",
};

const DESCRIPTION_STYLES = {
  fontSize: "1.125rem",
  color: "var(--muted-foreground)",
  maxWidth: "32rem",
  margin: "0 auto",
} as const;

const IMAGE_CONTAINER_STYLES = {
  position: "relative" as const,
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

// ============================================================================
// SKELETON LOADER - Prevents CLS while loading
// ============================================================================

const CertificatesSkeleton = () => (
  <div className="certificates-grid">
    {[...Array(6)].map((_, index) => (
      <div key={`skeleton-${index}`} className="certificate-card skeleton">
        <div
          className="certificate-image skeleton-image"
          style={{ backgroundColor: "var(--skeleton-bg, #e0e0e0)" }}
        />
        <div className="certificate-content">
          <div
            style={{
              height: "24px",
              backgroundColor: "var(--skeleton-bg, #e0e0e0)",
              marginBottom: "0.5rem",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              height: "16px",
              backgroundColor: "var(--skeleton-bg, #e0e0e0)",
              marginBottom: "0.25rem",
              borderRadius: "4px",
              width: "70%",
            }}
          />
          <div
            style={{
              height: "16px",
              backgroundColor: "var(--skeleton-bg, #e0e0e0)",
              borderRadius: "4px",
              width: "40%",
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ============================================================================
  // DATA FETCHING - Optimized with AbortController
  // ============================================================================

  useEffect(() => {
    const abortController = new AbortController();

    fetch("/certificates.json", { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCertificates(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading certificates:", error);
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort(); // Cleanup on unmount
    };
  }, []);

  // ============================================================================
  // INTERSECTION OBSERVER - Optimized for animations
  // ============================================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after visible
        }
      },
      OBSERVER_OPTIONS
    );

    const element = document.getElementById("certificates");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // ============================================================================
  // MODAL HANDLERS - Memoized with useCallback
  // ============================================================================

  const openModal = useCallback((image: string) => {
    setSelectedImage(image);
    // Use requestAnimationFrame for smoother DOM updates
    requestAnimationFrame(() => {
      document.body.style.overflow = "hidden";
    });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    requestAnimationFrame(() => {
      document.body.style.overflow = "unset";
    });
  }, []);

  // ============================================================================
  // KEYBOARD HANDLER - Escape key to close modal
  // ============================================================================

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage, closeModal]);

  // ============================================================================
  // MEMOIZED CERTIFICATE CARDS - Only recreate when dependencies change
  // ============================================================================

  const certificateCards = useMemo(
    () =>
      certificates.map((certificate, index) => {
        // Load first 3 images with priority, rest lazy
        const isPriority = index < 3;

        return (
          <div
            key={certificate.title}
            className={`certificate-card-wrapper ${isVisible ? "fade-in-up" : ""}`}
            style={{
              opacity: isVisible ? 1 : 0,
              animationDelay: `${index * 150}ms`,
            }}
          >
            <GlowCard className="certificate-card">
              <div
                className="certificate-image"
                style={IMAGE_CONTAINER_STYLES}
                onClick={() => openModal(certificate.image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(certificate.image);
                  }
                }}
                aria-label={`View ${certificate.title} certificate`}
              >
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} certificate from ${certificate.issuer}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "contain" }}
                  priority={isPriority}
                  loading={isPriority ? "eager" : "lazy"}
                  quality={90}
                />
              </div>

              <div className="certificate-content">
                <h3 className="certificate-title">{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-date">
                  <time dateTime={certificate.date}>{certificate.date}</time>
                </p>
              </div>
            </GlowCard>
          </div>
        );
      }),
    [certificates, isVisible, openModal]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <section id="certificates" className="section">
        <div className="container">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "fade-in-up" : ""
            }`}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            {/* Section Header */}
            <div style={HEADER_STYLES}>
              <h2 className="section-title">Certificates</h2>
              <p style={DESCRIPTION_STYLES}>
                Professional certifications and achievements that demonstrate my
                commitment to continuous learning and expertise.
              </p>
            </div>

            {/* Certificates Grid or Skeleton */}
            {isLoading ? (
              <CertificatesSkeleton />
            ) : (
              <div className="certificates-grid">{certificateCards}</div>
            )}
          </div>
        </div>
      </section>

      {/* Lazy Loaded Image Modal */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="image-modal-close"
              onClick={closeModal}
              aria-label="Close certificate preview"
            >
              ✕
            </button>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={selectedImage}
                alt="Certificate preview"
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                quality={95}
                priority // Modal image should load immediately
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Certificates;
