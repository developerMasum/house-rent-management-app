import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validations";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";

const router = express.Router();

router.post(
  "/create-admin",
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Incoming data:", req.body.data);
    try {
      req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    } catch (err) {
      return next(err); // Handle parsing errors gracefully
    }
    return UserController.createAdmin(req, res, next);
  }
);
router.post(
  "/create-owner",
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Incoming data:", req.body.data);
    try {
      req.body = UserValidation.createOwner.parse(JSON.parse(req.body.data));
    } catch (err) {
      return next(err); // Handle parsing errors gracefully
    }
    return UserController.createOwner(req, res, next);
  }
);

export const UserRoutes = router;
