import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/make-payment", PaymentController.createPayment);

export const PaymentRoutes = router;
