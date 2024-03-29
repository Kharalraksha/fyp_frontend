import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import SearchBar from "../../components/admin/SearchBar";
import Sales from "../../components/admin/Sales";
import axios from "axios";

const Dashboard = ({ baseUrl }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(``, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Data:", response.data);
      setApiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://adminapi.rebuzzpos.com/api/v1/admin/getUsers`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log("User Data:", response.data);
  //     setUser(response.data.message);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  //   fetchData();
  //   fetchUser();
  // }, [baseUrl, navigate]);

  const [isFormOpen, setFormOpen] = useState(false);

  const handleCreateNew = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSubmitForm = (formData) => {
    console.log("Form data submitted:", formData);
  };

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="">
        <Sidebar />
        <div className="flex-1 p-4">
          <Navbar baseUrl={baseUrl} onLogout={handleLogout} />
          <div className="">
            <SearchBar />
            {/* <button
              onClick={handleCreateNew}
              className="bg-defaultGreen hover:bg-red-200 text-black hover:text-black p-2 rounded-full border border-black focus:outline-none"
            >
              Create New
            </button> */}
          </div>
          <Sales />
          {apiData && <Sales count={apiData.count} />}
          {/* <User user={user} /> */}
        </div>
      </div>
      {isFormOpen && (
        <CreateNewForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />
      )}
    </>
  );
};

export default Dashboard;
