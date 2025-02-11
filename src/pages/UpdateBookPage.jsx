import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`https://library-management-system-server-side-phi.vercel.app/book/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load book data. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/allBooks");
        });
      });
  }, [id]);

  const handleUpdateBook = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedBook = {
      bookImage: form.bookImage.value,
      bookName: form.bookName.value,
      authorName: form.authorName.value,
      category: form.category.value,
      rating: form.rating.value,
    };

    axios
      .put(`https://library-management-system-server-side-phi.vercel.app/book/${id}`, updatedBook, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Book details updated successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/allBooks");
        });
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update book. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  if (!book) {
    return <div>Loading book data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-6">
      <div className="text-center mb-5">
      <h1 className="text-3xl mb-5 text-[#212832] uppercase font-bold text-center">
         Update This Book
        </h1>
      </div>
      <div className="border p-4 rounded-xl shadow-xl">
        <form onSubmit={handleUpdateBook}>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="mb-4 w-full md:w-1/2">
              <label htmlFor="bookImage" className="block font-medium mb-1">
                Book Image URL
              </label>
              <input
                type="text"
                id="bookImage"
                name="bookImage"
                defaultValue={book.bookImage}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4 w-full md:w-1/2">
              <label htmlFor="bookName" className="block font-medium mb-1">
                Book Name
              </label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                defaultValue={book.bookName}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="mb-4 w-full md:w-1/2">
              <label htmlFor="authorName" className="block font-medium mb-1">
                Author Name
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                defaultValue={book.authorName}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4 w-full md:w-1/2">
              <label htmlFor="category" className="block font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full border p-2 rounded"
                defaultValue={book.category}
                required
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="Novel">Novel</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fic">Sci-Fic</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="mb-4 w-full md:w-1/2">
              <label htmlFor="rating" className="block font-medium mb-1">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                defaultValue={book.rating}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38] mt-2"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPage;
