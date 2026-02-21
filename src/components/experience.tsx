"use client";

import { memo } from "react";
import { experiences } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { Briefcase, MapPin, Calendar, Sparkles } from "lucide-react";
import "../styles/Experience.css";

// PERFORMANCE: Memoized to prevent unnecessary re-renders
const Experience = memo(function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        {/* Story Introduction */}
        <ScrollReveal>
          <div className="story-intro">
            <div className="intro-badge">
              <Sparkles size={16} />
              <span>My Journey</span>
            </div>
            <h2 className="section-title">The Story So Far</h2>
            <p className="story-description">
              From sales floors to tech leadership, here's the journey that shaped me 
              into the developer I am today. Each chapter brought new lessons, 
              challenges, and growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Timeline - Each experience appears sequentially */}
        <div className="story-timeline">
          {experiences.map((exp, index) => (
            <ScrollReveal 
              key={`${exp.company}-${exp.role}-${index}`}
              delay={index * 100}
              direction="up"
              distance={30}
            >
              <div className="story-chapter">
                {/* Chapter Number */}
                <div className="chapter-marker">
                  <div className="chapter-line" />
                  <div className="chapter-number">
                    <span className="chapter-text">Chapter</span>
                    <span className="chapter-index">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={`chapter-dot ${exp.current ? "current" : ""}`}>
                    {exp.current && <div className="pulse-ring" />}
                  </div>
                </div>

                {/* Story Card */}
                <div className="story-card">
                  {/* Current Badge */}
                  {exp.current && (
                    <div className="current-label">
                      <span className="pulse-indicator" />
                      Currently Writing This Chapter
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="story-header">
                    <div className="company-badge">
                      <div className="badge-icon">
                        <Briefcase size={20} />
                      </div>
                      <div className="badge-content">
                        <h3 className="role-title">{exp.role}</h3>
                        <h4 className="company-name">{exp.company}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Story Meta */}
                  <div className="story-meta">
                    <div className="meta-item">
                      <Calendar size={14} className="meta-icon" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="meta-divider">•</div>
                    <div className="meta-item">
                      <MapPin size={14} className="meta-icon" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="story-content">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="story-paragraph">
                        <div className="paragraph-marker">
                          <div className="marker-dot" />
                        </div>
                        <p className="paragraph-text">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chapter Footer - Transition */}
                  {index < experiences.length - 1 && (
                    <div className="chapter-transition">
                      <div className="transition-line" />
                      <span className="transition-text">And then...</span>
                      <div className="transition-line" />
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Story Ending */}
        <ScrollReveal delay={300}>
          <div className="story-ending">
            <div className="ending-decoration">
              <div className="ending-dot" />
              <div className="ending-line" />
            </div>
            <p className="ending-text">
              The story continues... What's the next chapter? 
              <span className="ending-highlight"> Let's write it together.</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default Experience;
