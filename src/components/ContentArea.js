import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ReactMarkdown from 'react-markdown';

const ContentArea = ({ activeTabData }) => {
  const containerClasses = "flex-grow bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] font-mono overflow-auto p-6";

  // Create a ref for the transitioning node
  const nodeRef = useRef(null);

  const isMarkdownFile = (filename) => {
    return filename && filename.toLowerCase().endsWith('.md');
  };

  return (
    <main className={containerClasses}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeTabData ? activeTabData.id : 'empty'}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener("transitionend", done, false);
            }
          }}
          timeout={0}
        >
          <div ref={nodeRef}>
            {!activeTabData ? (
              <div className="flex items-center justify-center h-full text-[var(--vscode-text-secondary)]">
                Select a file to view its content or open a new one.
              </div>
            ) : (
              <>
                {isMarkdownFile(activeTabData.id) && typeof activeTabData.content === 'string' ? (
                  <ReactMarkdown className="prose prose-invert max-w-none">
                    {activeTabData.content}
                  </ReactMarkdown>
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {typeof activeTabData.content === 'string'
                      ? activeTabData.content
                      : React.isValidElement(activeTabData.content)
                        ? activeTabData.content
                        : 'Invalid content format.'}
                  </pre>
                )}
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};

export default ContentArea;
