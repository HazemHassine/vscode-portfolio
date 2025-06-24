"use client";

import React, { useState } from 'react';
import FileExplorer from '@/components/FileExplorer';
import SearchPanel from '@/components/SearchPanel';
import Projects from '@/components/tabs/Projects';
import SourceControl from '@/components/SourceControl';
import MenuBar from '@/components/MenuBar';
import TabBar from '@/components/TabBar';
import StatusBar from '@/components/StatusBar';
import ContentArea from '@/components/ContentArea';
import ActivityBar from '@/components/ActivityBar';
import { VscMarkdown, VscJson } from 'react-icons/vsc';
import { DiReact as DiReactIcon } from 'react-icons/di';
import TerminalView from '@/components/TerminalView';
import MarkdownEditorViewer from '@/components/tabs/MarkdownEditorViewer';


// Initial tabs data
const initialTabsData = [
  {
    id: 'about.md',
    title: 'About.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
    content: <MarkdownEditorViewer id={'about'} />,
  },
  {
    id: 'projects.jsx',
    title: 'Projects.jsx',
    icon: <DiReactIcon className="text-sky-400" />,
    content: <Projects />,
  },
  {
    id: 'readme.md',
    title: 'README.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
    content: <MarkdownEditorViewer id={'readme'} />,
  },
  {
    id: 'config.json',
    title: 'config.json',
    icon: <VscJson className="text-yellow-400" />,
    content:
        JSON.stringify({
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
        }, null, 2)
  }
];

export default function HomePage() {
  const [tabs, setTabs] = useState(initialTabsData);
  const [activeTabId, setActiveTabId] = useState(initialTabsData[0].id);
  const [activePanel, setActivePanel] = useState("explorer");

  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);
    console.log(`Switched to tab: ${tabId}`);
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
      <MenuBar />

      <div className="flex flex-grow overflow-hidden">
        <ActivityBar setActivePanel={setActivePanel} />

        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex flex-grow bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] overflow-hidden font-sans">
            {activePanel === "explorer" && <FileExplorer />}
            {activePanel === "scm" && <SourceControl />}
            {activePanel === "search" && <SearchPanel />}
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
      <StatusBar />
    </div>
  );
}
