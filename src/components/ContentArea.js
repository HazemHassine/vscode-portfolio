'use client'
import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ContentArea = ({ activeTabData }) => {
  const nodeRef = useRef(null);
  const content = activeTabData?.content;
  const isString = typeof content === 'string';
  const isMarkdown = activeTabData?.title.endsWith('.md');

  return (
    <main className="
      flex flex-col flex-1 min-h-0 h-full
      bg-[var(--vscode-editor-background)]
      text-[var(--vscode-text-primary)]
    ">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeTabData?.id || 'empty'}
          nodeRef={nodeRef}
          timeout={50}
          addEndListener={done => {
            nodeRef.current?.addEventListener("transitionend", done, false);
          }}
        >
          <div
            ref={nodeRef}
            className="flex flex-1 min-h-0 overflow-auto"
          >
            {!activeTabData ? (
              <div className="
                flex items-center justify-center flex-1
                text-[var(--vscode-text-secondary)]
              ">
                Select a file to view its content or open a new one.
              </div>
            ) : isString ? (
              <pre className="
                flex-1 overflow-auto
                whitespace-pre-wrap break-words
                font-mono text-sm leading-relaxed p-6
              ">
                {content}
              </pre>
            ) : (
              <div className="flex flex-1 min-h-0 overflow-auto">
                {isMarkdown ? content : <div className="w-full flex flex-col flex-1 min-h-0">{content}</div>}
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};

export default ContentArea;
