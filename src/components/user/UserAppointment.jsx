import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";

function UserAppointment() {
  const { id: artist_Id } = useParams();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState({
    status: "pending",
    date: "",
    artist_Id,
    user_Id: user ? user.userId : "", // Get user Id from the user object
    timeslot_Id: "",
  });

  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const token = user ? user.token : ""; // Get token from the user object

  useEffect(() => {
    // Fetch timeslots only if user is authenticated
    if (user && user.token) {
      fetchTimeslots();
    }
  }, [user]); // Dependency added for user

  const fetchTimeslots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/timeslot/${artist_Id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTimeslots(response.data);
    } catch (error) {
      console.error("Error fetching timeslots:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Combine appointment data with selected timeslot ID
      const appointmentData = {
        ...appointment,
        timeslot_Id: selectedTimeslotId,
      };

      const response = await axios.post(
        "http://localhost:3000/api/appointment/add",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("Appointment has been successfully booked");
      } else {
        setMessage("Failed to book the appointment");
      }
    } catch (error) {
      console.error("Booking appointment failed:", error);
      setMessage(
        error.response?.data.error ||
          "An error occurred while booking the appointment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mt-28"
        >
          Booked Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={appointment.date}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="timeslotId"
          className="block text-sm font-medium text-gray-700"
        >
          Select Timeslot
        </label>
        <select
          id="timeslotId"
          name="timeslot_Id"
          value={selectedTimeslotId}
          onChange={(e) => setSelectedTimeslotId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select Timeslot</option>
          {timeslots.map((timeslot) => (
            <option key={timeslot.id} value={timeslot.id}>
              {timeslot.available_time}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? "Booking..." : "Book Appointment"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}

export default UserAppointment;
