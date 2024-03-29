// Navbar.jsx
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";

const Navbar = ({ baseUrl }) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get(`h`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setUserName(response.data.message.name);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [baseUrl, navigate]);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className="  ml-52  p-2 bg-red-300 border fixed w-full
     "
    >
      <div className=" items-center">
        <span className="text-black text-lg font-bold">{`Hello, Rakshya ${userName}`}</span>
      </div>

      <div className="relative ">
        <button onClick={toggleDropdown}>
          <FiUser size={20} />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
            <button className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full ">
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
