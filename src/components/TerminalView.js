"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  VscTerminal,
  VscChevronDown,
  VscAdd,
  VscSplitHorizontal,
  VscTrash,
  VscChevronUp,
  VscChromeClose
} from 'react-icons/vsc';

const TerminalView = () => {
  const [history, setHistory] = useState([
    { type: 'info', text: 'Type help to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const contentRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll container and input into view
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [history]);

  const prompt = { user: 'hazem@HazemPC', cwd: '~/dev/vscode-portfolio' };

  // Command definitions
  const commands = {
    help: () => [
      'Available commands:',
      '  ls           - list directory contents',
      '  pwd          - print working directory',
      '  npm --version, npm -v',
      '  python3 --version, python3 -v',
      '  nvm list',
      '  clear        - clear the terminal'
    ],
    ls: () => ['README.md', 'projects.jsx', 'config.json', 'about.md'],
    pwd: () => [prompt.cwd],
    'npm --version': () => ['6.14.8'],
    'npm -v': () => ['6.14.8'],
    'python3 --version': () => ['Python 3.9.6'],
    'python3 -v': () => ['Python 3.9.6'],
    'nvm list': () => ['       v12.22.1', '       v14.17.0', '       v16.3.0', '->     v18.0.0', 'default -> 18.0.0'],
    clear: () => []
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      setHistory((h) => [...h, { type: 'command', text: cmd }]);
      if (commands[cmd]) {
        if (cmd === 'clear') {
          setHistory([]);
        } else {
          const result = commands[cmd]();
          setHistory((h) => [...h, ...result.map((line) => ({ type: 'output', text: line }))]);
        }
      } else if (cmd) {
        setHistory((h) => [...h, { type: 'error', text: `${cmd}: command not found` }]);
      }
      setInput('');
    }
  };

  // Panel tabs
  const tabs = ['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS', '...'];
  const activeTab = 'TERMINAL';

  return (
    <div className="flex flex-col h-80 border-t border-[var(--vscode-border-color)]">
      {/* Panel header */}
      <div className="flex items-center justify-between bg-[var(--vscode-panel-background)] text-[var(--vscode-panel-tab-inactiveForeground)] px-4 h-8 border-b border-[var(--vscode-border-color)]">
        <div className="flex space-x-6 text-xs font-medium">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={`cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)] ${tab === activeTab ? 'text-[var(--vscode-panel-tab-activeForeground)] border-b-2 border-[var(--vscode-focusBorder)] pb-1' : ''}`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-sm text-[var(--vscode-panel-tab-inactiveForeground)]">
          <VscTerminal className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <span className="text-xs">bash</span>
          <VscChevronDown className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <VscAdd className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <VscSplitHorizontal className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <VscTrash className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <VscChevronUp className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
          <VscChromeClose className="cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)]" />
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={contentRef}
        className="flex-1 bg-[var(--vscode-terminal-background)] text-[var(--vscode-terminal-foreground)] font-mono text-sm overflow-y-auto p-4 space-y-1"
      >
        {/* History */}
        {history.map((item, idx) => {
          if (item.type === 'command') {
            return (
              <div key={idx} className="flex">
                <span className="font-semibold text-[var(--vscode-terminal-ansi-bright-green)] mr-1">{prompt.user}</span>
                <span className="font-semibold text-[var(--vscode-terminal-ansi-blue)] mr-1">{prompt.cwd}</span>
                <span className="text-[var(--vscode-terminal-foreground)] mr-1">$</span>
                <span>{item.text}</span>
              </div>
            );
          }
          if (item.type === 'output') {
            return (
              <div key={idx} className="text-[var(--vscode-terminal-ansi-white)] whitespace-pre-wrap">
                {item.text}
              </div>
            );
          }
          if (item.type === 'info') {
            return (
              <div key={idx} className="text-[var(--vscode-text-secondary)] whitespace-pre-wrap">
                {item.text}
              </div>
            );
          }
          if (item.type === 'error') {
            return (
              <div key={idx} className="text-[var(--vscode-terminal-ansi-red)] whitespace-pre-wrap">
                {item.text}
              </div>
            );
          }
          return null;
        })}

        {/* Input line */}
        <div ref={inputRef} className="flex">
          <span className="font-semibold text-[var(--vscode-terminal-ansi-bright-green)] mr-1">{prompt.user}</span>
          <span className="font-semibold text-[var(--vscode-terminal-ansi-blue)] mr-1">{prompt.cwd}</span>
          <span className="text-[var(--vscode-terminal-foreground)] mr-1">$</span>
          <input
            ref={inputRef}
            className="bg-transparent outline-none flex-1 text-[var(--vscode-terminal-foreground)] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalView;
  