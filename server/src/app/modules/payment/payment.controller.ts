import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await PaymentService.createPayment(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment is created successfully!",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
};
