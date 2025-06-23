"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  VscSearch,
  VscFiles,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

const settingsMenuItems = [
  { label: "Command Palette...", shortcut: "Ctrl+Shift+P", dividerAfter: true },
  { label: "Profiles" },
  { label: "Settings", shortcut: "Ctrl+," },
  { label: "Extensions", shortcut: "Ctrl+Shift+X" },
  { label: "Keyboard Shortcuts", shortcut: "Ctrl+K Ctrl+S" },
  { label: "Snippets" },
  { label: "Tasks" },
  { label: "Themes", hasSubmenu: true, dividerAfter: true },
  { label: "Backup and Sync Settings..." },
  { label: "Download Update (1)" },
];

const SettingsMenuItem = ({ item }) => (
  <>
    <button
      className={`
        w-full flex justify-between items-center
        px-4 py-2 text-xs
        ${item.shortcut ? "justify-between" : "justify-start"}
        text-[var(--vscode-text-primary)]
        hover:bg-[var(--vscode-list-hover-background)]
        hover:text-[var(--vscode-text-inverse)]
        focus:outline-none
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <span>{item.label}</span>
      <span className="flex items-center space-x-1">
        {item.shortcut && (
          <kbd
            className="
              text-[var(--vscode-text-secondary)]
              bg-[var(--vscode-keybinding-keyBackground)]
              rounded px-1 py-0.5 text-[10px] font-mono
            "
          >
            {item.shortcut}
          </kbd>
        )}
        {item.hasSubmenu && (
          <span className="text-[var(--vscode-text-secondary)] select-none">{">"}</span>
        )}
      </span>
    </button>
    {item.dividerAfter && (
      <div className="border-t border-[var(--vscode-border-color)] mx-2" />
    )}
  </>
);

const SettingsMenu = React.forwardRef((_, ref) => (
  <div
    ref={ref}
    className="
      absolute right-0 bottom-full mb-2
      w-56
      bg-[var(--vscode-menubar-background)]
      border border-[var(--vscode-border-color)]
      rounded-sm shadow-lg z-50
    "
    onClick={(e) => e.stopPropagation()}
  >
    {settingsMenuItems.map((it, i) => (
      <SettingsMenuItem key={i} item={it} />
    ))}
  </div>
));

const ActivityBar = () => {
  const topItems = [
    { id: "search", Icon: VscSearch },
    { id: "explorer", Icon: VscFiles },
    { id: "scm", Icon: VscSourceControl, badge: 2 },
    { id: "debug", Icon: VscDebugAlt },
    { id: "extensions", Icon: VscExtensions, badge: 1 },
  ];
  const bottomItems = [
    { id: "account", Icon: VscAccount },
    { id: "settings", Icon: VscSettingsGear, badge: 1 },
  ];

  const [activeId, setActiveId] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsWrapperRef = useRef();

  useEffect(() => {
    function onClickOutside(e) {
      if (
        settingsWrapperRef.current &&
        !settingsWrapperRef.current.contains(e.target)
      ) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleIconClick = (id) => {
    setActiveId(id);
    if (id === "settings") {
      setSettingsOpen((open) => !open);
    } else {
      setSettingsOpen(false);
    }
  };

  const renderItem = ({ id, Icon, badge }) => {
    const isActive = id === activeId;
    return (
      <div
        key={id}
        onClick={() => handleIconClick(id)}
        className={`
          relative flex items-center justify-center
          w-full h-12 cursor-pointer
          transition-colors duration-150
          ${
            isActive
              ? "bg-[#333333] border-l-4 border-[#007ACC] text-white"
              : "hover:bg-[#2a2d2e] border-l-4 border-transparent text-gray-400"
          }
        `}
      >
        <Icon size={24} />
        {badge && (
          <span
            className={`
              absolute ${id === "settings" ? "bottom-1" : "top-1"} right-1
              w-4 h-4 flex items-center justify-center
              bg-[#0078d4] text-[10px] rounded-full
              text-white font-semibold select-none
            `}
          >
            {badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <aside className="flex flex-col justify-between bg-[#1e1e1e] w-14 pt-2 pb-14 select-none h-screen">
        <div className="flex flex-col space-y-1">
          {topItems.map(renderItem)}
        </div>
        <div className="flex flex-col space-y-1">
          {bottomItems.map((item) =>
            item.id === "settings" ? (
              <div key="settings" ref={settingsWrapperRef} className="relative">
                {renderItem(item)}
                {settingsOpen && <SettingsMenu />}
              </div>
            ) : (
              renderItem(item)
            )
          )}
        </div>
      </aside>
    </>
  );
};

export default ActivityBar;
