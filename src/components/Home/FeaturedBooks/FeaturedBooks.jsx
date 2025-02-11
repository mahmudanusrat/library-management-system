import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedBooks = () => {
  const books = [
    { id: 1, title: "Book One", author: "Author A", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Book Two", author: "Author B", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Book Three", author: "Author C", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Book four", author: "Author D", image: "https://via.placeholder.com/150" }
  ];

  return (
    <div className="py-16 ">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Books</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={book.image} alt={book.title} className="w-full h-56 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/allBooks" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">View All</Link>
      </div>
    </div>
  );
};

export default FeaturedBooks;