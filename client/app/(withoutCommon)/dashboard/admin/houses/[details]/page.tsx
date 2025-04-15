import React from "react";

const HouseDetails = () => {
  return (
    <div className=" max-w-7xl  mt-10 p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🏠 House Details
      </h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">House Name:</span> Elegant Villa
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Number of Rooms:</span> 6
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Number of Meters:</span> 2
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Floor Count:</span> 3
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Free Rooms:</span> 2
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Total Rent:</span> $3000
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Collected Rent (Total):</span> $2000
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Remaining Rent:</span> $1000
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Collected Rent/Month:</span> $1000
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
          <p>
            <span className="font-semibold">Running Month Rent:</span> $1000
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
