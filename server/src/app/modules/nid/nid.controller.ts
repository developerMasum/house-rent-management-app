import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { NidServices } from "./nid.service";

const createNID = catchAsync(async (req: Request, res: Response) => {
  const result = await NidServices.createNID(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "NID is created successfully!",
    data: result,
  });
});
const deleteNID = catchAsync(async (req: Request, res: Response) => {
  const result = await NidServices.deleteNID(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant is deleted successfully!",
    data: result,
  });
});

export const NidController = {
  createNID,
  deleteNID,
};
