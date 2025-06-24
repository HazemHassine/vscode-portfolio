import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const TabItem = ({ title, icon, isActive, onClick, onClose }) => {
  const stateClasses = isActive
    ? 'bg-[var(--vscode-tab-active-background)] text-[var(--vscode-tab-active-text-color)] border-t-4 border-[var(--vscode-tab-active-top-border-color)]'
    : 'bg-[var(--vscode-tab-inactive-background)] text-[var(--vscode-tab-inactive-text-color)] hover:bg-[var(--vscode-tab-hover-background)] border-t-4 border-transparent';

  const classes = [
    'flex items-center justify-between pl-3 h-9 cursor-pointer font-mono text-sm',
    'border-r border-[var(--vscode-tab-border)] min-w-0 transition-colors duration-100',
    stateClasses
  ].join(' ');

  return (
    <div className={classes} onClick={onClick} title={title}>
      <div className="flex items-center overflow-hidden min-w-0">
        {icon && <span className="mr-2 text-base flex-shrink-0">{icon}</span>}
        <span className="truncate leading-none">{title}</span>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-2 p-1 text-[var(--vscode-tab-close-button-color)] hover:text-[var(--vscode-tab-close-button-hover-color)] hover:bg-[rgba(255,255,255,0.1)] focus:outline-none flex-shrink-0 flex items-center rounded-sm"
        aria-label={`Close ${title}`}
      >
        <IoCloseOutline className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TabItem;
