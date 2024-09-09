import express from "express";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post("/create-room", RoomController.createRoom);
router.post("/electricity", RoomController.addElectricityReading);
router.get("/get-rooms", RoomController.getAllRooms);

export const RoomRoutes = router;
