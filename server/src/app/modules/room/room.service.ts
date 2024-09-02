import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const createRoom = async (req: Request) => {
  // Log the incoming request body
  console.log(req.body);
  const isRoomRepeated = await prisma.room.findFirst({
    where: { roomNo: req.body.roomNo, floorNo: req.body.floorNo },
  });
  if (isRoomRepeated) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Room already exists");
  }
  const newRoom = await prisma.room.create({
    data: {
      roomNo: req.body.roomNo,
      floorNo: req.body.floorNo,
      roomRent: req.body.roomRent,
      advancedRent: req.body.advancedRent,
      dueAmount: req.body.dueAmount,
      isAvailable: req.body.isAvailable,
      vacantFrom: req.body.vacantFrom,
      vacantTo: req.body.vacantTo,
      houseId: req.body.houseId,
    },
  });
  return newRoom;
};

const addElectricityReading = async (req: Request) => {
  const { monthName, year, reading, roomId } = req.body;

  // Check if there is already a reading for the same month and year
  const isReadingRepeated = await prisma.electricityBillReading.findFirst({
    where: {
      monthName: monthName,
      year: year,
      roomId: roomId,
    },
  });

  if (isReadingRepeated) {
    throw new Error("Reading for this month and year already exists.");
  }

  const previousReading = await prisma.electricityBillReading.findFirst({
    where: {
      roomId: roomId,
      AND: [
        {
          year: {
            lt: year,
          },
        },
        {
          monthName: {
            lt: monthName,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (previousReading && reading < previousReading.reading) {
    throw new Error(
      "New reading cannot be less than the previous month's reading."
    );
  }

  const result = await prisma.electricityBillReading.create({
    data: {
      monthName: monthName,
      year: year,
      reading: reading,
      roomId: roomId,
    },
  });

  return result;
};

export const RoomService = {
  createRoom,
  addElectricityReading,
};
