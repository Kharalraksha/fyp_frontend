import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditAppointment from "./editAppointment";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointment/get"
      );
      console.log("API Response:", response.data);
      setAppointments(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointment_Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/appointment/${appointment_Id}`
      );
      console.log("API Response:", response.data);
      setAppointments(
        appointments.filter(
          (appointment) => appointment.appointment_Id !== appointment_Id
        )
      );
      setOpenDeleteModal(false); // Close the modal on successful deletion
    } catch (error) {
      console.error("Error deleting the appointment: ", error);
      setOpenDeleteModal(false); // Close the modal on error as well
    }
  };

  const handleEditAppointment = (appointment_Id) => {
    console.log(`Edit appointment with ID ${appointment_Id}`);
    // Implement your logic to navigate to the edit page or show an edit modal
  };

  const handlePreviousClick = () => {
    console.log("Previous clicked");
    // Implement your logic for pagination
  };

  const handleNextClick = () => {
    console.log("Next clicked");
    // Implement your logic for pagination
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <Sidebar />
      </div>
      <div className="">
        <Navbar />
      </div>
      <div className=""></div>
      <div className="overflow-x-auto ml-60 mr-0">
        <table className="w-full bg-white border border-gray-300 mt-28">
          <thead>
            <tr className="bg-slate-200  text-black border-b">
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Status</th>
              <th className="py-2 px-4 border-r">Date</th>
              <th className="py-2 px-4 border-r">Artist ID</th>
              <th className="py-2 px-4 border-r">User ID</th>
              <th className="py-2 px-4 border-r">Timeslot ID</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(appointments) &&
              appointments.map((appointment, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-r">
                    {appointment.appointment_Id}
                  </td>
                  <td className="py-2 px-4 border-r">{appointment.status}</td>
                  <td className="py-2 px-4 border-r">{appointment.date}</td>
                  <td className="py-2 px-4 border-r">
                    {appointment.artist_Id}
                  </td>
                  <td className="py-2 px-4 border-r">{appointment.user_Id}</td>
                  <td className="py-2 px-4 border-r">
                    {appointment.timeslot_Id}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setOpenDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                      onClick={() =>
                        handleEditAppointment(appointment.appointment_Id)
                      }
                    >
                      <Link
                        to={`/editAppointment/${appointment.appointment_Id}`}
                      >
                        Edit
                      </Link>
                    </button>

                    <Popup
                      open={openDeleteModal}
                      closeOnDocumentClick
                      onClose={() => setOpenDeleteModal(false)}
                      modal
                      nested
                      className=""
                    >
                      <div className="modal bg-rose-200 rounded shadow-lg p-5 max-w-sm w-full">
                        <a
                          className="close cursor-pointer float-right top-0 right-0 mt-2 mr-2 text-lg"
                          onClick={() => setOpenDeleteModal(false)}
                        >
                          &times;
                        </a>
                        <div className="text-center">
                          <p className="text-base font-semibold mb-4">
                            Are you sure you want to delete this appointment?
                          </p>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 mr-20"
                            onClick={() =>
                              handleDeleteAppointment(
                                selectedAppointment.appointment_Id
                              )
                            }
                          >
                            Yes
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 ml-20"
                            onClick={() => setOpenDeleteModal(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Appointment;
