import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bgimg1 from "../assets/library2.jpg";
import bgimg2 from "../assets/library4.jpg";
import bgimg3 from "../assets/library3.jpg";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container px-2 py-2 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text1="Welcome to Our Library"
            text2="Discover a world of knowledge with a wide variety of books from every genre. Borrow your next great read today!"
            button ="Explore Now"
            isActive={activeIndex === 0}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text1="Browse Our Collections"
            text2="Find books that suit your interests, whether you're into fiction, history, technology, or science."
            button ="Browse Categories"
            isActive={activeIndex === 1}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text1="Stay Up-to-Date with New Arrivals"
            text2="Check out the latest additions to our collection. Get the first pick on new books!"
            button ="See New Arrivals"
            isActive={activeIndex === 2}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
