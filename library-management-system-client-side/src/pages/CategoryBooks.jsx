import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const CategoryBooks = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://library-management-system-server-side-phi.vercel.app/book?category=${category}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, [category]);

  const handleDetailsClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className=" bg-[#06BBCC0F] py-10">
      <div className="max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {books.map((book) => (
          <div
            key={book._id}
            className="card card-side bg-base-100 shadow-2xl px-5"
          >
              <figure>
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold">{book.bookName}</h2>
                <p>
                  <span className="font-bold">Author:</span> {book.authorName}
                </p>
                <p>
                  <span className="font-bold">Category:</span> {book.category}
                </p>
                <p>
                  <span className="font-bold">Quantity:</span> {book.quantity}
                </p>
                <ReactStars
                  count={5}
                  value={book.rating}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
                <div className="card-actions ">
                  <button
                    className=" bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38]"
                    onClick={() => handleDetailsClick(book._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CategoryBooks;
