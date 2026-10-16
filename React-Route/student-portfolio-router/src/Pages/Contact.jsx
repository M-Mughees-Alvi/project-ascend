import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="page contact-page">
      <h2>Contact Me</h2>
      <p>
        Feel free to reach out directly at:{" "}
        <strong>mughess.alvi01@gmail.com</strong>
      </p>

      {submitted && (
        <div className="alert alert-success">
          Demo submission successful! No email has been sent.
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-group">
          Your Name:
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label htmlFor="email" className="form-group">
          Your Email:
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label htmlFor="message" className="form-group">
          Message
          <textarea
            id="message"
            name="message"
            rows="7"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </section>
  );
}
