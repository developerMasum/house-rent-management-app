import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { RoomService } from "./room.service";
import pick from "../../../shared/pick";
import { roomFilterableFields } from "../../constans/QueryConstans";

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
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await RoomService.getAllRooms(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms are retrieved successfully!",
    data: result,
  });
});
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.updateRoom(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room is updated successfully!",
    data: result,
  });
});
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.deleteRoom(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room is deleted successfully!",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  addElectricityReading,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
