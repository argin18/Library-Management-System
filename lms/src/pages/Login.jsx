import React from 'react';
import { Link, useNavigate } from "react-router-dom"; // <-- import useNavigate
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const {setIsLogin}=useAuth();
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Login data", data);
    // Example validation
    if (data.username === "argin18" && data.password === "Sumitbhujel") {
      setIsLogin(true);
      navigate("/"); 
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Selection */}
          <div>
            <p className="mb-2 font-semibold">Select your Role:</p>
            <div className="flex gap-6 items-center">
              <label className="flex text-purple-700 font-semibold text-lg items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="admin"
                  {...register("role", { required: true })}
                  className="cursor-pointer"
                />
                Admin
              </label>
              <label className="flex text-amber-700 font-semibold text-lg items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="librarian"
                  {...register("role", { required: true })}
                  className="cursor-pointer"
                />
                Librarian
              </label>
            </div>
            {errors.role && <span className="text-red-500 text-sm">Role is required.</span>}
          </div>

          {/* Username */}
          <div className="grid gap-1">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              placeholder="e.g: argin18"
              {...register('username', { required: true })}
              className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.username && <span className="text-red-500 text-sm">Username is required.</span>}
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required.</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-2 rounded-2xl mt-4 transition-all duration-200 active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/startPage/signup" className="text-orange-600 underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
