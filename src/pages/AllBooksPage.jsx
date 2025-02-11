import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const AllBooksPage = () => {
  const books = useLoaderData(); 
  const navigate = useNavigate();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState("Card View");

  const filteredBooks = showAvailableOnly
    ? books.filter((book) => book.quantity > 0)
    : books;

  const handleUpdateClick = (id) => {
    navigate(`/updateBook/${id}`);
  };

  return (
    <div className="p-4 bg-[#06BBCC0F] ">
      <div className="max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Total Books: {filteredBooks.length}</h1>
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Show Available Books</span>
        </label>

        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Card View">Card View</option>
          <option value="Table View">Table View</option>
        </select>
      </div>

      {viewMode === "Card View" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
             <div key={book._id} className="card lg:card-side bg-base-100 max-w-screen-sm mx-auto shadow-xl px-1">
             <figure>
               <img src={book.bookImage} alt={book.bookName} />
             </figure>
             <div className="card-body">
             <h2 className="text-xl font-semibold">{book.bookName}</h2>
              <p className="text-gray-700">
                <span className="font-bold">Author:</span> {book.authorName}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Category:</span> {book.category}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Rating:</span> {book.rating}/5
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Quantity:</span> {book.quantity}
              </p>
               <div className="card-actions ">
               <button
                className="bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38] mt-2"
                onClick={() => handleUpdateClick(book._id)}
              >
                Update
              </button>
                
               </div>
             </div>
           </div>
          ))}
        </div>
      ) : (
        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="border p-2">{book.bookName}</td>
                <td className="border p-2">{book.authorName}</td>
                <td className="border p-2">{book.category}</td>
                <td className="border p-2">{book.rating}/5</td>
                <td className="border p-2">{book.quantity}</td>
                <td className="border p-2">
                  <button
                    className="bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38]"
                    onClick={() => handleUpdateClick(book._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      
    </div>
  );
};

export default AllBooksPage;
