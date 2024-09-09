import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paymentSearchAbleFields } from "./../../constans/QueryConstans";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

const createPayment = async (req: Request) => {
  // Log the incoming request body
  console.log(req.body);

  return await prisma.payment.create({
    data: {
      ...req.body,
    },
  });
};
const getAllPayments = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PaymentWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: paymentSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const payments = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      amount: true,
      invoiceUrl: true,
      method: true,
      room: {
        select: {
          roomNo: true,
        },
      },
    },
  });

  const total = await prisma.payment.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: payments,
  };
};

export const PaymentService = {
  createPayment,
  getAllPayments,
};
