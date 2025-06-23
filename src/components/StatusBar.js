import React from "react";
import {
  AiOutlineBranches,
  AiOutlineSync,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineFile,
  AiOutlineSetting,
} from "react-icons/ai";

const StatusBar = () => {
  // Hover effect covers full height, no vertical padding
  const hoverClasses =
    "cursor-pointer hover:bg-[#0e639c] px-2 h-full flex items-center space-x-1";

  return (
    <footer className="flex items-center justify-between bg-[#007acc] text-white text-xs font-sans h-6 select-none px-2">
      {/* Left side */}
      <div className="flex items-center space-x-3 h-full">
        <div className={hoverClasses}>
          <AiOutlineBranches />
          <span>feat/vscode-portfolio-layout</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses}>
          <AiOutlineSync />
          <span>0</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses}>
          <AiOutlineCloseCircle />
          <span>0</span>
        </div>

        <div className={hoverClasses}>
          <AiOutlineExclamationCircle />
          <span>0</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses}>
          <span>UTF-8</span>
        </div>

        <div className={hoverClasses}>
          <span>LF</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses}>
          <span>Ln 200, Col 58</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3 h-full">
        <div className={hoverClasses}>
          <AiOutlineFile />
          <span>JavaScript</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses}>
          <AiOutlineSetting />
          <span>Prettier</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
