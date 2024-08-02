import { useEffect, useState } from "react";
import "./Testimonials.css";
import Image3 from "../../assets/others/avatar-3.svg";
import Image4 from "../../assets/others/avatar-4.svg";

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
  Image3: Image3,
  Image4: Image4,
};

const Testimonials = () => {
  const [data, setData] = useState<TestimonialType[]>([]);
  useEffect(() => {
    fetch("data/testimonialsData.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) =>
        console.error("Error fetching testimonials data:", error)
      );
  }, []);

  return (
    <section className="testimonials container section">
      <h2 className="section__title">Testimonials</h2>

      <Swiper
        className="testimonial__container grid"
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1} // Adjusted to 1
        slidesPerGroup={1} // Adjusted to 1
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
      >
        {data.map(({ id, image, title, subtitle, comment }) => {
          return (
            <SwiperSlide className="testimonial__item" key={id}>
              <div className="thumb">
                <img src={imageMap[image]} alt={title} />
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
