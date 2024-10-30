"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Flame, Droplet, Moon, Bike, Heart } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatusBoxes = () => {
  const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Activity",
        data: [76, 68, 75, 74, 79, 77, 80],
        borderColor: "#8368EA",
        fill: false,
      },
    ],
  };

  const cardData = [
    // { icon: <Steps />, value: "3300", label: "Steps" },
    { icon: <Flame />, value: "690", label: "Calories" },
    { icon: <Droplet />, value: "3L", label: "Water" },
    { icon: <Moon />, value: "8hrs", label: "Sleep" },
    // { icon: <Run />, value: "1hr", label: "Running" },
    { icon: <Bike />, value: "2hrs", label: "Gym" },
  ];

  const chartCards = [
    { icon: <Heart />, value: "76", label: "Heartbeat" },
    // { icon: <Steps />, value: "2600", label: "Steps" },
    { icon: <Moon />, value: "8", label: "Sleep" },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="grid grid-cols-3 gap-4 w-full mb-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="text-4xl mb-4 text-purple-600">{card.icon}</div>
            <div className="text-3xl font-bold">{card.value}</div>
            <div className="text-gray-600">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {chartCards.map((chart, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl text-purple-600">{chart.icon}</div>
              <div className="ml-4">
                <div className="text-3xl font-bold">{chart.value}</div>
                <div className="text-gray-600">{chart.label}</div>
              </div>
            </div>
            {/* <Line data={dailyData} options={{ responsive: true }} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBoxes;
