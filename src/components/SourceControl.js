"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  VscChevronRight,
  VscGitPullRequest,
  VscRefresh,
  VscGitCommit,
  VscCloudUpload,
  VscSync,
  VscSearch
} from "react-icons/vsc";

export default function SourceControl() {
  const [repos, setRepos] = useState([]);
  const [reposOpen, setReposOpen] = useState(true);
  const [selectedRepoName, setSelectedRepoName] = useState(null);
  const [selectedRepoData, setSelectedRepoData] = useState(null);

  const [statsOpen, setStatsOpen] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const githubUser = "HazemHassine";

  const fetchRepos = useCallback(async () => {
    setLoadingRepos(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.github.com/users/${githubUser}/repos?per_page=100`
      );
      if (!res.ok) throw new Error(res.statusText);
      const list = await res.json();
      const formatted = list.map((r) => ({
        name: r.name,
        full_name: r.full_name,
        branch: r.default_branch,
        stars_count: r.stargazers_count,
        html_url: r.html_url,
      }));
      setRepos(formatted);
      if (!selectedRepoName && formatted.length) {
        setSelectedRepoName(formatted[0].name);
      } else if (
        selectedRepoName &&
        !formatted.find((r) => r.name === selectedRepoName)
      ) {
        setSelectedRepoName(formatted[0]?.name || null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load repositories.");
    } finally {
      setLoadingRepos(false);
    }
  }, [githubUser, selectedRepoName]);

  const fetchRepoDetails = useCallback(async () => {
    if (!selectedRepoName) {
      setSelectedRepoData(null);
      setLoadingStats(false);
      return;
    }
    setLoadingStats(true);
    setError(null);
    setSelectedRepoData(null);

    const repo = repos.find((r) => r.name === selectedRepoName);
    if (!repo) {
      setLoadingStats(false);
      return;
    }

    try {
      // Fetch languages
      const langRes = await fetch(
        `https://api.github.com/repos/${repo.full_name}/languages`
      );
      if (!langRes.ok) throw new Error(langRes.statusText);
      const langData = await langRes.json();
      const topLangs = Object.entries(langData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang)
        .join(", ") || "N/A";

      setSelectedRepoData({
        ...repo,
        importantLanguages: topLangs,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load repository details.");
    } finally {
      setLoadingStats(false);
    }
  }, [selectedRepoName, repos]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  useEffect(() => {
    fetchRepoDetails();
  }, [fetchRepoDetails]);

  const filtered = repos.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleRefreshAll = () => fetchRepos();

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
        <span className="text-[11px] font-semibold uppercase text-[var(--vscode-text-secondary)]">
          SOURCE CONTROL
        </span>
        <button
          onClick={handleRefreshAll}
          disabled={loadingRepos}
          className="p-1 rounded hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]"
        >
          <VscRefresh size={16} className={loadingRepos ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Repositories */}
      <nav className="flex-shrink-0 border-b border-[var(--vscode-border-color)]">
        <div
          onClick={() => setReposOpen((o) => !o)}
          className="flex items-center cursor-pointer px-2 py-1 text-xs font-semibold uppercase text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)]"
        >
          <span
            className="mr-1 flex items-center justify-center"
            style={{
              transform: reposOpen ? "rotate(90deg)" : "rotate(0deg)",
              width: 12,
              height: 12,
            }}
          >
            <VscChevronRight size={12} />
          </span>
          REPOSITORIES
        </div>

        {reposOpen && (
          <>
            <div className="relative px-2 py-1">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-sm bg-[var(--vscode-input-background)] text-[var(--vscode-input-foreground)] border border-[var(--vscode-input-border)] rounded focus:outline-none focus:border-[var(--vscode-focusBorder)]"
              />
              <VscSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--vscode-input-placeholderForeground)]" />
            </div>

            <div className="space-y-0.5 overflow-y-auto max-h-48">
              {loadingRepos ? (
                <div className="text-center text-sm py-2 text-[var(--vscode-text-secondary)]">
                  Loading repositories...
                </div>
              ) : error ? (
                <div className="text-center text-sm py-2 text-red-500">
                  {error}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center text-sm py-2 text-[var(--vscode-text-secondary)]">
                  {searchTerm
                    ? "No matching repositories."
                    : `No repositories found for '${githubUser}'.`}
                </div>
              ) : (
                filtered.map((r) => {
                  const isSelected = selectedRepoName === r.name;
                  return (
                    <div
                      key={r.name}
                      onClick={() => setSelectedRepoName(r.name)}
                      className={`flex items-center justify-between px-2 py-[3px] text-sm cursor-pointer truncate ${
                        isSelected
                          ? "bg-[#094771] text-[var(--vscode-text-inverse)]"
                          : "hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]"
                      }`}
                      title={r.name}
                    >
                      <div className="flex items-center truncate space-x-1">
                        <VscGitCommit size={14} />
                        <span className="truncate">{r.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button title="Pull" className="p-1 rounded hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]">
                          <VscGitPullRequest size={14} />
                        </button>
                        <button title="Push" className="p-1 rounded hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]">
                          <VscCloudUpload size={14} />
                        </button>
                        <button title="Sync" className="p-1 rounded hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)]">
                          <VscSync size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </nav>

      {/* Statistics */}
      <nav className="flex-grow overflow-y-auto">
        <div
          onClick={() => setStatsOpen((o) => !o)}
          className="flex items-center cursor-pointer px-2 py-1 text-xs font-semibold uppercase text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] mt-2"
        >
          <span
            className="mr-1 flex items-center justify-center"
            style={{
              transform: statsOpen ? "rotate(90deg)" : "rotate(0deg)",
              width: 12,
              height: 12,
            }}
          >
            <VscChevronRight size={12} />
          </span>
          STATISTICS
        </div>

        {statsOpen && (
          <div className="px-2 py-2 space-y-2">
            {loadingStats && selectedRepoName ? (
              <div className="text-center text-sm py-2 text-[var(--vscode-text-secondary)]">
                Loading stats for {selectedRepoName}...
              </div>
            ) : error && selectedRepoName ? (
              <div className="text-center text-sm py-2 text-red-500">
                {error}
              </div>
            ) : selectedRepoData ? (
              <>
                <StatLine label="Repository" value={selectedRepoData.name} />
                <StatLine label="Branch" value={selectedRepoData.branch} />
                <StatLine label="Stars" value={selectedRepoData.stars_count} />
                <StatLine label="Languages" value={selectedRepoData.importantLanguages} />
              </>
            ) : (
              <div className="text-center text-sm py-2 text-[var(--vscode-text-secondary)]">
                Select a repository to view statistics.
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--vscode-border-color)] text-xs text-center text-[var(--vscode-text-secondary)] bg-[var(--vscode-tab-bar-background)]">
        <p>&copy; {new Date().getFullYear()} Hazem Hassine</p>
        <p>VSCode Portfolio</p>
      </div>
    </aside>
  );
}

function StatLine({ label, value }) {
  return (
    <div className="flex items-center text-sm">
      <span className="flex-shrink-0 w-3">•</span>
      <span>
        {label}: {value}
      </span>
    </div>
  );
}
