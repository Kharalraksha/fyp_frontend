import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import ArtistSidebar from "./ArtistSidebar";
import ArtistNavbar from "./ArtistNavbar";

const TimeslotManagementPage = () => {
  const navigate = useNavigate();
  // Retrieve artistId from localStorage
  const artistId = localStorage.getItem("artistId");

  const [availableDate, setAvailableDate] = useState(new Date());
  const [selectedTimeslots, setSelectedTimeslots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if artistId is not found in localStorage
    if (!artistId) {
      navigate("/login"); // Adjust the redirection URL based on your routing setup
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
          artistId: artistId,
        }
      );

      if (response.status === 201) {
        alert("Timeslots added successfully");
        setSelectedTimeslots([]);
      } else {
        setError("Failed to add timeslots. Please try again.");
      }
    } catch (err) {
      console.error("Error while submitting timeslots:", err);
      setError(
        err.response
          ? err.response.data.message
          : "An error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeSlotSelection = (time) => {
    setSelectedTimeslots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <>
      <ArtistNavbar />
      <div className="flex h-screen bg-gray-100">
        <ArtistSidebar />

        <div className="flex-grow p-10">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Manage Your Timeslots
            </h1>
            <div className="mb-6">
              <Calendar
                onChange={setAvailableDate}
                value={availableDate}
                minDate={new Date()} // Disallow past dates
                className="my-4"
              />
            </div>

            <form onSubmit={handleTimeslotSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Available Times:
                </label>
                <div className="flex flex-wrap gap-2">
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
                      className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-300 
                    ${
                      selectedTimeslots.includes(time)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                    }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center w-1/2 px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Timeslots"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeslotManagementPage;
