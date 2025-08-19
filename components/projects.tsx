"use client";

import { useEffect, useState } from "react";
import "../styles/Projects.css";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  image: null;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch projects data
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error loading projects:", error));

    // Intersection observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "fade-in-up" : ""
          }`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
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
              <div
                key={project.title}
                className={`project-card ${isVisible ? "fade-in-up" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div style={{ overflow: "hidden", cursor: "pointer" }}>
                  <img
                    src={`${project.image}` || "/images/projects/default.png"}
                    alt={`${project.title} screenshot`}
                    className="project-image"
                  />
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

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
                    >
                      <span style={{ marginRight: "0.5rem" }}>🔗</span>
                      Live Demo
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
              </div>
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
              href="https://github.com/HazemAlMili"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <span style={{ marginRight: "0.5rem" }}>💻</span>
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Projects;
