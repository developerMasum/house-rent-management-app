import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { rentFilterableFields } from "./rent.filters";
import { RentService } from "./rent.service";

const getAllRentByMonth = catchAsync(async (req: Request, res: Response) => {
  //   const filters = pick(req.query, rentFilterableFields);
  //   const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  //   const result = await RentService.getAllRentByMonth(filters, options);
  const result = await RentService.getAllRentByMonth();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rents are retrieved successfully!",
    data: result,
  });
});
const getSingleRent = catchAsync(async (req: Request, res: Response) => {
  const result = await RentService.getSingleRent(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single room rent is retrieved successfully!",
    data: result,
  });
});
const updateRent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await RentService.updateRent(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room rent is updated successfully!",
    data: result,
  });
});
export const RentController = {
  getAllRentByMonth,
  getSingleRent,
  updateRent,
};
