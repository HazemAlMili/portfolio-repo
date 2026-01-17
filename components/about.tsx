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
            {/* Left Column - About Text & Skills */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
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
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <h3 className="text-3xl font-bold mb-8 text-foreground">Technical Expertise</h3>
                
                <div className="flex flex-col gap-10">
                  {["Frontend", "Backend", "Tools"].map((category) => (
                    <div key={category}>
                      <h4 className="text-xl  font-semibold mb-6 text-muted-foreground border-l-4 border-accent pl-4">
                        {category} Development
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {skills
                          .filter((s) => s.category === category)
                          .map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                              <ScrollReveal
                                key={skill.name}
                                delay={index * 50}
                                direction="up"
                                distance={20}
                              >
                                <GlowCard 
                                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl transition-all duration-500 hover:-translate-y-2 flex flex-col min-h-[160px]"
                                  glowColor={`${skill.color}33`}
                                  glowSize={250}
                                >
                                  <div className="flex flex-col items-center justify-center p-6 flex-1 w-full gap-2">
                                  {/* Icon with Brand Color Transition */}
                                  <div 
                                      className="transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                    style={{ color: skill.color }}
                                  >
                                      <IconComponent size={48} />
                                  </div>
                                  
                                  {/* Skill Info */}
                                    <div className="text-center w-full mt-2">
                                      <h5 className="text-sm font-bold text-foreground tracking-wider uppercase">
                                      {skill.name}
                                    </h5>
                                    
                                  </div>
                                  </div>

                                  {/* Bottom Gradient Line */}
                                  <div 
                                    className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
                                  />
                                </GlowCard>
                              </ScrollReveal>
                            );
                          })}
                      </div>
                    </div>
                  ))}
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