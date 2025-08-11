'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const DEFAULT_GITIGNORE = `
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
coverage/
`;

const registerGitignore = (monaco) => {
  // Avoid double-register during HMR
  const already = monaco.languages.getLanguages().some((l) => l.id === 'gitignore');
  if (already) return;

  monaco.languages.register({ id: 'gitignore' });

  monaco.languages.setLanguageConfiguration('gitignore', {
    comments: { lineComment: '#' },
    brackets: [
      ['{', '}'],
      ['[', ']'],
    ],
  });

  // Minimal Monarch tokenizer for .gitignore semantics
  monaco.languages.setMonarchTokensProvider('gitignore', {
    tokenizer: {
      root: [
        [/^\s*#.*$/, 'comment'],          // comments
        [/^\s*!.*$/, 'keyword'],          // negation
        [/^\s*\/.*$/, 'string'],          // root-anchored patterns
        [/.+\/$/, 'string'],              // directory suffix
        [/\*\*|\*|\?/, 'operator'],       // globs
        [/\[(?:[^\]]+)\]/, 'delimiter.square'],
        [/\{(?:[^}]+)\}/, 'delimiter.bracket'],
        [/[^#\s].+/, 'identifier'],       // everything else
      ],
    },
  });
};

export default function GitIgnore({ filePath }) {
  const [value, setValue] = useState(DEFAULT_GITIGNORE);

  useEffect(() => {
    let active = true;
    if (filePath) {
      fetch(filePath)
        .then((res) => (res.ok ? res.text() : ''))
        .then((text) => {
          if (active && typeof text === 'string' && text.length) setValue(text);
        })
        .catch(() => {
          /* keep default on error */
        });
    }
    return () => {
      active = false;
    };
  }, [filePath]);

  return (
    <div className="flex-1 min-h-0 h-full overflow-hidden border border-[var(--vscode-border-color)] rounded-[4px]">
      <Editor
        beforeMount={registerGitignore}
        language="gitignore"
        theme="vs-dark"
        value={value}
        onChange={(v) => setValue(v ?? '')}
        height="100%"
        width="100%"
        options={{
          wordWrap: 'off',
          minimap: { enabled: false },
          fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
          fontSize: 14,
          tabSize: 2,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: false,
          renderWhitespace: 'none',
          renderControlCharacters: false,
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          bracketPairColorization: { enabled: false },
        }}
      />
    </div>
  );
}