import { Admin, Prisma, User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashedPassword } from "./user.utils";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";

const createAdmin = async (req: Request) => {
  const file = req.file as IUploadFile;
  console.log(req.body);

  if (file) {
    const uploadedProfileImage = await FileUploadHelper.uploadToCloudinary(
      file
    );
    req.body.admin.profilePhoto = uploadedProfileImage?.secure_url;
  }

  const hashPassword = await hashedPassword(req.body.password);

  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: {
        email: req.body.admin.email,
        phoneNumber: req.body.admin.phoneNumber,
        password: hashPassword,
        role: UserRole.ADMIN,
      },
    });

    // Create Admin linked to the User
    const newAdmin = await transactionClient.admin.create({
      data: {
        name: req.body.admin.name,
        profilePhoto: req.body.admin.profilePhoto,
        userId: newUser.id,
      },
    });

    return newAdmin;
  });

  // return result;
};
const createOwner = async (req: Request) => {
  const file = req.file as IUploadFile;

  // Log the incoming request body
  console.log(req.body);

  // Upload the profile photo if available
  if (file) {
    const uploadedProfileImage = await FileUploadHelper.uploadToCloudinary(
      file
    );
    req.body.houseOwner.profilePhoto = uploadedProfileImage?.secure_url;
  }

  // Hash the password
  const hashPassword = await hashedPassword(req.body.password);

  // Perform the database transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    // Create the User first
    const newUser = await transactionClient.user.create({
      data: {
        email: req.body.houseOwner.email,
        phoneNumber: req.body.houseOwner.phoneNumber,
        password: hashPassword,
        role: UserRole.HOUSEOWNER,
      },
    });

    // Create the HouseOwner linked to the User
    const newHouseOwner = await transactionClient.houseOwner.create({
      data: {
        name: req.body.houseOwner.name,
        profilePhoto: req.body.houseOwner.profilePhoto,
        userId: newUser.id,
      },
    });

    return newHouseOwner;
  });

  return result;
};

export const UserServices = {
  createAdmin,
  createOwner,
};
