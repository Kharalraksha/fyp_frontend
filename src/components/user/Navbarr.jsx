import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
import raksha from "../../assets/raksha.png";
import { useAuth } from "../auth/Authcontext";
import DropdownMenu from "../my_UI/DropdownMenu";

const Navbarr = () => {
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth(); // Use useAuth hook to access context
  const categories = ["Bridal", "Festive", "Casual"];

  // Function to toggle user dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-theme_color p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={raksha} alt="raksha" className="h-16 object-contain" />
          <div className="flex justify-start items-center space-x-32 ml-52">
            <div>
              <Link to="/home" className="text-black text-xl font-bold">
                Home
              </Link>
            </div>
            <div>
              <DropdownMenu />
            </div>
            <div>
              <Link to="/about" className="text-black text-xl font-bold">
                About Us
              </Link>
            </div>
            <div>
              <Link to="/ContactUS" className="text-black text-xl font-bold">
                Contact Us
              </Link>
            </div>
            <div>
              {user ? (
                <div className="relative">
                  <FaUserCircle
                    size="28"
                    className="text-black cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-red-100 rounded-md shadow-xl z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-rose-200 hover:text-white"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-rose-200 hover:text-white w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signinform" className="text-black text-xl font-bold">
                  Login
                </Link>
              )}
            </div>
            {/* <div className="relative inline-block text-black"> */}
            {/* <button
                onClick={() => setExpanded(!expanded)}
                className="text-xl font-bold focus:outline-none flex items-center"
              >
                Category <FaAngleDown className="ml-2" />
              </button> */}

            {/* {expanded && (
                <div className="absolute mt-2 space-y-4 bg-red-100 rounded-lg">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/${category.toLowerCase()}`}
                      className="block px-4 py-1 text-lg font-normal border-b hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
