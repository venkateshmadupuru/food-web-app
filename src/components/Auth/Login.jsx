import React, { useState } from "react";
import { BANNER_IMAGE, LOGO_URL } from "../../utils/constants";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const { userName, email: userEmail, password } = data;
    try {
      if (showSignInForm) {
        await signInWithEmailAndPassword(auth, userEmail, password);
        navigate("/", { replace: true });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          password,
        );
        // Signed up
        const user = userCredential.user;
        const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${userName}`,
        )}&background=6b7280&color=fff&bold=true&size=128&length=2&v=${Date.now()}`;
        await updateProfile(user, {
          displayName: `${userName}`,
          photoURL: avatarURL,
        });
        // Profile updated!
        await user.reload();
        const updatedUser = auth.currentUser;
        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          }),
        );
        navigate("/", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
    setErrorMessage("");
    reset();
  };

  return (
    <div className="font-serif min-h-screen overflow-hidden">
      <div className="relative flex">
        <img
          className="w-14 h-14 absolute bg-orange-600 z-50 m-5 rounded-full p-1"
          src={LOGO_URL}
          alt="BigBite Logo"
        />
        <h1 className="flex-1 text-center text-4xl font-bold text-orange-500 mt-8 hover:scale-105 transition-transform cursor-pointer">
          BigBite
        </h1>
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
        onSubmit={handleSubmit(formSubmit)}
        className="absolute bg-black/70 md:w-3/12 text-white md:mx-auto my-14 m-5 right-0 left-0 md:p-12 p-6 rounded-2xl z-10"
      >
        <h1 className="text-2xl font-bold">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!showSignInForm && (
          <>
            <div className="relative my-4">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="User Name"
                className="p-3 w-full rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12"
                {...register("userName", {
                  required: "Name is Required",
                  minLength: {
                    value: 2,
                    message: "Name must be atleast 2 characters",
                  },
                })}
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </>
        )}
        <div className="relative my-4">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Email"
            className="p-3 w-full rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div className="relative my-4">
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-3 w-full rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm my-2">{errorMessage}</p>
        )}
        <button
          className="bg-gradient-to-br from-orange-500 to-amber-400 
                     hover:scale-105 transition-all duration-300 ease-out
                   text-black font-serif text-lg font-semibold px-4 py-2 my-4 w-full rounded-lg"
        >
          {showSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <span
          className="font-semibold cursor-pointer hover:text-orange-200"
          onClick={toggleSignInForm}
        >
          {showSignInForm ? "New User? Sign Up" : "Already have an account?"}
        </span>
        <Link to="/password-reset">
          {showSignInForm && (
            <p className="font-xl mt-4 font-semibold hover:text-orange-200 cursor-pointer">
              Forgot password?
            </p>
          )}
        </Link>
      </form>
    </div>
  );
};

export default Login;
