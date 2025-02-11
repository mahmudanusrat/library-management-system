import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "../Banner/Slide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bgimg1 from "../../../assets/library2.jpg";
import bgimg2 from "../../../assets/library4.jpg";
import bgimg3 from "../../../assets/library3.jpg";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
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
        className="absolute inset-0 w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <div className="relative w-full h-screen">
            <img
              src={bgimg1}
              className="w-full h-full object-cover"
              alt="Library"
            />
           <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:px-20 ">
              <Slide
                text1="Welcome to Our Library"
                text2="Discover a world of knowledge with a wide variety of books from every genre. Borrow your next great read today!"
                button="Explore Now"
                isActive={activeIndex === 0}
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-screen">
            <img
              src={bgimg2}
              alt="Library"
              className="absolute inset-0 w-full h-full object-cover"
            />
           <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:px-20 ">
               <Slide
                text1="Browse Our Collections"
                text2="Find books that suit your interests, whether you're into fiction, history, technology, or science."
                button="Browse Categories"
                isActive={activeIndex === 1}
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-screen">
            <img
              src={bgimg3}
              alt="Library"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:px-20 ">
               <Slide
                text1="Stay Up-to-Date with New Arrivals"
                text2="Check out the latest additions to our collection. Get the first pick on new books!"
                button="See New Arrivals"
                isActive={activeIndex === 2}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
