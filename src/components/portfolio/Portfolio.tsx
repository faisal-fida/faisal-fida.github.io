import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import { MenuType } from "./types";
import Modal from "./Modal";

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
