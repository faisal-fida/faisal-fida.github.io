import {
  RiGithubLine,
  RiLink,
  RiYoutubeFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { FaExternalLinkAlt } from "react-icons/fa";

import { MenuType } from "./types";
import { imageMap } from "./utils";

interface ModalProps {
  selectedItem: MenuType | null;
  selectedIndex: number;
  filteredItems: MenuType[];
  closePopup: () => void;
  handleNextProject: () => void;
  handlePrevProject: () => void;
}

const Modal: React.FC<ModalProps> = ({
  selectedItem,
  closePopup,
  handleNextProject,
  handlePrevProject,
}) => {
  if (!selectedItem) return null;

  return (
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
        <h2 className="portfolio__popup-title">{selectedItem.title}</h2>
        <p className="portfolio__popup-category">
          ({selectedItem.category.join(", ")})
        </p>
        <div className="portfolio__button-container">
          <a
            href={selectedItem.url}
            target="_blank"
            rel="noreferrer"
            className="portfolio__button"
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
          <a
            href="https://www.youtube.com/channel/UC2KZ6X8W9l5yM6fD0JyOjDg"
            target="_blank"
            rel="noreferrer"
            className="portfolio__youtube-button"
            aria-label="Youtube Link"
          >
            <RiYoutubeFill className="portfolio__button-icon" />
          </a>
        </div>

        <div className="portfolio__popup-text-container">
          <h2 style={{ alignSelf: "center" }}>Tech Stack</h2>

          <p>
            <div className="tech-grid">
              {selectedItem.techStack.map((tech, index) => (
                <div key={index} className="tech-item">
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      tech
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tech} <FaExternalLinkAlt size={8} />
                  </a>
                </div>
              ))}
            </div>
          </p>
        </div>

        {selectedItem.images.map((image, index) => (
          <div key={index} className="portfolio__popup-slide">
            <div className="portfolio__details-container">
              <p className="portfolio__popup-text">
                <strong>🔽 </strong>
                {selectedItem.description[index]}
                <strong> 🔽</strong>
              </p>
            </div>
            <a
              href={imageMap[image] || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageMap[image] || ""}
                alt={selectedItem.title}
                className="portfolio__popup-img"
              />
            </a>
          </div>
        ))}
        <button className="portfolio__project-prev" onClick={handlePrevProject}>
          <RiArrowLeftSLine size={60} />
        </button>
        <button className="portfolio__project-next" onClick={handleNextProject}>
          <RiArrowRightSLine size={60} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
