import React from "react";
import Banner from "../components/Banner";
import BookCategories from "../components/BookCategories";
import LibraryNews from "../components/LibraryNews";
import JoinCommunity from "../components/JoinCommunity";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-[#06BBCC0F]">
        <div className="max-w-screen-xl mx-auto">
          <BookCategories></BookCategories>
          <LibraryNews></LibraryNews>
          <JoinCommunity></JoinCommunity>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
