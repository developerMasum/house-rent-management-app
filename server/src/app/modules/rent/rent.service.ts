import { Request } from "express";
import prisma from "../../../shared/prisma";

const getAllRentByMonth = async () => {
  const today = new Date();
  const isFirstDayOfMonth = today.getDate() === 1;

  const roomInfo = await prisma.room.findMany({
    select: {
      id: true,
      roomNo: true,
      floorNo: true,
      roomRent: true,
      trashBill: true,
      isAvailable: true,
      electricityBillReadings: {
        select: {
          reading: true,
          monthName: true,
          year: true,
          perUnitPrice: true,
        },
      },
    },
  });

  const roomRentDetails = await Promise.all(
    roomInfo.map(async (room) => {
      const sortedReadings = room.electricityBillReadings.sort((a, b) => {
        return (
          new Date(`${a.monthName} 1, ${a.year}`).getTime() -
          new Date(`${b.monthName} 1, ${b.year}`).getTime()
        );
      });

      const currentMonthReading = sortedReadings[sortedReadings.length - 1];
      const previousMonthReading = sortedReadings[sortedReadings.length - 2];

      let electricityBill = 0;
      let electricityUnit = 0;

      if (previousMonthReading && currentMonthReading) {
        electricityUnit =
          currentMonthReading.reading - previousMonthReading.reading;
        electricityBill =
          electricityUnit * (currentMonthReading.perUnitPrice || 0);
      }

      // Get due amount and add previous dues if any
      let dueAmountRecord = await prisma.rentInfo.findFirst({
        where: { roomId: room.id },
        select: { dueAmount: true },
      });

      let dueAmount = dueAmountRecord?.dueAmount ?? 0;

      // If today is the 1st, set isPaid to false and carry over due amount
      let isPaid = false;
      if (isFirstDayOfMonth) {
        isPaid = false;
      }

      // Calculate total rent with electricity and trash bills
      const totalRent = room.roomRent + electricityBill + (room.trashBill ?? 0);

      // Add unpaid totalRent to dueAmount if rent not paid
      if (!isPaid) {
        dueAmount += totalRent;
      }

      return {
        RoomId: room.id,
        roomNo: room.roomNo,
        floorNo: room.floorNo,
        roomRent: room.roomRent,
        trashBill: room.trashBill,
        electricityUnit,
        electricityBill,
        totalRent,
        dueAmount,
        isAvailable: room.isAvailable,
        isPaid,
        LastMonthElectricityReadings: previousMonthReading,
        PresentMonthElectricityReadings: currentMonthReading,
      };
    })
  );

  return roomRentDetails;
};

//
const getSingleRent = async (req: Request) => {
  const { id } = req.params;
  const room = await prisma.room.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      electricityBillReadings: {
        select: {
          reading: true,
          monthName: true,
          year: true,
          perUnitPrice: true,
        },
      },
    },
  });
  return room;
};
const updateRent = async (req: Request) => {
  const { id } = req.params;
  const { payment } = req.body;
  console.log(payment);

  // const numericPayment = Number(payment);

  // if (isNaN(numericPayment)) {
  //   return { error: "Payment is required and must be a valid number" };
  // }

  // try {
  //   const room = await prisma.room.findUnique({
  //     where: { id },
  //   });

  //   if (!room) {
  //     return { error: "Room not found" };
  //   }

  //   const dueAmount = room.totalRent - numericPayment;

  //   const updatedRoom = await prisma.room.update({
  //     where: { id },
  //     data: {
  //       isPaid: true,
  //       dueAmount: dueAmount > 0 ? dueAmount : 0,
  //     },
  //   });

  //   return { updatedRoom, dueAmount };
  // } catch (error) {
  //   console.error("Error updating rent:", error);
  //   return { error: "Internal server error" };
  // }
};

export const RentService = {
  getAllRentByMonth,
  getSingleRent,
  updateRent,
};
