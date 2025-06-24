"use client"; // Required for useState and event handlers

import React, { useState } from 'react';
import FileExplorer from '@/components/FileExplorer';
import SearchPanel from '@/components/SearchPanel';
import SourceControl from '@/components/SourceControl';
import MenuBar from '@/components/MenuBar';
import TabBar from '@/components/TabBar';
import StatusBar from '@/components/StatusBar';
import ContentArea from '@/components/ContentArea';
import ActivityBar from '@/components/ActivityBar';
import { VscMarkdown, VscJson } from 'react-icons/vsc';
import { DiReact as DiReactIcon } from 'react-icons/di';
import TerminalView from '@/components/TerminalView';

// Initial tabs data
const initialTabsData = [
  {
    id: 'about.md',
    title: 'About.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
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
    icon: <DiReactIcon className="text-sky-400" />,
    content: `
// Projects.jsx
// This file will showcase your projects using JSX.

const ProjectCard = ({ name, description, stack, link }) => (
  <div style={{ border: '1px solid #333', padding: '1rem', margin: '1rem 0', borderRadius: '5px', fontFamily: 'var(--vscode-font-sans-family)' }}>
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
      link: "#"
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
      <h2 style={{fontFamily: 'var(--vscode-font-sans-family)'}}>My Projects</h2>
      {projects.map(project => <ProjectCard key={project.name} {...project} />)}
    </div>
  );
};
export default MyProjects; // Keep as string for pre tag
    `,
  },
  {
    id: 'readme.md',
    title: 'README.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
    content: `
# Portfolio Project: VSCode Edition

This project is a personal portfolio website designed to mimic the look and feel of Visual Studio Code.
It's built using modern web technologies to showcase my skills and projects in a familiar environment for developers.

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** JavaScript (ES6+) / React
*   **Styling:** Tailwind CSS
*   **Icons:** react-icons (specifically Vsc for VSCode feel)
*   **UI Components:** Custom-built React components
*   **Transitions:** react-transition-group

## Features

*   **VSCode Theming:** Dark theme matching default VSCode colors.
*   **MenuBar:** Top application menu (File, Edit, etc.).
*   **Sidebar (Explorer):** Fixed width, VSCode icons, hover effects.
*   **Vertical Divider:** Separates Sidebar and Editor area.
*   **Tabbed Interface:**
    *   Rounded top corners for tabs.
    *   Active tab highlighting (background and bottom border).
    *   Hover-to-show close button on tabs.
    *   Smooth content fade transition on tab switch.
*   **Monospace Font:** Editor content area uses 'Fira Code'.
*   **Custom Scrollbars:** Thin, minimal, auto-hiding style.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: \`npm install\`
3.  Run dev server: \`npm run dev\`
4.  Open [http://localhost:3000](http://localhost:3000).
    `,
  },
  {
    id: 'config.json',
    title: 'config.json',
    icon: <VscJson className="text-yellow-400" />,
    content: JSON.stringify(
      {
        "theme": "vscode-dark",
        "fontSize": 14,
        "fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
        "tabSize": 2,
        "wordWrap": "on",
        "lineNumbers": "on",
        "explorer": {
          "confirmDragAndDrop": false,
          "iconTheme": "vscode-icons"
        },
        "workbench": {
          "colorTheme": "Default Dark+",
          "activityBar": { "visible": true },
          "statusBar": { "visible": true }
        }
      },
      null,
      2
    ),
  },
];

export default function HomePage() {
  const [tabs, setTabs] = useState(initialTabsData);
  const [activeTabId, setActiveTabId] = useState(initialTabsData[0].id);
  const [activePanel, setActivePanel] = useState("explorer");

  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabIdToClose) => {
    setTabs(prevTabs => {
      const closingIndex = prevTabs.findIndex(tab => tab.id === tabIdToClose);
      const newTabs = prevTabs.filter(tab => tab.id !== tabIdToClose);

      // If the closed tab was active, pick a new active tab
      if (tabIdToClose === activeTabId) {
        if (newTabs.length > 0) {
          // Prefer the next tab to the right, otherwise the last tab
          const nextIndex = closingIndex < newTabs.length
            ? closingIndex
            : newTabs.length - 1;
          setActiveTabId(newTabs[nextIndex].id);
        } else {
          setActiveTabId(null);
        }
      }

      return newTabs;
    });
  };

  const activeTabData = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Menu Bar */}
      <MenuBar />

      {/* Main area: ActivityBar + Editor + Terminal */}
      <div className="flex flex-grow overflow-hidden">
        <ActivityBar setActivePanel={setActivePanel} />

        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Editor pane */}
          <div className="flex flex-grow bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] overflow-hidden font-sans">
            {activePanel === "explorer" && <FileExplorer />}
            {activePanel === "scm"      && <SourceControl />}
            {activePanel === "search"   && <SearchPanel />}
            <div className="w-px bg-[var(--vscode-border-color)] shrink-0" />
            <div className="flex flex-col flex-grow min-w-0">
              <TabBar
                tabs={tabs}
                activeTab={activeTabId}
                onTabClick={handleTabClick}
                onTabClose={handleTabClose}
              />
              <ContentArea activeTabData={activeTabData} />
              <TerminalView />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  );
}
