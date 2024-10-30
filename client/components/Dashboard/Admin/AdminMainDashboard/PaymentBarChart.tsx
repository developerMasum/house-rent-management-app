"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMonthWisePaymentUpdateQuery } from "@/redux/api/dashboardApi";
import Loading from "@/components/Common/Loading";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentBarChart: React.FC = () => {
  const { data: paymentData, isLoading } = useGetMonthWisePaymentUpdateQuery(
    {}
  );
  // console.log(paymentData);
  if (isLoading) {
    return <Loading />;
  }
  const labels = paymentData.map((item: any) => item.name); // Month names for x-axis
  const dataValues = paymentData.map((item: any) => item.total);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Payments",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          display: true,
          color: "white",
        },
      },
      y: {
        grid: {
          display: false, // Hide horizontal grid lines
        },
        ticks: {
          display: false, // Hide y-axis (payment numbers) labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend (Payments label)
      },
      title: {
        display: true,
        text: "Payment Data Over Time",
        color: "white",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <main className=" container mx-auto p-4 shadow-2xl px-3 py-2">
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Bar data={data} options={options} />
      </div>
    </main>
  );
};

export default PaymentBarChart;
