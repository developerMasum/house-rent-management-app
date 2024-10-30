"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Calendar,
  //   Steps,
  Flame,
  Droplet,
  Moon,
  Bike,
  Star,
  Footprints,
  Dumbbell,
} from "lucide-react";
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

// const randomImage = (width: number, height: number) =>
//   `https://picsum.photos/${width}/${height}`;

const Report = () => {
  const activityData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Activity",
        data: [8, 6, 7, 6, 8, 7, 9],
        borderColor: "#1adbb2",
        fill: false,
      },
    ],
  };

  const fitnessActivityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Running",
        data: [4, 5, 3, 6, 7, 8, 9, 6, 7, 9, 8, 7],
        borderColor: "#8368EA",
        fill: false,
      },
      {
        label: "Workout",
        data: [3, 4, 3, 5, 6, 6, 8, 5, 6, 8, 7, 6],
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  const weightStatsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Weight",
        data: [140, 141, 139, 138, 140, 142, 141, 140, 138, 137, 139, 140],
        borderColor: "#FFCE56",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-8">
      {/* Top Bar */}
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome Back, Olga Becker</h1>
        <img
          src={randomImage(200, 100)}
          alt="Random Header Image"
          className="rounded"
        />
      </div> */}

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-[#313844] p-6 rounded  flex flex-col items-center shadow-lg">
          <div className="bg-[#F49510] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#F0503C] px-2 py-2 rounded-md">
              <Footprints
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">9300</div>
          <div className="text-gray-100">Steps</div>
        </div>

        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#F49510] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#F0503C] px-2 py-2 rounded-md">
              <Flame
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">2900</div>
          <div className="text-gray-300">Calories</div>
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#F49510] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#F0503C] px-2 py-2 rounded-md">
              <Droplet
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">86</div>
          <div className="text-gray-300 ">Progress</div>
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#F49510] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#F0503C] px-2 py-2 rounded-md">
              <Moon
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">8.3 hrs</div>
          <div className="text-gray-300">Sleep</div>
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#F49510] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#F0503C] px-2 py-2 rounded-md">
              <Dumbbell
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl text-gray-100 font-bold">2.3 hrs</div>
          <div className="text-gray-300">Gym</div>
        </div>
      </div>

      {/* Middle Row (Activity Cards and Charts) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#313844] p-6 rounded shadow-md">
          <div className="flex items-center mb-4">
            <Bike className="text-4xl text-slate-100" />
            <div className="ml-4">
              <div className="text-3xl text-gray-200  font-bold">3.5 km</div>
              <div className="text-gray-400 font-semibold">Cycling</div>
            </div>
          </div>
          <Line data={activityData} options={{ responsive: true }} />
        </div>

        <div className="bg-[#313844] p-6 rounded shadow-md">
          <div className="flex items-center mb-4">
            <Calendar className="text-4xl text-slate-100" />
            <div className="ml-4">
              <div className="text-3xl text-gray-200 font-bold">2 hrs</div>
              <div className="text-gray-400 font-semibold">Gym</div>
            </div>
          </div>
          <Line data={activityData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Bottom Row (Charts) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#313844] p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-slate-200 ">
            Fitness Activity
          </h3>
          <Line data={fitnessActivityData} options={{ responsive: true }} />
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-slate-200 ">
            Weight Statistics
          </h3>
          <Line data={weightStatsData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Report;
