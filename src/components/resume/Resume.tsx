import { useEffect, useState } from "react";
import "./Resume.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "./Button";

interface Experience {
  id: number;
  title: string;
  company: string;
  yearsActive: string;
  information: string[];
}

const Resume = () => {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [expandedStates, setExpandedStates] = useState<boolean[]>([]);

  useEffect(() => {
    fetch("data/experienceData.json")
      .then((response) => response.json())
      .then((data) => {
        setExperienceData(data);
        setExpandedStates(new Array(data.length).fill(false));
      })
      .catch((error) =>
        console.error("Error fetching experience data:", error)
      );
  }, []);

  const toggleReadMore = (index: number) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <section className="resume container section" id="resume">
      <h2 className="section__title">Experience</h2>

      <div className="resume__container">
        <Tabs
          className="tabs"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          selectedTabClassName={"is-active"}
          selectedTabPanelClassName={"is-active"}
        >
          <TabList className="tab__list">
            {experienceData.map((experience: Experience) => {
              const { id, company } = experience;
              return (
                <Tab className="tab" key={`company-${id}`}>
                  <Button>{company}</Button>
                </Tab>
              );
            })}
          </TabList>

          {experienceData.map((experience: Experience, index: number) => {
            const { id, company, yearsActive, title, information } = experience;
            const isExpanded = expandedStates[index];

            return (
              <TabPanel className="tab__panel" key={`panel-${id}`}>
                <h2 className="tab__panel-title">
                  {title} @ {company}
                </h2>
                <p className="tab__panel-subtitle">{yearsActive}</p>
                <ul className="tab__panel-list">
                  {information
                    .slice(0, isExpanded ? information.length : 2)
                    .map((info: string, index: number) => {
                      return <li key={`info-${index}`}>{info}</li>;
                    })}
                </ul>
                {information.length > 2 && (
                  <button
                    className="read-more"
                    onClick={() => toggleReadMore(index)}
                  >
                    {isExpanded ? "Less" : "More"}
                  </button>
                )}
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default Resume;
