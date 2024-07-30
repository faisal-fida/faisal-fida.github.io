import "./About.css";
import Resume from "../../assets/resume.pdf";

import AboutBox from "./AboutBox";

const About = () => {
  const downloadResume = () => {
    window.open(Resume, "_blank");
  };

  return (
    <section className="about container section" id="about">
      <h2 className="section__title">About Me </h2>

      <div className="about__data grid">
        <div className="about__info">
          <p className="about__description">
            Hey! I'm a Python developer based in Islamabad, PK. I enjoy building
            solutions that scale, are easy to maintain, and user-friendly.
          </p>

          <div className="skills__category">
            <h3>Backend (RestAPI, Serverless, Testing, DevOps)</h3>
            <ul className="about__list">
              <li>Django • FastAPI</li>
              <li>GCP • AWS</li>
              <li>PostgreSQL • MySQL</li>
              <li>Pytest • Selenium</li>
              <li>Redis • Celery</li>
              <li>GitHub Actions • CircleCI</li>
              <li>AWS Lambda</li>
              <li>Google Cloud Functions</li>
              <li>Docker</li>
            </ul>

            <br />
          </div>

          <div className="skills__category">
            <h3>Data (Web Scraping, ETL Pipelines, Machine Learning)</h3>
            <ul className="about__list">
              <li>Scrapy Framework</li>
              <li>Selenium</li>
              <li>Numpy</li>
              <li>Pandas</li>
              <li>Seaborn</li>
              <li>Plotly</li>
              <li>Scikit Learn</li>
              <li>Keras</li>
            </ul>
          </div>

          <div className="skills__category">
            <h3>Generative AI (LLM, RAG, Deployment)</h3>
            <ul className="about__list">
              <li>Transformers</li>
              <li>Hugging Face</li>
              <li>Streamlit</li>
              <li>Heroku</li>
            </ul>
          </div>

          <button className="btn" onClick={downloadResume}>
            Download CV
          </button>
        </div>
      </div>

      {/* <div className="about__skills grid">
            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">Development</h3>
                <span className="skills__number">90%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage development"></span>
              </div>
            </div>

            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">UI/UX Design</h3>
                <span className="skills__number">80%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage ui__design"></span>
              </div>
            </div>

            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">Photography</h3>
                <span className="skills__number">60%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage photography"></span>
              </div>
            </div>
          </div> */}

      <AboutBox />
    </section>
  );
};

export default About;
