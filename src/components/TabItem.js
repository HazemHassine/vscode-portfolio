import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TabItem = ({ title, icon, isActive, onClick, onClose }) => {
  let baseClasses = "flex items-center justify-between px-4 h-9 cursor-pointer ";
  baseClasses += "font-mono text-sm font-semibold ";
  baseClasses += "border-r border-[var(--vscode-tab-border)] ";
  baseClasses += "min-w-0 transition-colors duration-100 ";

  let topBorderClasses = "border-t-4 ";

  if (isActive) {
    baseClasses += "bg-[var(--vscode-tab-active-background)] text-[var(--vscode-tab-active-text-color)] ";
    topBorderClasses += "border-[var(--vscode-tab-active-top-border-color)]";
  } else {
    baseClasses += "bg-[var(--vscode-tab-inactive-background)] text-[var(--vscode-tab-inactive-text-color)] ";
    baseClasses += "hover:bg-[var(--vscode-tab-hover-background)] ";
    topBorderClasses += "border-transparent";
  }

  const combinedClasses = `${baseClasses} ${topBorderClasses}`;

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      title={title}
    >
      <div className="flex items-center overflow-hidden min-w-0">
        {icon && (
          <span className="mr-2 text-base shrink-0 flex items-center">
            {icon}
          </span>
        )}
        <span className="truncate leading-none">{title}</span>
      </div>

      {/* Close button uses FaTimes icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-2 p-1 text-[var(--vscode-tab-close-button-color)] hover:text-[var(--vscode-tab-close-button-hover-color)] hover:bg-[rgba(255,255,255,0.1)] focus:outline-none shrink-0 flex items-center rounded-sm"
        aria-label={`Close ${title}`}
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TabItem;
