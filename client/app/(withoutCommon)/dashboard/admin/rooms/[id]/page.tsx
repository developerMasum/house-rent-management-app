"use client";
import Loading from "@/components/Common/Loading";
import { useGetSingleRoomQuery } from "@/redux/api/New/roomApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const RoomDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleRoomQuery(id);
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <p className="text-center text-gray-600">No room details found.</p>;
  }

  const getFormattedDate = (date: string | undefined) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🏠 Room #{data.roomNo} Details
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto space-y-6">
        <Link
          href={`/dashboard/admin/rooms/tenantInfo/${data.id}`}
          className="text-center px-4 py-3 bg-[#267E83] text-white rounded-md max-w-6xl"
        >
          Tenant Information
        </Link>
        {/* First row - Flex layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard label="Room No" value={data.roomNo} />
          <DetailCard label="Floor No" value={data.floorNo} />
          <DetailCard label="Rent" value={`$${data.roomRent}`} />
          <DetailCard
            label="Advanced Rent"
            value={data.advancedRent ? `$${data.advancedRent}` : "N/A"}
          />
        </div>

        {/* Second row - Flex layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            label="Due Amount"
            value={data.dueAmount ? `$${data.dueAmount}` : "N/A"}
          />
          <DetailCard
            label="Availability"
            value={data.isAvailable ? "Available ✅" : "Occupied ❌"}
          />
          <DetailCard
            label="Attached Bathroom"
            value={data.attachedBathRoom ? "Yes 🚿" : "No ❌"}
          />
          <DetailCard
            label="Trash Bill"
            value={data.trashBill ? `$${data.trashBill}` : "N/A"}
          />
        </div>

        {/* Third row - Vacant & Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            label="Vacant From"
            value={getFormattedDate(data.vacantFrom)}
          />
          <DetailCard
            label="Vacant To"
            value={getFormattedDate(data.vacantTo)}
          />
          {/* <DetailCard label="Remarks" value={data.remark || "N/A"} /> */}
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard
            label="Created At"
            value={new Date(data.createdAt).toLocaleString()}
          />
          <DetailCard
            label="Updated At"
            value={new Date(data.updatedAt).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default RoomDetails;
