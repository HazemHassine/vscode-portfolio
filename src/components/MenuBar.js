import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import VscodeImage from '../../public/VScode_image.png';

const menuItems = [
  {
    name: 'File',
    submenu: [
      { label: 'New Text File', shortcut: 'Ctrl+N', dividerAfter: true },
      { label: 'New File...', shortcut: 'Ctrl+Alt+Super+N' },
      { label: 'New Window', shortcut: 'Ctrl+Shift+N', dividerAfter: true },
      {
        label: 'New Window with Profile',
        submenu: [
          { label: 'Profile 1' },
          { label: 'Profile 2' },
        ],
        dividerAfter: true,
      },
      { label: 'Open File...', shortcut: 'Ctrl+O' },
      { label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O' },
      { label: 'Open Workspace from File...' },
      {
        label: 'Open Recent',
        submenu: [
          { label: 'Project1' },
          { label: 'Project2' },
        ],
        dividerAfter: true,
      },
      { label: 'Add Folder to Workspace...' },
      { label: 'Save Workspace As...' },
      { label: 'Duplicate Workspace', dividerAfter: true },
      { label: 'Save', shortcut: 'Ctrl+S' },
      { label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
      { label: 'Save All', disabled: true, dividerAfter: true },
      {
        label: 'Share',
        submenu: [
          { label: 'Share to GitHub' },
          { label: 'Share to Slack' },
        ],
      },
      { label: 'Auto Save' },
      {
        label: 'Preferences',
        submenu: [
          { label: 'Settings' },
          { label: 'Keyboard Shortcuts' },
        ],
        dividerAfter: true,
      },
      { label: 'Revert File' },
      { label: 'Close Editor', shortcut: 'Ctrl+W' },
      { label: 'Close Folder', shortcut: 'Ctrl+K F' },
      { label: 'Close Window', shortcut: 'Alt+F4' },
      { label: 'Exit', shortcut: 'Ctrl+Q' },
    ],
  },
  {
    name: 'Edit',
    submenu: [
      { label: 'Undo', shortcut: 'Ctrl+Z', dividerAfter: true },
      { label: 'Redo', shortcut: 'Ctrl+Y', dividerAfter: true },
      { label: 'Cut', shortcut: 'Ctrl+X' },
      { label: 'Copy', shortcut: 'Ctrl+C' },
      { label: 'Paste', shortcut: 'Ctrl+V', dividerAfter: true },
      { label: 'Find', shortcut: 'Ctrl+F' },
      { label: 'Replace', shortcut: 'Ctrl+H' },
    ],
  },
  {
    name: 'Selection',
    submenu: [
      { label: 'Select All', shortcut: 'Ctrl+A', dividerAfter: true },
      { label: 'Expand Selection' },
      { label: 'Shrink Selection' },
      { label: 'Add Cursor Above' },
      { label: 'Add Cursor Below' },
    ],
  },
  {
    name: 'View',
    submenu: [
      { label: 'Explorer', dividerAfter: true },
      { label: 'Search' },
      { label: 'Source Control' },
      { label: 'Extensions', dividerAfter: true },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`' },
    ],
  },
  {
    name: 'Go',
    submenu: [
      { label: 'Back', shortcut: 'Alt+Left', dividerAfter: true },
      { label: 'Forward', shortcut: 'Alt+Right', dividerAfter: true },
      { label: 'Go to File...', shortcut: 'Ctrl+P' },
      { label: 'Go to Symbol...', shortcut: 'Ctrl+Shift+O' },
    ],
  },
  {
    name: 'Run',
    submenu: [
      { label: 'Start Debugging', shortcut: 'F5', dividerAfter: true },
      { label: 'Run Without Debugging', shortcut: 'Ctrl+F5', dividerAfter: true },
      { label: 'Open Configurations' },
    ],
  },
  {
    name: 'Terminal',
    submenu: [
      { label: 'New Terminal', shortcut: 'Ctrl+Shift+`', dividerAfter: true },
      { label: 'Split Terminal' },
      { label: 'Run Task...' },
      { label: 'Configure Tasks' },
    ],
  },
  {
    name: 'Help',
    submenu: [
      { label: 'Documentation', dividerAfter: true },
      { label: 'Release Notes', dividerAfter: true },
      { label: 'About' },
    ],
  },
];

// Recursive Dropdown item renderer with divider support
const DropdownItem = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setSubmenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <>
      <div
        ref={ref}
        className="relative group"
        onMouseEnter={() => hasSubmenu && setSubmenuOpen(true)}
        onMouseLeave={() => hasSubmenu && setSubmenuOpen(false)}
      >
        <button
          disabled={item.disabled}
          className={`w-full px-3 py-1 text-xs flex justify-between items-center
          ${
            item.disabled
              ? 'text-[var(--vscode-disabledForeground)] cursor-default select-none'
              : 'text-[var(--vscode-text-primary)] hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]'
          }
          focus:outline-none
          `}
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>{item.label}</span>
          <span className="flex items-center space-x-2">
            {item.shortcut && (
              <kbd className="text-[var(--vscode-text-secondary)] bg-[var(--vscode-keybinding-keyBackground)] rounded px-1 py-0.5 text-[10px] font-mono select-none">
                {item.shortcut}
              </kbd>
            )}
            {hasSubmenu && (
              <svg
                className="w-3 h-3 text-[var(--vscode-text-secondary)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            )}
          </span>
        </button>

        {hasSubmenu && submenuOpen && (
          <div
            className="absolute top-0 left-full mt-[-3px] min-w-[12rem] bg-[var(--vscode-menubar-background)] border border-[var(--vscode-border-color)] rounded-sm shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {item.submenu.map((subitem, i) => (
              <DropdownItem key={i} item={subitem} />
            ))}
          </div>
        )}
      </div>
      {item.dividerAfter && (
        <div className="border-t border-[var(--vscode-border-color)] mx-2 my-1" />
      )}
    </>
  );
};

const MenuBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={containerRef}
      className="flex items-center bg-[var(--vscode-menubar-background)] text-[var(--vscode-text-primary)] px-2 h-[30px] shrink-0 border-b border-[var(--vscode-border-color)] select-none"
    >
      <Image src={VscodeImage} alt="VSCode Logo" className="w-5 h-5 mr-2" />

      <ul className="flex items-center h-full space-x-1">
        {menuItems.map(({ name, submenu }) => (
          <li key={name} className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === name ? null : name)}
              onMouseEnter={() => {
                if (openMenu && openMenu !== name) {
                  setOpenMenu(name);
                }
              }}
              className={`px-2.5 py-0.5 text-xs rounded-[4px] focus:outline-none transition-colors duration-100
                ${
                  openMenu === name
                    ? 'bg-[var(--vscode-list-focus-background)] text-[var(--vscode-list-focus-foreground)]'
                    : 'hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]'
                }
              `}
              title={name}
            >
              {name}
            </button>

            {openMenu === name && submenu && (
              <div
                className="absolute top-full left-0 mt-[1px] min-w-[14rem] max-w-sm bg-[var(--vscode-menubar-background)] border border-[var(--vscode-border-color)] rounded-sm shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {submenu.map((item, idx) => (
                  <DropdownItem key={idx} item={item} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuBar;
