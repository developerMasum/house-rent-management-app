import express from "express";
import { HouseController } from "./house.controller";

const router = express.Router();

router.post("/create-house", HouseController.createHouse);

export const HouseRoutes = router;
