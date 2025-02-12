import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BookCategories = () => {
  const navigate = useNavigate();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn:  async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      return data.slice(0, 4); // Only take the first 4 categories
    },
  });
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="text-center py-10 space-y-5 ">
      <h1 className="text-[#00000080] uppercase text-lg">Browse Categories</h1>
      <p className="uppercase text-[#181d38] text-3xl font-bold ">
        {" "}
        BROWSE ONLINE Book <span className="text-[#06bbcc]">Categories</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No categories available or wait some time for loading.
          </p>
        ) : (
          categories.map((category, index) => (
            <div
              key={index}
              className="card shadow-lg hover:shadow-xl rounded-xl cursor-pointer bg-white p-10"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-xl font-bold text-center mt-4 uppercase">{category}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookCategories;
