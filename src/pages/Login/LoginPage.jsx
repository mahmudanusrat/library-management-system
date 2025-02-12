import React, { useContext, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const LoginPage = () => {
  const {user, signInWithGoogle, signIn, logOut } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from?.pathname || '/';
  
  if (user) return <Navigate to='/' replace={true} />
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
     
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.message || "Something went wrong!",
        showClass: {
          popup: "animate__animated animate__shakeX animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    }
  };
  const googleLoginHandler = () => {
    signInWithGoogle().then((res) => {
      navigate(location.state?.from?.pathname || "/");
    });
  };

  return (
    <div className="bg-[#06BBCC0F] py-5">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-[#212832] uppercase font-bold">
          Login to your library account!
        </h1>
      </div>
      <div className="card max-w-sm mx-auto shrink-0 shadow-2xl bg-white">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <NavLink
                to="/forgot-password"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </NavLink>
            </label>
          </div>
          <div className="form-control mt-2">
            <button className="btn bg-[#06BBCC] text-white hover:bg-[#181D38]">
              Login
            </button>
          </div>
          <button
            type="button"
            className="btn btn-md bg-[#181D38] text-white hover:bg-[#06BBCC]"
            onClick={googleLoginHandler}
          >
            Login With Google
          </button>
          {error && <p className="text-[#F14836] m-2">{error}</p>}

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <NavLink to="/register" className="link text-[#06BBCC]">
              Register here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
