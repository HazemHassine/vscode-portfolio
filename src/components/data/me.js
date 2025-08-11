export const me = {
  name: "Mohamed Hazem Hassine",
  title: "AI Engineering student · UX Data Analysis (Werkstudent) · Full-stack-ish",
  tagline: "I build stylish UIs, AI/ML backends, and UX analytics that turn user behavior into actionable insights.",
  location: "Germany",

  availability: {
    currentRole: "Werkstudent – UX Data Analysis @ Siemens",
    startDateISO: "2025-08-06",
    weeklyHours: 20,
    openTo: [ "Collaboration"],
    semesterBreakNote: "Can work full-time during break (Sep 1 – Oct 12, 2025)."
  },

  summary: [
    "M.Sc. AI Engineering (University of Passau); admitted to M.Sc. Intelligent Interactive Systems (Bielefeld, starting Oct 2025).",
    "Focus areas: UX analytics with AI, RL (PPO / Rainbow DQN), Next.js/React/Tailwind, and data pipelines.",
    "Hands-on with agentic/RAG patterns, classic ML, and production-grade dashboards."
  ],

  interests: ["UX Analytics", "Reinforcement Learning", "Agentic RAG", "Machine Learning", "Visual Analytics"],

  skills: {
    programming_tools: [
      "Python", "JavaScript", "C/C++", "Pandas", "NumPy", "Matplotlib", "OpenCV",
      "NLTK", "LangChain", "SQL (PostgreSQL, MySQL)", "Linux", "Power BI", "Git"
    ],
    machine_learning: [
      "Supervised & Unsupervised Learning", "Data Preprocessing & Feature Engineering",
      "Model Evaluation & Hyperparameter Tuning", "Scikit-learn", "PyTorch"
    ],
    web_tech: [
      "React", "Next.js", "Tailwind CSS", "MongoDB", "Firebase",
      "REST APIs", "Flask", "Django", "Monaco Editor"
    ],
    soft_skills: ["Analytical Thinking", "Communication & Teaching", "Agile & Team Collaboration"],
    languages: ["Arabic (Native)", "English (C1)", "French (C1)", "German (A2+)"]
  },

  education: [
    {
      school: "University of Passau",
      program: "M.Sc. AI Engineering",
      status: "current"
    },
    {
      school: "Bielefeld University",
      program: "M.Sc. Intelligent Interactive Systems",
      status: "admitted",
      startISO: "2025-10"
    }
  ],

  experience: [
    {
      company: "Siemens",
      role: "Werkstudent – UX Data Analysis",
      location: "Germany",
      startISO: "2025-08-18",
      endISO: null,
      bullets: [
        "Analyze user interaction data and derive UX insights for product teams.",
        "Prototype dashboards and metrics pipelines with Python/JS tooling.",
        "Explore AI/ML techniques for behavior clustering and session summarization."
      ]
    },
    {
      company: "The Independent High Authority for the Elections (ISIE)",
      role: "Information System Specialist",
      location: "Monastir, Tunisia",
      period: "September 2024 – February 2025",
      bullets: [
        "Maintained and optimized internal information systems across the election division.",
        "Onboarded and trained 100+ staff on internal tools and digital workflows.",
        "Automated repetitive data tasks for candidate data handling and documentation."
      ]
    },
    {
      company: "BASIRA Lab (Imperial College London)",
      role: "Machine Learning Researcher Intern",
      location: "United Kingdom",
      period: "February 2023 – July 2023",
      bullets: [
        "Explored federated learning techniques for computer vision tasks.",
        "Developed deep learning models under federated training constraints.",
        "Documented research outcomes and authored a thesis based on project work."
      ]
    },
    {
      company: "Web Developer Intern",
      role: "Front-end Developer",
      location: "Monastir, Tunisia",
      period: "June 2022 – August 2022",
      bullets: [
        "Built responsive UI components in React/JavaScript for an e-commerce platform.",
        "Optimized front-end performance and participated in code reviews."
      ]
    }
  ],

  projects: [
    {
      name: "VSCode-Style Portfolio",
      description:
        "Portfolio that emulates VS Code's UI (explorer, tabs, terminal) with realistic behaviors.",
      tech: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Monaco Editor"],
      links: {
        github: "https://github.com/HazemHassine/vscode-portfolio",
        live: "https://vscode-portfolio.vercel.app/"
      },
      highlights: [
        "Dynamic tabs & file explorer state",
        "Terminal simulation and Markdown/code viewers"
      ]
    },
    {
      name: "Pediatric Recommendation System",
      description:
        "AI system for pediatric disease prediction & treatment suggestions via NLP preprocessing, ontology mapping, and ML.",
      tech: ["Python", "React.js", "Flask", "RDFLib", "OWL", "NLTK", "BioBERT", "TF-IDF"],
      links: {
        github: "https://github.com/HazemHassine/pediatric-recommendation-system"
      },
      highlights: ["Ontology-aware mapping", "Hybrid classical ML + Bio-ClinicalBERT"]
    },
    {
      name: "AI Personal Assistant Chatbot",
      description:
        "Desktop assistant with note-taking, logging, and skill tracking; personalized via fine-tuned LLMs on private data.",
      tech: ["Python", "PyTorch", "Flask", "Django", "MongoDB", "Pandas"],
      highlights: ["Local data pipelines", "Contextual recall of user notes"]
    },
    {
      name: "Sentiment Analysis Streamlit App",
      description:
        "Interactive app for real-time sentiment classification with visualized predictions.",
      tech: ["Python", "Streamlit", "Scikit-learn", "NLTK"],
      links: {
        github: "https://github.com/HazemHassine/Sentiment_analysis_streamlit"
      },
      highlights: ["Live inference", "Simple UX for text inputs"]
    },
    {
      name: "Arabic Letter Classification with CNN",
      description:
        "CNN-based classifier for Arabic handwritten letters with preprocessing and tuned architecture.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
      links: {
        github: "https://github.com/HazemHassine/ArabicLetterClassificationWithCNN"
      },
      highlights: ["Data augmentation", "High-accuracy CNN baseline"]
    },
    {
      name: "Taxi Service App",
      description:
        "Responsive React template for booking & managing rides with reusable components.",
      tech: ["React", "JavaScript", "CSS3"],
      links: {
        github: "https://github.com/HazemHassine/TaxiService"
      },
      highlights: ["Componentized UI", "Booking flow"]
    },
    {
      name: "CLI YouTube Video Summarizer",
      description:
        "CLI that fetches transcripts and produces concise summaries using LLMs.",
      tech: ["Python", "OpenAI API", "YouTube Transcript API"],
      links: {
        github: "https://github.com/HazemHassine/Cli-Youtube-Video-Summarizer"
      },
      highlights: ["Batch mode", "Configurable summary length"]
    },
    {
      name: "Neural Network From Scratch",
      description:
        "Educational FCNN implementation with pure NumPy, including backprop and optimizers.",
      tech: ["Python", "NumPy"],
      links: {
        github: "https://github.com/HazemHassine/neural_network_from_scratch"
      },
      highlights: ["From-scratch gradients", "Modular layers/optimizers"]
    },
    {
      name: "Portfolio Website",
      description:
        "Classic portfolio with animations and responsive design.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      links: {
        github: "https://github.com/HazemHassine/Portfolio",
        live: "https://hazemhassine.github.io/Portfolio/"
      },
      highlights: ["Clean UI", "Mobile-first"]
    },
    {
      name: "RL Mario (PPO / Rainbow DQN)",
      description:
        "Deep RL agents for Super Mario Bros with training stability fixes and visualizations.",
      tech: ["Python", "PyTorch"],
      highlights: ["GAE, reward shaping", "Live plots, Grad-CAM overlays"]
    }
  ],

  contact: {
    email: "hazemhassine.edu@gmail.com",
    github: "https://github.com/HazemHassine",
    linkedin: "https://www.linkedin.com/in/hazem-hassine"
  },

  faq: [
    { q: "Are you available for work?", a: "Yes — open to  collaborations." },
    { q: "What are you studying?", a: "AI Engineering (Passau); starting IIS (Bielefeld) in Oct 2025." },
    { q: "Which languages do you speak?", a: "Arabic (Native), English (C1), French (C1), German (A2+)." }
  ],

  meta: {
    keywords: [
      "AI Engineering", "UX Analytics", "Reinforcement Learning", "Next.js Portfolio",
      "PyTorch", "RAG", "Data Visualization"
    ],
    lastUpdatedISO: "2025-08-12"
  }
};

// --- Context builder for your chatbot/about-me panel ---
export function meAsContext() {
  const lines = [];
  lines.push(`Name: ${me.name}`);
  lines.push(`Title: ${me.title}`);
  lines.push(`Tagline: ${me.tagline}`);
  lines.push(`Location: ${me.location}`);
  lines.push(
    `Summary: ${me.summary.join(" ")} Interests: ${me.interests.join(", ")}.`
  );

  // Skills (condensed)
  const skillCats = [
    ["Programming/Tools", me.skills.programming_tools],
    ["ML", me.skills.machine_learning],
    ["Web", me.skills.web_tech],
    ["Soft Skills", me.skills.soft_skills],
    ["Languages", me.skills.languages]
  ]
    .map(([k, v]) => `${k}=${v.join(", ")}`)
    .join(" | ");
  lines.push(`Skills: ${skillCats}`);

  // Education
  lines.push(
    `Education: ${me.education
      .map((e) => {
        const when = e.startISO ? ` (start ${e.startISO})` : e.status ? ` (${e.status})` : "";
        return `${e.program} @ ${e.school}${when}`;
      })
      .join(" | ")}`
  );

  // Experience
  lines.push(
    `Experience: ${me.experience
      .map((x) => {
        const when = x.period ?? `${x.startISO ?? ""}${x.endISO ? "–" + x.endISO : "–present"}`;
        return `${x.role} @ ${x.company}${x.location ? " (" + x.location + ")" : ""} [${when}]`;
      })
      .join(" | ")}`
  );

  // Projects
  lines.push(
    `Projects: ${me.projects
      .map((p) => {
        const links = p.links
          ? ` ${p.links.github ?? ""} ${p.links.live ?? ""}`.trim()
          : "";
        return `${p.name} (${p.tech.join(", ")}): ${p.description}${links ? " " + links : ""}`;
      })
      .join(" | ")}`
  );

  // Contact + FAQ
  lines.push(
    `Contact: email=${me.contact.email}, GitHub=${me.contact.github}, LinkedIn=${me.contact.linkedin}`
  );
  lines.push(`FAQ: ${me.faq.map((f) => `${f.q} -> ${f.a}`).join(" | ")}`);

  return lines.join("\n");
}
