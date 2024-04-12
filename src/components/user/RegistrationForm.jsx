import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
    phone: "",
    address: "",
    bio: "",
    image: null,
    confirmPassword: "",
    price: "", // Add price field
    experience: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // Add state for image preview URL
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        // Exclude confirmPassword from formData
        formDataToSend.append(key, value);
      }
    });

    try {
      await axios.post(
        "http://localhost:3000/api/artist/signupartist",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Optionally redirect user or show a success message here
      setFormData({
        name: "",
        email: "",
        dob: "",
        password: "",
        phone: "",
        address: "",
        bio: "",
        image: null,
        confirmPassword: "",
        price: "",
        experience: "",
      });
      setErrors({});
    } catch (error) {
      setErrors(error.response?.data?.errors || { error: "Server Error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold text-center">
          Makeup Artist Registration
        </h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="bio">
                Bio
              </label>
              <textarea
                placeholder="Bio"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="price">
                Price
              </label>
              <input
                type="text" // Or type="number" if you want to ensure numeric input
                placeholder="Price"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="experience">
                Experience
              </label>
              <textarea
                placeholder="Describe your experience"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="image">
                Profile Image
              </label>
              <input
                type="file"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="image"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            {imagePreviewUrl && (
              <div className="mt-4">
                <label className="block" htmlFor="imagePreview">
                  Image Preview
                </label>
                {/* Use imagePreviewUrl as the source for the image preview */}
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="w-full max-w-xs h-auto"
                />
              </div>
            )}

            {errors && errors.error && (
              <p className="mt-2 text-sm text-red-600">{errors.error}</p>
            )}
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Submit
              </button>
              <Link
                to="/Artistlogin"
                className="text-sm text-blue-600 hover:underline"
              >
                Go to Artist Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
