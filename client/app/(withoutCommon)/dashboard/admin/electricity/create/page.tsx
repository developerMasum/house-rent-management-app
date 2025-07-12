"use client";

import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllRoomsQuery } from "@/redux/api/New/roomApi";
import { useCreateElectricityMutation } from "@/redux/api/New/electricity";
import { toast } from "sonner";

const getLast2Months = () => {
  const months = [];
  for (let i = 1; i <= 2; i++) {
    const date = dayjs().subtract(i, "month");
    months.push({
      label: date.format("MMMM"),
      value: date.format("MMMM"),
      year: date.year(),
    });
  }
  return months;
};

const CreateElectricity = () => {
  const { data: roomsData } = useGetAllRoomsQuery({});
  const rooms = roomsData?.data || [];

  const [createElectricityReading] = useCreateElectricityMutation();

  const months = getLast2Months();
  const defaultMonth = months[0];

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth.value);
  const [selectedYear, setSelectedYear] = useState(defaultMonth.year);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [readings, setReadings] = useState<Record<string, number>>({});

  const currentRoom = rooms[currentRoomIndex];

  const handleReadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReadings({
      ...readings,
      [currentRoom?.id]: parseInt(e.target.value) || 0,
    });
  };

  const handleNext = async () => {
    const reading = readings[currentRoom.id];
    if (!reading) {
      toast.warning("Please enter the unit for this room.");
      return;
    }

    const payload = {
      monthName: selectedMonth,
      year: selectedYear,
      reading: reading,
      roomId: currentRoom.id,
    };

    try {
      await createElectricityReading(payload).unwrap();
      toast.success(
        `Electricity reading for room ${currentRoom.roomNo} saved!`
      );
      setCurrentRoomIndex((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to save data!");
    }
  };

  const previousReading =
    currentRoom?.PresentMonthElectricityReadings?.reading || 0;
  const previousMonth =
    currentRoom?.PresentMonthElectricityReadings?.monthName || "";

  const totalUnit = readings[currentRoom?.id]
    ? readings[currentRoom.id] - previousReading
    : null;

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
      {currentRoom ? (
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-black">
              Room No: {currentRoom.roomNo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-medium text-black block mb-1">
                  Select Month
                </label>
                <Select
                  value={selectedMonth}
                  onValueChange={(val) => {
                    const selected = months.find((m) => m.value === val);
                    setSelectedMonth(val);
                    setSelectedYear(selected?.year || dayjs().year());
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label} {m.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-medium text-black block mb-1">
                  This Month Unit
                </label>
                <Input
                  type="number"
                  className="bg-white"
                  placeholder="Enter unit"
                  value={readings[currentRoom.id] || ""}
                  onChange={handleReadingChange}
                />
              </div>
            </div>
            <p className="text-lg font-semibold text-center text-black">
              {totalUnit !== null && totalUnit >= 0
                ? `Total Unit: ${totalUnit}`
                : `${previousMonth} month unit: ${previousReading}`}
            </p>
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {currentRoomIndex === rooms.length - 1
                  ? "Submit Final"
                  : "Next Room"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-2xl text-white">
          ✅ All rooms processed!
        </div>
      )}
    </div>
  );
};

export default CreateElectricity;
