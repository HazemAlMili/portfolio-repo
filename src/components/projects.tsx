"use client";

import { useMemo, useState, memo } from "react";

import { projects, personalInfo } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import "../styles/Projects.css";

// ============================================================================
// CONSTANTS - Extracted to prevent recreation on every render
// ============================================================================

const HEADER_STYLES = {
  textAlign: "center" as const,
  marginBottom: "4rem",
};

const DESCRIPTION_STYLES = {
  fontSize: "1.125rem",
  color: "var(--muted-foreground)",
  maxWidth: "32rem",
  margin: "0 auto",
} as const;

const IMAGE_CONTAINER_STYLES = {
  position: "relative" as const,
} as const;

const ROLE_CONTAINER_STYLES = {
  marginTop: "1rem",
  marginBottom: "0.75rem",
} as const;

const ROLE_BADGE_STYLES = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "var(--accent)",
  color: "var(--accent-foreground)",
  borderRadius: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: "600" as const,
  border: "1px solid var(--border)",
} as const;

const RESPONSIBILITIES_CONTAINER_STYLES = {
  marginTop: "1rem",
  marginBottom: "1rem",
} as const;

const RESPONSIBILITIES_HEADING_STYLES = {
  fontSize: "0.875rem",
  fontWeight: "600" as const,
  color: "var(--foreground)",
  marginBottom: "0.5rem",
} as const;

const RESPONSIBILITIES_LIST_STYLES = {
  margin: 0,
  paddingLeft: "1.25rem",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)",
  lineHeight: "1.6",
} as const;

const LIST_ITEM_STYLES = {
  marginBottom: "0.25rem",
} as const;

const DEMO_LINK_STYLES = {
  border: "2px solid #000000ff",
} as const;

const ICON_STYLES = {
  marginRight: "0.5rem",
} as const;

const CTA_CONTAINER_STYLES = {
  textAlign: "center" as const,
  marginTop: "4rem",
};

const CTA_TEXT_STYLES = {
  color: "var(--muted-foreground)",
  marginBottom: "1.5rem",
} as const;

// ============================================================================
// RENDER STRATEGY EXPLANATIONS
// ============================================================================

const RENDER_STRATEGY_EXPLANATIONS = {
  CSR: "Client-Side Rendering: The page is rendered in the browser using JavaScript. Fast initial load, but may have slower content display.",
  SSR: "Server-Side Rendering: Pages are rendered on the server for each request. Great for SEO and dynamic content with fresh data on every visit.",
  SSG: "Static Site Generation: Pages are pre-built at build time. Extremely fast, perfect for content that doesn't change often."
} as const;

// ============================================================================
// MAIN COMPONENT - PERFORMANCE: Memoized
// ============================================================================

const Projects = memo(function Projects() {
  // State to track which project's render strategy explanation is shown
  // Format: { [projectTitle]: boolean }
  const [expandedStrategy, setExpandedStrategy] = useState<Record<string, boolean>>({});

  // Toggle explanation for a specific project
  const toggleStrategyExplanation = (projectTitle: string) => {
    setExpandedStrategy(prev => ({
      ...prev,
      [projectTitle]: !prev[projectTitle]
    }));
  };

  // PERFORMANCE: Memoize project card JSX (no individual ScrollReveal per card)
  const projectCards = useMemo(
    () =>
      projects.map((project, index) => {
        // Load first 3 images with priority, rest lazy
        const isPriority = index < 3;

        return (
            <GlowCard key={project.title} className="project-card">
              <div className="project-image" style={IMAGE_CONTAINER_STYLES}>
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.description}`}
                  loading={isPriority ? "eager" : "lazy"}
                  style={{ objectFit: "contain", background: "#080808", width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                />
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* My Role Badge */}
                {project.role && (
                  <div style={ROLE_CONTAINER_STYLES}>
                    <span className="role-badge" style={ROLE_BADGE_STYLES}>
                      <span role="img" aria-label="Role">
                        👤
                      </span>
                      {project.role}
                    </span>
                  </div>
                )}

                {/* Render Strategy Badge */}
                {project.renderStrategy && (
                  <>
                    <div style={ROLE_CONTAINER_STYLES}>
                      <span 
                        className={`render-strategy-badge strategy-${project.renderStrategy.toLowerCase()}`}
                        onClick={() => toggleStrategyExplanation(project.title)}
                        title={
                          project.renderStrategy === "CSR" 
                            ? "Client-Side Rendering" 
                            : project.renderStrategy === "SSR" 
                            ? "Server-Side Rendering" 
                            : "Static Site Generation"
                        }
                      >
                        <span role="img" aria-label="Render Strategy">
                          {project.renderStrategy === "CSR" ? "⚡" : project.renderStrategy === "SSR" ? "🔄" : "📄"}
                        </span>
                        {project.renderStrategy}
                      </span>
                    </div>
                    
                    {/* Explanation - appears when badge is clicked */}
                    {expandedStrategy[project.title] && (
                      <div className="strategy-explanation">
                        <p>{RENDER_STRATEGY_EXPLANATIONS[project.renderStrategy]}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Key Responsibilities */}
                {project.responsibilities &&
                  project.responsibilities.length > 0 && (
                    <div style={RESPONSIBILITIES_CONTAINER_STYLES}>
                      <h4 style={RESPONSIBILITIES_HEADING_STYLES}>
                        Key Contributions:
                      </h4>
                      <ul style={RESPONSIBILITIES_LIST_STYLES}>
                        {project.responsibilities.map((responsibility, idx) => (
                          <li key={idx} style={LIST_ITEM_STYLES}>
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
                    style={DEMO_LINK_STYLES}
                    aria-label={`View ${project.title} demo`}
                  >
                    <span style={ICON_STYLES} role="img" aria-label="Link">
                      🔗
                    </span>
                    Demo
                  </a>

                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    aria-label={`View ${project.title} source code`}
                  >
                    <span style={ICON_STYLES} role="img" aria-label="Code">
                      💻
                    </span>
                    Code
                  </a>
                </div>
              </div>
            </GlowCard>
        );
      }),
    [expandedStrategy] // Re-render when explanation state changes
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <ScrollReveal>
          {/* Section Header */}
          <div style={HEADER_STYLES}>
            <h2 className="section-title">My Projects</h2>
            <p style={DESCRIPTION_STYLES}>
              Here are some of the projects I have worked on, showcasing my
              skills in front-end and full-stack development using modern web technologies.
            </p>
          </div>

          {/* Projects Grid - PERFORMANCE: Batched stagger */}
          <ScrollReveal staggerChildren staggerDelay={0.1}>
            <div className="projects-grid">{projectCards}</div>
          </ScrollReveal>

          {/* Call to Action */}
          <div style={CTA_CONTAINER_STYLES}>
            <p style={CTA_TEXT_STYLES}>
              Interested in seeing more of my work?
            </p>
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
              aria-label="View all projects on GitHub"
            >
              <span style={ICON_STYLES} role="img" aria-label="Code">
                💻
              </span>
              View All Projects on GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default Projects;
