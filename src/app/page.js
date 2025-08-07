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
import { VscMarkdown, VscJson, VscBook } from 'react-icons/vsc';
import { DiReact as DiReactIcon } from 'react-icons/di';
import Skills from '@/components/tabs/Skills';
import Contact from '@/components/tabs/Contact';
import WorkNotebook from '@/components/tabs/WorkNotebook';
import MarkdownEditorViewer from '@/components/tabs/MarkdownEditorViewer';
import TerminalView from '@/components/TerminalView';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Component mapping
const fileComponentMap = {
  'About.md': {
    id: 'about.md',
    title: 'About.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
    content: <MarkdownEditorViewer filePath='/markdown/About.md' />,
  },
  'Projects.jsx': {
    id: 'projects.jsx',
    title: 'Projects.jsx',
    icon: <DiReactIcon className="text-sky-400" />,
    content: <Projects />,
  },
  'Work.ipynb': {
    id: 'work.ipynb',
    title: 'Work.ipynb',
    icon: <VscBook className="text-orange-400" />,
    content: <WorkNotebook />,
  },
  'README.md': {
    id: 'readme.md',
    title: 'README.md',
    icon: <VscMarkdown className="text-[var(--vscode-text-secondary)]" />,
    content: <MarkdownEditorViewer id={'readme'} />,
  },
  'config.json': {
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
  },
  'Skills.jsx': {
    id: 'skills.jsx',
    title: 'Skills.jsx',
    icon: <DiReactIcon className="text-sky-400" />,
    content: <Skills />,
  },
  'Contact.jsx': {
    id: 'contact.jsx',
    title: 'Contact.jsx',
    icon: <DiReactIcon className="text-sky-400" />,
    content: <Contact />,
  },
};

export default function HomePage() {
  const [tabs, setTabs] = useState([fileComponentMap['About.md']]);
  const [activeTabId, setActiveTabId] = useState('about.md');
  const [sidePanelVisible, setSidePanelVisible] = useState(true);
  const [activePanel, setActivePanel] = useState("explorer");

  const handleFileSelect = (file) => {
    if (!fileComponentMap[file.name]) return;

    const existingTab = tabs.find(tab => tab.id === fileComponentMap[file.name].id);
    if (existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      const newTab = fileComponentMap[file.name];
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };

  const handleIconClick = (panelId) => {
    if (sidePanelVisible && activePanel === panelId) {
      setSidePanelVisible(false);
    } else {
      setActivePanel(panelId);
      setSidePanelVisible(true);
    }
  };

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
      <MenuBar />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar onIconClick={handleIconClick} activeIcon={activePanel} />
        <PanelGroup direction="horizontal" className="flex-1">
          {sidePanelVisible && (
            <>
              <Panel defaultSize={20} minSize={15} maxSize={40}>
                <div className="h-full bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] overflow-hidden font-sans">
                  {activePanel === "explorer" && <FileExplorer onFileSelect={handleFileSelect} />}
                  {activePanel === "scm" && <SourceControl />}
                  {activePanel === "search" && <SearchPanel />}
                </div>
              </Panel>
              <PanelResizeHandle className="w-1 bg-transparent hover:bg-[var(--vscode-tab-active-top-border-color)] transition-colors" />
            </>
          )}
          <Panel minSize={30}>
            <PanelGroup direction="vertical" className="h-full">
              <Panel defaultSize={70} minSize={30}>
                <div className="flex flex-col h-full min-w-0">
                  <TabBar
                    tabs={tabs}
                    activeTab={activeTabId}
                    onTabClick={handleTabClick}
                    onTabClose={handleTabClose}
                  />
                  <ContentArea activeTabData={activeTabData} />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-transparent hover:bg-[var(--vscode-tab-active-top-border-color)] transition-colors" />
              <Panel defaultSize={30} minSize={15} maxSize={50}>
                <TerminalView />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar />
    </div>
  );
}
