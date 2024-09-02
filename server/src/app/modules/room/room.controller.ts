import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { RoomService } from "./room.service";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await RoomService.createRoom(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "house created successfully!",
    data: result,
  });
});
const addElectricityReading = catchAsync(
  async (req: Request, res: Response) => {
    //const { admin, ...userData } = req.body;
    const result = await RoomService.addElectricityReading(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "electricity reading added successfully!",
      data: result,
    });
  }
);

export const RoomController = {
  createRoom,
  addElectricityReading,
};
