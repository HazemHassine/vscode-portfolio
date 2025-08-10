import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    title: "VSCode-Style Portfolio",
    description: "A developer portfolio website that emulates Visual Studio Code’s UI with sidebar navigation, tabbed content, and a mock terminal for a realistic coding environment.",
    technologies: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Monaco Editor"],
    githubLink: "https://github.com/HazemHassine/vscode-portfolio",
    liveDemoLink: "https://vscode-portfolio.vercel.app/"
  },
  {
    title: "Pediatric Recommendation System",
    description: "AI-powered system providing disease predictions and treatment recommendations for pediatric healthcare. Combines NLP preprocessing, ontology mapping, and ML models like Random Forest and Bio-ClinicalBERT.",
    technologies: ["Python", "React.js", "Flask", "RDFLib", "OWL", "NLTK", "BioBERT", "TF-IDF"],
    githubLink: "https://github.com/HazemHassine/pediatric-recommendation-system"
  },
  {
    title: "AI Personal Assistant Chatbot",
    description: "Desktop AI chatbot with note-taking, logging, and skill-tracking features. Fine-tuned large language models on personal data for enhanced personalization.",
    technologies: ["Python", "PyTorch", "Flask", "Django", "MongoDB", "Pandas"]
  },
  {
    title: "Sentiment Analysis Streamlit App",
    description: "Interactive Streamlit app for real-time sentiment classification using a pre-trained ML model. Accepts user input and visualizes sentiment predictions.",
    technologies: ["Python", "Streamlit", "Scikit-learn", "NLTK"],
    githubLink: "https://github.com/HazemHassine/Sentiment_analysis_streamlit"
  },
  {
    title: "Arabic Letter Classification with CNN",
    description: "Deep learning model built with CNNs to classify Arabic handwritten letters. Preprocessed datasets and optimized network for high accuracy.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
    githubLink: "https://github.com/HazemHassine/ArabicLetterClassificationWithCNN"
  },
  {
    title: "Taxi Service App",
    description: "React-based web application template for booking and managing taxi rides, featuring a responsive UI and reusable components.",
    technologies: ["React", "JavaScript", "CSS3"],
    githubLink: "https://github.com/HazemHassine/TaxiService"
  },
  {
    title: "CLI YouTube Video Summarizer",
    description: "Command-line tool to extract and summarize YouTube video transcripts using AI language models for concise outputs.",
    technologies: ["Python", "OpenAI API", "YouTube Transcript API"],
    githubLink: "https://github.com/HazemHassine/Cli-Youtube-Video-Summarizer"
  },
  {
    title: "Neural Network From Scratch",
    description: "Educational project implementing a fully connected neural network from scratch without ML libraries, focusing on backpropagation and optimization algorithms.",
    technologies: ["Python", "NumPy"],
    githubLink: "https://github.com/HazemHassine/neural_network_from_scratch"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills with animations, responsive design, and clean UI.",
    technologies: ["React", "TailwindCSS", "JavaScript"],
    githubLink: "https://github.com/HazemHassine/Portfolio",
    liveDemoLink: "https://hazemhassine.github.io/Portfolio/"
  }
];

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[var(--vscode-sidebar-background)] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative group">
      {/* Hover Grainy Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[var(--vscode-editor-background)] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      
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
