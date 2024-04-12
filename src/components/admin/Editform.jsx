import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [artistData, setArtistData] = useState({
    artist_Name: "",
    phone_Number: "",
    email: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // guard against undefined id
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artist/${id}`
        );
        setArtistData(response.data);
        setIsModalOpen(true); // Open the modal once data is fetched
      } catch (error) {
        console.error("Error fetching artist data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/artist/editArtist/${id}`, // Fix the URL
        artistData
      );
      console.log("Update Response:", response.data);
      navigate("/artist");
    } catch (error) {
      console.error("Error updating artist data: ", error);
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
              htmlFor="artistName"
              className="block text-sm font-medium text-gray-700"
            >
              Artist Name:
            </label>
            <input
              type="text"
              id="artistName"
              value={artistData.artist_Name}
              onChange={(e) =>
                setArtistData({ ...artistData, artist_Name: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={artistData.phone_Number}
              onChange={
                (e) =>
                  setArtistData({ ...artistData, phone_Number: e.target.value }) // Fix the property name
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={artistData.address}
              onChange={(e) =>
                setArtistData({ ...artistData, address: e.target.value })
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

export default EditForm;
