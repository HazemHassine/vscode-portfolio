"use client"; // Required for useState and event handlers

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TabBar from '../components/TabBar';
import ContentArea from '../components/ContentArea';
import { FiFileText, FiCode, FiTerminal, FiGitBranch } from 'react-icons/fi'; // Example icons
import { DiJavascript1, DiMarkdown, DiReact } from 'react-icons/di'; // More specific icons

const initialTabsData = [
  {
    id: 'about.md',
    title: 'About.md',
    icon: <DiMarkdown className="text-blue-400" />,
    content: `
# About Me

Hello! I'm [Your Name], a passionate software developer with a love for creating elegant and efficient solutions.
This portfolio is a small showcase of my journey into web development, styled after one of my favorite tools, VS Code.

## Skills

*   **Frontend:** React, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Databases:** MongoDB, PostgreSQL
*   **Tools:** Git, Docker, VS Code (of course!)

## Interests

*   Open Source Contributions
*   Exploring new technologies
*   Photography and Hiking
    `,
  },
  {
    id: 'projects.jsx',
    title: 'Projects.jsx',
    icon: <DiReact className="text-sky-400" />,
    content: `
// Projects.jsx
// This file will showcase your projects using JSX.

const ProjectCard = ({ name, description, stack, link }) => (
  <div style={{ border: '1px solid #333', padding: '1rem', margin: '1rem 0', borderRadius: '5px' }}>
    <h3 style={{ color: '#61dafb' }}>{name}</h3>
    <p>{description}</p>
    <p><strong>Stack:</strong> {stack.join(', ')}</p>
    {link && <a href={link} target="_blank" rel="noopener noreferrer" style={{color: '#9f7aea'}}>View Project</a>}
  </div>
);

const MyProjects = () => {
  const projects = [
    {
      name: "VSCode Portfolio",
      description: "This website! Built with Next.js, React, and Tailwind CSS to mimic the VS Code interface.",
      stack: ["Next.js", "React", "Tailwind CSS", "react-icons"],
      link: "#" // Link to this site's repo or live version
    },
    {
      name: "E-commerce Platform",
      description: "A full-featured online store with user authentication, product listings, and a shopping cart.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      link: "#"
    },
    {
      name: "Task Management App",
      description: "A collaborative tool for teams to manage tasks and projects.",
      stack: ["Vue.js", "Firebase Realtime Database", "Vuetify"],
      link: "#"
    }
  ];

  return (
    <div>
      <h2>My Projects</h2>
      {projects.map(project => <ProjectCard key={project.name} {...project} />)}
    </div>
  );
};

// To render this in a real scenario, you'd do something like:
// ReactDOM.render(<MyProjects />, document.getElementById('projects-container'));
// For this placeholder, the string content itself is displayed.
// The actual rendering would happen if this were a real JSX file being processed.
// We are displaying the source code here.

export default MyProjects;
    `,
  },
  {
    id: 'readme.md',
    title: 'README.md',
    icon: <DiMarkdown className="text-blue-400" />,
    content: `
# Portfolio Project: VSCode Edition

This project is a personal portfolio website designed to mimic the look and feel of Visual Studio Code.
It's built using modern web technologies to showcase my skills and projects in a familiar environment for developers.

## Tech Stack

*   **Framework:** Next.js (v13+ with App Router)
*   **Language:** JavaScript (ES6+)
*   **Styling:** Tailwind CSS
*   **Icons:** react-icons
*   **UI Components:** Custom-built React components

## Features

*   **VSCode Theming:** Dark theme matching default VSCode colors for sidebar, tabs, and editor pane.
*   **Responsive Layout:** Adapts to different screen sizes.
*   **Sidebar Navigation:** Easy access to different sections of the portfolio (About, Projects, etc.).
*   **Tabbed Interface:** Content is displayed in tabs, similar to open files in VSCode.
    *   Clickable tabs to switch content.
    *   Active tab highlighting.
    *   (Visual) Close button on active tabs.
*   **Monospace Font:** Editor-like content area using 'Fira Code' or a similar monospace font.

## Getting Started

1.  Clone the repository:
    \`git clone <repository-url>\`
2.  Install dependencies:
    \`npm install\`
    or
    \`yarn install\`
3.  Run the development server:
    \`npm run dev\`
    or
    \`yarn dev\`
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements

*   Fully functional tab closing and opening.
*   Dynamic content loading for sections.
*   Integration with a headless CMS for blog posts or project details.
*   More interactive elements (e.g., a "working" terminal tab).
    `,
  },
  {
    id: 'skills.js',
    title: 'Skills.js',
    icon: <DiJavascript1 className="text-yellow-400" />,
    content: `
// skills.js - A list of my technical skills

const skills = {
  languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Python", "SQL"],
  frontend: {
    frameworks_libraries: ["React", "Next.js", "Vue.js", "Angular", "Redux", "Zustand"],
    styling: ["Tailwind CSS", "Sass/SCSS", "Styled Components", "Material-UI"],
    tools: ["Webpack", "Babel", "ESLint", "Prettier"]
  },
  backend: {
    frameworks_libraries: ["Node.js", "Express.js", "Django", "Flask"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore"],
    api: ["RESTful APIs", "GraphQL"]
  },
  devops_tools: ["Git", "GitHub/GitLab", "Docker", "Jenkins", "AWS (EC2, S3, Lambda)"],
  testing: ["Jest", "React Testing Library", "Cypress", "Mocha", "Chai"],
  other: ["Agile/Scrum methodologies", "Problem-solving", "Team collaboration"]
};

function printSkills(category, items) {
  console.log(\`\\n--- \${category.toUpperCase()} ---\`);
  if (Array.isArray(items)) {
    items.forEach(item => console.log(\`- \${item}\`));
  } else if (typeof items === 'object') {
    for (const subCategory in items) {
      printSkills(\`\${category} - \${subCategory.replace('_', ' ')}\`, items[subCategory]);
    }
  }
}

console.log("My Technical Skills Portfolio:");
for (const category in skills) {
  printSkills(category, skills[category]);
}

// This is a simplified representation.
// In a real app, this data might be used to dynamically generate UI elements.
    `
  }
];


export default function HomePage() {
  const [tabs, setTabs] = useState(initialTabsData);
  const [activeTabId, setActiveTabId] = useState(initialTabsData[0].id);

  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabIdToClose) => {
    // Prevent closing the last tab
    if (tabs.length === 1) return;

    const tabIndex = tabs.findIndex(tab => tab.id === tabIdToClose);
    const newTabs = tabs.filter((tab) => tab.id !== tabIdToClose);
    setTabs(newTabs);

    // If the closed tab was active, set a new active tab
    if (activeTabId === tabIdToClose) {
      if (newTabs.length > 0) {
        // Try to activate the tab to the left, or the first tab if closing the first one
        setActiveTabId(newTabs[Math.max(0, tabIndex -1)].id);
      } else {
        setActiveTabId(null); // Should not happen if we prevent closing last tab
      }
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow min-w-0"> {/* min-w-0 is important for flex children to shrink properly */}
        <TabBar
          tabs={tabs}
          activeTab={activeTabId}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />
        <ContentArea activeTabData={activeTabData} />
      </div>
    </div>
  );
}
