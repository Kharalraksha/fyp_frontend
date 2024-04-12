import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../auth/Authcontext";
import axios from "axios";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    // Redirect if the user is already logged in
    if (user && user.token) {
      if (user.role === "admin") {
        navigate("/dashboard"); // Navigate to the dashboard for admins
      } else {
        navigate("/"); // Navigate to the homepage for regular users
      }
    }
  }, [user, navigate]);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data.token) {
        const { token, userDetails } = response.data;

        // Update the login function call to include name from userDetails
        login({
          userId: userDetails.userId,
          token: token,
          email: userDetails.email,
          name: userDetails.name, // Use the key that matches your backend response
          role: userDetails.role, // Include role in user context
        });

        if (userDetails.role === "admin") {
          navigate("/dashboard"); // Navigate to the dashboard for admins
        } else {
          navigate("/"); // Navigate to the homepage for regular users
        }
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-200">
      <div className="bg-white rounded-lg p-20 w-200 shadow-md text-center">
        <h2 className="text-3xl font-bold mb-8 ">Sign in for Glowquill</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-6 w-full">
            <label
              htmlFor="username"
              className="block text-left mb-1 font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="password"
              className="block text-left mb-1 font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-700 mb-4 self-end"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white border border-transparent rounded-md py-2 px-10 transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:border-orange-700 focus:ring focus:ring-orange-200 disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          Not a member?{" "}
          <Link to="/signupform" className="text-orange-500 font-bold">
            Sign up
          </Link>
        </div>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

SigninForm.propTypes = {
  toggle: PropTypes.func,
};

export default SigninForm;
