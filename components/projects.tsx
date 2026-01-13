"use client";

import Image from "next/image";
import { projects, personalInfo } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import "../styles/Projects.css";

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <ScrollReveal>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">My Projects</h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
                maxWidth: "32rem",
                margin: "0 auto",
              }}
            >
              Here are some of the projects I have worked on, showcasing my
              skills in front-end development and modern web technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                className="project-card"
                delay={index * 150}
              >
                <div className="project-image" style={{ position: "relative" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* My Role Badge */}
                  {project.role && (
                    <div style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
                      <span 
                        className="role-badge"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <span>👤</span>
                        {project.role}
                      </span>
                    </div>
                  )}

                  {/* Key Responsibilities */}
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--foreground)',
                        marginBottom: '0.5rem',
                      }}>
                        Key Contributions:
                      </h4>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        fontSize: '0.875rem',
                        color: 'var(--muted-foreground)',
                        lineHeight: '1.6',
                      }}>
                        {project.responsibilities.map((responsibility, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="project-links">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ border: "2px solid #000000ff" }}
                    >
                      <span style={{ marginRight: "0.5rem" }}>🔗</span>
                      Demo
                    </a>

                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <span style={{ marginRight: "0.5rem" }}>💻</span>
                      Code
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <p
              style={{
                color: "var(--muted-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Interested in seeing more of my work?
            </p>
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <span style={{ marginRight: "0.5rem" }}>💻</span>
              View All Projects on GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
export default Projects;
