import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import pick from "../../../shared/pick";
import { paymentFilterableFields } from "../../constans/QueryConstans";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPayment(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment is created successfully!",
    data: result,
  });
});
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paymentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PaymentService.getAllPayments(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments are retrieved successfully!",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getAllPayments,
};
