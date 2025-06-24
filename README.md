# VSCode Style Portfolio

A personal portfolio website styled to look and feel like Visual Studio Code.

---

## Overview

This project is a developer portfolio that mimics the familiar VSCode interface in the browser. It features a sidebar file explorer, tabbed code editor panes, and a mock terminal, all driven by Next.js and styled with Tailwind CSS.

---

## Technologies & Libraries

- **Next.js** (`next@15.3.4`) – React framework for routing, server-side rendering, and static exports  
- **React** (`react@^19.0.0` & `react-dom@^19.0.0`) – Component library to build interactive UI  
- **@headlessui/react** – Unstyled, accessible UI components  
- **@monaco-editor/react** – Embeddable VSCode editor component  
- **@vscode/codicons** – Official VSCode icon set  
- **github-markdown-css** – GitHub-style Markdown rendering  
- **http-proxy-middleware** – API proxy support during development  
- **katex**, **rehype-katex**, **remark-math** – Math rendering in Markdown  
- **react-markdown**, **remark-gfm** – Markdown parsing and GitHub Flavored Markdown support  
- **react-icons** – Collection of popular icon packs  
- **react-resizable-panels** – Resizable split‐pane layouts  
- **react-transition-group** – Animation utilities for React  
- **Tailwind CSS** (`tailwindcss@^4.1.10`) with:
  - **@tailwindcss/typography** – Prose styling for Markdown
  - **@tailwindcss/postcss** – PostCSS plugin integration  
- **ESLint** & **eslint-config-next** – Linting and code quality  

---

## Getting Started

### Prerequisites

- Node.js v14 or higher  
- npm, yarn, pnpm, or bun  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/HazemHassine/vscode-portfolio.git
   cd vscode-portfolio
````

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

---

## Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser at [http://localhost:3000](http://localhost:3000). The site will hot-reload as you edit files.

---

## Deployment

This site is ready for static export or Vercel deployment:

* **Vercel**

  1. Connect the GitHub repo in your Vercel dashboard.
  2. Vercel auto-detects Next.js and deploys on push.

* **Static Export**

  ```bash
  npm run build
  npm run export
  ```
---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.