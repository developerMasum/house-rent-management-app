import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";
import { paymentSearchAbleFields } from "./../../constans/QueryConstans";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

const createPayment = async (req: Request) => {
  const payment = await prisma.$transaction(async (tx) => {
    // Retrieve and calculate new due amount
    const due = await tx.rentInfo.findFirst({
      where: {
        roomId: req.body.roomId,
      },
      select: {
        dueAmount: true,
        totalRent: true,
      },
    });

    if (!due) {
      throw new Error("Rent information not found for the provided room ID.");
    }

    // Calculate the new due amount
    const newDue = due.totalRent - req.body.amount;

    // Update the due amount in the rentInfo table
    await tx.rentInfo.updateMany({
      where: {
        roomId: req.body.roomId,
      },
      data: {
        dueAmount: newDue,
      },
    });

    // Create a new payment entry
    const newPayment = await tx.payment.create({
      data: {
        amount: req.body.amount,
        invoiceUrl: req.body.invoiceUrl,
        method: req.body.method,
        room: {
          connect: {
            // id: req.body.roomId,
          },
        },
      },
      select: {
        id: true,
        amount: true,
        roomId: true,
      },
    });

    return newPayment;
  });

  return payment;
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
    // meta: {
    //   page,
    //   limit,
    //   total,
    // },
    data: payments,
  };
};

export const PaymentService = {
  createPayment,
  getAllPayments,
};
