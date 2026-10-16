const projectData = [
  {
    id: 1,
    title: "Tic Tac Toe Web App Game",
    description:
      "A web based Tic Tac Tow Game having two game modes. One is two players mode and second is player vs AI. In second mode I have used Minimax Algorithm for AI",
    technologies: ["html5", "CSS", "Vanilla JavaScript"],
  },
  {
    id: 2,
    title: "Currency Converter",
    description:
      "A web application to convert any currency into any currency. I have used 2 APIs; one to select the country falg according to country code and second is to get current currecny value.",
    technologies: ["html5", "CSS", "Vanilla JavaScript"],
  },
  {
    id: 3,
    title: "My Todo List Web App",
    description:
      "A web application to maintains your daily Todos. It uses the local Storage to saved the data even after refreshing and records real time and date for each todo from your device. ",
    technologies: ["html5", "CSS", "React"],
  },
];

function Projects() {
  return (
    <section className="page">
      <h2>Projects</h2>
      <p className="subtitle">
        A showcase of things I've built during my Journey towards becoming
        AI-Powered Full Satck Developer.
      </p>

      <div className="projects-details">
        {projectData.map((project) => (
          <div key={project.id} className="card project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Projects;
