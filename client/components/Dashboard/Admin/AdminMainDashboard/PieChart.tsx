"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetYearlyIncomeQuery } from "@/redux/api/dashboardApi";
import Loading from "@/components/Common/Loading";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data: yearlyIncome, isLoading } = useGetYearlyIncomeQuery({});

  if (isLoading) {
    return <Loading />;
  }

  // Extract the year labels and income data for the Pie chart
  const labels = yearlyIncome.map((item: any) => item.year); // Extract years
  const dataValues = yearlyIncome.map((item: any) => item.totalIncome); // Extract totalIncome values

  const data = {
    labels: labels, // Use extracted years as labels
    datasets: [
      {
        label: "Yearly Revenue",
        data: dataValues, // Use extracted totalIncome as data
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
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
  };

  return (
    <div className="p-4 md:p-8 w-full md:w-[450px] mx-auto shadow-sm">
      <h2 className="text-xl font-bold text-white text-center mb-4">
        Yearly Revenue Pie Chart
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
