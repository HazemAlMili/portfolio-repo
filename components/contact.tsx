"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 👀 مراقبة القسم مشان fade-in animation
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
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // 📝 تحديث بيانات الفورم
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📤 الإرسال عبر EmailJS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatusMessage("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const msg =
        (err as any)?.text ||
        (err as Error)?.message ||
        "Unknown EmailJS error";
      console.error("EmailJS error:", msg);
      setStatusMessage("❌ Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // 🧾 بيانات التواصل (الكروت الجانبية)
  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hazemalmili77@gmail.com",
      link: "mailto:hazemalmili77@gmail.com",
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
              Let&apos;s discuss how we can work together to bring your ideas to
              life.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h3 style={{ textAlign: "center" }}>Let&apos;s Connect</h3>
              <p style={{ textAlign: "center" }}>
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I&apos;d love to hear from you. Feel free to
                reach out through any of the channels below.
              </p>

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
                    disabled={isSending}
                  >
                    {isSending ? "⏳ Sending..." : "📤 Send Message"}
                  </button>

                  {/* Status Message */}
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
