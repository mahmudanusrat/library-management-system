import React from "react";
import LibraryNews from "../../components/LibraryNews";
import JoinCommunity from "../../components/JoinCommunity";
import Banner from '../../components/Home/Banner/Banner'
import BookCategories from "../../components/Home/BookCategories/BookCategories";
import FeaturedBooks from "../../components/Home/FeaturedBooks/FeaturedBooks";
import UserReviews from "../../components/Home/Reviews/UserReviews";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-[#06BBCC0F]">
        <div className="max-w-screen-xl mx-auto">
        <BookCategories></BookCategories>
        {/* <FeaturedBooks></FeaturedBooks> */}
          <LibraryNews></LibraryNews>
          <UserReviews></UserReviews>
          <JoinCommunity></JoinCommunity>
          <Newsletter></Newsletter>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
