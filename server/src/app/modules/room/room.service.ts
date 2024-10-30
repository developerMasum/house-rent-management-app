import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import {
  electricitySearchAbleFields,
  roomSearchAbleFields,
} from "../../constans/QueryConstans";

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
const getAllElectricity = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.RoomWhereInput[] = [];

  // Handle search term filtering
  if (searchTerm) {
    andConditions.push({
      OR: electricitySearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm.toString(),
          mode: "insensitive",
        },
      })),
    });
  }

  // Handle other filters like room availability, rent, etc.
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // Combine conditions, if there are any
  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch filtered and paginated room data
  const electricity = await prisma.electricityBillReading.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc", // Default sorting by creation date
          },
    select: {
      id: true,
      monthName: true,
      year: true,
      reading: true,
      roomId: true,
      room: {
        select: {
          roomNo: true,
          floorNo: true,
        },
      },
    },
  });

  // Count total number of records that match the conditions
  const total = await prisma.room.count({
    where: whereConditions,
  });

  // Return paginated meta data and fetched rooms
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: electricity,
  };
};
const getAllRooms = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.RoomWhereInput[] = [];

  // Handle search term filtering
  if (searchTerm) {
    andConditions.push({
      OR: roomSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm.toString(),
          mode: "insensitive",
        },
      })),
    });
  }

  // Handle other filters like room availability, rent, etc.
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // Combine conditions, if there are any
  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch filtered and paginated room data
  const rooms = await prisma.room.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc", // Default sorting by creation date
          },
    select: {
      id: true,
      roomNo: true,
      floorNo: true,
      roomRent: true,
      advancedRent: true,
      dueAmount: true,
      isAvailable: true,
      vacantFrom: true,
      vacantTo: true,
      house: {
        select: {
          name: true, // Assuming the `House` model has a `name` field
        },
      },
      payments: true, // If you want to include payment details
      maintenanceRequests: true, // If you want to include maintenance requests
    },
  });

  // Count total number of records that match the conditions
  const total = await prisma.room.count({
    where: whereConditions,
  });

  // Return paginated meta data and fetched rooms
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: rooms,
  };
};
const updateRoom = async (req: Request) => {
  const { id } = req.params;
  const { roomNo, floorNo, roomRent, advancedRent, dueAmount, isAvailable } =
    req.body;
  const updatedRoom = await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      roomNo: roomNo,
      floorNo: floorNo,
      roomRent: roomRent,
      advancedRent: advancedRent,
      dueAmount: dueAmount,
      isAvailable: isAvailable,
    },
  });
  return updatedRoom;
};

const deleteRoom = async (req: Request) => {
  const { id } = req.params;
  const deletedRoom = await prisma.room.delete({
    where: {
      id: id,
    },
  });
  return deletedRoom;
};

const getSingleElectricityRiding = async (req: Request) => {
  const { id } = req.params;
  console.log(id);
  const electricity = await prisma.electricityBillReading.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      room: {
        select: {
          roomNo: true,
          floorNo: true,
        },
      },
    },
  });
  return electricity;
};

export const RoomService = {
  createRoom,
  addElectricityReading,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getAllElectricity,
  getSingleElectricityRiding,
};
