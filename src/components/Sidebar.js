import React from 'react';
// Attempting to use Vsc icons for a closer VSCode feel.
// Fallback to Fi if direct Vsc equivalents are not found or suitable.
import {
  VscFiles,
  VscAccount,
  VscBriefcase,
  VscMortarBoard, // For Skills
  VscCommentDiscussion, // For Blog
  VscMail,
  VscHome
} from 'react-icons/vsc';
// Fi icons as fallbacks or for variety if Vsc lacks a direct match
import { FiHome, FiUser, FiBriefcase, FiCode, FiMessageSquare, FiMail } from 'react-icons/fi';

const navItems = [
  // Using VscHome as it's more VSCode like than FiHome for this context.
  { name: 'Home', icon: <VscHome />, href: '#' },
  { name: 'About', icon: <VscAccount />, href: '#' },
  { name: 'Projects', icon: <VscBriefcase />, href: '#' },
  { name: 'Skills', icon: <VscMortarBoard />, href: '#' }, // VscMortarBoard for Skills
  { name: 'Blog', icon: <VscCommentDiscussion />, href: '#' }, // VscCommentDiscussion for Blog
  { name: 'Contact', icon: <VscMail />, href: '#' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)] flex flex-col shrink-0">
      {/* Explorer Title Area */}
      <div className="h-[35px] flex items-center px-4 pt-3 pb-2 border-b border-[var(--vscode-border-color)]">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--vscode-text-secondary)]">Explorer</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow p-2 space-y-1"> {/* Reduced padding and space for denser VSCode feel */}
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-1.5 text-sm rounded-[3px] hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors duration-100 group"
          >
            {/* Icons should be consistent size, ~16px. react-icons default size is usually 1em. */}
            <span className="mr-2 text-base leading-none group-hover:text-[var(--vscode-text-inverse)]"> {/* Adjusted margin to ~8px (mr-2) */}
              {item.icon}
            </span>
            <span className="group-hover:text-[var(--vscode-text-inverse)]">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Footer - Optional, can be removed if not desired */}
      <div className="p-3 border-t border-[var(--vscode-border-color)] text-xs text-center text-[var(--vscode-text-secondary)]">
        <p>&copy; {new Date().getFullYear()} Your Name</p>
        <p>VSCode Portfolio</p>
      </div>
    </aside>
  );
};

export default Sidebar;
