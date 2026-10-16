import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page hero-section">
      <h1>Hello, I'm Mughees Alvi The Developer </h1>
      <p className="subtitle">
        I am a passionate computer science student and front-end developer
        focused on building interactive, user-friendly web experiences. I am
        learning AI-Powered Full Stack Development
      </p>
      <div className="home-buttons">
        <Link to="/projects" className="btn btn-primary">
          View My Work
        </Link>
        <Link to="/contact" className="btn btn-secondary">
          Contact Me
        </Link>
      </div>
    </section>
  );
}
export default Home;
