import { Link } from "react-router-dom";
function NotFound() {
  return (
    <section className="page not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
export default NotFound;
