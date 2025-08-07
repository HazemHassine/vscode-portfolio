import React from 'react';
import { VscRunAll, VscClearAll, VscSave, VscAdd, VscMarkdown } from 'react-icons/vsc';
import { FaPlay } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const NotebookCell = ({ type, content, executionCount, output }) => {
  return (
    <div className="flex items-start space-x-2 my-2 first:mt-0 last:mb-0">
      <div className="flex-shrink-0 flex flex-col items-center justify-start h-full pt-3 w-12">
        {type === 'code' && (
          <div className="flex flex-col items-center space-y-1 text-xs text-gray-500">
            <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <FaPlay size={12} />
            </button>
            <span className="font-mono text-[10px] mt-2">[{executionCount}]</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 group border border-transparent hover:border-gray-700 rounded-md">
        {type === 'code' && (
          <>
            <div className="bg-[#282c34] p-4 rounded-md font-mono text-sm text-white overflow-x-auto">
              <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: '#282c34' }}>
                {content}
              </SyntaxHighlighter>
            </div>
            {output && (
              <div className="p-4 font-mono text-sm text-white overflow-x-auto">
                <pre>{output}</pre>
              </div>
            )}
          </>
        )}
        {type === 'markdown' && (
          <div className="markdown-body p-4 rounded-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

const WorkNotebook = () => {
  const cells = [
    {
      type: 'markdown',
      content: `# Work Experience`,
    },
    {
      type: 'markdown',
      content: `## The Independent High Authority for the Elections, Monastir, Tunisia`,
    },
    {
      type: 'code',
      executionCount: 1,
      content: `work_experience_1 = {
  "company": "The Independent High Authority for the Elections, Monastir, Tunisia",
  "role": "Information System Specialist",
  "period": "September 2024 – February 2025",
  "responsibilities": [
    "Maintained and optimized internal information systems, ensuring smooth operations across the election division.",
    "Led onboarding and training for teams of over 100 staff on internal tools and digital workflows.",
    "Automated repetitive data tasks, streamlining candidate data handling and documentation.",
  ]
}

for key, value in work_experience_1.items():
    if isinstance(value, list):
        print(f"{key.replace('_', ' ').title()}:")
        for item in value:
            print(f"  - {item}")
    else:
        print(f"{key.replace('_', ' ').title()}: {value}")`,
      output: `Company: The Independent High Authority for the Elections, Monastir, Tunisia
Role: Information System Specialist
Period: September 2024 – February 2025
Responsibilities:
  - Maintained and optimized internal information systems, ensuring smooth operations across the election division.
  - Led onboarding and training for teams of over 100 staff on internal tools and digital workflows.
  - Automated repetitive data tasks, streamlining candidate data handling and documentation.`
    },
    {
      type: 'markdown',
      content: `## Brain And Signal Research & Analysis LAB (BASIRA), Imperial College London, United Kingdom`,
    },
    {
        type: 'code',
        executionCount: 2,
        content: `work_experience_2 = {
  "company": "Brain And Signal Research & Analysis LAB (BASIRA), Imperial College London, United Kingdom",
  "role": "Machine Learning Researcher intern",
  "period": "February 2023 - July 2023",
  "responsibilities": [
    "Explored cutting-edge techniques in Federated Learning and implemented multiple approaches for computer vision task",
    "Developed deep learning models in Federated training environments.",
    "Documented research outcomes and authored a comprehensive thesis based on the project work.",
  ]
}

for key, value in work_experience_2.items():
    if isinstance(value, list):
        print(f"{key.replace('_', ' ').title()}:")
        for item in value:
            print(f"  - {item}")
    else:
        print(f"{key.replace('_', ' ').title()}: {value}")`,
        output: `Company: Brain And Signal Research & Analysis LAB (BASIRA), Imperial College London, United Kingdom
Role: Machine Learning Researcher intern
Period: February 2023 - July 2023
Responsibilities:
  - Explored cutting-edge techniques in Federated Learning and implemented multiple approaches for computer vision task
  - Developed deep learning models in Federated training environments.
  - Documented research outcomes and authored a comprehensive thesis based on the project work.`
      },
      {
        type: 'markdown',
        content: `## Web Developer Intern, Monastir, Tunisia`,
      },
      {
        type: 'code',
        executionCount: 3,
        content: `work_experience_3 = {
  "company": "Web Developer Intern, Monastir, Tunisia",
  "role": "Web Developer Intern",
  "period": "June 2022-August 2022",
  "responsibilities": [
    "Contributed to the development of a modern e-commerce platform with a focus on responsive UI and seamless user interaction.",
    "Implemented React.js components and optimized front-end using JavaScript.",
    "Participated in code reviews and collaborated with senior developers on delivering client-ready solutions.",
  ]
}

for key, value in work_experience_3.items():
    if isinstance(value, list):
        print(f"{key.replace('_', ' ').title()}:")
        for item in value:
            print(f"  - {item}")
    else:
        print(f"{key.replace('_', ' ').title()}: {value}")`,
        output: `Company: Web Developer Intern, Monastir, Tunisia
Role: Web Developer Intern
Period: June 2022-August 2022
Responsibilities:
  - Contributed to the development of a modern e-commerce platform with a focus on responsive UI and seamless user interaction.
  - Implemented React.js components and optimized front-end using JavaScript.
  - Participated in code reviews and collaborated with senior developers on delivering client-ready solutions.`
      }
  ];

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg flex-1 h-full overflow-y-auto">
      <div className="flex items-center space-x-2 text-gray-400 border-b border-gray-700 pb-2 mb-2">
        <VscRunAll size={20} />
        <VscClearAll size={20} />
        <VscSave size={20} />
        <VscAdd size={20} />
        <VscMarkdown size={20} />
      </div>
      {cells.map((cell, index) => (
        <NotebookCell
          key={index}
          type={cell.type}
          content={cell.content}
          executionCount={cell.executionCount}
          output={cell.output}
        />
      ))}
    </div>
  );
};

export default WorkNotebook;