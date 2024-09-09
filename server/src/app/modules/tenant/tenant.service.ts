import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { tenantSearchAbleFields } from "../../constans/QueryConstans"; // Assume tenant-specific fields are defined here

const prisma = new PrismaClient();

const getAllTenants = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.TenantWhereInput[] = [];

  // Handle search term filtering
  if (searchTerm) {
    andConditions.push({
      OR: tenantSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm.toString(),
          mode: "insensitive",
        },
      })),
    });
  }

  // Handle other filters like isMarried, role, etc.
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // Combine conditions if any exist
  const whereConditions: Prisma.TenantWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch filtered and paginated tenant data
  const tenants = await prisma.tenant.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc", // Default sorting by creation date
          },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePhoto: true,
      permanentAddress: true,
      jobInfo: true,
      familyInfo: true,
      numberOfFamilyMember: true,
      isMarried: true,
      room: {
        select: {
          roomNo: true,
        },
      },
      payments: true,
    },
  });

  // Count total number of tenants that match the conditions
  const total = await prisma.tenant.count({
    where: whereConditions,
  });

  // Return paginated metadata and fetched tenants
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: tenants,
  };
};

const updateTenant = async (req: Request) => {
  const { id } = req.params;
  const {
    name,
    email,
    phoneNumber,
    permanentAddress,
    jobInfo,
    familyInfo,
    numberOfFamilyMember,
    isMarried,
    profilePhoto,
  } = req.body;

  const updatedTenant = await prisma.tenant.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      permanentAddress: permanentAddress,
      jobInfo: jobInfo,
      familyInfo: familyInfo,
      numberOfFamilyMember: numberOfFamilyMember,
      isMarried: isMarried,
      profilePhoto: profilePhoto,
    },
  });

  return updatedTenant;
};

const deleteTenant = async (req: Request) => {
  const { id } = req.params;
  const deletedTenant = await prisma.tenant.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true, // Soft delete by marking `isDeleted` as true
    },
  });

  return deletedTenant;
};

export const TenantService = {
  getAllTenants,
  updateTenant,
  deleteTenant,
};
