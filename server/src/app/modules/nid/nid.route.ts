import express from "express";
import { NidController } from "./nid.controller";

const router = express.Router();

router.post("/create-nid", NidController.createNID);

export const NidRoutes = router;
