import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    user_Name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
        setUserData(response.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/editUser/${id}`,
        userData
      );
      console.log("Update Response:", response.data);
      setIsModalOpen(false);
      navigate("/user");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <form onSubmit={handleSubmit} className="bg-red-300 p-8 rounded-md">
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name:
            </label>
            <input
              type="text"
              id="name"
              value={userData.user_Name} // make sure to use the correct property name
              onChange={(e) =>
                setUserData({ ...userData, user_Name: e.target.value })
              } // make sure to use the correct property name
              className="mt-1 p-2 w-full border border-pink-300 rounded-md"
              required
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
              id="phone_number"
              value={userData.phone_number} // make sure to use the correct property name
              onChange={(e) =>
                setUserData({ ...userData, phone_number: e.target.value })
              } // make sure to use the correct property name
              className="mt-1 p-2 w-full border border-pink-300 rounded-md"
              required
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
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              className="mt-1 p-2 w-full border border-pink-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
