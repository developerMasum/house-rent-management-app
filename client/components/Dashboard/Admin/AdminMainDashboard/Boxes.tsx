"use client";

import Loading from "@/components/Common/Loading";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import {
  Users,
  PersonStanding,
  HeartHandshake,
  CircleDollarSign,
  ChartNoAxesCombined,
} from "lucide-react";

const BoxesReport = () => {
  const { data: dashboardCount, isLoading } = useGetDashboardDataQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#68ee93] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#267E83] px-2 py-2 rounded-md">
              <CircleDollarSign
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">
            {dashboardCount?.totalMonthly}
            <span className="text-gray-300 text-xs  ml-2">USD</span>
          </div>
          <div className="text-gray-300">Monthly Revenue</div>
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#68ee93] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#267E83] px-2 py-2 rounded-md">
              <ChartNoAxesCombined
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">
            {dashboardCount?.totalYearly}
            <span className="text-gray-300 text-xs ml-2">USD</span>
          </div>
          <div className="text-gray-300">Yearly Revenue</div>
        </div>
        <div className="bg-[#313844] p-6 rounded  flex flex-col items-center shadow-lg">
          <div className="bg-[#68ee93] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#267E83] px-2 py-2 rounded-md">
              <Users
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">
            {dashboardCount?.userCount}
          </div>
          <div className="text-gray-100">Total Users</div>
        </div>

        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#68ee93] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#267E83] px-2 py-2 rounded-md">
              <PersonStanding
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">2900</div>
          <div className="text-gray-300">Running Members</div>
        </div>
        <div className="bg-[#313844] p-6 rounded shadow-md flex flex-col items-center">
          <div className="bg-[#68ee93] bg-opacity-50 px-2 py-2 rounded-md">
            <button className="bg-[#267E83] px-2 py-2 rounded-md">
              <HeartHandshake
                className="text-4xl text-slate-100"
                size={36}
                strokeWidth={1.75}
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-gray-100">
            {dashboardCount?.trainerCount}{" "}
            <span className="text-gray-300 text-xs ml-2"></span>
          </div>
          <div className="text-gray-300 ">Trainers</div>
        </div>
      </div>
    </div>
  );
};

export default BoxesReport;
