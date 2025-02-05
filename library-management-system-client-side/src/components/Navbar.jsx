import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from '../provider/AuthProvider';
import logo from '../assets/book-logo.png'

const Navbar = () => {
    const {user, loading, handleLogout}= useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        handleLogout();
        navigate("/");
        if (loading) {
          return (
            <div className="navbar">
              <p>Loading...</p>
            </div>
          );
        }
      };

  const links = (
    <div className=" lg:flex gap-10">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#2f3766] font-semibold"
              : "hover:text-[#06BBCC] font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
              <li>
        <NavLink
          to="/allBooks"
          className={({ isActive }) =>
            isActive
              ? "text-[#2f3766] font-semibold"
              : "hover:text-[#06BBCC] font-medium"
          }
        >
          All Books
        </NavLink>
      </li>

          <li>
            <NavLink
              to="/addBook"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2f3766] font-semibold"
                  : "hover:text-[#06BBCC] font-medium"
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrowedBooks"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2f3766] font-semibold"
                  : "hover:text-[#06BBCC] font-medium"
              }
            >
              Borrowed Books
            </NavLink>
          </li>
        </>
      )}
    </div>
  );

  return (
    <nav className="max-w-screen-xl mx-auto ">
      <div className="navbar flex items-center justify-between px-1 py-2">
        <div className="navbar-start flex items-center">
          <div className="dropdown z-30">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>

          <img src={logo} alt="book logo" className="w-12 md:w-20" />
          <h1 className="text-xl md:text-3xl font-bold text-[#2f3766] uppercase">
            Book Nest
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-5">
          {!user ? (
            <>
              <NavLink to="/login">
                <button className="btn btn-md bg-[#06BBCC] text-white hover:bg-[#181D38]">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn btn-md bg-[#06BBCC] text-white hover:bg-[#181D38]">
                  Register
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer hidden md:block"
                />
                <div className="absolute right-1/2 transform -translate-y-1/2 text-[#181D38] shadow-md rounded hidden group-hover:block">
                  {user.displayName || "Anonymous"}
                </div>
              </div>

              <button
                onClick={logoutHandler}
                className="btn btn-md bg-[#06BBCC] text-white hover:bg-[#181D38]"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
