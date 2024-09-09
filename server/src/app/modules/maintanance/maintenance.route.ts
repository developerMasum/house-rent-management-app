import express from "express";
import { MaintenanceController } from "./maintanance.controller";

const router = express.Router();

router.post("/create-request", MaintenanceController.createPayment);

export const MaintenanceRoutes = router;
