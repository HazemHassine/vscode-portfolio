import React from 'react';

const menuItems = [
  { name: 'File', action: () => console.log('File clicked') },
  { name: 'Edit', action: () => console.log('Edit clicked') },
  { name: 'Selection', action: () => console.log('Selection clicked') },
  { name: 'View', action: () => console.log('View clicked') },
  { name: 'Go', action: () => console.log('Go clicked') },
  { name: 'Run', action: () => console.log('Run clicked') },
  { name: 'Terminal', action: () => console.log('Terminal clicked') },
  { name: 'Help', action: () => console.log('Help clicked') },
];

const MenuBar = () => {
  return (
    <nav className="flex items-center bg-[var(--vscode-menubar-background)] text-[var(--vscode-text-primary)] px-2 h-[30px] shrink-0 border-b border-[var(--vscode-border-color)]">
      {/* Optional: App Icon / Logo, similar to VSCode's */}
      {/* <div className="px-2 mr-2">
        <VscCode className="w-5 h-5 text-blue-500" /> {}
      </div> */}

      <ul className="flex items-center h-full">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={item.action}
              className="px-2.5 py-0.5 text-xs rounded-[4px] hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors duration-100 focus:outline-none focus:bg-[var(--vscode-list-hover-background)]"
              title={item.name} // Basic tooltip
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Optional: Window Title / Current File - VSCode often has this in the center or after menus */}
      {/* <div className="flex-grow text-center text-xs text-[var(--vscode-text-secondary)]">
        Your Portfolio - page.js
      </div> */}

      {/* Optional: Window Controls (Minimize, Maximize, Close) - Usually OS controlled */}
      {/* <div className="flex items-center pl-2">
        {}
      </div> */}
    </nav>
  );
};

export default MenuBar;
