import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Popup from "reactjs-popup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const User = () => {
  const [users, setUsers] = useState([0]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/all");
      console.log("API Response:", response.data);
      setUsers(response.data.results); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.user_Id !== userId));
      closeModal();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting the user: ", error);
      closeModal(); // Close the modal on error as well
      toast.error("Failed to delete the user");
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/EditUserForm/${userId}`);
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
      <div className="flex-1 p-4">
        <Navbar />
      </div>
      <div className=""></div>
      <div className="overflow-x-auto ml-60 mr-0">
        <div className="overflow-x-auto mt-12">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">S.N</th>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Email</th>
                <th className="py-2 px-4 border-r">Phone</th>
                <th className="py-2 px-4 border-r">Address</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-2 px-4 border-r">{user.user_Id}</td>
                    <td className="py-2 px-4 border-r">{user.user_Name}</td>
                    <td className="py-2 px-4 border-r">{user.email}</td>
                    <td className="py-2 px-4 border-r">{user.phone_Number}</td>
                    <td className="py-2 px-4 border-r">{user.address}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                        onClick={() => handleEditUser(user.user_Id)}
                      >
                        <Link to={`/EditUserForm/${user.user_Id}`}>Edit</Link>
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
                              Are you sure you want to delete this user?
                            </p>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 mr-20"
                              onClick={() => handleDeleteUser(user.user_Id)}
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
      </div>
    </>
  );
};

export default User;
