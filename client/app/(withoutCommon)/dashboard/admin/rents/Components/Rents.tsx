"use client";

import Loading from "@/components/Common/Loading";
import { useGetAllRentsQuery } from "@/redux/api/New/rentApi";

const Rents = () => {
  const { data, isLoading } = useGetAllRentsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data?.map((rent: any) => (
        <div
          key={rent.roomId}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Room No: {rent.roomNo}</h2>
          <p className="text-gray-600">Floor No: {rent.floorNo}</p>
          <p className="text-gray-600">Room Rent: ${rent.roomRent}</p>
          <p className="text-gray-600">Due Amount: ${rent.dueAmount}</p>
          <p className="text-gray-600">
            Electricity Unit: {rent.electricityUnit} units
          </p>
          <p className="text-gray-600">
            Electricity Bill: ${rent.electricityBill}
          </p>
          <p className="text-gray-600">Total Rent: ${rent.totalRent}</p>
          <p className="text-gray-600">
            Available: {rent.isAvailable ? "Yes" : "No"}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Last Month's Electricity Readings
            </h3>
            <p>Reading: {rent.LastMonthElectricityReadings.reading}</p>
            <p>
              Month: {rent.LastMonthElectricityReadings.monthName}{" "}
              {rent.LastMonthElectricityReadings.year}
            </p>
            <p>
              Per Unit Price: ${rent.LastMonthElectricityReadings.perUnitPrice}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Present Months Electricity Readings
            </h3>
            <p>Reading: {rent.PresentMonthElectricityReadings.reading}</p>
            <p>
              Month: {rent.PresentMonthElectricityReadings.monthName}{" "}
              {rent.PresentMonthElectricityReadings.year}
            </p>
            <p>
              Per Unit Price: $
              {rent.PresentMonthElectricityReadings.perUnitPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rents;
