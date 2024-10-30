import express from "express";
import { RentController } from "./rent.controller";

const router = express.Router();
router.get("/get-rents", RentController.getAllRentByMonth);
router.get("/get-rents/:id", RentController.getSingleRent);
export const RentRoutes = router;
