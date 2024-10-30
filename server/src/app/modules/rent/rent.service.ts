import prisma from "../../../shared/prisma";

const getAllRentByMonth = async () => {
  const roomInfo = await prisma.room.findMany({
    select: {
      id: true,
      roomNo: true,
      floorNo: true,
      roomRent: true,
      advancedRent: true,
      dueAmount: true,
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

  const roomRentDetails = roomInfo.map((room) => {
    // Sort readings by year and month for reliable calculations
    const sortedReadings = room.electricityBillReadings.sort((a, b) => {
      return (
        new Date(`${a.monthName} 1, ${a.year}`).getTime() -
        new Date(`${b.monthName} 1, ${b.year}`).getTime()
      );
    });

    // Get the last two readings (current and previous month)
    const currentMonthReading = sortedReadings[sortedReadings.length - 1];
    const previousMonthReading = sortedReadings[sortedReadings.length - 2];

    // Initialize electricity bill and unit usage
    let electricityBill = 0;
    let electricityUnit = 0;

    // Calculate electricity bill and unit usage if both readings are available
    if (previousMonthReading && currentMonthReading) {
      electricityUnit =
        currentMonthReading.reading - previousMonthReading.reading;
      electricityBill =
        electricityUnit * (currentMonthReading.perUnitPrice || 0);
    }

    // Calculate the total rent including electricity bill and due amount
    const totalRent = room.roomRent + room.dueAmount + electricityBill;

    return {
      RoomId: room.id,
      roomNo: room.roomNo,
      floorNo: room.floorNo,
      roomRent: room.roomRent,
      dueAmount: room.dueAmount,
      electricityUnit,
      electricityBill,
      totalRent,
      isAvailable: room.isAvailable,
      LastMonthElectricityReadings: previousMonthReading,
      PresentMonthElectricityReadings: currentMonthReading,
    };
  });

  return roomRentDetails;
};

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

export const RentService = {
  getAllRentByMonth,
  getSingleRent,
};
