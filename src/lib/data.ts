export const personalInfo = {
  name: "Hazem Al-Melli",
  titles: ["Web Developer"],
  email: "hazemalmili77@gmail.com",
  phone: "01091175339", // Update with your actual phone number
  location: "Cairo, Egypt", // Update with your actual location
  socialLinks: {
    github: "https://github.com/HazemAlMili",
    linkedin: "https://www.linkedin.com/in/hazem-al-melli",
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
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiGit,
  SiGithub,
  SiSupabase,
  SiFramer,
  SiOpenai,
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  category: "Frontend" | "Backend" | "Tools";
  color: string;
  proficiency: number; // 0-100
}

export const skills: Skill[] = [
  { name: "HTML5", icon: SiHtml5, category: "Frontend", color: "#E34F26", proficiency: 95 },
  { name: "CSS3", icon: SiCss3, category: "Frontend", color: "#1572B6", proficiency: 90 },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend", color: "#F7DF1E", proficiency: 92 },
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB", proficiency: 90 },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#FFFFFF", proficiency: 88 },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178C6", proficiency: 85 },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", color: "#06B6D4", proficiency: 92 },
  { name: "Bootstrap", icon: SiBootstrap, category: "Frontend", color: "#7952B3", proficiency: 85 },
  { name: "Node.js", icon: SiNodedotjs, category: "Backend", color: "#339933", proficiency: 80 },
  { name: "MongoDB", icon: SiMongodb, category: "Backend", color: "#47A248", proficiency: 82 },
  { name: "Express.js", icon: SiExpress, category: "Backend", color: "#FFFFFF", proficiency: 80 },
  { name: "Git", icon: SiGit, category: "Tools", color: "#F05032", proficiency: 85 },
  { name: "GitHub", icon: SiGithub, category: "Tools", color: "#fafafa", proficiency: 80 },
  { name: "Supabase", icon: SiSupabase, category: "Backend", color: "#3ECF8E", proficiency: 85 },
  { name: "Framer Motion", icon: SiFramer, category: "Frontend", color: "#0055FF", proficiency: 88 },
  { name: "Artificial Intelligence", icon: SiOpenai, category: "Tools", color: "#10a37f", proficiency: 80 },
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
    title: "Hireny AI",
    description:
      "An AI-powered job board featuring automated resume evaluation. Built with a premium Next-Gen UI featuring Glassmorphism, Bento Grid layouts, and cinematic animations.",
    role: "Full-Stack Developer & Architect",
    responsibilities: [
      "Architected and built the full-stack application using Supabase cloud-native stack",
      "Implemented AI-powered resume evaluation systems",
      "Designed a premium Next-Gen UI with Glassmorphism, Bento Grid, and Framer Motion",
      "Integrated Supabase for Authentication, Database, and Storage (Resume uploads)",
      "Developed a Node.js/Express backend queue processor for AI analysis"
    ],
    technologies: ["React", "TypeScript", "Supabase", "TailwindCSS", "Vite", "Artificial Intelligence"],
    renderStrategy: "CSR" as const,
    demoLink: "https://hirenyai.vercel.app/",
    codeLink: "https://github.com/HazemAlMili/Hireny_AI",
    image: "/hirenyai.png",
  },
  {
    title: "Enactus Final Project (Puresha)",
    description:
      "A comprehensive social impact front-end platform built for Enactus CIC. It features a fully responsive design, custom-built UI components, and optimized assets for a seamless user experience.",
    role: "Frontend Developer",
    responsibilities: [
      "Architected and built the entire user interface using modern semantic HTML and CSS",
      "Developed a modular component system with Bootstrap for rapid and consistent design",
      "Implemented complex interactive features and state management using vanilla JavaScript",
      "Optimized project assets and performance to meet high-standard presentation requirements",
      "Ensured cross-browser compatibility and fully responsive layouts across all device sizes"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap","Responsive Design"],
    renderStrategy: "SSG" as const,
    demoLink: "https://hazemalmili.github.io/Puresha/",
    codeLink: "https://github.com/HazemAlMili/final-project",
    image: "/puresha.png",
  },
  {
    title: "GDG Final Project (Real Estate)",
    description:
      "A modern real estate marketplace designed to connect buyers with properties. Features include dynamic property listings, advanced filtering systems, and a React-powered architecture for high performance.",
    role: "Frontend Developer (Team Project)",
    responsibilities: [
      "Developed highly reusable property listing and detail components using React and JSX",
      "Implemented advanced search and multi-layer filtering functionality for property discovery",
      "Collaborated with the development team to architect a scalable and efficient React structure",
      "Integrated interactive maps and dynamic data rendering to enhance the browsing experience",
      "Utilized Bootstrap and custom CSS to create a premium, mobile-first user interface"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "ReactJS"],
    renderStrategy: "CSR" as const,
    demoLink: "https://hazemalmili.github.io/GDG-Final-Project",
    codeLink: "https://github.com/HazemAlMili/GDG-Final-Project",
    image: "/real-estate.png",
  },
  {
    title: "Enactus Portal",
    description:
      "An advanced enterprise resource planning (ERP) system designed for Enactus CIC. It streamlines operations by managing thousands of member records, tracking performance metrics, and gamifying the experience with XP and leaderboards.",
    role: "Full-Stack Developer & Project Lead",
    responsibilities: [
      "Architected the full-stack system using Next.js and Node.js for high availability and performance",
      "Designed and implemented a complex MongoDB schema and Mongoose models for data integrity",
      "Developed a secure authentication system with multi-level role-based access control (RBAC)",
      "Built a sophisticated admin dashboard with real-time analytics and departmental management",
      "Integrated a performance-driven leaderboard system to track and reward member contributions"
    ],
    technologies: ["Next.js", "MongoDB", "Mongoose", "TailwindCSS", "Node.js"],
    renderStrategy: "SSR" as const,
    demoLink: "https://enactus-portal.vercel.app/",
    codeLink: "https://github.com/HazemAlMili/enactus-portal", 
    image: "/overview.png",
  }
];

// Experience data
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    company: "Enactus CIC",
    role: "Head of Information Technology Department",
    duration: "September 2025 - Present",
    location: "Cairo, Egypt",
    current: true,
    achievements: [
      "Leading a multidisciplinary team to deliver high-impact digital solutions",
      "Spearheaded the technical roadmap and system architecture for the organization's portal, ensuring scalability and performance",
      "Expert in bridging the gap between social impact goals and technical execution",
      "Mentoring junior developers and optimizing team workflows"
    ]
  },
  {
    company: "Nahdet Misr Publishing Group",
    role: "Usher",
    duration: "January 2026",
    location: "New Cairo, Egypt",
    achievements: [
      "Represented Nahdet Masr at the Cairo International Book Fair",
      "Proactively engaged with diverse audiences to deliver persuasive product pitches",
      "Drove sales through exceptional communication and customer guidance"
    ]
  },
  {
    company: "Microsoft Student Club - CIC",
    role: "Frontend Mentor",
    duration: "December 2025 - Present",
    location: "El Sheikh Zaid, Al Jizah, Egypt",
    current: true,
    achievements: [
      "Mentoring students in modern frontend development practices",
      "Conducting workshops on React, TypeScript, and web performance",
      "Fostering a collaborative learning environment"
    ]
  },
  {
    company: "Google Developer Groups on Campus: CIC",
    role: "Frontend Developer",
    duration: "April 2025 - July 2025",
    location: "6th of October, Al Jizah, Egypt",
    achievements: [
      "Developed front-end applications using HTML, CSS, JavaScript, and React.js, enhancing user experience",
      "Collaborated with team members to improve communication and teamwork skills, fostering a productive environment",
      "Engaged in continuous learning to stay updated with industry trends, contributing to personal and team growth"
    ]
  },
  {
    company: "Enactus CIC",
    role: "Member of Information Technology Department",
    duration: "October 2024 - September 2025",
    location: "Egypt",
    achievements: [
      "Played a key role in the Frontend Development Team, focusing on creating a new responsive website",
      "Utilized HTML, CSS, and JavaScript with Bootstrap to ensure the site was user-friendly",
      "Met the presentation standards for National Competition (NC)",
      "Enhanced web development skills while contributing to a mission-driven startup"
    ]
  },
  {
    company: "Rayahen Roastery",
    role: "Sales Director",
    duration: "February 2024 - September 2024",
    location: "6th of October, Egypt",
    achievements: [
      "Led sales strategy and team management",
      "Improved customer engagement and satisfaction",
      "Drove revenue growth through strategic initiatives"
    ]
  },
  {
    company: "Rayahen Roastery",
    role: "Sales Specialist",
    duration: "June 2016 - June 2017",
    location: "6th of October, Egypt",
    achievements: [
      "Delivered exceptional customer service",
      "Achieved sales targets consistently",
      "Built strong customer relationships"
    ]
  }
];

