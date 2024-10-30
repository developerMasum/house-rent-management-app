"use client";
import Loading from "@/components/Common/Loading";
import { useGetAllRoomsQuery } from "@/redux/api/New/roomApi";
import { TRoom } from "@/types/Room";
import Link from "next/link";

const RoomCompo = () => {
  const { data, isLoading } = useGetAllRoomsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {data?.data?.map((room: TRoom) => (
        <Link
          href={`/dashboard/admin/rooms/${room.id}`}
          key={room.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Room No: {room.roomNo}
          </h2>
          <p className="text-gray-600">Rent: ${room.roomRent}</p>{" "}
          <p className="text-gray-600">Floor: {room.floorNo}</p>{" "}
          <p className="text-gray-600">Due Amount: ${room.dueAmount}</p>{" "}
          <p className="text-gray-600">
            Available: {room.isAvailable ? "Yes" : "No"}
          </p>{" "}
        </Link>
      ))}
    </div>
  );
};

export default RoomCompo;
