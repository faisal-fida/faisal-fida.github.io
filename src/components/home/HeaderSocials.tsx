import { FaGithub, FaLinkedinIn, FaMedium } from "react-icons/fa";

interface Social {
  name: string;
  url: string;
}

interface HeaderSocialsProps {
  socials: Social[];
}

const iconMap: { [key: string]: JSX.Element } = {
  github: <FaGithub />,
  linkedin: <FaLinkedinIn />,
  medium: <FaMedium />,
};

const HeaderSocials: React.FC<HeaderSocialsProps> = ({ socials }) => {
  return (
    <div className="home__socials">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className="home__social-link"
          target="_blank"
          rel="noreferrer"
        >
          {iconMap[social.name.toLowerCase()] || social.name}
        </a>
      ))}
    </div>
  );
};

export default HeaderSocials;