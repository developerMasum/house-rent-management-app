import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await UserServices.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});
const createOwner = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await UserServices.createOwner(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Owner is created successfully!",
    data: result,
  });
});
const createManager = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await UserServices.createManager(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Manager is created successfully!",
    data: result,
  });
});
const createTenant = catchAsync(async (req: Request, res: Response) => {
  //const { admin, ...userData } = req.body;
  const result = await UserServices.createTenant(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant is created successfully!",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createOwner,
  createManager,
  createTenant,
};
