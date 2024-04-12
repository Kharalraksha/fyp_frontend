import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCameraRetro, FaClock, FaHistory } from "react-icons/fa"; // Import icons from react-icons

const ArtistSidebar = () => {
  const location = useLocation(); // Hook to get the current location

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen sticky top-0 bg-blue-100 shadow-lg text-gray-600 w-64 space-y-6 py-7 px-2">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Artist Panel
      </h2>
      <nav className="mt-28">
        <Link
          to="/upload/id"
          className={`flex text-xl items-center p-2 rounded-lg transition duration-200 mt-10 ${
            isActive("/upload/id")
              ? "bg-orange-300 text-white"
              : "hover:bg-orange-300 hover:text-white"
          }`}
        >
          <FaCameraRetro
            className={`mr-3 ${isActive("/upload/id") ? "text-white" : ""}`}
          />
          Upload Photo
        </Link>
        <Link
          to="/timeslot/:artistId"
          className={`flex text-xl items-center p-2 rounded-lg transition duration-200 mt-4 ${
            isActive("/timeslot/:artistId")
              ? "bg-orange-300 text-white"
              : "hover:bg-orange-300 hover:text-white"
          }`}
        >
          <FaClock
            className={`mr-3 ${
              isActive("/timeslot/:artistId") ? "text-white" : ""
            }`}
          />
          Add Timeslot
        </Link>
        <Link
          to="/history"
          className={`flex text-xl items-center p-2 rounded-lg transition duration-200 mt-4 ${
            isActive("/history")
              ? "bg-orange-300 text-white"
              : "hover:bg-orange-300 hover:text-white"
          }`}
        >
          <FaHistory
            className={`mr-3 ${isActive("/history") ? "text-white" : ""}`}
          />
          Appointment History
        </Link>
      </nav>
    </div>
  );
};

export default ArtistSidebar;
