import React, { useState } from "react";
import { BANNER_IMAGE, LOGO_URL } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { auth } from "../../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const getFriendlyError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    default:
      return "Something went wrong. Please try again later.";
  }
};

const PasswordReset = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage(
        "If an account with that email exists, a password reset link has been sent.Please check Spam"
      );
    } catch (error) {
      setMessage(getFriendlyError(error.code));
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <div>
      <div>
        <img
          className="w-20 h-20 absolute bg-orange-600 z-50 m-5 rounded-full p-1"
          src={LOGO_URL}
          alt="brand-logo"
        />
      </div>
      <div className="fixed inset-0 -z-10">
        <img
          src={BANNER_IMAGE}
          alt="food-menu"
          className="w-full min-h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute items-center bg-black/60 md:w-3/12 text-white md:mx-auto m-5 right-0 left-0 p-12 my-36 rounded-xl z-10"
      >
        <h2 className="font-semibold text-xl mb-3">Reset Your Password</h2>
        <input
          className="p-4 my-4 w-full rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-lg font-bold text-orange-500 p-3 mt-5 w-full rounded-lg hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="text-green-400 my-1 ">{message}</p>}
        <div className="flex justify-between mt-5">
          <Link to="/" className="text-md font-semibold text-orange-500 hover:opacity-80">
            <IoArrowBack className="w-5 h-5 inline-block mr-1" /> Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
