import React, { useState, useEffect, useParams } from "react";
import axios from "axios";

const ReviewForm = ({ artistId }) => {
  // Fetch userId from localStorage
  const userId = localStorage.getItem("userId");

  // Initialize form state with userId
  const [formData, setFormData] = useState({
    artist_Id: artistId,
    user_Id: userId, // Add userId to your form state
    rating: 0,
    comments: "",
  });

  // Rest of your component setup remains the same
  console.log("artistId", artistId);
  console.log("user_Id", userId);
  // State for submission feedback
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch token from localStorage for authorization header
  const token = localStorage.getItem("token");

  // Handle input changes for comments and rating
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set the rating when a star is clicked
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Update handleSubmit to send user_Id along with the other form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting review with formData:", formData); // Log formData for debugging

    try {
      const response = await axios.post(
        "http://localhost:3000/api/review/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );

      console.log("Review submitted successfully", response);
      setMessage("Review submitted successfully!");
      // Reset the form after successful submission
      setFormData({
        artist_Id: artistId,
        user_Id: userId,
        rating: 0,
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(
        error.response?.data?.error || // Ensure to access `data.error` safely
          "An error occurred while submitting the review."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="shadow-lg p-5" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Submit a Review</h2>

        {/* Display error message */}
        {error && (
          <div className="mb-4 text-sm font-medium text-red-600">{error}</div>
        )}

        {/* Display success message */}
        {message && (
          <div className="mb-4 text-sm font-medium text-green-600">
            {message}
          </div>
        )}

        {/* Star Rating */}
        <div className="mb-4">
          <label className="block mb-1">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`mx-1 text-lg ${
                  star <= formData.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comments Input */}
        <div className="mb-4">
          <label htmlFor="comments" className="block">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
