"use client";

import { useEffect, useState } from "react";

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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (formData.phone.trim().length < 11)
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
      // إرسال البيانات لـ n8n Webhook
      const response = await fetch(
        "https://hazemalmelli.app.n8n.cloud/webhook-test/7eb25607-aabe-45c9-8c7e-4562138568d7",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to send to n8n");

      // كل شيء ناجح
      setFormData({ name: "", phone: "", email: "", message: "" });
      setStatusMessage("✅ Message sent successfully via WhatsApp!");
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
            <div
              className={`card ${isVisible ? "fade-in-right" : ""}`}
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <div className="card-header">
                <h3>Send a Message</h3>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit} className="contact-form">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
