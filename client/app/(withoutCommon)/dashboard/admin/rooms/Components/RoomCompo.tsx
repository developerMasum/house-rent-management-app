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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🏠 All Rooms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data?.map((room: TRoom) => (
          <Link
            href={`/dashboard/admin/rooms/${room.id}`}
            key={room.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700">
                Room #{room.roomNo}
              </h2>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  room.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.isAvailable ? "Available" : "Occupied"}
              </span>
            </div>
            <div className="text-gray-700 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Rent:</span> ${room.roomRent}
              </p>
              <p>
                <span className="font-semibold">Floor:</span> {room.floorNo}
              </p>
              <p>
                <span className="font-semibold">Due Amount:</span> $
                {room.dueAmount || 0}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomCompo;
