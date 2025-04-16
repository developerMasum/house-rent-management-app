import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { HouseRoutes } from "../modules/house/house.routes";
import { RoomRoutes } from "../modules/room/room.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { MaintenanceRoutes } from "../modules/maintanance/maintenance.route";
import { TenantRoutes } from "../modules/tenant/tenant.route";
import { RentRoutes } from "../modules/rent/rent.routes";
import { NidRoutes } from "../modules/nid/nid.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: UserRoutes,
  },
  {
    path: "/tenant",
    route: TenantRoutes,
  },
  {
    path: "/tenant/nid",
    route: NidRoutes,
  },
  {
    path: "/house",
    route: HouseRoutes,
  },
  {
    path: "/room",
    route: RoomRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/maintenance",
    route: MaintenanceRoutes,
  },
  {
    path: "/rent",
    route: RentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
