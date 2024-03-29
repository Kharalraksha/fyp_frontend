import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Sales = ({ totalUsers, totalAppointments, weeklyAppointments }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the existing chart instance
    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Users", "Total Appointments", "Report"],
        datasets: [
          {
            label: "Customer Overview",
            data: [totalUsers, totalAppointments, totalUsers],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            label: "Weekly Appointments",
            data: weeklyAppointments,
            type: "line",
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Customer Satisfaction",
            data: [80, 90, 75],
            backgroundColor: [
              "rgba(255, 206, 86, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [totalUsers, totalAppointments, weeklyAppointments]);

  const handleTotalUsersClick = () => {
    console.log("Total Users clicked");
  };

  const handleTotalAppointmentsClick = () => {
    console.log("Total Appointments clicked");
  };

  const handleReportClick = () => {
    console.log("Report clicked");
  };

  return (
    <div>
      <div className="flex gap-20 mt-10">
        {/* Total Users Container */}
        <div className="flex-1" onClick={handleTotalUsersClick}>
          <div className="pl-2 border rounded p-8 bg-red-100 cursor-pointer">
            <span className="text-lg text-black-bold">
              Total Users: 4 {totalUsers}
            </span>
            <div className="flex items-center">
              <strong className="text-lg text-gray-700 font-semibold"></strong>
            </div>
          </div>
        </div>

        {/* Total Appointments Container */}
        <div className="flex-1" onClick={handleTotalAppointmentsClick}>
          <div className="pl-2 border rounded p-8 bg-red-100 cursor-pointer">
            <span className="text-lg text-black-bold">
              Total Appointments: 3 {totalAppointments}
            </span>
            <div className="flex items-center">
              <strong className="text-lg text-gray-700 font-semibold"></strong>
            </div>
          </div>
        </div>

        {/* Report Container */}
        <div className="flex-1" onClick={handleReportClick}>
          <div className="pl-2 border rounded p-8 bg-red-100 cursor-pointer">
            <span className="text-lg text-black-bold">
              Report: {totalUsers}
            </span>
            <div className="flex items-center">
              <strong className="text-lg text-gray-700 font-semibold"></strong>
            </div>
          </div>
        </div>
      </div>

      {/* Smaller Bar Chart Container */}
      <div className="flex-1 mt-10">
        <canvas ref={chartRef} width="100" height="50">
          {" "}
        </canvas>
      </div>
    </div>
  );
};

export default Sales;
