import { z } from "zod";

const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    email: z.string().email(),
    name: z.string(),
    phoneNumber: z.string(),
  }),
});
const createOwner = z.object({
  password: z.string(),
  houseOwner: z.object({
    email: z.string().email(),
    name: z.string(),
    phoneNumber: z.string(),
  }),
});
const createManager = z.object({
  password: z.string(),
  manager: z.object({
    email: z.string().email(),
    name: z.string(),
    phoneNumber: z.string(),
    houseOwnerId: z.string(),
  }),
});

export const UserValidation = {
  createAdmin,
  createOwner,
  createManager,
};
