"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/Certificates.css";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch certificates data
    fetch("/certificates.json")
      .then((response) => response.json())
      .then((data) => setCertificates(data))
      .catch((error) => console.error("Error loading certificates:", error));

    // Intersection observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("certificates");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

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
  }, [selectedImage]);

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
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2 className="section-title">Certificates</h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "var(--muted-foreground)",
                  maxWidth: "32rem",
                  margin: "0 auto",
                }}
              >
                Professional certifications and achievements that demonstrate my
                commitment to continuous learning and expertise.
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="certificates-grid">
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.title}
                  className={`certificate-card ${
                    isVisible ? "fade-in-up" : ""
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div
                    className="certificate-image"
                    style={{ position: "relative" }}
                    onClick={() => openModal(certificate.image)}
                  >
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div className="certificate-content">
                    <h3 className="certificate-title">{certificate.title}</h3>
                    <p className="certificate-issuer">{certificate.issuer}</p>
                    <p className="certificate-date">{certificate.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="image-modal-close" onClick={closeModal}>
              ✕
            </button>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={selectedImage}
                alt="Certificate preview"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Certificates;
