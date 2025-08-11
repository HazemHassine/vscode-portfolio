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
  { type: "file", name: "index" },
  { type: "file", name: "packed-refs" },
  {
    type: "folder",
    name: "hooks",
    children: [
      { type: "file", name: "pre-commit.sample" },
      { type: "file", name: "post-commit.sample" },
      { type: "file", name: "pre-push.sample" },
      { type: "file", name: "commit-msg.sample" },
    ],
  },
  { 
    type: "folder", 
    name: "objects", 
    children: [
      { type: "folder", name: "ab", children: [] },
      { type: "folder", name: "cd", children: [] },
      { type: "folder", name: "ef", children: [] },
    ] 
  },
  {
    type: "folder",
    name: "refs",
    children: [
      { 
        type: "folder", 
        name: "heads", 
        children: [
          { type: "file", name: "main" },
          { type: "file", name: "develop" },
        ] 
      },
      { type: "folder", name: "tags", children: [] },
      { type: "folder", name: "remotes", children: [] },
    ],
  },
  {
    type: "folder",
    name: "logs",
    children: [
      { type: "file", name: "HEAD" },
      {
        type: "folder",
        name: "refs",
        children: [
          {
            type: "folder",
            name: "heads",
            children: [{ type: "file", name: "main" }]
          }
        ]
      }
    ]
  }
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
      { type: "file", name: "About.md" },
      { type: "file", name: "Contact.json" },
      { type: "file", name: "Projects.jsx" },
      { type: "file", name: "Skills.jsx" },
      { type: "file", name: "Work.ipynb" },
    ],
  },
  { type: "file", name: "config.json" },
  { type: "file", name: ".gitignore" },
  { type: "file", name: "README.md" },
];

// File contents
const fileContents = {
  'config.json': `{
  "theme": "vscode-dark",
  "fontSize": 14,
  "fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
  "tabSize": 2,
  "wordWrap": "on",
  "lineNumbers": "on",
  "explorer": {
    "confirmDragAndDrop": false,
    "iconTheme": "vscode-icons"
  },
  "workbench": {
    "colorTheme": "Default Dark+",
    "activityBar": {
      "visible": true
    },
    "statusBar": {
      "visible": true
    }
  }
}`,
  'README.md': `# VS Code Style Portfolio

A **personal developer portfolio** that looks and feels like working inside **Visual Studio Code** – complete with a sidebar file explorer, tabbed editor, syntax highlighting, and a mock terminal.
Built with **Next.js** and **Tailwind CSS**, it’s designed to showcase projects and skills in an immersive, developer-friendly environment.

---

## 🚀 Overview

This portfolio recreates the **VS Code experience** in the browser, transforming a standard portfolio into an interactive workspace.
Key features include:

* **Sidebar File Explorer** – Navigate between “files” such as 'About.md', 'Skills.jsx', or 'contact.json'.
* **Tabbed Editor Interface** – Each file opens in a tab, complete with syntax highlighting and editable components.
* **Integrated Mock Terminal** – Adds authenticity to the coding environment.
* **Markdown & Code Rendering** – Supports GitHub-style Markdown, math formulas, and code previews.
* **Themed UI** – Styled to match VS Code’s dark theme, including icons and animations.

---

## 🛠 Tech Stack

**Frameworks & Libraries**

* [Next.js](https://nextjs.org/) – Routing, server-side rendering, static export
* [React](https://reactjs.org/) – Component-based UI
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
* [@headlessui/react](https://headlessui.dev/) – Accessible, unstyled UI components
* [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) – Embedded VS Code editor
* [@vscode/codicons](https://github.com/microsoft/vscode-codicons) – Official VS Code icon set

**Content Rendering**

* 'react-markdown', 'remark-gfm' – GitHub Flavored Markdown
* 'katex', 'rehype-katex', 'remark-math' – Math typesetting
* 'github-markdown-css' – GitHub-style Markdown styling

**UI & Interaction**

* 'react-icons' – Icon packs
* 'react-resizable-panels' – Resizable layouts
* 'react-transition-group' – Animations

**Tooling**

* ESLint & 'eslint-config-next' – Code quality
* 'http-proxy-middleware' – API proxy in development

---

## ⚡ Getting Started

### Prerequisites

* Node.js v14+
* npm, yarn, pnpm, or bun

### Installation

bash
git clone https://github.com/HazemHassine/vscode-portfolio.git
cd vscode-portfolio
npm install
# or: yarn / pnpm install / bun install

### Local Development

bash
npm run dev
# or: yarn dev / pnpm dev / bun dev

Then open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment

**Vercel (Recommended)**

1. Connect this repo in your [Vercel dashboard](https://vercel.com/dashboard).
2. Push to 'main' or 'master' – Vercel will auto-deploy.

**Static Export**

bash
npm run build
npm run export`,
  '.gitignore': `
# Important stuff
life_secrets.txt
.all_my_api_keys.env
the_meaning_of_life/

# Node / Next.js
node_modules/
.next/
out/
dist/
build/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Env
.env*
!.env.example

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Coverage
coverage/`,
  'About.md': `# Mohamed Hazem Hassine

## About Me

I'm a Computer Science graduate with a passion for data, coding in Python, and exploring machine learning.

## Core Interests
-   **Data Science & Machine Learning:** My experience includes conducting research in Federated Learning and leading AI-focused workshops.
-   **Software Development:** I have a strong background as an Information System Specialist in the Government and regulations sectors.
-   **Problem Solving:** I enjoy using data to solve practical problems and my goal is to work on Energy, Physics and Climate-related world-changing solutions.

## Highlights
-   **Federated Learning Research:** Explored cutting-edge techniques and implemented multiple approaches for computer vision tasks.
-   **AI Workshop Leadership:** Led workshops focused on artificial intelligence concepts and applications.
-   **Information Systems Specialist:** Maintained and optimized internal information systems, trained over 100 staff members, and automated data-related tasks.
`,
};

// Convert the initial explorer data into our desired file system structure
const fileSystem = {
  home: {
    hazem: {
      'portfolio': convertExplorerDataToFileSystem(initialExplorerData),
      documents: {
        'resume.pdf': 'My professional resume.',
        'notes.txt': 'Some personal notes.',
        'todo.md': '# TODO\n- Update portfolio\n- Fix responsive design\n- Add contact form'
      },
      downloads: {
        'installer.dmg': 'Application installer',
        'screenshot.png': 'Screenshot image'
      }
    }
  },
  usr: {
    local: {
      bin: {
        node: 'Node.js executable',
        npm: 'NPM executable',
        git: 'Git executable'
      }
    }
  },
  etc: {
    hosts: '127.0.0.1 localhost',
    passwd: 'System user database'
  }
};

// Helper function to resolve paths
const resolvePath = (cwd, targetPath) => {
  const cwdParts = cwd.split('/').filter(Boolean);
  let targetParts = targetPath.split('/').filter(Boolean);

  let resolvedParts = [];

  if (targetPath.startsWith('/')) {
    resolvedParts = [];
  } else {
    resolvedParts = [...cwdParts];
  }

  for (const part of targetParts) {
    if (part === '..') {
      if (resolvedParts.length > 0) {
        resolvedParts.pop();
      }
    } else if (part !== '.') {
      resolvedParts.push(part);
    }
  }
  return '/' + resolvedParts.join('/');
};

// Helper function to get directory content from fileSystem
const getDirectoryContents = (path, fs) => {
  let current = fs;
  const parts = path.split('/').filter(Boolean);

  for (const part of parts) {
    if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
      current = current[part];
    } else {
      return null;
    }
  }

  if (typeof current === 'object' && current !== null) {
    return Object.keys(current);
  }
  return null;
};

// Helper function to get file content
const getFileContent = (path, fs) => {
  let current = fs;
  const parts = path.split('/').filter(Boolean);

  for (const part of parts) {
    if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
      current = current[part];
    } else {
      return null;
    }
  }

  // Check if it's a known file with specific content
  const fileName = parts[parts.length - 1];
  if (fileContents[fileName]) {
    return fileContents[fileName];
  }

  return typeof current === 'string' ? current : null;
};

// Helper function to check if a path refers to a directory
const isDirectory = (path, fs) => {
  let current = fs;
  const parts = path.split('/').filter(Boolean);

  for (const part of parts) {
    if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
      current = current[part];
    } else {
      return false;
    }
  }
  return typeof current === 'object' && current !== null;
};

const TerminalView = () => {
  const [history, setHistory] = useState([
    { type: 'info', text: 'Welcome to VS Code Terminal! Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/hazem/portfolio');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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

  const prompt = {
    user: 'hazem@HazemPC',
    cwd: cwd.startsWith('/home/hazem') ? `~${cwd.substring('/home/hazem'.length)}` : cwd
  };

  // Get current git branch (simulated)
  const getCurrentGitBranch = () => {
    if (cwd.includes('portfolio')) {
      return 'main';
    }
    return null;
  };

  // Command definitions
  const commands = {
    help: () => [
      'Available commands:',
      '',
      'File & Directory Operations:',
      '  ls [options] [path]  - list directory contents',
      '  ll                   - detailed list (ls -la)',
      '  cd [path]           - change directory',
      '  pwd                 - print working directory',
      '  mkdir <name>        - create directory',
      '  touch <file>        - create empty file',
      '  cat <file>          - display file contents',
      '  head <file>         - show first 10 lines',
      '  tail <file>         - show last 10 lines',
      '  find <name>         - search for files/folders',
      '  tree                - show directory tree',
      '',
      'Git Commands:',
      '  git status          - show repository status',
      '  git log             - show commit history',
      '  git branch          - list branches',
      '  git diff            - show changes',
      '  git add .           - stage all changes',
      '  git commit -m       - commit changes',
      '  git push            - push to remote',
      '  git pull            - pull from remote',
      '',
      'Node.js & NPM:',
      '  npm install         - install dependencies',
      '  npm start           - start development server',
      '  npm run build       - build for production',
      '  npm test            - run tests',
      '  npm --version       - show npm version',
      '  node --version      - show node version',
      '',
      'System Commands:',
      '  ps                  - show running processes',
      '  top                 - show system resources',
      '  whoami              - current user',
      '  date                - current date/time',
      '  history             - command history',
      '  clear               - clear terminal',
      '  exit                - close terminal'
    ],

    ls: (args) => {
      let targetPath = cwd;
      let showHidden = false;
      let longFormat = false;

      // Parse arguments
      args.forEach(arg => {
        if (arg.startsWith('-')) {
          if (arg.includes('a')) showHidden = true;
          if (arg.includes('l')) longFormat = true;
        } else {
          targetPath = resolvePath(cwd, arg);
        }
      });

      const contents = getDirectoryContents(targetPath, fileSystem);
      if (contents) {
        let items = contents.filter(item => showHidden || !item.startsWith('.'));
        
        return items.map(item => {
          const itemFullPath = resolvePath(targetPath, item);
          const isDir = isDirectory(itemFullPath, fileSystem);
          
          if (longFormat) {
            const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = isDir ? '4096' : '1024';
            const date = 'Jan 15 10:30';
            return `${permissions} 1 hazem hazem ${size.padStart(8)} ${date} ${item}${isDir ? '/' : ''}`;
          }
          
          return isDir ? `${item}/` : item;
        });
      } else {
        return [`ls: cannot access '${args[0] || targetPath}': No such file or directory`];
      }
    },

    ll: () => commands.ls(['-la']),

    cd: (args) => {
      if (args.length === 0 || args[0] === '~') {
        setCwd('/home/hazem');
        return [];
      }

      const targetPath = resolvePath(cwd, args[0]);
      if (isDirectory(targetPath, fileSystem)) {
        setCwd(targetPath);
        return [];
      } else {
        return [`bash: cd: ${args[0]}: No such file or directory`];
      }
    },

    pwd: () => [cwd],

    mkdir: (args) => {
      if (args.length === 0) {
        return ['mkdir: missing operand'];
      }
      return [`mkdir: created directory '${args[0]}'`];
    },

    touch: (args) => {
      if (args.length === 0) {
        return ['touch: missing file operand'];
      }
      return []; // Silent success
    },

    cat: (args) => {
      if (args.length === 0) {
        return ['cat: missing file operand'];
      }
      
      const filePath = resolvePath(cwd, args[0]);
      const content = getFileContent(filePath, fileSystem);
      
      if (content) {
        return content.split('\n');
      } else {
        return [`cat: ${args[0]}: No such file or directory`];
      }
    },

    head: (args) => {
      if (args.length === 0) {
        return ['head: missing file operand'];
      }
      
      const filePath = resolvePath(cwd, args[0]);
      const content = getFileContent(filePath, fileSystem);
      
      if (content) {
        return content.split('\n').slice(0, 10);
      } else {
        return [`head: cannot open '${args[0]}' for reading: No such file or directory`];
      }
    },

    tail: (args) => {
      if (args.length === 0) {
        return ['tail: missing file operand'];
      }
      
      const filePath = resolvePath(cwd, args[0]);
      const content = getFileContent(filePath, fileSystem);
      
      if (content) {
        const lines = content.split('\n');
        return lines.slice(-10);
      } else {
        return [`tail: cannot open '${args[0]}' for reading: No such file or directory`];
      }
    },

    find: (args) => {
      if (args.length === 0) {
        return ['find: missing argument'];
      }
      const searchTerm = args[0];
      // Simplified find implementation
      const results = [`./src/components/${searchTerm}.jsx`, `./docs/${searchTerm}.md`];
      return results.filter(() => Math.random() > 0.5); // Simulate some results
    },

    tree: () => {
      if (cwd.includes('portfolio')) {
        return [
          '.',
          '├── config.json',
          '├── .gitignore',
          '├── Portfolio/',
          '│   ├── About.md',
          '│   ├── Contact.json',
          '│   ├── Projects.jsx',
          '│   ├── Skills.jsx',
          '│   └── Work.ipynb',
          '└── README.md',
          '',
          '1 directory, 7 files'
        ];
      }
      return ['tree: command not found in this directory'];
    },

    // Git commands
    'git status': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '  (use "git checkout -- <file>..." to discard changes in working directory)',
        '',
        '        modified:   Portfolio/About.md',
        '        modified:   Portfolio/Contact.json',
        '',
        'Untracked files:',
        '  (use "git add <file>..." to include in what will be committed)',
        '',
        '        Portfolio/Work.ipynb',
        '',
        'no changes added to commit (use "git add" and/or "git commit -a")'
      ];
    },

    'git log': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'commit a1b2c3d4e5f6789012345678901234567890abcd (HEAD -> main, origin/main)',
        'Author: Hazem <hazem@example.com>',
        'Date:   Mon Jan 15 10:30:00 2024 +0100',
        '',
        '    Update portfolio content and add Jupyter notebook',
        '',
        'commit f6e5d4c3b2a1098765432109876543210987fedc',
        'Author: Hazem <hazem@example.com>',
        'Date:   Sun Jan 14 15:20:00 2024 +0100',
        '',
        '    Initial commit with portfolio structure'
      ];
    },

    'git branch': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        '  develop',
        '  feature/jupyter-integration',
        '* main'
      ];
    },

    'git diff': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'diff --git a/Portfolio/About.md b/Portfolio/About.md',
        'index 1234567..abcdefg 100644',
        '--- a/Portfolio/About.md',
        '+++ b/Portfolio/About.md',
        '@@ -5,7 +5,7 @@ I\'m a passionate full-stack developer with a love for creating innovative web',
        ' ### Background',
        ' ',
        '- 🎓 Computer Science graduate with 3+ years of professional experience',
        '-- 💻 Specialized in React, Node.js, and modern web technologies',
        '+- 💻 Specialized in React, Node.js, Python, and modern web technologies',
        '- 🌟 Always eager to learn new technologies and best practices'
      ];
    },

    'git add .': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return []; // Silent success
    },

    'git commit -m': (args) => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      if (args.length === 0) {
        return ['error: switch `m\' requires a value'];
      }
      const message = args.join(' ').replace(/['"]/g, '');
      return [
        `[main ${Math.random().toString(36).substr(2, 7)}] ${message}`,
        ' 3 files changed, 18 insertions(+), 5 deletions(-)',
        ' create mode 100644 Portfolio/Work.ipynb'
      ];
    },

    'git push': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'Enumerating objects: 8, done.',
        'Counting objects: 100% (8/8), done.',
        'Delta compression using up to 8 threads',
        'Compressing objects: 100% (4/4), done.',
        'Writing objects: 100% (5/5), 567 bytes | 567.00 KiB/s, done.',
        'Total 5 (delta 2), reused 0 (delta 0), pack-reused 0',
        'To github.com:hazem/portfolio.git',
        '   a1b2c3d..e4f5g6h  main -> main'
      ];
    },

    'git pull': () => {
      if (!cwd.includes('portfolio')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'Already up to date.'
      ];
    },

    // NPM commands
    'npm install': () => {
      return ['npm: command not found - this is not a Node.js project'];
    },

    'npm start': () => {
      return ['npm: command not found - this is not a Node.js project'];
    },

    'npm run build': () => {
      return ['npm: command not found - this is not a Node.js project'];
    },

    'npm test': () => {
      return ['npm: command not found - this is not a Node.js project'];
    },

    'npm --version': () => ['9.6.7'],
    'npm -v': () => ['9.6.7'],
    'node --version': () => ['v18.17.0'],
    'node -v': () => ['v18.17.0'],

    // System commands
    ps: () => [
      '  PID TTY          TIME CMD',
      ' 1234 pts/0    00:00:01 bash',
      ' 5678 pts/0    00:00:00 code',
      ' 9012 pts/0    00:00:02 node',
      ' 3456 pts/0    00:00:00 ps'
    ],

    top: () => [
      'top - 10:30:15 up 2 days,  3:24,  1 user,  load average: 0.52, 0.58, 0.59',
      'Tasks: 245 total,   1 running, 244 sleeping,   0 stopped,   0 zombie',
      '%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.1 id,  0.4 wa,  0.0 hi,  0.2 si,  0.0 st',
      'MiB Mem :   16384.0 total,   4256.2 free,   8192.4 used,   3935.4 buff/cache',
      'MiB Swap:    2048.0 total,   2048.0 free,      0.0 used.   7168.5 avail Mem',
      '',
      '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
      ' 1234 hazem     20   0 3847256 518424  98756 S   3.3   3.1   1:23.45 code',
      ' 5678 hazem     20   0 1234567 256789  45678 S   2.1   1.5   0:45.23 node',
      ' 9012 hazem     20   0  876543 123456  23456 S   1.2   0.7   0:12.34 chrome'
    ],

    whoami: () => ['hazem'],

    date: () => {
      const now = new Date();
      return [now.toString()];
    },

    history: () => {
      return commandHistory.map((cmd, index) => `${(index + 1).toString().padStart(4)} ${cmd}`);
    },

    clear: () => [],

    exit: () => ['Connection closed by remote host.']
  };

  // Handle key presses
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const fullCommand = input.trim();
      if (fullCommand) {
        setCommandHistory(prev => [...prev, fullCommand]);
      }
      setHistory((h) => [...h, { type: 'command', text: fullCommand }]);

      const [commandName, ...args] = fullCommand.split(' ');

      if (commands[commandName]) {
        if (commandName === 'clear') {
          setHistory([]);
        } else {
          const result = commands[commandName](args);
          if (result.length > 0) {
            setHistory((h) => [...h, ...result.map((line) => ({ type: 'output', text: line }))]);
          }
        }
      } else if (fullCommand) {
        // Check for compound commands
        const compoundCommand = `${commandName} ${args.join(' ')}`.trim();
        if (commands[compoundCommand]) {
          const result = commands[compoundCommand]([]);
          setHistory((h) => [...h, ...result.map((line) => ({ type: 'output', text: line }))]);
        } else {
          setHistory((h) => [...h, { type: 'error', text: `bash: ${commandName}: command not found` }]);
        }
      }
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for common commands
      const commonCommands = ['ls', 'll', 'cd', 'cat', 'git', 'npm', 'node', 'mkdir', 'touch', 'pwd', 'clear', 'help'];
      const matches = commonCommands.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    }
  };

  // Panel tabs
  const tabs = ['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS', '...'];
  const activeTab = 'TERMINAL';

  // Get git branch for prompt
  const gitBranch = getCurrentGitBranch();

  return (
    <div className="flex flex-col h-full border-t border-[var(--vscode-border-color)]">
      {/* Panel header */}
      <div className="flex items-center justify-between bg-[var(--vscode-panel-background)] text-[var(--vscode-panel-tab-inactiveForeground)] px-4 h-8 border-b border-[var(--vscode-border-color)]">
        <div className="flex space-x-6 text-xs font-medium">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={`cursor-pointer hover:text-[var(--vscode-panel-tab-activeForeground)] ${
                tab === activeTab ? 'text-[var(--vscode-panel-tab-activeForeground)] border-b-2 border-[var(--vscode-focusBorder)] pb-1' : ''
              }`}
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
              <div key={idx} className="flex items-center">
                <span className="font-semibold text-[var(--vscode-terminal-ansi-bright-green)] mr-1">{prompt.user}</span>
                <span className="font-semibold text-[var(--vscode-terminal-ansi-blue)] mr-1">{prompt.cwd}</span>
                {gitBranch && (
                  <span className="font-semibold text-[var(--vscode-terminal-ansi-magenta)] mr-1">({gitBranch})</span>
                )}
                <span className="text-[var(--vscode-terminal-foreground)] mr-1">$</span>
                <span>{item.text}</span>
              </div>
            );
          }
          if (item.type === 'output') {
            return (
              <div key={idx} className="text-[var(--vscode-terminal-ansi-white)] whitespace-pre-wrap font-mono">
                {item.text}
              </div>
            );
          }
          if (item.type === 'info') {
            return (
              <div key={idx} className="text-[var(--vscode-terminal-ansi-bright-blue)] whitespace-pre-wrap">
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
        <div ref={inputRef} className="flex items-center">
          <span className="font-semibold text-[var(--vscode-terminal-ansi-bright-green)] mr-1">{prompt.user}</span>
          <span className="font-semibold text-[var(--vscode-terminal-ansi-blue)] mr-1">{prompt.cwd}</span>
          {gitBranch && (
            <span className="font-semibold text-[var(--vscode-terminal-ansi-magenta)] mr-1">({gitBranch})</span>
          )}
          <span className="text-[var(--vscode-terminal-foreground)] mr-1">$</span>
          <input
            ref={inputRef}
            className="bg-transparent outline-none flex-1 text-[var(--vscode-terminal-foreground)] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalView;