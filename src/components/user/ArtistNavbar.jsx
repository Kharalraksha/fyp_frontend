import React from "react";
import { Link } from "react-router-dom";

const ArtistNavbar = () => {
  const email = localStorage.getItem("artist_email"); // Assuming the artist's email is stored in localStorage

  // Handler for logout - to be implemented
  const handleLogout = () => {
    // Perform logout operations here
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-pink-200 border-b-2 py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-bold text-orange-500">
          GlowQuill
        </Link>
        {email && (
          <span className="text-lg font-lg text-gray-600">Hello, {email}</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/artistprofile"
          className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded transition duration-200"
        >
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded transition duration-200"
        >
          <Link to="/">Logout</Link>
        </button>
      </div>
    </nav>
  );
};

export default ArtistNavbar;
