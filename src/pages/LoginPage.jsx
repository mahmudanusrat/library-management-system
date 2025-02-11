import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginPage = () => {
    const { handleGoogleLogin, handleLogin, handleLogout } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin(email, password)
      .then((res) => {
        const user = {email:email}
        axios.post('https://library-management-system-server-side-phi.vercel.app/jwt',user,{
          withCredentials: true
        })
        .then(res=>{
          console.log(res.data);
        })
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
          const errorMessage = err.message.includes("auth/wrong-password") || err.message.includes("auth/user-not-found")
            ? "Email or password is invalid"
            : "An unexpected error occurred. Please try again.";
          setError(errorMessage);
          toast.error(errorMessage); 
        });
  };
  const googleLoginHandler = () => {
    handleGoogleLogin()
    .then((res) => {
      navigate(location.state?.from?.pathname || "/");
    });
};

return (
  <div className="bg-[#06BBCC0F] py-5">
    <div className="text-center mb-5">
      <h1 className="text-3xl text-[#212832] uppercase font-bold">Login to your library acount!</h1>
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
          <button className="btn bg-[#06BBCC] text-white hover:bg-[#181D38]">Login</button>
        </div>
        <button type="button" className="btn btn-md bg-[#181D38] text-white hover:bg-[#06BBCC]" onClick={googleLoginHandler}>
        Login With Google
        </button>
        {error && (
          <p className="text-[#F14836] m-2">
            {error}
          </p>
        )}
        
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