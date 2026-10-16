function About() {
  const skills = [
    "HTML5",
    "CSS",
    "JavaScript (ES6+)",
    "React.js",
    "Git & GitHub",
    "Node.js Basics",
    "Responsive Web Design",
  ];

  return (
    <section className="page">
      <h2>About Me</h2>

      <div className="section-block">
        <h3>My Education</h3>
        <div className="education-card">
          <h4>B.S. in Computer Science</h4>
          <p>
            Fast national University of Computer and Emerging Sciences | 2024 -
            2028
          </p>
          <p>
            Relevant Coursework: OOP, Data Structures, Algorithms, Database
            Systems, Operating System, Artificial Intelligence, Computer
            Netwroks,
          </p>
        </div>
      </div>

      <div className="section-block">
        <h3>My Skills</h3>
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill} className="skill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default About;
