import express from "express";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post("/create-room", RoomController.createRoom);
router.get("/get-rooms", RoomController.getAllRooms);
router.get("/get-room/:id", RoomController.getSingleRoom);
router.patch("/update-room/:id", RoomController.updateRoom);
router.delete("/delete-room/:id", RoomController.deleteRoom);

export const RoomRoutes = router;
