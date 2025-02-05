import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const DetailsPage = () => {
  const { user } = useContext(AuthContext);
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://library-management-system-server-side-phi.vercel.app/book/${bookId}`).then((res) => {
      setBook(res.data);
    });
  }, [bookId]);

  const handleBorrow = (event) => {
    event.preventDefault();
    const form = event.target;
    const returnDate = form.returnDate.value;
    
    const borrowData = {
      bookId,
      userEmail: user.email,
      userName: user.displayName,
      returnDate,
    };
    if (book.quantity <= 0) {
      Swal.fire("Sorry", "This book is out of stock!", "error");
      return;
    }
    setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));

    fetch("https://library-management-system-server-side-phi.vercel.app/borrowedBooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(borrowData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire(
          "Borrowed!",
          "You have successfully borrowed. Please remember to return it",
          "success"
        );
        navigate("/borrowedBooks");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setBook((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
        Swal.fire(
          "Error",
          "Failed to borrow the book. Please try again.",
          "error"
        );
      });
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
