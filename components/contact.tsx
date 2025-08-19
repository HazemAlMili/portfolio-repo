"use client";

import type React from "react";
import { useEffect, useState } from "react";
import "../styles/Contact.css";


function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:hazem.almelli@example.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hazemalmili77@gmail.com",
      link: "mailto:hazem.almelli@example.com",
    },
    {
      icon: "💻",
      title: "GitHub",
      value: "HazemAlMili",
      link: "https://github.com/HazemAlMili",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "hazem-al-melli",
      link: "https://www.linkedin.com/in/hazem-al-melli-a0a0992a5",
    },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "fade-in-up" : ""
          }`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">Get In Touch</h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
                maxWidth: "32rem",
                margin: "0 auto",
              }}
            >
              I am always interested in new opportunities and collaborations.
              Lets discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info" >
              <h3 style={{ textAlign: "center" }}>Lets Connect</h3>
              <p style={{ textAlign: "center", }}>
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I d love to hear from you. Feel free to reach
                out through any of the channels below.
              </p>

              {/* Contact Cards */}
              <div className="contact-cards">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className={`card contact-card ${
                      isVisible ? "fade-in-left" : ""
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="contact-card-icon"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="contact-card-title">{info.title}</h4>
                        <p className="contact-card-value">{info.value}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`card ${isVisible ? "fade-in-right" : ""}`}
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <div className="card-header">
                <h3>Send a Message</h3>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or just say hello..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%" }}
                  >
                    <span style={{ marginRight: "0.5rem" }}>📤</span>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
