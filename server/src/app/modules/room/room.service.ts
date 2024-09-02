import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const createHouse = async (req: Request) => {
  //   console.log(req.body);

  const result = await prisma.house.create({
    data: {
      name: req.body.name,
      location: req.body.location,
      numberOfRooms: req.body.numberOfRooms,
      floorCount: req.body.floorCount,
      numberOfMeters: req.body.numberOfMeters,
      ownerId: req.body.ownerId,
      managerId: req.body.managerId,
    },
  });

  return result;
};

export const HouseService = {
  createHouse,
};
