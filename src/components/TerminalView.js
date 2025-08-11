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
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.jsx" },
          { type: "file", name: "Footer.jsx" },
          { type: "file", name: "Navbar.jsx" },
        ]
      },
      {
        type: "folder",
        name: "pages",
        children: [
          { type: "file", name: "Home.jsx" },
          { type: "file", name: "About.jsx" },
          { type: "file", name: "Contact.jsx" },
        ]
      },
      {
        type: "folder",
        name: "utils",
        children: [
          { type: "file", name: "helpers.js" },
          { type: "file", name: "constants.js" },
        ]
      },
      { type: "file", name: "App.jsx" },
      { type: "file", name: "index.js" },
    ],
  },
  {
    type: "folder",
    name: "public",
    children: [
      { type: "file", name: "index.html" },
      { type: "file", name: "favicon.ico" },
      { type: "file", name: "manifest.json" },
    ],
  },
  {
    type: "folder",
    name: "node_modules",
    children: [
      { type: "folder", name: "react", children: [] },
      { type: "folder", name: "react-dom", children: [] },
      { type: "folder", name: "webpack", children: [] },
      { type: "folder", name: "babel", children: [] },
    ],
  },
  { type: "file", name: "package.json" },
  { type: "file", name: "package-lock.json" },
  { type: "file", name: "README.md" },
  { type: "file", name: ".gitignore" },
  { type: "file", name: ".env" },
  { type: "file", name: "tailwind.config.js" },
  { type: "file", name: "postcss.config.js" },
];

// File contents
const fileContents = {
  'package.json': `{
  "name": "portfolio-app",
  "version": "1.0.0",
  "description": "A modern portfolio website",
  "main": "src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "dev": "npm start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0"
  }
}`,
  'README.md': `# Portfolio App

A modern, responsive portfolio website built with React and Tailwind CSS.

## Getting Started

1. Install dependencies: \`npm install\`
2. Start development server: \`npm start\`
3. Build for production: \`npm run build\`

## Features

- Responsive design
- Modern UI components
- Fast performance
- SEO optimized`,
  '.gitignore': `node_modules/
.env.local
.env.development.local
.env.test.local
.env.production.local
build/
dist/
.DS_Store`,
  '.env': `REACT_APP_API_URL=http://localhost:3001
NODE_ENV=development`,
};

// Convert the initial explorer data into our desired file system structure
const fileSystem = {
  home: {
    hazem: {
      'portfolio-app': convertExplorerDataToFileSystem(initialExplorerData),
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
  const [cwd, setCwd] = useState('/home/hazem/portfolio-app');
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
    if (cwd.includes('portfolio-app')) {
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
      if (cwd.includes('portfolio-app')) {
        return [
          '.',
          '├── src/',
          '│   ├── components/',
          '│   │   ├── Header.jsx',
          '│   │   ├── Footer.jsx',
          '│   │   └── Navbar.jsx',
          '│   ├── pages/',
          '│   │   ├── Home.jsx',
          '│   │   ├── About.jsx',
          '│   │   └── Contact.jsx',
          '│   ├── App.jsx',
          '│   └── index.js',
          '├── public/',
          '│   ├── index.html',
          '│   ├── favicon.ico',
          '│   └── manifest.json',
          '├── package.json',
          '├── README.md',
          '└── .gitignore',
          '',
          '5 directories, 12 files'
        ];
      }
      return ['tree: command not found in this directory'];
    },

    // Git commands
    'git status': () => {
      if (!cwd.includes('portfolio-app')) {
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
        '        modified:   src/App.jsx',
        '        modified:   src/components/Header.jsx',
        '',
        'Untracked files:',
        '  (use "git add <file>..." to include in what will be committed)',
        '',
        '        src/components/NewComponent.jsx',
        '',
        'no changes added to commit (use "git add" and/or "git commit -a")'
      ];
    },

    'git log': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'commit a1b2c3d4e5f6789012345678901234567890abcd (HEAD -> main, origin/main)',
        'Author: Hazem <hazemhassine.edu@gmail.com>',
        'Date:   Mon Jan 15 10:30:00 2024 +0100',
        '',
        '    Update portfolio components and styling',
        '',
        'commit f6e5d4c3b2a1098765432109876543210987fedc',
        'Author: Hazem <hazemhassine.edu@gmail.com>',
        'Date:   Sun Jan 14 15:20:00 2024 +0100',
        '',
        '    Initial commit with basic portfolio structure'
      ];
    },

    'git branch': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        '  develop',
        '  feature/new-design',
        '* main'
      ];
    },

    'git diff': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'diff --git a/src/App.jsx b/src/App.jsx',
        'index 1234567..abcdefg 100644',
        '--- a/src/App.jsx',
        '+++ b/src/App.jsx',
        '@@ -10,7 +10,7 @@ function App() {',
        '   return (',
        '     <div className="App">',
        '       <Header />',
        '-      <main className="container">',
        '+      <main className="container mx-auto px-4">',
        '         <Routes>',
        '           <Route path="/" element={<Home />} />',
        '           <Route path="/about" element={<About />} />'
      ];
    },

    'git add .': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return []; // Silent success
    },

    'git commit -m': (args) => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      if (args.length === 0) {
        return ['error: switch `m\' requires a value'];
      }
      const message = args.join(' ').replace(/['"]/g, '');
      return [
        `[main ${Math.random().toString(36).substr(2, 7)}] ${message}`,
        ' 2 files changed, 15 insertions(+), 8 deletions(-)',
        ' create mode 100644 src/components/NewComponent.jsx'
      ];
    },

    'git push': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'Enumerating objects: 8, done.',
        'Counting objects: 100% (8/8), done.',
        'Delta compression using up to 8 threads',
        'Compressing objects: 100% (4/4), done.',
        'Writing objects: 100% (5/5), 567 bytes | 567.00 KiB/s, done.',
        'Total 5 (delta 2), reused 0 (delta 0), pack-reused 0',
        'To github.com:hazem/portfolio-app.git',
        '   a1b2c3d..e4f5g6h  main -> main'
      ];
    },

    'git pull': () => {
      if (!cwd.includes('portfolio-app')) {
        return ['fatal: not a git repository (or any of the parent directories): .git'];
      }
      return [
        'Already up to date.'
      ];
    },

    // NPM commands
    'npm install': () => {
      if (!getFileContent(resolvePath(cwd, 'package.json'), fileSystem)) {
        return ['npm ERR! ENOENT: no such file or directory, open \'package.json\''];
      }
      return [
        '',
        '> portfolio-app@1.0.0 install',
        '',
        'npm WARN deprecated babel-eslint@10.1.0: babel-eslint is now @babel/eslint-parser',
        'npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained',
        '',
        'added 1452 packages, and audited 1453 packages in 23s',
        '',
        '247 packages are looking for funding',
        '  run `npm fund` for details',
        '',
        'found 0 vulnerabilities'
      ];
    },

    'npm start': () => {
      if (!getFileContent(resolvePath(cwd, 'package.json'), fileSystem)) {
        return ['npm ERR! ENOENT: no such file or directory, open \'package.json\''];
      }
      return [
        '',
        '> portfolio-app@1.0.0 start',
        '> react-scripts start',
        '',
        'Starting the development server...',
        '',
        'Compiled successfully!',
        '',
        'You can now view portfolio-app in the browser.',
        '',
        '  Local:            http://localhost:3000',
        '  On Your Network:  http://192.168.1.100:3000',
        '',
        'Note that the development build is not optimized.',
        'To create a production build, use npm run build.'
      ];
    },

    'npm run build': () => {
      if (!getFileContent(resolvePath(cwd, 'package.json'), fileSystem)) {
        return ['npm ERR! ENOENT: no such file or directory, open \'package.json\''];
      }
      return [
        '',
        '> portfolio-app@1.0.0 build',
        '> react-scripts build',
        '',
        'Creating an optimized production build...',
        'Compiled successfully.',
        '',
        'File sizes after gzip:',
        '',
        '  47.2 KB  build/static/js/main.a1b2c3d4.js',
        '  2.1 KB   build/static/css/main.e4f5g6h7.css',
        '',
        'The project was built assuming it is hosted at /',
        'You can control this with the homepage field in your package.json.',
        '',
        'The build folder is ready to be deployed.'
      ];
    },

    'npm test': () => {
      return [
        '',
        '> portfolio-app@1.0.0 test',
        '> react-scripts test --watchAll=false',
        '',
        'PASS src/App.test.js',
        '  ✓ renders learn react link (25ms)',
        '',
        'PASS src/components/Header.test.js',
        '  ✓ renders header component (15ms)',
        '',
        'Test Suites: 2 passed, 2 total',
        'Tests:       2 passed, 2 total',
        'Snapshots:   0 total',
        'Time:        1.234s',
        'Ran all test suites.'
      ];
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