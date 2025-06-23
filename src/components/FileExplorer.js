import React, { useState } from 'react';
import {
  VscFolder,
  VscFolderOpened,
  VscFileCode,
  VscMarkdown,
  VscFiles,
} from 'react-icons/vsc';

const explorerData = [
  {
    type: 'folder',
    name: 'Portfolio',
    icon: <VscFolder />,
    children: [
      { type: 'file', name: 'Home.jsx', icon: <VscFileCode /> },
      { type: 'file', name: 'About.md', icon: <VscMarkdown /> },
      { type: 'file', name: 'Projects.jsx', icon: <VscFileCode /> },
      { type: 'file', name: 'Skills.jsx', icon: <VscFileCode /> },
      { type: 'file', name: 'Blog.md', icon: <VscMarkdown /> },
      { type: 'file', name: 'Contact.md', icon: <VscMarkdown /> },
    ],
  },
];

// Disclosure arrow component with rotation on open
const DisclosureArrow = ({ isOpen }) => (
  <span
    className={`font-bold mr-1 select-none text-[10px]`}
    style={{ display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
  >
   {">"}  
  </span>
);

// Render vertical tree lines like VSCode
const VerticalLine = ({ level }) => (
  <span
    aria-hidden="true"
    className="absolute left-0 top-0 bottom-0 border-l border-[var(--vscode-tree-indent-guides)]"
    style={{ left: `${level * 16}px` }}
  />
);

const ExplorerItem = ({ item, level = 0, selected, onSelect, isLastChild }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = item.type === 'folder';

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(item.name);
    }
  };

  return (
    <div className="relative">
      {/* Vertical indent lines for all ancestor levels except current */}
      {[...Array(level)].map((_, idx) => (
        <VerticalLine key={idx} level={idx} />
      ))}

      <div
        onClick={handleClick}
        className={`relative flex items-center cursor-pointer select-none text-sm
          px-2 py-1
          ${
            selected === item.name
              ? 'bg-[var(--vscode-list-hover-background)] border-[var(--vscode-tree-indent-guides)] border-l'
              : 'text-[var(--vscode-text-primary)] hover:bg-[var(--vscode-list-hover-background)] border-[var(--vscode-tree-indent-guides)] border-l'
          }
          `}
        style={{ paddingLeft: 16 + level * 16 }}
      >
        {isFolder && (
          <DisclosureArrow isOpen={isOpen} />
        )}
        <span className="mr-2 text-base leading-none flex-shrink-0">
          {isFolder ? (isOpen ? <VscFolderOpened /> : <VscFolder />) : item.icon || <VscFiles />}
        </span>
        <span className="truncate">{item.name}</span>
      </div>

      {isFolder && isOpen && (
        <div>
          {item.children.map((child, i) => (
            <ExplorerItem
              key={child.name}
              item={child}
              level={level + 1}
              selected={selected}
              onSelect={onSelect}
              isLastChild={i === item.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <aside className="w-64 bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)] flex flex-col shrink-0 select-none font-sans">
      <div className="h-[35px] flex items-center px-4 pt-3 pb-2 border-b border-[var(--vscode-border-color)]">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--vscode-text-secondary)]">
          Explorer
        </h2>
      </div>

      <nav className="flex-grow overflow-y-auto p-2 space-y-0.5">
        {explorerData.map((item) => (
          <ExplorerItem
            key={item.name}
            item={item}
            selected={selectedItem}
            onSelect={setSelectedItem}
          />
        ))}
      </nav>

      <div className="p-3 border-t border-[var(--vscode-border-color)] text-xs text-center text-[var(--vscode-text-secondary)]">
        <p>&copy; {new Date().getFullYear()} Your Name</p>
        <p>VSCode Portfolio</p>
      </div>
    </aside>
  );
};

export default FileExplorer;