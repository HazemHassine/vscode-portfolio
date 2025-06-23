import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ContentArea = ({ activeTabData }) => {
  const containerClasses = "flex-grow bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] font-mono overflow-auto p-6";

  // Create a ref for the transitioning node
  const nodeRef = useRef(null);

  return (
    <main className={containerClasses}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeTabData ? activeTabData.id : 'empty'}
          nodeRef={nodeRef}  // Pass the ref here
          addEndListener={(done) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener("transitionend", done, false);
            }
          }}
          // classNames="content-fade"
          timeout={0}
        >
          {/* Attach ref here */}
          <div ref={nodeRef}>
            {!activeTabData ? (
              <div className="flex items-center justify-center h-full text-[var(--vscode-text-secondary)]">
                Select a file to view its content or open a new one.
              </div>
            ) : (
              <>
                <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {typeof activeTabData.content === 'string'
                    ? activeTabData.content
                    : React.isValidElement(activeTabData.content)
                      ? activeTabData.content
                      : 'Invalid content format.'}
                </pre>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};

export default ContentArea;
