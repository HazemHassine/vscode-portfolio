import React from 'react';
import { FiX } from 'react-icons/fi';

const TabItem = ({ title, icon, isActive, onClick, onClose }) => {
  const activeClasses = 'bg-[#1e1e1e] text-white border-t-2 border-blue-500';
  const inactiveClasses = 'bg-[#252526] text-gray-400 hover:bg-[#333333]';

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 cursor-pointer border-r border-gray-700 min-w-[150px] max-w-[200px] transition-colors duration-150 ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      <div className="flex items-center overflow-hidden">
        <span className="mr-2 text-lg">{icon}</span>
        <span className="truncate text-sm">{title}</span>
      </div>
      {isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent tab click when closing
            onClose();
          }}
          className="ml-3 p-0.5 rounded hover:bg-gray-600 text-gray-400 hover:text-white"
          aria-label="Close tab"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default TabItem;
