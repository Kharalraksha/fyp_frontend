import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import EditForm from "./Editform";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from "reactjs-popup";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const fetchArtist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/artist/get");
      console.log("API Response:", response.data);
      setArtists(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchArtist();
  }, []);

  const handleDeleteArtist = async (artist_Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/artist/deleteArtist/${artist_Id}`
      );
      console.log("API Response:", response.data);
      setArtists(artists.filter((artist) => artist.artist_Id !== artist_Id));
      closeModal(); // Close the modal on successful deletion
    } catch (error) {
      console.error("Error deleting the artist: ", error);
      closeModal(); // Close the modal on error as well
    }
  };

  const handleEditArtist = (artistId) => {
    console.log(`Edit artist with ID ${artistId}`);
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
      <div className="">
        <SearchBar />
      </div>

      <div className="overflow-x-auto ml-60 mr-0">
        <table className="w-full bg-white border border-gray-300 mt-12">
          <thead>
            <tr className="bg-slate-200  text-black border-b">
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Artist Name</th>
              <th className="py-2 px-4 border-r">Phone</th>
              <th className="py-2 px-4 border-r">Email</th>
              <th className="py-2 px-4 border-r">Address</th>
              <th className="py-2 px-4 border-r">Image</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(artists) &&
              artists.map((artist, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-r">{artist.artist_Id}</td>
                  <td className="py-2 px-4 border-r">{artist.artist_Name}</td>
                  <td className="py-2 px-4 border-r">{artist.phone_Number}</td>
                  <td className="py-2 px-4 border-r">{artist.email}</td>
                  <td className="py-2 px-4 border-r">{artist.address}</td>
                  <td className="py-2 px-4 border-r">
                    <img
                      src={artist.image}
                      alt={artist.artist_Name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      onClick={() => handleEditArtist(artist.artist_Id)}
                    >
                      <Link to={`/EditForm/${artist.artist_Id}`}>Edit</Link>
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => setOpen(true)}
                    >
                      Delete
                    </button>

                    <Popup
                      open={open}
                      closeOnDocumentClick
                      onClose={closeModal}
                      modal
                      nested
                      className=""
                    >
                      <div className="modal bg-rose-200 rounded shadow-lg p-5 max-w-sm w-full">
                        <a
                          className="close cursor-pointer float-right top-0 right-0 mt-2 mr-2 text-lg"
                          onClick={closeModal}
                        >
                          &times;
                        </a>
                        <div className="text-center">
                          <p className="text-base font-semibold mb-4">
                            Are you sure you want to delete this artist?
                          </p>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 mr-20"
                            onClick={() => handleDeleteArtist(artist.artist_Id)}
                          >
                            Yes
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 ml-20"
                            onClick={closeModal}
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

export default Artist;
