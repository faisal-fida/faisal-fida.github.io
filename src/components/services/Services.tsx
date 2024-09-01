import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

import "./Services.css";
import Image1 from "/assets/others/service-1.svg";
import Image2 from "/assets/others/service-2.svg";
import Image3 from "/assets/others/service-3.svg";

interface ServiceInterface {
  id: number;
  image: string;
  title: string;
  description: string;
}

const Services = () => {
  const { data, error } = useSWR("data/servicesData.json", fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className="services container section" id="services">
      <h2 className="section__title">Services</h2>

      <div className="services__container grid">
        {data.map((service: ServiceInterface) => {
          const { id, image, title, description } = service;
          return (
            <div className="services__card" key={id}>
              <img
                src={
                  image === "Image1"
                    ? Image1
                    : image === "Image2"
                    ? Image2
                    : Image3
                }
                alt=""
                className="services__img"
                width="80"
                loading="lazy"
              />

              <h3 className="services__title">{title}</h3>
              <p className="services__description">{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
