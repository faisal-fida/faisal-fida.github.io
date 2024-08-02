import { useState } from "react";
import "./Resume.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "./Button";

import experienceData from "../../../data/experienceData.json";

interface Experience {
  id: number;
  title: string;
  company: string;
  yearsActive: string;
  information: string[];
}

const Resume = () => {
  const [tabIndex, setTabIndex] = useState(0);

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

          {experienceData.map((experience: Experience) => {
            const { id, company, yearsActive, title, information } = experience;
            const [isExpanded, setIsExpanded] = useState(false);
            const toggleReadMore = () => setIsExpanded(!isExpanded);

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
                  <button className="read-more" onClick={toggleReadMore}>
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
