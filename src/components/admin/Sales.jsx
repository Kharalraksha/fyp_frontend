import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaArtstation,
  FaCalendarCheck,
  FaDollarSign,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Registering components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Sales = () => {
  const [totals, setTotals] = useState({
    users: 0,
    artists: 0,
    appointments: 0,
    payments: 0,
  });

  // Data for charts
  const chartData = {
    labels: ["Users", "Artists", "Appointments", "Payments"],
    datasets: [
      {
        label: "Total Count",
        data: [
          totals.users,
          totals.artists,
          totals.appointments,
          totals.payments,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(234, 179, 8, 0.5)",
          "rgba(239, 68, 68, 0.5)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:3000/api/user/all");
        const artistsRes = await axios.get(
          "http://localhost:3000/api/artist/get"
        );
        const appointmentsRes = await axios.get(
          "http://localhost:3000/api/appointment/get"
        );
        const paymentsRes = await axios.get(
          "http://localhost:3000/api/payment/get"
        );

        setTotals({
          users: usersRes.data.results.length, // Adjust according to your API response
          artists: artistsRes.data.length,
          appointments: appointmentsRes.data.length,
          payments: paymentsRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Options for charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
        {/* Users */}
        <div className="bg-blue-500 rounded-lg p-6 flex items-center justify-between text-white shadow-lg hover:bg-blue-600 transition duration-300">
          <div>
            <h2 className="text-2xl font-bold">{totals.users}</h2>
            <p className="text-lg">Total Users</p>
          </div>
          <FaUser size={60} />
        </div>

        {/* Artists */}
        <div className="bg-green-500 rounded-lg p-6 flex items-center justify-between text-white shadow-lg hover:bg-green-600 transition duration-300">
          <div>
            <h2 className="text-2xl font-bold">{totals.artists}</h2>
            <p className="text-lg">Total Artists</p>
          </div>
          <FaUser size={60} />
        </div>

        {/* Appointments */}
        <div className="bg-yellow-500 rounded-lg p-6 flex items-center justify-between text-white shadow-lg hover:bg-yellow-600 transition duration-300">
          <div>
            <h2 className="text-2xl font-bold">{totals.appointments}</h2>
            <p className="text-lg">Total Appointments</p>
          </div>
          <FaCalendarCheck size={60} />
        </div>

        {/* Payments */}
        <div className="bg-red-500 rounded-lg p-6 flex items-center justify-between text-white shadow-lg hover:bg-red-600 transition duration-300">
          <div>
            <h2 className="text-2xl font-bold">{totals.payments}</h2>
            <p className="text-lg">Total Payments</p>
          </div>
          <FaDollarSign size={60} />
        </div>
      </div>

      {/* Range Slider */}
      <input
        type="range"
        className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-8"
        min="0"
        max="50"
        // Add onChange handler as needed for slider functionality
      />

      <div className="flex flex-wrap justify-center">
        <div
          className="bg-gray-100 p-16 rounded-lg shadow-md mt-8 mx-4 mr-44"
          style={{ width: "500px", height: "400px" }}
        >
          <h2 className="text-xl font-semibold mb-4">Bar Chart Overview</h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div
          className="bg-gray-100 p-16 rounded-lg shadow-md mt-8 mx-4"
          style={{ width: "500px", height: "400px" }}
        >
          <h2 className="text-xl font-semibold mb-4">Pie Chart Overview</h2>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
