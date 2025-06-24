import React from "react";
import {
  AiOutlineBranches,
  AiOutlineSync,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineFile,
  AiOutlineSetting,
} from "react-icons/ai";

const RemoteSSHIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3 L13 13"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="butt"
    />
    <path
      d="M13 3 L3 13"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="butt"
    />
  </svg>
);




const hoverClasses =
  "cursor-pointer hover:bg-[#0e639c] px-2 h-full flex items-center space-x-1 transition-colors";

const StatusBar = () => {
  return (
    <footer className="flex items-center justify-between bg-[#007acc] text-white text-[11px] font-sans h-[22px] select-none pr-2 shadow-inner">
      {/* Left side */}
      <div className="flex items-center space-x-3 h-full">
        <div className={`${hoverClasses} flex items-center justify-center bg-green-700 hover:bg-green-600`} title="Remote SSH">
          <RemoteSSHIcon />
        </div>

        <div className={hoverClasses} title="Git Branch">
          <AiOutlineBranches />
          <span>feat/vscode-portfolio-layout</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses} title="Incoming Changes">
          <AiOutlineSync />
          <span>2</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses} title="Errors">
          <AiOutlineCloseCircle />
          <span>0</span>
        </div>

        <div className={hoverClasses} title="Warnings">
          <AiOutlineExclamationCircle />
          <span>0</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses} title="Encoding">
          <span>UTF-8</span>
        </div>

        <div className={hoverClasses} title="EOL Sequence">
          <span>LF</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses} title="Cursor Position">
          <span>Ln 200, Col 58</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3 h-full">
        <div className={hoverClasses} title="File Type">
          <AiOutlineFile />
          <span>JavaScript</span>
        </div>

        <div className="border-l border-white h-4 opacity-30"></div>

        <div className={hoverClasses} title="Formatter">
          <AiOutlineSetting />
          <span>Prettier</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
