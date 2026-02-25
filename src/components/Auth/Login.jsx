import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const Login = ({ onSuccess }) => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const getFriendlyError = (err) => {
    const code = err?.code || "";
    switch (code) {
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "Email already in use. Try signing in.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return err?.message || "Something went wrong. Please try again.";
    }
  };
  const formSubmit = async (data) => {
    setErrorMessage("");
    setInfoMessage("");

    try {
      if (isResetMode) {
        await sendPasswordResetEmail(auth, data.email);
        setInfoMessage("Reset link sent. Check Inbox/Spam.");
        reset();
        return;
      }

      if (showSignInForm) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        onSuccess?.();
        return;
      }
      // SIGN UP
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.userName,
      )}&background=f97316&color=fff&bold=true&size=128&length=1&rounded=true`;

      await updateProfile(userCredential.user, {
        displayName: data.userName,
        photoURL: avatarURL,
      });

      await userCredential.user.reload();
      const updatedUser = auth.currentUser;

      if (updatedUser) {
        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          }),
        );
      }

      onSuccess?.();
    } catch (err) {
      setErrorMessage(getFriendlyError(err));
    }
  };
  const toggleSignInForm = () => {
    setShowSignInForm((prev) => !prev);
    setErrorMessage("");
    setInfoMessage("");
    setShowPassword(false);
    setIsResetMode(false);
    reset();
  };
  const openReset = () => {
    setIsResetMode(true);
    setErrorMessage("");
    setInfoMessage("");
    setShowPassword(false);
    reset();
  };

  const backToSignIn = () => {
    setIsResetMode(false);
    setShowSignInForm(true);
    setErrorMessage("");
    setInfoMessage("");
    setShowPassword(false);
    reset();
  };

  return (
    <div className="font-serif">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-2xl p-4"
      >
        <h1 className="text-2xl font-bold">
          {isResetMode
            ? "Reset Password"
            : showSignInForm
              ? "Sign In"
              : "Sign Up"}
        </h1>

        {!isResetMode && !showSignInForm && (
          <>
            <div className="relative my-4">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="User Name"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12"
                {...register("userName", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
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
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12"
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

        {!isResetMode && (
          <>
            <div className="relative my-4">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12 pr-12"
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
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </>
        )}
        {errorMessage && (
          <p className="text-red-400 text-sm my-2">{errorMessage}</p>
        )}
        {infoMessage && (
          <p className="text-green-400 text-sm my-2">{infoMessage}</p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-gradient-to-br from-orange-500 to-amber-400 hover:scale-[1.02] transition-all
                     text-black text-lg font-semibold px-4 py-2 my-4 w-full rounded-lg disabled:opacity-60"
        >
          {isSubmitting
            ? "Please wait..."
            : isResetMode
              ? "Send Reset Link"
              : showSignInForm
                ? "Sign In"
                : "Create Account"}
        </button>
        <div className="flex flex-col gap-2 text-sm">
          {!isResetMode && (
            <button
              type="button"
              className="text-left font-semibold hover:text-orange-400"
              onClick={toggleSignInForm}
            >
              {showSignInForm
                ? "New user? Sign up"
                : "Already have an account? Sign in"}
            </button>
          )}

          {showSignInForm && !isResetMode && (
            <button
              type="button"
              className="text-left font-semibold hover:text-orange-400"
              onClick={openReset}
            >
              Forgot password?
            </button>
          )}

          {isResetMode && (
            <button
              type="button"
              className="text-left font-semibold hover:text-orange-400"
              onClick={backToSignIn}
            >
              Back to Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
