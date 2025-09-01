"use client";

import type React from "react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById("contact");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on typing
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.phone.trim().length < 11) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

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
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatusMessage("✅ Message sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: unknown) {
      const msg = (err as null)
        ? (err as Error)
          ? "Unknown EmailJS error"
          : "Unknown error"
        : "Unknown error";
      console.error("EmailJS error:", msg);
      setStatusMessage("❌ Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "fade-in-up" : ""
          }`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
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

          <div className="contact-grid">
            {/* Contact Form */}
            <div
              className={`card ${isVisible ? "fade-in-right" : ""}`}
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <div className="card-header">
                <h3>Send a Message</h3>
              </div>
              <div className="card-content">
                <form action="http://localhost:5678/webhook-test" method="POST" onSubmit={handleSubmit} className="contact-form">
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
                      className="form-input"
                    />
                    {errors.name && (
                      <p className="error-message" style={{ color: "red" }}>
                        {errors.name}
                      </p>
                    )}
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
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="error-message" style={{ color: "red" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    {errors.phone && (
                      <p className="error-message" style={{ color: "red" }}>
                        {errors.phone}
                      </p>
                    )}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
