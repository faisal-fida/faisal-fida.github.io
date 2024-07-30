import { FaGithub, FaLinkedinIn, FaMedium } from "react-icons/fa";

const HeaderSocials = () => {
  return (
    <div className="home__socials">
      <a
        href="https://github.com/faisal-fida"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>

      <a
        href="https://www.linkedin.com/in/faisal-fida/"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="https://medium.com/@faisal-fida"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaMedium />
      </a>
    </div>
  );
};

export default HeaderSocials;
