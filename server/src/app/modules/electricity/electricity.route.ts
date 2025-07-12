import { ElectricityController } from "./electricity.controller";
import express from "express";

const router = express.Router();

router.post("/electricity", ElectricityController.addElectricityReading);
router.get("/get-electricity", ElectricityController.getAllElectricity);
router.get(
  "/get-electricity/:id",
  ElectricityController.getSingleElectricityRiding
);
router.patch("/update-electricity/:id", ElectricityController.updateReading);

export const ElectricityRoutes = router;
