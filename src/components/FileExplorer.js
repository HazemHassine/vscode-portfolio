"use client";

import React, { useState, useEffect } from "react";
import {
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
  VscFileCode,
  VscMarkdown,
  VscFiles,
  VscNewFolder,
  VscNewFile,
  VscRefresh,
  VscCollapseAll,
} from "react-icons/vsc";

// .git folder contents
const gitFolderContents = [
  { type: "file", name: "config" },
  { type: "file", name: "HEAD" },
  {
    type: "folder",
    name: "hooks",
    children: [
      { type: "file", name: "pre-commit.sample" },
      { type: "file", name: "post-commit.sample" },
    ],
  },
  { type: "folder", name: "objects", children: [] },
  {
    type: "folder",
    name: "refs",
    children: [
      { type: "folder", name: "heads", children: [] },
      { type: "folder", name: "tags", children: [] },
    ],
  },
];

const initialExplorerData = [
  {
    type: "folder",
    name: ".git",
    icon: <VscFolder />,
    children: gitFolderContents,
  },
  {
    type: "folder",
    name: "Portfolio",
    icon: <VscFolder />,
    children: [
      { type: "file", name: "Home.jsx", icon: <VscFileCode /> },
      { type: "file", name: "About.md", icon: <VscMarkdown />, gitStatus: "modified" },
      { type: "file", name: "Projects.jsx", icon: <VscFileCode /> },
      { type: "file", name: "Skills.jsx", icon: <VscFileCode />, gitStatus: "modified" },
      { type: "file", name: "Blog.md", icon: <VscMarkdown /> },
      { type: "file", name: "Contact.jsx", icon: <VscMarkdown /> },
    ],
  },
  {type: "file",
  name: ".gitignore",
  icon: <VscFileCode />,

  }
];

const DisclosureArrow = ({ isOpen }) => (
  <span
    className="mr-1 flex items-center justify-center select-none"
    style={{
      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
      width: 12,
      height: 12,
    }}
  >
    <VscChevronRight size={12} />
  </span>
);

const VerticalLine = ({ level }) => (
  <span
    aria-hidden="true"
    className="absolute top-0 bottom-0 border-l border-gray-600/20"
    style={{ left: level * 16 + 8, borderWidth: "1px" }}
  />
);

const isHiddenItem = (name) => name.startsWith(".");

const ExplorerItem = ({
  item,
  level = 0,
  selected,
  onSelect,
  parentPath = "",
  parentHidden = false,
  defaultOpen = true,
  collapseSignal = 0,
  collapseMode = "collapse",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isFolder = item.type === "folder";
  const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;
  const hidden = parentHidden || isHiddenItem(item.name);
  const modified = item.gitStatus === "modified";
  const isSelected = selected === fullPath;

  useEffect(() => {
    if (isFolder) setIsOpen(collapseMode === "expand");
  }, [collapseSignal, collapseMode]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) setIsOpen(!isOpen);
    onSelect(fullPath);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handleClick(e);
    }
  };

  return (
    <div
      role="treeitem"
      aria-expanded={isFolder ? isOpen : undefined}
      aria-selected={isSelected}
      className="relative"
    >
      {[...Array(level)].map((_, i) => (
        <VerticalLine key={i} level={i} />
      ))}

      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        title={fullPath}
        className={`
          flex items-center cursor-pointer select-none text-sm
          px-2 py-[3px] truncate
          ${
            isSelected
              ? "bg-[#094771] text-[var(--vscode-text-inverse)]"
              : hidden
                ? "text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)]"
                : "text-[var(--vscode-text-primary)] hover:text-[var(--vscode-text-inverse)]"
          }
          ${!isSelected && !hidden ? "hover:bg-[var(--vscode-list-hover-background)]" : ""}
          focus:outline-none focus:ring-2 focus:ring-[var(--vscode-tab-active-top-border-color)] focus:ring-inset
          ${hidden ? "opacity-70 italic" : ""}
        `}
        style={{ paddingLeft: 16 + level * 16 }}
      >
        {isFolder && <DisclosureArrow isOpen={isOpen} />}

        {/* folder/file icon */}
        <span
          className={`mr-2 flex-shrink-0 text-base leading-none ${
            hidden
              ? "text-[var(--vscode-text-secondary)]"
              : isSelected
                ? "text-[var(--vscode-text-inverse)]"
                : "text-[var(--vscode-text-primary)]"
          }`}
        >
          {isFolder ? (isOpen ? <VscFolderOpened /> : <VscFolder />) : item.icon || <VscFiles />}
        </span>

        {/* name */}
        <span className={`truncate flex-grow ${modified ? "text-orange-300" : ""}`}>
          {item.name}
        </span>

        {/* git-modified dot */}
        {modified && (
          <div
            size={18}
            className="flex-shrink-0 text-orange-300 font-semibold pr-1"
            style={{ marginLeft: 4, marginRight: -6 }}
          >M</div>
        )}
      </div>

      {isFolder && isOpen && (
        <div role="group">
          {item.children.map((child) => (
            <ExplorerItem
              key={child.name}
              item={child}
              level={level + 1}
              selected={selected}
              onSelect={onSelect}
              parentPath={fullPath}
              parentHidden={hidden}
              defaultOpen={child.name !== ".git"}
              collapseSignal={collapseSignal}
              collapseMode={collapseMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [collapseSignal, setCollapseSignal] = useState(0);
  const [allCollapsed, setAllCollapsed] = useState(false);

  const toggleCollapseAll = () => {
    setAllCollapsed((prev) => !prev);
    setCollapseSignal((prev) => prev + 1);
  };

  return (
    <aside className="flex flex-col h-full shrink-0 select-none font-sans bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-[35px] px-2 border-b border-[var(--vscode-border-color)] bg-[var(--vscode-tab-bar-background)]">
        <div className="text-[11px] font-semibold uppercase text-[var(--vscode-text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
          FOLDERS: VSCODE-PORTFOLIO
        </div>
        <div className="flex items-center space-x-2 text-[var(--vscode-text-secondary)]">
          {[
            { Icon: VscNewFolder, title: "New Folder" },
            { Icon: VscNewFile, title: "New File" },
            { Icon: VscRefresh, title: "Refresh" },
            {
              Icon: VscCollapseAll,
              title: allCollapsed ? "Expand All" : "Collapse All",
              onClick: toggleCollapseAll,
            },
          ].map(({ Icon, title, onClick }, idx) => (
            <button
              key={idx}
              onClick={onClick}
              title={title}
              className="p-1 rounded hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors duration-150"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Explorer Tree */}
      <nav className="flex-grow overflow-y-auto py-2 space-y-0.5">
        {initialExplorerData.map((item) => (
          <ExplorerItem
            key={item.name}
            item={item}
            selected={selectedItem}
            onSelect={setSelectedItem}
            parentPath="~/dev"
            defaultOpen={!allCollapsed && item.name !== ".git"}
            collapseSignal={collapseSignal}
            collapseMode={allCollapsed ? "collapse" : "expand"}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--vscode-border-color)] text-xs text-center text-[var(--vscode-text-secondary)] bg-[var(--vscode-tab-bar-background)]">
        <p>&copy; {new Date().getFullYear()} Hazem Hassine</p>
        <p>VSCode Portfolio</p>
        {selectedItem && (
          <p className="mt-1 text-[var(--vscode-tab-active-top-border-color)] truncate" title={selectedItem}>
            Selected: {selectedItem.split("/").pop()}
          </p>
        )}
      </div>
    </aside>
  );
};

export default FileExplorer;
