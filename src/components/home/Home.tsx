import "./Home.css";
import Me from "/assets/others/avatar-1.png";
import HeaderSocials from "./HeaderSocials";
import ScrollDown from "./ScrollDown";
import Shapes from "./Shapes";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

interface HomeData {
  name: string;
  job_title: string;
}

interface Social {
  name: string;
  url: string;
}


const Home = () => {
  const [homeData, setHomeData] = useState<HomeData>({
    name: "",
    job_title: "",
  });
  const [socials, setSocials] = useState<Social[]>([]);

  const { data, error } = useSWR("data/home.json", fetcher);

  useEffect(() => {
    if (data) {
      setHomeData(data.homeData);
      setSocials(data.socials);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const { name, job_title } = homeData;

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="" className="home__img" width="120" loading="lazy" />
        <h1 className="home__name">{name}</h1>
        <span className="home__job_title">{job_title}</span>

        <HeaderSocials socials={socials} />

        <a href="#contact" className="btn">
          Contact Me
        </a>

        <ScrollDown />
      </div>

      <Shapes />
    </section>
  );
};

export default Home;