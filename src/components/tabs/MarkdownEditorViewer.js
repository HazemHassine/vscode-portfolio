'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
// Tailwind Typography plugin classes for markdown styling
// Ensure you have installed @tailwindcss/typography and enabled it in your tailwind.config.js

// Initial content for each markdown tab
const MarkdownData = {
    about: '# About\n\nWelcome to the About tab of your editor!\n\n- List item 1\n- List item 2',
    readme: '# Readme\n\nThis is the README for your project. Use **Markdown** to document your work.\n\n```js\nconsole.log("Hello, world!");\n```',
};


export default function MarkdownEditorViewer({ id }) {
  const [value, setValue] = useState(MarkdownData[id] || '');

  return (
    <div className="flex flex-1 min-h-0 h-full overflow-hidden">
      {/* ── Editor pane ── */}
      <div className="flex-1 min-h-0 h-full border-r border-[var(--vscode-border-color)]">
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          language="markdown"
          value={value}
          onChange={v => setValue(v || '')}
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
            fontSize: 14,
            tabSize: 2,
          }}
        />
      </div>

      {/* ── Preview pane ── */}
      <div className="flex-1 min-h-0 h-full overflow-auto">
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {value}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}