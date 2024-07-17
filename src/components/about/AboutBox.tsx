import {
  RiFireLine,
  RiCupLine,
  RiGroupLine,
  RiTrophyLine,
} from "react-icons/ri";

const AboutBox = () => {
  return (
    <div className="about__boxes grid">
      <div className="about__box">
        <div className="about__icon">
          <RiFireLine />
        </div>

        <div>
          <h3 className="about__title">6</h3>
          <span className="about__subtitle">Years of Experience</span>
        </div>
      </div>

      <div className="about__box">
        <div className="about__icon">
          <RiCupLine />
        </div>

        <div>
          <h3 className="about__title">31</h3>
          <span className="about__subtitle">Github Repositories</span>
        </div>
      </div>

      <div className="about__box">
        <div className="about__icon">
          <RiGroupLine />
        </div>

        <div>
          <h3 className="about__title">3</h3>
          <span className="about__subtitle">Launched Projects</span>
        </div>
      </div>

      <div className="about__box">
        <div className="about__icon">
          <RiTrophyLine />
        </div>

        <div>
          <h3 className="about__title">100</h3>
          <span className="about__subtitle">Code Quality</span>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;
