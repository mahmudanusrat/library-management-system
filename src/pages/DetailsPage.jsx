import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner";

const DetailsPage = () => {
  const { user } = useAuth();
  const { bookId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    data: book = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/book/${bookId}`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (book.quantity <= 0) {
    Swal.fire("Sorry", "This book is out of stock!", "error");
    return;
  }
  const handleBorrow = async (event) => {
    event.preventDefault();
    const form = event.target;
    const returnDate = form.returnDate.value;

    const borrowData = {
      bookId,
      userEmail: user.email,
      userName: user.displayName,
      returnDate,
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/borrowedBooks`,borrowData);
        Swal.fire(
          "Borrowed!",
          "You have successfully borrowed this book.",
          "success"
        );
        setIsModalOpen(false);
        refetch(); // ✅ Refetch book details to update quantity
        navigate("/borrowedBooks");
      } catch (error) {
      // console.error(error);
      Swal.fire(
        "Error",
        "Failed to borrow the book. Please try again.",
        "error"
      );
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#06BBCC0F] py-5">
      <div className="card lg:card-side bg-base-100 max-w-screen-sm mx-auto shadow-xl px-5">
        <figure>
          <img src={book.bookImage} alt={book.bookName} className="w-96" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">Book Name: {book.bookName}</h2>

          <p className="">
            <span className="font-bold">Author Name:</span> {book.authorName}
          </p>
          <p>
            {" "}
            <span className="font-bold">Category:</span> {book.category}
          </p>
          <p>
            <span className="font-bold">Description:</span> {book.description}
          </p>
          <p>
            <span className="font-bold">Quantity:</span> {book.quantity}
          </p>
          <div className="card-actions ">
            <button
              className={`mt-2 py-2 px-4 rounded ${
                book.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38]"
              }`}
              onClick={() => book.quantity > 0 && setIsModalOpen(true)}
              disabled={book.quantity === 0}
            >
              Borrow
            </button>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg">
                  <form onSubmit={handleBorrow}>
                    <h2 className="text-xl font-bold mb-4">Borrow This Book</h2>
                    <div className="mb-4">
                      <label className="block">Name</label>
                      <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Return Date</label>
                      <input
                        type="date"
                        name="returnDate"
                        required
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className=" bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38]"
                    >
                      Confirm Borrow
                    </button>
                    <button
                      className=" ml-4 btn font-bold"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;