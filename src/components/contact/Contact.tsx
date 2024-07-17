import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "./Contact.css";
import "react-toastify/dist/ReactToastify.css";

const Contact = (props: { theme: string }) => {
  const [email, setEmail] = useState("");
  const [option, setOption] = useState("");
  const [loading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !option) {
      return toast.error("Please complete the form above");
    }
  };

  return (
    <section className="contact container section" id="contact">
      <h2 className="section__title">Get In Touch</h2>

      <div className="contact__container grid">
        <div className="contact__info">
          <h3 className="contact__title">Let's talk about everything!</h3>
          <p className="contact__details">
            Don't like forms? Send me an email. 👋
          </p>
        </div>

        <form onSubmit={submitHandler} className="contact__form">
          <div className="contact__form-div">
            <input
              type="email"
              className="contact__form-input"
              placeholder="Insert your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="contact__form-div contact__form-radio-group">
            <input
              type="radio"
              id="consultation"
              name="option"
              value="consultation"
              onChange={(e) => setOption(e.target.value)}
              className="contact__form-radio"
            />
            <label htmlFor="consultation" className="contact__form-label">
              Consultation
            </label>

            <input
              type="radio"
              id="support"
              name="option"
              value="support"
              onChange={(e) => setOption(e.target.value)}
              className="contact__form-radio"
            />
            <label htmlFor="support" className="contact__form-label">
              Support
            </label>

            <input
              type="radio"
              id="feedback"
              name="option"
              value="feedback"
              onChange={(e) => setOption(e.target.value)}
              className="contact__form-radio"
            />
            <label htmlFor="feedback" className="contact__form-label">
              Feedback
            </label>

            <input
              type="radio"
              id="other"
              name="option"
              value="other"
              onChange={(e) => setOption(e.target.value)}
              className="contact__form-radio"
            />
            <label htmlFor="other" className="contact__form-label">
              Other
            </label>
          </div>

          <button type="submit" className="btn">
            {loading ? "Sending..." : "Get Quote"}
          </button>
        </form>
        <ToastContainer position="bottom-right" theme={props.theme} />
      </div>
    </section>
  );
};

export default Contact;
