import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { HouseService } from "./house.service";

const createHouse = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await HouseService.createHouse(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "house created successfully!",
    data: result,
  });
});
const getAllHouses = catchAsync(async (req: Request, res: Response) => {
  const result = await HouseService.getAllHouses();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Houses are retrieved successfully!",
    data: result,
  });
});

export const HouseController = {
  createHouse,
  getAllHouses,
};
