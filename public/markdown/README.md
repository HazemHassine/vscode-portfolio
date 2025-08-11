# VS Code Style Portfolio

A **personal developer portfolio** that looks and feels like working inside **Visual Studio Code** – complete with a sidebar file explorer, tabbed editor, syntax highlighting, and a mock terminal.
Built with **Next.js** and **Tailwind CSS**, it’s designed to showcase projects and skills in an immersive, developer-friendly environment.

---

## 🚀 Overview

This portfolio recreates the **VS Code experience** in the browser, transforming a standard portfolio into an interactive workspace.
Key features include:

* **Sidebar File Explorer** – Navigate between “files” such as `About.md`, `Skills.jsx`, or `contact.json`.
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

* `react-markdown`, `remark-gfm` – GitHub Flavored Markdown
* `katex`, `rehype-katex`, `remark-math` – Math typesetting
* `github-markdown-css` – GitHub-style Markdown styling

**UI & Interaction**

* `react-icons` – Icon packs
* `react-resizable-panels` – Resizable layouts
* `react-transition-group` – Animations

**Tooling**

* ESLint & `eslint-config-next` – Code quality
* `http-proxy-middleware` – API proxy in development

---

## ⚡ Getting Started

### Prerequisites

* Node.js v14+
* npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/HazemHassine/vscode-portfolio.git
cd vscode-portfolio
npm install
# or: yarn / pnpm install / bun install
```

### Local Development

```bash
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment

**Vercel (Recommended)**

1. Connect this repo in your [Vercel dashboard](https://vercel.com/dashboard).
2. Push to `main` or `master` – Vercel will auto-deploy.

**Static Export**

```bash
npm run build
npm run export
```