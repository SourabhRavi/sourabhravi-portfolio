// Update these values before publishing. Empty URLs are intentionally hidden in the UI.
export const profile = {
  name: "Sourabh Ravi",
  role: "Product-minded Software Engineer",
  location: "India · Open to remote & relocation",
  email: "sourabh.k.ravi@gmail.com",
  github: "https://github.com/SourabhRavi",
  linkedin: "https://www.linkedin.com/in/sourabh-k-ravi/",
  resume: "",
  upwork: "",
};

export const projects = [
  {
    number: "01",
    name: "COTE",
    type: "REAL-TIME COLLABORATION",
    tagline: "A calmer place for teams to think out loud.",
    description:
      "A Slack-inspired collaboration product built around fast conversations and shared context. The experience brings real-time messaging, workspace structure and practical team workflows into one focused space.",
    contribution: "Product engineering · Full-stack development",
    stack: ["React", "TypeScript", "Socket.io", "Prisma", "PostgreSQL"],
    url: "https://cote.sourabhravi.site",
    visual: "cote",
    accent: "lime",
  },
  {
    number: "02",
    name: "SKIM",
    type: "AI · DOCUMENT INTELLIGENCE",
    tagline: "Turn long documents into useful answers.",
    description:
      "An AI-powered PDF knowledge assistant that lets people ask questions across their documents, retrieve relevant context and get answers grounded in source material instead of manually searching page after page.",
    contribution: "Product engineering · RAG integration",
    stack: ["React", "TypeScript", "Node.js", "Qdrant", "MongoDB"],
    url: "https://skim.sourabhravi.site",
    visual: "skim",
    accent: "violet",
  },
  // {
  //   number: "03",
  //   name: "RAG PDF CHAT",
  //   type: "GENERATIVE AI · KNOWLEDGE RETRIEVAL",
  //   tagline: "A practical interface for asking better questions.",
  //   description:
  //     "An end-to-end retrieval-augmented generation application combining a React interface, an Express backend, embeddings and vector search to make private PDF knowledge easier to explore.",
  //   contribution: "Frontend · API integration · Retrieval workflow",
  //   stack: ["React", "Vite", "Express", "Gemini Embeddings", "Qdrant"],
  //   url: "",
  //   visual: "rag",
  //   accent: "cyan",
  // },
];

export const experience = [
  {
    period: "MAR 2025 — JUL 2026",
    company: "IBM",
    role: "Application Developer",
    detail:
      "Built production React, Angular and TypeScript features for Barclays’ Risk & Finance Treasury platform. Developed data-dense enterprise workflows with interactive grids, advanced filtering, persistent state and multi-step approvals. Worked across a microfrontend environment, integrating REST APIs and collaborating with UX, product, backend and QA teams.",
    tags: [
      "React",
      "Angular",
      "TypeScript",
      "Microfrontends",
      "REST APIs",
      "Enterprise UI",
    ],
  },
  {
    period: "AUG 2023 — JAN 2025",
    company: "Mobiux Labs",
    role: "Software Engineer",
    detail:
      "Built React purchase journeys and API-connected workflows for the Wakefield Trinity ticketing platform, serving 15,000+ users. Re-architected Terra.Do’s LMS with reusable components, reducing load times by 40%. Also developed Next.js facility-management experiences for Aurbius Business Parks, including data-heavy tables, filtering, bulk uploads and approval workflows.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Performance",
      "REST & GraphQL",
      "15K+ Users",
    ],
  },
  {
    period: "JAN 2023 — MAY 2023",
    company: "Envsage Cloud Solutions",
    role: "Frontend Engineer",
    detail:
      "Developed learning experiences for Edumentors UK’s LMS and cross-platform applications for NxtOrbit using React, TypeScript, Ionic and Capacitor. Contributed to products including Bosch PMI, ClassTym, Kotak and CoachPro, building data-intensive interfaces with advanced filtering, sorting, virtualized rows and multi-step workflows.",
    tags: [
      "React",
      "TypeScript",
      "Ionic",
      "Capacitor",
      "Redux Toolkit",
      "Angular",
    ],
  },
  {
    period: "AUG 2022 — NOV 2022",
    company: "Petpooja",
    role: "Software Developer",
    detail:
      "Improved production React.js UI performance by 20% through rendering and bundle-import optimizations. Maintained automated tests and used browser DevTools and root-cause analysis to diagnose defects and improve application reliability.",
    tags: [
      "React",
      "JavaScript",
      "Performance Optimization",
      "Testing",
      "Debugging",
    ],
  },
  {
    period: "JUN 2021 — JUN 2022",
    company: "DevX",
    role: "Website Developer",
    detail:
      "Built and optimized a React-based coworking and facility-booking product. Developed responsive interfaces, reusable components, advanced search and filtering, persistent state and API-connected booking flows. Improved performance by 35% and achieved Google PageSpeed scores above 90.",
    tags: [
      "React",
      "JavaScript",
      "Responsive UI",
      "API Integration",
      "Performance",
    ],
  },
];

export const capabilities = [
  {
    index: "01",
    title: "Frontend engineering",
    description:
      "Responsive, accessible interfaces with deliberate component architecture, thoughtful state management and a strong eye for interaction detail.",
    tools: "React · TypeScript · Angular · Next.js",
  },
  {
    index: "02",
    title: "Product-minded full stack",
    description:
      "Comfort moving beyond the UI into APIs, data models and the systems that make a product useful end to end.",
    tools: "Node.js · Express · PostgreSQL · Prisma",
  },
  {
    index: "03",
    title: "AI-powered experiences",
    description:
      "Practical AI features that connect useful interfaces to retrieval, embeddings and grounded document workflows.",
    tools: "RAG · Qdrant · Gemini · MongoDB",
  },
  {
    index: "04",
    title: "Motion & experience",
    description:
      "Interfaces with personality, using motion as feedback and storytelling rather than decoration for decoration's sake.",
    tools: "GSAP · ScrollTrigger · CSS animation",
  },
];
