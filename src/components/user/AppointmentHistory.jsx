import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtistNavbar from "./ArtistNavbar";
import ArtistSidebar from "./ArtistSidebar";

const AppointmentHistory = () => {
  const artistId = localStorage.getItem("artistId");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointmentsByArtist(artistId);
  }, [artistId]);

  const fetchAppointmentsByArtist = async (artistId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/appointment/by-artist/${artistId}`
      );
      if (response.status === 200) {
        setAppointments(response.data);
      } else {
        throw new Error("Failed to load appointments.");
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setError("Failed to load appointments. Please try again later.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/appointment/${appointmentId}`
      );
      if (response.status === 200) {
        // Remove the canceled appointment from the list
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.appointment_Id !== appointmentId
          )
        );
        alert("Appointment successfully canceled.");
      } else {
        throw new Error("Failed to cancel appointment.");
      }
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      setError("Failed to cancel appointment. Please try again later.");
    }
  };

  const handleRescheduleAppointment = async (
    appointmentId,
    newDate,
    newTimeslotId
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointment/reschedule/${appointmentId}`,
        { newDate, newTimeslotId }
      );
      if (response.status === 200) {
        // Update the appointment with the new date and timeslot
        fetchAppointmentsByArtist(artistId);
        alert("Appointment successfully rescheduled.");
      } else {
        throw new Error("Failed to reschedule appointment.");
      }
    } catch (err) {
      console.error("Failed to reschedule appointment:", err);
      setError("Failed to reschedule appointment. Please try again later.");
    }
  };

  return (
    <>
      <ArtistNavbar />
      <div className="flex">
        <ArtistSidebar />
        <div className="flex-grow p-4">
          <h2 className="text-2xl font-bold mb-4">
            Appointments for Artist {artistId}
          </h2>
          {error && <div className="text-red-500">{error}</div>}
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.appointment_Id}
                  className="border p-4 rounded-lg"
                >
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>User Details:</strong>
                  </p>
                  <ul>
                    <li>Name: {appointment.userName}</li>
                    <li>Email: {appointment.userEmail}</li>
                  </ul>
                  {/* Add cancel button with onClick event */}
                  {appointment.status !== "canceled" && (
                    <button
                      onClick={() =>
                        handleCancelAppointment(appointment.appointment_Id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      Cancel
                    </button>
                  )}
                  {/* Add reschedule form with onSubmit event */}
                  {appointment.status !== "canceled" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const newDate = e.target.elements.newDate.value;
                        const newTimeslotId =
                          e.target.elements.newTimeslotId.value;
                        handleRescheduleAppointment(
                          appointment.appointment_Id,
                          newDate,
                          newTimeslotId
                        );
                      }}
                    >
                      <label htmlFor="newDate">New Date:</label>
                      <input type="date" id="newDate" name="newDate" required />
                      <label htmlFor="newTimeslotId">New Timeslot:</label>
                      <input
                        type="text"
                        id="newTimeslotId"
                        name="newTimeslotId"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                      >
                        Reschedule
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments found for this artist.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentHistory;
