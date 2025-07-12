import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { TenantService } from "./tenant.service";
import { tenantFilterableFields } from "../../constans/QueryConstans";

const getAllTenants = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tenantFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await TenantService.getAllTenants(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenants are retrieved successfully!",
    data: result,
  });
});
const getSingleTenant = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantService.getSingleTenant(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Tenant is retrieved successfully!",
    data: result,
  });
});
const updateTenant = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantService.updateTenant(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant is updated successfully!",
    data: result,
  });
});
const deleteTenant = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantService.deleteTenant(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant is deleted successfully!",
    data: result,
  });
});

export const TenantController = {
  getAllTenants,
  getSingleTenant,
  updateTenant,
  deleteTenant,
};
