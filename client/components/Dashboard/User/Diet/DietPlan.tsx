import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { dietPlansData } from "@/lib/data";
import Image from "next/image";
import React from "react";

const DietPlan = () => {
  return (
    <Tabs defaultValue="sunday">
      <div className="border-b border-gray-800 ">
        <p className="  text-white font-bold text-center uppercase mt-8">
          My weekly Diet plan
        </p>
        <TabsList className="mb-4 mt-2  flex justify-center items-center bg-transparent">
          {dietPlansData.map((plan) => (
            <TabsTrigger key={plan.day} value={plan.day}>
              {plan.day.charAt(0).toUpperCase() + plan.day.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {dietPlansData.map((plan) => (
        <TabsContent key={plan.day} value={plan.day}>
          <div className="flex justify-center gap-6 mt-8 text-white">
            {plan.meals.map((meal, idx) => (
              <div
                key={idx}
                className="card p-4 bg-[#313844] rounded-lg w-64 h-80 flex flex-col items-center"
              >
                <Image
                  src={meal.image}
                  alt={meal.name}
                  width={96}
                  height={96}
                  className="rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-bold mb-2 text-center">
                  {meal.name}
                </h3>
                <div className="flex justify-between w-full">
                  <span>Calories: </span>
                  <span>{meal.calories}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>Protein: </span>
                  <span>{meal.protein}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>Fat: </span>
                  <span>{meal.fat}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DietPlan;
