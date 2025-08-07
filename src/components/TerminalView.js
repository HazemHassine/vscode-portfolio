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

// Helper function to convert the explorer data format to our fileSystem format
const convertExplorerDataToFileSystem = (explorerData) => {
  const fileSystem = {};
  const processNode = (node, currentPath) => {
    if (node.type === 'folder') {
      const folderContent = {};
      node.children.forEach(child => {
        if (child.type === 'folder') {
          folderContent[child.name] = processNode(child, [...currentPath, child.name]);
        } else if (child.type === 'file') {
          folderContent[child.name] = `Content of ${child.name}`;
        }
      });
      return folderContent;
    } else if (node.type === 'file') {
      return `Content of ${node.name}`;
    }
  };

  explorerData.forEach(node => {
    if (node.type === 'folder') {
      fileSystem[node.name] = processNode(node, [node.name]);
    } else if (node.type === 'file') {
      fileSystem[node.name] = `Content of ${node.name}`;
    }
  });

  return fileSystem;
};

// .git folder contents
const gitFolderContents = [
  { type: "file", name: "config" },
  { type: "file", name: "HEAD" },
  {
    type: "folder",
    name: "hooks",
    children: [
      { type: "file", name: "pre-commit.sample" },
      { type: "file", name: "post-commit.sample" },
    ],
  },
  { type: "folder", name: "objects", children: [] },
  {
    type: "folder",
    name: "refs",
    children: [
      { type: "folder", name: "heads", children: [] },
      { type: "folder", name: "tags", children: [] },
    ],
  },
];

const initialExplorerData = [
  {
    type: "folder",
    name: ".git",
    children: gitFolderContents,
  },
  {
    type: "folder",
    name: "Portfolio",
    children: [
      { type: "file", name: "Home.jsx" },
      { type: "file", name: "About.md" },
      { type: "file", name: "Projects.jsx" },
      { type: "file", name: "Skills.jsx" },
      { type: "file", name: "Blog.md" },
      { type: "file", name: "Contact.jsx" },
    ],
  },
  {type: "file",
  name: ".gitignore",
  }
];

// Convert the initial explorer data into our desired file system structure
const fileSystem = {
  home: {
    hazem: {
      'vscode-portfolio': convertExplorerDataToFileSystem(initialExplorerData),
      documents: {
        'resume.pdf': 'My professional resume.',
        'notes.txt': 'Some personal notes.'
      }
    }
  }
};


// Helper function to resolve paths
// This function takes the current working directory (cwd) and a target path,
// and returns the absolute resolved path within our simulated file system.
const resolvePath = (cwd, targetPath) => {
  const cwdParts = cwd.split('/').filter(Boolean);
  let targetParts = targetPath.split('/').filter(Boolean);

  let resolvedParts = [];

  if (targetPath.startsWith('/')) {
    // If targetPath is absolute, start from root.
    resolvedParts = [];
  } else {
    // If targetPath is relative, start from current working directory.
    resolvedParts = [...cwdParts];
  }

  for (const part of targetParts) {
    if (part === '..') {
      // Go up one directory, but not past the root.
      if (resolvedParts.length > 0) {
        resolvedParts.pop();
      }
    } else if (part !== '.') {
      // Ignore '.' (current directory)
      resolvedParts.push(part);
    }
  }
  // Always return an absolute path, even for the root ('/')
  return '/' + resolvedParts.join('/');
};

// Helper function to get directory content from fileSystem
// Navigates the fileSystem object based on the given path and returns its keys (contents).
const getDirectoryContents = (path, fs) => {
  let current = fs;
  // Split path into parts, filtering out empty strings (e.g., from double slashes or leading/trailing slashes)
  const parts = path.split('/').filter(Boolean);

  for (const part of parts) {
    if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
      current = current[part];
    } else {
      return null; // Path not found or not a valid segment
    }
  }

  // If the final 'current' is an object (and not null), it's a directory.
  // Return its keys (files/subdirectories).
  if (typeof current === 'object' && current !== null) {
    return Object.keys(current);
  }
  return null; // Not a directory or path leads to a file
};

// Helper function to check if a path refers to a directory
const isDirectory = (path, fs) => {
  let current = fs;
  const parts = path.split('/').filter(Boolean);

  for (const part of parts) {
    if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
      current = current[part];
    } else {
      return false; // Path segment not found
    }
  }
  return typeof current === 'object' && current !== null;
};

const TerminalView = () => {
  const [history, setHistory] = useState([
    { type: 'info', text: 'Type help to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  // Initial current working directory (absolute path in the fileSystem)
  const [cwd, setCwd] = useState('/home/hazem/vscode-portfolio'); // Adjusted initial CWD
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

  // Dynamically generate the prompt based on the current working directory.
  // Shows a '~' for paths within '/home/hazem' for a more realistic feel.
  const prompt = {
    user: 'hazem@HazemPC',
    cwd: cwd.startsWith('/home/hazem') ? `~${cwd.substring('/home/hazem'.length)}` : cwd
  };

  // Command definitions
  const commands = {
    help: () => [
      'Available commands:',
      '  ls [path]    - list directory contents',
      '  cd [path]    - change directory',
      '  pwd          - print working directory',
      '  npm --version, npm -v',
      '  python3 --version, python3 -v',
      '  nvm list',
      '  clear        - clear the terminal'
    ],
    ls: (args) => {
      let targetPath = cwd;
      if (args.length > 0) {
        // Resolve the target path relative to the current directory
        targetPath = resolvePath(cwd, args[0]);
      }

      const contents = getDirectoryContents(targetPath, fileSystem);
      if (contents) {
        // Map contents to add '/' for directories
        return contents.map(item => {
          const itemFullPath = resolvePath(targetPath, item);
          return isDirectory(itemFullPath, fileSystem) ? `${item}/` : item;
        });
      } else {
        // If contents are null, it means the path doesn't exist or isn't a directory.
        // Check if it exists as a file to give a more specific error.
        const parentDir = resolvePath(targetPath, '..');
        const fileName = targetPath.split('/').pop();
        const parentContents = getDirectoryContents(parentDir, fileSystem);

        if (parentContents && parentContents.includes(fileName) && !isDirectory(targetPath, fileSystem)) {
            return [`ls: ${args[0]}: Not a directory`];
        }
        return [`ls: ${args[0]}: No such file or directory`];
      }
    },
    cd: (args) => {
      if (args.length === 0 || args[0] === '~') {
        // 'cd' with no arguments or 'cd ~' goes to the home directory
        setCwd('/home/hazem');
        return [];
      }

      const targetPath = resolvePath(cwd, args[0]);
      if (isDirectory(targetPath, fileSystem)) {
        setCwd(targetPath);
        return [];
      } else {
        // Provide more specific error messages
        const parentDir = resolvePath(targetPath, '..');
        const fileName = targetPath.split('/').pop();
        const parentContents = getDirectoryContents(parentDir, fileSystem);

        if (parentContents && parentContents.includes(fileName) && !isDirectory(targetPath, fileSystem)) {
            return [`cd: ${args[0]}: Not a directory`];
        }
        return [`cd: ${args[0]}: No such file or directory`];
      }
    },
    pwd: () => [cwd],
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
      const fullCommand = input.trim();
      setHistory((h) => [...h, { type: 'command', text: fullCommand }]);

      const [commandName, ...args] = fullCommand.split(' ');

      if (commands[commandName]) {
        if (commandName === 'clear') {
          setHistory([]);
        } else {
          // Execute command and add its output to history
          const result = commands[commandName](args);
          setHistory((h) => [...h, ...result.map((line) => ({ type: 'output', text: line }))]);
        }
      } else if (fullCommand) {
        // Command not found
        setHistory((h) => [...h, { type: 'error', text: `${fullCommand}: command not found` }]);
      }
      setInput(''); // Clear input after command execution
    }
  };

  // Panel tabs (unchanged from your original code)
  const tabs = ['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS', '...'];
  const activeTab = 'TERMINAL';

  return (
    <div className="flex flex-col h-full border-t border-[var(--vscode-border-color)]">
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