"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import "../styles/Contact.css"; // We will need to update or create this CSS file

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (formData.phone.trim().length < 10)
      newErrors.phone = "Please enter a valid phone number.";
    if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusMessage("⚠️ Please fix the errors above.");
      return;
    }

    setIsSending(true);
    setStatusMessage("");

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          "service_i0g23go",
          "template_yl9m944",
          formRef.current,
          "2Qz2FokxzYrt9blZ0"
        );
        setFormData({ name: "", phone: "", email: "", message: "" });
        setStatusMessage("✅ Message sent successfully!");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <ScrollReveal>
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
              Let’s discuss how we can work together to bring your ideas to
              life.
            </p>
          </div>

          <div className="contact-grid-layout">
            {/* Contact Info Card */}
            <ScrollReveal delay={200}>
              <GlowCard className="contact-info-card">
                <h3>Contact Information</h3>
                <p className="contact-info-text">
                  Feel free to reach out to me directly through any of these
                  channels.
                </p>

                <div className="contact-details">
                  <div className="contact-item">
                    <span className="icon">📧</span>
                    <a href={`mailto:${personalInfo.email}`}>
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="icon">📞</span>
                    <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                  </div>
                  <div className="contact-item">
                    <span className="icon">📍</span>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                <div className="social-connect">
                  <h4>Connect with me</h4>
                  <div className="social-icons">
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      GitHub
                    </a>
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={personalInfo.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      Instagram
                    </a>
                    <a
                      href={personalInfo.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={400}>
              <GlowCard className="card contact-form-card">
                <div className="card-header">
                  <h3>Send a Message</h3>
                </div>
                <div className="card-content">
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >
                    {["name", "email", "phone"].map((field) => (
                      <div className="form-group" key={field}>
                        <label htmlFor={field} className="form-label">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          placeholder={`Enter your ${field}`}
                          value={(formData as Record<string, string>)[field]}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                        {errors[field] && (
                          <p className="error-message" style={{ color: "red" }}>
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}

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
                        className="form-textarea"
                      />
                      {errors.message && (
                        <p className="error-message" style={{ color: "red" }}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ width: "100%" }}
                      disabled={isSending}
                    >
                      {isSending ? "Sending..." : "📤 Send Message"}
                    </button>
                  </form>

                  {statusMessage && (
                    <p
                      style={{
                        marginTop: "1rem",
                        textAlign: "center",
                        color: statusMessage.startsWith("✅") ? "green" : "red",
                      }}
                    >
                      {statusMessage}
                    </p>
                  )}
                </div>
              </GlowCard>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Contact;
