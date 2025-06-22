import React from 'react';

const ContentArea = ({ activeTabData }) => {
  if (!activeTabData) {
    return (
      <div className="flex-grow bg-[#1e1e1e] p-8 text-gray-400 font-mono">
        Select a file to view its content.
      </div>
    );
  }

  return (
    <main className="flex-grow bg-[#1e1e1e] p-8 text-gray-300 font-mono overflow-auto">
      <h1 className="text-2xl font-semibold text-white mb-4">{activeTabData.title}</h1>
      <div className="whitespace-pre-wrap">
        {typeof activeTabData.content === 'string'
          ? activeTabData.content
          : React.isValidElement(activeTabData.content)
            ? activeTabData.content
            : 'Invalid content.'}
      </div>
    </main>
  );
};

export default ContentArea;
