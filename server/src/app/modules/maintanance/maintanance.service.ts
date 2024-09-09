import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const createMaintenance = async (req: Request) => {
  // Log the incoming request body
  console.log(req.body);

  return await prisma.maintenanceRequest.create({
    data: {
      ...req.body,
    },
  });
};

export const MaintenanceService = {
  createMaintenance,
};
