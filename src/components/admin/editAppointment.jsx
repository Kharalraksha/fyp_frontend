import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    status: "",
    date: "",
    artist_Id: "",
    user_Id: "",
    timeslot_Id: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // guard against undefined id
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/appointment/${id}`
        );
        setAppointmentData(response.data);
        setIsModalOpen(true); // Open the modal once data is fetched
      } catch (error) {
        console.error("Error fetching appointment data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointment/${id}`,
        appointmentData
      );
      console.log("Update Response:", response.data);
      navigate("/appointment");
    } catch (error) {
      console.error("Error updating appointment data: ", error);
    } finally {
      setIsModalOpen(false); // Close the modal on submit
    }
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <form onSubmit={handleSubmit} className="bg-red-300 p-8 rounded-md">
          {/* Form content */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="float-right bg-transparent text-black"
          >
            Close
          </button>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <input
              type="text"
              id="status"
              value={appointmentData.status}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  status: e.target.value,
                })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="text"
              id="date"
              value={appointmentData.date}
              onChange={(e) =>
                setAppointmentData({ ...appointmentData, date: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="artistId"
              className="block text-sm font-medium text-gray-700"
            >
              Artist ID:
            </label>
            <input
              type="text"
              id="artistId"
              value={appointmentData.artist_Id}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  artist_Id: e.target.value,
                })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={appointmentData.user_Id}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  user_Id: e.target.value,
                })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="timeslotId"
              className="block text-sm font-medium text-gray-700"
            >
              Timeslot ID:
            </label>
            <input
              type="text"
              id="timeslotId"
              value={appointmentData.timeslot_Id}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  timeslot_Id: e.target.value,
                })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
