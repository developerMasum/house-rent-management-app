"use client";
import Loading from "@/components/Common/Loading";
import { useGetSingleRoomQuery } from "@/redux/api/New/roomApi";
import { useParams } from "next/navigation"; // Correctly importing useParams
import React from "react";

const RoomDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useGetSingleRoomQuery(id); // Using id directly

  if (isLoading) {
    return <Loading />;
  }

  // Check if data exists before trying to access its properties
  if (!data) {
    return <p>No room details found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Room Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg font-bold">Room No: {data.roomNo}</p>
        <p className="text-gray-600">Floor No: {data.floorNo}</p>
        <p className="text-gray-600">Rent: ${data.roomRent}</p>
        <p className="text-gray-600">Advanced Rent: ${data.advancedRent}</p>
        <p className="text-gray-600">Due Amount: ${data.dueAmount}</p>
        <p className="text-gray-600">
          Available: {data.isAvailable ? "Yes" : "No"}
        </p>
        <p className="text-gray-600">
          Vacant From:{" "}
          {data.vacantFrom
            ? new Date(data.vacantFrom).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-gray-600">
          Vacant To:{" "}
          {data.vacantTo ? new Date(data.vacantTo).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default RoomDetails;
