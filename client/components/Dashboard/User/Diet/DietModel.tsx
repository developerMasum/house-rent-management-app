import Image from "next/image";
import React from "react";

import { dietPlansData } from "@/lib/data";
import { useGetMyselfQuery } from "@/redux/api/userApi";
import Loading from "@/components/Common/Loading";

const DietModel = () => {
  const { data: user, isLoading } = useGetMyselfQuery({});
  if (isLoading) {
    return <Loading />;
  }
  const today = new Date()
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const todayPlan = dietPlansData.find((plan) => plan.day === today);

  return (
    <main className="w-full h-[500px]  shadow-2xl rounded-md px-3 py-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="lg:w-1/2">
          <div className="text-white">
            <p className="text-xl font-bold">
              Hello, <span className="text-orange-500">{user?.name}</span>
            </p>
            <p>Your Today Diet Plan:</p>
          </div>
          <div className="mt-4">
            {todayPlan ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {todayPlan.meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className="card p-3 bg-[#313844] rounded-lg w-full h-64 flex flex-col items-center shadow-lg"
                  >
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      className="rounded-full w-20 h-20 mb-2 object-cover"
                      width={80}
                      height={80}
                    />
                    <h3 className="text-lg font-bold text-center text-white mb-2">
                      {meal.name}
                    </h3>
                    <div className="text-sm text-gray-400">
                      <p>Calories: {meal.calories}</p>
                      <p>Protein: {meal.protein}</p>
                      <p>Fat: {meal.fat}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No diet plan available for today.</p>
            )}
          </div>
        </div>

        {/* Image section: hidden on small screens */}
        <div className="hidden lg:block lg:w-1/2">
          <Image
            src="https://i.ibb.co/cbKRByg/loop-animation-character-animation-gifs-short-explainer-removebg-preview.png"
            alt="Diet Image"
            width={550}
            height={550}
            className="w-full h-full object-cover bg-opacity-50"
          />
        </div>
      </div>
    </main>
  );
};

export default DietModel;
