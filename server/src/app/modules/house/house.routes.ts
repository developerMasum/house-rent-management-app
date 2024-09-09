import express from "express";
import { HouseController } from "./house.controller";

const router = express.Router();

router.post("/create-house", HouseController.createHouse);
router.get("/get-houses", HouseController.getAllHouses);

export const HouseRoutes = router;
