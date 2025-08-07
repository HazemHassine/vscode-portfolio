import React from 'react';

const SkillCategory = ({ title, skills }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <div key={index} className="bg-[#282c34] p-4 rounded-lg flex items-center justify-center">
          <p className="text-white text-center">{skill}</p>
        </div>
      ))}
    </div>
  </div>
);
const Skills = () => {
  const skills = {
    "Programming & Tools": [
      "Python",
      "Javascript",
      "Cpp",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "OpenCV",
      "NLTK",
      "Langchain",
      "SQL (PostgreSQL, MySQL)",
      "Linux",
      "Power BI",
    ],
    "Machine Learning": [
      "Supervised & Unsupervised Learning",
      "Data Preprocessing & Feature Engineering",
      "Model Evaluation & Hyperparameter Tuning",
      "Tools: Scikit-learn, PyTorch (advanced)",
    ],
    "Web Technologie": [
      "ReactJS",
      "NextJS",
      "TailwindCSS",
      "MongoDB",
      "Firebase",
      "REST APIs",
      "Flask",
      "Django",
    ],
    "Soft Skills": [
      "Analytical Thinking",
      "Communication & Teaching",
      "Agile & Team Collaboration",
    ],
    "Languages": ["Arabic (Native)", "English (C1)", "French (C1)", "German (A2+)"],
  };

  return (
    <div className="p-8 bg-[#1e1e1e] min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Skills</h1>
      {Object.entries(skills).map(([category, skills]) => (
        <SkillCategory key={category} title={category} skills={skills} />
      ))}
    </div>
  );
};

export default Skills;
