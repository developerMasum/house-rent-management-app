import express from "express";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post("/create-room", RoomController.createRoom);
router.post("/electricity", RoomController.addElectricityReading);
router.get("/get-electricity", RoomController.getAllElectricity);
router.get("/get-electricity/:id", RoomController.getSingleElectricityRiding);
router.get("/get-rooms", RoomController.getAllRooms);

router.patch("/update-room/:id", RoomController.updateRoom);
router.delete("/delete-room/:id", RoomController.deleteRoom);

export const RoomRoutes = router;
