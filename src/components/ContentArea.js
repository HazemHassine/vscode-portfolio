import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ContentArea = ({ activeTabData }) => {
  // Ensure background and font styles are applied correctly using CSS variables
  // These are primarily set on the parent or body, but good to be mindful.
  const containerClasses = "flex-grow bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] font-mono overflow-auto p-6"; // p-6 for VSCode like padding

  return (
    <main className={containerClasses}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeTabData ? activeTabData.id : 'empty'}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames="content-fade" // Uses .content-fade-enter, .content-fade-exit, etc. from globals.css
          timeout={200} // Matches transition duration in globals.css
        >
          <div> {/* This div is necessary for CSSTransition to apply classes correctly */}
            {!activeTabData ? (
              <div className="flex items-center justify-center h-full text-[var(--vscode-text-secondary)]">
                Select a file to view its content or open a new one.
              </div>
            ) : (
              <>
                {/* Header for the file, e.g., breadcrumbs or file path - optional for now */}
                {/* <div className="mb-2 text-sm text-[var(--vscode-text-secondary)]">{activeTabData.title}</div> */}

                {/* Using a <pre> tag for code-like content to respect formatting */}
                <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {/* Render content: Could be string or JSX component */}
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
