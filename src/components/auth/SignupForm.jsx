import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    dob: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors for the changed field
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate name
    if (!userDetails.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!userDetails.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate phone
    if (!userDetails.phone.trim()) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(userDetails.phone)) {
      formErrors.phone = "Invalid phone number, must be 10 digits";
      isValid = false;
    }

    // Validate password for length, and inclusion of at least one special character
    if (!userDetails.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (userDetails.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userDetails.password)) {
      formErrors.password =
        "Password must contain at least one special character";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        userDetails
      );
      console.log("User Data:", response.data);
      if (!response.data.error) {
        alert("Succesfully Registered");
      }
      if (response.data.error) {
        alert("Email already exist");
      }
      // Handle successful signup (e.g., show success message, redirect, etc.)
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email already exists"
      ) {
        // Display error message to the user indicating that the email already exists
        alert("Email already exists. Please use a different email address.");
      }

      alert(error.response.data);
      //console.error("Error creating user:", error);
      // Handle signup error (e.g., show error message)
    }
  };

  // Check if all form fields are filled (for button enabling/disabling)
  const isFormFilled = () =>
    Object.values(userDetails).every((value) => value.trim() !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">
                Create Your Account
              </h2>
            </div>
            <form className="mt-5" onSubmit={handleRegister}>
              <div className="form">
                {Object.keys(errors).length > 0 && (
                  <div className="mb-3 text-red-500">
                    Please fill the required fields:
                    <ul>
                      {Object.keys(errors).map((field, index) => (
                        <li key={index}>{errors[field]}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Full Name
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    placeholder="Full Name"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required="required"
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    value={userDetails.name}
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Email Address
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    placeholder="Email Address"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required="required"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={userDetails.email}
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Phone
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    placeholder="Phone"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required="required"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={handleInputChange}
                    value={userDetails.phone}
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Gender
                  </label>
                  <select
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    name="gender"
                    id="gender"
                    onChange={handleInputChange}
                    value={userDetails.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Address
                  </label>
                  <input
                    placeholder="Address"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleInputChange}
                    value={userDetails.address}
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Date of Birth
                  </label>
                  <input
                    placeholder="Date of Birth"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    type="date"
                    name="dob"
                    id="dob"
                    onChange={handleInputChange}
                    value={userDetails.dob}
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Password
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required="required"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                    value={userDetails.password}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="mt-5 text-center">
                  <button
                    type="submit"
                    className={`${
                      isFormFilled() ? "bg-orange-400" : "bg-gray-400"
                    } px-10 py-2 text-sm text-white rounded-lg ${
                      isFormFilled() ? "" : "cursor-not-allowed"
                    }`}
                    disabled={!isFormFilled()}
                  >
                    Register
                  </button>
                </div>
                <div className="text-sm font-semibold mt-2 pt-1 mb-0 ml-20">
                  Already have an account?{" "}
                  <Link
                    to="/signinform"
                    className="text-purple-600 hover:text-purple-700 focus:text-purple-700 transition duration-200 ease-in-out"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
