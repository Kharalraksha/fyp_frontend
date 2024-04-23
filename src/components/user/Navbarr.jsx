import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
import raksha from "../../assets/raksha.png";
import { useAuth } from "../auth/Authcontext";
import DropdownMenu from "../my_UI/DropdownMenu";

const Navbarr = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Add this to use navigate for redirection

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle logout and navigate to signin form
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/SigninForm"); // Adjust the path as needed
  };

  return (
    <nav className="bg-rose-50 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={raksha} alt="Raksha" className="h-16 object-contain" />
          <div className="flex justify-start items-center space-x-32 ml-52">
            {/* Navigation Links */}
            <Link to="/" className="text-black text-xl font-bold">
              Home
            </Link>
            <DropdownMenu />
            <Link to="/Aboutus" className="text-black text-xl font-bold">
              About Us
            </Link>
            <Link to="/ContactUS" className="text-black text-xl font-bold">
              Contact Us
            </Link>
            {/* User Profile/Logout */}
            <div>
              {user ? (
                <div className="relative flex items-center">
                  <span className="mr-3 font-medium text-xl">
                    {user?.email?.split("@")[0] ?? "User"}
                  </span>
                  <FaAngleDown
                    size="28"
                    className="text-black cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                      <Link
                        to="/userprofile"
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/SigninForm" className="text-black text-xl font-bold">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
