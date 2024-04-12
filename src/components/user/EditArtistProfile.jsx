import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditArtistProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    bio: "",
    image: null,
    price: "",
    experience: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArtistProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/artist/profile"
        );
        setFormData({ ...response.data });
        setImagePreviewUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Failed to fetch artist profile:", error);
        setErrors({ fetchError: "Failed to load profile data." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistProfile();
  }, []);

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
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "password" && key !== "confirmPassword") {
        formDataToSend.append(key, value);
      }
    });

    try {
      await axios.put(
        "http://localhost:3000/api/artist/editArtist/${artistId}",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Handle success
    } catch (error) {
      setErrors(error.response?.data?.errors || { error: "Server Error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold text-center">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="mt-4">
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
              type="text"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArtistProfile;
