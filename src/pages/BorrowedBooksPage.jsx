import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner";

const BorrowedBooksPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    data: borrowedBooks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["borrowedBooks", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/borrowedBooks?email=${user?.email}`,
        { withCredentials: true }
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const handleReturnBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Return it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/borrowedBooks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Returned!", "Your book has been returned.", "success");
              setBorrowedBooks(
                borrowedBooks.filter((borrowedBook) => borrowedBook._id !== id)
              );
            }
          })
          .catch((error) => console.error("Error returning book:", error));
      }
    });
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  return (
    <div className="bg-[#06BBCC0F] p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Borrowed Books</h1>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : borrowedBooks.length === 0 ? (
          <p>No borrowed books found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {borrowedBooks.map((borrowedBook) => (
              <div
                key={borrowedBook._id}
                className="border bg-white p-4 rounded shadow hover:shadow-lg"
              >
                <img
                  src={borrowedBook.bookImage}
                  alt={borrowedBook.bookName}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="text-xl font-bold">{borrowedBook.bookName}</h2>
                <p>Category: {borrowedBook.category}</p>
                <p>Borrowed Date: {formatDate(borrowedBook.borrowedDate)}</p>
                <p>Return Date: {formatDate(borrowedBook.returnDate)}</p>
                <button
                  onClick={() => handleReturnBook(borrowedBook._id)}
                  className="btn bg-[#06BBCC] text-white hover:bg-[#181D38] mt-2"
                >
                  Return Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooksPage;
