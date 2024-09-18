import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

import "./Testimonials.css";
import Image1 from "/assets/avatars/margaret.svg";
import Image2 from "/assets/avatars/stefan.svg";
import Image3 from "/assets/avatars/arvin.svg";

import { Pagination } from "swiper/modules"; // Corrected import
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface TestimonialType {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  comment: string;
}

const imageMap: { [key: string]: string } = {
  Image1: Image1,
  Image2: Image2,
  Image3: Image3,
};

const Testimonials = () => {
  const { data, error } = useSWR("data/testimonial.json", fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className="testimonials container section">
      <h2 className="section__title">Testimonials</h2>

      <Swiper
        className="testimonial__container grid"
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
      >
        {data.map((testimonial: TestimonialType) => {
          const { id, image, title, subtitle, comment } = testimonial;
          return (
            <SwiperSlide className="testimonial__item" key={id}>
              <div className="thumb">
                <img src={imageMap[image]} alt={title} loading="lazy" />
              </div>
              <h3 className="testimonial__title">{title}</h3>
              <span className="subtitle">{subtitle}</span>
              <div className="comment">{comment}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
