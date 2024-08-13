import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import {
  RiGithubLine,
  RiLink,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Work1_1 from "../../assets/portfolio/1.1.png";
import Work1_2 from "../../assets/portfolio/1.2.png";
import Work1_3 from "../../assets/portfolio/1.3.png";
import Work1_4 from "../../assets/portfolio/1.4.png";
import Work2_1 from "../../assets/portfolio/2.1.png";
import Work2_2 from "../../assets/portfolio/2.2.png";
import Work2_3 from "../../assets/portfolio/2.3.png";

interface MenuType {
  id: number;
  images: string[];
  title: string;
  category: string[];
  url: string;
  repositoryUrl: string;
  description: string[];
}

const imageMap: { [key: string]: string } = {
  "1.1": Work1_1,
  "1.2": Work1_2,
  "1.3": Work1_3,
  "1.4": Work1_4,
  "2.1": Work2_1,
  "2.2": Work2_2,
  "2.3": Work2_3,
};

const ProjectNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button className="portfolio__project-next" onClick={onClick}>
    <RiArrowRightSLine size={60} />
  </button>
);

const ProjectPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button className="portfolio__project-prev" onClick={onClick}>
    <RiArrowLeftSLine size={60} />
  </button>
);

const ImageNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button className="portfolio__img-next" onClick={onClick}>
    <RiArrowRightSLine size={25} />
  </button>
);

const ImagePrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button className="portfolio__img-prev" onClick={onClick}>
    <RiArrowLeftSLine size={25} />
  </button>
);

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<MenuType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuType[]>([]);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MenuType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

    prevArrow: <ImagePrevArrow onClick={() => {}} />,
    nextArrow: <ImageNextArrow onClick={() => {}} />,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    fetch("data/projectData.json")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.error("Error fetching project data:", error));
  }, []);

  const openPopup = (item: MenuType, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const filterItems = (category: string, index: number) => {
    setFilteredItems(
      category === "All"
        ? items
        : items.filter((item) => item.category.includes(category))
    );
    setActiveFilter(index);
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
          const { id, images, title } = element;

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
                onClick={() => openPopup(element, index)}
              >
                <img
                  src={images.length > 0 ? imageMap[images[0]] || Work1_1 : ""}
                  alt={title}
                  className="portfolio__img1"
                  height="267"
                  loading="lazy"
                />
                <div className="portfolio__mask"></div>
              </div>

              <div className="portfolio__buttons">
                <h3 className="portfolio__title1">
                  <button
                    style={{
                      color: "black",
                      border: "none",
                      background: "none",
                    }}
                    onClick={() => openPopup(element, index)}
                  >
                    {title}
                  </button>
                </h3>
                <button
                  className="portfolio__details-button"
                  onClick={() => openPopup(element, index)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
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

      {selectedItem && (
        <div
          className="portfolio__popup"
          role="dialog"
          aria-modal="true"
          onClick={closePopup}
        >
          <div
            className="portfolio__popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="portfolio__popup-close"
              onClick={closePopup}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="portfolio__slider">
              <h2 className="portfolio__popup-title">{selectedItem.title}</h2>
              <Slider {...settings}>
                {selectedItem.images.map((image, index) => (
                  <div key={index} className="portfolio__popup-slide">
                    <a
                      href={imageMap[image] || Work1_1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={imageMap[image] || Work1_1}
                        alt={selectedItem.title}
                        className="portfolio__popup-img"
                      />
                    </a>
                    <div className="portfolio__details-container">
                      <p className="portfolio__popup-text">
                        {selectedItem.description[index]}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="portfolio__button-container">
              <a
                href={selectedItem.url}
                target="_blank"
                rel="noreferrer"
                className="portfolio__button"
                aria-label="Project Link"
              >
                <RiLink className="portfolio__button-icon" />
              </a>
              <a
                href={selectedItem.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="portfolio__github-button"
                aria-label="Repository Link"
              >
                <RiGithubLine className="portfolio__button-icon" />
              </a>
            </div>

            <ProjectPrevArrow onClick={handlePrevProject} />
            <ProjectNextArrow onClick={handleNextProject} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
