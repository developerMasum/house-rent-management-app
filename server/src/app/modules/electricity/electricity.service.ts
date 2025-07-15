import { Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { electricitySearchAbleFields } from "../../constans/QueryConstans";
import { getPreviousMonthYear } from "../../../shared/utils";

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
      perUnitPrice: 10,
    },
  });

  return result;
};
const getAllElectricity = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = params;

  let parsedSearchTerm: number | undefined;
  if (searchTerm) {
    const temp = Number(searchTerm);
    parsedSearchTerm = Number.isNaN(temp) ? undefined : temp;
  }

  const roomSearchCondition = parsedSearchTerm
    ? {
        room: {
          OR: [{ roomNo: parsedSearchTerm }, { floorNo: parsedSearchTerm }],
        },
      }
    : {};

  // ✅ Fetch ALL electricity readings with room info
  const readings = await prisma.electricityBillReading.findMany({
    where: {
      ...roomSearchCondition,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    select: {
      id: true,
      reading: true,
      monthName: true,
      year: true,
      perUnitPrice: true,
      room: {
        select: {
          roomNo: true,
          floorNo: true,
        },
      },
    },
  });

  // ✅ Group readings by roomNo
  const groupedResult: Record<string, any[]> = {};

  readings.forEach((entry) => {
    const roomKey = String(entry.room.roomNo);

    const data = {
      id: entry.id,
      floorNo: entry.room.floorNo,
      roomNo: entry.room.roomNo,
      monthName: entry.monthName,
      year: entry.year,
      reading: entry.reading,
      perUnitPrice: entry.perUnitPrice,
    };

    if (!groupedResult[roomKey]) {
      groupedResult[roomKey] = [];
    }

    groupedResult[roomKey].push(data);
  });

  const total = await prisma.electricityBillReading.count({
    where: {
      ...roomSearchCondition,
    },
  });

  return {
    meta: { page, limit, total },
    result: groupedResult,
  };
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
const updateReading = async (req: Request) => {};
export const ElectricityService = {
  addElectricityReading,
  getAllElectricity,
  getSingleElectricityRiding,
  updateReading,
};
