import express from "express";
import { TenantController } from "./tenant.controller";

const router = express.Router();

router.get("/get-tenants", TenantController.getAllTenants);
router.patch("/update-tenant/:id", TenantController.updateTenant);
router.delete("/delete-tenant/:id", TenantController.deleteTenant);

export const TenantRoutes = router;
