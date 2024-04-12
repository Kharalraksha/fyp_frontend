import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";
import Khalti from "../Khalti/Khalti";
import booking from "../../assets/booking.png";

function UserAppointment() {
  const { id: artist_Id } = useParams();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState({
    status: "",
    date: "",
    artist_Id,
    user_Id: user ? user.userId : "",
    timeslot_Id: "",
  });

  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [createdAppointmentId, setCreatedAppointmentId] = useState(null);

  // Define today's date for the date input min attribute
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
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
        setMessage("Failed to fetch timeslots.");
      }
    };

    if (user && user.token) {
      fetchTimeslots();
    }
  }, [user, artist_Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (appointment.date < today) {
      setMessage("Please select a valid date.");
      setIsSubmitting(false);
      return;
    }

    try {
      const appointmentData = {
        ...appointment,
        timeslot_Id: selectedTimeslotId,
      };
      const response = await axios.post(
        "http://localhost:3000/api/appointment/add",
        appointmentData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 201) {
        const { appointmentId } = response.data;
        setCreatedAppointmentId(appointmentId);
        setMessage("Appointment has been successfully booked");
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          status: "successful",
        }));
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
      <div
        style={{ height: "550px" }}
        className="max-w-5xl w-1/2 mx-auto bg-rose-50 p-8 border border-gray-300 rounded-lg shadow-xl"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center mt-10">
          <div className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
            <img
              className="rounded-lg h-100 w-full max-w-md mb-4 lg:mb-0"
              src={booking}
              alt="booking"
            />
          </div>
          <div className="lg:w-1/2 lg:ml-4">
            <div className="text-lg leading-6 font-medium space-y-1">
              <h3 className="text-gray-900">Book Your Appointment</h3>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={appointment.date}
                  onChange={handleChange}
                  min={today}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="timeslotId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Choose Timeslot
                </label>
                <select
                  id="timeslotId"
                  name="timeslot_Id"
                  value={selectedTimeslotId}
                  onChange={(e) => setSelectedTimeslotId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full lg:w-auto inline-flex justify-center py-2 px-9 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4 lg:mb-0 lg:mr-4 ml-20"
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>
              {message && <p className="text-red-400">{message}</p>}
            </form>
          </div>
        </div>
        <div className="mt-6">
          <Khalti
            user_Id={user ? user.userId : ""}
            appointment_Id={createdAppointmentId}
            amount={200}
          />
        </div>
      </div>
    </div>
  );
}

export default UserAppointment;
