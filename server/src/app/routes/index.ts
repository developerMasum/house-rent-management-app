import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { HouseRoutes } from "../modules/house/house.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
