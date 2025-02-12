import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Emily Johnson",
    rating: 4.5,
    text: "This library management system is a game-changer! It's so easy to borrow and return books. Highly recommended!",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "Michael Smith",
    rating: 5,
    text: "I love how organized and efficient this platform is. Finding books has never been easier. Amazing experience!",
    image: "https://i.pravatar.cc/100?img=10",
  },
  {
    id: 3,
    name: "Sophia Williams",
    rating: 4,
    text: "Great system with a user-friendly interface. It would be even better if more book categories were available!",
    image: "https://i.pravatar.cc/100?img=15",
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <FaRegStar key={i} className="text-yellow-400" />
      ))}
    </>
  );
};

const UserReviews = () => {
  return (
    <div className="text-center py-10 space-y-5">
      <h1 className="text-gray-500 uppercase text-lg">Users Review</h1>
      <p className="uppercase text-[#181d38] text-3xl font-bold">
        What People <span className="text-[#06bbcc]">Say</span>
      </p>
      <div className="max-w-screen-xl mx-auto mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center mx-auto max-w-2xl">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <div className="flex justify-center gap-1 mt-2">
                  {renderStars(review.rating)}
                </div>
                <p className="mt-3 text-gray-700">{review.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UserReviews;
