import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const AddBookPage = () => {
  const handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target;
    const bookImage = form.bookImage.value;
    const bookName = form.bookName.value;
    const quantity = form.quantity.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const bookContent = form.bookContent.value;

    const newBook = {
      bookImage,
      bookName,
      quantity,
      authorName,
      category,
      description,
      rating,
      bookContent,
    };
    console.log(newBook);

    axios
      .post("${import.meta.env.VITE_API_URL}/book", newBook, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Book Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add book. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <div className="bg-[#06BBCC0F] py-4">
      <div className=" max-w-3xl mx-auto my-6 ">
        <h1 className="text-3xl mb-5 text-[#212832] uppercase font-bold text-center">
          Add new book
        </h1>{" "}
        <div className="border p-4 rounded-xl shadow-xl bg-white">
          <form onSubmit={handleAddBook}>
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="mb-4 w-full md:w-1/2 ">
                <label htmlFor="bookImage" className="block font-medium mb-1">
                  Book Image URL
                </label>
                <input
                  type="text"
                  id="bookImage"
                  name="bookImage"
                  placeholder="Enter image URL"
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
                  placeholder="Enter Book Name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="mb-4 w-full md:w-1/2">
                <label htmlFor="quantity" className="block font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
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
                <label htmlFor="authorName" className="block font-medium mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  placeholder="Enter author Name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
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
                  placeholder="Enter rating"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                className="w-full border p-2 rounded"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bookContent" className="block font-medium mb-1">
                Book Content
              </label>
              <textarea
                id="bookContent"
                name="bookContent"
                placeholder="Enter book Content"
                className="w-full border p-2 rounded"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className=" btn bg-[#06BBCC] text-white hover:bg-[#181D38]"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
