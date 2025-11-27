"use client"

import { skills, features } from "@/lib/data"
import ScrollReveal from "./ScrollReveal"
import "../styles/About.css"

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <ScrollReveal>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">About Me</h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
                maxWidth: "32rem",
                margin: "0 auto",
              }}
            >
              Get to know more about my background, skills, and what drives my
              passion for web development.
            </p>
          </div>

          <div className="about-grid">
            {/* Left Column - About Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <p className="about-text">
                  Hello! I am Hazem Al-Melli, a dedicated front-end developer
                  with a passion for creating exceptional digital experiences.
                  My journey in web development began with a curiosity about how
                  websites work, and it has evolved into a deep love for
                  crafting beautiful, functional, and user-friendly interfaces.
                </p>
                <p className="about-text">
                  I specialize in modern web technologies including HTML5, CSS3,
                  JavaScript, and React. My approach combines technical
                  expertise with creative problem-solving to deliver solutions
                  that not only look great but also provide excellent user
                  experiences.
                </p>
                <p className="about-text">
                  When I am not coding, I enjoy staying up-to-date with the
                  latest web development trends, contributing to open-source
                  projects, and continuously learning new technologies to
                  enhance my skill set.
                </p>
              </div>

              {/* Skills Progress Bars */}
              <div className="skills-section">
                <h3>Technical Skills</h3>
                {skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <ScrollReveal
                        className="skill-progress"
                        delay={index * 100}
                        style={{
                          width: `${skill.level}%`,
                          height: "100%",
                          backgroundColor: "var(--accent)",
                          borderRadius: "4px",
                        }}
                      >
                        {/* Empty content for the bar itself, ScrollReveal handles the animation */}
                      </ScrollReveal>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <ScrollReveal
                  key={feature.title}
                  className="card feature-card"
                  delay={index * 150}
                >
                  <div className="feature-icon" style={{ fontSize: "2rem" }}>
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
export default About