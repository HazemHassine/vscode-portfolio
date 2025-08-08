import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Project data
const projectsData = [
  {
    title: "VSCode Portfolio",
    description: "A personal portfolio website crafted to emulate Visual Studio Code's aesthetics and functionality.",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    githubLink: "https://github.com/hazem-ben-aicha/vscode-portfolio",
    liveDemoLink: "https://vscode-portfolio.vercel.app/",
    image: "/VScode_image.png"
  },
  {
    title: "Brain Tumor Detection with Federated Learning",
    description: "Developed a secure brain tumor detection system using Federated Learning, ensuring privacy-preserving model training.",
    technologies: ["Python", "TensorFlow", "PyTorch", "Docker", "Google Cloud"],
    githubLink: "https://github.com/hazem-ben-aicha/Federated-Learning-Brain-Tumor-Detection",
    liveDemoLink: null,
    image: "/python_notebook_real_example.png"
  },
  {
    title: "E-commerce Platform",
    description: "Developed a modern e-commerce platform with a responsive UI and optimized performance using React.js and Node.js.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "CSS3"],
    githubLink: "https://github.com/hazem-ben-aicha/E-commerce-Platform",
    liveDemoLink: null,
    image: "https://via.placeholder.com/400x250/1e1e1e/FFFFFF?text=E-commerce+Platform"
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[var(--vscode-sidebar-background)] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative group">
      {/* Hover Grainy Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[var(--vscode-editor-background)] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-medium text-[var(--vscode-text-primary)] mb-3">{project.title}</h3>
        <p className="text-[var(--vscode-text-secondary)] text-base mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="flex items-center bg-[var(--vscode-panel-background)] text-[var(--vscode-text-primary)] text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-link-active)] transition-colors duration-200 flex items-center"
              title="GitHub Repository"
            >
              <FaGithub className="mr-1" /> GitHub
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-link-active)] transition-colors duration-200 flex items-center"
              title="Live Demo"
            >
              <FaExternalLinkAlt className="mr-1" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="p-6 bg-[var(--vscode-editor-background)] min-h-screen">
      <h1 className="text-4xl font-extrabold text-[var(--vscode-text-primary)] mb-12 text-center">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
