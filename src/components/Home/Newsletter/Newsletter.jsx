import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Oops!", "Please enter a valid email address.", "warning");
      return;
    }
    Swal.fire("Success!", "You have subscribed to our newsletter!", "success");
    setEmail(""); // Clear input after subscribing
  };

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="uppercase text-[#181d38] text-3xl font-bold">Stay Updated!</h2>
      <p className="text-gray-600 mt-2">
        Subscribe to our newsletter and never miss an update.
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex justify-center items-center mt-6 w-full max-w-lg mx-auto border border-gray-300 rounded-md overflow-hidden"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#06BBCC]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#06BBCC] text-white px-6 py-2 hover:bg-[#181D38] transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
