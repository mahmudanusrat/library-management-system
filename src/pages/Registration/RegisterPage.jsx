import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
  const { createUser, manageProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.",
      });
      return;
    }

    createUser(email, password)
      .then((res) => {
        manageProfile(name, image);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered.",
        });
        navigate("/"); 
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "There was an issue with your registration. Please try again!",
        });
      });
  };

  const googleLoginHandler = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          text: "You have successfully logged in with Google.",
        });
        navigate("/"); 
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "There was an issue with Google login. Please try again.",
        });
      });
  };

  return (
    <div className="bg-[#06BBCC0F] py-5">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-[#212832] uppercase font-bold">Create Your Library Account</h1>
      </div>
      <div className="card max-w-sm mx-auto shrink-0 shadow-2xl bg-white">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Photo URL"
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
              placeholder="Password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-2">
            <button className="btn bg-[#06BBCC] text-white hover:bg-[#181D38]">
              Register
            </button>
          </div>
          <button
            type="button"
            className="btn btn-md bg-[#181D38] text-white hover:bg-[#06BBCC]"
            onClick={googleLoginHandler}
          >
            Register With Google
          </button>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <NavLink to="/login" className="link text-[#06BBCC]">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
