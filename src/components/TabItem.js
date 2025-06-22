import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc'; // VSCode's close icon

const TabItem = ({ title, icon, isActive, onClick, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base classes for all tabs
  let classes = "flex items-center justify-between px-3 py-2 cursor-pointer min-w-[150px] max-w-[220px] h-full "; // Ensure h-full for border-b
  classes += "border-r border-[var(--vscode-tab-border)] "; // Border between tabs
  classes += "transition-colors duration-100 rounded-t-md group "; // group for close button hover
  classes += "font-medium text-sm "; // font-semibold changed to font-medium for less aggressive boldness

  if (isActive) {
    classes += "bg-[var(--vscode-tab-active-background)] text-[var(--vscode-text-primary)] ";
    classes += "border-b-2 border-[var(--vscode-tab-active-border-bottom-color)]"; // Active tab highlight line
  } else {
    classes += "bg-[var(--vscode-tab-inactive-background)] text-[var(--vscode-text-secondary)] ";
    classes += "hover:bg-[var(--vscode-tab-hover-background)] hover:text-[var(--vscode-text-primary)]";
    // Transparent bottom border for inactive tabs to maintain layout consistency with active tab's border
    classes += " border-b-2 border-transparent";
  }

  const showCloseButton = isActive || isHovered;

  return (
    <div
      className={classes}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title} // Tooltip for truncated titles
    >
      <div className="flex items-center overflow-hidden mr-2"> {/* Added mr-2 for spacing before close button */}
        {icon && <span className="mr-2 text-base shrink-0">{icon}</span>} {/* Icon size & spacing, shrink-0 */}
        <span className="truncate">{title}</span>
      </div>

      {/* Close button: VscChromeClose, visible on active tab or when hovered (group-hover can also be used) */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent tab click when closing
          onClose();
        }}
        className={`ml-1 p-0.5 rounded hover:bg-[var(--vscode-list-hover-background)] text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] shrink-0 ${showCloseButton ? 'opacity-100' : 'opacity-0'}`}
        aria-label={`Close ${title}`}
      >
        <VscChromeClose className="w-4 h-4" /> {/* Explicit size for close icon */}
      </button>
    </div>
  );
};

export default TabItem;
