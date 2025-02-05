import React from "react";
import logo from "../assets/book-logo.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#06BBCC0F] py-10 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
       
        <div>
          <div className="flex items-center">
            <img src={logo} alt="Book Nest Logo" className="w-12 md:w-20" />
            <h1 className="text-xl md:text-3xl font-bold text-[#2f3766] uppercase">
              Book Nest
            </h1>
          </div>
          <p className="mt-1 text-[#212832]">
            Discover your next favorite book at Book Nest. Explore a wide range
            of genres, connect with fellow readers, and dive into the world of
            stories that inspire and captivate.
          </p>
          <div className="flex gap-2 pt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#181D38] hover:text-[#06BBCC] transition border p-2 border-white-100 rounded-full"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#181D38] hover:text-[#06BBCC] transition border p-2 border-white-100 rounded-full"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#181D38] hover:text-[#06BBCC] transition border p-2 border-white-100 rounded-full"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <div className="md:text-center mt-3">
          <h6 className="text-[#2f3766] font-bold text-xl uppercase mb-2">Company</h6>
          <ul>
            <li className="link link-hover">About Us</li>
            <li className="link link-hover">Careers</li>
            <li className="link link-hover">Privacy Policy</li>
            <li className="link link-hover">Terms of Service</li>
          </ul>
        </div>
        <div className="md:text-center mt-3">
          <h6 className="text-[#2f3766] font-bold text-xl  uppercase mb-2">Our Services</h6>
          <ul>
            <li className="link link-hover">Personalized Book</li>
            <li className="link link-hover">E-Book Rentals</li>
            <li className="link link-hover">Author Spotlights</li>
            <li className="link link-hover">Reading Community Events</li>
          </ul>
        </div>

        <div className="md:text-center mt-3">
          <h6 className="text-[#2f3766] font-bold text-xl uppercase mb-2">Resources</h6>
          <ul>
            <li className="link link-hover">FAQs</li>
            <li className="link link-hover">Blog</li>
            <li className="link link-hover">Reading Guides</li>
            <li className="link link-hover">Contact Us</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-2 lg:mt-1 pt-2">
        &copy; {new Date().getFullYear()} Book Nest. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
