import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { HouseRoutes } from "../modules/house/house.routes";
import { RoomRoutes } from "../modules/room/room.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: UserRoutes,
  },
  {
    path: "/house",
    route: HouseRoutes,
  },
  {
    path: "/room",
    route: RoomRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
