import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ArtistNavbar from "./ArtistNavbar";
import ArtistSidebar from "./ArtistSidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

const ArtistDashboard = () => {
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [artistId, setArtistId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("artistId");
    if (id) {
      setArtistId(id);
      fetchAppointmentCounts(id);
    } else {
      console.error("Artist ID not found in localStorage");
      setError("Artist ID not found in localStorage. Please log in again.");
    }
  }, []);

  const fetchAppointmentCounts = async (artistId) => {
    setLoading(true);
    setError("");
    try {
      const urls = [
        `http://localhost:3000/api/appointment/weekly/${artistId}`,
        `http://localhost:3000/api/appointment/monthly/${artistId}`,
        `http://localhost:3000/api/appointment/total/${artistId}`,
      ];
      const [weeklyResponse, monthlyResponse, totalResponse] =
        await Promise.all(urls.map((url) => axios.get(url)));

      const weeklyData = weeklyResponse.data
        .map((week) => week.count)
        .reduce((a, b) => a + b, 0);
      const monthlyData = monthlyResponse.data
        .map((month) => month.count)
        .reduce((a, b) => a + b, 0);
      const totalData = totalResponse.data.totalCount;

      setWeeklyCount(weeklyData);
      setMonthlyCount(monthlyData);
      setTotalCount(totalData);
    } catch (error) {
      console.error("Error fetching appointment counts:", error);
      setError("Failed to fetch appointment counts. Please try again later.");
    }
    setLoading(false);
  };

  const data = {
    labels: [
      "Weekly Appointments",
      "Monthly Appointments",
      "Total Appointments",
    ],
    datasets: [
      {
        label: "# of Appointments",
        data: [weeklyCount, monthlyCount, totalCount],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <ArtistNavbar />
      <div className="flex">
        <ArtistSidebar />
        <div className="ml-4 flex-1">
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col items-center mt-10">
              <div className="flex justify-around w-full">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg">Weekly Appointments</h3>
                  <p className="text-3xl font-bold">{weeklyCount}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg">Monthly Appointments</h3>
                  <p className="text-3xl font-bold">{monthlyCount}</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg">Total Appointments</h3>
                  <p className="text-3xl font-bold">{totalCount}</p>
                </div>
              </div>
              <div className="w-full max-w-md mt-8">
                <Pie data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
