import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { ElectricityService } from "./electricity.service";
import { electricityFilterableFields } from "../../constans/QueryConstans";

const getAllElectricity = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ElectricityService.getAllElectricity(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Electricity bills retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleElectricityRiding = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ElectricityService.getSingleElectricityRiding(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single electricity is retrieved successfully!",
      data: result,
    });
  }
);
const addElectricityReading = catchAsync(
  async (req: Request, res: Response) => {
    //const { admin, ...userData } = req.body;
    const result = await ElectricityService.addElectricityReading(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "electricity reading added successfully!",
      data: result,
    });
  }
);
const updateReading = catchAsync(async (req: Request, res: Response) => {
  const result = await ElectricityService.updateReading(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "electricity reading updated successfully!",
    data: result,
  });
});
export const ElectricityController = {
  getAllElectricity,
  getSingleElectricityRiding,
  addElectricityReading,
  updateReading,
};
