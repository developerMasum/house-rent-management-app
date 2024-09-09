import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { MaintenanceService } from "./maintanance.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await MaintenanceService.createMaintenance(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenance request is created successfully!",
    data: result,
  });
});

export const MaintenanceController = {
  createPayment,
};
