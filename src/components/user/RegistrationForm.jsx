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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match.";
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("dob", formData.dob); // Assuming dob is handled as a string or properly formatted
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("bio", formData.bio);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/artist/signupartist",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("API Response:", response.data);
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
        });
        // Clear any previous errors
        setErrors({});
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error
        );
        // Handle errors from the backend
        setErrors(
          error.response ? error.response.data : { error: "Server Error" }
        );
      }
    }
  };

  return (
    <div className="bg-rose-100 shadow p-4 rounded mx-auto w-1/2 mt-20">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Makeup Artist Registration
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          id="bio"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {errors && errors.error && (
          <p className="text-red-500">{errors.error}</p>
        )}
        <button type="submit">Submit</button>
        <Link to="/Artistlogin">
          <button>Go to Artist Login</button>
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
