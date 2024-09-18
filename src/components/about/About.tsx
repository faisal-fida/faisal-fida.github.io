import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

import { useEffect, useState } from "react";
import "./About.css";
import AboutBox from "./AboutBox";
import imageMap from "./Utils";
import { FaDownload, FaEye } from "react-icons/fa";

interface Skill {
  name: string;
  link: string;
  logo: string;
  size?: string;
  margin?: string;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface Resume {
  view_url: string;
  download_url: string;
}

interface AboutData {
  resume: Resume;
  skills: SkillCategory[];
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    resume: {
      view_url: "",
      download_url: "",
    },
    skills: [],
  });

  const { data, error } = useSWR("data/about.json", fetcher);

  useEffect(() => {
    if (data) {
      setAboutData(data);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const viewResume = () => {
    if (aboutData.resume.view_url) {
      window.open(aboutData.resume.view_url, "_blank");
    } else {
      console.error("Resume URL not found");
    }
  };

  const downloadResume = () => {
    if (aboutData.resume.download_url) {
      window.open(aboutData.resume.download_url, "_blank");
    } else {
      console.error("Resume URL not found");
    }
  };

  return (
    <section className="about container section" id="about">
      <h2 className="section__title">Skills</h2>
      <div className="about__data grid">
        <div className="about__info">
          {aboutData.skills.map((category: SkillCategory, index: number) => (
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
                        src={imageMap[item.logo]}
                        alt={item.name}
                        className="skill-logo"
                        loading="lazy"
                        style={{
                          width: item.size
                            ? `${parseFloat(item.size) / 1.4}px`
                            : "30px",
                          margin: item.margin ? item.margin : "0",
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="about__info-download">
            <button className="btn view_btn" onClick={viewResume}>
              <FaEye style={{ marginRight: "5px", fontSize: "0.8em" }} />
              View CV
            </button>
            <p className="about__updated">
              Updated:{" "}
              {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()}
            </p>
            <button className="btn download_btn" onClick={downloadResume}>
              <FaDownload style={{ marginRight: "5px", fontSize: "0.8em" }} />
              Save CV
            </button>
          </div>
        </div>
      </div>
      <AboutBox />
    </section>
  );
};

export default About;
