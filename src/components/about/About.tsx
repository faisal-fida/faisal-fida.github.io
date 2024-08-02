import { useEffect, useState } from "react";
import "./About.css";
import Resume from "../../assets/others/resume.pdf";
import AboutBox from "./AboutBox";

interface Skill {
  name: string;
  link: string;
  logo: string;
  size?: string;
  margin?: string;
}

const About = () => {
  const downloadResume = () => {
    window.open(Resume, "_blank");
  };

  const [skillsData, setSkillsData] = useState<{ skills: any[] }>({
    skills: [],
  });

  useEffect(() => {
    fetch("data/aboutData.json")
      .then((response) => response.json())
      .then((data) => setSkillsData(data))
      .catch((error) => console.error("Error fetching skills data:", error));
  }, []);

  return (
    <section className="about container section" id="about">
      <h2 className="section__title">Skills</h2>

      <div className="about__data grid">
        <div className="about__info">
          {skillsData.skills.map(
            (category: { category: string; items: Skill[] }, index: number) => (
              <div key={index} className="about__info-skill">
                <p className="about__description">{category.category}</p>

                <ul className="about__list">
                  {category.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        title={item.name}
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="skill-logo"
                          style={{
                            width: item.size ? item.size : "30px",
                            margin: item.margin ? item.margin : "0",
                          }}
                        />
                        {/* {item.name} <ExternalLinkIcon /> */}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          <br />
          <button className="btn" onClick={downloadResume}>
            Download CV
          </button>
        </div>
      </div>

      <AboutBox />
    </section>
  );
};

export default About;
