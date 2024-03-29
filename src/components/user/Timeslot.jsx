import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";

const TimeslotManagementPage = () => {
  const navigate = useNavigate();
  const { artistId } = useParams(); // Use consistent casing here

  const [availableDate, setAvailableDate] = useState(new Date());
  const [selectedTimeslots, setSelectedTimeslots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect to login if artistId is not available
    if (!artistId) {
      navigate("/timeslot"); // Redirect to the login page if artistId is not available
    }
  }, [artistId, navigate]);

  const handleTimeslotSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedDate = availableDate.toISOString().split("T")[0];
      const response = await axios.post(
        "http://localhost:3000/api/timeslot/add",
        {
          date: formattedDate,
          available_time: selectedTimeslots,
          artistId: artistId, // Use consistent casing here
        }
      );

      // Check if the response is successful
      if (response.status === 201) {
        alert("Timeslots added successfully");
        setSelectedTimeslots([]); // Clear selected timeslots after successful submission
      } else {
        setError("Failed to add timeslots. Please try again.");
      }
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error while submitting timeslots:", error);

      // Set error state with the error message
      setError(
        error.response
          ? error.response.data.message
          : "An error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeSlotSelection = (time) => {
    setSelectedTimeslots((prevTimeslots) =>
      prevTimeslots.includes(time)
        ? prevTimeslots.filter((t) => t !== time)
        : [...prevTimeslots, time]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Your Timeslots</h1>
      <Calendar
        onChange={setAvailableDate}
        value={availableDate}
        className="my-4"
      />

      <form onSubmit={handleTimeslotSubmit}>
        <label>Select Available Times:</label>
        <div className="flex flex-wrap">
          {[
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeSlotSelection(time)}
              className={`m-1 p-2 border ${
                selectedTimeslots.includes(time) ? "bg-blue-300" : "bg-gray-200"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit Timeslots"}
        </button>
      </form>
    </div>
  );
};

export default TimeslotManagementPage;
