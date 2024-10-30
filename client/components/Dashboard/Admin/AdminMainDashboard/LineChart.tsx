"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMonthWiseUserUpdateQuery } from "@/redux/api/dashboardApi";
import Loading from "@/components/Common/Loading";

// Register the components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { data: userData, isLoading } = useGetMonthWiseUserUpdateQuery({});

  if (isLoading) {
    return <Loading />;
  }
  // Mapping the userData to chart data
  const labels = userData.map((monthData: any) => monthData.name); // Extract month names for labels
  const totals = userData.map((monthData: any) => monthData.total); // Extract totals for data

  const data = {
    labels, // Use the month names as labels
    datasets: [
      {
        label: "Monthly User Updates",
        data: totals,
        borderColor: "green",
        backgroundColor: "transparent",
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "white", // Make legend text white
        },
      },
      tooltip: {
        enabled: true,
        titleColor: "white", // Tooltip title in white
        bodyColor: "white", // Tooltip body text in white
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis labels in white
        },
        grid: {
          display: false, // Optionally remove grid lines
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis labels in white
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)", // Lighter grid line color for better readability
        },
        beginAtZero: true,
        max: Math.max(...totals) + 5, // Adjust Y-axis max dynamically
      },
    },
  };

  return (
    <div className="shadow-sm p-2">
      <h2 className="text-white text-xl font-bold mb-4 ">
        Monthly User Updates
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
