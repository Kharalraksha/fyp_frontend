import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import Sales from "../../components/admin/Sales";
import axios from "axios";

const Dashboard = ({ baseUrl }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Authentication check & fetching data
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col" style={{ marginLeft: "200px" }}>
          {" "}
          {/* Adjust marginLeft based on your Sidebar width */}
          <Navbar baseUrl={baseUrl} />
          <div className="p-4 flex-1" style={{ marginTop: "64px" }}>
            {" "}
            {/* Adjust marginTop based on your Navbar height */}
            {/* Page Content */}
            <Sales />
            {apiData && <Sales count={apiData.count} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
