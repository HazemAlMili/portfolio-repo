export const personalInfo = {
  name: "Hazem Al-Melli",
  titles: ["Web Developer", "Front-End Developer"],
  email: "hazemalmili77@gmail.com",
  phone: "01091175339", // Update with your actual phone number
  location: "Cairo, Egypt", // Update with your actual location
  socialLinks: {
    github: "https://github.com/HazemAlMili",
    linkedin: "https://www.linkedin.com/in/hazem-al-melli-a0a0992a5",
    instagram: "https://www.instagram.com/hazem_almelli/",
    facebook: "https://www.facebook.com/HazemAlMelli/",
  },
};

import { 
  SiHtml5,
  SiCss3, 
  SiJavascript, 
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  category?: string;
}

export const skills: Skill[] = [
  { name: "HTML5", icon: SiHtml5, category: "Frontend" },
  { name: "CSS3", icon: SiCss3, category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "Bootstrap", icon: SiBootstrap, category: "Frontend" },
];

export const features = [
  {
    icon: "💻",
    title: "Clean Code",
    description:
      "Writing maintainable, scalable, and well-documented code following best practices.",
  },
  {
    icon: "🎨",
    title: "Modern Design",
    description:
      "Creating beautiful, intuitive interfaces with attention to detail and user experience.",
  },
  {
    icon: "📱",
    title: "Responsive",
    description:
      "Building websites that work perfectly across all devices and screen sizes.",
  },
  {
    icon: "⚡",
    title: "Performance",
    description:
      "Optimizing websites for speed, accessibility, and search engine visibility.",
  },
];

export const projects = [
  {
    title: "Enactus Final Project (Puresha)",
    description:
      "A complete front-end project for Enactus built with HTML, CSS, JavaScript, and Bootstrap.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    demoLink: "https://hazemalmili.github.io/Puresha/",
    codeLink: "https://github.com/HazemAlMili/final-project",
    image: "/puresha.png",
  },
  {
    title: "GDG Final Project (Real Estate)",
    description:
      "A real estate website project built with HTML, CSS, JavaScript, Bootstrap, and ReactJS.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "ReactJS"],
    demoLink: "https://mohamedabuzahda.github.io/Real-State/",
    codeLink: "https://github.com/mohamedabuzahda/Real-State",
    image: "/real-estate.png",
  },
  {
  title: "Enactus Portal",
  description:
    "A full-stack management system for Enactus organization members. Optimized for tracking tasks, rewarding XP, and managing departmental leaderboards with role-based access control.",
  technologies: ["Next.js", "MongoDB", "Mongoose", "TailwindCSS", "Node.js"],
  demoLink: "https://enactus-portal.vercel.app/",
  codeLink: "https://github.com/HazemAlMili/enactus-portal", 
  image: "/overview.png",
}
];

