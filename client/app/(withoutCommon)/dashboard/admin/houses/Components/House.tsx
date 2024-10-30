"use client";
import Loading from "@/components/Common/Loading";
import { useGetAllHousesQuery } from "@/redux/api/New/houseapi";
import { THouse } from "@/types/House";
import Link from "next/link";

const House = () => {
  const { data, isLoading } = useGetAllHousesQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4">
      {data?.map((house: THouse) => (
        <Link
          href={`/dashboard/admin/houses/${house.id}`}
          key={house.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {house.name}
          </h2>
          <p className="text-gray-600">Rooms: {house.numberOfRooms}</p>
          <p className="text-gray-600">Floors: {house.floorCount}</p>
          <p className="text-gray-600">Meter: {house.numberOfMeters} </p>
        </Link>
      ))}
    </div>
  );
};

export default House;
