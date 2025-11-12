import React, { useState } from "react";
import { BANNER_IMAGE, LOGO_URL } from "../../utils/constants";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch} from "react-redux";
import { addUser } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const { firstName, lastName, email: userEmail, password } = data;

    try {
      if (showSignInForm) {
        await signInWithEmailAndPassword(auth, userEmail, password);
        navigate("/app", { replace: true });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          password
        );
        // Signed up
        const user = userCredential.user;
        const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${firstName} ${lastName}`
        )}&background=6b7280&color=fff&bold=true&size=128&length=2&v=${Date.now()}`;
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
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
          })
        );
        navigate("/app", { replace: true });
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
        onSubmit={handleSubmit(formSubmit)}
        className="absolute bg-black/70 md:w-3/12 text-white md:mx-auto md:mb-1 m-5 right-0 left-0 p-12 my-28 rounded-xl z-10"
      >
        <h1 className="text-2xl font-bold">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!showSignInForm && (
          <>
            <input
              type="text"
              placeholder="FirstName"
              className="p-4 my-4 w-full rounded-lg bg-gray-700 focus:outline focus:outline-rose-400"
              {...register("firstName", {
                required: "FirstName is Required",
                minLength: {
                  value: 2,
                  message: "First name must be atleast 2 characters",
                },
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
            <input
              type="text"
              placeholder="LastName"
              className="p-4 my-4 w-full rounded-lg bg-gray-700 focus:outline focus:outline-rose-400"
              {...register("lastName", {
                required: "LastName is Required",
                minLength: {
                  value: 2,
                  message: "Last name must be atleast 2 characters",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </>
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full rounded-lg bg-gray-700 focus:outline focus:outline-rose-400"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-lg bg-gray-700 focus:outline focus:outline-rose-400"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
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
          <p className="font-xl mt-4 font-semibold hover:underline cursor-pointer">
            Forgot password?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
