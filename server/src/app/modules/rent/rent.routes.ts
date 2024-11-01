import express from "express";
import { RentController } from "./rent.controller";

const router = express.Router();
router.get("/get-rents", RentController.getAllRentByMonth);
router.get("/get-rents/:id", RentController.getSingleRent);
router.patch("/rents/pay/:id", RentController.updateRent);
export const RentRoutes = router;
