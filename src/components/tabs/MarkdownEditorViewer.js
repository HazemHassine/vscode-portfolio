'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function MarkdownEditorViewer({ filePath }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (filePath) {
      fetch(filePath)
        .then((res) => res.text())
        .then((text) => setValue(text));
    }
  }, [filePath]);

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
          onChange={(v) => setValue(v || '')}
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
