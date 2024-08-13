import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";

import "./Contact.css";
import "react-toastify/dist/ReactToastify.css";

const Contact = (props: { theme: string }) => {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [option, setOption] = useState("");
  const [, setSubOption] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !option) {
      return toast.error("Please complete the form above");
    }

    if (!form.current) {
      console.error("Form not found");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Email sent successfully");
          if (form.current) form.current.reset();
          setLoading(false);
        },
        (error) => {
          toast.error("Email not sent due to: " + error.text);
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact container section" id="contact">
      <h2 className="section__title">Contact</h2>

      <div className="contact__container grid">
        <div className="contact__info">
          <h3 className="contact__title">Want to get in touch?</h3>

          <p className="contact__details">
            I reply within 20 minutes to your email. 🚀
          </p>
        </div>

        <form className="contact__form" ref={form} onSubmit={submitHandler}>
          <div className="contact__form-div">
            <input
              name="from_email"
              type="email"
              className="contact__form-input"
              placeholder="Insert your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contact__form-div contact__form-radio-group">
            <input
              name="selected_option"
              type="radio"
              id="jobHiring"
              value="jobHiring"
              className="contact__form-radio"
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor="jobHiring" className="contact__form-label">
              Onsite Job
            </label>

            <input
              name="selected_option"
              type="radio"
              id="project"
              value="project"
              className="contact__form-radio"
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor="project" className="contact__form-label">
              Remote Project
            </label>

            <input
              name="selected_option"
              type="radio"
              id="freeLance"
              value="freelance"
              className="contact__form-radio"
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor="freeLance" className="contact__form-label">
              Freelance Work
            </label>
          </div>

          {option === "jobHiring" && (
            <div className="contact__form-text">
              <textarea
                name="job_detail"
                id="jobType"
                className="contact__form-area contact__form-input"
                placeholder="Python Developer, Full-Time, Onsite, Django, FastAPI, and AI"
                onChange={(e) => setSubOption(e.target.value)}
              ></textarea>
            </div>
          )}

          {option === "project" && (
            <div className="contact__form-text">
              <textarea
                name="job_detail"
                id="projectType"
                className="contact__form-area contact__form-input"
                placeholder="AI SAAS Platform, Remote, 6 months, Python, Data Science, and Machine Learning"
                onChange={(e) => setSubOption(e.target.value)}
              ></textarea>
            </div>
          )}

          {option === "freelance" && (
            <div className="contact__form-text">
              <textarea
                name="job_detail"
                id="freelanceType"
                className="contact__form-area contact__form-input"
                placeholder="Python Developer, 2 weeks, FastAPI, and Docker"
                onChange={(e) => setSubOption(e.target.value)}
              ></textarea>
            </div>
          )}

          <div className="contact__form-btn">
            <button type="submit" className="btn">
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-right" theme={props.theme} />
      </div>
    </section>
  );
};

export default Contact;
