"use client"

import { skills, features } from "@/lib/data"
import ScrollReveal from "./ScrollReveal"
import GlowCard from "./GlowCard"
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

              {/* Skills Grid Cards */}
              <div className="skills-section">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Technical Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <ScrollReveal
                        key={skill.name}
                        delay={index * 100}
                      >
                        <GlowCard className="group relative bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-lg hover:shadow-accent/20 flex flex-col items-center justify-center gap-3 min-h-[140px]">
                          {/* Icon */}
                          <div className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <IconComponent size={40} />
                          </div>
                          
                          {/* Skill Name */}
                          <h4 className="text-sm font-semibold text-foreground text-center leading-tight">
                            {skill.name}
                          </h4>
                          
                          {/* Decorative accent line */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg" />
                        </GlowCard>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <ScrollReveal
                  key={feature.title}
                  delay={index * 150}
                >
                  <GlowCard className="card feature-card">
                    <div className="feature-icon" style={{ fontSize: "2rem" }}>
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </GlowCard>
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