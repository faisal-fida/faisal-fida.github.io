import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import { MenuType } from "./types";
import Modal from "./Modal";

import {
  FaPython,
  FaAngular,
  FaDocker,
  FaGooglePay,
  FaAlgolia,
} from "react-icons/fa";
import { DiDjango, DiRedis } from "react-icons/di";
import { SiTensorflow, SiLangchain, SiGooglecloud } from "react-icons/si";
import { BiLogoFirebase, BiLogoPostgresql } from "react-icons/bi";

const Portfolio: React.FC = () => {
  const { data, error } = useSWR("data/projectData.json", fetcher);
  const [items, setItems] = useState<MenuType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuType[]>([]);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MenuType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setItems(data);
      setFilteredItems(data);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const openPopup = (item: MenuType, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const handleNextProject = () => {
    const nextIndex = (selectedIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const handlePrevProject = () => {
    const prevIndex =
      (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  const filterItems = (category: string, index: number) => {
    setFilteredItems(
      category === "All"
        ? items
        : items.filter((item) => item.category.includes(category))
    );
    setActiveFilter(index);
  };

  return (
    <section className="portfolio container section" id="portfolio">
      <h2 className="section__title">Recent Projects</h2>
      <div className="portfolio__filters">
        {[
          "All",
          "Backend",
          "Machine Learning",
          "Generative AI",
          "Web Scraping",
        ].map((category, index) => (
          <span
            key={index}
            className={`portfolio__item ${
              activeFilter === index ? "portfolio__item-active" : ""
            }`}
            onClick={() => filterItems(category, index)}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="portfolio__container grid">
        {filteredItems.map((element, index) => {
          const { id, title } = element;

          return (
            <div
              className="portfolio__card"
              key={id}
              onClick={() => openPopup(element, index)}
            >
              <h3 className="portfolio__title1">{title}</h3>

              <div className="portfolio__icons">
                {element.techStack.map((tech, index) => {
                  if (tech === "Tensorflow") {
                    return <SiTensorflow key={index} title="Tensorflow" />;
                  } else if (tech === "Django") {
                    return <DiDjango key={index} title="Django" />;
                  } else if (tech === "Python") {
                    return <FaPython key={index} title="Python" />;
                  } else if (tech === "Angular") {
                    return <FaAngular key={index} title="Angular" />;
                  } else if (tech === "Langchain") {
                    return <SiLangchain key={index} title="Langchain" />;
                  } else if (tech === "Redis") {
                    return <DiRedis key={index} title="Redis" />;
                  } else if (tech === "Docker") {
                    return <FaDocker key={index} title="Docker" />;
                  } else if (tech === "GPay") {
                    return <FaGooglePay key={index} title="Google Pay" />;
                  } else if (tech === "Postgres") {
                    return <BiLogoPostgresql key={index} title="Postgres" />;
                  } else if (tech === "Algolia") {
                    return <FaAlgolia key={index} title="Algolia" />;
                  } else if (tech === "GCP") {
                    return <SiGooglecloud key={index} title="Google Cloud" />;
                  } else if (tech === "Firebase") {
                    return <BiLogoFirebase key={index} title="Firebase" />;
                  }
                })}
              </div>

              <div className="portfolio__buttons">
                <button className="portfolio__details-button">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="portfolio__view-more">
        <button className="btn">
          <a
            href="https://github.com/faisal-fida"
            target="_blank"
            rel="noreferrer"
            className="portfolio__view-more-link"
          >
            View More Projects
          </a>
        </button>
      </div>

      <Modal
        selectedItem={selectedItem}
        selectedIndex={selectedIndex}
        filteredItems={filteredItems}
        closePopup={closePopup}
        handleNextProject={handleNextProject}
        handlePrevProject={handlePrevProject}
      />
    </section>
  );
};

export default Portfolio;
