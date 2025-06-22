import React from 'react'; // Removed useState as isHovered for close button visibility is no longer needed
import { VscChromeClose } from 'react-icons/vsc';

const TabItem = ({ title, icon, isActive, onClick, onClose }) => {
  // Base classes for all tabs
  // Height: h-9 (36px). Padding: px-4 (16px horizontal). Font: font-mono, text-sm (14px), font-semibold.
  // No rounded corners.
  let baseClasses = "flex items-center justify-between px-4 h-9 cursor-pointer ";
  baseClasses += "font-mono text-sm font-semibold "; // Monospace, 13-14px (text-sm is 14px), semi-bold
  baseClasses += "border-r border-[var(--vscode-tab-border)] "; // Separator line (VSCode like)
  baseClasses += "min-w-0 "; // Allow shrinking below content size if necessary with overflow-x-auto
  baseClasses += "transition-colors duration-100 "; // For background hover

  // Top border classes
  let topBorderClasses = "border-t-4 ";

  // Active/Inactive specific styling
  if (isActive) {
    baseClasses += "bg-[var(--vscode-tab-active-background)] text-[var(--vscode-tab-active-text-color)] "; // #1e1e1e bg, #FFFFFF text
    topBorderClasses += "border-[var(--vscode-tab-active-top-border-color)]"; // #007ACC top border
  } else {
    baseClasses += "bg-[var(--vscode-tab-inactive-background)] text-[var(--vscode-tab-inactive-text-color)] "; // #2d2d2d bg, #CCCCCC text
    baseClasses += "hover:bg-[var(--vscode-tab-hover-background)] "; // #2A2D2E hover bg
    topBorderClasses += "border-transparent"; // Transparent top border for inactive tabs
  }

  const combinedClasses = `${baseClasses} ${topBorderClasses}`;

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      title={title} // Tooltip for potentially truncated titles
    >
      <div className="flex items-center overflow-hidden min-w-0"> {/* min-w-0 for inner flex item if title is very long */}
        {icon && (
          <span className="mr-2 text-base shrink-0 flex items-center"> {/* Icon size 16x16 (text-base), spacing */}
            {React.cloneElement(icon, { className: `${icon.props.className || ''} w-4 h-4` })}
          </span>
        )}
        <span className="truncate leading-none">{title}</span> {/* leading-none for better vertical centering with fixed height */}
      </div>

      {/* Close button: VscChromeClose, always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent tab click when closing
          onClose();
        }}
        // Default color #BBBBBB, hover #FFFFFF. No rounded corners for button itself.
        className="ml-2 p-1 text-[var(--vscode-tab-close-button-color)] hover:text-[var(--vscode-tab-close-button-hover-color)] hover:bg-[rgba(255,255,255,0.1)] focus:outline-none shrink-0 flex items-center rounded-sm"
        aria-label={`Close ${title}`}
      >
        <VscChromeClose className="w-4 h-4" /> {/* Explicit size for close icon */}
      </button>
    </div>
  );
};

export default TabItem;
