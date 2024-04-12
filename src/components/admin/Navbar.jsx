import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ baseUrl }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("Rakshya"); // Assuming userName is fetched and stored here

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed top-0 left-52 right-0 bg-red-300 p-6 flex justify-between items-center">
      <div>
        <span className="text-black text-lg font-bold">{`Hello, ${userName}`}</span>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <FiUser size={20} />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
