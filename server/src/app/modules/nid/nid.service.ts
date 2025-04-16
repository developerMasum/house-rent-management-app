import { create } from "domain";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const createNID = async (req: Request) => {
  //   console.log(req.body)
  const result = await prisma.nIDInfo.create({
    data: {
      tenantId: req.body.tenantId,
      nidNumber: req.body.nidNumber,
      nidFrontImage: req.body.nidFrontImage,
      nidBackImage: req.body.nidBackImage,
    },
  });

  return result;
};

const deleteNID = async (req: Request) => {
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

export const NidServices = {
  createNID,
  deleteNID,
};
