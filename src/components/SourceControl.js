"use client";

import React, { useState, useEffect } from "react";
import {
  VscChevronRight,
  VscSourceControl,
  VscRefresh,
  VscSync,
  VscGitCommit,
  VscGitPullRequest,
  VscCloudUpload,
} from "react-icons/vsc";
import { BsDot } from "react-icons/bs";

const placeholderRepos = [
  { name: "vscode-portfolio", branch: "main", dirty: true },
  { name: "blog", branch: "develop", dirty: false },
  { name: "api-server", branch: "feature/ui", dirty: false },
];

export default function SourceControl() {
  const [repos, setRepos] = useState([]);
  const [reposOpen, setReposOpen] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const [statsOpen, setStatsOpen] = useState(true);

  useEffect(() => {
    // TODO: replace with GitHub API call
    setRepos(placeholderRepos);
  }, []);

  return (
    <aside className="w-[280px] flex flex-col shrink-0 select-none font-sans
      bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)]
      border-r border-[var(--vscode-border-color)]"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between h-[35px] px-2
        border-b border-[var(--vscode-border-color)]
        bg-[var(--vscode-tab-bar-background)]"
      >
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold uppercase text-[var(--vscode-text-secondary)]">
            SOURCE CONTROL
          </span>
        </div>
        <button
          title="Refresh All"
          className="p-1 rounded hover:cursor-pointer hover:bg-[var(--vscode-list-hover-background)]
            hover:text-[var(--vscode-text-inverse)] transition-colors duration-150"
        >
          <VscRefresh size={16} />
        </button>
      </div>

      {/* REPOSITORIES */}
      <nav className="flex-shrink-0 border-b border-[var(--vscode-border-color)]">
        <div
          onClick={() => setReposOpen(o => !o)}
          className="flex items-center cursor-pointer select-none px-2 py-1 text-xs
            font-semibold uppercase text-[var(--vscode-text-secondary)]
            hover:text-[var(--vscode-text-primary)]"
        >
          <span
            className="mr-1 flex items-center justify-center select-none"
            style={{
              transform: reposOpen ? "rotate(90deg)" : "rotate(0deg)",
              width: 12, height: 12,
            }}
          >
            <VscChevronRight size={12} />
          </span>
          REPOSITORIES
        </div>

        {reposOpen && (
          <div className="space-y-0.5">
            {repos.map(r => {
              const isSelected = selectedRepo === r.name;
              return (
                <div
                  key={r.name}
                  onClick={() => setSelectedRepo(r.name)}
                  className={`flex items-center justify-between px-2 py-[3px] text-sm cursor-pointer truncate
                    ${isSelected
                      ? "bg-[#094771] text-[var(--vscode-text-inverse)]"
                      : "hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]"
                    }`}
                  title={r.name}
                >
                  <div className="flex items-center truncate space-x-1">
                    <VscGitCommit size={14} />
                    <span className="truncate">{r.name}</span>
                    {r.dirty && <span className="flex items-center font-bold text-xl justify-center text-orange-300 pl-1">•</span>}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      title="Pull"
                      className="p-1 rounded hover:cursor-pointer hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
                    >
                      <VscGitPullRequest size={14} />
                    </button>
                    <button
                      title="Push"
                      className="p-1 rounded hover:cursor-pointer hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
                    >
                      <VscCloudUpload size={14} />
                    </button>
                    <button
                      title="Sync"
                      className="p-1 rounded hover:cursor-pointer hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
                    >
                      <VscSync size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </nav>

      {/* STATISTICS */}
      <nav className="flex-grow overflow-y-auto">
        <div
          onClick={() => setStatsOpen(o => !o)}
          className="flex items-center cursor-pointer select-none px-2 py-1 text-xs
            font-semibold uppercase text-[var(--vscode-text-secondary)]
            hover:text-[var(--vscode-text-primary)] mt-2"
        >
          <span
            className="mr-1 flex items-center justify-center select-none"
            style={{
              transform: statsOpen ? "rotate(90deg)" : "rotate(0deg)",
              width: 12, height: 12,
            }}
          >
            <VscChevronRight size={12} />
          </span>
          STATISTICS
        </div>

        {statsOpen && (
          <div className="px-2 py-2 space-y-2">
            {/* placeholder stat lines */}
            <div className="flex items-center text-sm">
              <span className="flex-shrink-0 w-3">•</span>
              <span>Commits this week: 24</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="flex-shrink-0 w-3">•</span>
              <span>Open PRs: 5</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="flex-shrink-0 w-3">•</span>
              <span>Stars: 42</span>
            </div>
            {/* or swap in your SVG/chart here */}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--vscode-border-color)]
        text-xs text-center text-[var(--vscode-text-secondary)]
        bg-[var(--vscode-tab-bar-background)]"
      >
        <p>&copy; {new Date().getFullYear()} Your Name</p>
        <p>VSCode Portfolio</p>
      </div>
    </aside>
  );
}
