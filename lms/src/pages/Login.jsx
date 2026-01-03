import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- import useNavigate
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import background from "../assets/background.jpg";

const Login = () => {
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [authErr, setAuthErr] = useState("");
  
  const onSubmit = (data) => {
    const users= JSON.parse(localStorage.getItem("users"))||[]
    console.log("Login data", data);
    const user = users.find(
      (u) =>
        u.username === data.username &&
        u.password === data.password &&
        u.role === data.role
    );
    // Example validation
    if (user) {
      setIsLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setAuthErr("Invalid username, password or role..");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${background}) ` }}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    >
      <div className="bg-white/55 shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-3xl font-bold  text-center mb-6">Login</h1>
        {authErr && (
          <p className="text-red-600 text-lg text-center font-semibold">
            {authErr}
          </p>
        )}
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
                  className="cursor-pointer "
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
            {errors.role && <span className=" text-lg">Role is required.</span>}
          </div>

          {/* Username */}
          <div className="grid gap-1">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              placeholder="e.g: argin18"
              {...register("username", { required: true })}
              className="border  rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.username && (
              <span className=" text-lg">Username is required.</span>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && (
              <span className=" text-lg">Password is required.</span>
            )}
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
          <Link
            to="/startPage/signup"
            className="text-orange-600 underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
