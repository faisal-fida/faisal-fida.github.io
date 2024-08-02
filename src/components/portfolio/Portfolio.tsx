import { useState } from "react";
import "./Portfolio.css";

import { RiGithubLine, RiLink } from "react-icons/ri";
import { motion } from "framer-motion";

import projectData from "../../../data/projectData.json";

import Work1 from "../../assets/others/native-jobs.png";
import Work2 from "../../assets/others/cryptoverse.png";
import Work3 from "../../assets/others/travel.png";
import Work4 from "../../assets/others/blog-1.svg";

interface MenuType {
  id: number;
  image: string;
  title: string;
  category: string[];
  url: string;
  repositoryUrl: string;
  description: string;
}

const imageMap: { [key: string]: string } = {
  Work1: Work1,
  Work2: Work2,
  Work3: Work3,
  Work4: Work4,
};

const typedProjectData: MenuType[] = Object.values(projectData) as MenuType[];

const Portfolio = () => {
  const [items, setItems] = useState<MenuType[]>(typedProjectData);
  const [activeFilter, setActiveFilter] = useState(0);

  const filterItems = (categoryItem: string) => {
    const updatedItems = typedProjectData.filter((curElem: MenuType) => {
      return curElem.category.includes(categoryItem);
    });
    setItems(updatedItems);
  };

  return (
    <section className="portfolio container section" id="portfolio">
      <h2 className="section__title">Recent Projects</h2>

      <div className="portfolio__filters">
        <span
          className={
            activeFilter === 0
              ? "portfolio__item portfolio__item-active"
              : "portfolio__item"
          }
          onClick={() => {
            setItems(typedProjectData);
            setActiveFilter(0);
          }}
        >
          All
        </span>
        <span
          className={
            activeFilter === 1
              ? "portfolio__item portfolio__item-active"
              : "portfolio__item"
          }
          onClick={() => {
            filterItems("Backend");
            setActiveFilter(1);
          }}
        >
          Backend
        </span>
        <span
          className={
            activeFilter === 2
              ? "portfolio__item portfolio__item-active"
              : "portfolio__item"
          }
          onClick={() => {
            filterItems("Machine Learning");
            setActiveFilter(2);
          }}
        >
          Machine Learning
        </span>
        <span
          className={
            activeFilter === 3
              ? "portfolio__item portfolio__item-active"
              : "portfolio__item"
          }
          onClick={() => {
            filterItems("Generative AI");
            setActiveFilter(3);
          }}
        >
          Generative AI
        </span>
        <span
          className={
            activeFilter === 4
              ? "portfolio__item portfolio__item-active"
              : "portfolio__item"
          }
          onClick={() => {
            filterItems("Web Scraping");
            setActiveFilter(4);
          }}
        >
          Web Scraping
        </span>
      </div>

      <div className="portfolio__container grid">
        {items.map((Element: MenuType) => {
          const {
            id,
            image,
            title,
            category,
            url,
            repositoryUrl,
            description,
          } = Element;

          return (
            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="portfolio__card"
              key={id}
            >
              <div
                className="portfolio__thumbnail"
                onClick={() => handleImageClick(Element)}
              >
                <img
                  src={imageMap[image] || Work4}
                  alt=""
                  className="portfolio__img"
                  height="267"
                />
                <div className="portfolio__mask"></div>
              </div>

              <span className="portfolio__category">{category.join(", ")}</span>
              <h3 className="portfolio__title">{title}</h3>
              <p className="portfolio__description">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="portfolio__button"
              >
                <RiLink className="portfolio__button-icon" />
              </a>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="portfolio__github-button"
              >
                <RiGithubLine className="portfolio__button-icon" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
