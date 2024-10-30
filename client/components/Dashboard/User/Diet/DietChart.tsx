"use client";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement for the Pie chart
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
); // Register ArcElement

const DietChart = () => {
  const data = {
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
        label: "Calories",
        data: [200, 400, 300, 600, 500, 450, 300, 550, 400, 600, 500, 650],
        backgroundColor: "#c5ece1",
      },
    ],
  };

  // Find the top 3 months with the highest calorie intake
  const calorieData = data.datasets[0].data;
  const topThreeCalories = calorieData
    .map((calories, index) => ({ month: data.labels[index], calories }))
    .sort((a, b) => b.calories - a.calories)
    .slice(0, 3);

  const pieData = {
    labels: topThreeCalories.map((item) => item.month),
    datasets: [
      {
        label: "Top 3 Calories",
        data: topThreeCalories.map((item) => item.calories),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  return (
    <div className="flex justify-around items-center  gap-6 w-full mt-12">
      <div className="w-1/2 bg-slate-700 shadow-lg px-3 py-2 rounded-md">
        <Bar data={data} />
      </div>
      <div className="w-1/5 mt-12 bg-slate-700 shadow-lg px-2 py-2 rounded-md">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default DietChart;
