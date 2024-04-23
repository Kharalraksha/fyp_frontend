import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfileForm = () => {
  const [userDetails, setUserDetails] = useState({
    user_Name: "",
    email: "",
    phone_Number: "",
    address: "",
    gender: "",
    DOB: "",
    profile: "",
    roles: "",
    registration_Date: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false); // State to toggle showing appointments

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/api/user/${userId}`
        );
        const filteredUserData = filterUserFields(userResponse.data);
        setUserDetails(filteredUserData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchUserAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get(
          `http://localhost:3000/api/appointment/by-user/${userId}`
        );
        setAppointments(appointmentsResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch user appointments:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchUserAppointments();
      setLoading(false);
    } else {
      console.error("No userId found in localStorage");
    }
  }, [userId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/user/editUser/${userId}`,
        userDetails
      );
      alert("Profile Updated Successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to filter out unwanted user fields
  const filterUserFields = (userData) => {
    const filteredData = { ...userData };
    delete filteredData.user_Id;
    delete filteredData.token;
    delete filteredData.password;
    delete filteredData.roles;
    delete filteredData.registration_Date;
    return filteredData;
  };

  // Toggle showing appointments
  const toggleAppointments = () => {
    setShowAppointments(!showAppointments);
  };

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/appointment/cancel/${appointmentId}`
      );
      if (response.status === 200) {
        // Refresh the appointments list after cancellation
        fetchUserAppointments();
        alert("Appointment canceled successfully");
      } else {
        throw new Error("Failed to cancel appointment.");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Appointment canceled successfully");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex ml-48 mt-14">
        {/* Form section */}
        <div className="max-w-md w-full space-y-8 p-10 bg-rose-300 rounded-xl shadow-lg z-10">
          <h2 className="font-semibold text-lg mr-auto">Edit Your Profile</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(userDetails).map((key) => (
              <div key={key} className="mb-4">
                <label className="text-xs font-semibold text-gray-600 py-2">
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  :
                </label>
                <input
                  type="text"
                  name={key}
                  value={userDetails[key]}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                  required={
                    key !== "gender" && key !== "address" && key !== "password"
                  }
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
            >
              Update
            </button>
          </form>
        </div>

        {/* Appointments section */}
        {showAppointments && (
          <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 ml-20">
            <h2 className="font-semibold text-lg mr-auto ">
              Your Appointments
            </h2>
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index}>
                  <strong>Date:</strong> {appointment.date} <br /> <br />
                  <strong>Artist:</strong> {appointment.artistName} <br />
                  <br />
                  <strong>Status:</strong> {appointment.status}
                  <br />
                  <br />
                  {/* Button to cancel appointment */}
                  <button
                    onClick={() =>
                      cancelAppointment(appointment.appointment_Id)
                    }
                    className="bg-red-500 text-white rounded-lg px-4 py-2 mt-4 mb-3"
                  >
                    Cancel Appointment
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Button to show/hide appointments */}
      <div>
        <button
          onClick={toggleAppointments}
          className="bg-gray-500 text-white rounded-lg px-4 py-2 mt-4 ml-72"
        >
          {showAppointments ? "Hide Appointments" : "Show Appointments"}
        </button>
      </div>
    </div>
  );
};

export default UserProfileForm;
