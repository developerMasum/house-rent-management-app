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

  const latestReading = await prisma.electricityBillReading.findFirst({
    orderBy: { createdAt: "desc" },
    select: { monthName: true, year: true },
  });

  if (!latestReading) {
    throw new Error("No electricity reading data available.");
  }

  const monthDate = new Date(
    `${latestReading.monthName} 1, ${latestReading.year}`
  );
  monthDate.setMonth(monthDate.getMonth() - 1);
  const pastMonthName = monthDate.toLocaleString("default", { month: "long" });
  const pastYear = monthDate.getFullYear();

  const presentMonthName = latestReading.monthName;
  const presentYear = latestReading.year;

  const roomSearchCondition = parsedSearchTerm
    ? {
        room: {
          OR: [{ roomNo: parsedSearchTerm }, { floorNo: parsedSearchTerm }],
        },
      }
    : {};

  // Step 4: Fetch present month readings
  const presentReadings = await prisma.electricityBillReading.findMany({
    where: {
      monthName: presentMonthName,
      year: presentYear,
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
      roomId: true,
      reading: true,
      room: {
        select: {
          roomNo: true,
          floorNo: true,
        },
      },
    },
  });

  // Step 5: Fetch past month readings
  const pastReadings = await prisma.electricityBillReading.findMany({
    where: {
      monthName: pastMonthName,
      year: pastYear,
    },
    select: {
      roomId: true,
      reading: true,
    },
  });

  const pastMap = new Map<string, number>();
  pastReadings.forEach((entry) => {
    pastMap.set(entry.roomId, entry.reading);
  });

  const result = presentReadings.map((current) => {
    const pastReading = pastMap.get(current.roomId) ?? 0;
    const totalUnit = Math.max(0, current.reading - pastReading);

    return {
      id: current.id,
      floorNo: current.room.floorNo,
      roomNo: current.room.roomNo,
      [`${pastMonthName}Reading`]: pastReading,
      [`${presentMonthName}Reading`]: current.reading,
      totalUnit,
    };
  });

  const total = await prisma.electricityBillReading.count({
    where: {
      monthName: presentMonthName,
      year: presentYear,
      ...roomSearchCondition,
    },
  });

  return {
    meta: { page, limit, total },
    result,
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
