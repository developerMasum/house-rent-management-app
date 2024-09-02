import express from "express";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post("/create-room", RoomController.createRoom);
router.post("/electricity", RoomController.addElectricityReading);

export const RoomRoutes = router;
